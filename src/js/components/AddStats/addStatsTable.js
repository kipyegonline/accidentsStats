import React from "react";
import { FormGroup } from "reactstrap";
import { Redirect } from "react-router-dom";
import { addClass, DataInput, YearBtn } from "./addstats";
import { Row, Col } from "reactstrap";
import Layout from "../UI/Layout";

const numregex = new RegExp("^[0-9]+$");
function AddStatsTable() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [year, getYear] = React.useState(false);
  const [date, setDate] = React.useState("");
  const form = React.useRef(null);
  const getValue = (nature, value, name, id) => {
    //first ensure the user has entered date  and year
    date.length > 0
      ? setError("")
      : setError("Enter date and check year button first");
    setTimeout(() => setError(""), 3000);
    //check if incoming data alraedy exist in the data array, also grab its index

    const check = data.find((d) => +d.classv === id);
    const index = data.findIndex((d) => +d.classv === id);
    if (numregex.test(value) && Number(value) > -1) {
      //prepare data
      let payload = {
        date,
        year: year ? new Date().getFullYear() - 1 : new Date().getFullYear(),
      };

      //if it exists, add incoming props
      if (check) {
        // could use spread operator
        if (nature === "fatalities") {
          check.fatalities = +value.trim();
        } else if (nature === "seriousInjuries") {
          check.seriousInjuries = +value.trim();
        } else if (nature === "slightInjuries") {
          check.slightInjuries = +value.trim();
        }
        //finally update the array
        data[index] = check;
      } else {
        //new victim class, add new props (id,name and nature) to paylaod object and its id, then add to the array
        payload[nature] = +value.trim();
        payload["name"] = name;
        payload["classv"] = id;
        payload["injuryName"] = nature;
        //call this hook to add to array
        setData([...data, payload]);
      }
    } else {
      //so, we check whether there is an object in the array, or an object has the prop to be deleted or there is an object or certain index else nullify
      data.length > 0 || data[nature] !== undefined || data[index] !== undefined
        ? delete data[index][nature]
        : null;
      setError("Kindly enter a number");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.length < 6) {
      setError("Please fill all the fields in the table");
    } else {
      let sorted = data.sort((a, b) => a.classv - b.classv);
      let missingFields = sorted.some((item) => Object.values(item).length < 8);

      if (!missingFields) {
        sorted.forEach((data) => {
          setError("");
          setSuccess("great!..sending to server...");
          $.ajax({
            type: "POST",
            url: "./server/addstats.php?addStats=true",
            data,
            dataType: "json",
          })
            .then((res) => {
              if (res.status === 200) {
                setSuccess(res.msg);
                setTimeout(() => {
                  setSuccess("");
                  setData([]);
                  getYear(true);
                  form.current.reset();
                }, 5000);
              } else {
                setSuccess("");
                setError(res.msg);
                setTimeout(() => setError(""), 3000);
              }
            })
            .catch((error) => {
              setSuccess("");
              setError(
                "Error submitting.Check internet connection and try again."
              );
              setTimeout(() => setError(""), 4000);
              console.log(error);
            });
        });
      } else {
        setError(
          "Ensure all  fields have numeric values. Kindly check and try again."
        );
      }
    }
  };

  return JSON.parse(localStorage.getItem("accidentStats")) ? (
    <Layout>
      <Row>
        <Col
          className="mt-4 table-responsive"
          sm="12"
          md={{ size: 8, offset: 2 }}
        >
          <form className="form p-3 my-3" ref={form} onSubmit={handleSubmit}>
            <p className="p-2 alert-primary">
              Add accident statitics..Please start with date and year button.
            </p>
            <Row>
              <Col>
                <DataInput
                  type="date"
                  name="Date"
                  id="date"
                  placeholder=""
                  sendValue={setDate}
                />
              </Col>
              <Col>
                <YearBtn sendValue={getYear} year={year} />
              </Col>
            </Row>

            <table className="table table-bordered table-hover table-responsive">
              <thead>
                <tr>
                  <th>
                    <b>Nature</b>
                  </th>
                  {addClass.map((item) => (
                    <th key={item.id}>
                      <b>{item.name}</b>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fatalties</td>
                  {addClass.map((item) => (
                    <td key={item.id}>
                      <TableInput
                        item={item}
                        nature="fatalities"
                        sendValue={getValue}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Seriously Injured</td>
                  {addClass.map((item) => (
                    <td key={item.id}>
                      <TableInput
                        item={item}
                        nature="seriousInjuries"
                        sendValue={getValue}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Slightly Injured</td>
                  {addClass.map((item) => (
                    <td key={item.id}>
                      <TableInput
                        item={item}
                        nature="slightInjuries"
                        sendValue={getValue}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <FormGroup>
              <p className="text-danger">{error}</p>
              <p className="text-success">{success}</p>
            </FormGroup>
            <input
              type="submit"
              value="Add stats"
              className="btn btn-block btn-primary"
            />
          </form>
        </Col>
      </Row>
    </Layout>
  ) : (
    <Redirect to={"/"} />
  );
}
export default AddStatsTable;

const TableInput = ({ item, nature, sendValue }) => {
  const handleChange = (e, id) => {};
  const handleBlur = (e, id) => {
    if (e.target.value.trim().length > 0) {
      e.target.style.border = "none";
    } else {
      e.target.style.border = "1px solid red";
    }

    sendValue(e.target.dataset.nature, e.target.value, e.target.name, id);
  };
  return (
    <input
      type="number"
      name={item.name}
      data-nature={nature}
      minLength={1}
      onChange={(e) => handleChange(e, item.id)}
      onBlur={(e) => handleBlur(e, item.id)}
      className="form-control my-2"
    />
  );
};

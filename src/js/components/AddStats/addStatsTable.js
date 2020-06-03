import React from "react";
import { FormGroup } from "reactstrap";
import { addClass, DataInput } from "./addstats";
import { Row, Col } from "reactstrap";

const numregex = new RegExp("^[0-9]+$");
function AddStatsTable() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const getValue = (nature, value, name, id) => {
    if (value.trim().length === 0) return;
    if (numregex.test(value) && Number(value) > -1) {
      //receive data
      const payload = {
        [nature]: +value.trim(),
        classv: id,
        name,
        injuryName: nature,
      };
      //check if item already exists
      const check = data.find(
        (item) => item.injuryName === nature && item.classv === +id
      );

      if (check) {
        //update item
        const index = data.findIndex(
          (item) =>
            item.classv === check.classv && item.injuryName === check.injuryName
        );

        data[index] = payload;
      } else {
        //add item to array

        setData([...data, payload]);
        console.log(data);
      }
    } else {
      alert("Enter a positive number");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("dara", data, data.length);
    if (data.length < 18) {
      setError("Please fill all the fields in the table");
    } else {
      setError("");
      setSuccess("great!..sending to server...");
      let sorted = data.sort((a, b) => a.classv - b.classv);
      console.log(sorted);
    }
  };

  return (
    <Row>
      <Col className="mt-4" md={{ size: 8, offset: 2 }}>
        <form className="form p-3 my-3" onSubmit={handleSubmit}>
          <table className="table table-bordered table-hover">
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

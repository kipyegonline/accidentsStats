import React, { useState, useRef } from "react";
import $ from "jquery";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
} from "reactstrap";
import Layout from "../UI/Layout";
import { set } from "d3";
const numregex = new RegExp("^[0-9]+$");
console.log("ref", numregex.test("3e333"));

const AddStats = (props) => {
  const [classv, setClassv] = useState(0);
  const [year, setYear] = useState(false);
  const [fatalities, setFatalties] = useState("");
  const [seriousInjuries, setSeriousInjuries] = useState("");
  const [slightInjuries, setSlightInjuries] = useState("");
  const [date, setDate] = useState(new Date().toDateString());
  const [error, setError] = useState("");
  const form = useRef(null);
  const btn = useRef(null);

  const toggleYear = () => setYear(!year);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(classv, fatalities);
    //validate
    if (classv === 0) {
      setError("Please select victim class");
    } else if (
      classv > 0 &&
      fatalities > 0 &&
      slightInjuries > 0 &&
      seriousInjuries > 0
    ) {
      //check if numbers were given
      if (
        numregex.test(fatalities) &&
        numregex.test(slightInjuries) &&
        numregex.test(seriousInjuries)
      ) {
        //ALL GOOD
        btn.current.disabled = true;
        //ajax request
        const data = {
          year: year ? new Date().getFullYear() - 1 : new Date().getFullYear(),
          date,
          fatalities,
          seriousInjuries,
          slightInjuries,
          classv,
        };
        console.log(data, "dara");

        $.ajax({
          type: "POST",
          url: "./server/addstats.php?addStats=true",
          data,
          cache: false,
        })
          .then((res) => {
            console.log(res);
            //if successfulll, reset state
            setError("Success");
            setTimeout(() => {
              setFatalties("");
              setSeriousInjuries("");
              setSlightInjuries("");
              setClassv(0);
              btn.current.disabled = false;
            }, 3000);
          })
          .catch((err) => console.error("Error", err.message));
      } else {
        //tell the damn user to enter numbers
        setError("Ensure text fields have number values");
      }
    } else {
      //ensure that everything is there
      setError("All fields are required");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <Layout>
      <Form style={formStyle} ref={form} onSubmit={handleSubmit}>
        <FormGroup>
          <p className="text-info text-center">{"Await"}</p>
        </FormGroup>

        <div className="float-right">
          <button
            type="button"
            className="btn blue darken-2 btn-md text-white year-btn"
            onClick={toggleYear}
            style={{ fontSize: "1rem" }}
          >
            {year ? "2019" : "2020"}
          </button>
        </div>
        <FormGroup>
          <Label for="selectClass">Select Victim class</Label>
          <ClassSelect getValue={setClassv} selected={classv} data={addClass} />
        </FormGroup>

        <FormGroup>
          <Label for="fatalties">Fatalities</Label>
          <DataInput
            type="text"
            name="Fatalties"
            id="fatalities"
            placeholder=""
            sendValue={setFatalties}
          />
        </FormGroup>
        <FormGroup>
          <Label for="seriousInjuries">Seriously Injured</Label>
          <DataInput
            type="text"
            name="SeriousInjuries"
            id="seriousInjuries"
            placeholder=""
            sendValue={setSeriousInjuries}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="slightInjuries">Slightly Injured</Label>
          <DataInput
            type="text"
            name="SlightInjuries"
            id="slightInjuries"
            placeholder=""
            sendValue={setSlightInjuries}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="Date">Date</Label>
          <DataInput
            type="date"
            name="Date"
            id="date"
            placeholder=""
            sendValue={setDate}
          />
        </FormGroup>

        <Button className="blue lighten-2 btn-block" ref={btn}>
          Submit
        </Button>
        <p className="text-danger mt-2">{error}</p>
      </Form>
    </Layout>
  );
};
export const ClassSelect = ({ getValue, selected, data }) => (
  <select
    id="selectClass"
    className="form-control"
    onChange={(e) => getValue(+e.target.value)}
    value={selected}
  >
    <option value={0}>Select Victim class</option>
    {data.map((d) => (
      <option key={d.id} value={d.id}>
        {d.name}
      </option>
    ))}
  </select>
);

const formStyle = {
  maxWidth: 600,
  background: "#fff",
  padding: "2rem",
  margin: "1rem auto",
  border: "1px solid yellow",
  zIndex: 10,
};
export const addClass = [
  { id: 1, name: "pedestrians" },
  { id: 2, name: "Drivers" },
  { id: 3, name: "passengers" },
  { id: 4, name: "Pillion pass" },
  { id: 5, name: "pedal Cyclist" },
  { id: 6, name: "Motor cyclists" },
];

export const DataInput = ({ sendValue, type, name, id, placeholder }) => {
  const handleChanges = (e) => {
    const paramValue = e.target.value;
    if (paramValue.length > 0) {
      e.target.name == "Date" ? sendValue(paramValue) : sendValue(+paramValue);
    } else {
      $(e.target).after(
        "<small class='text-danger mt-1'>This field is required.</small>"
      );
    }
  };
  const handleBlur = (e) => {
    let el = $(e.target);
    el.next().remove();
    if (e.target.value.length > 0) {
      e.target.style.border = "";
      el.next().remove();
    } else {
      $(e.target).after(
        "<small class='text-danger mt-3'>This field is required.</small>"
      );
      e.target.style.border = "1px solid red";
    }
  };
  return (
    <Input
      type={type}
      name={name}
      id={id}
      className="form-control"
      placeholder={placeholder}
      onBlur={handleBlur}
      onChange={handleChanges}
    />
  );
};

export default AddStats;

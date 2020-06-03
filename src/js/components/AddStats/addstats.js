import React, { useState, useRef } from "react";
import $ from "jquery";

import { useSelector } from "react-redux";
import { Redirect, HashRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";
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
import AddStatsTable from "./addStatsTable";

const numregex = new RegExp("^[0-9]+$");

export const AddStatitics = ({ auth }) => {
  const [classv, setClassv] = useState(0);
  const [year, setYear] = useState(false);
  const [fatalities, setFatalties] = useState("");
  const [seriousInjuries, setSeriousInjuries] = useState("");
  const [slightInjuries, setSlightInjuries] = useState("");
  const [date, setDate] = useState(new Date().toDateString());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useRef(null);
  const btn = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("to submit", classv, fatalities);
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
        setSuccess("Sending");
        setError("");
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
            setSuccess(res.status);
            setTimeout(() => {
              setFatalties("");
              setSeriousInjuries("");
              setSlightInjuries("");
              setClassv(0);
              setSuccess("");
              btn.current.disabled = false;
            }, 5000);
          })
          .catch((error) => {
            setSuccess("");
            setError(error.statusText);
            console.error("Error", error, form);
            form.current.reset();
          });
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

  return auth.isLoggedIn ? (
    <Layout>
      <AddStatsTable />
      <Form style={formStyle} ref={form} onSubmit={handleSubmit}>
        <FormGroup>
          <p className="text-info text-center">{"Await"}</p>
        </FormGroup>
        <YearBtn sendValue={setYear} year={year} />
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
        <p className="text-danger mt-2">{error}</p>
        <p className="text-succcess mt-2">{success}</p>
        <Button className="blue lighten-2 btn-block" ref={btn}>
          Submit
        </Button>
      </Form>
    </Layout>
  ) : (
    <Router>
      <Redirect to={"/login"} />
    </Router>
  );
};
const AddStats = () => {
  const auth = useSelector((state) => state.auth);
  return <AddStatitics auth={auth} />;
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
ClassSelect.propTypes = {
  getValue: PropTypes.func,
  selected: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  ),
};
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
    if (e.target.type === "submit") return;
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
    if (e.target.type === "submit") return;
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
      className="form-control mb-2"
      placeholder={placeholder}
      onBlur={handleBlur}
      onChange={handleChanges}
    />
  );
};
DataInput.propTypes = {
  sendValue: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
};
export const YearBtn = ({ sendValue, year }) => {
  return (
    <div className="float-right">
      <button
        type="button"
        className={`${
          year ? "red " : "blue"
        } btn darken-1 btn-md text-white year-btn`}
        onClick={() => sendValue(!year)}
        style={{ fontSize: "1rem" }}
      >
        {year ? "2019" : "2020"}
      </button>
    </div>
  );
};
YearBtn.propTypes = {
  sendValue: PropTypes.func,
  year: PropTypes.bool,
};
export default AddStats;

const hillVince = {
  name: "Vincent Kipago",
  age: 30,
  locale: "Litein",
  occupation: "Web developer",
  hobbies: ["swimming", "Movies", "Football", "documentaries"],
  married: true,
  des: function() {
    return `my name is ${this.name}, (${this.age}) from ${
      this.locale
    } and i am a ${this.occupation}. I am ${this.married ? "" : "not"} married.
     My hobies are ${this.hobbies.join(",")}. 
   `;
  },
};

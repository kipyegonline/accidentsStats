import React, { useState, useRef } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import Layout from "../UI/Layout";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const btn = useRef(null);
  const form = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit:", username, email, password, confPassword);
    if (username.trim().length === 0 || username.trim().length < 5) {
      username.trim().length === 0
        ? setError("Name cannot be blank")
        : setError("Enter a  longer username");
    } else if (email.trim().length < 5 || !email.includes("@")) {
      setError("An email address is required.");
    } else if (password.length === 0 || password.length < 5) {
      password.length === 0
        ? setError("A Password isrequired.")
        : setError(" A password should have minimum of 6 characters");
    } else if (confPassword.length === 0 || confPassword.length < 5) {
      confPassword.length === 0
        ? setError("A confirmation Password isrequired.")
        : setError(" A password should have minimum of 6 characters");
    } else if (password !== confPassword) {
      setError("The two  passwords do not match.");
    } else if (
      username.trim().length >= 5 &&
      email.trim().length > 5 &&
      password.length > 5 &&
      confPassword.length > 5
    ) {
      console.log("sending");
      //send to server
      setError("");
      setSuccess("sending......");
      $.ajax({
        url: "./server/auth.php?signup=true",
        type: "POST",
        dataType: "json",
        data: { username, email, password, confPassword, hashCode: v4() },
      })
        .then((res) => {
          console.log("server", res);
          if (res.status == 201) {
            setError(res.msg);
            setSuccess("");
          } else {
            setSuccess(res.msg);
            setTimeout(() => {
              setError("");
              form.currrent().reset();
            }, 5000);
          }
        })
        .catch((error) => {
          setError(error.statusText);
          setSuccess("");
          console.log("sign up err", error.statusText);
        });
    } else {
      setError("Encountered an error signing you up. Try again later.");
    }
  };
  const formStyle = {
    maxWidth: 600,
    margin: "1rem auto",
    background: "#fefefe",
    padding: "1rem",
  };
  return (
    <Layout>
      <Row>
        <Col size={8} offset={3}>
          <form
            className="form"
            style={formStyle}
            ref={form}
            onSubmit={handleSubmit}
          >
            <h5 className="text-center p-1 my-2">Sign up section.</h5>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <DataInput
                sendValue={setUsername}
                type="text"
                name="username"
                id="username"
                classlist="form-control mb-2"
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <DataInput
                sendValue={setEmail}
                type="email"
                name="email"
                id="email"
                classlist="form-control mb-2"
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <DataInput
                sendValue={setPassword}
                type="password"
                name="password"
                id="password"
                classlist="form-control mb-2"
                placeholder=""
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirm Passsword</Label>
              <DataInput
                sendValue={setConfPassword}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder=""
                classlist="form-control mb-2"
              />
            </FormGroup>
            <p className="text-danger text-center my-2">{error}</p>
            <p className="text-sucess text-center my-2">{success}</p>
            <DataInput
              sendValue={(f) => f}
              type="submit"
              name=""
              id=""
              classlist="btn btn-block indigo text-white"
              placeholder=""
            />
          </form>
        </Col>
      </Row>
    </Layout>
  );
}

const DataInput = ({ sendValue, type, name, id, placeholder, classlist }) => {
  const handleChanges = (e) => {
    if (e.target.name === "submit") return;

    if (e.target.value.length > 0) {
      sendValue(e.target.value);
    }
    return;
  };
  const handleBlur = (e) => {
    let el = $(e.target);
    const span = $("span.text-danger");
    //username
    if (e.target.type === "text") {
      $(el.prev().hasClass("text-danger"))["0"] ? el.prev().remove() : null;

      if (e.target.value.trim().length === 0) {
        el.before("<span class='text-danger ml-2'> is required. </span>");
      }
    }
    //email
    if (e.target.type === "email") {
      $(el.prev().hasClass("text-danger"))["0"] ? el.prev().remove() : null;
      if (e.target.value.trim().length === 0 || !e.target.value.includes("@")) {
        el.before("<span class='text-danger ml-2'> is required. </span>");
      } else {
        //verify if email exists
        fetch(
          `./server/auth.php?verifyEmail=true&email=${e.target.value.trim()}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              $(el.prev().hasClass("text-danger"))["0"]
                ? el.prev().remove()
                : null;
            } else {
              el.before(`<span class='text-danger ml-2'>${data.msg}</span>`);
            }
          })
          .catch((err) => console.error(err.message));
      }
    }
    //password
    if (e.target.type === "password") {
      $(el.prev().hasClass("text-danger"))["0"] ? el.prev().remove() : null;
      if (
        e.target.value.trim().length === 0 ||
        e.target.value.trim().length < 5
      ) {
        let output = "";
        e.target.value.trim().length === 0
          ? (output = "  is required")
          : (output = "  is too short");
        el.before(`<span class='text-danger'>${output}</span>`);
      }
    }
  };
  return (
    <Input
      type={type}
      name={name}
      id={id}
      className={classlist}
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
  classlist: PropTypes.string,
};
export default SignUp;

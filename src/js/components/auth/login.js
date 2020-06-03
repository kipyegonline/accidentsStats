import React from "react";
import { Row, Col, FormGroup, Label } from "reactstrap";
import Layout from "../UI/Layout";
import { DataInput } from "./signup";
import { store } from "../../redux/store";
import $ from "jquery";
function Login({ history }) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const form = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    $("span.text-danger").remove();
    console.log(
      "stats",
      password.trim().length,
      email.trim().length,
      email,
      password
    );
    if (email.trim().length < 5 || !email.includes("@")) {
      console.log(email.length);
      email.trim().length === 0
        ? setError("Enter an email address.")
        : setError("Enter a proper email address.");
    } else if (password.trim().length < 6) {
      console.log(password, password.length);
      password.trim().length === 0
        ? setError("Enter password")
        : setError("Enter  a proper password");
    } else if (password.trim().length > 5 && email.trim().length > 6) {
      setError("");
      setSuccess("Sending");
      $.ajax({
        url: "./server/auth.php?loginuser=true",
        type: "POST",
        data: { password, email },
        dataType: "json",
      })
        .then((res) => {
          if (res.status == 200) {
            setSuccess("Done");
            store.dispatch({
              type: "ADD_AUTH",
              payload: { isLoggedIn: res.logger, userName: res.username },
            });
            localStorage.setItem("accidentStats", JSON.stringify(res));
            //redirect to add page
            history.push("/add-stats");
            setTimeout(() => {
              setSuccess("");
              setEmail("");
              setPassword("");
            }, 5000);
          } else {
            setError(res.msg);
          }
        })
        .catch((error) => {
          setSuccess("");
          setError(error.statusText);
          console.log(error);
          setTimeout(() => {
            setError("");
          }, 5000);

          //{ isLoggedIn: true, userName: "kipyegonline" }
        });
    } else {
      setError("Encounterd an error...Try again later");
    }
  };
  return (
    <Layout>
      <Row>
        <Col md={{ size: 4, offset: 4 }}>
          <form className="form p-3 mx-auto" onSubmit={handleSubmit} ref={form}>
            <h3 className="text-center p-2">Login</h3>
            <FormGroup>
              <Label className="mb-2" htmlFor="login-email">
                Email
              </Label>
              <DataInput
                sendValue={setEmail}
                type="email"
                name="email"
                id="login-email"
                placeholder=""
                classlist="form-ccontrol"
              />
            </FormGroup>
            <FormGroup>
              <Label className="mb-2" htmlFor="login-password">
                Password
              </Label>
              <DataInput
                sendValue={setPassword}
                type="password"
                name="set-password"
                id="login-password"
                placeholder=""
                classlist="form-ccontrol"
              />
            </FormGroup>
            <FormGroup>
              <p className="text-danger">{error}</p>
              <p className="text-success">{success}</p>
            </FormGroup>
            <input
              type="submit"
              name="submit"
              id="login-submit"
              value="Login"
              placeholder=""
              className="btn btn-primary btn-block"
            />
          </form>
        </Col>
      </Row>
    </Layout>
  );
}
export default Login;

class Dice {
  constructor(sides = 6) {
    this.sides = sides;
  }

  roll() {
    return Math.floor(Math.random() * this.sides);
  }
  static des() {
    return "Trial underway";
  }
}
Dice.prototype.removeOne = function() {
  return this.sides - 1;
};
Dice.prototype.colors = "red";
const red = new Dice(5);
const blue = new Dice(8);
blue.colors = "blue";
console.log(blue, blue.colors);
const str = "abcdefghhijklmnopqrsquvwxyz0123456789";
function generateT(str) {
  let out = "";
  for (let i = 0; i < 10; i++) {
    out += str[Math.floor(Math.random() * str.length)];
  }
  console.log(out);
}
generateT(str);

function deduceTax(paye = 0.16) {
  return function(salary) {
    return salary - paye * salary;
  };
}
const stdSalary = deduceTax();
const mySalary = stdSalary(120000);
console.log(mySalary);

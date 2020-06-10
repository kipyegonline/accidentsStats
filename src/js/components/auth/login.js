import React from "react";
import { Row, Col, FormGroup, Label } from "reactstrap";
import { Link } from "react-router-dom";
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

    if (email.trim().length < 5 || !email.includes("@")) {
      email.trim().length === 0
        ? setError("Enter an email address.")
        : setError("Enter a proper email address.");
    } else if (password.trim().length < 6) {
      password.trim().length === 0
        ? setError("Enter password")
        : setError("Enter  a proper password");
    } else if (password.trim().length > 5 && email.trim().length > 6) {
      setError("");

      $.ajax({
        url: "./server/auth.php?loginuser=true",
        type: "POST",
        data: { password, email },
        dataType: "json",
      })
        .then((res) => {
          if (res.status == 200) {
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
            setSuccess("");
          }
        })
        .catch((error) => {
          setSuccess("");
          setError("Error,Please check your internet conection and try again");
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
            <p className="text-center my-2">
              <Link to={"/signup"}>Sign up</Link>
            </p>
          </form>
        </Col>
      </Row>
    </Layout>
  );
}
export default Login;
/*

class Dice {
  constructor(sides = 6, name = "Jules") {
    this.sides = sides;
    this.name = name;
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
Dice.prototype.nickName = "Gambler Nation";
const red = new Dice(5, "Fred");
const blue = new Dice(8, "Mark");
blue.colors = "blue";
console.log(blue, blue.colors);
console.log(Dice.prototype.propertyIsEnumerable("removeOne"));

class Poker extends Dice {
  constructor(sides, name, num) {
    super(sides, name);
    this.num = num;
  }
  intro() {
    return `My name is ${this.name} and i am number ${this.num}`;
  }
}
const dias = new Poker("", "Diamond", 6);
console.log(dias, dias.intro(), dias.removeOne());
*/

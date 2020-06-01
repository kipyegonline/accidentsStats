import React from "react";
import Layout from "../UI/Layout";
function Login() {
  return (
    <Layout>
      <form>
        <p>Login.</p>
      </form>
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
const red = new Dice(5);
console.log(Dice.des());

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";
import * as d3 from "d3";
import "typeface-raleway";
import "typeface-roboto";

//import "materialize-css/sass/materialize.scss";
import "bootstrap/scss/bootstrap.scss";
import "mdbootstrap/css/mdb.css";
import Main from "./components/main";
import NTSAPie from "./components/Pie/Pie";
import NTSALine from "./components/Line/Line";
import NotFound from "./components/UI/NotFound";
import AddStats from "./components/AddStats/addstats";
import { store } from "./redux/store";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
const nt = require("../assets/ntsa.csv");
const ntb = require("../assets/ntsb.csv");
//extract dta from csv and dispatch data to redux store

d3.csv(nt).then((res) => {
  store.dispatch({ type: "ADD_NTSA", payload: res });
});
const fetchData = async (url, type) => {
  const res = await fetch(url);
  if (res.status) {
    const data = await res.json();
    if (data) {
      store.dispatch({ type, payload: data });
      localStorage.setItem(type, JSON.stringify(res));
    } else {
      console.error("Error fetching data from the server", res);
    }
  }
};

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={NTSAPie} />
            <Route path="/timeline" component={NTSALine} />
            <Route path="/summary-statistics" component={Main} />
            <Route path="/add-stats" component={AddStats} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

const injuryClasses = [
  { id: 1, name: "fatalties", val: "fatalties", clicked: true },
  { id: 2, name: "Seriously injured", val: "seriouslyInjured", clicked: false },
  { id: 3, name: "Slightly injured", val: "slightlyInjured", clicked: false },
];

store.dispatch({ type: "ADD_CLASS", payload: injuryClasses });

const getCSVData = async (file, type) => {
  const res = await d3.csv(file);
  store.dispatch({ type, payload: res });
};
Promise.all([getCSVData(nt, "ADD_NTSA"), getCSVData(ntb, "ADD_NTSB")]);
let url1 = "./server/addstats.php?fetchStats=true&tableName=victimsCases";
let url2 = "./server/addstats.php?fetchStats=true&tableName=victimsCases2019";
Promise.all([fetchData(url1, "ADD_NTSA"), fetchData(url2, "ADD_NTSB")]);

$.ajax({
  type: "GET",
  url: url1,
  dataType: "json",
})
  .then((res) => console.log(res, "resss"))
  .catch((err) => console.error("errr", err));

//check if logged in
const res = JSON.parse(localStorage.getItem("accidentStats"));
if (res) {
  store.dispatch({
    type: "ADD_AUTH",
    payload: { isLoggedIn: res.logger, userName: res.username },
  });
}

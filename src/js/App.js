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

const nt = require("../assets/ntsa.csv");
const ntb = require("../assets/ntsb.csv");
//extract dta from csv and dispatch data to redux store

d3.csv(nt).then((res) => {
  store.dispatch({ type: "ADD_NTSA", payload: res });
});

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/pie-view" component={NTSAPie} />
            <Route path="/line-view" component={NTSALine} />
            <Route path="/add-stats" component={AddStats} />
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

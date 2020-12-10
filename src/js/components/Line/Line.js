import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import { Slider } from "@material-ui/core";
import Layout from "../UI/Layout";
import LineChart from "./lineCharts";
import { InjurySection } from "../Pie/Pie";
const injuryClasses = [
  { id: 1, name: "fatalties", val: "fatalties", clicked: true },
  { id: 2, name: "Seriously injured", val: "seriouslyInjured", clicked: false },
  { id: 3, name: "Slightly injured", val: "slightlyInjured", clicked: false },
];

function NTSALine() {
  const [selectedClass, setSelectedClass] = useState("fatalties");
  const [slid, setSlid] = useState(5);
  const [iClass, setIclass] = useState(injuryClasses);
  const vclasses = [
    "pedestrians",
    "motor_cyclists",
    "passengers",
    "pillion_passengers",
    "drivers",
    "pedal_cyclists",
  ];

  const getValue = (val) => {
    const clicked = iClass.find((ic) => ic.id === +val);
    setSelectedClass(clicked.val);
    setIclass(
      iClass.map((ic) =>
        ic.id === +val ? { ...ic, clicked: true } : { ...ic, clicked: false }
      )
    );
  };
  const { ntsa, ntsb, loadedA, loadedB } = useSelector((state) => ({
    ntsa: state.ntsa,
    ntsb: state.ntsb,
    iclass: state.iclass,
    loadedA: state.loadedA,
    loadedB: state.loadedB,
  }));

  const fixData = (data, id) => data.filter((d) => d.victimClass === id);
  let main = vclasses.map((vc) => fixData(ntsa, vc));
  let mainB = vclasses.map((vc) => fixData(ntsb, vc));

  const handleChange = (e, num) => setSlid(+num);
  //a helper to arrange inner arrays; go through each top array
  const arrangeData = (data) =>
    data.length ? data.map((d) => arrangeInnerData(d)) : [];
  const arrangeInnerData = (data) => {
    if (data.length) {
      //i will use rank to sort victim classes
      data[0].rank = data.reduce((a, b) => (a += Number(b[selectedClass])), 0);
      return data;
    }
  };

  main = arrangeData(main);
  mainB = arrangeData(mainB);

  return (
    <Layout>
      <Row className="my-3">
        <Col>
          {" "}
          {loadedA && loadedB > 0 ? (
            <LineChart
              datam={main}
              c="lxgrp"
              d="lygrp"
              a={"addedon"}
              b={selectedClass}
              year={new Date().getFullYear()}
            />
          ) : (
            <p>Loading Chart</p>
          )}
        </Col>
        <Col>
          {" "}
          {loadedA && loadedB > 0 ? (
            <LineChart
              datam={mainB}
              c="l2xgrp"
              d="l2ygrp"
              a={"addedon"}
              b={selectedClass}
              year={new Date().getFullYear() - 1}
            />
          ) : (
            <p>Loading</p>
          )}
        </Col>
        <Row className="my-3">
          <Col>
            <InjurySection data={iClass} sendValue={getValue} />
          </Col>
        </Row>
      </Row>
    </Layout>
  );
}
export default NTSALine;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import { Slider } from "@material-ui/core";
import Layout from "../UI/Layout";
import LineChart from "./lineCharts";

function NTSALine() {
  const [selectedClass, setSelectedClass] = useState("pedestrians");
  const [slid, setSlid] = useState(5);
  const vclasses = [
    "pedestrians",
    "motor_cyclists",
    "passengers",
    "pillion_passengers",
    "drivers",
    "pedal_cyclists",
  ];
  const { ntsa, iclass, ntsb, loadedA, loadedB } = useSelector((state) => ({
    ntsa: state.ntsa,
    ntsb: state.ntsb,
    iclass: state.iclass,
    loadedA: state.loadedA,
    loadedB: state.loadedB,
  }));

  const fixData = (data, id) => data.filter((d) => d.victimClass === id);
  const main = vclasses.map((vc) => fixData(ntsa, vc));
  const mainB = vclasses.map((vc) => fixData(ntsb, vc));

  const handleChange = (e, num) => setSlid(+num);

  console.log("why her", loadedA, mainB);

  return (
    <Layout>
      <Row className="my-3">
        <Slider
          max={10}
          min={0}
          onChange={handleChange}
          step={1}
          track="normal"
          value={slid}
          marks={[]}
          valueLabelDisplay="on"
        />

        <Col>
          {" "}
          {loadedA && loadedB > 0 ? (
            <LineChart
              datam={main.slice(0, 5)}
              c="lxgrp"
              d="lygrp"
              a={"addedon"}
              b={"seriouslyInjured"}
            />
          ) : (
            <p>Loading</p>
          )}
        </Col>
        <Col>
          {" "}
          {loadedA && loadedB > 0 ? (
            <LineChart
              datam={mainB.slice(0, 4)}
              c="l2xgrp"
              d="l2ygrp"
              a={"addedon"}
              b={"seriouslyInjured"}
            />
          ) : (
            <p>Loading</p>
          )}
        </Col>
      </Row>
    </Layout>
  );
}
export default NTSALine;

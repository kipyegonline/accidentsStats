import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { Row, Col } from "reactstrap";
import { Slider } from "@material-ui/core";
import Layout from "../UI/Layout";
import { store } from "../../redux/store";
import NTSAPieChart from "./piechart";

//extract dta from csv and dispatch data to redux store
const mons = ["Feb", "Mar", "Apr", "May"];
const injuryClasses = [
  { id: 1, name: "fatalties", val: "fatalties", clicked: true },
  { id: 2, name: "Seriously injured", val: "seriouslyInjured", clicked: false },
  { id: 3, name: "Slightly injured", val: "slightlyInjured", clicked: false },
];

store.dispatch({ type: "ADD_CLASS", payload: injuryClasses });

function NTSAPie() {
  const [currentClass, setCurrentClass] = useState("fatalties");
  const [iClass, setIclass] = useState(injuryClasses);
  const [slid, setSlide] = useState(2);

  const fixData = (data) => {
    let main = [];
    for (let i = 0; i < data.length; i += 6) {
      main = [...main, data.slice(i, i + 6)];
    }

    return main;
  };

  const getValue = (val) => {
    const clicked = iClass.find((ic) => ic.id === +val);
    setCurrentClass(clicked.val);
    setIclass(
      iClass.map((ic) =>
        ic.id === +val ? { ...ic, clicked: true } : { ...ic, clicked: false }
      )
    );
  };
  //redux store
  const getSlider = (val) => setSlide(val);

  const data = useSelector((state) => {
    return {
      ntsa: state.ntsa,
      ntsb: state.ntsb,
      loadedA: state.loadedA,
      loadedB: state.loadedB,
    };
  });
  const { loadedA, loadedB } = data;
  const main = fixData(data.ntsa);
  const mainB = fixData(data.ntsb);

  return (
    <Layout>
      <Row className="my-3">
        <Col>
          {loadedB && loadedA ? (
            <NTSAPieChart
              datas={mainB[slid]}
              a={currentClass}
              b="victimClass"
              diff={main[slid]}
            />
          ) : (
            <p>Loading</p>
          )}
        </Col>

        <Col>
          {loadedA && loadedB ? (
            <NTSAPieChart
              datas={main[slid]}
              a={currentClass}
              b="victimClass"
              diff={mainB[slid]}
            />
          ) : (
            <p>Loading chart</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <InjurySection data={iClass} sendValue={getValue} />
        </Col>
        <Col>
          <Slider
            slid={slid}
            step={1}
            color="primary"
            onChange={(e, num) => getSlider(+num)}
            valueLabelDisplay="on"
            track="normal"
            valueLabelFormat={(x) => mons[x]}
            value={slid}
            min={0}
            max={main.length - 1}
          />
        </Col>
      </Row>
    </Layout>
  );
}
export default NTSAPie;

export const InjurySection = ({ data, sendValue }) => {
  return (
    <>
      {data.map((d) => (
        <button
          key={d.id}
          className={`btn btn-md text-white ${
            d.clicked === true ? "red" : "blue"
          } darken-1 my-2 mr-2`}
          onClick={() => sendValue(d.id)}
        >
          {d.name}
        </button>
      ))}
    </>
  );
};

export const Sliders = ({ sendValue, slid, max }) => {
  return (
    <input
      max={max}
      value={slid}
      min={0}
      step={1}
      onChange={(e) => sendValue(+e.target.value)}
      type="range"
    />
  );
};

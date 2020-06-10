import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import * as d3 from "d3";
import TableStats from "./Table/Table";
import Layout from "./UI/Layout";
import { months } from "./tools/SvgComp";

function Main() {
  const [selected, setSelected] = useState(1);
  const [info, setInfo] = useState({});
  const data = useSelector((state) => {
    return {
      ntsa: state.ntsa,
      ntsb: state.ntsb,
      loadedA: state.loadedA,
      loadedB: state.loadedB,
    };
  });

  const fixData = (data) => {
    let main = [];
    for (let i = 0; i < data.length; i += 6) {
      main = [...main, data.slice(i, i + 6)];
    }

    return main;
  };

  const main = fixData(data.ntsa);
  const mainB = fixData(data.ntsb);
  const getValue = (val) => setSelected(val);
  const getDate = (date) => new Date(date);

  let month = "",
    month2 = "";
  let y = "",
    y1 = "";
  if (data.loadedA && data.loadedB) {
    month =
      main.length > 0 ? getDate(main[selected][0].addedon).toDateString() : "";
    month2 =
      mainB.length > 0
        ? getDate(mainB[selected][0].addedon).toDateString()
        : "";
    y = main.length > 0 ? getDate(main[selected][0].addedon).getFullYear() : "";
    y1 =
      mainB.length > 0 ? getDate(mainB[selected][0].addedon).getFullYear() : "";
  }
  //hover display
  const getHover = (data) => {
    setInfo(data);
  };

  return (
    <Layout>
      <Row className="p-1 mt-3">
        <Col md="10" sm={12} xs="12">
          <p className="font-weight-bold">
            COMPARATIVE STATISTICS TRENDS FOR {y} - {"  "}
            <span className="text-info"> {month} </span>
          </p>
          {data.loadedA && data.loadedB ? (
            <TableStats ntsa={main[selected]} getValue={getHover} />
          ) : (
            <p>Loading</p>
          )}
        </Col>
        <Col md="2" sm={12} xs="12" className="mt-3">
          {data.loadedA && data.loadedB ? (
            <>
              <label>Choose Month</label>
              <SelectedMonth data={main} sendValue={getValue} />
            </>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col md="10" sm="12">
          <p className="font-weight-bold">
            COMPARATIVE STATISTICS TRENDS FOR {y1} {"  "} -
            <span className="text-info"> {month2} </span>
          </p>
          {data.loadedA && data.loadedB ? (
            <>
              <TableStats ntsa={mainB[selected]} getValue={getHover} />
            </>
          ) : (
            <p>Loading</p>
          )}
        </Col>
        <Col md="2" sm="12" className="mt-3">
          <InfoDisplay info={info} />
        </Col>
      </Row>
    </Layout>
  );
}
export default Main;

export const SelectedMonth = ({ data, sendValue }) => {
  const [month, setMonth] = useState(data.length - 1);

  const getMonth = (d) => new Date(d).getMonth();
  const handleChange = (d) => {
    if (d >= 0) {
      sendValue(d);

      setMonth(d);
    }
  };
  useEffect(() => {
    sendValue(month);
  }, []);

  return (
    <select
      className="form-control"
      onChange={(e) => handleChange(Number(e.target.value))}
      value={month}
    >
      {data.map((d, i) => (
        <option key={i} value={i}>
          {months[getMonth(d[0].addedon)]}
        </option>
      ))}
    </select>
  );
};
SelectedMonth.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array),
  sendValue: PropTypes.func,
};

const InfoDisplay = ({ info }) => (
  <ul
    className="list-group mt-3"
    style={{
      display: info.thismonth !== undefined ? "block" : "none",
    }}
  >
    <li className="list-group-item text-center">
      <b className="font-weight-bold">
        {info.thismonth !== undefined ? info.classCase : ""}
      </b>
    </li>

    <li className="list-group-item">
      Variance:{"  "}
      <b>{info.thismonth !== undefined ? info.variance : 0} </b>
    </li>
    <li className="list-group-item">
      % var:{"  "}
      <b>{info.thismonth !== undefined ? info.pervariance.toFixed(4) : 0} </b>
    </li>
  </ul>
);
InfoDisplay.propTypes = {
  info: PropTypes.shape({
    thismonth: PropTypes.number,
    classCase: PropTypes.string,
    lastyear: PropTypes.number,
    variance: PropTypes.number,
    pervariance: PropTypes.number,
  }),
};

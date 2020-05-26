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
  const [selected, setSelected] = useState(0);

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
  let month = "";

  return (
    <Layout>
      <Row className="my-3">
        <Row className="mt-5">
          <Col>
            {data.loadedA && data.loadedB ? (
              <SelectedMonth data={main} sendValue={getValue} />
            ) : null}
          </Col>
        </Row>
        <Col className="position-relative">
          <p>
            COMPARATIVE STATISTICS TRENDS FOR 2019 AND 2020 AS AT {"  "}
            <span className="text-info">
              {" "}
              {month === "Invalid Date" ? "" : month}{" "}
            </span>
          </p>
          {data.loadedA && data.loadedB ? (
            <TableStats ntsa={main[selected]} />
          ) : (
            <p>Loading</p>
          )}
        </Col>
        <Col className="position-relative">
          <p>
            COMPARATIVE STATISTICS TRENDS FOR 2019 AND 2020 {"  "}
            <span className="text-info">
              {" "}
              {month === "Invalid Date" ? "" : month}{" "}
            </span>
          </p>
          {data.loadedA && data.loadedB ? (
            <TableStats ntsa={mainB[selected]} />
          ) : (
            <p>Loading</p>
          )}
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

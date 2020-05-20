import React from "react";
import { Row, Col } from "reactstrap";
import * as d3 from "d3";
import {
  SVG,
  Group,
  Path,
  Circle,
  Rect,
  Text,
  sumValues,
  months,
} from "../tools/SvgComp";
const gw = 380,
  gh = 380;
/*SCALES AND AXIS */
//scales
const xScale = d3.scaleTime().rangeRound([0, gw]);
const yScale = d3.scaleLinear().rangeRound([gh, 0]);
const aScale = d3.scaleSqrt().range([0, 10]);

//axis
const yaxis = d3
  .axisLeft(yScale)
  .ticks(5)
  .tickFormat((d) => (d > 0 ? d : ""));
const xaxis = d3.axisBottom(xScale).ticks(6); //.tickFormat(d => new Date(d).toDateString());
//grid lines
const gridlines = () => d3.axisLeft(yScale);

export default function lineChart({ datam, a, b, c, d }) {
  const cleanData = (data) =>
    data.map((d) => ({
      ...d,
      fatalties: +d.fatalties,
      slightlyInjured: +d.slightlyInjured,
      seriouslyInjured: +d.seriouslyInjured,
      addedon: new Date(d.addedon),
    }));
  const data = datam.map((d) => cleanData(d));

  const updateScales = (data, callback) => {
    //attach domain to scale
    xScale.domain(d3.extent(data, (d) => d[a]));
    yScale.domain(d3.extent(data, (d) => d[b]));
    aScale.domain([0, d3.max(data, (d) => d[b])]);
    callback();
  };
  const updateAxis = () => {
    const ygrp = d3.select("." + d);
    const xgrp = d3.select("." + c);
    const gridline = d3.select(".grid");
    //axis
    ygrp
      .transition()
      .duration(1000)
      .call(yaxis);
    xgrp
      .transition()
      .duration(1000)
      .call(xaxis);

    //grids
    gridline.call(
      gridlines()
        .tickSize(-2000, 0, 0)
        .tickFormat("")
    );

    //text on y axis
    ygrp
      .selectAll("text")
      .transition()
      .duration(1000)
      .attr("font-size", "1rem")
      .attr("font-family", "roboto")
      .attr("x", -15);
    //text on x axis
    xgrp
      .selectAll("text")
      .transition()
      .duration(1000)
      .attr("fill", "black")
      .attr("transform", "rotate(-60)")
      .attr("font-family", "roboto")
      .attr("font-size", "1rem")

      .attr("text-anchor", "end")
      .attr("y", 0)
      .attr("x", -15);
  };
  //line

  return (
    <Row>
      <Col>
        <SVG width={500} height={480} bg={"#fefefe"}>
          <Group gw={380} x={80} y={40} gh={380}>
            {data.map((d, i) => {
              updateScales(d, updateAxis);
              return <PathFinder key={i} data={d} a={a} b={b} />;
            })}

            {/*y axis */}
            <Group classlist={d} x={0} y={0}></Group>
            {/*x axis */}
            <Group classlist={c} x={0} y={380}></Group>
            {/*grid lines axis */}
            <Group classlist="grid" x={0} y={0}></Group>
          </Group>
        </SVG>
      </Col>
    </Row>
  );
}

const PathFinder = ({ data, a, b }) => {
  const line = d3
    .line()
    .x((d) => xScale(d[a]))
    .y((d) => yScale(d[b]));

  return <Path d={line(data)} fill="none" stroke={data[0].fill} strokew={2} />;
};

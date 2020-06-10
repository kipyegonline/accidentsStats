import React, { useState } from "react";
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
  ToolTip,
  Ptip,
} from "../tools/SvgComp";
import { splitEm } from "../Pie/piechart";

const gw = 420,
  gh = 400;
/*SCALES AND AXIS */
//scales
const xScale = d3.scaleTime().rangeRound([0, gw]);
const yScale = d3.scaleLinear().rangeRound([gh, 0]);
const aScale = d3.scaleSqrt().range([0, 10]);

//axis
const yaxis = d3.axisLeft(yScale).ticks(10);
//.tickFormat((d) => (d > 0 ? d : ""));
const xaxis = d3.axisBottom(xScale).ticks(10); //.tickFormat(d => new Date(d).toDateString());
//grid lines
const gridlines = () => d3.axisLeft(yScale);

export default function lineChart({ datam, a, b, c, d }) {
  const [tools, setTools] = useState({});
  const getValue = (data) => setTools(data);
  const cleanData = (data) =>
    data.map((d) => ({
      ...d,
      fatalties: +d.fatalties,
      slightlyInjured: +d.slightlyInjured,
      seriouslyInjured: +d.seriouslyInjured,
      addedon: new Date(d.addedon),
    }));
  //sort the incomng data immutably
  datam = datam.slice().sort((a, b) => a[0].rank - b[0].rank);
  const data = datam.map((d) => cleanData(d));

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

    /*
    gridline.call(
      gridlines()
        .tickSize(-2000, 0, 0)
        .tickFormat("")
    );*/

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
  const updateScales = (data, callback) => {
    //attach domain to scale
    xScale.domain(d3.extent(data, (d) => d[a]));
    yScale.domain([0, d3.max(data, (d) => d[b])]);
    aScale.domain([0, d3.max(data, (d) => d[b])]);
    setTimeout(() => callback(), 100);
  };
  //line

  return (
    <Row>
      <Col>
        <ToolBar tools={tools} />
        <SVG width={500} height={480} bg={"#fefefe"}>
          <Group gw={gw} x={60} y={20} gh={gh}>
            {/**Year label */}
            <Text x={gw / 2} y={10} fill="black">
              {2020}
            </Text>

            <Group y={0} x={0}>
              {/**labels */}
              {data
                .slice()
                .reverse()
                .map((d, i) => {
                  return (
                    <Rect
                      key={i}
                      width={30}
                      x={20}
                      y={15 + i * 15}
                      height={10}
                      fill={d[0]["fill"]}
                    />
                  );
                })}

              {/**Text label */}
              {data
                .slice()
                .reverse()
                .map((d, i) => (
                  <Text
                    key={i}
                    x={60}
                    fz="1rem"
                    y={25 + i * 15}
                    height={10}
                    transformer={0}
                    fill="black"
                  >
                    {splitEm(d[0]["victimClass"])}
                  </Text>
                ))}
            </Group>
            {data.slice().map((d, i) => {
              updateScales(d, updateAxis);

              return (
                <Group x={0} y={0} key={i}>
                  <PathFinder data={d} a={a} b={b} />
                  {<CirclePath d={d} a={a} b={b} sendValue={getValue} />}
                  {<LastText d={d} a={a} b={b} />}
                </Group>
              );
            })}

            {/*y axis */}
            <Group classlist={d} x={0} y={0}></Group>
            {/*x axis */}
            <Group classlist={c} x={0} y={gh}></Group>
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
    .y((d) => (yScale(d[b]) > gh ? Math.abs(gh - yScale(d[b])) : yScale(d[b])));

  return <Path d={line(data)} fill="none" stroke={data[0].fill} strokew={2} />;
};

const CirclePath = ({ d, a, b, sendValue }) => {
  let positionX, positionY;
  const handleMouseOver = (e, data) => {
    const selected = d3.select(e.target);
    const tools = {
      opacity: false,
      top: +selected.attr("cy"),
      left: +selected.attr("cx"),
      width: 100,
      info: data,
      bg: "lightblue",
      classCase: b,
    };
    if (positionX === selected.attr("cx")) {
    } else {
      positionX = selected.attr("cx");
      sendValue(tools);
    }
  };

  const handleMouseLeave = (e) => {
    const selected = d3.select(e.target);

    if (positionY === selected.attr("cx")) {
    } else {
      positionY = selected.attr("cx");
      // sendValue({ opacity: false });
    }
  };
  return d.slice().map((item, i) => (
    <Circle
      key={item.id}
      hh={(e) => handleMouseOver(e, item)}
      hl={handleMouseLeave}
      cx={xScale(item[a])}
      cy={
        yScale(item[b]) > gh ? Math.abs(gh - yScale(item[b])) : yScale(item[b])
      }
      r={i === 0 ? 5 : i * 3}
      fill={item.fill}
    >
      <title
        x={xScale(item[a])}
        y={
          yScale(item[b]) > gh
            ? Math.abs(gh - yScale(item[b]))
            : yScale(item[b])
        }
      >
        Feels
      </title>
    </Circle>
  ));
};
const LastText = ({ d, a, b }) => {
  let x = xScale(d[d.length - 1][a]);
  let y = yScale(d[d.length - 1][b]);

  return (
    <Text x={x - 10} y={y + 20} fw="bold" fill="black">
      {d[d.length - 1][b] > 1e3
        ? d[d.length - 1][b].toFixed(1) + "k"
        : d[d.length - 1][b]}
    </Text>
  );
};

const ToolBar = ({ tools }) => {
  return (
    <ToolTip tools={tools}>
      {tools.info !== undefined ? (
        <>
          <Ptip classlist="text-center">
            <b>{tools.info.addedon.toDateString()}</b>
          </Ptip>
          <Ptip>
            {tools.classCase} <b>{tools.info[tools.classCase]}</b>
          </Ptip>
        </>
      ) : null}
    </ToolTip>
  );
};

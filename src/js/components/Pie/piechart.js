import React, { useState, useEffect } from "react";
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

function NTSAPieChart({ datas, a, b }) {
  const data = datas.map((d) => ({
    ...d,
    fatalties: +d.fatalties,
    slightlyInjured: +d.slightlyInjured,
    seriouslyInjured: +d.seriouslyInjured,
    addedon: new Date(d.addedon),
  }));
  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(120);
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const pie = d3
    .pie()
    .value((d) => d[a])
    .sort(null);
  const dataset = pie(data);
  const handleHover = (e, data) => {
    console.log(data);
  };
  const handleLeave = () => {
    console.log("left");
  };
  useEffect(() => {}, []);
  //console.log("hfhfhfh", dataset[0], sumValues(data, a));
  const year = new Date(dataset[0].data.addedon).getFullYear();
  const month = months[new Date(dataset[0].data.addedon).getMonth()];

  return (
    <SVG height={380} width={500} bg="lightblue">
      {/*Top label*/}
      <Text x={150} y={30} fz="1.25rem" transformer={0}>
        {a.toUpperCase()} {"-"} {month}
        {", "}
        {year}
      </Text>
      {/*Rect labels*/}
      <Group x={300} y={70}>
        {dataset.map((d, i) => (
          <Rect
            key={i}
            x={20}
            y={30 + i * 15}
            fill={d.data.fill}
            height={10}
            width={30}
          />
        ))}
        {/**Text label */}
        {dataset.map((data, i) => (
          <Text
            key={data.index}
            x={55}
            fz="1rem"
            y={40 + i * 15}
            height={10}
            transformer={0}
            fill="black"
          >
            {splitEm(data.data[b])}
          </Text>
        ))}
      </Group>
      >{/**Pie slices */}
      {dataset.map((d, i) => (
        <Group x={180} y={200} key={i}>
          <Path
            d={arc(d)}
            hh={(e) => handleHover(e, d)}
            hl={handleLeave}
            fill={d.data.fill}
          />
          <Text
            key={i}
            transformer={arc.centroid(d)}
            TA="end"
            fill="black"
            classlist="pie-slices"
          >
            {d.data[a]}
          </Text>
        </Group>
      ))}
      <Text x={400} y={360} fw="bold" transformer={0}>
        Total: {sumValues(data, a)}
      </Text>
    </SVG>
  );
}

export default NTSAPieChart;

function splitEm(str) {
  if (str.indexOf("_") !== -1) {
    return str.split("_").join(" ");
  }
  return str;
}

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
  ToolTip,
  Ptip,
} from "../tools/SvgComp";
const getYear = (year = new Date()) => new Date(year).getFullYear();
function NTSAPieChart({ datas, a, b, diff }) {
  const [tools, setTools] = useState({});

  const radius = 120;
  const aScale = d3
    .scaleSqrt()
    .domain(d3.extent(datas, (d) => d[a]))
    .range([0, radius]);
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
    .outerRadius(radius);
  console.log(a);
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const pie = d3
    .pie()
    .value((d) => d[a])
    .sort(null);
  const dataset = pie(data);
  const handleHover = (e, data) => {
    if (getYear(data.data.addedon) === getYear()) {
      const coords = {
        top: 200,
        left: 350,
        opacity: true,
        info: data.data,
        width: 150,
      };
      setTools(coords);
    }
  };
  const handleLeave = () => {
    console.log("left");
    setTools({ opacity: false });
  };
  useEffect(() => {}, []);
  //console.log("hfhfhfh", dataset[0], sumValues(data, a));
  const year = new Date(dataset[0].data.addedon).getFullYear();
  const month = months[new Date(dataset[0].data.addedon).getMonth()];

  return (
    <>
      <ToolBar tools={tools} a={a} diff={diff} />
      <SVG height={380} width={500} bg="lightblue" position="relative">
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
              fill={d.data.fill} //d.data.fill
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
        <Text x={280} y={360} fw="bold" transformer={0}>
          Total {a}: {sumValues(data, a)}
        </Text>
      </SVG>
    </>
  );
}

export default NTSAPieChart;

export function splitEm(str) {
  if (str.indexOf("_") !== -1) {
    return str.split("_").join(" ");
  }
  return str;
}

const ToolBar = ({ tools, a, diff }) => {
  let lastYear, thisYear;

  if (tools.info) {
    thisYear = tools.info[a];
    if (getYear(tools.info.addedon) === getYear()) {
      lastYear = Number(
        diff.find((d) => d["victimClass"] === tools.info.victimClass)[a]
      );
    } else {
    }
  }
  return (
    tools.info !== undefined && (
      <ToolTip tools={tools}>
        <Ptip>
          This Year: <b>{tools.info !== undefined ? thisYear : ""}</b>
        </Ptip>
        <Ptip>
          Last Year: <b>{tools.info !== undefined ? lastYear : ""}</b>
        </Ptip>
        <Ptip>
          {" "}
          Variance: <b>{lastYear !== undefined ? thisYear - lastYear : ""}</b>
        </Ptip>
        <Ptip>
          {" "}
          % var:{" "}
          <b>
            {tools.info !== undefined
              ? (((thisYear - lastYear) / lastYear) * 100).toFixed(4)
              : ""}
          </b>
        </Ptip>
      </ToolTip>
    )
  );
};

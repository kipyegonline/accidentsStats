import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

//SVG component
export const SVG = ({
  height,
  width,
  bg,
  children,
  classlist,
  stroke,
  strokew,
  position,
}) => (
  <svg
    height={height}
    width={width}
    stroke={stroke}
    strokeWidth={strokew}
    className={classlist}
    style={{ background: bg }}
  >
    {children}
  </svg>
);
SVG.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  bg: PropTypes.string,
  children: PropTypes.node,
  classlist: PropTypes.string,
  stroke: PropTypes.string,
  strokew: PropTypes.number,
  position: PropTypes.string,
};
SVG.defaultProps = {
  bg: "#ddd",
  children: "",
  classlist: "",
  strokew: 1,
  stroke: "none",
};

//Group component
export const Group = ({ x, y, gh, gw, fill, children, classlist }) => (
  <g
    transform={`translate(${x},${y})`}
    fill={fill}
    height={gh}
    width={gw}
    className={classlist}
    shapeRendering="auto"
  >
    {children}
  </g>
);
Group.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  gh: PropTypes.number,
  gw: PropTypes.number,
  fill: PropTypes.string,
  children: PropTypes.node,
  classlist: PropTypes.string,
};

Group.defaultProps = {
  classlist: "",
  fill: "none",
  children: "",
};

//Rectangle component
export const Rect = ({
  x,
  y,
  hc,
  hh,
  hl,
  fill,
  classlist,
  height,
  width,
  opacity,
  style,
  stroke,
  strokew,
}) => (
  <rect
    x={x}
    onClick={hc}
    onMouseOver={hh}
    onMouseEnter={hh}
    onMouseLeave={hl}
    y={y}
    shapeRendering="crispEdges"
    height={height}
    width={width}
    opacity={opacity}
    fill={fill}
    style={style}
    stroke={stroke}
    strokeWidth={strokew}
    className={classlist}
  ></rect>
);

Rect.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  style: PropTypes.object,
  hc: PropTypes.func,
  hl: PropTypes.func,
  hh: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  fill: PropTypes.string,
  classlist: PropTypes.string,
  opacity: PropTypes.number,
  stroke: PropTypes.string,
  strokew: PropTypes.number,
};

Rect.defaultProps = {
  fill: "black",
  classlist: "",
  opacity: 1,
  style: {},
  strokew: 1,
  stroke: "none",
  hc: (f) => f,
  hh: (f) => f,
  hl: (f) => f,
};

//Text component
export const Text = ({
  x,
  y,
  children,
  transformer,
  classlist,
  fz,
  TA,
  fw,
  style,
  fill,
}) => {
  return (
    <text
      x={x}
      y={y}
      pointerEvents="none"
      textAnchor={TA}
      fontSize={fz}
      fontWeight={fw}
      fill={fill}
      transform={`translate(${transformer})`}
      className={classlist}
      style={style}
    >
      {children}
    </text>
  );
};
Text.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  TA: PropTypes.string,
  fz: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fw: PropTypes.string,
  fill: PropTypes.string,
  classlist: PropTypes.string,

  children: PropTypes.node,
  transformer: PropTypes.any, //oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
};

Text.defaultProps = {
  transformer: 0,
  fw: "normal",
  TA: "",
  fz: "",
  classlist: "",
};
//Path component
export const Path = ({
  d,
  hh,
  hl,
  fill,
  stroke,
  strokew,
  opacity,
  classlist,
}) => (
  <path
    d={d}
    className={classlist}
    opacity={opacity}
    stroke={stroke}
    fill={fill}
    onMouseOver={hh}
    onMouseLeave={hl}
    shapeRendering="auto"
    strokeWidth={strokew}
    style={{ position: "relative", transition: "all .25s ease-in" }}
  />
);
Path.propTypes = {
  d: PropTypes.string.isRequired,
  hh: PropTypes.func,
  hl: PropTypes.func,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokew: PropTypes.number,
  opacity: PropTypes.number,
  classlist: PropTypes.string,
};

Path.defaultProps = {
  hh: (f) => f,
  hl: (f) => f,
  fill: "black",
  stroke: "",
  strokew: 1,
  opacity: 1,
  classlist: "",
};

//Circle component
export const Circle = ({
  children,
  opacity,
  dash,
  strokew,
  stroke,
  cx,
  cy,
  r,
  fill,
  classlist,
  hh,
  hl,
  hv,
}) => (
  <circle
    cx={cx}
    cy={cy}
    r={r}
    shapeRendering="auto"
    fill={fill}
    onMouseEnter={hh}
    onMouseOver={hv}
    onClick={hh}
    opacity={opacity}
    strokeWidth={strokew}
    onMouseLeave={hl}
    stroke={stroke}
    strokeDasharray={dash}
    className={classlist}
  >
    {children}
  </circle>
);
Circle.propTypes = {
  hh: PropTypes.func,
  hl: PropTypes.func,
  hv: PropTypes.func,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  strokew: PropTypes.number,
  dash: PropTypes.number,
  opacity: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  classlist: PropTypes.string,
  children: PropTypes.node,
};
Circle.defaultProps = {
  hh: (f) => f,
  hl: (f) => f,
  fill: "black",
  dash: 0,
  opacity: 1,
  stroke: "none",
  strokew: 2,
  classlist: "",
  children: "",
};
export const sumValues = (arr, field) => {
  const num = arr
    .filter((ar) => !Number.isNaN(Number(ar[field])))
    .reduce((a, b) => (a += +b[field]), 0);
  return num > 1e3 ? num.toLocaleString() : num;
};
export const AddObjectProps = (data, a) => {
  const ans = data.find((d) => d.victimClass === a);

  if (ans !== undefined) {
    const f =
      Number(ans["fatalties"]) +
      Number(ans["slightlyInjured"]) +
      Number(ans["seriouslyInjured"]);
    return f >= 1000 ? f.toLocaleString() : f;
  }
};
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ToolTip = styled.div`
  width: ${(props) => (props.tools !== undefined ? props.tools.width : 0)}px;
  height: 120px;
  z-index: 100;
  pointer-events: none;
  text-transform: capitalize;
  position: absolute;
  padding: 1rem;
  margin: ${(props) => console.log("daigle", props.tools)};
  line-height: 1em;
  top: ${(props) => (props.tools !== undefined ? props.tools.top : 0)}px;
  left: ${(props) => (props.tools !== undefined ? props.tools.left : 0)}px;
  opacity: ${(props) =>
    props.tools.opacity !== undefined
      ? props.tools.opacity == true
        ? 1
        : 0
      : 0};
  background: ${(props) => (props.tools.bg ? props.tools.bg : "white")};
  transform: translate(
    ${(props) => props.tools.left},
    ${(props) => props.tools.top}
  );
  pointer-events: none;

  @media (max-width: 380px) {
    width: ${(props) => (props.tools !== undefined ? props.tools.width : 0)};
    top: ${(props) => (props.tools !== undefined ? props.tools.top : 0)};
    left: ${(props) => (props.tools !== undefined ? props.tools.left : 0)};
    background: yellow;
  }
`;
export const Ptip = styled.p`
  margin: 0;
  padding: 0.25rem 0;
  font-size: 1rem;

  line-height: 1em;
`;

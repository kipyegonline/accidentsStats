import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SVG, Group } from "./SvgComp";
import { interpolate } from "d3";
Enzyme.configure({ adapter: new Adapter() });

//svg comp
describe("<SVG/> component", () => {
  const wrapper = shallow(
    <SVG height={100} bg="#111" width={200} classlist="svg" />
  );
  it("exists", () => expect(wrapper.hasClass("svg")).toBeTruthy());
  it("has props", () =>
    expect(wrapper.props()).toEqual({
      height: 100,
      width: 200,
      style: { background: "#111" },
      className: "svg",
      stroke: "",
      children: "",
      strokeWidth: 0,
    }));
});

//Group
describe("<Group/> component", () => {
  const wrapper = shallow(
    <Group x={100} y={200} gh={480} gw={400} fill={"grey"} classlist="group" />
  );
  it("renders", () => expect(wrapper.find("g")).toHaveLength(1));
  it("Has props", () =>
    expect(wrapper.props()).toEqual({
      children: "",
      transform: "translate(100,200)",
      height: 480,
      width: 400,
      fill: "grey",
      className: "group",
      shapeRendering: "auto",
    }));
});

import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NTSAPieChart from "../components/Pie/piechart";
import { MockStore } from "./redux.test";
Enzyme.configure({ adapter: new Adapter() });
const data = [
  {
    fatalties: 40,
    slightlyInjured: 120,
    victimClass: "pedestrians",
    seriouslyInjured: 180,
    addedon: "2020-03-20",
  },
  {
    fatalties: 70,
    slightlyInjured: 200,
    victimClass: "passengers",
    seriouslyInjured: 280,
    addedon: "2020-04-20",
  },

  {
    fatalties: 140,
    slightlyInjured: 240,
    victimClass: "drivers",
    seriouslyInjured: 380,
    addedon: "2020-04-20",
  },
];
describe("<NTSAPie/>", () => {
  let wrapper = mount(
    <MockStore>
      <NTSAPieChart datas={data} a="fatalties" b="victimClass" />
    </MockStore>
  );

  describe("SVG", () => {
    it("counts paths", () => expect(wrapper.find("path")).toHaveLength(3));
    it("counts groups", () => expect(wrapper.find("g")).toHaveLength(4));
    it("counts text tags", () => expect(wrapper.find("text")).toHaveLength(8));
    it("counts rects", () => expect(wrapper.find("rect")).toHaveLength(3));
    it("checks text at 0", () =>
      expect(
        wrapper
          .find("text")
          .at(1)
          .text()
      ).toBe("Total:300"));
  });
  test("mouseenter event", () => {
    const wedge = wrapper.find("path").at(0);
    wedge.simulate("mouseenter", { target: { value: 0 } });
  });
});

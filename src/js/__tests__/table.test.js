import React, { Component } from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TableStats from "../components/Table/Table";
import { SelectedMonth } from "../components/main";
import {
  TableBody,
  TableList,
  TableFoot,
  TableHeader,
} from "../components/Table/TableList";
import { AddObjectProps } from "../components/tools/SvgComp";

import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });
export const data = [
  [
    {
      addedon: "2020-02-14",
      id: 1,
      fatalties: 345,
      slightlyInjured: 435,
      seriouslyInjured: 654,
      victimClass: "drivers",
      fill: "green",
    },

    {
      addedon: "2020-03-14",
      id: 2,
      fatalties: 245,
      slightlyInjured: 405,
      seriouslyInjured: 554,
      victimClass: "pillion_passengers",
      fill: "yellow",
    },
    {
      addedon: "2020-05-14",
      id: 3,
      fatalties: 445,
      slightlyInjured: 535,
      seriouslyInjured: 454,
      victimClass: "pedestrians",
      fill: "red",
    },
    {
      id: 4,
      victimClass: "passengers",
      fill: "orange",
      fatalties: "221",
      slightlyInjured: "919",
      seriouslyInjured: "715",
      addedon: "2019-04-23",
    },
    {
      id: 5,
      victimClass: "motor_cyclists",
      fill: "green",
      fatalties: "204",
      slightlyInjured: "98",
      seriouslyInjured: "356",
      addedon: "2019-04-23",
    },
  ],
];

describe("<Select /> Component", () => {
  let _change = jest.fn();
  const wrapper = shallow(<SelectedMonth sendValue={_change} data={data} />);

  test("presence of select component", () =>
    expect(wrapper.find(".form-control")).toHaveLength(1));
  it("has text", () =>
    expect(
      wrapper
        .find("option")
        .at(0)
        .text()
    ).toBe("February"));
  it("changes on changes", () => {
    wrapper.find(".form-control").simulate("change", { target: { value: 0 } });

    expect(_change).toBeCalled();
    expect(_change).toBeCalledWith(0);
    expect(_change).toBeCalledTimes(1);
  });
  it("shows current value when not selected", () =>
    expect(wrapper.find(".form-control").prop("value")).toBe(0));
});
describe("<TableBody/>", () => {
  const _sendValue = jest.fn();
  const wrapper = shallow(
    <TableBody
      name={data[0][0]["fatalties"]}
      classlist={data[0][0]["victimClass"]}
      yoda={data[0][0]}
      sendValue={_sendValue}
    />
  );
  it("renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("has text", () => expect(wrapper.text()).toBe("345"));
  it("has class", () =>
    expect(wrapper.prop("className")).toBe("drivers-fatalties-2020"));
  it.skip("mouse enter", () => {
    //mouse event is tricky to test as there is function that requires the dom element, so we assume jeshi iko sawa
    wrapper.simulate("mouseenter", { target: { data: data[0][0] } });
    expect(wrapper.prop("className")).toBe("drivers purple");
  });
});
describe("<TableFoot/>", () => {
  const wrapper = shallow(<TableFoot data={data[0]} a="drivers" />);

  test("text value", () => {
    expect(wrapper.text()).toBe(AddObjectProps(data[0], "drivers"));
  });
  it("has hover prop", () =>
    expect(wrapper.prop("data-hover")).toBe("summary_drivers_2020"));
});

//table header
describe("<TableHeader/>", () => {
  //nothing much to test but i need to find if the split function works correctly
  //my favourite so far
  const wrapper = shallow(<TableHeader name="pillion_passsengers" />);
  test("presence of text", () =>
    expect(wrapper.text()).toBe("Pillion passsengers"));
});

//mounting the whole component
//
describe("<TableStats/>", () => {
  const wrapper = mount(<TableStats ntsa={data[0]} />);
  it("matches snapshot", () => {
    expect(toJson(wrapper.find("table"))).toMatchSnapshot();
  });
  test("dear presence", () =>
    expect(
      wrapper
        .find("tr")
        .at(0)
        .find(TableHeader)
    ).toHaveLength(5));
  test("That 6 row are rendered", () => {
    expect(wrapper.find("tr")).toHaveLength(5);
  });
});

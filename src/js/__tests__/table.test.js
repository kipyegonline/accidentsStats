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

Enzyme.configure({ adapter: new Adapter() });
export const data = [
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
];
/*
describe("<Select /> Component", () => {
  let _change = jest.fn();
  const wrapper = shallow(<SelectedMonth sendValue={_change} data={data} />);

  test("presence of component", () =>
    expect(wrapper.find(".form-control")).toHaveLength(1));
  it("has text", () =>
    expect(
      wrapper
        .find("option")
        .at(1)
        .text()
    ).toBe("February"));
  it("changes on changes", () => {
    wrapper.find(".form-control").simulate("change", { target: { value: 0 } });

    expect(_change).toBeCalled();
    expect(_change).toBeCalledWith(0);
    expect(_change).toBeCalledTimes(1);
  });
  it("shows current undefined value when not selected", () =>
    expect(wrapper.find(".form-control").prop("value")).toBeUndefined());
});*/
describe("<TableList/>", () => {
  const wrapper = mount(
    <table>
      <tbody>
        <tr>
          <TableList data={data} a="fatalties" TableBody={TableBody} />
        </tr>
      </tbody>
    </table>
  );
  it("renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  //console.log(wrapper.debug());
});

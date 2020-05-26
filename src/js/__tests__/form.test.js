import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import AddStats, {
  ClassSelect,
  addClass,
  DataInput,
} from "../components/AddStats/addstats";
import { interpolate } from "d3";

Enzyme.configure({ adapter: new Adapter() });

describe("<AddStatsForm/>", () => {
  const wrapper = mount(<AddStats />);
  describe("Tje form renders the UI", () => {
    test("Matches snapshot", () =>
      expect(toJSON(wrapper.find("form"))).toMatchSnapshot());
    it("has 4 input elements ", () =>
      expect(wrapper.find("input").length).toBe(4));
    //3 not 2 since i also mounted a button from the navbar
    it("has 2 buttons", () => expect(wrapper.find("button")).toHaveLength(3));
  });
  it("The year button does the right thing", () => {
    //text
    expect(wrapper.find(".year-btn").text()).toBe("2020");
    //props
    const toggleYear = () => console.log("Mock");
    expect(wrapper.find(".year-btn").props()).toEqual({
      type: "button",
      children: "2020",
      className: "btn blue darken-2 btn-md text-white year-btn",
      onClick: toggleYear,
      style: { fontSize: "1rem" },
    });

    //click event
    let ybtn = wrapper.find(".year-btn");
    ybtn.simulate("click");
    expect(
      wrapper
        .find("button")
        .at(1)
        .text()
    ).toBe("2010");
  });

  //the paragraphs
});
describe("<Input/> component", () => {
  const _sendValue = jest.fn();
  const wrapper = shallow(
    <DataInput
      sendValue={_sendValue}
      type="text"
      name="SeriousInjuries"
      id="seriousInjuries"
      placeholder=""
    />
  );

  test(" props", () =>
    expect(wrapper.props()).toEqual({
      name: "SeriousInjuries",
      type: "text",
      id: "seriousInjuries",
      className: "form-control",
      placeholder: "",
      onChange: (f) => f,
      onBlur: (f) => f,
    }));

  it("changes on text enter", () => {
    wrapper.simulate("change", { target: { value: "juless" } });
    expect(_sendValue).toBeCalled();
    expect(_sendValue).toBeCalledTimes(1);
    //Because i am ecxpecting a number not a string
    expect(_sendValue).toBeCalledWith(NaN);
  });
  it.skip("blurs", () => {
    wrapper.simulate("blur", { target: { value: "" } });
    expect(wrapper.find("small")).toHaveLength(1);
  });
  // click and change eventevent
});
describe("<ClassSelect/>", () => {
  const _getValue = jest.fn();
  const wrapper = mount(
    <ClassSelect getValue={_getValue} selected="Select test" data={addClass} />
  );
  describe("Render the damn UI", () => {
    //presence of selcet elemente
    test("Presence of aselect element", () =>
      expect(wrapper.find(".form-control")).toHaveLength(1));
    //rendersexact number of  options
    expect(wrapper.find("option")).toHaveLength(addClass.length + 1);
    expect(
      wrapper
        .find("option")
        .at(1)
        .text()
    ).toBe(addClass[0].name);
    //the second  option has correct value and text
    expect(
      wrapper
        .find("option")
        .at(1)
        .prop("value")
    ).toBe(addClass[0].id);
    //check the default option value
    expect(
      wrapper
        .find("option")
        .at(0)
        .text()
    ).toBe("Select Victim class");
  });
  //change event
  it("Changes on select", () => {
    wrapper
      .find("option")
      .at(1)
      .simulate("change");
    expect(_getValue).toBeCalled();
    expect(_getValue).toBeCalledTimes(1);
    expect(_getValue).toBeCalledWith(1);
  });
});
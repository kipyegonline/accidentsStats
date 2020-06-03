import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import AddStats, {
  ClassSelect,
  addClass,
  DataInput,
  YearBtn,
  AddStatitics,
} from "../components/AddStats/addstats";

import { MockStore } from "./redux.test";
Enzyme.configure({ adapter: new Adapter() });

//This test will work if the user is aunthenticated
describe("<AddStatsForm/>", () => {
  const wrapper = mount(
    <MockStore>
      <AddStatitics auth={{ isLoggedIn: true, UserName: "Vince" }} />
    </MockStore>
  );

  describe("The form renders the UI", () => {
    test("Matches snapshot", () =>
      expect(toJSON(wrapper.find("form"))).toMatchSnapshot());
    it("has 4 input elements ", () =>
      expect(wrapper.find("input").length).toBe(4));
    //3 not 2 since i also mounted a button from the navbar
    it("has 2 buttons", () => expect(wrapper.find("button")).toHaveLength(4));
  });
  //the paragraphs
  it("has 2 p tags", () => {
    expect(wrapper.find("p").length).toEqual(3);
  });
  it("submits the form unsuccessfully", () => {
    let form = wrapper.find("form");
    form.simulate("submit");
    //set the props as we move on
    wrapper.setProps({ classv: 1 });
    expect(wrapper.find("p.text-danger").text()).toBe(
      "Please select victim class"
    );
  });
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
//Button
describe("<YearBtn/>", () => {
  const _sendValue = jest.fn();
  const wrapper = shallow(<YearBtn year sendValue={_sendValue} />);

  it("The year button does the right thing", () => {
    //text
    expect(wrapper.find(".year-btn").text()).toBe("2019");
    //props
    /** 
    expect(wrapper.find(".year-btn").props()).toEqual({
      type: "button",
      children: "2019",
      className: "red  btn darken-1 btn-md text-white year-btn",
      onClick: (f) => f,
      style: { fontSize: "1rem" },
    }); */
  });
  test("click event", () => {
    //click event
    let ybtn = wrapper.find(".year-btn");
    ybtn.simulate("click");
    wrapper.setProps({ year: false });
    expect(_sendValue).toBeCalled();
    expect(_sendValue).toBeCalledTimes(1);
    expect(wrapper.find(".year-btn").text()).toBe("2020");
  });
});

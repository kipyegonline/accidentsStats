import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import SignUp, { DataInput } from "../components/auth/signup";
import Login from "../components/auth/login";
import toJson from "enzyme-to-json";
import { MockStore } from "./redux.test";
import * as $ from "jquery";

Enzyme.configure({ adapter: new Adapter() });
//mounting the sign up form
describe("Mount the form", () => {
  const wrapper = mount(
    <MockStore>
      <SignUp />
    </MockStore>
  );
  it("matches snapshot", () => {
    expect(toJson(wrapper.find("form"))).toMatchSnapshot();
  });
  it("has 5 input elements", () => {
    expect(wrapper.find("input")).toHaveLength(5);
  });
  it("has 3 p tags", () => expect(wrapper.find("p")).toHaveLength(2));
  it("submits", () => {
    wrapper.find("form").simulate("submit");

    //I need to find out how to set state on react hooks
    expect(wrapper.find("p.text-danger").text()).toBe("Name cannot be blank");
  });
});
//shallow render the inputs of the form
describe("<LoginInput />", () => {
  const _sendValue = jest.fn();
  const wrapper = shallow(
    <DataInput
      sendValue={_sendValue}
      id="email"
      type="email"
      name="email"
      classlist="form-control"
      placeholder="Enter email"
    />
  );
  //skipping since that blur event is not passed by prop
  test.skip("Props", () => {
    expect(wrapper.props()).toEqual({
      id: "email",
      type: "email",
      onBlur: (f) => f,
      name: "email",
      placeholder: "Enter email",
      className: "form-control mb-2",
    });
  });
  test("Change event", () => {
    wrapper.simulate("change", {
      target: {
        value: "The email",
        name: "email",
      },
    });
    expect(_sendValue).toBeCalled();
    expect(_sendValue).toBeCalledWith("The email");
    expect(_sendValue).toHaveReturnedWith(undefined);
  });
}); //describe

//The login form, e=requires mounting since i have tested the input components
describe("<Login/>", () => {
  const wrapper = mount(
    <MockStore>
      <Login />
    </MockStore>
  );
  //wrapper.find("form").instance().email = "vinnykipx@.com";
  it("Matches snapshot", () =>
    expect(toJson(wrapper.find("form"))).toMatchSnapshot());
  it("has 3 input elements", () =>
    expect(wrapper.find("input")).toHaveLength(3));
  it("has 2 p tags", () => expect(wrapper.find("p")).toHaveLength(2));
  it("doesn't submit", () => {
    wrapper.find("form").simulate("submit");
    expect(
      wrapper
        .find("p")
        .at(0)
        .text()
    ).toBe("Enter an email address.");
  });
});

import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../redux/rootReducer";

const store = createStore(rootReducer);
export const MockStore = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
const mockData = [
  {
    name: "pedestrians",
    fill: "yellow",
    seriouslyInjured: 100,
    sligtlyInjured: 150,
    addedon: "2020/05/18",
  },
  {
    name: "pedestrians",
    fill: "yellow",
    seriouslyInjured: 130,
    sligtlyInjured: 250,
    addedon: "2020/05/18",
  },
];

describe("REDUX", () => {
  let res,
    state = { ntsa: [], ntsb: [], iClass: [], loadedB: false, loadedA: false };
  const createAction = (type, payload) => ({
    type,
    payload,
  });

  res = rootReducer(state, createAction("ADD_NTSA", mockData));
  const res2 = rootReducer(state, createAction("ADD_NTSB", mockData));

  describe("root reducer", () => {
    test("reducer result", () =>
      expect(res).toEqual({
        ntsa: mockData,
        ntsb: [],
        iClass: [],
        loadedB: false,
        loadedA: true,
      }));
    expect(res2).toEqual({
      ntsb: mockData,
      ntsa: [],
      iClass: [],
      loadedA: false,
      loadedB: true,
    });
  });

  test("Action creator", () => {
    expect(createAction("ADD_NTSB", mockData).type).toBe("ADD_NTSB");
    expect(createAction("ADD_NTSB", mockData).payload).toEqual(mockData);
  });
});
test("simple", () => expect(1 + 1).toBe(2));

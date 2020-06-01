const initState = {
  ntsa: [],
  ntsb: [],
  loadedA: false,
  loadedB: false,
  iclass: [],
  auth: { isLoggedIn: true, userName: "kipyegonline" },
};

function rootReducer(state = initState, action) {
  if (action.type === "ADD_NTSA") {
    return { ...state, ntsa: action.payload, loadedA: true };
  } else if (action.type === "ADD_NTSB") {
    return { ...state, ntsb: action.payload, loadedB: true };
  } else if (action.type === "ADD_CLASS") {
    return { ...state, iclass: action.payload };
  } else {
    return state;
  }
}
export default rootReducer;

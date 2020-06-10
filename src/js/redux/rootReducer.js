const initState = {
  ntsa: [],
  ntsb: [],
  loadedA: false,
  loadedB: false,
  iclass: [],
  auth: {}, //{ isLoggedIn: true, userName: "kipyegonline" },
};

function rootReducer(state = initState, action) {
  switch (action.type) {
    case "ADD_NTSA":
      return { ...state, ntsa: action.payload, loadedA: true };
    case "ADD_NTSB":
      return { ...state, ntsb: action.payload, loadedB: true };
    case "ADD_CLASS":
      return { ...state, iclass: action.payload };
    case "ADD_AUTH":
      return { ...state, auth: action.payload };
    case "REMOVE_AUTH":
      return { ...state, auth: {} };
    default:
      return state;
  }
}
export default rootReducer;

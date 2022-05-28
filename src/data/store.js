import { createStore } from "redux";
import { login, logout, toggleUsed, toggleInterested } from "./user";
import { setTools } from "./tool";

const initState = {
  isLogin: false,
  user: null,
  usedDHT: {},
  interestedDHT: {},
  tools: [],
};

function dataReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case login.case:
      console.log(login.case);
      return login.reduce(state, payload);

    case logout.case:
      console.log(logout.case);
      return logout.reduce(state, payload);

    case toggleUsed.case:
      console.log(toggleUsed.case);
      return toggleUsed.reduce(state, payload);

    case toggleInterested.case:
      console.log(toggleInterested.case);
      return toggleInterested.reduce(state, payload);

    case setTools.case:
      console.log(setTools.case);
      return setTools.reduce(state, payload);
    default:
      return state;
  }
}
const store = createStore(dataReducer);
export default store;

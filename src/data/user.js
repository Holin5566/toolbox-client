import { Case } from "./helper";

export const login = new Case("login", (state, payload) => {
  const { user, interestedDHT, usedDHT } = payload;
  return { ...state, isLogin: true, user, interestedDHT, usedDHT };
});

export const logout = new Case("logout", (state, payload) => {
  return {
    ...state,
    isLogin: false,
    user: null,
    interestedDHT: {},
    usedDHT: {},
  };
});

export const toggleUsed = new Case("toggleUsed", (state, payload) => {
  // payload = { _id }
  const { _id } = payload;
  const copyState = JSON.parse(JSON.stringify(state));
  copyState.usedDHT[_id] = !copyState.usedDHT[_id];
  return copyState;
});

export const toggleInterested = new Case(
  "toggleInterested",
  (state, payload) => {
    // payload = { _id }
    const { _id } = payload;
    const copyState = JSON.parse(JSON.stringify(state));
    copyState.interestedDHT[_id] = !copyState.interestedDHT[_id];
    return copyState;
  }
);

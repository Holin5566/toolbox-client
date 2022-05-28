import { Case } from "./helper";

export const setTools = new Case("setTools", (state, payload) => {
  return { ...state, tools: payload };
});

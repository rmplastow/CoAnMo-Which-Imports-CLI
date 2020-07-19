import { ActionI } from "coanmo-plugin-cli";

export const random: ActionI = {
  name: "random",
  summary: "Shows a random number",
  synopsis: "Shows a random number",
  fn() {
    return `${Math.random()}`.slice(2);
  }
};

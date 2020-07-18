import { ActionI, ActionMetaI } from "coanmo-plugin-cli";

export const version: ActionI = {
  name: "version",
  summary: "Shows the CoAnMo’s version",
  fn(args: string[], meta: ActionMetaI) {
    const { name, version } = meta;
    return `${name} ${version}`;
  }
};

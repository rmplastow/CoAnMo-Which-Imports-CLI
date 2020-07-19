import { ActionI, ActionMetaI } from "coanmo-plugin-cli";

export enum Hue {
  red = "red",
  orange = "orange",
  yellow = "yellow",
  green = "green",
  cyan = "cyan",
  blue = "blue",
  magenta = "magenta",
  grey = "grey"
}

export function stringToHue(string: string): Hue | void {
  switch (string) {
    case "red":
      return Hue.red;
    case "orange":
      return Hue.orange;
    case "yellow":
      return Hue.yellow;
    case "green":
      return Hue.green;
    case "cyan":
      return Hue.cyan;
    case "blue":
      return Hue.blue;
    case "magenta":
      return Hue.magenta;
    case "grey":
      return Hue.grey;
    default:
      return undefined;
  }
}

export function getCurrentHue(doc: Document): Hue {
  const hueClass = doc.body.className
    .split(/\s+/)
    .find(className => className.slice(0, 4) === "hue-");
  if (!hueClass) return Hue.blue; // `undefined` defaults to blue, if not found
  const hue = stringToHue(hueClass.slice(4));
  if (!hue) return Hue.blue; // 'hue-nope' defaults to blue
  return hue;
}

export const hue: ActionI = {
  name: "hue",
  summary: "Gets/sets the color scheme",
  fn(args: string[], meta: ActionMetaI) {
    const currentHue = getCurrentHue(document);
    if (args.length === 0) return `${currentHue}`;
    if (args.length !== 1)
      return `'hue' got ${args.length} args, expected 0 or 1 ${args.join()}`;
    const newHue = stringToHue(args[0]);
    if (!newHue)
      return `'hue' got unexpected argument '${args[0]}' — try 'green'`;
    document.body.classList.remove(`hue-${currentHue}`);
    document.body.classList.add(`hue-${args[0]}`);
    return `Was ${currentHue}, now ${args[0]}`;
  }
};

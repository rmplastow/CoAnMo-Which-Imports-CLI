import "./style";
import { name, version } from "../package.json";
import { CoAnMoPluginCli } from "coanmo-plugin-cli";
import { actions } from "./Actions/actions";

class CoAnMoWhichImportsCLI {
  private cli: CoAnMoPluginCli;

  constructor(
    private name: string,
    private version: string,
    selector: string,
    doc: HTMLDocument,
    meta: string,
  ) {
    this.cli = new CoAnMoPluginCli(
      name,
      version,
      `${selector} .stdin`,
      `${selector} .stdout`,
      doc,
      meta,
      window.localStorage
    );

    this.cli.addActions(actions);
    this.cli.log("Ready");
  }

  receiveMessage(event: MessageEvent) {
    // @TODO add validation and security
    if (typeof event.data === "string") this.cli.run(event.data);
  }
}

const coanmo = new CoAnMoWhichImportsCLI(
  name,
  version,
  "#coanmo-which-imports-cli",
  document,
  'Some Meta String!'
);

window.addEventListener(
  "message",
  (event: MessageEvent) => coanmo.receiveMessage(event),
  false
);

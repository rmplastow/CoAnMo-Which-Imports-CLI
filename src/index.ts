import './style';
import { CoAnMoPluginCliV1 } from "coanmo-plugin-cli";
import { actions } from "./Actions/actions";

class CoAnMoWhichImportsCLI {
  private cli: CoAnMoPluginCliV1;

  constructor(
    private name: string,
    private version: string,
    selector: string,
    doc: HTMLDocument
  ) {
    this.cli = new CoAnMoPluginCliV1(
      name,
      version,
      `${selector} .stdin`,
      `${selector} .stdout`,
      doc
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
  "CoAnMo Which Imports CLI",
  "1.0.7",
  "#coanmo-which-imports-cli",
  document
);

window.addEventListener(
  "message",
  (event: MessageEvent) => coanmo.receiveMessage(event),
  false
);

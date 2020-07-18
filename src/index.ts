import { CoAnMoPluginCliV1 } from "coanmo-plugin-cli";
import { actions } from "./Actions/actions";

class CoAnMoWhichImportsCLI {
  // private $wrap: HTMLDivElement | null;
  private cli: CoAnMoPluginCliV1;

  constructor(
    private name: string,
    private version: string,
    selector: string,
    doc: HTMLDocument
  ) {
    // this.$wrap = doc.querySelector(selector);

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
    this.cli.log(Object.keys(event).join());
    this.cli.log(event.origin)
    if (event.source instanceof Window)
      this.cli.log(JSON.stringify(event.source.COANMO_GLOBAL_OBJECT))
    this.cli.log(JSON.stringify(event.data))
  }
}

const coanmo = new CoAnMoWhichImportsCLI(
  "CoAnMo Which Imports CLI",
  "1.0.2",
  "#coanmo-which-imports-cli",
  document
);

window.addEventListener("message", coanmo.receiveMessage, false);
window.addEventListener("message", () => alert('Got something!'), false);

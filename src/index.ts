import { CoAnMoPluginCliV1 } from "coanmo-plugin-cli";
import { actions } from "./Actions/actions";

class CoAnMoWhichImportsCLI {
  private $wrap: HTMLDivElement | null;
  private cli: CoAnMoPluginCliV1;

  constructor(
    private name: string,
    private version: string,
    selector: string,
    doc: HTMLDocument
  ) {
    this.$wrap = doc.querySelector(selector);

    this.cli = new CoAnMoPluginCliV1(
      name,
      version,
      `${selector} .stdin`,
      `${selector} .stdout`,
      doc
    );

    this.cli.addActions(actions);

    this.cli.focusOnInput();
    this.cli.log("ok");
  }
}

new CoAnMoWhichImportsCLI(
  "CoAnMo Which Imports CLI",
  "1.0.0",
  "#coanmo-which-imports-cli",
  document
);

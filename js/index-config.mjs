import { loadRespecWithConfiguration } from "https://logius-standaarden.github.io/publicatie/respec/organisation-config.mjs";
import { baseConfig } from "./config.mjs";

loadRespecWithConfiguration({
  ...baseConfig,
  alternateFormats: [{
    label: "Versie voor dienstverleners",
    uri: "dv.html",
  }],
});



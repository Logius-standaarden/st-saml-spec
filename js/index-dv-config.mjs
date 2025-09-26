import { loadRespecWithConfiguration } from "https://logius-standaarden.github.io/publicatie/respec/organisation-config.mjs";
import { baseConfig } from "./config.mjs";

loadRespecWithConfiguration({
    ...baseConfig,
    publishVersion: "0.0.3-dv",
});

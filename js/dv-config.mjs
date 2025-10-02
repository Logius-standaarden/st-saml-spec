import { loadRespecWithConfiguration } from "https://logius-standaarden.github.io/publicatie/respec/organisation-config.mjs";
import { baseConfig } from "./config.mjs";

loadRespecWithConfiguration({
    ...baseConfig,
    fileName: "dv.html",
    postProcess: [
        ...baseConfig.postProcess,
        (config, document, utils) => {
            const nodes = document.querySelectorAll('[data-hide-if]');
            if (nodes.length === 0) {
                utils.showError('Geen nodes gevonden om te hiden, zijn er wel nodes met "data-hide-if"?');
            }
            for (const el of nodes) {
                if (el.dataset.hideIf === config.fileName) {
                    el.remove();
                }
            }
        }
    ]
});

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
            // Definition panels are finalized after post-processing.
            document.respec.ready.then(() => {
                for (const panel of document.querySelectorAll('.dfn-panel')) {
                    const selfLink = panel.querySelector('a.self-link[href^="#"]');
                    if (selfLink && !document.getElementById(decodeURIComponent(selfLink.hash.slice(1)))) {
                        panel.remove();
                        continue;
                    }
                    for (const link of panel.querySelectorAll('a[href^="#"]')) {
                        if (!document.getElementById(decodeURIComponent(link.hash.slice(1)))) {
                            const item = link.closest('li');
                            link.remove();
                            if (item && !item.querySelector('a')) item.remove();
                        }
                    }
                }
            });
            // Remove index references to passages omitted from the DV edition.
            for (const link of document.querySelectorAll('#index a[href^="#"]')) {
                const targetId = decodeURIComponent(link.hash.slice(1));
                if (targetId && !document.getElementById(targetId)) {
                    const item = link.closest('li');
                    if (item) item.remove();
                    else link.remove();
                }
            }
        }
    ]
});

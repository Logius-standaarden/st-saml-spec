import { loadRespecWithConfiguration } from "https://logius-standaarden.github.io/publicatie/respec/organisation-config.mjs";

loadRespecWithConfiguration({
  maxTocLevel: 5,
  lint: {
        "no-unused-dfns": false
      },  
  useLogo: true,
  useLabel: true,
  license: "cc-by",
  specStatus: "WV",
  specType: "HR",
  pubDomain: "st",
  shortName: "saml",
  publishDate: "2025-07-30",
  publishVersion: "0.0.3",
  prevVersion: [],

  // TODO: Verwijder voordat de release plaats vindt
  latestVersion: "https://logius-standaarden.github.io/st-saml-spec/",

  editors: [{
    name: "Frans de Kok",
    company: "Logius",
    companyURL: "https://www.logius.nl"
  }],
  authors: [{
      name: "Frans de Kok (Logius)"
    },{
      name: "Jan Geert Koops (DICTU)"
    },{
      name: "Mark Nijmeijer (DICTU)"
    },{
      name: "Wiljan Pitlo (ICTU)"
    },{
      name: "Carlo Huiden (ICTU)"
  }],
  github: "https://github.com/Logius-standaarden/st-saml-spec",
});

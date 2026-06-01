import { generateMermaidFigures } from "https://logius-standaarden.github.io/publicatie/respec/plugins/mermaid.mjs";

export const baseConfig = {
  maxTocLevel: 5,
  lint: {
        "no-unused-dfns": false
      },  
  useLogo: true,
  useLabel: true,
  license: "cc-by",
  specStatus: "DEF",
  specType: "HR",
  pubDomain: "st",
  shortName: "saml",
  publishDate: "2026-06-01",
  publishVersion: "1.0.0",
  prevVersion: [],

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

  postProcess: [generateMermaidFigures],

  localBiblio: {
    "ST-SAML1.0": {
      title: "Stelsel Toegang SAML v1.0 specification",
      href: "https://logius.gitlab.io/digid-combiconnect",
      publisher: "LOGIUS"
    },
    "DigiD CC1.1": {
      title: "DigiD CombiConnect 1.1 specification",
      href: "https://logius.gitlab.io/digid-combiconnect",
      publisher: "LOGIUS"
    },
    "eID SAML4.4": {
      title: "eID SAML4.4 specification for DigiD",
      href: "https://logius.gitlab.io/eid-saml/4.4/index.html",
      publisher: "LOGIUS"
    },
    "eID SAML4.5": {
      title: "eID SAML4.5 specification for DigiD",
      publisher: "LOGIUS"
    },
    "DigiD SAML3.x": {
      title: "DigiD SAML3.x - legacy SAML specification for DigiD",
      href: "https://www.logius.nl/domeinen/toegang/digid/documentatie/koppelvlakspecificatie-digid-saml-authenticatie",
      publisher: "LOGIUS"
    },
    SAML2: {
      title: "Security Assertion Markup Language (SAML) V2.0",
      href: "https://www.oasis-open.org/standard/saml/",
      publisher: "OASIS"
    },
    "SAML2.TO": {
      title: "Security Assertion Markup Language (SAML) V2.0 Technical Overview",
      href: "https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html",
      publisher: "OASIS"
    },
    "SAML2.CORE": {
      title: "Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0 – Errata Composite",
      href: "https://groups.oasis-open.org/higherlogic/ws/public/download/56776/sstc-saml-core-errata-2.0-wd-07.pdf",
      publisher: "OASIS"
    },
    "SAML2.PROFILES": {
      title: "Profiles for the OASIS Security Assertion Markup Language (SAML) V2.0 – Errata Composite",
      href: "https://groups.oasis-open.org/higherlogic/ws/public/download/56782/sstc-saml-profiles-errata-2.0-wd-07.pdf",
      publisher: "OASIS"
    },
    "SAML2.METADATA": {
      title: "Metadata for the OASIS Security Assertion Markup Language (SAML) V2.0 – Errata Composite",
      href: "https://groups.oasis-open.org/higherlogic/ws/public/download/56785/sstc-saml-metadata-errata-2.0-wd-05.pdf",
      publisher: "OASIS"
    },
    "SAML2.BINDINGS": {
      title: "Bindings for the OASIS Security Assertion Markup Language (SAML) V2.0 – Errata Composite",
      href: "https://groups.oasis-open.org/higherlogic/ws/public/download/56779/sstc-saml-bindings-errata-2.0-wd-06.pdf",
      publisher: "OASIS"
    },
    "SAML2.ERRATA.05": {
      title: "SAML Version 2.0 Errata 05",
      href: "https://docs.oasis-open.org/security/saml/v2.0/sstc-saml-approved-errata-2.0.html",
      publisher: "OASIS"
    },
    NORA: {
      title: "Nederlandse Overheid Referentie Architectuur",
      href: "https://www.noraonline.nl/wiki/NORA_online"
    },
    "NCSC.TLS": {
      title: "ICT-beveiligingsrichtlijnen voor Transport Layer Security (TLS)",
      href: "https://www.ncsc.nl/documenten/publicaties/2019/mei/01/ict-beveiligingsrichtlijnen-voor-transport-layer-security-tls",
      publisher: "NCSC"
    },
    "XML.SIG": {
      title: "XML Signature Syntax and Processing",
      href: "https://www.w3.org/TR/xmldsig-core/",
      publisher: "W3C"
    },
    "XML.ENC": {
      title: "XML Encryption Syntax and Processing",
      href: "https://www.w3.org/TR/2002/REC-xmlenc-core-20021210/",
      publisher: "W3C"
    },
    "XML.C14N.EXCL": {
      title: "Exclusive XML Canonicalization",
      href: "https://www.w3.org/TR/xml-exc-c14n/",
      publisher: "W3C"
    },
    "BSNk.DEC": {
      title: "BSNk PP technische specificaties",
      href: "https://gitlab.com/logius/bsnk/bsnk-techspecs/bsnk/-/raw/main/BPTSlive.pdf",
      publisher: "Logius"
    },
  },
};

// Plaats dit bestand op een centrale locatie voor hergebruik in meerdere documenten.
var organisationConfig = {
    nl_organisationName: "Logius",
    nl_organisationStylesURL: "https://gitdocumentatie.logius.nl/publicatie/respec/style/",
    nl_organisationPublishURL: "https://gitdocumentatie.logius.nl/publicatie/",
    logos: [{
        src: "https://gitdocumentatie.logius.nl/publicatie/respec/style/logos/figure-logius.svg",
        alt: "Logius",
        id: "Logius",
        height: 77,
        width: 44,
        url: "https://www.logius.nl/standaarden",
    }],

    postProcess: [window.respecMermaid.createFigures],

    latestVersion: ["nl_organisationPublishURL", "pubDomain", "/", "shortName"],
    thisVersion: ["nl_organisationPublishURL", "pubDomain", "/", "specStatus", "-", "specType", "-", "shortName", "-", "publishDate"],
    prevVersion: ["nl_organisationPublishURL", "pubDomain", "/", "previousMaturity", "-", "specType", "-", "shortName", "-", "previousPublishDate"],
    useLogo: true,
    useLabel: true,

    license: "cc0",
    addSectionLinks: true,

    localizationStrings: {
        en: {
            wv: "Draft",
            cv: "Recommendation",
            vv: "Proposed recommendation",
            def: "Definitive version",
            basis: "Document",
            eo: "Outdated version",
            tg: "Rescinded version",
            no: "Norm",
            st: "Standard",
            im: "Information model",
            pr: "Guideline",
            hr: "Guide",
            wa: "Proposed recommendation",
            al: "General",
            bd: "Governance documentation",
            bp: "Best practice",
        },
        nl: {
            wv: "Werkversie",
            cv: "Consultatieversie",
            vv: "Versie ter vaststelling",
            def: "Vastgestelde versie",
            basis: "Document",
            eo: "Verouderde versie",
            tg: "Teruggetrokken versie",
            no: "Norm",
            st: "Standaard",
            im: "Informatiemodel",
            pr: "Praktijkrichtlijn",
            hr: "Handreiking",
            wa: "Werkafspraak",
            al: "Algemeen",
            bd: "Beheerdocumentatie",
            bp: "Best practice",
        },
    },

    sotdText: {
        nl: {
            sotd: "Status van dit document",
            def: `Dit is de definitieve versie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.`,
            wv: `Dit is een werkversie die op elk moment kan worden gewijzigd, verwijderd of vervangen door andere documenten. Het is geen door het TO goedgekeurde consultatieversie.`,
            cv: `Dit is een door het TO goedgekeurde consultatieversie. Commentaar over dit document kan gestuurd worden naar `,
            vv: `Dit is een definitief concept van de nieuwe versie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.`,
            basis: "Dit is een document zonder officiële status.",
        },
        en: {
            sotd: "Status of This Document",
            def: `This is the definitive version of this document. Edits resulting from consultations have been applied.`,
            wv: `This is a draft that could be altered, removed or replaced by other documents. It is not a recommendation approved by TO.`,
            cv: `This is a proposed recommendation approved by TO. Comments regarding this document may be sent to `,
            vv: `This is the definitive concept of this document. Edits resulting from consultations have been applied.`,
            basis: "This document has no official standing.",
        },
    },

    labelColor: {
        def: "#154273",
        wv: "#39870c",
    },
	
    licenses: {
        cc0: {
            name: "Creative Commons 0 Public Domain Dedication",
            short: "CC0",
            url: "https://creativecommons.org/publicdomain/zero/1.0/",
            image: "https://gitdocumentatie.logius.nl/publicatie/respec/media/logos/cc-zero.svg",
        },
        "cc-by": {
            name: "Creative Commons Attribution 4.0 International Public License",
            short: "CC-BY",
            url: "https://creativecommons.org/licenses/by/4.0/legalcode",
            image: "https://gitdocumentatie.logius.nl/publicatie/respec/media/logos/cc-by.svg",
        },
        "cc-by-nd": {
            name: "Creative Commons Naamsvermelding-GeenAfgeleideWerken 4.0 Internationaal",
            short: "CC-BY-ND",
            url: "https://creativecommons.org/licenses/by-nd/4.0/legalcode.nl",
            image: "https://gitdocumentatie.logius.nl/publicatie/respec/media/logos/cc-by-nd.svg",
        },
    },

    localBiblio: {
        "SemVer": {
            href: "https://semver.org",
            title: "Semantic Versioning 2.0.0",
            authors: ["T. Preston-Werner"],
            date: "June 2013"
        },
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
            href: "https://wiki.oasis-open.org/security/FrontPage",
            publisher: "OASIS"
          },
          "SAML2.TO": {
            title: "Security Assertion Markup Language (SAML) V2.0 Technical Overview",
            href: "https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html",
            publisher: "OASIS"
          },
          "SAML2.CORE": {
            title: "Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0 – Errata Composite",
            href: "https://www.oasis-open.org/committees/download.php/56776/sstc-saml-core-errata-2.0-wd-07.pdf",
            publisher: "OASIS"
          },
          "SAML2.PROFILES": {
            title: "Profiles for the OASIS Security Assertion Markup Language (SAML) V2.0 – Errata Composite",
            href: "https://www.oasis-open.org/committees/download.php/56782/sstc-saml-profiles-errata-2.0-wd-07.pdf",
            publisher: "OASIS"
          },
          "SAML2.METADATA": {
            title: "Metadata for the OASIS Security Assertion Markup Language (SAML) V2.0 – Errata Composite",
            href: "https://www.oasis-open.org/committees/download.php/56785/sstc-saml-metadata-errata-2.0-wd-05.pdf",
            publisher: "OASIS"
          },
          "SAML2.BINDINGS": {
            title: "Bindings for the OASIS Security Assertion Markup Language (SAML) V2.0 – Errata Composite",
            href: "https://www.oasis-open.org/committees/download.php/56779/sstc-saml-bindings-errata-2.0-wd-06.pdf",
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
            title: "BSNk Decryptiecomponent",
            href: "https://wiki.bsn-koppelregister.nl/display/DC/",
            publisher: "Logius"
          },
          "AAPL.LINK" : {
            title: "Universal Links for Developers",
            href: "https://developer.apple.com/ios/universal-links/",
            publisher: "Apple Inc."
          },
          "GOOG.LINK" : {
            title: "Handling Android App Links",
            href: "https://developer.android.com/training/app-links",
            publisher: "Google"
          },
          "AAPL.canOpenURL" : {
            title: "canOpenURL",
            href: "https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl",
            publisher: "Apple Inc."
          },
          "GOOG.PackageManager" : {
            title: "PackageManager",
            href: "https://developer.android.com/reference/android/content/pm/PackageManager",
            publisher: "Google"
          }

    },
}

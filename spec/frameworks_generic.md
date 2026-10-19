## SAML generic

SAML Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0 [[SAML2]]
- saml-core-2.0-os [[SAML2.CORE]]
- saml-profiles-2.0-os [[SAML2.PROFILES]]
- saml-metadata-2.0-os [[SAML2.METADATA]]
- saml-bindings-2.0-os [[SAML2.BINDINGS]]
- saml errata [[SAML2.ERRATA.05]]

NORA, Nederlandse Overheid Referentie Architectuur [[NORA]].  
NCSC ICT-beveiligingsrichtlijnen voor Transport Layer Security (TLS) [[NCSC.TLS]].

**SAML profiles**
A SAML profile is a specific set of rules that are used for a specific use case. [=ST-SAML=] uses two profiles of the SAML standard, namely:
- Web Browser SSO Profile ([[SAML2.PROFILES]], par 4.1), with the bindings specified for each interface below.
- Single Logout Profile ([[SAML2.PROFILES]], par 4.4), issued by Session Participant to Identity Provider, with the bindings specified for each interface below.
DV→OD authentication requests and DV↔OD logout use HTTP-POST; authentication responses use HTTP-Artifact. The R1.15 OD↔AD/BVD backend uses HTTP-Artifact for authentication requests and responses, and OD↔AD logout uses HTTP-Artifact in both directions. Artifacts are resolved over SOAP. A binding supported on one interface MUST NOT be assumed to be supported on another.

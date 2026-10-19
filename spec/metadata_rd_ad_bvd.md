## OD metadata {#rd-metadata}

### OD→AD metadata {#rd-sp-metadata}

Published by|Consumed by
---|---
[=OD=] |[=AD=] , [=BVD=] 


This section describes the network metadata of the [=OD=], [=AD=] and [=BVD=] for R1.15. Participants MUST supply and process metadata according to [RFC2451 Metadata for participants — MD2026](https://eherkenning.atlassian.net/wiki/spaces/cake/pages/1384611984) and [[SAML2.METADATA]]. The role-specific requirements below apply to the backend interface; the [DV/LC metadata](#dv-metadata) describes the separate DV→OD connection.

The OD publishes its own role metadata. It MUST NOT include a separate DV EntityDescriptor for every connected service provider as a substitute for Service Catalog registration. The Service Catalog supplies the service identifiers, permitted OD registrations and the DV's encryption certificates.

Each participant supplies exactly one signed EntitiesDescriptor containing its systems' EntityDescriptors, separately for each assigned role. The metadata signature MUST use a PKIoverheid certificate with the same OIN as the participant's EntityID. The consumer MUST verify the signature, role, interface version and validity before using an endpoint or key.

See also [Example SAML-metadata OD for AD/BVD](#example-saml-metadata-rd-for-ad-bvd 'Example of SAML-metadata a RC needs te provide to a AD and a BVD')

Element/@Attribute|0..n|Description
---|---|---
<dfn data-dfn-for="rd-sp-metadata">EntitiesDescriptor</dfn>|1|Required element to start metadata containing multiple [=rd-sp-metadata/EntityDescriptor=]s.
-&#64;<dfn data-dfn-for="rd-sp-metadata">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
-&#64;<dfn data-dfn-for="rd-sp-metadata">validUntil</dfn>|0..1|Expiry datetime. Expired metadata MUST NOT be used. Either validUntil or cacheDuration MUST be present.
-&#64;<dfn data-dfn-for="rd-sp-metadata">cacheDuration</dfn>|0..1|If supplied in participant metadata, MUST be `PT1H`. Either cacheDuration or validUntil MUST be present. The aggregate network metadata has its own cache policy.
-&#64;<dfn data-dfn-for="rd-sp-metadata">Name</dfn>|1|`urn:etoegang:2026:metadata:<environment>:<sequence number>`, with environment `P` or `T`, according to MD2026.
-<dfn data-dfn-for="rd-sp-metadata">Signature</dfn>|1|MUST contain the Digital signature of the [=OD=] to verify the integrity of this [=Metadata=] and MUST be generated with a (private signing key associated with a) PKIoverheid public-key certificate which contains the same OIN as used in the [=rd-sp-entitydescriptor/entityID=]. Also see technical requirements on [Signature](#signature) and on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
-<dfn data-dfn-for="rd-sp-metadata">EntityDescriptor</dfn>|1..n|The OD's systems and supported interface versions. Each OD EntityDescriptor MUST contain exactly one IDPSSODescriptor and one SPSSODescriptor, plus Extensions, Organization and ContactPerson as specified by MD2026.

#### <dfn data-dfn-for="rd-sp-entitydescriptor">EntityDescriptor</dfn> 

Element/@Attribute|0..n|Description
---|---|---
&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">ID</dfn>|0..1|A document-unique identifier for the element, typically used as a reference point when signing.
&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">entityID</dfn>|1|MUST contain the OD EntityID, using role code `OD`, for example `urn:etoegang:OD:00000004000000149000:entities:9002`.
&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">validUntil</dfn>|0..1|Optional expiry of this entity version. An expired EntityDescriptor MUST NOT be used; a later entity expiry cannot extend the enclosing metadata's validity.
&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">version</dfn>|1|The `eme:version` attribute in `urn:etoegang:2026:metadata-extension`; MUST identify the supported interface version, `1.15` for this profile.
&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">validFrom</dfn>|0..1|The optional `eme:validFrom` datetime in the metadata-extension namespace. The consumer MUST use the entity version valid at the time of communication.
<dfn data-dfn-for="rd-sp-entitydescriptor">SPSSODescriptor</dfn>|1|The `SPSSODescriptor` implements profiles specific to service providers.
-&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">AuthnRequestsSigned</dfn>|1|Must be set to `true`.
-&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">WantAssertionsSigned</dfn>|1|Must be set to `true`.
&#8209;&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">protocolSupportEnumeration</dfn>|1|MUST be set to: `urn:oasis:names:tc:SAML:2.0:protocol`.
-<dfn data-dfn-for="rd-sp-entitydescriptor">KeyDescriptor</dfn>|1..n|MUST support signing, with KeyName and X509Data. Signing keys MAY be repeated for certificate rollover. The OD SPSSODescriptor SHOULD NOT contain an encryption KeyDescriptor; DV encryption certificates are supplied by the Service Catalog's ServiceCertificate. Also see [Signing, encryption algorithms and hash functions](#signing-encryption-hash).
--<dfn data-dfn-for="rd-sp-entitydescriptor">KeyInfo</dfn>|1|	
---<dfn data-dfn-for="rd-sp-entitydescriptor">KeyName</dfn>|1|Contains the name which identifies the key. MAY be any string. Common practice is using the SHA1 fingerprint stripped of colons.
---<dfn data-dfn-for="rd-sp-entitydescriptor">X509Data</dfn>|1|Contains the encoded X509 certificate with the public key.
-<dfn data-dfn-for="rd-sp-entitydescriptor">AssertionConsumerService</dfn>|2..n|MUST contain HTTP-Artifact endpoints with indices `1` and `2` for responses from ADs and MRs. If eIDAS is supported, MUST additionally contain an HTTP-Artifact endpoint with index `5`.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/ACS">Binding</dfn>|1|The binding parameter denotes the type of binding used. This is a urn relating to [[SAML2.BINDINGS]]<br/>At least one [=rd-sp-entitydescriptor/AssertionConsumerService=] binding MUST be set to `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact`. Other bindings are NOT supported.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/ACS">Location</dfn>|1|The URL of the SAML endpoint
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/ACS">Index</dfn>|1|The index of the binding, MUST be unique for all [=rd-sp-entitydescriptor/AssertionConsumerService=] elements.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/ACS">isDefault</dfn>|0..1|If more than one [=rd-sp-entitydescriptor/AssertionConsumerService=] elements are included, one of these elements MUST be flagged as default by setting the isDefault XML attribute with value `true`.

The SPSSODescriptor MUST also contain at least one ArtifactResolutionService with the SOAP binding. It is used to resolve artifacts issued by the OD, including request artifacts. Each ArtifactResolutionService has a Location and an index unique within the descriptor. The OD SPSSODescriptor MUST NOT contain NameIDFormat or SingleLogoutService.

#### OD IDPSSODescriptor {#rd-idp-backend-metadata}

The OD's IDPSSODescriptor MUST have `WantAuthnRequestsSigned="true"` and `protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"`. It MUST contain signing KeyDescriptors with KeyName and X509Data, at least one SOAP ArtifactResolutionService, and at least one HTTP-Artifact SingleSignOnService. Its NameIDFormat elements declare the supported identifier types according to MD2026.

Element/@Attribute|0..n|Description
---|---|---
-<dfn data-dfn-for="rd-sp-entitydescriptor">SingleLogoutService</dfn>|2..n|Located in the IDPSSODescriptor. MUST provide HTTP-Artifact and HTTP-POST logout endpoints. HTTP-Redirect MAY additionally be offered.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/SLS">Binding</dfn>|1|MUST be `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact`, `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST` or optionally `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect`. The AD→OD logout flow uses HTTP-Artifact; HTTP-POST remains available for the ST DV→OD flow.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/SLS">Location</dfn>|1|URL of the logout endpoint for this binding.

#### DV service registration {#dv-rd-entitydescriptor}

A connected DV's ServiceInstance and ServiceCertificate in the Service Catalog replace the earlier per-DV backend EntityDescriptor. The OD MUST use the registered ServiceID and ServiceUUID and the ServiceCertificate encryption keys when constructing requests for that DV. This does not remove the DV's own [metadata for its OD connection](#dv-metadata).

### [=AD=]/[=BVD=]→OD metadata {#ad-bvd-metadata}

Published by|Consumed by
---|---
[=AD=], [=BVD=]|[=OD=]

An AD/BVD publishes a signed EntitiesDescriptor according to MD2026 and [[SAML2.METADATA]]. The enclosing signature and cache/expiry rules described above also apply here. Each system/version is represented by an [=ad-metadata/EntityDescriptor=] with the participant's role code (`AD` or `BVD`), mandatory `eme:version` and optional `eme:validFrom` and `validUntil`. The entity MUST contain Extensions, one IDPSSODescriptor, Organization and ContactPerson; AD and BVD MUST NOT contain an SPSSODescriptor.


Element/@Attribute|0..n|Description
---|---|---
<dfn data-dfn-for="ad-metadata">EntityDescriptor</dfn>|1..n|A system/version in the enclosing EntitiesDescriptor.
-&#64;<dfn data-dfn-for="ad-metadata">ID</dfn>|0..1|A document-unique identifier for the element, typically used as a reference point when signing.
-&#64;<dfn data-dfn-for="ad-metadata">entityID</dfn>|1|Specifies the unique identifier of the SAML entity whose metadata is described by the element's contents. Contains the [=entityid=] of the [=AD=]/[=BVD=].
-&#64;<dfn data-dfn-for="ad-metadata">validUntil</dfn>|0..1|Optional entity expiry. Expired entities MUST NOT be used. The enclosing metadata's expiry also applies.
-<dfn data-dfn-for="ad-metadata">IDPSSODescriptor</dfn>|1|
&#8209;&#8209;&#64;<dfn data-dfn-for="ad-metadata">protocolSupportEnumeration</dfn>|1|Set to: `urn:oasis:names:tc:SAML:2.0:protocol`
--&#64;<dfn data-dfn-for="ad-metadata">WantAuthnRequestsSigned</dfn>|1|Set to `true` indication that AuthnRequest messages MUST be signed by the [=OD=].
--<dfn data-dfn-for="ad-metadata">KeyDescriptor</dfn>|1..n|Contains at least 1 KeyDescriptor element with `@use="signing"`. A [=BVD=] MUST also provide at least 1 [=ad-metadata/KeyDescriptor=] element that supports encryption (`@use="encryption"`) for receiving ActingSubjectID (see [=dv-attributestatement/Attribute=]) with an EncryptedID's from an [=AD=]. A second [=ad-metadata/KeyDescriptor=] with `@use="encryption"` MAY be present to support certificate rollover.<br/>Also see technical requirements on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
---<dfn data-dfn-for="ad-metadata">KeyInfo</dfn>|1|
----<dfn data-dfn-for="ad-metadata">KeyName</dfn>|1|Contains the name which identifies the key.
----<dfn data-dfn-for="ad-metadata">X509Data</dfn>|1|Contains the encoded X509 certificate with the public key.
--<dfn data-dfn-for="ad-metadata">ArtifactResolutionService</dfn>|1..n|The ArtifactResolutionService MUST be implemented at least once per service.
---&#64;<dfn data-dfn-for="ad-metadata/ARS">Binding</dfn>|1|The binding parameter denotes the type of binding used. In the [=ad-metadata/ArtifactResolutionService=] this is the SAML-SOAP binding only. The value of this attribute is a urn relating to [[SAML2.BINDINGS]].
---&#64;<dfn data-dfn-for="ad-metadata/ARS">Location</dfn>|1|The URL of the SAML artifact resolution endpoint
---&#64;<dfn data-dfn-for="ad-metadata/ARS">Index</dfn>|1|The index of the binding, MUST be unique for all [=ad-metadata/ArtifactResolutionService=] elements
--<dfn data-dfn-for="ad-metadata">SingleSignOnService</dfn>|1..n|AD MUST contain exactly one HTTP-Artifact endpoint. BVD MUST contain at least one HTTP-Artifact endpoint and MUST NOT contain other endpoint types besides ArtifactResolutionService.
---&#64;<dfn data-dfn-for="ad-metadata/SSS">Binding</dfn>|1|The binding parameter denotes the type of binding used. In the [=ad-metadata/SingleSignOnService=] this is the HTTP-Artifact binding only. BVD MUST NOT offer a SOAP SingleSignOnService. The value of this attribute is an urn relating to [[SAML2.BINDINGS]].
---&#64;<dfn data-dfn-for="ad-metadata/SSS">Location</dfn>|1|The URL of the SAML [=ad-metadata/SingleSignOnService=] endpoint
--<dfn data-dfn-for="ad-metadata">SingleLogoutService</dfn>|0..1|AD MUST contain exactly one HTTP-Artifact logout endpoint. MUST NOT be present in the metadata of the BVD. Describes the endpoint used to log the [=EU=] out of its current session if participating in a [=SSO=] session.
---&#64;<dfn data-dfn-for="ad-metadata/SLS">Binding</dfn>|1|MUST be set to `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact`. Other bindings are NOT supported.
---&#64;<dfn data-dfn-for="ad-metadata/SLS">Location</dfn>|1|The URL of the SAML endpoint


#### MD2026 extensions and service-catalog dependencies {#md2026-profile}

The `eme` namespace is `urn:etoegang:2026:metadata-extension`. Participants MUST apply the role-specific MD2026 extension requirements. In particular:

Element|Requirement
---|---
RPSector|Declare the supported sectors using `urn:etoegang:2026:RPSector:G2B`, `B2B`, `G2C` or `B2C` (each with the same prefix). The OD uses the registered sectors to select eligible participants for the service.
LoA EntityAttribute|AD, MR, BVD and EB MUST declare supported eIDAS LoA URIs; OD MAY declare them. DigiD MAY additionally declare `http://eID.logius.nl/LoA/basic`.
NoRepresentationUI|Only AD MAY include this empty flag. If present, the OD handles the representation-choice UI according to the applicable interface.
eIDASNotified|An AD uses this flag to declare its notified status for eIDAS selection.
RepresentationTypesSupported|Only BVD declares the legal types it supports, using the [representation-type values](#representation-types) defined by DC2026.
BsnkStructureVersion and BsnkRecipientKeySetVersion|Required together for roles receiving polymorphically encrypted BSN/PseudoID; other roles MUST NOT use them.
ParticipantSubjectTypesAllowed (PSTA)|MR and BVD MUST declare accepted subject identifiers. Identifier sets share a `setNumber`, with a lower number indicating higher preference; the sender chooses the first preferred set for which it can supply all required types. MR1 and MR2 identifier types apply to their respective requests. BVD accepts BSN only. Other roles MAY declare PSTA; absent PSTA uses the interface defaults.

Organization MUST include the organization's name, display name, URL and an SVG LogoURL, with the latter in Organization/Extensions. ClusterID MAY be used there; the currently allowed value is `urn:etoegang:2026:cluster:eHerkenning`. ContactPerson MUST contain a non-personal administrative incident contact; metadata MUST NOT contain personally identifiable contact information.

The OD MUST process [Service Catalog DC2026](https://eherkenning.atlassian.net/wiki/spaces/cake/pages/1384644685). It MUST respect the service's ECTA/ASTA identifier sets, RPSector, RepresentationFlowsAllowed and RepresentationTypesAllowed. Absent RepresentationFlowsAllowed permits all three flows; absent RepresentationTypesAllowed permits no legal representation types. ServiceCertificate is required for this DV→OD interface and contains the DV's encryption KeyDescriptor; all registered rollover certificates MUST be used by the issuing AD/MR/BVD. BSNk version and recipient-key-set requirements apply when the ECTA or ASTA requires BSN/PseudoID. The LC authorization uses ClusteraansluiterId as described in [Service selection](#dv-attributeconsumingserviceindex-extensions).

Participants MUST consume [Network metadata MD2026](https://eherkenning.atlassian.net/wiki/spaces/cake/pages/1367965988), including the BVD role group. For eIDAS-inbound services, the OD MUST offer the EB as an AD option where applicable and communicate according to the OD–EB interface; the EB may act as AD/MR depending on the message context. These network requirements do not change the separate DV→OD metadata profile.

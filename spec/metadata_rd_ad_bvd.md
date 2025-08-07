## RD metadata {#rd-metadata}

### RD→AD metadata {#rd-sp-metadata}

Published by|Consumed by
---|---
[=RD=] |[=AD=] , [=BVD=] 


This section describes the [=Metadata=] the [=RD=] publishes for the [=AD=]/[=BVD=] (acting as the SAML-role of a [=DV=]). The [=RD=] MUST provide the [=Metadata=] for each [=DV=] it supports. The [=Metadata=] MUST be signed by the [=RD=]. The [=Metadata=] of all [=DV=]s using an [=RD=] MUST be supplied as a single file and MAY additionally be supplied as individual files.

This section describes the layout of the metadata. The XML schema for the Metadata is that of [[SAML2.METADATA]].

See also [Example SAML-metadata RD for AD/BVD](#example-saml-metadata-rd-for-ad-bvd 'Example of SAML-metadata a RC needs te provide to a AD and a BVD')

Element/@Attribute|0..n|Description
---|---|---
<dfn data-dfn-for="rd-sp-metadata">EntitiesDescriptor</dfn>|1|Required element to start metadata containing multiple [=rd-sp-metadata/EntityDescriptor=]s.
-&#64;<dfn data-dfn-for="rd-sp-metadata">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
-&#64;<dfn data-dfn-for="rd-sp-metadata">validUntil</dfn>|1|Contains a datetime at which the metadata expires.<br/>If [=rd-sp-metadata/validUntil=] is expired, the metadata is considered invalid.<br/>This element MUST be present. (following OASIS specification [[SAML2.METADATA]]).
-<dfn data-dfn-for="rd-sp-metadata">Signature</dfn>|1|MUST contain the Digital signature of the [=RD=] to verify the integrity of this [=Metadata=] and MUST be generated with a (private signing key associated with a) PKIoverheid public-key certificate which contains the same OIN as used in the [=rd-sp-entitydescriptor/entityID=]. Also see technical requirements on [Signature](#signature) and on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
-<dfn data-dfn-for="rd-sp-metadata">EntityDescriptor</dfn>|1..n|MUST contain the [=rd-sp-entitydescriptor/EntityDescriptor=] of the [=RD=] (see [=rd-sp-entitydescriptor/EntityDescriptor=]).<br/>MUST contain the [=dv-entitydescriptor/EntityDescriptor=]s of all [=DV=]'s the [=RD=] supports (see [=dv-entitydescriptor/EntityDescriptor=]s).

#### <dfn data-dfn-for="rd-sp-entitydescriptor">EntityDescriptor</dfn> 

Element/@Attribute|0..n|Description
---|---|---
&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">entityID</dfn>|1|MUST contain the entityID of the [=RD=].
&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">validUntil</dfn>|0..1|SHOULD NOT be used as [=rd-sp-metadata/validUntil=] is already present at [=rd-sp-metadata/EntitiesDescriptor=] level.<br/>MAY contain a datetime at which the metadata expires.<br/>If validUntil is expired, the metadata is considered invalid.
<dfn data-dfn-for="rd-sp-entitydescriptor">Signature</dfn>|0..1|SHOULD NOT be used as the metadata is already signed at the [=rd-sp-metadata/EntitiesDescriptor=] level.<br/>If used it MUST be generated with the private signing key with an associated PKIoverheid public-key certificate which contains the same OIN as used in the [=rd-sp-entitydescripto/entityID=].
<dfn data-dfn-for="rd-sp-entitydescriptor">SPSSODescriptor</dfn>|1|The `SPSSODescriptor` implements profiles specific to service providers.
-&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">AuthnRequestsSigned</dfn>|1|Must be set to `true`.
-&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">WantAssertionsSigned</dfn>|1|Must be set to `true`.
&#8209;&#64;<dfn data-dfn-for="rd-sp-entitydescriptor">protocolSupportEnumeration</dfn>|1|MUST be set to: `urn:oasis:names:tc:SAML:2.0:protocol`.
-<dfn data-dfn-for="rd-sp-entitydescriptor">KeyDescriptor</dfn>|1..4|MUST contain [=rd-sp-entitydescriptor/KeyDescriptor=] element(s) that allow for signing of SAML messages and authenticating a TLS connection. This can be achieved by inclusion of 2 [=rd-sp-entitydescriptor/KeyDescriptor=] element with `@use="signing"` or a single certificate with `@use="signing"` that supports both functions. A second [=rd-sp-entitydescriptor/KeyDescriptor=] MAY be present for both of these keys to support certificate rollover. SAML message signing and TLS functions MAY be combined in a single certificate or in separate certificates.<br/>MUST contain at least 1 [=rd-sp-entitydescriptor/KeyDescriptor=] element that supports encryption (`@use="encryption"`). A second [=rd-sp-entitydescriptor/KeyDescriptor=] with `@use="encryption"` MAY be present to support certificate rollover.<br/>Also see technical requirements on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
--<dfn data-dfn-for="rd-sp-entitydescriptor">KeyInfo</dfn>|1|	
---<dfn data-dfn-for="rd-sp-entitydescriptor">KeyName</dfn>|1|Contains the name which identifies the key. MAY be any string. Common practice is using the SHA1 fingerprint stripped of colons.
---<dfn data-dfn-for="rd-sp-entitydescriptor">X509Data</dfn>|1|Contains the encoded X509 certificate with the public key.
-<dfn data-dfn-for="rd-sp-entitydescriptor">SingleLogoutService</dfn>|0..n|Conditional: MUST be present if the [=RD=] supports [=SSO=]. Describes the endpoint used to log the [=EU=] out of its current session if participating in a [=SSO=] session.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/SLS">Binding</dfn>|1|MUST contain the appropriate binding for the endpoint. The binding parameter denotes the type of binding used. This is a urn relating to [[SAML2.BINDINGS]]. At least one [=rd-sp-entitydescriptor/SingleLogoutService=] MUST contain the HTTP-POST binding.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/SLS">Location</dfn>|1|MUST contain the URL of the [=rd-sp-entitydescriptor/SingleLogoutService=] endpoint for the &#64;<a data-link-type="dfn" data-link-for="rd-sp-entitydescriptor/SLS">Binding</a>.
-<dfn data-dfn-for="rd-sp-entitydescriptor">AssertionConsumerService</dfn>|1..n|Must contain at least one URL to which the [=EU=] will be redirected after authentication.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/ACS">Binding</dfn>|1|The binding parameter denotes the type of binding used. This is a urn relating to [[SAML2.BINDINGS]]<br/>At least one [=rd-sp-entitydescriptor/AssertionConsumerService=] binding MUST be set to `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact`. Other bindings are NOT supported.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/ACS">Location</dfn>|1|The URL of the SAML endpoint
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/ACS">Index</dfn>|1|The index of the binding, MUST be unique for all [=rd-sp-entitydescriptor/AssertionConsumerService=] elements.
--&#64;<dfn data-dfn-for="rd-sp-entitydescriptor/ACS">isDefault</dfn>|0..1|If more than one [=rd-sp-entitydescriptor/AssertionConsumerService=] elements are included, one of these elements MUST be flagged as default by setting the isDefault XML attribute with value `true`.

#### DV→AD <dfn data-dfn-for="dv-rd-entitydescriptor">EntityDescriptor</dfn>

For each [=DV=] supported by an [=RD=] the following metadata must be included in the [=RD=] metadata.

Element/@Attribute|0..n|Description
---|---|---
&#64;<dfn data-dfn-for="dv-rd-entitydescriptor">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
&#64;<dfn data-dfn-for="dv-rd-entitydescriptor">entityID</dfn>|1|Specifies the unique identifier of the SAML entity whose metadata is described by the element's contents. MUST contain the [=entityid=]  of the [=DV=] .
&#64;<dfn data-dfn-for="dv-rd-entitydescriptor">validUntil</dfn>|0..1|SHOULD NOT be used as [=rd-sp-metadata/validUntil=] is already present at [=rd-sp-metadata/EntitiesDescriptor=] level.<br/>MAY contain a datetime at which the metadata expires.<br/>If validUntil is expired, the metadata is considered invalid.
&#64;<dfn data-dfn-for="dv-rd-entitydescriptor">cacheDuration</dfn>|0..1|SHOULD NOT be used as [=rd-sp-metadata/validUntil=] is already present at [=rd-sp-metadata/EntitiesDescriptor=] level.<br/>MAY contain cacheduration. [=AD=] is advised to check for new metadata after the given period.
<dfn data-dfn-for="dv-rd-entitydescriptor">Signature</dfn>|0..1|SHOULD NOT be used as the metadata is already signed at the [=rd-sp-metadata/EntitiesDescriptor=] level.<br/>If used it MUST be generated with the private signing key with an associates PKIoverheid public-key certificate which contains the same OIN as the [=entityid=] in the DV [=dv-rd-entitydescriptor/EntityDescriptor=]. The public key certificate MUST be present in the KeyDescriptor metadata. MUST contain a `KeyInfo` element with a `KeyName` or `X509Certificate` elements.
<dfn data-dfn-for="dv-rd-entitydescriptor">SPSSODescriptor</dfn>|1|	
&#8209;&#64;<dfn data-dfn-for="dv-rd-entitydescriptor">protocolSupportEnumeration</dfn>|1|Set to: `urn:oasis:names:tc:SAML:2.0:protocol`.
-<dfn data-dfn-for="dv-rd-entitydescriptor">KeyDescriptor</dfn>|1..2|MUST contain at least 1 [=dv-rd-entitydescriptor/KeyDescriptor=] element that supports encryption (`@use="encryption"`). A second [=dv-rd-entitydescriptor/KeyDescriptor=] with `@use="encryption"` MAY be present to support certificate rollover.<br/>Also see technical requirements on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
--<dfn data-dfn-for="dv-rd-entitydescriptor">KeyInfo</dfn>|1|	
---<dfn data-dfn-for="dv-rd-entitydescriptor">KeyName</dfn>|1|Contains the name which identifies the key. MAY be any string. Common practice is using the SHA1 fingerprint stripped of colons.
---<dfn data-dfn-for="dv-rd-entitydescriptor">X509Data</dfn>|1|Contains the encoded X509 certificate with the public key.
-<dfn data-dfn-for="dv-rd-entitydescriptor">AssertionConsumerService</dfn>|1..n|According to saml-metadata-2.0 MUST contain at least one URL to which the [=EU=] will be redirected after authentication. MUST contain only one entry. MUST contain a copy of the [=rd-sp-entitydescriptor/AssertionConsumerService=] element in the RD’s [=rd-sp-entitydescriptor/EntityDescriptor=]. This entry will be ignored as the [=rd-sp-entitydescriptor/AssertionConsumerService=] definitions in the RD [=rd-sp-entitydescriptor/EntityDescriptor=] MUST be used.

### [=AD=]/[=BVD=]→RD metadata {#ad-bvd-metadata}

Published by|Consumed by
---|---
[=AD=], [=BVD=]|[=RD=]

An AD/BVD publishes metadata in accordance with [[SAML2.METADATA]] with one [=ad-metadata/EntityDescriptor=] element. The metadata is signed in accordance with the SAML signature.


Element/@Attribute|0..n|Description
---|---|---
<dfn data-dfn-for="ad-metadata">EntityDescriptor</dfn>|1|
-&#64;<dfn data-dfn-for="ad-metadata">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
-&#64;<dfn data-dfn-for="ad-metadata">entityID</dfn>|1|Specifies the unique identifier of the SAML entity whose metadata is described by the element's contents. Contains the [=entityid=] of the [=AD=]/[=BVD=].
-&#64;<dfn data-dfn-for="ad-metadata">validUntil</dfn>|1|Contains a datetime at which the metadata expires.<br/>If [=rd-sp-metadata/validUntil=] is expired, the metadata is considered invalid.<br/>This element MUST be present. (following OASIS specification [[SAML2.METADATA]]).
-<dfn data-dfn-for="ad-metadata">Signature</dfn>|1|MUST contain the Digital signature of the [=AD=] to verify the integrity of this [=Metadata=] and MUST be generated with a (private signing key associated with a) PKIoverheid public-key certificate which contains the same OIN as used in the [=ad-metadata/entityID=]. Also see technical requirements on [Signature](#signature) and on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
-<dfn data-dfn-for="ad-metadata">IDPSSODescriptor</dfn>|1|
&#8209;&#8209;&#64;<dfn data-dfn-for="ad-metadata">protocolSupportEnumeration</dfn>|1|Set to: `urn:oasis:names:tc:SAML:2.0:protocol`
--&#64;<dfn data-dfn-for="ad-metadata">WantAuthnRequestsSigned</dfn>|1|Set to `true` indication that AuthnRequest messages MUST be signed by the [=RD=].
--<dfn data-dfn-for="ad-metadata">KeyDescriptor</dfn>|1..n|Contains at least 1 KeyDescriptor element with `@use="signing"`. A [=BVD=] MUST also provide at least 1 [=ad-metadata/KeyDescriptor=] element that supports encryption (`@use="encryption"`) for receiving ActingSubjectID (see [=dv-attributestatement/Attribute=]) with an EncryptedID's from an [=AD=]. A second [=ad-metadata/KeyDescriptor=] with `@use="encryption"` MAY be present to support certificate rollover.<br/>Also see technical requirements on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
---<dfn data-dfn-for="ad-metadata">KeyInfo</dfn>|1|
----<dfn data-dfn-for="ad-metadata">KeyName</dfn>|1|Contains the name which identifies the key.
----<dfn data-dfn-for="ad-metadata">X509Data</dfn>|1|Contains the encoded X509 certificate with the public key.
--<dfn data-dfn-for="ad-metadata">ArtifactResolutionService</dfn>|1..n|The ArtifactResolutionService MUST be implemented at least once per service.
---&#64;<dfn data-dfn-for="ad-metadata/ARS">Binding</dfn>|1|The binding parameter denotes the type of binding used. In the [=ad-metadata/ArtifactResolutionService=] this is the SAML-SOAP binding only. The value of this attribute is a urn relating to [[SAML2.BINDINGS]].
---&#64;<dfn data-dfn-for="ad-metadata/ARS">Location</dfn>|1|The URL of the SAML artifact resolution endpoint
---&#64;<dfn data-dfn-for="ad-metadata/ARS">Index</dfn>|1|The index of the binding, MUST be unique for all [=ad-metadata/ArtifactResolutionService=] elements
--<dfn data-dfn-for="ad-metadata">SingleSignOnService</dfn>|1..n|One or more elements of type EndpointType that describe endpoints that support the profiles of the Authentication Request protocol defined in [[SAML2.PROFILES]].
---&#64;<dfn data-dfn-for="ad-metadata/SSS">Binding</dfn>|1|The binding parameter denotes the type of binding used. In the [=ad-metadata/SingleSignOnService=] this is the HTTP-POST binding only. The value of this attribute is an urn relating to [[SAML2.BINDINGS]].
---&#64;<dfn data-dfn-for="ad-metadata/SSS">Location</dfn>|1|The URL of the SAML [=ad-metadata/SingleSignOnService=] endpoint
--<dfn data-dfn-for="ad-metadata">SingleLogoutService</dfn>|0..1|MUST be present if the [=AD=] supports [=SSO=]. MUST NOT be present in the metadata of the BVD. Describes the endpoint used to log the [=EU=] out of its current session if participating in a [=SSO=] session.
---&#64;<dfn data-dfn-for="ad-metadata/SLS">Binding</dfn>|1|MUST be set to `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`. Other bindings are NOT supported.
---&#64;<dfn data-dfn-for="ad-metadata/SLS">Location</dfn>|1|The URL of the SAML endpoint


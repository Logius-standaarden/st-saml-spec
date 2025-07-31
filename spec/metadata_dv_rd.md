## DV Metadata {#dv-metadata}

### DV→RD Metadata {#dv-metadata}

Published by|Consumed by
---|---
[=DV=] that connects to [=RD=] directly|[=RD=]

This section describes the metadata that a [=DV=] with a direct connection to [=RD=] (not using a [=LC=]) must provide. This metadata MAY be published on a location known to [=RD=] or MAY be provided to [=RD=] by any other means supported.

See also [Example SAML-metadata DV for RD](#example-saml-metadata-dv-for-rd 'Example of SAML-metadata a DV needs te provide to a RD')


Element/@Attribute|0..n|Description
---|---|---
<dfn data-dfn-for="dv-metadata">EntityDescriptor</dfn>|1|The metadata MUST contain one [=dv-metadata/EntityDescriptor=] with one [=dv-metadata/SPSSODescriptor=] element.
-&#64;<dfn data-dfn-for="dv-metadata">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
-&#64;<dfn data-dfn-for="dv-metadata">entityID</dfn>|1|Specifies the unique identifier of the SAML entity whose metadata is described by the element's contents. Contains the [=entityid=] of the DV.
-&#64;<dfn data-dfn-for="dv-metadata">validUntil</dfn>|0..1|MAY contain a datetime at which the metadata expires.<br/>If validUntil is expired, the metadata is considered invalid.<br/>Either validUntil or cacheDuration MUST be present. (following OASIS specification [[SAML2.METADATA]])
-&#64;<dfn data-dfn-for="dv-metadata">cacheDuration</dfn>|0..1|MAY contain cacheduration. Every [=Participant=] is advised to check for new [=Metadata=] after the given period.<br/>Either validUntil or cacheDuration MUST be present. (following OASIS specification [[SAML2.METADATA]])
-<dfn data-dfn-for="dv-metadata">Signature</dfn>|1|MUST contain the Digital signature of the [=DV=] to verify the integrity of this [=Metadata=] and MUST be generated with a (private signing key associated with a) PKIoverheid public-key certificate which contains the same OIN as used in the [=dv-metadata/entityID=]. Also see technical requirements on [Signature](#signature) and on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
-<dfn data-dfn-for="dv-metadata">SPSSODescriptor</dfn>|1|	
--&#64;<dfn data-dfn-for="dv-metadata">AuthnRequestsSigned</dfn>|1|MUST be set to `true`.
&#8209;&#8209;&#64;<dfn data-dfn-for="dv-metadata">protocolSupportEnumeration</dfn>|1|MUST be set to `urn:oasis:names:tc:SAML:2.0:protocol`
--&#64;<dfn data-dfn-for="dv-metadata">WantAssertionsSigned</dfn>|1|MUST be set to `true`.
--<dfn data-dfn-for="dv-metadata">KeyDescriptor</dfn>|2..n|MUST contain [=dv-metadata/KeyDescriptor=] element(s) that allow for signing of SAML messages and authenticating a TLS connection. This can be achieved by inclusion of 2 [=dv-metadata/KeyDescriptor=] element with `@use="signing"` or a single certificate with `@use="signing"` that supports both functions. A second [=dv-metadata/KeyDescriptor=] MAY be present for both of these keys to support certificate rollover. SAML message signing and TLS functions MAY be combined in a single certificate or in separate certificates.<br/>MUST contain at least 1 [=dv-metadata/KeyDescriptor=] element that supports encryption (`@use="encryption"`). A second [=dv-metadata/KeyDescriptor=] with `@use="encryption"` MAY be present to support certificate rollover.<br/>Also see technical requirements on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
---<dfn data-dfn-for="dv-metadata">KeyInfo</dfn>|1|	
----<dfn data-dfn-for="dv-metadata">KeyName</dfn>|1|Contains the name which identifies the key.
----<dfn data-dfn-for="dv-metadata">X509Data</dfn>|1|Contains the encoded PKIOverheid X509 certificate with the public key.
--<dfn data-dfn-for="dv-metadata">SingleLogoutService</dfn>|0..n|Conditional: MUST be present if the DV supports [=SSO=]. Describes the endpoint used to log the [=EU=] out of its current session if participating in a SSO session.
 ---&#64;<dfn data-dfn-for="dv-metadata">Binding</dfn>|1|MUST contain the appropriate binding for the endpoint. The binding parameter denotes the type of binding used. This is an urn relating to [[SAML2.BINDINGS]]. At least one [=dv-metadata/SingleLogoutService=] MUST contain the HTTP-POST binding.
 ---&#64;<dfn data-dfn-for="dv-metadata">Location</dfn>|1|MUST contain the URL of the [=dv-metadata/SingleLogoutService=] endpoint for the [=dv-metadata/Binding=].
--<dfn title="Contains at least one URL to which the EU will be redirected after authentication." data-dfn-for="dv-metadata">AssertionConsumerService</dfn>|1..n|Must contain at least one URL to which the [=EU=] will be redirected after authentication. If more than one is included one MUST contain the attribute `@isDefault` with value `true`.
--<dfn title="AttributeConsumingService MUST contain 1 or more elements that describe the Service requested using an @dv-metadata/Index to a Service Definition registered with Service Catalog kept by RD."  data-dfn-for="dv-metadata">AttributeConsumingService</dfn>|0..n|Conditional: MUST be present when [=DV=] uses a corresponding[=dv-authn-request-message/AttributeConsumingServiceIndex=] in the [=DV=] [AuthnRequest Message](#dv-authn-request-message). MUST NOT be present in any other case or by any other [=Participant=] role. <br\>When used, AttributeConsumingService MUST contain 1 or more elements that describe the [=Service=] requested using an @[=dv-metadata/Index=] to a [=Service Definition=] registered with [=Service Catalog=] kept by [=RD=].
---&#64;<dfn data-dfn-for="dv-metadata">Index</dfn>|1|MUST be present.
---&#64;<dfn data-dfn-for="dv-metadata">isDefault</dfn>|0..1|MUST be present if more than one [=dv-metadata/Index=] is specified in the metadata. MAY only be present once.  If present indicates the default [=dv-metadata/AttributeConsumingService=] which is used when no [=dv-authn-request-message/AttributeConsumingServiceIndex=] was referenced in the [AuthN Request Message](#dv-authn-request-message). It is advised to always include an [=dv-authn-request-message/AttributeConsumingServiceIndex=] in the [AuthN Request Message](#dv-authn-request-message).
---<dfn data-dfn-for="dv-metadata">ServiceName</dfn>|1..n|One or more language-qualified names for the service. Only one descriptor per language MUST be present.
---<dfn data-dfn-for="dv-metadata">RequestedAttribute</dfn>|1..n|At least one [=dv-metadata/RequestedAttribute=] element MUST be present with `@name="urn:nl-eid-gdi:1.0:ServiceUUID"`.
----<dfn data-dfn-for="dv-metadata">AttributeValue</dfn>|1|MUST contain the ServiceUUID to be used for this authentication. The [=ServiceUUID=] must be pre-registered with [=Service Catalog=] kept by [=RD=].

### LC→RD metadata {#lc-metadata}

Published by|Consumed by
---|---
[=LC=]|[=RD=]


This section describes the metadata the [=LC=] publishes for the RD. The LC MUST provide the metadata for each [=DV=] it supports. The metadata MUST be signed by the [=LC=]. The metadata of all [=DV=]s using an [=LC=] MUST be supplied as a single file and MAY additionally be supplied as individual files.

This section describes the layout of the metadata. The XML schema for the Metadata is that of [[SAML2.METADATA]].

See also [Example SAML-metadata LC for RD](#example-saml-metadata-lc-for-rd 'Example of SAML-metadata a LC needs te provide to a RD')

Element/@Attribute|0..n|Description
---|---|---
<dfn data-dfn-for="lc-metadata">EntitiesDescriptor</dfn>|1|Required element to start metadata containing multiple [=lc-metadata/EntityDescriptor=]s.
-&#64;<dfn data-dfn-for="lc-metadata">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
-&#64;<dfn data-dfn-for="lc-metadata">validUntil</dfn>|0..1|MAY contain a datetime at which the metadata expires.<br/>If [=lc-metadata/validUntil=] is expired, the metadata is considered invalid.<br/>Either [=lc-metadata/validUntil=] or [=lc-metadata/cacheDuration=] MUST be present. (following OASIS specification [[SAML2.METADATA]]).
-&#64;<dfn data-dfn-for="lc-metadata">cacheDuration</dfn>|0..1|MAY contain cache duration. Consumers are advised to check for new metadata after the given period.<br/>Either [=lc-metadata/validUntil=] or [=lc-metadata/cacheDuration=] MUST be present. (following OASIS specification [[SAML2.METADATA]]).
-<dfn data-dfn-for="lc-metadata">Signature</dfn>|1|MUST contain the Digital signature of the [=LC=] to verify the integrity of this [=Metadata=] and MUST be generated with a (private signing key associated with a) PKIoverheid public-key certificate which contains the same OIN as used in the [=lc-entitydescriptor/entityID=]. Also see technical requirements on [Signature](#signature) and on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
-<dfn data-dfn-for="lc-metadata">EntityDescriptor</dfn>|1..n|MUST contain the [=lc-entitydescriptor/EntityDescriptor=] of the [=LC=], see [LC EntityDescriptor](#lc-entitydescriptor).<br/>MUST contain the [=dv-entitydescriptor/EntityDescriptor=]s of all [=DV=]'s the [=LC=] supports, see [DV EntityDescriptor](#dv-metadata-entitydescriptor).

#### LC→RD <dfn data-dfn-for="lc-entitydescriptor">EntityDescriptor</dfn> 

Element/@Attribute|0..n|Description
---|---|---
&#64;<dfn data-dfn-for="lc-entitydescriptor">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
&#64;<dfn data-dfn-for="lc-entitydescriptor">entityID</dfn>|1|MUST contain the [=entityid=] of the [=LC=].
&#64;<dfn data-dfn-for="lc-entitydescriptor">validUntil</dfn>|0..1|SHOULD NOT be used as either [=lc-metadata/validUntil=] or [=lc-metadata/cacheDuration=] is already present at [=lc-metadata/EntitiesDescriptor=] level.<br/>MAY contain a datetime at which the metadata expires.<br/>If validUntil is expired, the metadata is considered invalid.
&#64;<dfn data-dfn-for="lc-entitydescriptor">cacheDuration</dfn>|0..1|SHOULD NOT be used as either [=lc-metadata/validUntil=] or [=lc-metadata/cacheDuration=] is already present at [=lc-metadata/EntitiesDescriptor=] level.<br/>MAY contain cacheduration. [=RD=] is advised to check for new metadata after the given period.
&#64;<dfn data-dfn-for="lc-entitydescriptor">Signature</dfn>|0..1|SHOULD NOT be used as the metadata is already signed at the [=lc-metadata/EntitiesDescriptor=] level.<br/>If used it MUST be generated with the private signing key with an associated PKIoverheid public-key certificate which contains the same OIN as the [=entityid=] in the [=lc-entitydescriptor/EntityDescriptor=].
&#64;<dfn data-dfn-for="lc-entitydescriptor">SPSSODescriptor</dfn>|1|The `SPSSODescriptor` implements profiles specific to service providers.
-&#64;<dfn data-dfn-for="lc-entitydescriptor">AuthnRequestsSigned</dfn>|1|Must be set to `true`.
-&#64;<dfn data-dfn-for="lc-entitydescriptor">WantAssertionsSigned</dfn>|1|Must be set to `true`.
&#8209;&#64;<dfn data-dfn-for="lc-entitydescriptor">protocolSupportEnumeration</dfn>|1|MUST be set to: `urn:oasis:names:tc:SAML:2.0:protocol`.
-<dfn data-dfn-for="lc-entitydescriptor">KeyDescriptor</dfn>|1..4|MUST contain [=dv-metadata/KeyDescriptor=] element(s) that allow for signing of SAML messages and authenticating a TLS connection. This can be achieved by inclusion of 2 [=lc-entitydescriptor/KeyDescriptor=] element with `@use="signing"` or a single certificate with `@use="signing"` that supports both functions. A second [=lc-entitydescriptor/KeyDescriptor=] MAY be present for both of these keys to support certificate rollover. SAML message signing and TLS functions MAY be combined in a single certificate or in separate certificates.<br/><br/>_**NOTE**:Also see technical requirements on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)_
--<dfn data-dfn-for="lc-entitydescriptor">KeyInfo</dfn>|1|	
---<dfn data-dfn-for="lc-entitydescriptor">KeyName</dfn>|1|Contains the name which identifies the key. MAY be any string. Common practice is using the SHA1 fingerprint stripped of colons.
---<dfn data-dfn-for="lc-entitydescriptor">X509Data</dfn>|1|Contains the encoded X509 certificate with the public key.
-<dfn data-dfn-for="lc-entitydescriptor">SingleLogoutService</dfn>|0..n|Conditional: MUST be present if the LC supports [=SSO=]. Describes the endpoint used to log the [=EU=] out of its current session if participating in a SSO session.
--&#64;<dfn data-dfn-for="lc-entitydescriptor/SLS">Binding</dfn>|1|MUST contain the appropriate binding for the endpoint. The binding parameter denotes the type of binding used. This is a urn relating to [[SAML2.BINDINGS]]. At least one [=lc-entitydescriptor/SingleLogoutService=] MUST contain the HTTP-POST binding.
--&#64;<dfn data-dfn-for="lc-entitydescriptor/SLS">Location</dfn>|1|MUST contain the URL of the [=lc-entitydescriptor/SingleLogoutService=] endpoint for the &#64;<a data-link-type="dfn" data-link-for="lc-entitydescriptor/SLS">Binding</a>.
-<dfn title="Contains at least one URL to which the EU will be redirected after authentication." data-dfn-for="lc-entitydescriptor">AssertionConsumerService</dfn>|1..n|Must contain at least one URL to which the [=EU=] will be redirected after authentication.
--&#64;<dfn data-dfn-for="lc-entitydescriptor/ACS">Binding</dfn>|1|The binding parameter denotes the type of binding used. This is a urn relating to [[SAML2.BINDINGS]]<br/>At least one [=lc-entitydescriptor/AssertionConsumerService=] binding MUST be set to `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact`. Other bindings are NOT supported.
--&#64;<dfn data-dfn-for="lc-entitydescriptor/ACS">Location</dfn>|1|The URL of the SAML endpoint
--&#64;<dfn data-dfn-for="lc-entitydescriptor/ACS">Index</dfn>|1|The index of the binding, MUST be unique for all [=lc-entitydescriptor/AssertionConsumerService=] elements.
--&#64;<dfn data-dfn-for="lc-entitydescriptor/ACS">isDefault</dfn>|0..1|If more than one [=lc-entitydescriptor/AssertionConsumerService=] elements are included, one of these elements MUST be flagged as default by setting the isDefault XML attribute with value `true`.


#### DV→RD <dfn data-dfn-for="dv-entitydescriptor">EntityDescriptor</dfn> 

For each [=DV=] supported by an [=LC=] the following metadata must be included in the [=LC=] metadata.

Element/@Attribute|0..n|Description
---|---|---
&#64;<dfn data-dfn-for="dv-entitydescriptor">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
&#64;<dfn data-dfn-for="dv-entitydescriptor">entityID</dfn>|1|Specifies the unique identifier of the SAML entity whose metadata is described by the element's contents. MUST contain the [=entityid=] of the [=DV=].
&#64;<dfn data-dfn-for="dv-entitydescriptor">validUntil</dfn>|0..1|SHOULD NOT be used as either [=lc-metadata/validUntil=] or [=lc-metadata/cacheDuration=] is already present at [=lc-metadata/EntitiesDescriptor=] level.<br/>MAY contain a datetime at which the metadata expires.<br/>If validUntil is expired, the metadata is considered invalid.
&#64;<dfn data-dfn-for="dv-entitydescriptor">cacheDuration</dfn>|0..1|SHOULD NOT be used as either [=lc-metadata/validUntil=] or [=lc-metadata/cacheDuration=] is already present at [=lc-metadata/EntitiesDescriptor=] level.<br/>MAY contain cacheduration. [=RD=] is advised to check for new metadata after the given period.
<dfn data-dfn-for="dv-entitydescriptor">Signature</dfn>|0..1|SHOULD NOT be used as the metadata is already signed at the [=lc-metadata/EntitiesDescriptor=] level.<br/>If used it MUST be generated with the private signing key with an associates PKIoverheid public-key certificate which contains the same OIN as the [=entityid=] in the [=DV=] [=dv-entitydescriptor/EntityDescriptor=]. The public key certificate MUST be present in the KeyDescriptor metadata. MUST contain a `KeyInfo` element with a `KeyName` or `X509Certificate` elements.
<dfn data-dfn-for="dv-entitydescriptor">SPSSODescriptor</dfn>|1|	
@&#8209;&#64;<dfn data-dfn-for="dv-entitydescriptor">protocolSupportEnumeration</dfn>|1|Set to: `urn:oasis:names:tc:SAML:2.0:protocol`.
-<dfn data-dfn-for="dv-entitydescriptor">KeyDescriptor</dfn>|1..2|MUST contain at least 1 [=dv-metadata/KeyDescriptor=] element that supports encryption (`@use="encryption"`). A second [=dv-metadata/KeyDescriptor=] with `@use="encryption"` MAY be present to support certificate rollover.<br/>Also see technical requirements on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
--<dfn data-dfn-for="dv-entitydescriptor">KeyInfo</dfn>|1|	
---<dfn data-dfn-for="dv-entitydescriptor">KeyName</dfn>|1|Contains the name which identifies the key. MAY be any string. Common practice is using the SHA1 fingerprint stripped of colons.
---<dfn data-dfn-for="dv-entitydescriptor">X509Data</dfn>|1|Contains the encoded X509 certificate with the public key.
-<dfn data-dfn-for="dv-entitydescriptor">AssertionConsumerService</dfn>|1..n|According to saml-metadata-2.0 MUST contain at least one URL to which the [=EU=] will be redirected after authentication. MUST contain only one entry. MUST contain a copy of the [=lc-entitydescriptor/AssertionConsumerService=] element in the [=LC=]’s [=lc-entitydescriptor/EntityDescriptor=]. This entry will be ignored as the [=lc-entitydescriptor/AssertionConsumerService=] definitions in the LC [=lc-entitydescriptor/EntityDescriptor=] MUST be used.

### RD→DV/LC metadata {#rd-idp-metadata}

Published by|Consumed by
---|---
[=RD=]|[=DV=] that connect directly with [=RD=], [=LC=]

[=RD=] publishes metadata in accordance with [[SAML2.METADATA]] with one [=rd-idp-metadata/EntityDescriptor=] element. The metadata is signed in accordance with the SAML signature.

See also [Example SAML-metadata a RD for DV](#example-saml-metadata-rd-for-dv 'Example of SAML-metadata a RD needs te provide to a DV')

Element/@Attribute|0..n|Description
---|---|---
<dfn data-dfn-for="rd-idp-metadata">EntityDescriptor</dfn>|1|	
-&#64;<dfn data-dfn-for="rd-idp-metadata">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
-&#64;<dfn data-dfn-for="rd-idp-metadata">entityID</dfn>|1|Specifies the unique identifier of the SAML entity whose metadata is described by the element's contents. Contains the [=entityid=] of RD.
-&#64;<dfn data-dfn-for="rd-idp-metadata">validUntil</dfn>|0..1|MAY contain a datetime at which the metadata expires.</br>If [=rd-idp-metadata/validUntil=] is expired, the metadata is considered invalid.</br>Either [=rd-idp-metadata/validUntil=] or [=rd-idp-metadata/cacheDuration=] MUST be present. (following OASIS specification [[SAML2.METADATA]])
-&#64;<dfn data-dfn-for="rd-idp-metadata">cacheDuration</dfn>|0..1|MAY contain cache duration. DV or LC is advised to check for new metadata after the given period.<br/>Either [=rd-idp-metadata/validUntil=] or [=rd-idp-metadata/cacheDuration=] MUST be present. (following OASIS specification [[SAML2.METADATA]])
-<dfn data-dfn-for="rd-idp-metadata">Signature</dfn>|1|MUST contain the Digital signature of the [=RD=] to verify the integrity of this [=Metadata=] and MUST be generated with a (private signing key associated with a) PKIoverheid public-key certificate which contains the same OIN as used in the [=rd-idp-metadata/entityID=]. Also see technical requirements on [Signature](#signature) and on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
-<dfn data-dfn-for="rd-idp-metadata">IDPSSODescriptor</dfn>|1|	
&#8209;&#8209;&#64;<dfn data-dfn-for="rd-idp-metadata">protocolSupportEnumeration</dfn>|1|Set to: `urn:oasis:names:tc:SAML:2.0:protocol`
--&#64;<dfn data-dfn-for="rd-idp-metadata">WantAuthnRequestsSigned</dfn>|1|Set to `true` indication that AuthnRequest messages MUST be signed by the [=DV=] or [=LC=].
--<dfn data-dfn-for="rd-idp-metadata">KeyDescriptor</dfn>|1..n|Contains at least 1 KeyDescriptor element with `@use="signing"`
---<dfn data-dfn-for="rd-idp-metadata">KeyInfo</dfn>|1|	
----<dfn data-dfn-for="rd-idp-metadata">KeyName</dfn>|1|Contains the name which identifies the key.
----<dfn data-dfn-for="rd-idp-metadata">X509Data</dfn>|1|Contains the encoded X509 certificate with the public key.
--<dfn data-dfn-for="rd-idp-metadata">ArtifactResolutionService</dfn>|1..n|The ArtifactResolutionService MUST be implemented at least once per service.
---&#64;<dfn data-dfn-for="rd-idp-metadata/ARS">Binding</dfn>|1|The binding parameter denotes the type of binding used. In the [=rd-idp-metadata/ArtifactResolutionService=] this is the SAML-SOAP binding only. The value of this attribute is a urn relating to [[SAML2.BINDINGS]].
---&#64;<dfn data-dfn-for="rd-idp-metadata/ARS">Location</dfn>|1|The URL of the SAML artifact resolution endpoint
---&#64;<dfn data-dfn-for="rd-idp-metadata/ARS">Index</dfn>|1|The index of the binding, MUST be unique for all [=rd-idp-metadata/ArtifactResolutionService=] elements
--<dfn title='elements of type EndpointType that describe endpoints that support the profiles of the Authentication Request protocol.' data-dfn-for="rd-idp-metadata">SingleSignOnService</dfn>|1..n|One or more elements of type EndpointType that describe endpoints that support the profiles of the Authentication Request protocol defined in [[SAML2.PROFILES]].
---&#64;<dfn data-dfn-for="rd-idp-metadata/SSS">Binding</dfn>|1|The binding parameter denotes the type of binding used. In the [=rd-idp-metadata/SingleSignOnService=] this is the HTTP-POST binding only. The value of this attribute is an urn relating to [[SAML2.BINDINGS]].
---&#64;<dfn data-dfn-for="rd-idp-metadata/SSS">Location</dfn>|1|The URL of the SAML [=rd-idp-metadata/SingleSignOnService=] endpoint
--<dfn data-dfn-for="rd-idp-metadata">SingleLogoutService</dfn>|1..n|Describes the endpoint used to log the [=EU=] out of its current session if participating in a [=SSO=] session.
---&#64;<dfn data-dfn-for="rd-idp-metadata/SLS">Binding</dfn>|1|MUST be set to `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`. Other bindings are NOT supported.
---&#64;<dfn data-dfn-for="rd-idp-metadata/SLS">Location</dfn>|1|The URL of the SAML endpoint
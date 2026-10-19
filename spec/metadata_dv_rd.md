## DV Metadata {#dv-metadata}

### DV→OD Metadata {#dv-metadata}

Published by|Consumed by
---|---
[=DV=] that connects to [=OD=] directly|[=OD=]

This section describes the metadata that a [=DV=] with a direct connection to [=OD=] (including a DV acting as a [=LC=]) must provide. This metadata MAY be published on a location known to [=OD=] or MAY be provided to [=OD=] by any other means supported.

See also [Example SAML-metadata DV for OD](#example-saml-metadata-dv-for-rd 'Example of SAML-metadata a DV needs te provide to a OD')


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
--<dfn title="AttributeConsumingService MUST contain 1 or more elements that describe the Service requested using an @dv-metadata/Index to a Service Definition registered with Service Catalog kept by OD."  data-dfn-for="dv-metadata">AttributeConsumingService</dfn>|0..n|Conditional: MUST be present when [=DV=] uses a corresponding[=dv-authn-request-message/AttributeConsumingServiceIndex=] in the [=DV=] [AuthnRequest Message](#dv-authn-request-message). MUST NOT be present in any other case or by any other [=Participant=] role. <br\>When used, AttributeConsumingService MUST contain 1 or more elements that describe the [=Service=] requested using an @[=dv-metadata/Index=] to a ServiceDefinition registered with [=Service Catalog=] kept by [=OD=].
---&#64;<dfn data-dfn-for="dv-metadata">Index</dfn>|1|MUST be present. Index `0` is reserved for clustered requests after the transition and MUST NOT be registered for an own service. See [Service selection](#dv-attributeconsumingserviceindex-extensions).
---&#64;<dfn data-dfn-for="dv-metadata">isDefault</dfn>|0..1|MUST be present if more than one [=dv-metadata/Index=] is specified in the metadata. MAY only be present once.  If present indicates the default [=dv-metadata/AttributeConsumingService=] which is used when no [=dv-authn-request-message/AttributeConsumingServiceIndex=] was referenced in the [AuthN Request Message](#dv-authn-request-message). It is advised to always include an [=dv-authn-request-message/AttributeConsumingServiceIndex=] in the [AuthN Request Message](#dv-authn-request-message).
---<dfn data-dfn-for="dv-metadata">ServiceName</dfn>|1..n|One or more language-qualified names for the service. Only one descriptor per language MUST be present.
---<dfn data-dfn-for="dv-metadata">RequestedAttribute</dfn>|1..n|MUST include a RequestedAttribute whose `@Name` is the ServiceID (`urn:etoegang:DV:<OIN>:services:<index>`). Additional RequestedAttribute elements declare attributes requested for that service and whether they are required. Multiple AttributeConsumingService entries MAY reference the same ServiceID with different attribute sets.
----<dfn data-dfn-for="dv-metadata">AttributeValue</dfn>|0..n|Used only where required by the requested attribute definition. A ServiceID is supplied directly in RequestedAttribute/@Name, without an AttributeValue. The OD resolves the ServiceUUID from the registered ServiceID.

### LC→OD metadata {#lc-metadata}

<span id="lc-entitydescriptor"></span>
<span id="dv-metadata-entitydescriptor"></span>

An LC is a DV acting as a cluster operator, not a separate stelsel role. It MUST publish its own ordinary [DV metadata](#dv-metadata), using its own EntityID with role code `DV`, signing certificate and AssertionConsumerService endpoints. These endpoints handle both own-service and clustered-service responses. There is no separate EntityDescriptor for each clustered DV in the LC's metadata.

The Service Catalog records the clustered DV, ServiceID, ServiceUUID, ServiceCertificate and the LC's OIN in `ClusteraansluiterId`. Adding a clustered DV, service or attribute set does not require a new EntityDescriptor in the LC metadata. The OD MUST validate the LC's authorization against this registration as described in [Service selection](#dv-attributeconsumingserviceindex-extensions).

An AttributeConsumingService for the LC's own services follows ordinary DV rules. Index `0` MUST NOT be registered after the transition: it is reserved for clustered requests with Extensions and does not reference an AttributeConsumingService entry. The transition rules are specified in [Service selection](#dv-attributeconsumingserviceindex-extensions).

See [Example LC metadata](#example-saml-metadata-lc-for-rd).

### OD→DV/LC metadata {#rd-idp-metadata}

Published by|Consumed by
---|---
[=OD=]|[=DV=] that connect directly with [=OD=], [=LC=]

[=OD=] publishes metadata in accordance with [[SAML2.METADATA]] with one [=rd-idp-metadata/EntityDescriptor=] element. The metadata is signed in accordance with the SAML signature.

See also [Example SAML-metadata a OD for DV](#example-saml-metadata-rd-for-dv 'Example of SAML-metadata a OD needs te provide to a DV')

Element/@Attribute|0..n|Description
---|---|---
<dfn data-dfn-for="rd-idp-metadata">EntityDescriptor</dfn>|1|	
-&#64;<dfn data-dfn-for="rd-idp-metadata">ID</dfn>|1|A document-unique identifier for the element, typically used as a reference point when signing.
-&#64;<dfn data-dfn-for="rd-idp-metadata">entityID</dfn>|1|Specifies the unique identifier of the SAML entity whose metadata is described by the element's contents. Contains the [=entityid=] of OD.
-&#64;<dfn data-dfn-for="rd-idp-metadata">validUntil</dfn>|0..1|MAY contain a datetime at which the metadata expires.</br>If [=rd-idp-metadata/validUntil=] is expired, the metadata is considered invalid.</br>Either [=rd-idp-metadata/validUntil=] or [=rd-idp-metadata/cacheDuration=] MUST be present. (following OASIS specification [[SAML2.METADATA]])
-&#64;<dfn data-dfn-for="rd-idp-metadata">cacheDuration</dfn>|0..1|MAY contain cache duration. DV or LC is advised to check for new metadata after the given period.<br/>Either [=rd-idp-metadata/validUntil=] or [=rd-idp-metadata/cacheDuration=] MUST be present. (following OASIS specification [[SAML2.METADATA]])
-<dfn data-dfn-for="rd-idp-metadata">Signature</dfn>|1|MUST contain the Digital signature of the [=OD=] to verify the integrity of this [=Metadata=] and MUST be generated with a (private signing key associated with a) PKIoverheid public-key certificate which contains the same OIN as used in the [=rd-idp-metadata/entityID=]. Also see technical requirements on [Signature](#signature) and on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)
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

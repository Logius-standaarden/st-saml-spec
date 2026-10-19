## Type definitions

This page and underlying pages describe identifier types which are used by [=ST-SAML=]

- [Attribute identifier types](#attribute-identifier-types)
- [Attribute representation types](#representation-types)
- [EntityID Format](#entityid_format)
- [Level of Assurance](#level-of-assurance)


### Attribute identifier types

R1.15 uses the following attribute identifier types. The corresponding earlier [[[ST-SAML1.0]]] names are listed in [Identifier namespace conversion](#identifier-namespace-conversion).

Attribute|urn|Remarks
---|---|---
<dfn title="BSN (dutch national citizen registration number) encoded in 9-digits, padded with leading 0 if needed. Example: 123456789 or 012345678." id="identifier_types_legacy_bsn" data-dfn-for="identifier_types_legacy_bsn">Legacy-BSN</dfn>|`urn:etoegang:1.15:EntityConcernedID:Legacy-BSN`|[=BSN=] encoded in 9-digits, padded with leading 0 if needed.<br/>Example: 123456789 or 012345678.
<dfn title="BSN Encrypted Identity (EI) - BSN (dutch national citizen registration number) encrypted using BSNk polymorphic encryption." id="identifier_types_bsn" data-dfn-for="identifier_types_bsn">BSN</dfn>|`urn:etoegang:1.12:EntityConcernedID:BSN`|[=BSNk=] Encrypted Identity (EI) - [=BSN=] encrypted using [=BSNk=] polymorphic encryption. For notation see [[BSNk.DEC]], Encrypted structures
<dfn title="BSN Encrypted Identity (EI) see BSNk Encrypted structures." id="identifier_types_pseudonym" data-dfn-for="identifier_types_pseudonym">Pseudonym</dfn>|`urn:etoegang:1.12:EntityConcernedID:PseudoID`|[=BSNk=] Encrypted Pseudonym (EP) - Pseudonym is cryptografically derived from [=BSN=] or eIDAS UniquenessID using [=BSNk=] polymorphic encryption. This pseudonym is both persistent and recipient specific (pseudonym@DV). For notation see [[BSNk.DEC]], Encrypted structures
<dfn title="ETD Specific Pseudonym." id="identifier_types_specific_pseudonym" data-dfn-for="identifier_types_specific_pseudonym">ETD Specific Pseudonym</dfn>|`urn:etoegang:1.13:EntityConcernedID:Pseudo`|An ETD Specific Pseudonym is used to identify an [=EU=] that represents a [=Service Consumer=]. The pseudonym is specific for the [=DV=], the represented (employer) and the authentication means used by the [=EU=].

The following attributes may be supplied additionally, only through [=ETD=] (see https://afsprakenstelsel.etoegang.nl/Startpagina/as/identificerende-kenmerken )

### Attribute representation types {#representation-types}
The table shows the allowed representationTypes in URN format that are supported by the [=BVD=] ([=BVD-OG=]) and can be found in the [Attribute Statement](#dv-attributestatement) of the [AuthN Response - Assertion](#dv-authn-response-assertion) as a unencrypted  with @name [=dv-attributestatement/Name=]="urn:etoegang:core:RepresentationType". See [attribute for legal representation](#attribute-for-legal-representation)

representation-types|urn|Sector|description
---|---|:---:|---
Zorg_Volledig_Gezag_Kind|urn:etoegang:2026:RT:Zorg_Volledig_Gezag_Kind|health care| Specific Parental authority for children under 12 years old in healthcare
Curatele|urn:etoegang:2026:RT:WV_Curator|All| "Curatele" as registered at the "centraal curatele- en bewindregister (CCBR)"
Bewindvoering|urn:etoegang:2026:RT:WV_Bewindvoerder|All| "Bewindvoering" as registered at the "centraal curatele- en bewindregister (CCBR)"
Mentorschap|urn:etoegang:2026:RT:WV_Mentor|All| "Mentoring" as registered at the "centraal curatele- en bewindregister (CCBR)"


### EntityID Format {#entityid_format}
The format of value of the @entityID attribute is: `urn:etoegang:<ROLE>:<OIN>:entities:<index>`

<dl>
<dt>

`<OIN>`

</dt>
<dd>

The OIN of the organization.

</dd>
<dt>

`<ROLE>`

</dt>
<dd>

Indication of the role of the entity:
- AD
- DV
- BVD
- OD
- MR
- EB


</dd>
<dt>

`<index>`

</dt>
<dd>

The `<index>` is a number with 4 positions between 0000 and 8999 that can be selected by the [=Participant=] to define different endpoints (in the [=Metadata=]). Numbers between 9000 and 9999 are reserved for test systems.

</dd>
</dl>

### Level of Assurance {#level-of-assurance}
The table shows the four Levels of Assurance supported by [=ST-SAML=] and the corresponding urn’s which are used in the SAML messages.

LoA|urn
---|---
Basis|`http://eID.logius.nl/LoA/basic`
Midden|`http://eidas.europa.eu/LoA/low`
Substantieel|`http://eidas.europa.eu/LoA/substantial`
Hoog|`http://eidas.europa.eu/LoA/high`


### Attribute namespace conversion {#attribute-namespace-conversion}

The following table maps the visible, unencrypted attribute names used by R1.15 to their earlier ST-SAML 1.0 names. Namespace conversion does not change attribute values, cardinality or processing requirements. It does not authorize changes to original signed assertions, `EncryptedID` or `EncryptedAttribute` contents. The [=LoA=] URIs are unchanged.

Attribute|R1.15 name|Earlier ST-SAML name
---|---|---
ServiceUUID|`urn:etoegang:core:ServiceUUID`|`urn:nl-eid-gdi:1.0:ServiceUUID`
IntendedAudience|`urn:etoegang:core:IntendedAudience`|`urn:nl-eid-gdi:1.0:IntendedAudience`
IdpAssertion|`urn:etoegang:core:IdpAssertion`|`urn:nl-eid-gdi:1.0:IdpAssertion`
ActingSubjectID|`urn:etoegang:core:ActingSubjectID`|`urn:nl-eid-gdi:1.0:ActingSubjectID`
LegalSubjectID|`urn:etoegang:core:LegalSubjectID`|`urn:nl-eid-gdi:1.0:LegalSubjectID`
RepresentationType|`urn:etoegang:core:RepresentationType`|`urn:nl-eid-gdi:1.1:RepresentationType`

The R1.15 value for parental authority in healthcare is `urn:etoegang:2026:RT:Zorg_Volledig_Gezag_Kind`; the earlier value is `urn:nl-eid-gdi:1.1:RT:Zorg_Volledig_Gezag_Kind`. This mapping applies only to an unencrypted RepresentationType value. The current Service Catalog 2026 also defines `urn:etoegang:2026:RT:WV_Curator`, `urn:etoegang:2026:RT:WV_Bewindvoerder` and `urn:etoegang:2026:RT:WV_Mentor`. A DV selects the permitted subset per service.

### Identifier namespace conversion {#identifier-namespace-conversion}

Type|R1.15 name|Earlier ST-SAML name
---|---|---
EntityID|`urn:etoegang:<ROLE>:<OIN>:entities:<index>`|`urn:nl-eid-gdi:1.0:<ROLE>:<OIN>:entities:<index>`
Legacy-BSN|`urn:etoegang:1.15:EntityConcernedID:Legacy-BSN`|`urn:nl-eid-gdi:1.0:id:legacy-BSN`
BSN|`urn:etoegang:1.12:EntityConcernedID:BSN`|`urn:nl-eid-gdi:1.0:id:BSN`
Pseudonym|`urn:etoegang:1.12:EntityConcernedID:PseudoID`|`urn:nl-eid-gdi:1.0:id:Pseudonym`

The namespace prefix conversion by itself preserves the role code, OIN and index. R1.15 roles use the role codes listed above; a cluster operator uses DV. Earlier RD and LC identifiers in historical examples and original assertions describe their earlier interface, and MUST NOT be globally rewritten. Identifier types inside an encrypted element are determined by the issuer before encryption; the OD MUST NOT rewrite the encrypted content or original assertions to perform this conversion.

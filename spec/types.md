## Type definitions

This page and underlying pages describe identifier types which are used by [=ST-SAML=]

- [Type definitions](#type-definitions)
  - [Attribute identifier types](#attribute-identifier-types)
  - [Attribute representation types {#representation-types}](#attribute-representation-types-representation-types)
  - [EntityID Format {#entityid\_format}](#entityid-format-entityid_format)
  - [Level of Assurance {#level-of-assurance}](#level-of-assurance-level-of-assurance)


### Attribute identifier types

[[[ST-SAML1.0]]] describes the following attribute identifier types

Attribute|urn|Remarks
---|---|---
<dfn title="BSN (dutch national citizen registration number) encoded in 9-digits, padded with leading 0 if needed. Example: 123456789 or 012345678." data-dfn-for="identifier_types_legacy_bsn">Legacy-BSN</dfn>|`urn:nl-eid-gdi:1.0:id:legacy-BSN`|[=BSN=] encoded in 9-digits, padded with leading 0 if needed.<br/>Example: 123456789 or 012345678.
<dfn title="BSN Encrypted Identity (EI) - BSN (dutch national citizen registration number) encrypted using BSNk polymorphic encryption." data-dfn-for="identifier_types_bsn">BSN</dfn>|`urn:nl-eid-gdi:1.0:id:BSN` `urn:etoegang:1.12:EntityConcernedID:BSN`|[=BSNk=] Encrypted Identity (EI) - [=BSN=] encrypted using [=BSNk=] polymorphic encryption. For notation see [[BSNk.DEC]], Encrypted structures
<dfn title="BSN Encrypted Identity (EI) see BSNk Encrypted structures." data-dfn-for="identifier_types_pseudonym">Pseudonym</dfn>|`urn:nl-eid-gdi:1.0:id:Pseudonym`<br>`urn:etoegang:1.12:EntityConcernedID:PseudoID`|[=BSNk=] Encrypted Pseudonym (EP) - Pseudonym is cryptografically derived from [=BSN=] or eIDAS UniquenessID using [=BSNk=] polymorphic encryption. This pseudonym is both persistent and recipient specific (pseudonym@DV). For notation see [[BSNk.DEC]], Encrypted structures
<dfn title="ETD Specific Pseudonym." data-dfn-for="identifier_types_specific_pseudonym">ETD Specific Pseudonym</dfn>|`urn:etoegang:1.13:EntityConcernedID:Pseudo`|An ETD Specific Pseudonym is used to identify an [=EU=] that represents a [=Service Consumer=]. The pseudonym is specific for the [=DV=], the represented (employer) and the authentication means used by the [=EU=].

The following attributes may be supplied additionally, only through [=ETD=] (see https://afsprakenstelsel.etoegang.nl/Startpagina/as/identificerende-kenmerken )

### Attribute representation types {#representation-types}
The table shows the allowed representationTypes in URN format that are supported by the [=BVD=] ([=BVD-OG=]) and can be found in the [Attribute Statement](#dv-attributestatement) of the [AuthN Response - Assertion](#dv-authn-response-assertion) as a unencrypted  with @name [=dv-attributestatement/Name=]="urn:nl-eid-gdi:1.1:RepresentationType". See [attribute for legal representation](#attribute-for-legal-representation)

representation-types|urn|Sector|description
---|---|:---:|---
Zorg_Volledig_Gezag_Kind|urn:nl-eid-gdi:1.1:RT:Zorg_Volledig_Gezag_Kind|health care| Specific Parental authority for children under 12 years old in healthcare
Curatele|urn:nl-eid-gdi:1.1:RT:WV_Curator|All| "Curatele" as registered at the "centraal curatele- en bewindregister (CCBR)"
Bewindvoering|urn:nl-eid-gdi:1.1:RT:WV_Bewindvoerder|All| "Bewindvoering" as registered at the "centraal curatele- en bewindregister (CCBR)"
Mentorschap|urn:nl-eid-gdi:1.1:RT:WV_Mentor|All| "Mentoring" as registered at the "centraal curatele- en bewindregister (CCBR)"


### EntityID Format {#entityid_format}
The format of value of the @entityID attribute is: `urn:nl-eid-gdi:1.0:<ROLE>:<OIN>:entities:<index>`

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
- LC
- RD


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





## Type definitions

This page and underlying pages describe identifier types which are used by [=ST-SAML=]

- [Attribute Identifier types](#attribute-identifier-types)
- [Attribute representation Types](#representation-types)
- [EntityID Format](#entityid_format)
- [Level of Assurance](#level-of-assurance)


### Attribute identifier types

[[[ST-SAML1.0]]] describes the following attribute identifier types

Attribute|urn|Remarks
---|---|---
BSN|`urn:nl-eid-gdi:1.0:id:legacy-BSN`|BSN. encoded in 9-digits, padded with leading 0 if needed.<br/>Example: 123456789 or 012345678.
BSN|`urn:nl-eid-gdi:1.0:id:BSN`|Encrypted Identity (see [[BSNk.DEC]], Encrypted structures )
Pseudonym|`urn:nl-eid-gdi:1.0:id:Pseudonym`|Encrypted Pseudonym (see [[BSNk.DEC]] Encrypted structures)

The following attributes may be supplied additionally, only through [=ETD=] (see https://afsprakenstelsel.etoegang.nl/Startpagina/as/identificerende-kenmerken )

### Attribute representation types {#representation-types}
The table shows the allowed representationTypes in URN format that are supported by the [=BVD=] ([=BVD-OG=]) and can be found in the [Attribute Statement](#dv-attributestatement) of the [AuthN Response - Assertion](#dv-authn-response-assertion) as a unencrypted  with @name [=dv-attributestatement/Name=]="urn:nl-eid-gdi:1.1:RepresentationType". See [attribute for legal representation](#attribute-for-legal-representation)

representation-types|urn|Sector|description
---|---|:---:|---
Zorg_Volledig_Gezag_Kind|urn:nl-eid-gdi:1.1:RT:Zorg_Volledig_Gezag_Kind|health care| Specific Parental authority for children under 12 years old in healthcare


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





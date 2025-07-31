## Introduction {#introduction}

This [=ST-SAML=] specification facilitates Stelsel Toegang release 1. [[ST-SAML1.0]] derived from [[eID SAML4.4]] and [[eID SAML4.5]]. It introduces the [=BVD-OG=] for an extra representation use case: legal representation of a minor by someone with parental authority (Ouderlijk Gezag). If a [=DV=] supports this use case, the [=RD=] (or [=DV=]) will offer the choice to do so to the [=EU=].

[=ST-SAML=] specifies the communication between [=DV=] and [=RD=] and also between [=LC=]  and [=RD=]. [=ST-SAML=] also specifies the communication between Routeringsdienst ([=RD=]) and [=BVD=] for parental authority ([=BVD-OG=]). [[eID SAML4.5]] specifies the communication between [=RD=] and DigiD (as [=AD=]) and between [=RD=] and [=BVD=] for registered mandates in DigiD-Machtigen: [=BVD-DDM=]. These DigiD specific specifications are out of scope for this [=ST-SAML=] specification.

<figure>
     <pre class="diagram mermaid">
flowchart LR
  classDef InScope color:black,font-weight:bold,fill:#ddd,stroke-width:3px,stroke:#111;
  classDef OutScope color:#888,font-weight:bold,fill:#444,stroke-width:3px,stroke:#777;
  
  DV:::InScope ==> LC:::InScope
  DV:::InScope ==>|Single| RD:::InScope;
  LC:::InScope ==>|Clustered| RD:::InScope;
  RD ---|out of scope|DigiD:::OutScope;
  RD ---|out of scope|BVD_DDM:::OutScope;
  RD:::InScope ==> BVD_OG:::InScope;

  linkStyle 3 stroke:#444444,stroke-width:4px,anything;
  linkStyle 4 stroke:#444444,stroke-width:4px,anything;
</pre>
<figcaption>Stelsel Toegang SAML1.0</figcaption>
</figure>

Routeringsdienst ([=RD=]) supports the use cases summarized below:

Use case|Description
---|---
Authentication|Authenticating an [=EU=] for a single [=Service=], for a single purpose. This is the most basic use case scenario from a [=DV=]'s point of view. Authentication always implies consent of the [=EU=] for accessing the [=Service=] and may include authorization if the [=EU=] is using representation.
Cluster connection connectivity|In a Cluster connection setting, a [=LC=] is technically responsible for connecting a [=DV=] to [=RD=].
Authentication with representation|an [=EU=] authenticates with the intent to consume the [=Service=] on behalf of another person [=Represented Party=] using a Representation Relationship that is registered within a [=BVD=] context.
Authentication and/or representation via a [=RD=]|At a [=RD=], an [=EU=] interactively selects an [=AD=] for which they own an authentication means, and/or a [=BVD=] in which a representation relation that they intend to use is registered, from multiple options. The [=RD=] redirects the [=EU=] to the selected [=AD=] and/or [=BVD=].
Authentication with [=AD=]/[=BVD=] preselection|Authenticating an [=EU=] where selection for the [=AD=] or [=BVD=] is done at the [=DV=] prior to the authentication request to the [=RD=] in order to optimize the [=EU=] experience.

#### SAML specification
The document is not a complete [=SAML=] reference. It is assumed that the reader is familiar with SAML and will use the referenced documentation as well when needed.
- SAML Message specification - Contains message definitions of all interactions between [=DV=]/[=LC=] – [=RD=] and between [=RD=] – [=AD=]/[=BVD=].
- SAML Metadata - Contains metadata definitions for [=DV=], [=LC=], [=RD=], [=AD=] and [=BVD=].


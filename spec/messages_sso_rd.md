### OD→AD login & logout {#rd-saml-sso}

This section is extending the [DV/LC→OD SAML Federated login and logout](#dv-saml-sso) between [=OD=] and [=AD=].

A [=OD=] that supports [=SSO=] to [=DV=] s or [=LC=]s must propagate logout requests to the correct [=AD=] or [=AD=]s. The diagram below depicts the flow between a [=OD=] and an [=AD=]. The encompassing flow, between [=DV=]/[=LC=] and [=OD=], is out of scope (see [[eID SAML4.4]] for details).

#### OD→AD logout Request - Diagram {#rd-logout-request-diagram}
A [=DV=] or [=LC=] can send this message to [=OD=] when a user logs out at an [=DV=]. A [=OD=] can send this message to an [=AD=].

Sender|Recipient
:---:|:---:
[=OD=]|[=AD=]

<figure>
    <div class="mermaid" data-figure-name="saml-logout-rd-ad-bvd.mermaid"></div>
    <figcaption>Logout Response OD -AD</figcaption>
</figure>


#### OD→AD logout Request - Message {#rd-logout-request-message}

A [=DV=] or [=LC=] can send this message to [=OD=] when a user logs out at an [=DV=]. A [=OD=] can send this message to an [=AD=].
The XML message follows [DV/LC→OD SAML Federated logout Request - Message](#dv-logout-request-message)



#### OD&larr;AD logout Response - Diagram {#rd-logout-response-diagram}

In response to a [Logout Request message](#rd-logout-request-message) from [=OD=], an [=AD=] will send this message to the requesting [=OD=].

Sender|Recipient
:---:|:---:
[=AD=]|[=OD=]

<figure>
    <div class="mermaid" data-figure-name="saml-logout-rd-ad-bvd.mermaid"></div>
    <figcaption>Logout Response OD -AD</figcaption>
</figure>

#### OD→AD logout Response - Message {#rd-logout-response-message}


An [=AD=] can send this Federated logout response message to the requesting [=OD=].
TThe XML message follows [DV/LC→OD SAML Federated logout Response - Message](#dv-logout-response-message)


The backend binding differs from DV→OD logout: both the OD→AD LogoutRequest and the AD→OD LogoutResponse use HTTP-Artifact. The receiver resolves the artifact over mutually authenticated SOAP at the issuer's ArtifactResolutionService, receives the signed XML message in an ArtifactResponse, and validates the response, signature, destination and correlation before processing it. Only the intended recipient may resolve an artifact, and an artifact MUST be accepted at most once. The BVD has no logout endpoint and MUST NOT be included in this exchange.

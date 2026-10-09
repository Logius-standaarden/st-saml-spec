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
he message is identical to [DV/LC→OD SAML Federated logout Request - Message](#dv-logout-request-message)



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
The message is identical to [DV/LC→OD SAML Federated logout Response - Message](#dv-logout-response-message)


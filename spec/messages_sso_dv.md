### DV&rarr;RD login & logout {#dv-saml-sso}

>**NOTE**<br/>
> Support for federated login and logout may be subject to change in future versions of this specification. [=DV=]/[=LC=]s which decide to make use of federated login and logout, as supported by this version of the specification, must be prepared to make all the necessary changes to their use of federated login and logout as soon as a later version of the specification mandates such changes.
> 
> Support for federated login and logout in future versions of this specification will adhere to policies that are expected to emerge from the broader discussion about federated login and logout in the context of the eIDAS regulation.
> 
> Most notably, support for IdP [=AD=] initiated logout may become mandatory in a future version of this specification.

#### DV Federated Login

Federated Login via a [=SSO=] federation is only supported for multiple connections (websites) of a single [=DV=]. Furthermore, [=DigiD=] does not support SSO federation between [[DigiD SAML3.x]] and [[eID SAML4.4]] (or later) connections.

A [=DV=] who wants to grant access to his services through [=SSO=]  can do so via the [=SSO=] service from [=RD=]. The [=DV=] then participates in an [=SSO=] federation which may include several websites of the [=DV=] who all want to use the [=SSO=] functionality that is offered within the [=SSO=] federation. Details on the [=SSO=] service are provided by [=RD=].
In a number of cases, the [=EU=] is still asked to provide his credentials:

1.	The Level of Assurance [=LoA=] that the [=DV=] website requests may be higher than the level of reliability that is stored in the existing [=SSO=] session.
1.	The existing [=SSO=] session can apply to a different [=SSO=] federation than the [=DV=] website is a member of.
1.	The [=DV=] website can include the `ForceAuthn` element in the [authentication request](#dv-authnrequest), with the value True. If a value is not provided or the element is omitted, the default is "False"
1.	The existing [=SSO=] session has expired.

 
#### DV&rarr;RD logout Request - Diagram {#dv-logout-request-diagram}
A [=DV=] or [=LC=] can send this message to [=RD=] when an [=EU=] logs out at an [=DV=]. A [=RD=] can send this message to an [=AD=].

Sender|Recipient
---|---
[=DV=]|[=RD=]
[=LC=]|[=RD=]


<figure>
     <pre class="diagram mermaid">
    %%{init: {"themeVariables": {"fontSize": "24px"}, "sequence": {"boxMargin": 20}}}%%
    sequenceDiagram
    autonumber
    participant A as User Agent
    participant B as DV / LC
    participant C as RD&lt;br/&gt;front-channel-channel
    participant D as RD&lt;br/&gt;back-channel-channel
    participant E as AD
    A->>B: local logout
    rect rgba(255,0,0,.1)
        B-->>A: LogoutRequest
        A->>C: LogoutRequest
    end
    rect rgba(75, 75, 75,.4)
    rect rgba(75, 75, 75,.4)
        Note over D,E:  Out of Scope: see RD#8594;AD/BVD
        C->>E: 
        E->>E: 
        E-->>C: 
    end 
    end
    C-->>A: LogoutResponse
    A->>B: LogoutResponse
</pre>
<figcaption>LogoutRequest DV/LC - RD</figcaption>
</figure>

Only SP ([=DV=]) initiated logout is supported by [=RD=]. On receiving a logout request (1) a [=DV=] which participates in a [=SSO=] federation MUST send a [Logout request](#dv-logout-request-message) to [=RD=] (2b).

This will result in [=RD=] to terminate the [=SSO=]  session if it still was active. As a result, the [=EU=] will have to re-authenticate when accessing a [=DV=] even if that [=DV=] is part of the same [=SSO=]  federation that was just terminated. 

SP initiated logout is limited in the sense that any other active [=SSO=]  originated sessions with DV's is not actively terminated upon receipt of a SP ([=DV=]) initiated logout message. Sessions with other active [=DV=]'s within the same federation will continue to be active until the local [=DV=] session times out or the [=EU=] logs out of the [=DV=].

#### DV&rarr;RD logout Request - Message {#dv-logout-request-message}


Element/@Attribute|0..n|Description
---|---|---
&#64;<dfn title="Unique message attribute" data-dfn-for="dv-logout-request-message">ID</dfn>|1|Unique message attribute
&#64;<dfn title="Version of the SAML protocol. The value MUST be '2.0'." data-dfn-for="dv-logout-request-message">Version</dfn>|1|Version of the SAML protocol. The value MUST be '2.0'.
&#64;<dfn title="Time at which the message was created." data-dfn-for="dv-logout-request-message">IssueInstant</dfn>|1|Time at which the message was created.
&#64;<dfn title="URL of the recipient on which the message is offered." data-dfn-for="dv-logout-request-message">Destination</dfn>|1|URL of the recipient on which the message is offered.
<dfn title="MUST contain the Digital signature of the sender for the enveloped message."  data-dfn-for="dv-logout-request-message">Signature</dfn>|1|MUST contain the Digital signature of the sender for the enveloped message (`@Algoritm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"`). MUST contain a `KeyInfo` element with either a `KeyName` or `X509Certificate` elements. See [Signature](#signature).
<dfn title="MUST contain the TransientID (SessionIndex) element of the original Assertion."  data-dfn-for="dv-logout-request-message">NameID</dfn>|1|MUST contain the @NameID [=dv-authn-response-assertion/Subject/NameID=] element of the original Assertion.
<dfn title="MUST contain the TransientID (SessionIndex) element of the original Assertion."  data-dfn-for="dv-logout-request-message">SessionIndex</dfn>|0..1|Conditional, MUST contain the TransientID [=dv-authn-response-assertion/SessionIndex=] element of the original Assertion.
<dfn title="MUST contain the  of the sender." data-dfn-for="dv-logout-request-message">Issuer</dfn>|1|MUST contain the  of the sender.


#### DV&larr;RD logout Response - Diagram {#dv-logout-response-diagram}

In response to a [Logout Request message](#dv-logout-request-message) the [=RD=] will send this message to the [=DV=] or [=LC=], or a [=AD=] will send this message to the requesting [=RD=].

Sender|Recipient
:---:|:---:
[=RD=]|[=DV=]
[=RD=]|[=LC=]


<figure>
     <pre class="diagram mermaid">
    %%{init: {"themeVariables": {"fontSize": "24px"}, "sequence": {"boxMargin": 20}}}%%
    sequenceDiagram
        autonumber
        participant A as User Agent
        participant B as DV / LC
        participant C as RD&lt;br/&gt;front-channel-channel
        participant D as RD&lt;br/&gt;back-channel-channel
        participant E as AD
        A->>B: local logout
        B-->>A: LogoutRequest
        A->>C: LogoutRequest
        rect rgba(75, 75, 75,.4)
            Note over D,E:  Out of Scope: see RD#8594;AD/BVD
            C->>E: 
            E->>E: 
            E-->>C: 
        end 
        rect rgba(255,0,0,.1)
        rect rgba(255,0,0,.1)
            C-->>A: LogoutResponse
            A->>B: LogoutResponse
        end
        end
</pre>
<figcaption>LogoutResponse DV/LC - RD</figcaption>
</figure>

#### DV&larr;RD logout Response - Message {#dv-logout-response-message}

Element/@Attribute|0..n|Description
---|---|---
&#64;<dfn title="Unique message attribute."  data-dfn-for="dv-logout-response-message">ID</dfn>|1|Unique message attribute
&#64;<dfn title="Version of the SAML protocol. The value MUST be 2.0." data-dfn-for="dv-logout-response-message">Version</dfn>|1|Version of the SAML protocol. The value MUST be `2.0`.
&#64;<dfn title="Time at which the message was created."  data-dfn-for="dv-logout-response-message">IssueInstant</dfn>|1|Time at which the message was created.
&#64;<dfn title="URL of the recipient on which the message is offered."   data-dfn-for="dv-logout-response-message">Destination</dfn>|1|URL of the recipient on which the message is offered.
&#64;<dfn title="DV logout request message - ID of the Logout Request message for which this Logout Response message is the answer." data-dfn-for="dv-logout-response-message">InResponseTo</dfn>|1|[=dv-logout-request-message/ID=] of the [Logout Request message](#dv-logout-request-message) for which this [Logout Response message](#dv-logout-response-message) is the answer.
<dfn title="MUST contain the Digital signature of the sender for the enveloped message."  data-dfn-for="dv-logout-response-message">Signature</dfn>|1|MUST contain the Digital signature of the sender for the enveloped message (`@Algoritm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"`). MUST contain a `KeyInfo` element with a `KeyName` element. See [Signature](#signature).
<dfn title="MUST contain the EntityID of the sender." data-dfn-for="dv-logout-response-message">Issuer</dfn>|1|MUST contain the [=EntityID=] of the sender.
<dfn title="MUST contain a DV logout response message - StatusCode element with the status of the logout." data-dfn-for="dv-logout-response-message">Status</dfn>|1|MUST contain a [=dv-logout-response-message/StatusCode=] element with the status of the logout.
-<dfn title="MUST be present in a DV logout response message - Status element." data-dfn-for="dv-logout-response-message">StatusCode</dfn>|1|MUST be present in a [=dv-logout-response-message/Status=] element.

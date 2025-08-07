### RD→AD login & logout {#rd-saml-sso}

This section is extending the [DV/LC→RD SAML Federated login and logout](#dv-saml-sso) between [=RD=] and [=AD=].

A [=RD=] that supports [=SSO=] to [=DV=] s or [=LC=]s must propagate logout requests to the correct [=AD=] or [=AD=]s. The diagram below depicts the flow between a [=RD=] and an [=AD=]. The encompassing flow, between [=DV=]/[=LC=] and [=RD=], is out of scope (see [[[eID SAML4.4]]] for details).

#### RD→AD logout Request - Diagram {#rd-logout-request-diagram}
A [=DV=] or [=LC=] can send this message to [=RD=] when a user logs out at an [=DV=]. A [=RD=] can send this message to an [=AD=].

Sender|Recipient
:---:|:---:
[=RD=]|[=AD=]

<figure>
     <pre class="diagram mermaid">
    %%{init: {"themeVariables": {"fontSize": "24px"}, "sequence": {"boxMargin": 20}}}%%
    sequenceDiagram
        autonumber
        participant A as User Agent
        participant B as DV / LC
        participant C as RD
        participant E as AD
        rect rgba(75, 75, 75,.4)
            Note over B,C: See DV#8594;RD
            A->>B: 
            B-->>A: 
            A->>C: 
        end 
        rect rgba(255,0,0,.1)
            C-->>A: LogoutRequest
            A->>E: LogoutRequest
        end
        E->>E: terminate SSO session
        E-->>A: LogoutResponse 
        A->>C: LogoutResponse
        rect rgba(75, 75, 75,.4)
        rect rgba(75, 75, 75,.4)
            Note over B,C: See DV#8594;RD
            C-->>A: 
            A->>B: 
        end
        end
</pre>
<figcaption>Logout Response RD -AD</figcaption>
</figure>


#### RD→AD logout Request - Message {#rd-logout-request-message}

A [=DV=] or [=LC=] can send this message to [=RD=] when a user logs out at an [=DV=]. A [=RD=] can send this message to an [=AD=].
he message is identical to [DV/LC→RD SAML Federated logout Request - Message](#dv-logout-request-message)



#### RD&larr;AD logout Response - Diagram {#rd-logout-response-diagram}

In response to a [Logout Request message](#rd-logout-request-message) from [=RD=], an [=AD=] will send this message to the requesting [=RD=].

Sender|Recipient
:---:|:---:
[=AD=]|[=RD=]

<figure>
     <pre class="diagram mermaid">
    %%{init: {"themeVariables": {"fontSize": "24px"}, "sequence": {"boxMargin": 20}}}%%
    sequenceDiagram
        autonumber
        participant A as User Agent
        participant B as DV / LC
        participant C as RD
        participant E as AD
        rect rgba(75, 75, 75,.4)
            Note over B,C: See DV#8594;RD
            A->>B: 
            B-->>A: 
            A->>C: 
        end 
        C-->>A: LogoutRequest
        A->>E: LogoutRequest
        E->>E: terminate SSO session
        rect rgba(255,0,0,.1)
            E-->>A: LogoutResponse
            A->>C: LogoutResponse
        end
        rect rgba(75, 75, 75,.4)
        rect rgba(75, 75, 75,.4)
            Note over B,C: See DV#8594;RD
            C-->>A: 
            A->>B: 
        end
        end 
</pre>
<figcaption>Logout Response RD - AD</figcaption>
</figure>

#### RD→AD logout Response - Message {#rd-logout-response-message}


An [=AD=] can send this Federated logout response message to the requesting [=RD=].
The message is identical to [DV/LC→RD SAML Federated logout Response - Message](#dv-logout-response-message)


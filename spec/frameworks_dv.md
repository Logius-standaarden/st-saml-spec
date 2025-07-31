## [=DV=] - SAML message flows & bindings

Only the bindings that are listed in the tables are supported between [=DV=] and [=LC=]

### DV→RD authentication flow {#dv-authentication-flow}

The diagram below depicts the authentication flow between a [=DV=] and  [=LC=] and the [=RD=].

> See also [DV-RD - SAML authentication messages](#dv-saml-authentication 'Specification of SAML messages for authentication')

<figure>
<pre class="diagram mermaid">
    %%{init: {"themeVariables": {"fontSize": "24px"}, "sequence": {"boxMargin": 20}}}%%
    sequenceDiagram
    autonumber
    participant A as UA
    participant B as DV / LC
    participant C as RD&lt;br/&gt;front-channel
    participant D as RD&lt;br/&gt;back-channel
    participant E as AD/BVD
    A->>B: GET resource
    B-->>A: AuthnRequest
    A->>C: AuthnRequest
    rect rgba(75, 75, 75,.4)
        Note over C,E: Out of Scope - see RD#8594;AD/BVD
        C-->>A:     
        A->>E: 
        E-->>A: 
        A->>C: 
    end
    C-->>A: artifact
    A->>B: artifact
    B->>D: ArtifactResolve
    D-->>B: ArtifactResponse
    B->>B: establish security context
    rect rgba(75, 75, 75, 0)
      B-->>A: access resource
    end
</pre>
<figcaption>Authentication and representation flow - overview</figcaption>
</figure>

#### Front-channel (re)authentication

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Metadata
---|---|---|---|---|---
2 + 3|[=DV=]/[=LC=]&nbsp;(&rarr;[=UA=])&rarr;[=RD=]|[AuthN Request message](# 'Authentication Request to obtain assertions containing authentication statements to establish a security context')|[=rd-idp-metadata/SingleSignOnService=]|HTTP-POST|[RD&rarr;DV](#rd-idp-metadata 'SAML-metadata RD for DV')
8 + 9|[=RD=]&nbsp;(&rarr;[=UA=])&rarr;[=DV=]/[=LC=]|[Artifact binding message](#dv-saml-response-artifact-binding-message '(SAML) Pointer to SAML message that is send through the Front-channel, to avoid exposing sensitive data to the Webbrowser (UA) of the EndUser (EU).')|[=dv-metadata/AssertionConsumerService=]&nbsp;([=DV=])<br/>[=lc-entitydescriptor/AssertionConsumerService=]&nbsp;([=LC=])|HTTP-Artifact|[DV&rarr;RD](#dv-metadata 'SAML-metadata DV for RD') [LC&rarr;RD](#lc-metadata 'SAML-metadata LC for RD')

</span>

#### Back-channel (Assertion)

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Metadata
---|---|---|---|---|---
10|[=DV=]/[=LC=]&rarr;[=RD=]|[Artifact Resolve message](#dv-artifact-resolve-message '(After receiving an Artifact) the DV uses the Artifact to request the actual ASML assertion containing authentication statements to establish a security context')|[=rd-idp-metadata/ArtifactResolutionService=]|SOAP|[RD&rarr;DV](#rd-idp-metadata 'SAML-metadata RD for DV')
11|[=RD=]&rarr;[=DV=]/[=LC=]|[AuthN Response message](#dv-artifact-response 'In response to a Artifact Resolve request the actual SAML assertion is returned containing authentication statements to establish a security context')|None, is a synchronous response|SOAP|	

</span>

### DV→RD Federated Logout flow {#dv-sso-flow}

Only a limited form of SP ([=DV=]/[=LC=]) initiated logout is supported within the context of a [=SSO=] federation. IdP ([=AD=]) initiated Logout is NOT supported! On receiving a logout request from the [=EU=] via the [=UA=] (step 1) a [=DV=]/[=LC=] which participates in a [=SSO=] federation MUST send a [LogoutRequest](#dv-logout-request-message) to [=RD=] (step 2 and 3). [=RD=] propagates the Logout Request to appropriate [=AD=]. If the AD replies success status, the [=RD=] will reply with a LogoutResponse with success status to the [=DV=]/[=LC=].

The diagram below depicts the single logout flow between a [=DV=] and [=LC=] and the [=RD=].

> Also see [SAML Federated login and logout](#dv-saml-sso)


<figure>
<pre class="diagram mermaid">
    %%{init: {
        "themeVariables": {"fontSize": "24px"}, 
        "sequence": {"boxMargin": 20}
    }}%%
    sequenceDiagram
    autonumber
    participant A as UA
    participant B as DV / LC
    participant C as RD&lt;br/&gt;front-channel
    participant D as RD&lt;br/&gt;back-channel
    participant E as AD
    A->>B: local logout
    B-->>A: LogoutRequest
    A->>C: LogoutRequest
    rect rgba(75, 75, 75,.4)
        Note over C,E: Out of Scope: see RD#8594;AD/BVD
        C->>E: 
        E->>E: 
        E-->>C: 
    end
    rect rgba(75, 75, 75, 0)
        C-->>A: LogoutResponse
        A->>B: LogoutResponse
    end
</pre>
<figcaption>SAML Federated Logout overview</figcaption>
</figure>

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Meta-data
---|---|---|---|---|---
2 + 3|[=DV=]/[=LC=] (&rarr;[=UA=])&rarr;[=RD=]|[Logout Request](#dv-logout-request-message 'Specification of Federated logout request message of DV/LC to RD')|[=rd-idp-metadata/SingleLogoutService=]|HTTP-POST|[RD&rarr;DV](#rd-idp-metadata 'RD IdP metadata: SAML-metadata RD for DV')
7 + 8|[=RD=] (&rarr;[=UA=])&rarr;[=DV=]/[=LC=]|[Logout Response](#dv-logout-response-message)|[=dv-metadata/SingleLogoutService=]&nbsp;(DV)<br/>[=lc-entitydescriptor/SingleLogoutService=]&nbsp;(LC)|HTTP-POST|[DV&rarr;RD](#dv-metadata 'DV metadata: SAML-metadata DV for RD') [LC&rarr;RD](#lc-metadata 'LC metadata: SAML-metadata LC for RD')
 
</span>
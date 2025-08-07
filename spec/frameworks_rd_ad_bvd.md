## [=RD=] - SAML message flows & bindings

Only the bindings that are listed in the tables are supported between [=RD=] and [=AD=]/[=BVD=]

### RD→AD authentication flow

A [=RD=] helps the acting End User ([=EU=]) to select the authentication scenario based on registration a the [=Service=] in the [=Service Catalog=]. Based on the  [=EU=] choices [=RD=] MUST propagate the authentication request of the [=DV=] or [=LC=] to the appropriate [=AD=] and in case of representation the appropriate [=BVD=] via the bindings that are listed in the tables below.

The diagram below depicts the authentication flow between a [=RD=] and an [=AD=] and [=BVD=].

> See also [RD→AD/BVD - SAML authentication proces](#rd-saml-authentication 'Specification of SAML messages in the authentication proces between RD and AD/BVD')


<figure>
     <pre class="diagram mermaid">
    %%{init: {"themeVariables": {"fontSize": "24px"}, "sequence": {"boxMargin": 20}}}%%
    sequenceDiagram
    autonumber
    participant A as User Agent
    participant B as DV / LC
    participant C as RD&lt;br/&gt;front-channel
    participant D as RD&lt;br/&gt;back-channel
    participant E as AD/BVD&lt;br/&gt;front-channel
    participant F as AD/BVD&lt;br/&gt;back-channel   
    rect rgba(75, 75, 75, .4)
        Note over B,C: See DV#8594;RD
        A->>B: 
        B-->>A:  
        A->>C: 
    end 
    C-->>A: AuthnRequest
    A->>E: AuthnRequest
    rect rgba(75, 75, 75, .4)
        Note over C,E: Out of Scope - Authentication or representation interactions
        E-->>A:  
        A->>E: 
    end
    E-->>A: artifact
    A->>C: artifact
    C->>F: ArtifactResolve
    F-->>C: ArtifactResponse
    rect rgba(75, 75, 75, .4)
    rect rgba(75, 75, 75, .4)
        Note over C,D: See DV#8594;RD
        C-->>A: 
        A->>B: 
        B->>D: 
        D-->>B: 
        B-->>A: 
    end 
    end
</pre>
<figcaption>SAML authentication flow RD - AD/BVD</figcaption>
</figure>


> This flow continues between DV and RD, see [DV/LC&larr;RD - authentication flow](#dv-authentication-flow)

#### Front-channel (re)authentication

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Meta-data
---|---|---|---|---|---
4 + 5|[=RD=] (&rarr;[=UA=])&rarr;[=AD=]/[=BVD=]|[AuthN Request Message](#dv-authn-request-message 'Specification of SAML request message between RD and AD/BVD, which is almost similar to SAML request message between DV/LC and RD')|[=ad-metadata/SingleSignOnService=]|HTTP-POST|[AD/BVD](#ad-bvd-metadata 'AD/BVD metadata for RD)
8 + 9|[=AD=]/[=BVD=] (&rarr;[=UA=])&rarr;[=RD=]|[Artifact](#rd-saml-response-artifact-binding-message '(SAML) Pointer to SAML message that is send through the Front-channel, to avoid exposing sensitive data to the Webbrowser (UA) of the EndUser (EU).')|[=rd-sp-entitydescriptor/AssertionConsumerService=]|HTTP-Artifact|[RD](#rd-sp-metadata 'Metadata of RD for AD/BVD')

</span>

#### Back-channel (Assertion)

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Meta-data
---|---|---|---|---|---
10|[=RD=]&rarr;[=AD=]/[=BVD=] |[Artifact Resolve message](#dv-artifact-resolve-message '(After receiving an Artifact) the DV uses the Artifact to request the actual ASML assertion containing authentication statements to establish a security context')|[=ad-metadata/ArtifactResolutionService=]|SOAP|[AD/BVD](#ad-bvd-metadata 'AD/BVD metadata for RD')
11|[=AD=]/[=BVD=] &rarr;[=RD=]|[ArtifactResponse](#rd-artifact-response 'In response to a Artifact Resolve request the actual SAML assertion is returned containing authentication statements to establish a security context')|None, is a synchronous response|SOAP|

</span>

### RD - AD Single Logout {#rd-ad-singlelogout}

A [=RD=] that supports [=SSO=] to [=DV=]s or [=LC=]s must propagate logout requests to the appropriate [=RD=]. The diagram below depicts the flow between a [=RD=] and an [=AD=].
> See also [RD→AD/BVD Federated login & logout](#rd-saml-sso)

<div style="max-width: 80%;">

<figure>
     <pre class="diagram mermaid">
    %%{init: {"themeVariables": {"fontSize": "24px"}, "sequence": {"boxMargin": 20}}}%%
    sequenceDiagram
        autonumber
        participant A as UA
        participant B as DV / LC
        participant C as RD
        participant E as AD
        rect rgba(75, 75, 75,.4)
            Note over B,C: See DV#8594;RD
            A->>B: 
            B-->>A: 
            A->>C: 
        end 
        C-->>A: LogoutRequest!
        A->>E: LogoutRequest
        E->>E: terminate SSO session
        E-->>A: LogoutResponse 
        A->>C: LogoutResponse
        rect rgba(75, 75, 75, .4)
        rect rgba(75, 75, 75, .4)
            Note over B,C: See DV#8594;RD
            C-->>A: 
            A->>B: 
        end
        end 
</pre>
<figcaption>Single Logout RD - AD/BVD</figcaption>
</figure>

</div>

> This flow continues between DV and RD, see [DV/LC&larr;RD - authentication flow](#dv-sso-flow)

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Meta-data
---|---|---|---|---|---
4 + 5|[=RD=] (&rarr;[=UA=])&rarr;[=AD=]|[Logout Request](#rd-logout-request-message 'Specification of Federated logout request message of DV/LC to RD')|[=ad-metadata/SingleLogoutService=]|HTTP-POST|[AD/BVD](#ad-bvd-metadata)
7 + 8|[=AD=]/[=BVD=] (&rarr;[=UA=]) &rarr;[=RD=]|[Logout Response](#rd-logout-response-message)|[=rd-sp-entitydescriptor/SingleLogoutService=]|HTTP-POST|[RD]("#rd-sp-metadata")</a>

</span>
## [=DV=] - SAML message flows & bindings

Only the bindings that are listed in the tables are supported between [=DV=] and [=LC=]

### DV→OD authentication flow {#dv-authentication-flow}

The diagram below depicts the authentication flow between a [=DV=] and  [=LC=] and the [=OD=].

> See also [DV-OD - SAML authentication messages](#dv-saml-authentication 'Specification of SAML messages for authentication')

<figure>
    <div class="mermaid" data-figure-name="authentication-representation-flow.mermaid"></div>
    <figcaption>Authentication and representation flow - overview</figcaption>
</figure>

#### Front-channel (re)authentication

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Metadata
---|---|---|---|---|---
2 + 3|[=DV=]/[=LC=]&nbsp;(&rarr;[=UA=])&rarr;[=OD=]|[AuthN Request message](#dv-authn-request-message 'Authentication Request to obtain assertions containing authentication statements to establish a security context')|[=rd-idp-metadata/SingleSignOnService=]|HTTP-POST|[OD&rarr;DV](#rd-idp-metadata 'SAML-metadata OD for DV')
8 + 9|[=OD=]&nbsp;(&rarr;[=UA=])&rarr;[=DV=]/[=LC=]|[Artifact binding message](#dv-saml-response-artifact-binding-message '(SAML) Pointer to SAML message that is send through the Front-channel, to avoid exposing sensitive data to the Webbrowser (UA) of the EndUser (EU).')|[=dv-metadata/AssertionConsumerService=]&nbsp;([=DV=])<br/>[=dv-metadata/AssertionConsumerService=]&nbsp;([=LC=])|HTTP-Artifact|[DV&rarr;OD](#dv-metadata 'SAML-metadata DV for OD') [LC&rarr;OD](#lc-metadata 'SAML-metadata LC for OD')

</span>

#### Back-channel (Assertion)

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Metadata
---|---|---|---|---|---
10|[=DV=]/[=LC=]&rarr;[=OD=]|[Artifact Resolve message](#dv-artifact-resolve-message '(After receiving an Artifact) the DV uses the Artifact to request the actual ASML assertion containing authentication statements to establish a security context')|[=rd-idp-metadata/ArtifactResolutionService=]|SOAP|[OD&rarr;DV](#rd-idp-metadata 'SAML-metadata OD for DV')
11|[=OD=]&rarr;[=DV=]/[=LC=]|[AuthN Response message](#dv-artifact-response 'In response to a Artifact Resolve request the actual SAML assertion is returned containing authentication statements to establish a security context')|None, is a synchronous response|SOAP|	

</span>

### DV→OD Federated Logout flow {#dv-sso-flow}

Only a limited form of SP ([=DV=]/[=LC=]) initiated logout is supported within the context of a [=SSO=] federation. IdP ([=AD=]) initiated Logout is NOT supported! On receiving a logout request from the [=EU=] via the [=UA=] (step 1) a [=DV=]/[=LC=] which participates in a [=SSO=] federation MUST send a [LogoutRequest](#dv-logout-request-message) to [=OD=] (step 2 and 3). [=OD=] propagates the Logout Request to appropriate [=AD=]. If the AD replies success status, the [=OD=] will reply with a LogoutResponse with success status to the [=DV=]/[=LC=].

The diagram below depicts the single logout flow between a [=DV=] and [=LC=] and the [=OD=].

> Also see [SAML Federated login and logout](#dv-saml-sso)


<figure>
    <div class="mermaid" data-figure-name="saml-federated-logout-overview.mermaid"></div>
    <figcaption>SAML Federated Logout overview</figcaption>
</figure>

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Meta-data
---|---|---|---|---|---
2 + 3|[=DV=]/[=LC=] (&rarr;[=UA=])&rarr;[=OD=]|[Logout Request](#dv-logout-request-message 'Specification of Federated logout request message of DV/LC to OD')|[=rd-idp-metadata/SingleLogoutService=]|HTTP-POST|[OD&rarr;DV](#rd-idp-metadata 'OD IdP metadata: SAML-metadata OD for DV')
7 + 8|[=OD=] (&rarr;[=UA=])&rarr;[=DV=]/[=LC=]|[Logout Response](#dv-logout-response-message)|[=dv-metadata/SingleLogoutService=]&nbsp;(DV)<br/>[=dv-metadata/SingleLogoutService=]&nbsp;(LC)|HTTP-POST|[DV&rarr;OD](#dv-metadata 'DV metadata: SAML-metadata DV for OD') [LC&rarr;OD](#lc-metadata 'LC metadata: SAML-metadata LC for OD')
 
</span>

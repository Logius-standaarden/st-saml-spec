## [=OD=] - SAML message flows & bindings

Only the bindings that are listed in the tables are supported between [=OD=] and [=AD=]/[=BVD=]

### OD→AD authentication flow

A [=OD=] helps the acting End User ([=EU=]) to select the authentication scenario based on registration a the [=Service=] in the [=Service Catalog=]. Based on the  [=EU=] choices [=OD=] MUST propagate the authentication request of the [=DV=] or [=LC=] to the appropriate [=AD=] and in case of representation the appropriate [=BVD=] via the bindings that are listed in the tables below.

The diagram below depicts the authentication flow between a [=OD=] and an [=AD=] and [=BVD=].

> See also [OD→AD/BVD - SAML authentication proces](#rd-saml-authentication 'Specification of SAML messages in the authentication proces between OD and AD/BVD')

<figure>
    <div class="mermaid" data-figure-name="saml-authentication-flow-rd-ad-bvd.mermaid"></div>
    <figcaption>SAML authentication flow OD - AD/BVD</figcaption>
</figure>


> This flow continues between DV and OD, see [DV/LC&larr;OD - authentication flow](#dv-authentication-flow)

#### Front-channel (re)authentication

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Meta-data
---|---|---|---|---|---
4 + 5|[=OD=] (&rarr;[=UA=])&rarr;[=AD=]/[=BVD=]|[Request artifact](#rd-request-artifact-binding)|[=ad-metadata/SingleSignOnService=]|HTTP-Artifact|[AD/BVD](#ad-bvd-metadata 'AD/BVD metadata for OD')
8 + 9|[=AD=]/[=BVD=] (&rarr;[=UA=])&rarr;[=OD=]|[Artifact](#rd-saml-response-artifact-binding-message '(SAML) Pointer to SAML message that is send through the Front-channel, to avoid exposing sensitive data to the Webbrowser (UA) of the EndUser (EU).')|[=rd-sp-entitydescriptor/AssertionConsumerService=]|HTTP-Artifact|[OD](#rd-sp-metadata 'Metadata of OD for AD/BVD')

</span>

The step numbers refer to the overview diagram. During step 5, before handling the request, the AD/BVD resolves the OD-issued artifact over SOAP at the OD's ArtifactResolutionService. The response contains the signed AuthnRequest. These back-channel exchanges are shown without changing the overview step numbers.

#### Back-channel (request and assertion)

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Meta-data
---|---|---|---|---|---
5a|[=AD=]/[=BVD=]&rarr;[=OD=]|ArtifactResolve for request artifact|OD SPSSODescriptor ArtifactResolutionService|SOAP|[OD](#rd-sp-metadata)
5b|[=OD=]&rarr;[=AD=]/[=BVD=]|ArtifactResponse containing AuthnRequest|Synchronous response|SOAP|
10|[=OD=]&rarr;[=AD=]/[=BVD=] |[Artifact Resolve message](#dv-artifact-resolve-message '(After receiving an Artifact) the DV uses the Artifact to request the actual ASML assertion containing authentication statements to establish a security context')|[=ad-metadata/ArtifactResolutionService=]|SOAP|[AD/BVD](#ad-bvd-metadata 'AD/BVD metadata for OD')
11|[=AD=]/[=BVD=] &rarr;[=OD=]|[ArtifactResponse](#rd-artifact-response 'In response to a Artifact Resolve request the actual SAML assertion is returned containing authentication statements to establish a security context')|None, is a synchronous response|SOAP|

</span>

### OD - AD Single Logout {#rd-ad-singlelogout}

A [=OD=] that supports [=SSO=] to [=DV=]s or [=LC=]s must propagate logout requests to the appropriate [=AD=]. The diagram below depicts the flow between a [=OD=] and an [=AD=].
> See also [OD→AD/BVD Federated login & logout](#rd-saml-sso)

<figure>
    <div class="mermaid" data-figure-name="saml-logout-rd-ad-bvd.mermaid"></div>
    <figcaption>Single Logout OD - AD/BVD</figcaption>
</figure>

> This flow continues between DV and OD, see [DV/LC&larr;OD - authentication flow](#dv-sso-flow)

<span style="font-size: 90%;">

Step&nbsp;#|Route|Message|Endpoint|Binding|Meta-data
---|---|---|---|---|---
4 + 5|[=OD=] (&rarr;[=UA=])&rarr;[=AD=]|[Logout request artifact](#rd-logout-request-message 'Specification of Federated logout request message of DV/LC to OD')|[=ad-metadata/SingleLogoutService=]|HTTP-Artifact|[AD/BVD](#ad-bvd-metadata)
7 + 8|[=AD=] (&rarr;[=UA=]) &rarr;[=OD=]|[Logout response artifact](#rd-logout-response-message)|[=rd-sp-entitydescriptor/SingleLogoutService=]|HTTP-Artifact|[OD](#rd-sp-metadata)</a>

</span>
Both logout artifacts are resolved at the issuer's SOAP ArtifactResolutionService: the AD resolves the request at the OD, and the OD resolves the response at the AD. The returned ArtifactResponse contains the signed LogoutRequest or LogoutResponse respectively. The BVD does not participate in logout. The OD's HTTP-POST endpoint remains available for the separate DV→OD logout flow.

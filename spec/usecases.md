## Supported Use Cases

### Authentication {#authentication-uc}

An [=EU=] intends to consume a Service on his/her own behalf, from a DV for which authentication is required.

#### Actors

Roles
- [=EU=]
- [=DV=]
- [=RD=]
- [=AD=]

For more information see also [Roles](#roles)

#### Functional description
An [=EU=] intends to consume a [=Service=] on his/her own behalf. The Service is offered on the web by a [=DV=].

The [=EU=] visits the website of the Service, where the [=EU=] may have to interact to indicate the intent to consume the Service. As the Service requires authentication, this triggers the authentication process.

The DV will now redirect the [=EU=] to [=RD=], requesting authentication of the [=EU=] for the [=Service=]. Note that in this use case the [=EU=] will not select to act on behalf of another. (See [Authentication with Representation](#authentication-with-representation))

Next, the [=EU=] is redirected to the [=AD=]. After successful authentication the AD takes care the [=EU=] is redirected back to [=RD=], who includes the attestation of identity in the relevant interface response to the DV. This response includes at minimum an identifier of the [=EU=], the [=LoA=] attested to and the [=Service=] authenticated for. The [=LoA=] of the authentication is at minimum equal to or higher than the configured [=LoA=] for the [=Service=] within the [=Service Catalog=]. The [=RD=] now includes the attestation of identity and the attestation of representation relationship in the relevant interface response to the [=DV=]. This response includes at minimum an identifier of the [=EU=] and the [=Represented Party=], the [=LoA=] attested to and the [=Service=] authenticated for.

The [=DV=] can now take an access control decision to its [=Service=] for the [=EU=].

The technical steps in the authentication flow are described in [DV SAML Authentication](#dv-saml-authentication).
<p class="note">Communication between [=RD=] and [=DigiD=] is specified in DigiD Combiconnect specification ([=DigiD-CC=]) and is out of scope of this specification.</p>

### Authentication with representation {#authentication-with-representation}
An acting [=EU=] intends to consume a [=Service=] to represent another party, from a [=DV=], for which authentication is required. The [=EU=] acting on behalf of a [=Represented Party=], must be a Natural Person, using a representation relationship. The [=Represented Party=] must also be a Natural Person. The relationship must be formalized and a direct relationship.

The authentication of the acting [=EU=] takes place just like in the Authentication use case. Similarly, the representation information concerning both the acting [=EU=], the [=Represented Party=] and the [=Service=] for which they have a representation relation will provided by a [=BVD=], either
1. Standard representation aka [=DigiD-Machtigen=] by [=BVD-DDM=] 
1. Legal representation by other [=BVD=]s eg. [=BVD-OG=]. 

#### standard representation {#authentication-with-representation-ddm}

The acting [=EU=] acts on behalf of the [=Represented Party=] ([=Service Consumer=]). The representation relationship underpinning this must be registered by [=Represented Party=] as a formalized mandate in a mandate registry ([=DigiD-Machtigen=]), prior to application in this use case.  
> Rules governing representation and registration of a registration relationship are out of scope of this specification.
> Communication between [=RD=] and [=BVD-DDM=] is specified in [=DigiD-CC=] specification and is out of scope of this specification.</p>

#### legal representation {#authentication-with-representation-legal}

The information about the [type of legal representation](#representation-types) concerning the [=EU=] and the [=Represented Party=] will provided by a [=BVD=], eg  [=BVD-OG=] for parental authority. 
To make this use case succeed, the relationship between the [=EU=] and the [=Represented Party=] must be registered in the applicable registry in such a way that it meets the legal requirements. 

> Rules on governing legal representation are out of scope of this specification. 


#### Actors

Roles
- [=EU=]
- [=DV=]
- [=RD=]
- [=AD=]
- [=BVD=]

#### Functional description 
The [=EU=]  visits the website of the [=Service=], where the [=EU=] may have to interact to indicate the intent to consume the [=Service=]. As the [=Service=] requires authentication, this triggers the authentication process. The [=EU=] must be able to indicate the intent to consume the [=Service=] on behalf of a [=Represented Party=] (and not for his/herself) before the authentication process is triggered.

The [=DV=] (or [=LC=]) will now redirect the [=EU=] to [=RD=], requesting authentication of the [=EU=] for the [=Service=], including the request to authorize based on a representation relationship. 

Next, the [=EU=] is redirected to the [=AD=]. After successful authentication, the [=AD=] redirects the [=EU=] to [=RD=]. [=RD=] will then redirect the [=EU=] to [=BVD-DDM=]. Here the [=EU=] selects the representation relationship to use, if multiple options are available. Afterwards the [=BVD=] redirects the [=EU=] back to [=RD=].

[=RD=] now includes the attestation of identity and the attestation of the representation relationship in the relevant interface response to the [=DV=] (or [=LC=]) .
This response includes an identifier of the [=EU=] and the [=Represented Party=] and in case of legal representation also the specific [type of legal representation](#representation-types) between both. Also the requested [=ServiceUUID=] and the [=LoA=] of the authentication is included in the response. The [=LoA=] is at minimum equal to or higher than the configured [=LoA=] for the [=Service=] within the [=Service Catalog=].

The [=DV=] can now take an access control decision to its [=Service=] for the [=EU=] on behalf of the [=Represented Party=].

The technical steps in the authentication flow are described here: [DV SAML Authentication](#dv-saml-authentication).

### Cluster connection connectivity {#cluster-connection-connectivity}

In Software-as-a-Service (<abbr title="Software-as-a-Service">SaaS</abbr>) or multi-tenant solutions, multiple [=DV=]'s are hosted on a single environment operated by a software vendor. The software vendor can act as an [=LC=]. Functionally the [=LC=] itself is not actively taking part in any of the primary use cases, thus is not an actor in those use cases.
<div class="note">
Although above the Cluster is linked to SaaS solutions, the cluster connection can be applicable in Platform-as-a-Service (PaaS) offerings as well. This is only the case if the platform natively offers connectivity to [=RD=]; it is NOT applicable if the connectivity is built on top of the platform provided using PaaS.

For Infrastructure-as-a-Service solutions (IaaS), the Cluster Connection is NOT applicable.
</div>

#### Actors

Roles|Description
---|---
[=DV=]|See also [Roles](#roles)
[=LC=]|	
[=RD=]|

#### Technical description
The Cluster Connection is acknowledged during requests for authentication, as made in the supported use cases. The [=LC=] is registered at [=RD=] and is also responsible for registering all [=DV=]'s he provides access for. Relationship between [=DV=] and [=LC=] must be established in the registration/on-boarding process with [=RD=] and in [=LC=]-metadata. 

[=DV=] initiates authentication via the [=LC=].  The [=LC=] will send an [AuthN Request Message](#dv-authn-request-message) to [=RD=] on behalf of [=DV=].

Data in the response from [=RD=] will be encrypted only for the [=DV=] to decrypt, not the [=LC=].

In this way, the [=LC=] can facilitate the authentication processes, but cannot access the sensitive information contained in the response.

<p class="note">The way a [=DV=] interacts with a [=LC=] is not part of this specification.<p>

### Authentication with AD/BVD preselection {#uc-preselection}

an [=EU=] intends to consume a [=Service=] on his/her own behalf, from a (semi-)governmental or public [=DV=]], for which authentication is required. The [=EU=] makes the selection for the [=AD=]  at the [=DV=] , rather than at the [=RD=]. In order to improve [=EU=|user] experience (UX), this enables presenting the choice of [=AD=]  at the [=DV=] at the most appropriate time and in the best fitting manner.

Additionally in a representation scenario, the [=EU=] can (also) select the [=BVD=] at the [=DV=] .
<p class="note">Passing the choice for [=AD=]/[=BVD=] is solely offered for improving [=EU=|user] experience. It is explicitly not the intention that [=DV=] introduce a bias in the choice for the [=AD=]/[=BVD=] to use.
Valid use cases for bypassing [=EU=] preference, where a [=DV=] selects a specific [=AD=]/[=BVD=] for an [=EU=] , are very rare and specific. [=DV=] should offer the choice for each [=AD=]/[=BVD=] in a non-discriminatory way for all applicable [=AD=]/[=BVD=].<p>


#### Actors
Roles
- [=EU=]
- [=DV=]
- [=RD=]
- [=AD=]
- [=BVD=]

For more information see also [Roles](#roles)

#### Functional description

This use case is a functional extension to Authentication. Instead of choosing the [=AD=] and/or [=BVD=] after being redirected to the [=RD=], the [=EU=] selects the [=AD=] and/or [=BVD=] for usage at an earlier stage at the [=DV=]. The [=RD=] will apply the pre-selection as a filter on all available options. If, after filtering, alternative options are found, the [=RD=] will prompt the [=EU=] to further narrow down the selection.

The [=DV=]  will offer the [=EU=] to make a choice from the list of applicable [=AD=]s before sending a request for authentication to the [=RD=]. Simultaneously with the choice for an [=AD=], the choice to represent another will be offered the [=EU=] with (optionally) the [=BVD=]  to be used. After making the choice for an [=AD=], acting-as-a-representative and the choice for a [=BVD=] , these choices will be included in the request for authentication to the [=RD=]. In case the [=EU=] acts on behalf of another without pre-selecting a [=BVD=], the choice for a [=BVD=]  will be presented in a later stage at the [=RD=].

The technical steps in the authentication flow are described in the [SAML-Message-specification](#SAML-Message-specification).



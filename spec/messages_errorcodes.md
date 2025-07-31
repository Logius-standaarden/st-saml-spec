## Error messages {#saml-error-codes}

### Toplevel codes

The standard SAML 2.0 error codes are used. For error handling, conformity regarding the interpretation of the status codes as used in the [AuthN Response - Assertion](#dv-authn-response-assertion) element is critical. The following top-level status codes MAY be used:

|Status code|Description|
---|---
<dfn>`urn:oasis:names:tc:SAML:2.0:status:Requester`</dfn>|This status code is used for errors caused by the initiator of the SAML request. For example, because an assurance level is requested which is not supported by the recipient, or because the request message has expired.
<dfn>`urn:oasis:names:tc:SAML:2.0:status:Responder`</dfn>|This status code is used for errors caused by the recipient of the SAML request. For example, because of technical failure or because the recipient does not support requested (optional) functionality.

### Second-level status codes

The following second-level status codes MAY be used:

|Status code|Description|
---|---
<dfn>`urn:oasis:names:tc:SAML:2.0:status:AuthnFailed`</dfn>|This status code is used when a user cannot be authenticated for example because invalid credentials have been provided or the cancel button has been used.
<dfn>`urn:oasis:names:tc:SAML:2.0:status:NoAuthnContext`</dfn>|This status code is used when a user cannot be authenticated at the minimum level as specified in the [=Service Catalog=].
<dfn>`urn:oasis:names:tc:SAML:2.0:status:RequestUnsupported`</dfn>|This status code is used when a message is correctly formatted by the requester, and understood by the recipient, but that functionality is requested which is not supported by the recipient.
<dfn>`urn:oasis:names:tc:SAML:2.0:status:RequestDenied`</dfn>|This status code is used when a SAML responder that refuses to perform a message exchange with the SAML requester, for example because a mandatory signature could not be verified.
<dfn>`urn:oasis:names:tc:SAML:2.0:status:NoSupportedIDP`</dfn>|Used to indicate that a [=dv-authn-request-message/RequesterID=] is not supported by the intermediary.

### Cancelling

During the process of authenticating and authorizing, an [=EU=] may cancel the process by clicking on the cancel button. 

If an [=EU=] cancels, the [=Participant=] MUST direct the [=EU=] automatically to the latest sender of a SAML request, accompanying a valid SAML [=dv-artifact-response-message/StatusMessage|AuthN Response - StatusMessage=] including valid SAML status codes ([=urn:oasis:names:tc:SAML:2.0:status:Responder=] with [=urn:oasis:names:tc:SAML:2.0:status:AuthnFailed=]). A [=dv-artifact-response-message/StatusMessage|AuthN Response - StatusMessage=] element MUST be included, containing the exact phrase `Authentication cancelled`.

If [=RD=] receives a cancellation message (from an [=AD=] or [=BVD=]), it MUST be forwarded to the [=DV=] or [=LC=].

If a [=DV=] or [=LC=] receives a cancellation message (from [=RD=]), it MUST indicate to the [=EU=] that he is not logged in, and MAY offer the [=EU=] the option to re-authenticate.

### Attributes not supported

A [=Participant=] can receive a message that matches the Interface specifications but cannot be processed by the recipient.

A [=Participant=] receiving such a message:

- MUST show the [=EU=] a message indicating that something went wrong (without revealing security sensitive details).
- MAY offer the [=EU=] the option to cancel, in that case the flow continues as stated in Cancelling.

### Incorrect message (recoverable)

A [=Participant=] can receive a message that matches the interface specifications but cannot be processed by the recipient. The recipient MUST direct the [=EU=] to initiator of the SAML request, accompanying a valid SAML [AuthN-response message](#dv-authn-response-message) including valid SAML status codes ([=urn:oasis:names:tc:SAML:2.0:status:Responder=] with [=urn:oasis:names:tc:SAML:2.0:status:RequestUnsupported=]). A [=dv-artifact-response-message/StatusMessage|AuthN Response - StatusMessage=] element MUST be included, containing a description of the problem (for example "Level of assurance not supported").

A [=Participant=] receiving such a response:

1. MUST show the [=EU=] a [AuthN-response message](#dv-authn-response-message) indicating authentication has failed, including the contents of [=dv-artifact-response-message/StatusMessage|AuthN Response - StatusMessage=]. 

2. If the [=Participant=] is a [=RD=] then the [=RD=] MUST ask the [=EU=] to re-select an [=AD=] or [=BVD=] or cancel. Except in case of [Use Case AD-preselection](#uc-preselection), then the [=RD=] MUST forward the [AuthN-response message](#dv-authn-response-message) to the [=DV=] or [=LC=].


### Incorrect message (non-recoverable)

A [=Participant=] can receive an invalid formatted message. Examples:

- Not a valid SAML message
- XML does not match XSD

Alternatively, the message can be valid according to SAML specifications, but it does not match the Interface specifications. Examples:

- Unknown issuer
- Invalid NotOnOrAfter in [=dv-authn-response-assertion/NotOnOrAfter|Authn Response Assertion=] or [=dv-subjectconfirmation/NotOnOrAfter|Authn Response Subject Confirmation=]
- Invalid signature
- The [AuthN-request message](#dv-authn-request-message) contains invalid attributes
- The [AuthN-response message](#dv-authn-response-message) contains attributes or a [=LoA=] that does not match the [AuthN-request](#dv-authnrequest)

Such messages are the result of either an incorrect implementation by a [=Participant=], or an attempt to hack the system. The [=EU=] cannot always be send back to the requester, because the source of the message is unknown and/or cannot be trusted. If the message is an [AuthN-response message](#dv-authn-response-message), it would not make sense to send the [=EU=] back to the responder.

A [=Participant=] that receives a [AuthN-response message](#dv-authn-response-message) in this category

- MUST investigate the nature of the error.
- MUST show the [=EU=] a message indicating a non-recoverable error has occurred, advising the [=EU=] how to resolve the problem if possible, in case a binding is used where the [=EU=] is involved;
- MUST return a [AuthN-response message](#dv-authn-response-message) with status codes ([=urn:oasis:names:tc:SAML:2.0:status:Requester=] and [=urn:oasis:names:tc:SAML:2.0:status:RequestUnsupported=]) or an HTTP error in case a binding is used where a synchronous response is expected and can be returned, like SOAP.


## Metadata

Before a SAML connection can be established, the participants must provide each other with configuration data about the connection. This indicates which services, locations of services and certificates are used for the connection.

### TLS certificates in metadata

For TLS certificates see technical requirements on [Signature](#signature) and on [Signing, encryption algorithms and hash functions](#signing-encryption-hash)

### General processing requirements

Processing requirements for the consuming parties:

- The metadata MUST be validated by the consuming parties
- The consuming parties MUST NOT use the metadata if the validation is not successful
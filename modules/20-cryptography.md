# Module 20: Cryptography

## Exam focus
Hashing vs encryption vs encoding, symmetric/asymmetric algorithms, salts, digital signatures, certificates, PKI, TLS validation, key lifecycle and common implementation mistakes.

## Lab workflow
1. Identify the requested operation: integrity check, confidentiality, identity validation or encoding.
2. Compute a hash of a supplied test file and compare with the trusted reference.
3. Inspect certificate subject/SAN, issuer, validity dates and chain using the provided viewer or OpenSSL.
4. Record results; never paste private keys, passwords or real tokens into notes.
5. Recommend modern vetted libraries, proper key storage, rotation and TLS hostname validation.

## Must remember
- **Hashing:** one-way digest used for integrity; password storage requires a dedicated password-hashing scheme with salt and work factor.
- **Encryption:** reversible with the correct key; protects confidentiality.
- **Encoding:** representation change (e.g., Base64), not security.
- **Digital signature:** provides integrity and origin authentication when keys and validation are trustworthy; does not provide confidentiality alone.
- **Certificate validation:** check hostname/SAN, expiry, trust chain and revocation policy where applicable.

## Self-check
1. Is Base64 encryption?
2. Why salt password hashes?
3. What does a certificate SAN identify?
4. What is the difference between a hash and a signature?
5. Why must private keys remain secret?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)
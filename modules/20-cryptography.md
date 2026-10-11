# Module 20: Cryptography

## Practical focus
Hashing vs encryption vs encoding, symmetric/asymmetric algorithms, salts, digital signatures, certificates, PKI, TLS validation, key lifecycle and implementation pitfalls.

## Lab workflow
1. Determine whether the objective asks about integrity, confidentiality, identity or encoding.
2. Compute the hash of a supplied test file and compare it to a trusted reference.
3. Inspect certificate subject/SAN, issuer, validity dates and chain using the provided viewer/OpenSSL.
4. Record the result; never paste private keys, passwords or real tokens into notes.
5. Recommend vetted libraries, safe key storage, rotation and hostname validation.

## Must remember
- **Hashing:** one-way digest used for integrity. Passwords require a dedicated password-hashing scheme with a salt and work factor.
- **Encryption:** reversible with the correct key; protects confidentiality.
- **Encoding:** representation change (e.g. Base64), not a security control.
- **Digital signature:** supports integrity and origin authentication when keys/validation are trustworthy; it does not provide confidentiality alone.
- **Certificate validation:** check hostname/SAN, expiry, chain and relevant trust policy.

## Self-check
1. Is Base64 encryption?
2. Why salt password hashes?
3. What does a certificate SAN identify?
4. Difference between hash and signature?
5. Why must private keys stay private?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)
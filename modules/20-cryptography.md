# Module 20 — Cryptography

## Exam objective
Choose the right cryptographic primitive, inspect certificate/TLS properties, verify file integrity and avoid confusing hashing, encryption and encoding.

## 1. Concepts to memorize
- **Hash:** one-way digest for integrity; it does not hide input.
- **Password hash:** purpose-built slow scheme with a unique salt and suitable work factor.
- **Symmetric encryption:** one shared secret key encrypts/decrypts.
- **Asymmetric crypto:** public/private key pair; used in key establishment and signatures.
- **Digital signature:** supports integrity/origin authentication when keys and validation are trustworthy; it does not itself provide confidentiality.
- **Encoding (Base64):** representation change, not security.
- **Salt:** unique random value stored with a password hash; prevents easy precomputation/reuse across accounts.
- **Certificate/PKI:** binds identity to a public key through a CA trust chain under validation rules.

## 2. Hash a course file and compare
```bash
sha256sum <LAB_FILE>
openssl dgst -sha256 <LAB_FILE>
```
Windows:
```powershell
Get-FileHash .\sample.bin -Algorithm SHA256
```
Compare to a trusted reference. A match proves the file bytes match that reference, not that the file is safe.

## 3. Inspect certificate metadata
```bash
openssl x509 -in <LAB_CERT.pem> -noout -subject -issuer -dates
openssl x509 -in <LAB_CERT.pem> -noout -ext subjectAltName
openssl x509 -in <LAB_CERT.pem> -noout -text
```
Check hostname/SAN, issuer, validity dates, signature algorithm and key type. PEM vs DER format matters.

## 4. Inspect a lab TLS endpoint
```bash
openssl s_client -connect <LAB_DOMAIN>:443 -servername <LAB_DOMAIN> -showcerts
testssl.sh --fast <LAB_DOMAIN>
```
SNI matters when several virtual hosts share an IP. The show-certs option displays certificates provided by the server but doesn't alone validate chain trust. Verify system time, hostname, chain and client trust.

## 5. Encoding demonstration
```bash
printf 'CEH-LAB' | base64
printf 'Q0VILUxBQg==' | base64 -d
```
Never store real secrets in public Base64 output. Encoding is reversible and is not encryption.

## 6. Key-management checklist
- Generate keys with well-reviewed libraries and appropriate parameters.
- Store private keys in access-controlled stores/HSMs where appropriate.
- Never commit keys to source control, logs, screenshots or issue trackers.
- Rotate/revoke exposed keys and review access.
- Use vetted protocol/library defaults; don't implement custom crypto.

## 7. Common errors
- Certificate expired/not-yet-valid: verify date and system clock.
- Hostname mismatch: use expected DNS name and SNI, not just IP.
- Untrusted chain: inspect intermediate certificates and trust store.
- Hash mismatch: confirm exact file and algorithm.
- "Encrypted" Base64 string: it was only encoded.
- Deprecated hash algorithm: understand exam terminology but use modern primitives in real designs.

## Lab drill
Calculate a SHA-256, inspect a supplied certificate subject/issuer/dates/SAN and classify four operations as hashing, encryption, encoding or signing.

**Related:** [OpenSSL tools](../tools/crypto-openssl.md) · [VeraCrypt](../tools/extra-practical-tools.md) · [Mobile](17-hacking-mobile-platforms.md) · [Cloud](19-cloud-computing.md)
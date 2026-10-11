# OpenSSL, Hashes and Cryptography — Practical Commands

Use non-sensitive course files/certificates. Never include private keys, passwords, API tokens or real customer data in screenshots or repository commits.

## 1. Version and help
```bash
openssl version -a
openssl help
openssl list -digest-algorithms
openssl list -cipher-algorithms
``

## 2. File integrity hashes
```bash
sha256sum <LAB_FILE>
sha1sum <LAB_FILE>
md5sum <LAB_FILE>
openssl dgst -sha256 <LAB_FILE>
``
Compare the result with a trusted reference. MD5/SHA-1 may appear in older exam material, but are not recommended for modern integrity/security-sensitive designs. A matching hash establishes byte-level equality with that reference, not that the file is safe.

## 3. Inspect a PEM certificate
```bash
openssl x509 -in <LAB_CERT.pem> -noout -subject -issuer -dates
openssl x509 -in <LAB_CERT.pem> -noout -text
openssl x509 -in <LAB_CERT.pem> -noout -ext subjectAltName
``
Check Subject Alternative Name (SAN), issuer, validity period, signature algorithm and intended hostname. Older certificates may rely on legacy fields, but hostname validation remains essential.

## 4. Inspect a live lab TLS endpoint
```bash
openssl s_client -connect <LAB_DOMAIN>:443 -servername <LAB_DOMAIN>
openssl s_client -connect <LAB_DOMAIN>:443 -servername <LAB_DOMAIN> -showcerts
``
- `-connect`: host:port.
- `-servername`: SNI hostname; important when several sites share an IP.
- `-showcerts`: display certificates sent by server; it does not alone prove the chain is trusted.
Exit the interactive session with Ctrl+C. Compare hostname, dates, chain and protocol/cipher information to the task requirements.

## 5. CSR and key inspection (course-generated test keys only)
```bash
openssl req -in <LAB_REQUEST.csr> -noout -text
openssl pkey -in <LAB_PRIVATE_KEY.pem> -noout -text
``
The second command can expose key material in the terminal; never run it on real or shared production keys, and never paste output into notes. For normal inspection use metadata-only tools and keep private keys secure.

## 6. Encode/decode demonstration
```bash
printf 'CEH-LAB' | base64
printf 'Q0VILUxBQg==' | base64 -d
``
Base64 is encoding, not encryption. Do not use it to protect secrets.

## 7. Concepts for practical questions
- Hash: one-way digest; used for integrity checks.
- Encryption: reversible with the correct key; protects confidentiality.
- Encoding: changes representation, not secrecy.
- Digital signature: integrity/origin authentication given trustworthy keys and verification; not confidentiality.
- Symmetric crypto: same shared secret for encryption/decryption.
- Asymmetric crypto: public/private key pair.
- Password storage: use purpose-built password hashing with salt/work factor, not fast general-purpose hashes alone.

## 8. Troubleshooting
- Certificate parse failure: wrong format (PEM vs DER), truncated file or wrong file.
- Hostname mismatch: use the domain/SNI expected by the lab, not just an IP address.
- Expired/not-yet-valid: verify system clock and certificate dates.
- Hash mismatch: confirm the exact file and trusted source; line endings/metadata may matter for text/file transformations.
- Untrusted chain: inspect intermediates and trust store; `-showcerts` alone does not make it trusted.

References: [OpenSSL docs](https://docs.openssl.org/) · [OWASP TLS Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html)

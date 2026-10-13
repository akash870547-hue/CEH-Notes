# Module 09 — Social Engineering

## Exam objective
Recognize pretexting, phishing, spear phishing, smishing, vishing, baiting and tailgating; inspect message evidence and demonstrate prevention using consent-based simulations only.

## 1. Message triage checklist
For a supplied sample, inspect:
1. **Sender identity:** display name vs actual address and domain.
2. **Reply-To / Return-Path:** unexpected mismatch is a clue, not proof.
3. **Authentication:** SPF, DKIM and DMARC results in the received headers.
4. **Urgency / authority:** pressure, secrecy, gift cards, password reset threats or payment changes.
5. **Link destination:** visible text vs actual hostname; look for lookalike domains and redirects.
6. **Attachment:** unexpected type, executable/macro content, archive or password-protected file.
7. **Context:** does the request match a known workflow? Verify using a separate trusted channel.

Never click active suspicious links or open unknown attachments on your normal device.

## 2. Inspect raw email headers
Use the mail client's **Show original / View source** in a safe training mailbox. Preserve relevant headers including `From`, `Reply-To`, `Return-Path`, `Received`, `Authentication-Results`, `Message-ID` and timestamps. Redact personal addresses and tokens before sharing.

For a downloaded plain-text header file:
```bash
grep -iE '^(from|reply-to|return-path|received|authentication-results|message-id):' <LAB_HEADER_FILE>
```
PowerShell:
```powershell
Select-String -Path .\headers.txt -Pattern '^(From|Reply-To|Return-Path|Received|Authentication-Results|Message-ID):'
```
Headers can be forged or reflect forwarding; use the trusted receiving system's Authentication-Results and message path, not one field alone.

## 3. URL inspection
Copy the URL as text into the approved analysis tool or inspect the link target without visiting it. Break it into scheme, hostname, port, path and query. The registrable domain is usually more useful than a familiar-looking subdomain. Reputation tools can have false positives/negatives and may share submitted URLs with third parties.

## 4. Consent-based simulation workflow
- Obtain written authorization and define participant cohort, allowed data, dates, training follow-up and stop conditions.
- Use benign training links and non-sensitive test accounts.
- Never collect real passwords or MFA codes.
- Store results minimally and report aggregate outcomes.
- Provide a clear reporting path and repeat training without shaming individuals.

## 5. Red flags and false assumptions
- HTTPS padlock means encrypted transport to that site; it does **not** prove the site is trustworthy.
- SPF pass validates sending authorization for a domain under its policy, not message intent.
- DKIM validates a signature for signed content/domain context, not that the sender's request is safe.
- DMARC aligns domain policies with SPF/DKIM; a pass is not a guarantee of benign content.
- Spelling errors may be a clue but polished messages can still be malicious.

## 6. Defensive response
Report via the approved channel, preserve message headers, avoid interacting, and notify security staff. For suspected credential exposure, follow identity team's password/session reset and MFA procedures; do not forward the message broadly.

## Lab drill
Classify a supplied mock email as suspicious/not enough evidence/likely legitimate. Cite at least three observable indicators, one limitation and one independent verification step.

**Related:** [SET awareness simulation](../tools/social-engineering-tools.md) · [Exam workflow](../EXAM-WORKFLOW.md) · [Log analysis](../tools/log-analysis.md)
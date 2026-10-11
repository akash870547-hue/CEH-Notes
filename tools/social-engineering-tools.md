# Social Engineering Toolkit (SET) and Awareness Simulation

SET is a dual-use framework. This guide covers recognizing the tool and conducting a benign, consent-based awareness exercise; it does not provide credential-harvesting, fake-login, malware-delivery or covert phishing deployment instructions.

## 1. Check tool availability
```bash
setoolkit --help
setoolkit
```
The interactive menu differs by release. Read the lab's stated task and confirm written authorization/scope before selecting any feature.

## 2. Safe awareness simulation design
- Use a controlled training domain and test mailbox/account.
- Use an approved benign landing page that records only whether the page was opened.
- Do not collect real passwords, MFA codes, session cookies or personal data.
- Define participant cohort, time window, rate limits, data retention and stop criteria.
- Coordinate with mail/security operations so the simulation isn't confused with an uncontrolled incident.
- Use aggregated outcomes and provide educational feedback.

## 3. Phishing sample triage instead of sending messages
For a provided sample email, inspect From/Reply-To/Return-Path, trusted receiving system's Authentication-Results (SPF/DKIM/DMARC), links, attachment metadata and message route. Never click unknown links or open attachments on a personal workstation.

## 4. How to report a simulation
Record authorization, test group, approved template, aggregate messages/page visits, test time, limitations and training recommendations. Never store real credential values. Keep data private and delete it only according to the approved retention plan.

## 5. Common traps
- A polished message or HTTPS lock icon does not prove legitimacy.
- SPF/DKIM/DMARC help authenticate domain context but don't prove the message's intent is benign.
- A click is not proof that a user entered credentials.
- Public phishing infrastructure or copied real-brand login pages are not needed for a safe awareness lab.

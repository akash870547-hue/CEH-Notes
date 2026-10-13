# Reconnaissance & OSINT — theHarvester, ExifTool and Public-Source Validation

This guide covers public-source collection for an owned or explicitly authorized domain/organization. "Passive" means you aren't directly probing each target host; selected data providers still receive the search term and may log it.

## 1. Validate the domain and tool
```bash
theHarvester -h
theHarvester --help
exiftool -ver
```
Options and source names change across versions; inspect installed help first.

## 2. Run a small passive provider set
```bash
theHarvester -d <LAB_DOMAIN> -b crtsh,certspotter
```
Selected sources depend on the installed release and provider availability. Start with only what answers the task; don't use "all" by default. Some sources need API credentials or have quotas.

## 3. Save a report for review
```bash
theHarvester -d <LAB_DOMAIN> -b crtsh,certspotter -f recon-report
```
Review generated report files and source outcome/errors. Zero results may mean no findings from those providers, not necessarily a failed run. Protect reports; they may contain employee addresses, internal hostnames or sensitive organizational context.

## 4. DNS resolution is a separate activity
Some versions support a DNS resolution option such as -r; verify syntax using installed help. DNS resolution sends queries to resolvers and creates additional traffic. Use it only for authorized domains, with sensible limits. Don't run DNS brute force, takeover checks or direct virtual-host tests unless the engagement explicitly includes those activities.

## 5. ExifTool: file metadata
```bash
exiftool <LAB_FILE>
exiftool -FileName -FileType -FileSize -CreateDate -ModifyDate <LAB_FILE>
exiftool -a -G1 -s <LAB_IMAGE>
```
Metadata can reveal software versions, usernames, file paths, GPS coordinates, timestamps or author names. Metadata can be edited and timestamps can be misleading; corroborate important conclusions.

## 6. Evidence and validation
Record source/provider, query, retrieval time, exact finding and confidence. Cross-check a hostname via DNS or approved inventory before asserting it belongs to a specific system. Keep collection minimal and relevant.

## 7. Common mistakes
- Treating passive-source output as ground truth or proof of ownership.
- Sending a client domain to many third-party providers without considering terms/privacy.
- Assuming a discovered email is valid or that a hostname is reachable.
- Confusing CreateDate embedded in a file with a trusted system timestamp.
- Committing reports/API configuration with keys or personal data to GitHub.

References: [theHarvester docs](https://github.com/laramies/theHarvester) · [ExifTool docs](https://exiftool.org/)

## 8. SearchSploit? Keep exploit lookup separate
Exploit-reference searches belong in the [SearchSploit guide](searchsploit.md). Do not confuse OSINT discovery with vulnerability validation.

## 9. Shodan CLI — search existing public index data
```bash
shodan --help
shodan info
shodan search 'hostname:<LAB_DOMAIN>'
```
Use only domains/assets you are authorized to research and follow provider terms. A Shodan record can be stale; it may show historical data and doesn't prove the host is currently exposed. Never copy an API key into a command, note, screenshot or GitHub file.

## 10. Recon-ng — passive workspace workflow
```text
recon-ng
workspaces create ceh-lab
marketplace search domains
modules search recon/domains-hosts
```
Recon-ng modules and names change across versions and sources may require API keys. Inspect a module's documentation/options before loading or running it. Prefer passive sources and only query the exact approved domain. Store workspaces and exports privately because results may include sensitive organizational information.

## 11. Maltego — graph-based relationship analysis (GUI)
Use the installed lab version to create a new graph, add the authorized seed entity (domain/IP/email supplied by the instructor), and run only transforms allowed by the lab. Review each transform's provider, source and timestamp; some transforms send data to third-party services. A graph edge represents a relationship reported by a source, not necessarily verified ownership.

## 12. FOCA and Metagoofil — document metadata (if installed)
FOCA is typically a Windows GUI workflow; use the lab's own build to search a specified domain for public documents and inspect metadata. Don't crawl broad unrelated domains or publish the resulting document inventory.

Metagoofil CLI options differ by version. Check help first:
```bash
metagoofil --help
```
For a lab exercise, constrain document types/count and output directory according to the installed help; do not use unlimited downloads. Public documents can reveal usernames, local paths, software versions and internal naming. Use synthetic/approved lab domains and keep downloaded files private.

## 13. Search-engine operators (passive research)
Examples to recognize in a course exercise:
```text
site:<LAB_DOMAIN>
site:<LAB_DOMAIN> filetype:pdf
site:<LAB_DOMAIN> intitle:index.of
```
Use only the authorized domain. Search results can be stale, and index presence doesn't mean the file is still reachable. Never attempt to access private systems or use exposed data outside the scope.

## 14. Choosing the right recon tool
- **WHOIS/RDAP:** registration and delegation metadata.
- **dig/host/nslookup:** resolver-visible DNS records.
- **theHarvester:** aggregate configured public-source findings.
- **ExifTool/FOCA/Metagoofil:** metadata from approved documents.
- **Shodan:** indexed public service observations (possibly historical).
- **Maltego:** visualize relationships between entities from data providers.
- **Recon-ng:** modular OSINT workflow/workspace.
- **Search engines:** public indexed resources, not an authorization bypass.

For every result, record source, timestamp, confidence, privacy impact and one independent validation step.

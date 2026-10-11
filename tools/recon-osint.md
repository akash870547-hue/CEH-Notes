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

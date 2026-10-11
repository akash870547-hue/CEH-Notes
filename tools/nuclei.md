# Nuclei — Template-Based Vulnerability Checks

Nuclei runs community or private templates against selected targets. Templates vary in behavior; some send active probes and some can be intrusive. Use a small target scope and only templates/profile approved by the lab.

## 1. Verify installed version and help
```bash
nuclei -version
nuclei -h
nuclei -tl
```
Template list/selection flags may differ by release. Review template metadata and authors before execution, especially for custom or downloaded templates.

## 2. Start with a lab URL and conservative rate
```bash
nuclei -u <LAB_URL> -severity info,low,medium -rl 5 -c 2 -o nuclei-report.txt
```
- **-u:** one URL.
- **-severity:** filter by template severity metadata.
- **-rl:** cap request rate.
- **-c:** concurrency.
- **-o:** save results.
Check exact options in installed help. Template behavior matters more than the label; don't assume a "low" severity is harmless in every environment.

## 3. Targeted template selection
If the exercise names a specific template or lab-provided directory, review its ID, request logic and tags before selecting it. Use only the lab-approved template path and target scope. Avoid broad all-template scans when a narrow objective is enough.

## 4. Interpretation
For each result, retain template ID/name, target/URL, matched evidence, timestamp and tool/template version. Validate with an independent, low-impact check. A match can be affected by generic responses, default pages, caching or template assumptions.

## 5. Common errors
- No findings: may mean absence, scope mismatch, connectivity issue, blocked request or unsupported template.
- Template update/network failure: use the range's prescribed installed templates; don't download unknown bundles during an exam.
- Too much traffic: stop and reduce rate/scope.
- Duplicate alerts: consolidate by root cause and affected asset.
- Vulnerability label alone: verify actual evidence and applicability.

References: [Project documentation](https://docs.projectdiscovery.io/tools/nuclei/overview) · [Templates documentation](https://docs.projectdiscovery.io/templates/introduction)

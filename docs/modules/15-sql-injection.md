# Module 15 — SQL Injection (SQLi)

## Exam objective
Recognize how untrusted input can alter query structure; distinguish common SQLi families; safely validate behavior in a deliberately vulnerable lab; and recommend parameterized queries and least-privilege database access.

## 1. Query logic essentials
Applications often construct a SQL statement from fixed query text plus user-supplied values. If values are concatenated into query syntax, input may be interpreted as SQL rather than data. **Prepared/parameterized statements** keep the SQL structure separate from user values.

## 2. SQLi types to recognize
- **Error-based:** errors leak database/query information.
- **UNION-based:** a query result set is combined with another; column count/types and query context matter.
- **Boolean/blind:** infer behavior by comparing true/false outcomes when direct data is not displayed.
- **Time-based/blind:** infer behavior from timing; jitter, load and caching can create false signals.
- **Out-of-band:** observation through a separate permitted channel; environment/network constraints apply.
- **Second-order:** stored input changes behavior later when used in another query.

## 3. Controlled validation workflow
1. Confirm the exact training URL, test account and allowed parameter in the task.
2. Capture a normal request/response baseline with DevTools or Burp/ZAP.
3. Test one low-impact input category at a time following the course lab's payload/validation instructions.
4. Compare status, body structure, errors and timing against baseline. Avoid destructive SQL or real data extraction.
5. If automation is explicitly part of the exercise, use a low-risk profile and a single lab parameter. See [sqlmap guide](../tools/sqlmap.md).
6. Save a sanitized request/response and classify confidence as confirmed, likely or unverified.

## 4. What counts as evidence?
A database-specific error, repeatable boolean response difference or consistent controlled timing difference may support an SQLi hypothesis. Rule out generic application errors, input validation messages, WAF blocks, cached responses and network jitter. A scanner result alone is insufficient.

## 5. Defensive fix
Use prepared statements with placeholders. Example concept (language pseudocode):
```text
query = "SELECT name FROM products WHERE id = ?"
execute(query, [validated_product_id])
```
Also use allow-lists for dynamic identifiers that cannot be parameterized (such as sort-column names), least-privilege database roles, generic client errors, safe server logs and regression tests. Escaping alone is not a universal substitute for parameterization.

## 6. Common mistakes
- Treating any 500 response as SQLi evidence.
- Changing many parameters at once.
- Confusing SQLi with cross-site scripting or authentication flaws.
- Dumping data instead of demonstrating impact minimally.
- Running high-risk scanner options without lab authorization.
- Claiming a database engine/version from a weak error clue without corroboration.

## 7. Finding note template
```text
Lab URL / parameter:
User role:
Baseline request and response:
Input change:
Observed difference:
Repeatability:
Database-specific clue:
Alternative explanations ruled out:
Impact within lab:
Recommended fix:
Retest:
```

## Lab drill
Use the lab guide's provided input tests on one parameter. Compare baseline with one test at a time and explain why the evidence supports—or does not support—the SQLi conclusion.

**Related:** [sqlmap beginner-to-advanced guide](../tools/sqlmap.md) · [Web app testing](14-hacking-web-applications.md) · [Burp/ZAP](../tools/burp-zap.md)
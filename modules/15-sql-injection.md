# Module 15: SQL Injection

## Practical focus
SQL injection happens when untrusted input changes the structure of a database query. Know error-based, UNION-based, boolean/blind and time-based concepts, and especially how prepared/parameterized statements prevent query-structure changes.

## Authorized lab workflow
1. Verify the exact training app and URL in the lab guide.
2. Capture one normal baseline request/response with browser DevTools or Burp/ZAP.
3. Change one harmless input at a time and compare status, response shape and error behavior.
4. Use only the lab guide's approved verification method. Avoid destructive statements and real data extraction.
5. Save the smallest request/response pair that supports the conclusion.
6. Recommend prepared statements, least-privilege DB accounts and safe error handling.

## Types to recognize
- **Error-based:** database error behavior leaks query details.
- **UNION-based:** combines query result sets; applicability depends on query structure and column compatibility.
- **Boolean/blind:** infer behavior from true/false response differences.
- **Time-based:** infer behavior from response timing; network jitter can mislead.
- **Scanner output is a lead, not proof**; validate within scope.

## Evidence
Lab URL, request method, parameter tested, baseline response, changed response, reproducibility, impact and suggested fix.

## Self-check
1. Why are prepared statements the primary defense?
2. Why is a database error alone not always proof?
3. Why should a DB account use least privilege?
4. How can an observation be demonstrated without extracting real data?
5. What belongs in a useful evidence note?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)
# Module 15: SQL Injection

## Exam focus
SQL injection occurs when untrusted input changes a database query's structure. Know error-based, UNION-based, boolean/blind and time-based concepts, as well as parameterized queries, least-privilege DB accounts and safe error handling.

## Practical workflow
1. Use only the designated vulnerable training application and URL.
2. Capture a baseline request/response using browser DevTools or Burp/ZAP.
3. Change one harmless test input at a time and compare status, response shape and error behavior.
4. Use only the lab guide's approved validation method; avoid destructive queries and real data extraction.
5. Save a minimal request/response pair and state what it proves and what it does not.
6. Recommend prepared statements, input validation, least privilege and safe error handling.

## Key distinctions
- **Error-based:** database error behavior exposes information.
- **UNION-based:** query results are combined; applicability depends on query structure and column types.
- **Boolean/blind:** infer behavior from different true/false responses.
- **Time-based:** infer behavior from response timing; network jitter can mislead.
- Scanner output is a lead, not proof on its own.

## Evidence
Record lab URL, request method, parameter tested, baseline response, changed response, reproducibility, impact and proposed fix.

## Self-check
1. Why are prepared statements the primary defense?
2. Why is a database error not always sufficient proof?
3. What is the difference between authentication and SQL injection?
4. Why should the database account use least privilege?
5. Which evidence can safely demonstrate the issue in a training app?

[Tool cheat sheet](../TOOLS-CHEATSHEET.md) · [Exam workflow](../EXAM-WORKFLOW.md)
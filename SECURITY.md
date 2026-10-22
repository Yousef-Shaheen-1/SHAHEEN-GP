# Security Policy — SHAHEEN GROUP

## 1. Supported Versions

Security updates and critical patches are actively applied to the following release tracks:

| Version | Supported | Notes |
| :--- | :--- | :--- |
| `2.x.x` | Yes | Current sovereign flagship architecture |
| `1.x.x` | Critical Only | Security backports for legacy endpoints |
| `< 1.0` | No | Experimental milestones |

## 2. Reporting a Vulnerability

If you discover a security vulnerability or sensitive information exposure within the SHAHEEN GROUP codebase or hosted infrastructure:

1. **Do not create a public GitHub issue.** Public disclosures before mitigation can put systems at risk.
2. Send an encrypted email with detailed reproduction steps, technical impact, and relevant code traces to:
   - **Primary Security Desk**: `shaheen.group000@gmail.com`
   - **Mastermind Security Office**: `yousef@shaheen-group.com`
3. Include:
   - Description of the vulnerability.
   - Affected component or API endpoint (e.g., `/api/contact`, `/api/ai/generate`).
   - Proof of Concept (PoC) or cURL command.
   - Suggested remediation if available.

## 3. Vulnerability Response Timeline

- **Initial Acknowledgment**: Within 24 hours of receipt.
- **Triage & Assessment**: Within 48 hours.
- **Remediation & Patch Deployment**: Within 5 business days for critical vulnerabilities.

## 4. Secret & Credential Handling Standards

- **Zero Hardcoded Secrets**: Production secrets (`GEMINI_API_KEY`, `ADMIN_SECRET`, database passwords) must never be committed to git or exposed in client bundles.
- **Client/Server Separation**: Public SPAs (including static GitHub Pages builds) are strictly treated as untrusted clients. Server authorization and private operations must pass through authenticated backend proxy routes.

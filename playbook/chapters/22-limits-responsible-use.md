# 22. Limits, Data Protection, and Responsible Use

The board supports your judgment; it does not replace it. This chapter covers limits, data protection, verification, disclosure, and red lines.

## What prompts alone can and cannot do

A persona prompt, in one conversation or a custom assistant, can simulate all four operating modes: solo advisor, cross-functional, board challenge, and end-to-end engagement. What prompts alone cannot provide is work that happens outside the conversation.

| Capability | Prompts alone | Needs orchestration or connected tools |
|---|---|---|
| One or several advisors, board challenge, Board Chair synthesis | Yes, simulated in sequence | No |
| Autonomous delegation; parallel execution | No | Yes |
| Persistent shared artifacts; automated handoffs | No; you carry and make them | Yes |
| Scheduled monitoring, such as weekly adoption checks | No | Yes |

In practice:

- **You are the orchestration layer.** You carry the Context Brief between conversations, pass outputs between advisors, and decide when to rerun analysis.
- **The board watches nothing** unless you tell it what changed.
- **Simulated debate is still one model.** Treat it as structured perspective-taking, not independent expert review; real challenge from colleagues still matters.
- **Orchestration is a later decision**, introduced only if value justifies it (roadmap phase 5, Chapter 23).

## Protecting client data

Treat everything you put into the board as leaving your direct control.

### Rules

1. **Follow client and firm policy first.** Where they are stricter than this chapter, they win. [Insert firm AI-use policy reference.]
2. **Use only approved tools.** [Insert approved tool list.]
3. **Minimize.** Share only what the task needs: roles and process changes, not names and employee IDs.
4. **Anonymize.** Replace names and identifying details with roles or placeholders, such as "[Client]" or "[BU A]".
5. **Never share personal data** such as performance, health, compensation, or disciplinary information. Describe roles and observed positions, not judgments about named people.
6. **Check privacy and data-residency requirements**, especially on multi-country programs; ask your privacy or risk contact if unsure.
7. **Keep client information out of generic assets** such as templates, personas, and exemplars.
8. **Clean up** client material from conversations, assistants, and files at engagement end, per policy.

> **Example:** Instead of pasting an interview transcript, write: "Illustrative: Senior leader, [BU B], supportive of the goal but worried the timeline conflicts with year-end close." The advisor gets what it needs; the client's people stay protected.

### Pre-share checklist

- [ ] The tool is approved for this client's data.
- [ ] Names of the client, people, and locations are replaced with roles or placeholders.
- [ ] No personal data; only what this task needs.
- [ ] Privacy and data-residency requirements checked; client-confidential material excluded or cleared.

As a second check on text you have already anonymized, not your only control:

```text
Before I use the text below, list anything that could identify the
client, a person, or a location, and any detail the Change Impact, Risk &
Mitigation Architect would not need. Do not analyze the content yet.
```

## Verification practices

Board outputs are drafts until you verify them:

- **Trace every fact and number to a source**, or label it as a placeholder or illustrative.
- **Test assumptions with real people**: persona traits, stakeholder positions, impact ratings.
- **Check consistency against the Context Brief** for timeline, waves, scope, and audiences.
- **Remove invented commitments** and confirm any methods, standards, or regulations cited from authoritative sources.
- **Apply your own judgment.** If you would not defend the advice to the sponsor without mentioning the board, it is not ready.

### Warning signs of fabrication

Precise percentages or scores you did not supply; named frameworks, studies, or benchmarks presented as authoritative; quotes attributed to people; confident claims about a country, unit, or system you have not described; every assumption resolved in the recommendation's favor. When you see one, ask: "Which statements are based on information I provided, and which are assumptions or general knowledge?" Then fix the gap in the Context Brief.

## Disclosure to clients

Decide how you will describe your use of the board before the engagement starts. [Insert firm policy on disclosing AI assistance to clients.] Until policy is in place: be honest if asked, describing it as an AI-assisted advisory tool for analysis and drafting; make clear you validate every output and own the advice; confirm client data is handled per client and firm requirements; and follow any contract terms on AI use.

## Red lines

Regardless of time pressure, never:

- Send board output to a client without your own review and validation.
- Present an assumption, illustrative persona, or placeholder as fact.
- Share client data in an unapproved tool or beyond policy.
- Use the board to profile or judge named individuals.
- Let the board make, or appear to make, decisions that belong to you, the sponsor, or the client.
- Cite the board as the authority for advice, or use it to replace required legal, HR, works-council, or security review.

> **Watch out:** The most common breach is pasting a "quick" email thread or spreadsheet under deadline pressure. Make anonymization routine so the safe path is also the fast one.

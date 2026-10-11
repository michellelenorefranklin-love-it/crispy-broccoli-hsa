# The Agentic Board of Change Advisors — Operating Playbook

A playbook of about 100 pages that turns the executive deck *The Agentic Board of Organizational Change Advisors* into an operating manual. It covers how an OCM lead works with ten AI advisor personas and a Board Chair, with the human in the loop at every decision.

- **Read it:** [`playbook/Agentic-Board-OCM-Playbook.pdf`](playbook/Agentic-Board-OCM-Playbook.pdf)
- **Edit it:** one Markdown file per chapter in [`playbook/chapters/`](playbook/chapters/)
- **Source and plan:** [`SOURCE-BRIEF.md`](playbook/SOURCE-BRIEF.md) (what the deck says), [`OUTLINE.md`](playbook/OUTLINE.md) (chapter plan), [`STYLE.md`](playbook/STYLE.md) (writing rules)

## Contents

| Part | Chapters |
|---|---|
| Front matter | How to use this playbook |
| I. Foundations | 1 Why an agentic board · 2 Human-in-the-loop operating model · 3 Board architecture · 4 Anatomy of an advisor |
| II. Operating the board | 5 Guardrails (Context Brief, Charter, response format) · 6 Five-step workflow · 7 Four operating modes · 8 Board Chair playbook |
| III. Advisor playbooks | 9–18 One chapter per advisor, all with the same structure |
| IV. Applying the board | 19 First 30 days of a global ERP program · 20 Lifecycle plays |
| V. Quality and responsible use | 21 Testing and quality assurance · 22 Limits, data protection, responsible use |
| VI. Implementation | 23 Roadmap and pilot plan |
| Appendices | A Persona configuration prompts · B Prompt library · C Deliverables index and RACI · D Glossary |

## Rebuild the PDF

The build needs `pandoc`, `pdftotext`/`pdfseparate`/`pdfunite` (poppler), and Node with `playwright` and Chromium.

```sh
python3 playbook/build/build.py
```

The build script turns the chapters into styled HTML, renders it with Chromium, and makes a second pass to fill in the contents page numbers.

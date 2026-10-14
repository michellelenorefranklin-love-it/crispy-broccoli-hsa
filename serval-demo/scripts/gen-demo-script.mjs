// Generates DEMO_SCRIPT.md from src/demo/speakerScript.ts so the printed script,
// the in-app presenter notes, and the Markdown never drift apart.
// Run: npm run docs:script   (Node 22.6+; uses built-in TypeScript type stripping)
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const S = await import(join(root, 'src/demo/speakerScript.ts'))
const mmss = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

const L = []
const p = (s = '') => L.push(s)

p('# Speaker script — Future of Work | AI Employee Experience')
p()
p('<!-- Generated from src/demo/speakerScript.ts by `npm run docs:script`. Edit that file, not this one. -->')
p()
p(`Seven acts, ${S.steps.length} steps, about ${Math.round(S.totalSeconds / 60)} minutes plus discussion. The same script appears inside the demo: press **P** during the guided demo, or open the printable version at \`#/speaker-script\` (link in the presenter notes and the left sidebar).`)
p()
p(`> **${S.coreMessage}**`)
p()
p('Land this sentence at the start and the end. Every act is evidence for it.')
p()
p('## Run of show')
p()
p('| Act | What the room sees | Time |')
p('|---|---|---|')
p(`| — | Opening (before you click anything) | ${mmss(S.opening.seconds)} |`)
const acts = [...new Set(S.steps.map((s) => s.act))]
for (const a of acts) {
  const st = S.steps.filter((s) => s.act === a)
  p(`| ${a} | ${st[0].actTitle} | ${mmss(st.reduce((x, s) => x + s.seconds, 0))} |`)
}
p(`| | **Total, then discussion** | **${mmss(S.totalSeconds)}** |`)
p()
p('## Before you present')
p()
for (const g of S.prepChecklist) {
  p(`**${g.when}**`)
  p()
  for (const i of g.items) p(`- [ ] ${i}`)
  p()
}
p('**Two-screen setup (recommended)**')
p()
S.twoScreenSetup.forEach((t, i) => p(`${i + 1}. ${t}`))
p()
p('## Controls')
p()
p('| Control | What it does |')
p('|---|---|')
for (const c of S.controls) p(`| ${c.key} | ${c.does} |`)
p()
p(`## Opening · ${mmss(S.opening.seconds)}`)
p()
p(`**Do:** ${S.opening.clicks.join(' ')}`)
p()
p('**Say:**')
p()
for (const t of S.opening.script) p(`> ${t}\n>`)
L.pop(); p('')
let clock = S.opening.seconds
let lastAct = 0
S.steps.forEach((s, i) => {
  if (s.act !== lastAct) { p(`## Act ${s.act} · ${s.actTitle}`); p(); lastAct = s.act }
  p(`### Step ${i + 1}. ${s.title}`)
  p()
  p(`*Screen: ${s.screen} · ~${s.seconds}s · starts at ${mmss(clock)}*`)
  clock += s.seconds
  p()
  p('**Do:**')
  p()
  s.clicks.forEach((c, j) => p(`${j + 1}. ${c}`))
  p()
  p('**Say:**')
  p()
  s.script.forEach((t, j) => { p(`> ${t}`); if (j < s.script.length - 1) p('>') })
  p()
  p(`**Point at:** ${s.pointAt.join(' · ')}`)
  p()
  if (s.transition) { p(`**Transition:** *“${s.transition}”*`); p() }
  for (const q of s.qa ?? []) { p(`**If asked — ${q.q}** ${q.a}`); p() }
})
p('## Closing')
p()
S.closing.script.forEach((t, j) => { p(`> ${t}`); if (j < S.closing.script.length - 1) p('>') })
p()
p('## Questions you’re likely to get')
p()
for (const q of S.qaBank) { p(`**${q.q}**  `); p(q.a); p() }
p('## Shorter and longer versions')
p()
p('| Version | Length | Steps | How |')
p('|---|---|---|---|')
for (const v of S.variants) p(`| ${v.name} | ${v.minutes} | ${v.steps} | ${v.tip} |`)
p()
p('## If something goes wrong')
p()
p('| Problem | Fix |')
p('|---|---|')
for (const r of S.recovery) p(`| ${r.problem} | ${r.fix} |`)
p()
p('*All people, data, and integrations in the demo are fictional or simulated. Numbers are illustrative.*')

writeFileSync(join(root, 'DEMO_SCRIPT.md'), L.join('\n') + '\n')
console.log(`DEMO_SCRIPT.md written (${L.length} lines)`)

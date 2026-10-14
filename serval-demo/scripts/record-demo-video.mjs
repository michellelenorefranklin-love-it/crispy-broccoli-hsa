// Records a captioned walkthrough video of the guided demo.
// It drives the real built app (dist/index.html) through all 14 steps with a visible cursor,
// and shows the speaker-script lines from src/demo/speakerScript.ts as captions.
//
// Usage:  npm run build && npm run video
// Needs:  Node 22.6+, Playwright with Chromium (npm i -D playwright, or a global install), ffmpeg for the MP4.
// Output: video/serval-demo-walkthrough.mp4 (plus captions .srt)
import { createRequire } from 'node:module'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const S = await import(join(root, 'src/demo/speakerScript.ts'))
const require = createRequire(import.meta.url)
let pw
try { pw = require('playwright') } catch { pw = require(join(execSync('npm root -g').toString().trim(), 'playwright')) }

const W = 1440, H = 900
const WPS = 3.0 // caption reading speed, words per second
const outDir = join(root, 'video')
const tmpDir = join(outDir, '.tmp')
rmSync(tmpDir, { recursive: true, force: true })
mkdirSync(tmpDir, { recursive: true })
const appUrl = pathToFileURL(join(root, 'dist/index.html')).href
if (!existsSync(join(root, 'dist/index.html'))) throw new Error('Run `npm run build` first.')

const browser = await pw.chromium.launch()
const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: tmpDir, size: { width: W, height: H } } })
await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {})
const page = await ctx.newPage()

await page.addInitScript(() => {
  const css = `
    #__cur{position:fixed;left:0;top:0;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;background:rgba(20,149,138,.35);border:2px solid #0F766E;z-index:2147483647;pointer-events:none;transition:transform .6s cubic-bezier(.3,.7,.2,1);}
    #__cur.p{animation:__p .45s ease-out}
    @keyframes __p{0%{box-shadow:0 0 0 0 rgba(20,149,138,.6)}100%{box-shadow:0 0 0 18px rgba(20,149,138,0)}}
    #__cap{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);max-width:1040px;width:calc(100% - 120px);background:rgba(11,27,51,.94);color:#fff;font:500 20px/1.45 Inter,system-ui,sans-serif;padding:14px 22px;border-radius:10px;z-index:2147483646;pointer-events:none;box-shadow:0 12px 32px rgba(11,27,51,.3);opacity:0;transition:opacity .25s}
    #__cap.on{opacity:1}
    #__cap small{display:block;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#99E6D6;margin-bottom:4px}
    #__card{position:fixed;inset:0;z-index:2147483645;background:#0B1B33;color:#fff;display:none;align-items:center;justify-content:center;flex-direction:column;text-align:center;font-family:Inter,system-ui,sans-serif;padding:80px}
    #__card.on{display:flex}
    #__card h1{font-size:44px;font-weight:600;margin:0 0 14px}
    #__card p{font-size:22px;color:#cbd5e1;max-width:900px;margin:6px 0;line-height:1.45}
    #__card .q{margin-top:28px;color:#99E6D6;font-size:24px}
    #__card .w{margin-top:36px;font-size:15px;color:#FEF0C7}`
  const add = () => {
    if (document.getElementById('__cur')) return
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st)
    const c = document.createElement('div'); c.id = '__cur'; c.style.transform = 'translate(720px,450px)'; document.body.appendChild(c)
    const cap = document.createElement('div'); cap.id = '__cap'; document.body.appendChild(cap)
    const card = document.createElement('div'); card.id = '__card'; document.body.appendChild(card)
  }
  window.__cursor = (x, y) => { add(); document.getElementById('__cur').style.transform = `translate(${x}px,${y}px)` }
  window.__pulse = () => { const c = document.getElementById('__cur'); c.classList.remove('p'); void c.offsetWidth; c.classList.add('p') }
  window.__cap = (label, text) => { add(); const e = document.getElementById('__cap'); if (!text) { e.classList.remove('on'); return } e.innerHTML = (label ? `<small>${label}</small>` : '') + text; e.classList.add('on') }
  window.__card = (html) => { add(); const e = document.getElementById('__card'); if (!html) { e.classList.remove('on'); return } e.innerHTML = html; e.classList.add('on') }
  document.addEventListener('DOMContentLoaded', add)
})

const t0 = Date.now()
const srt = []
const wait = (ms) => page.waitForTimeout(ms)
const words = (t) => t.split(/\s+/).length
const ts = (ms) => { const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60, x = ms % 1000; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(x).padStart(3, '0')}` }

let label = ''
async function say(text) {
  const dur = Math.max(2800, Math.round((words(text) / WPS) * 1000) + 500)
  const start = Date.now() - t0
  await page.evaluate(([l, t]) => window.__cap(l, t), [label, text])
  await wait(dur)
  srt.push({ start, end: Date.now() - t0, text })
}
const hideCap = () => page.evaluate(() => window.__cap('', ''))

async function point(loc) {
  try {
    const el = loc.first()
    await el.evaluate((n) => n.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    await wait(700)
    const b = await el.boundingBox()
    if (b) { await page.evaluate(([x, y]) => window.__cursor(x, y), [b.x + b.width / 2, b.y + b.height / 2]); await wait(650) }
    return el
  } catch (e) { console.warn('  point failed:', e.message.split('\n')[0]); return null }
}
async function click(loc, after = 600) {
  const el = await point(loc)
  if (!el) return
  try { await page.evaluate(() => window.__pulse()); await el.click({ timeout: 3000 }); await wait(after) } catch (e) { console.warn('  click failed:', e.message.split('\n')[0]) }
}
const main = () => page.locator('main')
const bar = () => page.locator('div.fixed.bottom-0')
const barAction = () => bar().locator('button.bg-accent-600')
const next = async () => { await click(bar().getByRole('button', { name: /Next/ }), 900) }
const scrollTop = () => page.evaluate(() => document.getElementById('main')?.scrollTo({ top: 0, behavior: 'smooth' }))

const step = (id) => S.steps.find((s) => s.id === id)
const lines = (id) => step(id).script
const setLabel = (id) => { const i = S.steps.findIndex((s) => s.id === id); const s = S.steps[i]; label = `Act ${s.act} · ${s.actTitle} — step ${i + 1} of ${S.steps.length}` }

// ---------- Recording ----------
await page.goto(appUrl + '#/employee')
await wait(800)
await page.evaluate((m) => window.__card(`<h1>Future of Work | AI Employee Experience</h1><p>A guided walkthrough of a simulated Serval AI + ServiceNow employee experience, and the process, controls, change, and value behind it.</p><p class="q">“${m}”</p><p class="w">Simulated environment — all people, data, and integrations are fictional or mocked. Numbers are illustrative.</p>`), S.coreMessage)
await wait(6500)
await page.evaluate(() => window.__card(''))
label = 'Opening'
for (const t of S.opening.script) await say(t)

// 1 Current state
await click(page.getByRole('button', { name: /Start Executive Demo/ }), 1200)
setLabel('current-state')
await say(lines('current-state')[0])
await click(main().getByText('Asked to approve by email', { exact: false }))
await say(lines('current-state')[1])
await say(lines('current-state')[2])

// 2 Employee
await next(); setLabel('employee')
await say(lines('employee')[0])
await click(barAction(), 1500)
for (const t of lines('employee').slice(1, 3)) await say(t)
await point(main().getByText('Initiate workflow').last())
await say(lines('employee')[3])
await point(main().getByText('Behind the scenes').last())
await say(lines('employee')[4])

// 3 Onboarding
await next(); setLabel('onboarding')
await say(lines('onboarding')[0])
await click(main().getByText('Finance apps requested (FinReport read-only)').first(), 900)
await say(lines('onboarding')[1])
await page.keyboard.press('Escape'); await wait(500)

// 4 Access standard
await next(); setLabel('access-standard')
await say(lines('access-standard')[0])
try { await point(page.getByPlaceholder('e.g. Approved for month-end reporting')); await page.getByPlaceholder('e.g. Approved for month-end reporting').fill('Approved for month-end reporting'); await wait(500) } catch { /* optional */ }
await say(lines('access-standard')[1])
await click(main().getByRole('button', { name: 'Approve', exact: true }), 1000)
await point(main().getByText('Jordan’s side, live'))
await say(lines('access-standard')[2])
await point(main().getByText('Audit trail').first())
await wait(1500)

// 5 Access blocked
await next(); setLabel('access-blocked')
await click(barAction(), 1500)
await point(main().getByText('Jordan’s side, live'))
await say(lines('access-blocked')[0])
await say(lines('access-blocked')[1])
await point(main().getByRole('button', { name: /Uphold block/ }))
await say(lines('access-blocked')[2])
await click(main().getByRole('button', { name: /Uphold block/ }), 1200)

// 6 VPN
await next(); setLabel('support-vpn')
await click(barAction(), 1500)
await say(lines('support-vpn')[0])
await click(main().getByRole('button', { name: 'Still not connecting' }), 1500)
await say(lines('support-vpn')[1])
await point(main().getByText('INC0091734').first())
await say(lines('support-vpn')[2])

// 7 Security + console
await next(); setLabel('support-security')
await click(barAction(), 1500)
await say(lines('support-security')[0])
await click(main().getByText('INC0091802').first(), 900)
await say(lines('support-security')[1])
await point(main().getByText('How Priya’s role changes'))
await say(lines('support-security')[2])

// 8 Federated model
await next(); setLabel('wf-model')
await say(lines('wf-model')[0])
await click(main().getByText('Business process owners').first(), 700)
await say(lines('wf-model')[1])

// 9 Lanes
await next(); setLabel('wf-lanes')
await say(lines('wf-lanes')[0])
await say(lines('wf-lanes')[1])
await point(main().getByText(/bottleneck radar/i).first())
await say(lines('wf-lanes')[2])

// 10 Team onboarding
await next(); setLabel('wf-onboarding')
await say(lines('wf-onboarding')[0])
await click(main().getByText('Employee data changes', { exact: true }).first(), 400)
await click(main().getByText('Letters', { exact: true }).first(), 400)
await say(lines('wf-onboarding')[1])
await click(main().getByRole('button', { name: 'Pass gate' }), 900)
await say(lines('wf-onboarding')[2])

// 11 Failure mode
await next(); setLabel('change-failure')
await point(main().getByText('Workflow: working').first())
await say(lines('change-failure')[0])
await say(lines('change-failure')[1])
await click(main().getByRole('button', { name: 'With OCM' }), 1200)
await say(lines('change-failure')[2])

// 12 Comms + learning
await next(); setLabel('change-comms')
await click(main().getByText('Manager briefing').first(), 800)
await say(lines('change-comms')[0])
await click(main().getByRole('button', { name: /Copy draft/ }), 800)
await say(lines('change-comms')[1])
await click(main().getByRole('tab', { name: 'Learning paths' }), 900)
await point(main().getByText(/Workflow builders/).first())
await say(lines('change-comms')[2])

// 13 Value
await next(); setLabel('value')
await say(lines('value')[0])
await point(main().getByText('From this demo session'))
await say(lines('value')[1])
await click(main().getByText('Simulate: repeat incidents rise to 9%'), 1200)
await say(lines('value')[2])
await click(main().getByText('Simulate: repeat incidents rise to 9%'), 600)
await point(main().getByText(/Time released/).first())
await say(lines('value')[3])

// 14 Decisions
await next(); setLabel('decisions')
await say(lines('decisions')[0])
await say(lines('decisions')[1])
await point(main().getByRole('button', { name: /Copy as action list/ }))
await say(lines('decisions')[2])
await hideCap()
await scrollTop()

label = 'Closing'
await page.keyboard.press('Escape'); await wait(600)
for (const t of S.closing.script) await say(t)
await hideCap()
await page.evaluate((m) => window.__card(`<h1>${m}</h1><p>Questions to validate and pilot next steps are in the demo’s Decisions screen.</p><p class="w">Simulated environment — illustrative only.</p>`), S.coreMessage)
await wait(5000)

const video = page.video()
await ctx.close()
await browser.close()

// ---------- Output ----------
const webm = await video.path()
mkdirSync(outDir, { recursive: true })
const base = join(outDir, 'serval-demo-walkthrough')
writeFileSync(`${base}.srt`, srt.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c.text}\n`).join('\n'))
try {
  execSync(`ffmpeg -y -loglevel error -i "${webm}" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart "${base}.mp4"`)
  console.log(`Wrote ${base}.mp4 and ${base}.srt`)
} catch {
  renameSync(webm, `${base}.webm`)
  console.log(`ffmpeg not available; wrote ${base}.webm and ${base}.srt`)
}
for (const f of readdirSync(tmpDir)) rmSync(join(tmpDir, f), { force: true })
rmSync(tmpDir, { recursive: true, force: true })
console.log(`Duration ≈ ${Math.round((Date.now() - t0) / 1000)}s`)

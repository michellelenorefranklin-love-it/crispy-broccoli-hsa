import { Link } from 'react-router-dom'
import { Printer, ArrowLeft, FlaskConical, MousePointerClick, Mic, Eye, CornerDownRight, MessageCircleQuestion } from 'lucide-react'
import { clientConfig } from '../config/client'
import {
  closing, controls, coreMessage, opening, prepChecklist, qaBank, recovery, steps, totalSeconds, twoScreenSetup, variants,
} from '../demo/speakerScript'

const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h2 id={id} className="break-after-avoid mb-3 mt-10 border-b border-slate-200 pb-1.5 text-lg font-semibold text-ink-900 print:mt-6">{children}</h2>
}

function Label({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <p className="mb-1 flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-slate-500">{icon}{children}</p>
}

export default function SpeakerScript() {
  const acts = Array.from(new Set(steps.map((s) => s.act))).map((a) => {
    const st = steps.filter((s) => s.act === a)
    return { act: a, title: st[0].actTitle, seconds: st.reduce((x, s) => x + s.seconds, 0), first: st[0].id }
  })
  const starts = steps.map((_, i) => opening.seconds + steps.slice(0, i).reduce((x, s) => x + s.seconds, 0))

  return (
    <div className="min-h-screen bg-white print:bg-white">
      <div className="flex items-center justify-center gap-2 bg-warn-50 px-3 py-1 text-[0.75rem] font-medium text-warn-700 print:hidden">
        <FlaskConical size={13} /> Presenter material for a simulated demo. Not for distribution to the client without review.
      </div>
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-2.5">
          <Link to="/employee" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-ink-900"><ArrowLeft size={15} /> Back to the demo</Link>
          <div className="flex items-center gap-2 text-[0.8rem] text-slate-500">
            {acts.map((a) => <a key={a.act} href={`#/speaker-script`} onClick={(e) => { e.preventDefault(); document.getElementById(a.first)?.scrollIntoView({ behavior: 'smooth' }) }} className="rounded px-1.5 py-0.5 hover:bg-slate-100">Act {a.act}</a>)}
            <button type="button" onClick={() => window.print()} className="ml-2 inline-flex h-8 items-center gap-1.5 rounded-md bg-ink-800 px-3 text-sm font-medium text-white hover:bg-ink-700"><Printer size={14} /> Print</button>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 pb-16 pt-8 text-slate-800 print:max-w-none print:px-0 print:pt-0">
        <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-accent-700">Speaker script</p>
        <h1 className="mt-1 text-[1.7rem] font-semibold tracking-tight text-ink-900">Future of Work | AI Employee Experience</h1>
        <p className="mt-1 text-slate-600">Serval AI + ServiceNow demo for {clientConfig.name}. Seven acts, {steps.length} steps, about {Math.round(totalSeconds / 60)} minutes plus discussion.</p>
        <blockquote className="mt-4 rounded-md border-l-4 border-accent-600 bg-accent-50 px-4 py-3 text-[0.95rem] font-medium text-ink-900">“{coreMessage}”</blockquote>
        <p className="mt-2 text-[0.85rem] text-slate-500">Land this sentence at the start and the end. Every act is evidence for it.</p>

        <H2>Run of show</H2>
        <table className="w-full text-left text-[0.88rem]">
          <thead className="text-[0.7rem] uppercase tracking-wide text-slate-500"><tr><th className="py-1.5">Act</th><th>What the room sees</th><th className="text-right">Time</th></tr></thead>
          <tbody>
            <tr className="border-t border-slate-100"><td className="py-1.5 text-slate-500">—</td><td>Opening (before you click anything)</td><td className="text-right tabular">{mmss(opening.seconds)}</td></tr>
            {acts.map((a) => (
              <tr key={a.act} className="border-t border-slate-100"><td className="py-1.5 text-slate-500">{a.act}</td><td>{a.title}</td><td className="text-right tabular">{mmss(a.seconds)}</td></tr>
            ))}
            <tr className="border-t border-slate-300 font-semibold"><td /><td className="py-1.5">Total, then discussion</td><td className="text-right tabular">{mmss(totalSeconds)}</td></tr>
          </tbody>
        </table>

        <div className="break-inside-avoid">
        <H2>Before you present</H2>
        <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
          {prepChecklist.map((g) => (
            <div key={g.when} className="break-inside-avoid rounded-md border border-slate-200 p-3">
              <p className="mb-1.5 text-sm font-semibold text-ink-900">{g.when}</p>
              <ul className="space-y-1.5 text-[0.85rem]">{g.items.map((i) => <li key={i} className="flex gap-2"><span className="mt-[0.2rem] inline-block h-3 w-3 shrink-0 rounded-sm border border-slate-400" />{i}</li>)}</ul>
            </div>
          ))}
        </div>
        </div>
        <div className="mt-4 break-inside-avoid rounded-md border border-slate-200 p-3">
          <p className="mb-1.5 text-sm font-semibold text-ink-900">Two-screen setup (recommended)</p>
          <ol className="list-decimal space-y-1 pl-5 text-[0.85rem]">{twoScreenSetup.map((t) => <li key={t}>{t}</li>)}</ol>
        </div>

        <H2>Controls</H2>
        <table className="w-full text-left text-[0.85rem]">
          <tbody>
            {controls.map((c) => (
              <tr key={c.key} className="border-t border-slate-100 align-top"><td className="w-56 py-1.5 pr-3 font-medium text-ink-900">{c.key}</td><td className="py-1.5 text-slate-700">{c.does}</td></tr>
            ))}
          </tbody>
        </table>

        <div className="break-inside-avoid">
        <H2>Opening · {mmss(opening.seconds)}</H2>
          <Label icon={<MousePointerClick size={12} />}>Do</Label>
          <ul className="mb-3 text-[0.88rem]">{opening.clicks.map((c) => <li key={c}>{c}</li>)}</ul>
          <Label icon={<Mic size={12} />}>Say</Label>
          <div className="space-y-2 border-l-2 border-accent-200 pl-3 text-[0.95rem] leading-relaxed text-ink-900">{opening.script.map((t) => <p key={t}>{t}</p>)}</div>
        </div>

        {steps.map((s, i) => {
          const start = starts[i]
          const newAct = i === 0 || steps[i - 1].act !== s.act
          return (
            <section key={s.id} id={s.id} className="scroll-mt-16 break-inside-avoid">
              {newAct && <H2>Act {s.act} · {s.actTitle}</H2>}
              <div className="mb-5 rounded-lg border border-slate-200 p-4">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[1.02rem] font-semibold text-ink-900">Step {i + 1}. {s.title}</h3>
                  <p className="text-[0.78rem] tabular text-slate-500">Screen: {s.screen} · ~{s.seconds}s · at {mmss(start)}</p>
                </div>
                <Label icon={<MousePointerClick size={12} />}>Do</Label>
                <ol className="mb-3 list-decimal space-y-1 pl-5 text-[0.88rem] text-slate-700">{s.clicks.map((c) => <li key={c}>{c}</li>)}</ol>
                <Label icon={<Mic size={12} />}>Say</Label>
                <div className="mb-3 space-y-2 border-l-2 border-accent-200 pl-3 text-[0.95rem] leading-relaxed text-ink-900">{s.script.map((t) => <p key={t}>{t}</p>)}</div>
                <Label icon={<Eye size={12} />}>Point at</Label>
                <ul className="mb-2 flex flex-wrap gap-1.5">{s.pointAt.map((p) => <li key={p} className="rounded bg-slate-100 px-2 py-0.5 text-[0.78rem] text-slate-700">{p}</li>)}</ul>
                {s.transition && <p className="mt-3 flex items-start gap-1.5 text-[0.88rem] italic text-slate-600"><CornerDownRight size={14} className="mt-0.5 shrink-0" />“{s.transition}”</p>}
                {s.qa?.map((q) => (
                  <p key={q.q} className="mt-2 rounded bg-slate-50 px-2.5 py-1.5 text-[0.82rem] text-slate-600"><span className="font-semibold text-slate-800">If asked: {q.q}</span> {q.a}</p>
                ))}
              </div>
            </section>
          )
        })}

        <H2>Closing</H2>
        <div className="space-y-2 border-l-2 border-accent-200 pl-3 text-[0.95rem] leading-relaxed text-ink-900">{closing.script.map((t) => <p key={t}>{t}</p>)}</div>

        <H2>Questions you’re likely to get</H2>
        <div className="space-y-2.5">
          {qaBank.map((q) => (
            <div key={q.q} className="break-inside-avoid">
              <p className="flex items-center gap-1.5 text-[0.9rem] font-semibold text-ink-900"><MessageCircleQuestion size={14} className="text-slate-400" /> {q.q}</p>
              <p className="pl-5 text-[0.88rem] text-slate-700">{q.a}</p>
            </div>
          ))}
        </div>

        <H2>Shorter and longer versions</H2>
        <table className="w-full text-left text-[0.85rem]">
          <thead className="text-[0.7rem] uppercase tracking-wide text-slate-500"><tr><th className="py-1.5">Version</th><th>Length</th><th>Steps</th><th>How</th></tr></thead>
          <tbody>
            {variants.map((v) => (
              <tr key={v.name} className="border-t border-slate-100 align-top"><td className="py-1.5 pr-2 font-medium text-ink-900">{v.name}</td><td className="whitespace-nowrap pr-2">{v.minutes}</td><td className="pr-2">{v.steps}</td><td className="text-slate-700">{v.tip}</td></tr>
            ))}
          </tbody>
        </table>

        <H2>If something goes wrong</H2>
        <table className="w-full text-left text-[0.85rem]">
          <tbody>
            {recovery.map((r) => (
              <tr key={r.problem} className="border-t border-slate-100 align-top"><td className="w-60 py-1.5 pr-3 font-medium text-ink-900">{r.problem}</td><td className="py-1.5 text-slate-700">{r.fix}</td></tr>
            ))}
          </tbody>
        </table>

        <p className="mt-10 text-[0.75rem] text-slate-400">All people, data, and integrations in the demo are fictional or simulated. Numbers are illustrative.</p>
      </article>
    </div>
  )
}

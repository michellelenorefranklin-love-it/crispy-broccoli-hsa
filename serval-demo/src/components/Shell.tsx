import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  UserRound, CalendarCheck, KeyRound, LifeBuoy, Workflow, Users, BarChart3, Network, Play, RotateCcw,
  StickyNote, Tag, AArrowUp, AArrowDown, FlaskConical, ChevronLeft, ChevronRight, X, ListChecks, History,
} from 'lucide-react'
import { useDemo } from '../store/store'
import { clientConfig } from '../config/client'
import { cn } from '../lib/util'
import { demoSteps, routeNotes, demoMinutes } from '../demo/script'
import { Button } from './ui'

const sections = [
  { group: 'What employees see', items: [
    { to: '/employee', label: 'Employee Experience', icon: UserRound },
    { to: '/onboarding', label: 'Onboarding', icon: CalendarCheck },
    { to: '/access', label: 'Access & Permissions', icon: KeyRound },
    { to: '/support', label: 'IT Support', icon: LifeBuoy },
  ] },
  { group: 'What happens behind the scenes', items: [
    { to: '/workflow', label: 'Workflow & Governance', icon: Workflow },
    { to: '/architecture', label: 'Architecture', icon: Network },
  ] },
  { group: 'How value is realized', items: [
    { to: '/change', label: 'Change & Adoption', icon: Users },
    { to: '/value', label: 'Executive Value', icon: BarChart3 },
  ] },
  { group: 'Discussion', items: [
    { to: '/current-state', label: 'Current state (hypotheses)', icon: History },
    { to: '/decisions', label: 'Decisions & next steps', icon: ListChecks },
  ] },
]

function Wordmark() {
  return clientConfig.logoUrl ? (
    <img src={clientConfig.logoUrl} alt={clientConfig.displayName} className="h-6 w-auto" />
  ) : (
    <span className="inline-flex h-7 items-center rounded bg-white/10 px-2 text-[0.8rem] font-semibold tracking-wide text-white">{clientConfig.shortName}</span>
  )
}

function useKeyboard() {
  const nav = useNavigate()
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const s = useDemo.getState()
      if (e.key === 'p' || e.key === 'P') { s.set({ notesOpen: !s.notesOpen }); return }
      if (!s.demo.active) return
      if (e.key === 'ArrowRight') { e.preventDefault(); goStep(s.demo.step + 1, nav) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goStep(s.demo.step - 1, nav) }
      if (e.key === 'Escape') { s.set({ demo: { active: false, step: s.demo.step } }) }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [nav])
}

export function goStep(i: number, nav: (to: string) => void) {
  const s = useDemo.getState()
  const step = Math.max(0, Math.min(demoSteps.length - 1, i))
  s.set({ demo: { active: true, step } })
  demoSteps[step].enter?.()
  nav(demoSteps[step].route)
}

const barBtn = 'inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[0.8rem] font-medium text-slate-100 hover:bg-white/10'

function DemoBar() {
  const demo = useDemo((s) => s.demo)
  const setS = useDemo((s) => s.set)
  const nav = useNavigate()
  const [done, setDone] = useState<Record<number, boolean>>({})
  if (!demo.active) return null
  const step = demoSteps[demo.step]
  const acts = Array.from(new Set(demoSteps.map((d) => d.act)))
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-700 bg-ink-900 text-white shadow-pop">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
        <div className="flex items-center gap-1" aria-label="Acts">
          {acts.map((a) => (
            <span key={a} className={cn('h-1.5 w-6 rounded-full', a < step.act ? 'bg-accent-500' : a === step.act ? 'bg-white' : 'bg-white/20')} />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.7rem] uppercase tracking-wide text-slate-300">
            Act {step.act} of 7 · {step.actTitle} · Step {demo.step + 1}/{demoSteps.length}
          </p>
          <p className="truncate text-sm font-semibold">{step.title}</p>
          <p className="truncate text-[0.8rem] text-slate-300">“{step.say}”</p>
        </div>
        <div className="flex items-center gap-2">
          {step.action && (
            <Button size="sm" variant="success" disabled={done[demo.step]} onClick={() => { step.action!.run(); setDone({ ...done, [demo.step]: true }) }}>
              <Play size={13} /> {step.action.label}
            </Button>
          )}
          <button type="button" className={barBtn} onClick={() => setS({ notesOpen: !useDemo.getState().notesOpen })}>
            <StickyNote size={14} /> Notes (P)
          </button>
          <Button size="sm" variant="secondary" disabled={demo.step === 0} onClick={() => goStep(demo.step - 1, nav)}><ChevronLeft size={14} /> Back</Button>
          <Button size="sm" variant="secondary" disabled={demo.step === demoSteps.length - 1} onClick={() => goStep(demo.step + 1, nav)}>Next <ChevronRight size={14} /></Button>
          <button type="button" className={barBtn} onClick={() => setS({ demo: { active: false, step: demo.step } })} aria-label="Exit guided demo (Esc)">
            <X size={14} /> Exit
          </button>
        </div>
      </div>
    </div>
  )
}

function NotesDrawer() {
  const open = useDemo((s) => s.notesOpen)
  const demo = useDemo((s) => s.demo)
  const setS = useDemo((s) => s.set)
  const loc = useLocation()
  if (!open) return null
  const step = demo.active ? demoSteps[demo.step] : null
  const rn = routeNotes[loc.pathname]
  const title = step ? step.title : 'Presenter notes'
  const question = step ? step.question : rn?.question
  const points = step ? [step.say, ...step.points] : rn?.points ?? ['No notes for this screen.']
  return (
    <aside className="fixed right-3 top-[6.5rem] z-40 w-[22rem] rounded-lg border border-slate-200 bg-white shadow-pop" aria-label="Presenter notes">
      <header className="flex items-center justify-between border-b border-slate-100 px-3.5 py-2.5">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-900"><StickyNote size={14} /> {title}</p>
        <Button size="sm" variant="ghost" onClick={() => setS({ notesOpen: false })} aria-label="Close notes"><X size={14} /></Button>
      </header>
      <div className="space-y-2.5 px-3.5 py-3 text-sm">
        {question && <p className="rounded bg-accent-50 px-2 py-1.5 text-[0.82rem] text-accent-700"><span className="font-semibold">Answers:</span> {question}</p>}
        {!step && rn && <p className="text-[0.75rem] text-slate-500">For: {rn.audience}</p>}
        <ul className="space-y-1.5">
          {points.map((p, i) => <li key={i} className="flex gap-2 text-[0.85rem] text-slate-700"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />{p}</li>)}
        </ul>
        <p className="border-t border-slate-100 pt-2 text-[0.72rem] text-slate-400">Press P to toggle. In the guided demo: → next, ← back, Esc exits.</p>
      </div>
    </aside>
  )
}

function ResetButton() {
  const reset = useDemo((s) => s.reset)
  const nav = useNavigate()
  const [confirm, setConfirm] = useState(false)
  useEffect(() => {
    if (!confirm) return
    const t = window.setTimeout(() => setConfirm(false), 3000)
    return () => window.clearTimeout(t)
  }, [confirm])
  return (
    <button
      onClick={() => { if (confirm) { reset(); setConfirm(false); nav('/employee') } else setConfirm(true) }}
      className={cn('inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[0.8rem] font-medium', confirm ? 'bg-bad-600 text-white' : 'text-slate-200 hover:bg-white/10')}
      title="Restore all seeded demo data"
    >
      <RotateCcw size={14} /> {confirm ? 'Click again to reset' : 'Reset demo'}
    </button>
  )
}

export function Shell() {
  useKeyboard()
  const fontScale = useDemo((s) => s.fontScale)
  const showProv = useDemo((s) => s.showProvenance)
  const notesOpen = useDemo((s) => s.notesOpen)
  const demo = useDemo((s) => s.demo)
  const setS = useDemo((s) => s.set)
  const nav = useNavigate()
  const loc = useLocation()

  useEffect(() => { document.documentElement.style.setProperty('--font-scale', String(fontScale)) }, [fontScale])
  useEffect(() => { document.getElementById('main')?.scrollTo({ top: 0 }) }, [loc.pathname, loc.search])

  const iconBtn = 'inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[0.8rem] font-medium text-slate-200 hover:bg-white/10'

  return (
    <div className="flex h-screen flex-col">
      <div role="note" className="flex items-center justify-center gap-2 bg-warn-50 px-3 py-1 text-[0.75rem] font-medium text-warn-700 ring-1 ring-warn-100">
        <FlaskConical size={13} /> Simulated environment — illustrative only. All people, data, and integrations are fictional or mocked.
      </div>
      <header className="flex h-12 shrink-0 items-center gap-3 bg-ink-900 px-4 text-white">
        <Wordmark />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">Future of Work <span className="font-normal text-slate-300">| AI Employee Experience</span></p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button className={cn(iconBtn, showProv && 'bg-white/10')} onClick={() => setS({ showProvenance: !showProv })} aria-pressed={showProv} title="Show or hide provenance tags">
            <Tag size={14} /> <span className="hidden lg:inline">Provenance</span> {showProv ? 'on' : 'off'}
          </button>
          <button className={iconBtn} onClick={() => setS({ fontScale: Math.max(0.9, +(fontScale - 0.1).toFixed(1)) })} aria-label="Smaller text"><AArrowDown size={15} /></button>
          <span className="w-9 text-center text-[0.75rem] tabular text-slate-300">{Math.round(fontScale * 100)}%</span>
          <button className={iconBtn} onClick={() => setS({ fontScale: Math.min(1.4, +(fontScale + 0.1).toFixed(1)) })} aria-label="Larger text"><AArrowUp size={15} /></button>
          <button className={cn(iconBtn, notesOpen && 'bg-white/10')} onClick={() => setS({ notesOpen: !notesOpen })} title="Presenter notes (P)">
            <StickyNote size={14} /> <span className="hidden lg:inline">Notes</span>
          </button>
          <ResetButton />
          <Button size="sm" variant="success" className="ml-1" onClick={() => goStep(demo.active ? demo.step : 0, nav)}>
            <Play size={13} /> {demo.active ? 'Resume demo' : 'Start Executive Demo'}
          </Button>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <nav className="scroll-thin hidden w-60 shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 md:block" aria-label="Sections">
          {sections.map((g) => (
            <div key={g.group} className="mb-4">
              <p className="mb-1 px-2 text-[0.66rem] font-semibold uppercase tracking-wider text-slate-400">{g.group}</p>
              {g.items.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  className={({ isActive }) => cn('flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[0.88rem]', isActive ? 'bg-ink-800 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')}
                >
                  <i.icon size={16} /> {i.label}
                </NavLink>
              ))}
            </div>
          ))}
          <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-2.5 text-[0.72rem] text-slate-500">
            Guided demo: {demoSteps.length} steps, ~{Math.round(demoMinutes)} min. Keys: → ← Esc, P for notes.
          </div>
        </nav>
        <main id="main" className={cn('scroll-thin min-w-0 flex-1 overflow-y-auto', demo.active && 'pb-24')}>
          <div className="mx-auto max-w-[1360px] px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
      <NotesDrawer />
      <DemoBar />
    </div>
  )
}

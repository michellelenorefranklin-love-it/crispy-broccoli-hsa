import clsx, { type ClassValue } from 'clsx'

export const cn = (...c: ClassValue[]) => clsx(c)

let n = 0
export const uid = (p = 'id') => `${p}-${Date.now().toString(36)}-${(n++).toString(36)}`

/** Demo clock: minutes since 09:00 on Jordan's day 3. */
export const fmtClock = (mins: number) => {
  const h = 9 + Math.floor(mins / 60)
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

export const fmtMoney = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(2)}M` : v >= 1000 ? `$${Math.round(v / 1000).toLocaleString()}K` : `$${Math.round(v)}`
export const fmtNum = (v: number) => Math.round(v).toLocaleString()

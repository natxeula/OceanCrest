"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  days?: number
  storageKey?: string
  label?: string
}

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function format(durationMs: number) {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return {
    days,
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  }
}

export default function SCPCountdown({ days = 90, storageKey = 'classifiedRevealTarget', label = 'Reveal in' }: Props) {
  const [target, setTarget] = useState<Date | null>(null)
  const [now, setNow] = useState<Date>(new Date())
  const intervalRef = useRef<number | null>(null)

  // Initialize/persist target
  useEffect(() => {
    let t: Date | null = null
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = new Date(stored)
        if (!isNaN(parsed.getTime())) t = parsed
      }
    } catch {}

    if (!t) {
      t = addDays(new Date(), days)
      try { localStorage.setItem(storageKey, t.toISOString()) } catch {}
    }
    setTarget(t)
  }, [days, storageKey])

  // Tick
  useEffect(() => {
    intervalRef.current = window.setInterval(() => setNow(new Date()), 1000)
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current) }
  }, [])

  const remaining = useMemo(() => {
    if (!target) return 0
    return target.getTime() - now.getTime()
  }, [target, now])

  const done = remaining <= 0
  const f = format(remaining)

  return (
    <div className="scp-countdown" aria-live="polite" role="timer">
      <span className="scp-countdown-label">{label}</span>
      {done ? (
        <span className="scp-countdown-value revealed">REVEALED</span>
      ) : (
        <span className="scp-countdown-value">
          {f.days}d {f.hours}h {f.minutes}m {f.seconds}s
        </span>
      )}
    </div>
  )
}

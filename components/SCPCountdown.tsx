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

function usePrevious<T>(value: T) {
  const ref = useRef(value)
  useEffect(() => { ref.current = value })
  return ref.current
}

type SlideValueProps = { text: string; glitch?: boolean }
function SlideValue({ text, glitch }: SlideValueProps) {
  const prev = usePrevious(text)
  return (
    <div className="sv-container">
      <div className="sv-track" key={text}>
        <span className={`scp-time-value ${glitch ? 'glitch' : ''}`} data-text={text}>{text}</span>
        <span className="scp-time-value sv-prev">{prev}</span>
      </div>
    </div>
  )
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

  // Progress estimation (from inferred start = target - days)
  const start = useMemo(() => (target ? new Date(target.getTime() - days * 86400000) : null), [target, days])
  const total = useMemo(() => (start && target ? target.getTime() - start.getTime() : days * 86400000), [start, target, days])
  const elapsed = useMemo(() => (start ? Math.max(0, Math.min(total, now.getTime() - start.getTime())) : 0), [start, now, total])
  const percent = total > 0 ? Math.round((elapsed / total) * 100) : 0

  const warning = !done && remaining <= 7 * 86400000

  return (
    <div className={`scp-countdown epic ${warning ? 'warning' : ''}`} aria-live="polite" role="timer">
      <div className="scp-countdown-header">
        <span className="scp-countdown-label">{label}</span>
        <span className={`scp-beacon ${done ? 'ok' : 'live'}`} aria-hidden></span>
      </div>

      {done ? (
        <div className="scp-time-grid" role="group" aria-label="Reveal status">
          <div className="scp-time-box revealed">
            <span className="scp-time-value">REVEALED</span>
            <span className="scp-time-unit">status</span>
          </div>
        </div>
      ) : (
        <div className="scp-time-grid" role="group" aria-label="Time remaining">
          <div className="scp-time-box">
            <SlideValue text={String(f.days)} glitch />
            <span className="scp-time-unit">days</span>
          </div>
          <div className="scp-time-box">
            <SlideValue text={String(f.hours)} />
            <span className="scp-time-unit">hours</span>
          </div>
          <div className="scp-time-box">
            <SlideValue text={String(f.minutes)} />
            <span className="scp-time-unit">mins</span>
          </div>
          <div className="scp-time-box">
            <SlideValue text={String(f.seconds)} />
            <span className="scp-time-unit">secs</span>
          </div>
        </div>
      )}

      <div className="scp-progress" aria-hidden>
        <div className="scp-progress-bar" style={{ width: `${done ? 100 : percent}%` }} />
      </div>

      <div className="scp-scanline" aria-hidden></div>
    </div>
  )
}

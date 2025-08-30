'use client'

import { useEffect, useState } from 'react'

export default function NotificationBar() {
  const [visible, setVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    setVisible(true)
    document.body.classList.add('has-notification')

    const computeTarget = (baseYear: number) => {
      return new Date(baseYear, 8, 30, 0, 0, 0)
    }

    const format = (ms: number) => {
      if (ms <= 0) return '00d 00h 00m 00s'
      const s = Math.floor(ms / 1000)
      const days = Math.floor(s / 86400)
      const hrs = Math.floor((s % 86400) / 3600)
      const mins = Math.floor((s % 3600) / 60)
      const secs = s % 60
      const pad = (n: number) => String(n).padStart(2, '0')
      return `${pad(days)}d ${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`
    }

    const now = new Date()
    let target = computeTarget(now.getFullYear())
    if (target < now) target = computeTarget(now.getFullYear() + 1)

    const tick = () => setTimeLeft(format(target.getTime() - Date.now()))
    tick()
    const id = setInterval(tick, 1000)

    return () => {
      clearInterval(id)
      document.body.classList.remove('has-notification')
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    document.body.classList.remove('has-notification')
  }

  if (!visible) return null

  return (
    <div className="notification-bar" role="region" aria-label="Site update" suppressHydrationWarning>
      <div className="container">
        <div className="notification-content">
          <span className="notification-badge" aria-hidden="true">COMING SOON!!!</span>
          <span className="notification-text">
            generic clicking game (Air Clicker Remasted) releasing September 30th!
            <span className="notification-timer notification-timer-offset" aria-live="polite" suppressHydrationWarning>{timeLeft}</span>
          </span>
          <a href="/faq" className="notification-link">FAQ</a>
          <a href="https://discord.gg/huDx4td5uA" className="notification-link">Join Discord</a>
          <button className="notification-close" aria-label="Dismiss update" onClick={dismiss}>✕</button>
        </div>
      </div>
    </div>
  )
}

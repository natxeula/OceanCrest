'use client'

import { useEffect, useState } from 'react'

export default function HandbookEditor({ slug }: { slug: 'internal' | 'executive' }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setStatus(null)
    const res = await fetch(`/api/handbooks/${slug}`, { cache: 'no-store' })
    const data = await res.json()
    setContent(data.content || '')
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    setSaving(true)
    setStatus(null)
    const res = await fetch(`/api/handbooks/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    if (res.ok) setStatus('Saved!')
    else setStatus('Save failed')
    setSaving(false)
  }

  return (
    <div className="glass-card" style={{ padding: '1rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Handbook Editor</strong>
        <button className="btn btn-secondary" onClick={() => setOpen(v => !v)}>{open ? 'Close' : 'Edit'}</button>
      </div>
      {open && (
        <div style={{ marginTop: '1rem' }}>
          {loading ? (
            <div>Loading…</div>
          ) : (
            <>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className="form-input"
                style={{ width: '100%', minHeight: '240px' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={load} disabled={saving}>Refresh</button>
                <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
              </div>
              {status && <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>{status}</div>}
            </>
          )}
        </div>
      )}
    </div>
  )
}

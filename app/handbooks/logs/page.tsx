import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

function PasswordForm() {
  return (
    <form method="POST" action="/handbooks/logs/auth" className="contact-form" style={{maxWidth: '560px', margin: '0 auto'}}>
      <div className="form-group">
        <label htmlFor="password">Enter Password</label>
        <input id="password" name="password" type="password" required className="form-input" />
      </div>
      <div className="form-submit" style={{textAlign: 'right'}}>
        <button type="submit" className="btn btn-primary">Unlock</button>
      </div>
    </form>
  )
}

export default function ExecutiveLogsPage() {
  const session = cookies().get('hb_logs')?.value === 'ok'

  return (
    <>
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Executive Logs</h1>
          <p className="hero-subtitle">Confidential executive records and summaries</p>
        </div>
      </section>

      <section className="section" aria-labelledby="content-title">
        <div className="container">
          {session ? (
            <>
              <h2 id="content-title" className="section-title">Overview</h2>
              <div className="content-wrapper">
                <p className="large-text">This section contains executive logs and meeting summaries.</p>
                <p>Access is restricted to authorized personnel only.</p>
              </div>
              <div className="overview-grid" style={{marginTop: '1.5rem'}}>
                <article className="overview-card glass-card"><h3>2025 Q1</h3><p>Highlights, decisions, and action items.</p></article>
                <article className="overview-card glass-card"><h3>2024 Q4</h3><p>Highlights, decisions, and action items.</p></article>
                <article className="overview-card glass-card"><h3>2024 Q3</h3><p>Highlights, decisions, and action items.</p></article>
                <article className="overview-card glass-card"><h3>Archive</h3><p>Prior logs and references.</p></article>
              </div>
            </>
          ) : (
            <>
              <h2 id="content-title" className="section-title">Protected</h2>
              <p className="section-subtitle">Enter the password to view this section.</p>
              <PasswordForm />
            </>
          )}
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Executive Logs - OceanCrest',
  description: 'Password protected executive logs for OceanCrest leadership.',
}

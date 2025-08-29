import { cookies } from 'next/headers'
import HandbookEditor from '@/components/HandbookEditor'

export const dynamic = 'force-dynamic'

function PasswordForm() {
  return (
    <form method="POST" action="/handbooks/executive/auth" className="contact-form" style={{maxWidth: '560px', margin: '0 auto'}}>
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

export default function ExecutiveHandbookPage() {
  const session = cookies().get('hb_executive')?.value === 'ok'

  return (
    <>
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Executive Handbook</h1>
          <p className="hero-subtitle">Leadership policies and decision frameworks</p>
        </div>
      </section>

      <section className="section" aria-labelledby="content-title">
        <div className="container">
          {session ? (
            <>
              <h2 id="content-title" className="section-title">Overview</h2>
              <div className="content-wrapper">
                <p className="large-text">This section contains documentation for OceanCrest executives.</p>
                <p>Includes governance, strategy, risk management, and approvals.</p>
              </div>
              <HandbookEditor slug="executive" />
              <section className="section" aria-labelledby="hb-content-title" style={{paddingTop: 0}}>
                <div className="container">
                  <h3 id="hb-content-title" className="section-title">Handbook Content</h3>
                  <div className="overview-card glass-card" style={{padding: '1.25rem'}}>
                    {(() => {
                      const fs = require('fs') as typeof import('fs')
                      const p = process.cwd() + '/data/handbooks/executive.md'
                      let raw = ''
                      try { raw = fs.readFileSync(p, 'utf8') } catch {}
                      const [first, ...rest] = (raw || '').split(/\n\n+/)
                      return (
                        <div>
                          <p style={{whiteSpace: 'pre-wrap'}}>{first}</p>
                          {rest.map((blk: string, i: number) => (
                            <p key={i} style={{whiteSpace: 'pre-wrap'}}>{blk}</p>
                          ))}
                        </div>
                      )
                    })()}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <h2 id="content-title" className="section-title">Protected</h2>
              <p className="section-subtitle">Enter the password to view this handbook.</p>
              <PasswordForm />
            </>
          )}
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Executive Handbook - OceanCrest',
  description: 'Password protected executive handbook for OceanCrest leadership.',
}

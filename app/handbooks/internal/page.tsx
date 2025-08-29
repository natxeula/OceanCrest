import { cookies } from 'next/headers'
import HandbookEditor from '@/components/HandbookEditor'

export const dynamic = 'force-dynamic'

function PasswordForm() {
  return (
    <form method="POST" action="/handbooks/internal/auth" className="contact-form" style={{maxWidth: '560px', margin: '0 auto'}}>
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

export default function InternalHandbookPage() {
  const session = cookies().get('hb_internal')?.value === 'ok'

  return (
    <>
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Internal Handbook</h1>
          <p className="hero-subtitle">Staff policies, workflows, and standards</p>
        </div>
      </section>

      <section className="section" aria-labelledby="content-title">
        <div className="container">
          {session ? (
            <>
              <h2 id="content-title" className="section-title">Overview</h2>
              <div className="content-wrapper">
                <p className="large-text">This section contains internal documentation for OceanCrest staff.</p>
                <p>Please navigate using the table of contents below.</p>
              </div>
              <HandbookEditor slug="internal" />
              <section className="section" aria-labelledby="hb-content-title" style={{paddingTop: 0}}>
                <div className="container">
                  <h3 id="hb-content-title" className="section-title">Handbook Content</h3>
                  <div className="overview-card glass-card" style={{padding: '1.25rem'}}>
                    {(() => {
                      const [first, ...rest] = (require('fs').readFileSync(process.cwd() + '/data/handbooks/internal.md', 'utf8') || '').split(/\n\n+/)
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
  title: 'Internal Handbook - OceanCrest',
  description: 'Password protected internal handbook for OceanCrest staff.',
}

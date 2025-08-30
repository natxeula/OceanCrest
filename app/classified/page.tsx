import { Metadata } from 'next'
import Link from 'next/link'
import { classifiedShow } from '@/data/shows/classified'
import SCPCountdown from '@/components/SCPCountdown'

export const metadata: Metadata = {
  title: 'Classified: A SCP Series',
  description: 'Access Level 4 required.',
}

export default function ClassifiedPage() {
  const { codeName, accessLevel, lead, division, seasons } = classifiedShow

  return (
    <>
      <section className="scp-hero" aria-labelledby="scp-hero-title">
        <div className="container">
          <div className="scp-hero-inner">
            <div className="scp-hero-badge" aria-label={`Access Level ${accessLevel}`}>AL-{accessLevel}</div>
            <h1 id="scp-hero-title" className="scp-hero-title">{codeName}</h1>
            <p className="scp-hero-meta">
              <span className="scp-meta-item">{lead}</span>
              <span className="scp-meta-sep" aria-hidden>•</span>
              <span className="scp-meta-item">{division}</span>
            </p>
            <div className="scp-hero-cta">
              <Link href="#seasons" className="scp-cta">View Seasons</Link>
              <Link href="/projects" className="scp-cta scp-cta-secondary">Back to Projects</Link>
            </div>
          </div>
        </div>
        <div className="crt-overlay" aria-hidden></div>
      </section>

  

      <section id="seasons" className="section scp-section" aria-labelledby="seasons-title">
        <div className="container">
          <h2 id="seasons-title" className="scp-section-title">Season Index</h2>
          <div className="scp-lockout" role="status">
            <div className="scp-stamp" aria-hidden>CLASSIFIED</div>
            <p className="scp-lockout-text">Access restricted. Show materials concealed until public release.</p>
            <div className="redaction-block">
              <span className="redaction-line xl"></span>
              <span className="redaction-line l"></span>
              <span className="redaction-line m"></span>
              <span className="redaction-line xl"></span>
              <span className="redaction-line s"></span>
              <span className="redaction-line l"></span>
            </div>
            <div className="scp-lockout-actions">
              <Link href="/contact" className="scp-cta">Request Screener</Link>
            </div>
          </div>
        </div>
      </section>
      <SCPCountdown target="2025-12-01T18:00:00Z" days={90} />

      <section className="section scp-section scp-cta-block" aria-labelledby="contact-secure-title">
        <div className="container">
          <div className="scp-cta-panel">
            <h3 id="contact-secure-title" className="scp-cta-title">Secure Communications</h3>
            <p className="scp-cta-text">For clearance validation or secured screeners, route contact via authorized channels.</p>
            <Link href="/contact" className="scp-cta scp-cta-primary">Request Access</Link>
          </div>
        </div>
      </section>
    </>
  )
}

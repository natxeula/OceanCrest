import { Metadata } from 'next'
import Link from 'next/link'
import { classifiedShow } from '@/data/shows/classified'

export const metadata: Metadata = {
  title: 'Classified — SCP Operations',
  description: 'Access Level 4 required. Season information and full episode index for Classified: SCP Operations.',
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
          <div className="scp-season-grid">
            {seasons.map((season) => (
              <article key={season.id} className="terminal-card" aria-labelledby={`${season.id}-title`}>
                <header className="terminal-card-header">
                  <h3 id={`${season.id}-title`} className="terminal-title">{season.name}</h3>
                  <div className="terminal-meta">
                    <span className="terminal-chip">Year {season.year}</span>
                    <span className="terminal-chip terminal-chip-accent">{season.episodes.length ? (season.episodes.every(ep => ep.released === false) ? 'Pre-release' : `${season.episodes.length} Episodes`) : 'In Production'}</span>
                  </div>
                </header>
                <p className="terminal-summary">{season.summary}</p>
                {season.episodes.length > 0 ? (
                  <div className="episode-list" role="list" aria-label={`${season.name} episodes`}>
                    {season.episodes.map((ep) => (
                      <div key={ep.id} role="listitem" className="episode-row">
                        <div className="episode-left">
                          <div className="episode-code">{ep.id.toUpperCase()}</div>
                          <h4 className="episode-title">{ep.title}</h4>
                        </div>
                        <div className="episode-right">
                          {ep.released === false && (
                            <span className="episode-badge episode-unreleased">Unreleased</span>
                          )}
                          <span className="episode-badge episode-length">{ep.runtimeMinutes}m</span>
                          <span className="episode-badge episode-rating">{ep.rating}</span>
                        </div>
                        <p className="episode-synopsis">{ep.synopsis}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="terminal-placeholder" role="status">Pre-release dossier. Episodes TBA.</div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

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

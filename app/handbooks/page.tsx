import Link from 'next/link'

export default function HandbooksHubPage() {
  const items = [
    {
      title: 'General Internal Handbook',
      description: 'Policies, workflows, and guidelines for all staff.',
      href: '/handbooks/internal',
      status: 'Available'
    },
    {
      title: 'Executive Handbook',
      description: 'Leadership policies, decision frameworks, and protocols.',
      href: '/handbooks/executive',
      status: 'Available'
    },
    {
      title: 'HR Handbook',
      description: 'Hiring, onboarding, and people operations guidelines.',
      href: '#',
      status: 'Coming Soon'
    },
    {
      title: 'Executive Logs',
      description: 'Confidential executive logs and meeting records.',
      href: '/handbooks/logs',
      status: 'Available'
    }
  ]

  return (
    <>
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Handbooks</h1>
          <p className="hero-subtitle">Central access to internal documentation</p>
        </div>
      </section>

      <section className="section" aria-labelledby="handbooks-list-title">
        <div className="container">
          <h2 id="handbooks-list-title" className="section-title">Available Sections</h2>
          <div className="overview-grid">
            {items.map((item, i) => (
              <article key={i} className="overview-card glass-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="cta-buttons" style={{marginTop: '1rem'}}>
                  {item.status === 'Coming Soon' ? (
                    <span className="btn btn-secondary" aria-disabled="true">Coming Soon</span>
                  ) : (
                    <Link href={item.href} className="btn btn-primary">Open</Link>
                  )}
                </div>
                <div className="section-subtitle" style={{marginTop: '0.75rem', opacity: 0.8}}>{item.status}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Handbooks - OceanCrest',
  description: 'Centralized access to internal and executive handbooks and logs.',
  keywords: 'handbook, internal, executive, logs, HR',
}

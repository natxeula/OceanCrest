export default function CareersPage() {
  const benefits = [
    {
      icon: "🎨",
      title: "Creative Freedom",
      description: "Work on passion projects with full creative control and artistic expression."
    },
    {
      icon: "🌍",
      title: "Remote Flexibility",
      description: "Work from anywhere with flexible hours that fit your lifestyle."
    },
    {
      icon: "🤝",
      title: "Collaborative Culture",
      description: "Join a supportive team that values collaboration and shared success."
    }
  ]

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Join Our Team</h1>
          <p className="hero-subtitle">Build the future of entertainment with us</p>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="section" aria-labelledby="why-work-title">
        <div className="container">
          <h2 id="why-work-title" className="section-title">Why Work at OceanCrest?</h2>
          <div className="content-wrapper">
            <p className="large-text">
              At OceanCrest, we believe that great work comes from passionate people who love what they do.
            </p>
            <p>
              We offer an environment where creativity thrives, innovation is encouraged, and every team member has the opportunity to make a meaningful impact on our projects and community.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{background: 'var(--secondary-bg)'}} aria-labelledby="benefits-title">
        <div className="container">
          <h2 id="benefits-title" className="section-title">What We Offer</h2>
          <div className="overview-grid">
            {benefits.map((benefit, index) => (
              <article key={index} className="overview-card glass-card">
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <h2 id="process-title" className="section-title">How to Get Involved</h2>
          <div className="overview-grid">
            <article className="overview-card glass-card">
              <h3>1. Join Discord</h3>
              <p>Join our community on Discord to express your interest and share your portfolio or experience.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>2. Apply</h3>
              <p>Use our department-specific forms to apply to a team.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>3. Chat</h3>
              <p>Have a casual conversation with us to discuss your interests and how you can contribute.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>4. Welcome</h3>
              <p>Join the team and start making an impact on day one!</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" aria-labelledby="apply-title">
        <div className="container">
          <div className="text-center">
            <h2 id="apply-title" className="section-title">Ready to Get Involved?</h2>
            <p className="section-subtitle">
              Join our Discord to connect with the team and hear about opportunities.
            </p>
            <div className="cta-buttons" style={{justifyContent: 'center', marginTop: '2rem'}}>
              <a href="https://discord.gg/huDx4td5uA" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Join Discord</a>
              <a href="/team" className="btn btn-secondary">Meet the Team</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Careers - OceanCrest',
  description: 'Join the OceanCrest team. We offer creative freedom, remote flexibility, and growth opportunities in entertainment production.',
  keywords: 'careers, jobs, employment, hiring, remote work, creative jobs, entertainment careers',
}

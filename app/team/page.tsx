export default function TeamPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Our Team</h1>
          <p className="hero-subtitle">Meet the crew behind OceanCrest</p>
        </div>
      </section>

      {/* Team Overview */}
      <section className="section" aria-labelledby="team-overview-title">
        <div className="container">
          <h2 id="team-overview-title" className="section-title">Who We Are</h2>
          <div className="content-wrapper">
            <p className="large-text">
              Our team is a diverse group of creators, developers, and storytellers united by a shared passion for authentic entertainment.
            </p>
            <p>
              We believe that the best projects come from collaboration, creativity, and a genuine love for the craft. Every member of our team brings unique skills and perspectives that contribute to our collective vision.
            </p>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="section" style={{background: 'var(--secondary-bg)'}} aria-labelledby="values-title">
        <div className="container">
          <h2 id="values-title" className="section-title">Our Team Values</h2>
          <div className="overview-grid">
            <article className="overview-card glass-card">
              <h3>🤝 Collaboration</h3>
              <p>We work together, combining our diverse skills and perspectives to create something greater than the sum of our parts.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>🎯 Excellence</h3>
              <p>We strive for the highest quality in everything we do, from initial concept to final delivery.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>💡 Innovation</h3>
              <p>We're always exploring new technologies, techniques, and creative approaches to storytelling.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>🌟 Passion</h3>
              <p>We're driven by genuine enthusiasm for our craft and the projects we work on.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="section" aria-labelledby="join-title">
        <div className="container">
          <div className="text-center">
            <h2 id="join-title" className="section-title">Join Our Team</h2>
            <p className="section-subtitle">
              We're always looking for talented individuals who share our passion for authentic entertainment.
            </p>
            <div className="cta-buttons" style={{justifyContent: 'center', marginTop: '2rem'}}>
              <a href="https://discord.gg/huDx4td5uA" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Join Discord</a>
              <a href="/leadership" className="btn btn-secondary">Meet Leadership</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Team - OceanCrest',
  description: 'Meet the crew behind OceanCrest - a diverse group of storytellers, developers, and creative professionals.',
  keywords: 'team, staff, creators, developers, storytellers, careers',
}

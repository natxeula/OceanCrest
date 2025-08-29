export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">About OceanCrest</h1>
                    <p className="hero-subtitle">We make what we love</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section" aria-labelledby="overview-title">
        <div className="container">
          <h2 id="overview-title" className="section-title">Our Story</h2>
          <div className="content-wrapper">
            <p className="large-text">
              At OceanCrest, we believe in the power of authentic storytelling. We create films based on real games, staying true to their essence while bringing fresh cinematic perspectives to beloved gaming worlds.
            </p>
            <p>
              Our mission is simple: make the movies we want to make with zero budget constraints. We're driven by passion, not profit, and we never ask for money from our community.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{background: 'var(--secondary-bg)'}} aria-labelledby="values-title">
        <div className="container">
          <h2 id="values-title" className="section-title">Our Values</h2>
          <div className="overview-grid">
            <article className="overview-card glass-card">
              <h3>🎮 Authenticity</h3>
              <p>We stay true to the games that inspire us, respecting their lore, characters, and world-building while adding our cinematic vision.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>💝 Passion-Driven</h3>
              <p>Every project we undertake is fueled by genuine love for storytelling and gaming. We create because we care, not for commercial gain.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>🤝 Community-Focused</h3>
              <p>We listen to our audience, value feedback, and ensure our community's voice shapes our creative decisions.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <h2 id="team-title" className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            A small but dedicated group of creators, each bringing unique skills and perspectives to our projects.
          </p>
          <div className="cta-buttons" style={{justifyContent: 'center', marginTop: '2rem'}}>
            <a href="/team" className="btn btn-primary">View Full Team</a>
            <a href="/leadership" className="btn btn-secondary">Leadership</a>
          </div>
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'About - OceanCrest',
  description: 'Learn about OceanCrest - A passionate team creating authentic game-based cinema.',
  keywords: 'about, company, film production, gaming, entertainment',
}

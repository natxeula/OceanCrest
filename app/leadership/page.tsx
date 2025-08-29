export default function LeadershipPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Leadership</h1>
          <p className="hero-subtitle">The visionaries guiding OceanCrest</p>
        </div>
      </section>

      {/* Leadership Overview */}
      <section className="section" aria-labelledby="leadership-overview-title">
        <div className="container">
          <h2 id="leadership-overview-title" className="section-title">Our Vision</h2>
          <div className="content-wrapper">
            <p className="large-text">
              Our leadership team is dedicated to fostering creativity, innovation, and authentic storytelling in everything we do.
            </p>
            <p>
              With diverse backgrounds in entertainment, technology, and business, our leaders bring the experience and vision necessary to guide OceanCrest into the future.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Roster */}
      <section className="section" style={{background: 'var(--secondary-bg)'}} aria-labelledby="leadership-roster-title">
        <div className="container">
          <h2 id="leadership-roster-title" className="section-title">Leadership Team</h2>
          <div className="overview-grid">
            <article className="overview-card glass-card">
              <h3>Natxeula</h3>
              <p>Executive / Founder</p>
            </article>
            <article className="overview-card glass-card">
              <h3>The Future</h3>
              <p>Admin. of Oversight</p>
            </article>
            <article className="overview-card glass-card">
              <h3>Shinoo</h3>
              <p>Lead of HR</p>
            </article>
            <article className="overview-card glass-card">
              <h3>Mr. 80</h3>
              <p>Overseer of Acting</p>
            </article>
            <article className="overview-card glass-card">
              <h3>Kat</h3>
              <p>Overseer of Marketing</p>
            </article>
            <article className="overview-card glass-card">
              <h3>Vita</h3>
              <p>Overseer of Cameras</p>
            </article>
            <article className="overview-card glass-card">
              <h3>springless</h3>
              <p>Overseer of Lore</p>
            </article>
          </div>
        </div>
      </section>

      {/* Leadership Principles */}
      <section className="section" aria-labelledby="principles-title">
        <div className="container">
          <h2 id="principles-title" className="section-title">Leadership Principles</h2>
          <div className="overview-grid">
            <article className="overview-card glass-card">
              <h3>🎯 Strategic Vision</h3>
              <p>We maintain a clear long-term vision while staying agile enough to adapt to new opportunities and challenges.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>🌱 Team Development</h3>
              <p>We invest in our team members, providing opportunities for growth, learning, and creative expression.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>💫 Creative Freedom</h3>
              <p>We foster an environment where creativity can flourish, encouraging bold ideas and innovative approaches.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>🤝 Community Focus</h3>
              <p>We prioritize our community and audience, ensuring their voices are heard in our creative process.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Leadership */}
      <section className="section" aria-labelledby="contact-title">
        <div className="container">
          <div className="text-center">
            <h2 id="contact-title" className="section-title">Connect with Leadership</h2>
            <p className="section-subtitle">
              Have questions, ideas, or want to discuss opportunities? We'd love to hear from you.
            </p>
            <div className="cta-buttons" style={{justifyContent: 'center', marginTop: '2rem'}}>
              <a href="/contact" className="btn btn-primary">Get in Touch</a>
              <a href="/team" className="btn btn-secondary">Meet the Team</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Leadership - OceanCrest',
  description: 'Meet the leadership team at OceanCrest - visionaries guiding our creative and strategic direction.',
  keywords: 'leadership, executives, management, vision, strategy',
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero" role="banner">
        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        
        {/* Particles */}
        <div className="particles-container">
          {Array.from({ length: 18 }, (_, i) => (
            <div 
              key={i}
              className="particle" 
              style={{ 
                left: `${10 + (i * 5)}%`, 
                animationDelay: `${i * 2}s` 
              }}
            />
          ))}
        </div>
        
        <div className="container">
          <div className={`hero-content fade-in ${isVisible ? 'visible' : ''}`}>
            <h1 className="hero-title">We make things we are proud of</h1>
            <p className="hero-subtitle">
              ...and have some fun along the way.
            </p>

            <div className="cta-buttons">
              <Link href="/projects" className="btn btn-primary">
                <span className="btn-text">WATCHERS</span>
                <span className="btn-subtext">Explore our films!</span>
              </Link>
              <Link href="/gaming" className="btn btn-primary">
                <span className="btn-text">PLAYERS</span>
                <span className="btn-subtext">Explore our games!</span>
              </Link>
              <Link href="/about" className="btn btn-secondary">
                <span className="btn-text">PARTNERS</span>
                <span className="btn-subtext">Get in touch</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section only-mobile" aria-labelledby="mobile-community-title">
        <div className="container">
          <h2 id="mobile-community-title" className="section-title">Join the OceanCrest community</h2>
          <p className="section-subtitle">Vote on ideas, get updates, and shape our next films.</p>
          <div className="cta-buttons">
            <a href="https://discord.gg/huDx4td5uA" className="btn btn-primary">
              <span className="btn-text">DISCORD</span>
              <span className="btn-subtext">Enter the server</span>
            </a>
            <a href="/faq" className="btn btn-secondary">
              <span className="btn-text">FAQ</span>
              <span className="btn-subtext">Common questions</span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section" aria-labelledby="about-title">
        <div className="container">
          <h2 id="about-title" className="section-title">About OceanCrest</h2>
          <p className="section-subtitle">A chill crew making films we love</p>

          <div className="overview-grid">
            <article className={`overview-card glass-card fade-in tilt-effect interactive-card ${isVisible ? 'visible' : ''}`}>
              <div className="card-icon" aria-hidden="true">🎮</div>
              <h3>Authentic Game Stories</h3>
              <p>
                Our films are based on real games, staying true to their essence while bringing fresh cinematic perspectives to beloved gaming worlds.
              </p>
              <div className="stat-display">
                <div className="live-counter">100</div>
                <small className="stat-label">% Game Accuracy</small>
              </div>
            </article>
            
            <article className={`overview-card glass-card fade-in tilt-effect interactive-card ${isVisible ? 'visible' : ''}`}>
              <div className="card-icon" aria-hidden="true">💝</div>
              <h3>Pure Passion</h3>
              <p>
                We create films we're genuinely excited about, with zero budget constraints. Our work is driven by love for storytelling, not profit.
              </p>
              <div className="stat-display">
                <div className="live-counter">0</div>
                <small className="stat-label">$ Budget Required</small>
              </div>
            </article>
            
            <article className={`overview-card glass-card fade-in tilt-effect interactive-card ${isVisible ? 'visible' : ''}`}>
              <div className="card-icon" aria-hidden="true">🤝</div>
              <h3>Community First</h3>
              <p>
                We actively listen to our community, embrace feedback, and ensure every voice is heard in our creative process.
              </p>
              <div className="stat-display">
                <div className="live-counter">95</div>
                <small className="stat-label">% Community Engagement</small>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section" aria-labelledby="projects-title">
        <div className="container">
          <h2 id="projects-title" className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Our current productions span multiple genres, each crafted with meticulous attention to detail and storytelling excellence.
          </p>

          <div className="overview-grid">
            <article className={`overview-card glass-card fade-in interactive-card project-card ${isVisible ? 'visible' : ''}`}>
              <header className="project-header">
                <h3>Authority: The Oath of Office Movie</h3>
                <div className="project-status status-released">
                  <span className="status-dot" aria-hidden="true"></span>
                  Available Now
                </div>
              </header>
              <p>
                Follow James "Jimmy" Washington as he rises during a time of national unrest. When President Sebastian Underwood tightens his grip on power, James embarks on a grueling campaign that will test everything he believes in.
              </p>
            </article>

            <article className={`overview-card glass-card fade-in interactive-card project-card ${isVisible ? 'visible' : ''}`}>
              <header className="project-header">
                <h3>Classified: A SCP Series</h3>
                <div className="project-status status-production">
                  <span className="status-dot" aria-hidden="true"></span>
                  In Production
                </div>
              </header>
              <p>
                This information is classified under Level-4 Personnel clearance. Expect unprecedented storytelling in the SCP universe later this year.
              </p>
            </article>

            <article className={`overview-card glass-card fade-in interactive-card project-card ${isVisible ? 'visible' : ''}`}>
              <header className="project-header">
                <h3>Future Productions</h3>
                <div className="project-status status-development">
                  <span className="status-dot" aria-hidden="true"></span>
                  Development
                </div>
              </header>
              <p>
                We're constantly exploring new gaming universes and stories that deserve the cinematic treatment. Stay tuned for exciting announcements.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section" aria-labelledby="contact-cta-title">
        <div className="container">
          <div className="contact-cta-wrapper">
            <div className="contact-cta">
              <h4 id="contact-cta-title">Want to make a movie for your game?</h4>
              <p>Let's discuss how we can bring your game to life!</p>
              <Link href="/contact" className="btn btn-primary">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

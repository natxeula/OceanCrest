export default function CapabilitiesPage() {
  const capabilities = [
    {
      icon: "🎬",
      title: "Film Production",
      description: "Full-scale film production from pre-production planning to post-production finishing, with expertise in game-based cinema."
    },
    {
      icon: "🎮",
      title: "Game Development",
      description: "Creating immersive gaming experiences across multiple platforms including console, PC, and mobile platforms."
    },
    {
      icon: "✨",
      title: "Visual Effects",
      description: "Cutting-edge VFX and post-production services to bring fantastical worlds and characters to life on screen."
    },
    {
      icon: "🎵",
      title: "Audio Production",
      description: "Professional audio recording, mixing, and sound design services for both films and interactive media."
    },
    {
      icon: "📝",
      title: "Storytelling",
      description: "Expert narrative development and script writing, specializing in adapting gaming universes for cinematic storytelling."
    },
    {
      icon: "🎯",
      title: "Project Management",
      description: "End-to-end project coordination ensuring timely delivery while maintaining the highest quality standards."
    }
  ]

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Our Capabilities</h1>
          <p className="hero-subtitle">Comprehensive entertainment production services</p>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <h2 id="capabilities-title" className="section-title">What We Do</h2>
          <p className="section-subtitle">
            From concept to completion, we handle every aspect of entertainment production with passion and precision.
          </p>
          
          <div className="overview-grid">
            {capabilities.map((capability, index) => (
              <article key={index} className="overview-card glass-card">
                <div className="capability-icon" style={{fontSize: '3rem', marginBottom: '1rem'}}>
                  {capability.icon}
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{background: 'var(--secondary-bg)'}} aria-labelledby="process-title">
        <div className="container">
          <h2 id="process-title" className="section-title">Our Process</h2>
          <div className="overview-grid">
            <article className="overview-card glass-card">
              <h3>1. Discovery</h3>
              <p>We work closely with you to understand your vision, goals, and target audience.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>2. Planning</h3>
              <p>Detailed project planning including timelines, resources, and creative direction.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>3. Production</h3>
              <p>Professional execution of your project with regular updates and quality checkpoints.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>4. Delivery</h3>
              <p>Final delivery with ongoing support and optimization based on audience feedback.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" aria-labelledby="cta-title">
        <div className="container">
          <div className="text-center">
            <h2 id="cta-title" className="section-title">Ready to Start Your Project?</h2>
            <p className="section-subtitle">
              Let's discuss how we can bring your vision to life.
            </p>
            <div className="cta-buttons" style={{justifyContent: 'center', marginTop: '2rem'}}>
              <a href="/contact" className="btn btn-primary">Get Started</a>
              <a href="/projects" className="btn btn-secondary">View Our Work</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Capabilities - OceanCrest',
  description: 'Comprehensive entertainment production services including film production, game development, VFX, and audio production.',
  keywords: 'capabilities, film production, game development, VFX, audio production, storytelling',
}

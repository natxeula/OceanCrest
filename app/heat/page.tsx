import Link from 'next/link'

export default function HeatPage() {
  const gameFeatures = [
    {
      icon: "🔥",
      title: "Intense Combat",
      description: "Face relentless waves of enemies in fast-paced, adrenaline-pumping shooter action."
    },
    {
      icon: "🏜️", 
      title: "Desert Warfare",
      description: "Battle through harsh desert environments with dynamic weather and terrain challenges."
    },
    {
      icon: "♾️",
      title: "Infinite Survival",
      description: "Test your skills in endless survival mode with increasing difficulty and rewards."
    },
    {
      icon: "🎯",
      title: "Tactical Gameplay",
      description: "Strategic positioning and resource management are key to surviving the longest."
    }
  ]

  const gameSpecs = [
    { label: "Genre", value: "Action Shooter" },
    { label: "Players", value: "Multiplayer" },
    { label: "Mode", value: "Infinite Survival" },
    { label: "Platform", value: "PS5, Xbox, PC" },
    { label: "Release", value: "Coming Soon" },
    { label: "Developer", value: "OceanCrest" }
  ]

  return (
    <>
      {/* Game Hero */}
      <section className="gaming-hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="gaming-title">HEAT</h1>
            <p className="hero-subtitle" style={{fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto'}}>
              Survive the hoards in the desert. Face endless waves of enemies in this intense multiplayer survival shooter.
            </p>
            <div className="cta-buttons" style={{marginTop: '2.5rem'}}>
              <Link href="/contact" className="btn btn-primary">Get Notified</Link>
              <Link href="/gaming" className="btn btn-secondary">Back to Games</Link>
            </div>
            <div style={{marginTop: '2rem'}}>
              <span className="project-status-badge status-production">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Game Overview */}
      <section className="section" aria-labelledby="overview-title">
        <div className="container">
          <h2 id="overview-title" className="section-title">Game Overview</h2>
          <div className="content-wrapper">
            <p className="large-text">
              HEAT throws players into the scorching desert where survival is the only objective. Face endless waves of increasingly difficult enemies in this intense multiplayer shooter experience.
            </p>
            <p>
              Master the art of desert warfare as you navigate harsh environments, manage limited resources, and coordinate with your team to survive as long as possible. Every decision matters when the heat is on.
            </p>
          </div>
        </div>
      </section>

      {/* Game Features */}
      <section className="section" style={{background: 'var(--secondary-bg)'}} aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="section-title">Key Features</h2>
          <div className="overview-grid">
            {gameFeatures.map((feature, index) => (
              <article key={index} className="overview-card glass-card">
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Game Specifications */}
      <section className="section" aria-labelledby="specs-title">
        <div className="container">
          <h2 id="specs-title" className="section-title">Game Information</h2>
          <div className="featured-project">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              margin: '2rem 0'
            }}>
              {gameSpecs.map((spec, index) => (
                <div key={index} style={{
                  padding: '1.5rem',
                  background: 'var(--glass-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    {spec.label}
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600'
                  }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gameplay Mechanics */}
      <section className="section" style={{background: 'var(--secondary-bg)'}} aria-labelledby="gameplay-title">
        <div className="container">
          <h2 id="gameplay-title" className="section-title">Survival Mechanics</h2>
          <div className="overview-grid">
            <article className="overview-card glass-card">
              <h3>🌡️ Environmental Hazards</h3>
              <p>Battle not just enemies but the harsh desert environment itself, with extreme temperatures and sandstorms affecting gameplay.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>🎒 Resource Management</h3>
              <p>Manage ammunition, water, and equipment carefully as resources become scarcer with each passing wave.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>🏆 Progressive Difficulty</h3>
              <p>Face increasingly challenging enemy waves with new enemy types, improved AI, and more complex attack patterns.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>👥 Team Coordination</h3>
              <p>Work together with your squad to establish defensive positions and coordinate tactical maneuvers.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="section" aria-labelledby="status-title">
        <div className="container">
          <h2 id="status-title" className="section-title">Development Status</h2>
          <div className="content-wrapper">
            <p className="large-text">
              HEAT is currently in active development with exciting progress on core gameplay mechanics and multiplayer systems.
            </p>
            <p>
              Stay updated on our development progress and be among the first to know when beta testing begins. Join our community for exclusive previews and behind-the-scenes content.
            </p>
            <div className="cta-buttons" style={{justifyContent: 'center', marginTop: '2rem'}}>
              <Link href="/contact" className="btn btn-primary">Join Beta List</Link>
              <Link href="/gaming" className="btn btn-secondary">More Games</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'HEAT - OceanCrest',
  description: 'Survive the hoards in the desert. An intense multiplayer survival shooter experience from OceanCrest.',
  keywords: 'heat, game, shooter, survival, multiplayer, desert, action, gaming, oceancrest',
}

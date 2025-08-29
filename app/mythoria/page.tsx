import Link from 'next/link'

export default function MythoriaPage() {
  const gameFeatures = [
    {
      icon: "🌌",
      title: "Expansive Universe",
      description: "Explore the vast sci-fi world of Thlassa with detailed environments and immersive storytelling."
    },
    {
      icon: "⚔️", 
      title: "Combat System",
      description: "Collect powerful weapons and engage in strategic combat to defend The Central."
    },
    {
      icon: "👥",
      title: "Multiplayer Support",
      description: "Play solo or team up with friends in cooperative multiplayer modes."
    },
    {
      icon: "🎮",
      title: "Cross-Platform",
      description: "Available on PS5, Xbox, and PC with cross-platform compatibility."
    }
  ]

  const gameSpecs = [
    { label: "Genre", value: "Science Fiction" },
    { label: "Players", value: "Single & Multiplayer" },
    { label: "Platform", value: "PS5, Xbox, PC" },
    { label: "Release", value: "First Pre-Alpha August 2025" },
    { label: "Developer", value: "OceanCrest" },
    { label: "Rating", value: "Pending ESRB Rating" }
  ]

  return (
    <>
      {/* Game Hero */}
      <section className="gaming-hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="gaming-title">Mythoria</h1>
            <p className="hero-subtitle" style={{fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto'}}>
              Arrive in Thlassa, collect several weapons, and protect The Central from the enemies at all costs.
            </p>
            <div className="cta-buttons" style={{marginTop: '2.5rem'}}>
              <a 
                href="https://www.roblox.com/games/113342217515713/Mythoria" 
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Play Now on Roblox
              </a>
              <Link href="/gaming" className="btn btn-secondary">Back to Games</Link>
            </div>
            <div style={{marginTop: '2rem'}}>
              <span className="project-status-badge status-available">
                First Pre-Alpha August 2025
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
              Mythoria is an ambitious science fiction experience set in the mysterious world of Thlassa. Players must navigate this alien landscape, gather powerful weapons, and stand as the last line of defense for The Central.
            </p>
            <p>
              Combining elements of exploration, strategy, and action, Mythoria offers both single-player campaigns and multiplayer cooperative modes. Experience cutting-edge gameplay mechanics and immersive storytelling in this next-generation gaming experience.
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

      {/* Development Updates */}
      <section className="section" style={{background: 'var(--secondary-bg)'}} aria-labelledby="updates-title">
        <div className="container">
          <h2 id="updates-title" className="section-title">Development Progress</h2>
          <div className="content-wrapper">
            <p className="large-text">
              Mythoria is currently in active development with the first Pre-Alpha release scheduled for August 2025.
            </p>
            <p>
              Follow our development journey and get exclusive updates on new features, gameplay mechanics, and behind-the-scenes content. Join our community to be among the first to experience this groundbreaking sci-fi adventure.
            </p>
            <div className="cta-buttons" style={{justifyContent: 'center', marginTop: '2rem'}}>
              <Link href="/contact" className="btn btn-primary">Get Updates</Link>
              <Link href="/gaming" className="btn btn-secondary">More Games</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Mythoria - OceanCrest',
  description: 'Arrive in Thlassa, collect several weapons, and protect The Central from the enemies at all costs. A science fiction gaming experience from OceanCrest.',
  keywords: 'mythoria, game, science fiction, sci-fi, thlassa, gaming, multiplayer, roblox, oceancrest',
}

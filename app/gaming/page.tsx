import Link from 'next/link'

export default function GamingPage() {
  const games = [
    {
      title: "Mythoria",
      genre: "Science Fiction",
      description: "Arrive in Thlassa, collect several weapons, and protect The Central from the enemies at all costs.",
      details: {
        genre: "Science Fiction",
        players: "Single & Multiplayer",
        expansions: "None Available",
        platform: "PS5, Xbox, PC"
      },
      status: "First Pre-Alpha August 2025",
      statusClass: "status-available",
      links: [
        { text: "Learn More", href: "/mythoria", primary: true },
        { text: "Play Now", href: "https://www.roblox.com/games/113342217515713/Mythoria", primary: false }
      ]
    },
    {
      title: "HEAT",
      genre: "Shooter",
      description: "Survive the hoards in the desert.",
      details: {
        genre: "Action",
        players: "Multiplayer",
        mode: "Infinite Survival",
        platform: "PS5, Xbox, PC"
      },
      status: "Coming Soon",
      statusClass: "status-production"
    },
    {
      title: "Secure. Contain. Protect.",
      genre: "Horror/Roleplay",
      description: "An upcoming Roblox game where you can either play a story mode or a roleplay mode, set in a custom Site 1110. Experience the world of the SCP Foundation in an immersive environment.",
      details: {
        genre: "Horror/Roleplay",
        players: "Multiplayer",
        modes: "Story & Roleplay",
        platform: "Roblox"
      },
      status: "In Development",
      statusClass: "status-development"
    },
    {
      title: "Air Clicker: Legacy",
      genre: "Clicker Game",
      description: "The original Air Clicker game where you click air! Features two special events: The Mafia and Summer Sacred. Experience the classic gameplay that started it all.",
      details: {
        genre: "Idle/Clicker",
        players: "Single Player",
        events: "The Mafia & Summer Sacred",
        platform: "Roblox"
      },
      status: "Available Now",
      statusClass: "status-available"
    },
    {
      title: "Air Clicker: Remastered",
      genre: "Clicker Game",
      description: "The enhanced version of Air Clicker with improved features, better graphics, and new gameplay mechanics. Building upon the success of Legacy with a completely revamped experience.",
      details: {
        genre: "Idle/Clicker",
        players: "Single Player",
        features: "Enhanced & New Content",
        platform: "Roblox"
      },
      status: "Coming Soon",
      statusClass: "status-development"
    },
    {
      title: "What's Next?",
      genre: "Future Projects",
      description: "We always think about creating more experiences for you all.",
      details: {},
      status: "Coming Soon",
      statusClass: "status-development",
      links: [
        { text: "Stay Updated", href: "/contact", primary: true }
      ]
    }
  ]

  return (
    <>
      <section className="gaming-hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="gaming-title">Game Development Studio</h1>
            <p className="hero-subtitle" style={{fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto'}}>
              In addition to movies, we make games!
            </p>
                        <div className="cta-buttons" style={{marginTop: '2.5rem'}}>
              <a href="#games" className="btn btn-primary">Explore Our Games</a>
              <Link href="/mythoria" className="btn btn-secondary">Play Mythoria</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section parallax-section fade-in" id="games">
        <div className="container">
          <h2 className="section-title">Our Games</h2>
          <p className="section-subtitle">
            Discover our game portfolio spanning multiple genres and platforms!
          </p>

          {games.map((game, index) => (
            <div key={index} className="featured-project fade-in">
              <h3 style={{fontSize: '1.8rem', marginBottom: '0.5rem'}}>{game.title}</h3>
              <span style={{color: 'var(--accent-blue)', fontWeight: '600'}}>{game.genre}</span>
              <p style={{margin: '1.5rem 0', fontSize: '1.1rem', lineHeight: '1.6'}}>
                {game.description}
              </p>
              
              {Object.keys(game.details).length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  margin: '1.5rem 0'
                }}>
                  {Object.entries(game.details).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                    </div>
                  ))}
                </div>
              )}

              {game.links && (
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                  {game.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className={`btn ${link.primary ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        fontSize: '1.1rem',
                        padding: '1rem 2rem',
                        marginRight: linkIndex < game.links.length - 1 ? '1rem' : '0'
                      }}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}

              <span className={`project-status-badge ${game.statusClass}`}>
                {game.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Game Development - OceanCrest',
  description: "OceanCrest's game development studio - creating immersive gaming experiences including Mythoria, HEAT, Secure. Contain. Protect., and Air Clicker",
  keywords: 'gaming, games, game development, mythoria, heat, scp, air clicker, roblox, oceancrest',
}

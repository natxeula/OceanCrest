import Link from 'next/link'

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer-brand">
                    <p className="footer-tagline">Chill vibes, real stories.</p>
        </div>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Production</h4>
            <Link href="/about">About</Link>
            <Link href="/capabilities">Capabilities</Link>
            <Link href="/projects">Projects</Link>
          </div>
          <div className="footer-section">
            <h4>Gaming</h4>
            <Link href="/gaming">All Games</Link>
            <Link href="/mythoria">Mythoria</Link>
            <Link href="/heat">HEAT</Link>
          </div>
          <div className="footer-section">
            <h4>Join The Team</h4>
            <Link href="/team">Team</Link>
            <Link href="/leadership">Leadership</Link>
            <Link href="/careers">Careers</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 OceanCrest. All rights reserved.</p>
          <p>
            <Link href="/contact" className="gradient-link">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

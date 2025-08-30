'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
        <div className="container">
          <div className="header-container">
            {/* Logo */}
            <Link href="/" className="logo" aria-label="OceanCrest Home">
              <span className="logo-icon">🎬</span>
              OCEANCREST
            </Link>

            {/* Mobile Navigation Toggle */}
            <button 
              className={`mobile-nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobileNavOverlay"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" role="navigation" aria-label="Main navigation">
              <ul className="nav-links">
                <li>
                  <Link href="/about">
                    About & Story
                  </Link>
                </li>
                <li>
                  <Link href="/projects">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/gaming">
                    Games
                  </Link>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                    For Business
                    <span className="dropdown-arrow" aria-hidden="true">▼</span>
                  </a>
                  <div className="dropdown-menu" role="menu">
                    <Link href="/team" role="menuitem">Team</Link>
                    <Link href="/leadership" role="menuitem">Leadership</Link>
                    <Link href="/careers" role="menuitem">Careers</Link>
                  </div>
                </li>
              </ul>
              
              <div className="nav-actions">
                <Link href="/contact" className="nav-btn nav-btn-quote">Contact us</Link>
                <Link href="/projects" className="nav-btn nav-btn-code">View work</Link>
                <Link href="/careers" className="nav-btn nav-btn-signup">Join team</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        id="mobileNavOverlay" 
        role="dialog" 
        aria-modal="true" 
        aria-label="Mobile navigation"
      >
        <nav className="mobile-nav-menu" role="navigation" aria-label="Mobile menu">
          <Link href="/" className="mobile-nav-link" onClick={closeMobileMenu}>🏠 Home</Link>
          <Link href="/about" className="mobile-nav-link" onClick={closeMobileMenu}>ℹ️ About</Link>
          <Link href="/projects" className="mobile-nav-link" onClick={closeMobileMenu}>🎬 Projects</Link>
          <Link href="/gaming" className="mobile-nav-link" onClick={closeMobileMenu}>🎮 Gaming</Link>
          <Link href="/team" className="mobile-nav-link" onClick={closeMobileMenu}>👥 Team</Link>
          <Link href="/leadership" className="mobile-nav-link" onClick={closeMobileMenu}>👑 Leadership</Link>
          <Link href="/careers" className="mobile-nav-link" onClick={closeMobileMenu}>💼 Careers</Link>
          <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>📞 Contact</Link>
        </nav>
      </div>
    </>
  )
}

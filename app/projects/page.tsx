'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'released' | 'production' | 'development'>('all')

  const projects = [
    {
      id: 1,
      title: "Authority: The Oath of Office Movie",
      category: "released" as const,
      status: "Available Now",
      statusClass: "status-released",
      description: "James \"Jimmy\" Washington, rises during a time of national unrest. When the President Sebastian Underwood tightens his grip on power, James runs. With his best friend Owen, James wages a grueling campaign-facing the political world.",
      tags: ["Political Drama"],
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      linkText: "Watch on YouTube now!",
      disabled: false
    },
    {
      id: 2,
      title: "Classified: A SCP Series",
      category: "production" as const,
      status: "In Production",
      statusClass: "status-production",
      description: "This information is classified under Level-4 Personnel. More details later this year.",
      tags: ["Horror", "SCP Foundation"],
      link: "#",
      linkText: "Coming Soon",
      disabled: true
    },
    {
      id: 3,
      title: "Future Productions",
      category: "development" as const,
      status: "Development",
      statusClass: "status-development",
      description: "We're constantly exploring new gaming universes and stories that deserve the cinematic treatment. Stay tuned for exciting announcements.",
      tags: ["TBA"],
      link: "#",
      linkText: "TBA",
      disabled: true
    }
  ]

  const counts = useMemo(() => ({
    all: projects.length,
    released: projects.filter(p => p.category === 'released').length,
    production: projects.filter(p => p.category === 'production').length,
    development: projects.filter(p => p.category === 'development').length,
  }), [projects])

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  const handleFilterChange = (filter: 'all' | 'released' | 'production' | 'development') => {
    setActiveFilter(filter)
  }

  // Subtle reveal on scroll
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>('.project-card.fade-in'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    }, { threshold: 0.15 })
    items.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [activeFilter])

  // Subtle tilt hover
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - y) * 4
    const ry = (x - 0.5) * 4
    el.style.transform = `translateY(-6px) scale(1.01) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement
    el.style.transform = ''
  }

  const onFilterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const order: Array<'all' | 'released' | 'production' | 'development'> = ['all','released','production','development']
    const idx = order.indexOf(activeFilter)
    if (e.key === 'ArrowRight') setActiveFilter(order[(idx + 1) % order.length])
    if (e.key === 'ArrowLeft') setActiveFilter(order[(idx - 1 + order.length) % order.length])
  }

  return (
    <>
      {/* Project Hero */}
      <section className="project-hero" role="banner">
        <div className="container">
          <h1 className="section-title">Our Projects</h1>
          <p className="section-subtitle">
            Current slate of productions spanning multiple genres, each crafted with meticulous attention to detail and narrative depth.
          </p>
        </div>
      </section>

      {/* Project Filters */}
      <section className="section" aria-labelledby="projects-section">
        <div className="container" ref={containerRef}>
          <div className="project-filters" role="group" aria-label="Project filters" tabIndex={0} onKeyDown={onFilterKey}>
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All Projects
              <span className="filter-count" aria-hidden="true">{counts.all}</span>
            </button>
            <button
              className={`filter-btn ${activeFilter === 'released' ? 'active' : ''}`}
              onClick={() => handleFilterChange('released')}
            >
              Released
              <span className="filter-count" aria-hidden="true">{counts.released}</span>
            </button>
            <button
              className={`filter-btn ${activeFilter === 'production' ? 'active' : ''}`}
              onClick={() => handleFilterChange('production')}
            >
              In Production
              <span className="filter-count" aria-hidden="true">{counts.production}</span>
            </button>
            <button
              className={`filter-btn ${activeFilter === 'development' ? 'active' : ''}`}
              onClick={() => handleFilterChange('development')}
            >
              Development
              <span className="filter-count" aria-hidden="true">{counts.development}</span>
            </button>
          </div>

          {/* Featured Projects */}
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="overview-card glass-card project-card interactive fade-in">
                <div
                  className="project-content"
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                >
                  <h2>{project.title}</h2>
                  <div className={`project-status ${project.statusClass}`}>
                    <span className="status-dot" aria-hidden="true"></span>
                    {project.status}
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((t) => (
                      <span key={t} className="tag-chip">{t}</span>
                    ))}
                  </div>
                  <div className="project-action">
                    {project.disabled ? (
                      <span className="project-link disabled">{project.linkText}</span>
                    ) : (
                      <a href={project.link} className="project-link" target="_blank" rel="noreferrer noopener">{project.linkText}</a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action */}
          <div className="section-cta">
            <h3 className="section-cta-title">Have a Game Story to Tell?</h3>
            <p className="section-cta-text">We're always looking for new gaming universes to bring to life through cinema.</p>
            <a href="/contact" className="btn btn-primary" style={{padding: '1rem 2rem'}}>
              Pitch Your Project
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

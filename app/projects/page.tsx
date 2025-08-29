'use client'

import { useState } from 'react'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "Authority: The Oath of Office Movie",
      category: "released",
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
      category: "production",
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
      category: "development",
      status: "Development",
      statusClass: "status-development",
      description: "We're constantly exploring new gaming universes and stories that deserve the cinematic treatment. Stay tuned for exciting announcements.",
      tags: ["TBA"],
      link: "#",
      linkText: "TBA",
      disabled: true
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
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
        <div className="container">
          <div className="project-filters" role="group" aria-label="Project filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All Projects
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'released' ? 'active' : ''}`}
              onClick={() => handleFilterChange('released')}
            >
              Released
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'production' ? 'active' : ''}`}
              onClick={() => handleFilterChange('production')}
            >
              In Production
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'development' ? 'active' : ''}`}
              onClick={() => handleFilterChange('development')}
            >
              Development
            </button>
          </div>

          {/* Featured Projects */}
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="overview-card glass-card project-card">
                <div className="project-content">
                  <h2>{project.title}</h2>
                  <div className={`project-status ${project.statusClass}`}>
                    <span className="status-dot" aria-hidden="true"></span>
                    {project.status}
                  </div>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action */}
          <div className="section-cta" style={{
            textAlign: 'center', 
            marginTop: '4rem', 
            padding: '3rem', 
            background: 'var(--glass-bg)', 
            borderRadius: '20px', 
            border: '1px solid var(--border-color)', 
            backdropFilter: 'blur(20px)'
          }}>
            <h3 style={{fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-primary)'}}>
              Have a Game Story to Tell?
            </h3>
            <p style={{color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem'}}>
              We're always looking for new gaming universes to bring to life through cinema.
            </p>
            <a href="/contact" className="btn btn-primary" style={{padding: '1rem 2rem'}}>
              Pitch Your Project
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

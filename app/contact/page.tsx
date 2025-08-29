export default function ContactPage() {
  const contactMethods = [
    {
      icon: "💬",
      title: "Discord",
      description: "Join our community and chat with the team directly.",
      actionLabel: "Join Discord",
      href: "https://discord.gg/huDx4td5uA"
    },
    {
      icon: "🐦",
      title: "Social Media",
      description: "Follow us for updates and behind-the-scenes content.",
      actionLabel: "@CrestedEnt",
      href: "https://x.com/CrestedEnt"
    }
  ]

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Get in Touch</h1>
          <p className="hero-subtitle">We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section" aria-labelledby="contact-methods-title">
        <div className="container">
          <h2 id="contact-methods-title" className="section-title">Ways to Reach Us</h2>
          <div className="overview-grid">
            {contactMethods.map((method, index) => (
              <article key={index} className="overview-card glass-card">
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{method.icon}</div>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
                <div style={{marginTop: '1rem', fontWeight: '600'}}>
                  <a href={method.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    {method.actionLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <h2 id="faq-title" className="section-title">Frequently Asked Questions</h2>
          <div className="overview-grid">
            <article className="overview-card glass-card">
              <h3>How can I pitch a project?</h3>
              <p>Join our Discord and share a proposal with a member of the Creative Depeartment!.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>How can I join your team?</h3>
              <p>Join our Discord to get involved or visit our careers page for general information.</p>
            </article>
            <article className="overview-card glass-card">
              <h3>What's your response time?</h3>
              <p>We typically respond within 24-48 hours, if not earlier.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

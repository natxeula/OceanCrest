export default function FAQPage() {
  const faqs = [
    {
      q: 'What is the “generic clicking game (Air Clicker Remasted)”?',
      a: 'A fun tap/click idle experience built for quick sessions and chill progression. It reimagines the classic Air Clicker with fresh polish.'
    },
    {
      q: 'When does it release?',
      a: 'Target: September 30th. The live timer in the header shows the exact countdown based on your time zone.'
    },
    {
      q: 'What time does the countdown end?',
      a: 'At local midnight for your time zone unless otherwise announced. If timing changes, the timer will update automatically.'
    },
    {
      q: 'Which platforms will it be on?',
      a: 'We will share platform details closer to launch. Watch the header timer and Discord for updates.'
    },
    {
      q: 'Can I pre-register or join a beta?',
      a: 'Join our Discord to get notified about playtests and early access opportunities.'
    },
    {
      q: 'Where do I get updates?',
      a: 'Check the notification bar on this site and join our Discord for announcements and Q&A.'
    },
    {
      q: 'Will my progress carry over after launch?',
      a: 'If we run tests, we will announce whether progress resets. We aim to keep things fair for launch.'
    }
  ]

  return (
    <>
      <section className="page-hero" role="banner">
        <div className="container">
          <h1 className="page-title">Generic Clicking Game FAQ</h1>
          <p className="hero-subtitle">All about “Air Clicker Remasted” and the release countdown</p>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <h2 id="faq-title" className="section-title">Common Questions</h2>
          <div className="overview-grid">
            {faqs.map((item, i) => (
              <article key={i} className="overview-card glass-card">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: 'Generic Clicking Game FAQ - OceanCrest',
  description: 'Frequently asked questions about the “generic clicking game (Air Clicker Remasted)” release and countdown.',
  keywords: 'faq, air clicker remasted, clicking game, release, countdown, oceancrest'
}

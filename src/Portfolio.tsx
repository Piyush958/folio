import { useEffect } from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import { Gallery, Projects, Testimonials, CTA } from './components/Gallery'
import FAQ from './components/FAQ'
import Pricing from './components/Pricing'
import type { PortfolioContent } from './types'
import BackgroundScene from './components/BackgroundScene'
import SectionHeader from './components/SectionHeader'

const beforeImg = '/beforeopt.jpg'
const afterImg = '/afteropt.jpg'

const Portfolio = ({ content }: { content: PortfolioContent }) => {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--bg', content.theme.background)
    root.style.setProperty('--accent', content.theme.accent)
    root.style.setProperty('--accent-2', content.theme.accent2)
    root.style.setProperty('--text', content.theme.text)
    root.style.setProperty('--panel', content.theme.card)
    if (content.theme.backgroundImage) {
      root.style.setProperty('--bg-image', `url(${content.theme.backgroundImage})`)
    } else {
      root.style.removeProperty('--bg-image')
    }
  }, [content.theme])

  const renderSection = (key: string) => {
    switch (key) {
      case 'performance':
        return (
          <section className="section motion" key={key} id="performance">
            <SectionHeader title="Performance before/after" detail="PSI screenshots that show the delta" />
            <div className="optim-grid">
              <div className="card">
                <h3>Before</h3>
                <p className="muted">Pre-optimization</p>
                <div className="optim-img" style={{ backgroundImage: `url(${beforeImg})` }} />
              </div>
              <div className="card">
                <h3>After</h3>
                <p className="muted">Post-optimization</p>
                <div className="optim-img" style={{ backgroundImage: `url(${afterImg})` }} />
              </div>
            </div>
          </section>
        )
      case 'hero':
        return <Hero key={key} heroContent={content.heroContent} stats={content.stats} heroImage={content.theme.heroImage} />
      case 'services':
        return <Services key={key} services={content.services} />
      case 'experience':
        return <Experience key={key} experience={content.experience} />
      case 'skills':
        return <Skills key={key} skills={content.skills} />
      case 'education':
        return <Education key={key} education={content.education} />
      case 'gallery':
        return <Gallery key={key} items={content.gallery} />
      case 'projects':
        return <Projects key={key} projects={content.projects} />
      case 'pricing':
        return <Pricing key={key} plans={content.pricing} />
      case 'faq':
        return <FAQ key={key} faq={content.faq} />
      case 'testimonials':
        return <Testimonials key={key} items={content.testimonials} />
      case 'cta':
        return <CTA key={key} cta={content.cta} />
      case 'contact':
        return <Contact key={key} contact={content.contact} />
      case 'custom':
        return content.customSections.map((c, i) => (
          <section className="section motion" key={`custom-${i}`}>
            <div className="section-heading">
              <span className="dot" />
              <div>
                <h2>{c.title}</h2>
              </div>
            </div>
            <p>{c.body}</p>
            {c.bullets.length > 0 && (
              <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                {c.bullets.map((b) => (
                  <li key={b} style={{ color: 'var(--muted)' }}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))
      default:
        return null
    }
  }

  return (
    <>
      {content.theme.stars && <BackgroundScene />}
      <header className="nav">
        <div className="brand">PD</div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#experience">Work</a>
          <a href="#skills">Skills</a>
          <a href="#education">Edu</a>
          <a href="#contact">Contact</a>
        </div>
      </header>
      {content.sectionsOrder.map((s) => renderSection(s))}
      {content.theme.customCss && <style>{content.theme.customCss}</style>}
    </>
  )
}

export default Portfolio

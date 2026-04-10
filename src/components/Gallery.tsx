import type { GalleryItem, ProjectItem, TestimonialItem, CtaBlock } from '../types'
import SectionHeader from './SectionHeader'

const Gallery = ({ items }: { items: GalleryItem[] }) => {
  if (!items.length) return null
  return (
    <section className="section motion" id="gallery">
      <SectionHeader title="Gallery" detail="Snapshots of work" />
      <div className="card-grid">
        {items.map((g, idx) => (
          <div className="card" key={idx}>
            {g.image && <div className="gallery-thumb" style={{ backgroundImage: `url(${g.image})` }} />}
            <h3>{g.title}</h3>
            <p>{g.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const Projects = ({ projects }: { projects: ProjectItem[] }) => {
  if (!projects.length) return null
  return (
    <section className="section motion" id="projects">
      <SectionHeader title="Projects" detail="Select deliveries" />
      <div className="card-grid">
        {projects.map((p, idx) => (
          <div className="card" key={idx}>
            {p.image && <div className="gallery-thumb" style={{ backgroundImage: `url(${p.image})`, height: 140 }} />}
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            {p.link && <a className="btn" href={p.link} target="_blank" rel="noreferrer">View</a>}
          </div>
        ))}
      </div>
    </section>
  )
}

const Testimonials = ({ items }: { items: TestimonialItem[] }) => {
  if (!items.length) return null
  return (
    <section className="section motion" id="testimonials">
      <SectionHeader title="Testimonials" detail="Proof from clients" />
      <div className="card-grid">
        {items.map((t, idx) => (
          <div className="card" key={idx}>
            <p style={{ fontStyle: 'italic' }}>{t.quote}</p>
            <p style={{ marginTop: 8, color: 'var(--muted)' }}>{t.name} · {t.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const CTA = ({ cta }: { cta: CtaBlock | null }) => {
  if (!cta) return null
  return (
    <section className="section motion" id="cta">
      <div className="section-heading">
        <span className="dot" />
        <div>
          <h2>{cta.heading}</h2>
          <span>{cta.subheading}</span>
        </div>
      </div>
      <div className="button-row">
        <a className="btn primary" href={cta.buttonLink}>{cta.buttonText}</a>
      </div>
    </section>
  )
}

export { Gallery, Projects, Testimonials, CTA }

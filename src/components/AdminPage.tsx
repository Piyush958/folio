import { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import type {
  SiteData,
  PortfolioContent,
  Service,
  ExperienceItem,
  SkillGroup,
  EducationItem,
  Stat,
  CustomSection,
  FaqItem,
  PricingItem,
  GalleryItem,
  ProjectItem,
  TestimonialItem,
  Page,
} from '../types'
import Portfolio from '../Portfolio'
import { defaultContent } from '../content'
import { v4 as uuidv4 } from 'uuid'

const password = 'admin123'
const sectionPalette = ['hero', 'services', 'experience', 'projects', 'skills', 'gallery', 'pricing', 'faq', 'custom', 'testimonials', 'cta', 'education', 'contact']

const factories = {
  service: (): Service => ({ title: '', tagline: '', bullets: [''] }),
  experience: (): ExperienceItem => ({ year: '', role: '', company: '', period: '', points: [''] }),
  skill: (): SkillGroup => ({ title: '', items: [''] }),
  edu: (): EducationItem => ({ degree: '', school: '', years: '', focus: '' }),
  stat: (): Stat => ({ label: '', value: '' }),
  custom: (): CustomSection => ({ title: 'New Section', body: 'Write something...', bullets: [] }),
  faq: (): FaqItem => ({ q: '', a: '' }),
  pricing: (): PricingItem => ({ title: '', subtitle: '', price: '', features: [] }),
  gallery: (): GalleryItem => ({ title: '', desc: '', image: '' }),
  project: (): ProjectItem => ({ title: '', desc: '', link: '', image: '' }),
  testimonial: (): TestimonialItem => ({ quote: '', name: '', role: '' }),
  cta: () => ({ heading: '', subheading: '', buttonText: '', buttonLink: '' }),
}

const addItem = <T,>(list: T[], setter: (l: T[]) => void, factory: () => T) => setter([...list, factory()])
const removeItem = <T,>(list: T[], setter: (l: T[]) => void, idx: number) => setter(list.filter((_, i) => i !== idx))

const splitLines = (val: string) => val.split(/\n+/).map((s) => s.trim()).filter(Boolean)
const readFileAsDataUrl = (file: File): Promise<string> => new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result as string); r.onerror = () => reject(r.error); r.readAsDataURL(file); })

function AdminPage({ data, onUpdate, onBack }: { data: SiteData; onUpdate: (d: SiteData) => void; onBack: () => void }) {
  const [authed, setAuthed] = useState(false)
  const [site, setSite] = useState<SiteData>(data)
  const [currentPageId, setCurrentPageId] = useState<string>(data.pages[0]?.id || '')
  const [msg, setMsg] = useState('')
  const [pwInput, setPwInput] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { setSite(data); if (data.pages[0]) setCurrentPageId(data.pages[0].id) }, [data])

  const currentPage = site.pages.find((p) => p.id === currentPageId) || site.pages[0]
  const form = currentPage?.content || defaultContent

  const updatePageContent = (content: PortfolioContent) => {
    const pages = site.pages.map((p) => (p.id === currentPageId ? { ...p, content } : p))
    setSite({ ...site, pages })
  }

  const updateTheme = (key: keyof PortfolioContent['theme'], value: any) => updatePageContent({ ...form, theme: { ...form.theme, [key]: value } })
  const updateHero = (key: keyof typeof form.heroContent, value: string) => updatePageContent({ ...form, heroContent: { ...form.heroContent, [key]: value } })

  const updateList = <T extends { [k: string]: any }>(list: T[], setter: (l: T[]) => void, idx: number, key: string, value: any) => {
    const copy = [...list]; copy[idx] = { ...copy[idx], [key]: value }; setter(copy)
  }
  const setContentField = (key: keyof PortfolioContent, value: any) => updatePageContent({ ...form, [key]: value })

  const addPage = () => {
    const id = uuidv4()
    const newPage: Page = { id, name: 'New Page', slug: `/page-${site.pages.length + 1}`, content: JSON.parse(JSON.stringify(defaultContent)) }
    setSite({ ...site, pages: [...site.pages, newPage] }); setCurrentPageId(id)
  }
  const deletePage = (id: string) => {
    if (site.pages.length === 1) return
    const pages = site.pages.filter((p) => p.id !== id)
    setSite({ ...site, pages }); setCurrentPageId(pages[0].id)
  }

  const saveSite = async (goHome = false) => {
    setSaving(true)
    onUpdate(site)
    await new Promise((r) => setTimeout(r, 500))
    setSaving(false)
    setMsg('Saved. (Local browser + preview updated)')
    if (goHome) onBack()
  }
  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(site, null, 2))
    setMsg('JSON copied')
  }
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(site, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'site-data.json'; a.click()
    URL.revokeObjectURL(url)
  }
  const uploadJson = async (file: File | null) => {
    if (!file) return
    try {
      const text = await file.text()
      const parsed = JSON.parse(text) as SiteData
      setSite(parsed); onUpdate(parsed); setCurrentPageId(parsed.pages[0]?.id || ''); setMsg('Imported JSON & applied')
    } catch (e) {
      setMsg('Invalid JSON file')
    }
  }

  if (!authed) {
    return (
      <div className="login-shell">
        <div className="card-mini">
          <h2>Admin Login</h2>
          <input type="password" placeholder="Password" value={pwInput} onChange={(e) => setPwInput(e.target.value)} />
          <div className="button-row" style={{ marginTop: 10 }}>
            <button className="btn primary" onClick={() => { if (pwInput === password) { setAuthed(true); setMsg(''); } else setMsg('Wrong password'); }}>Enter</button>
            <button className="btn" onClick={onBack}>Back</button>
          </div>
          {msg && <p style={{ marginTop: 6 }}>{msg}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <div className="admin-sidebar" style={{ maxHeight: '95vh' }}>
        <h3>Pages</h3>
        {site.pages.map((p) => (
          <div key={p.id} className="row order-row">
            <span>{p.name}</span>
            <button className="btn" onClick={() => setCurrentPageId(p.id)}>Edit</button>
            <button className="btn" onClick={() => deletePage(p.id)}>✕</button>
          </div>
        ))}
        <div className="card-mini">
          <input placeholder="Name" value={currentPage?.name || ''} onChange={(e) => setSite({ ...site, pages: site.pages.map((p) => p.id === currentPageId ? { ...p, name: e.target.value } : p) })} />
          <input placeholder="Slug (e.g. /, /case-1)" value={currentPage?.slug || ''} onChange={(e) => setSite({ ...site, pages: site.pages.map((p) => p.id === currentPageId ? { ...p, slug: e.target.value.startsWith('/') ? e.target.value : '/' + e.target.value } : p) })} />
        </div>
        <div className="button-row" style={{ marginBottom: 8 }}>
          <button className="btn primary" onClick={addPage}>+ Add Page</button>
        </div>

        <h3>Theme</h3>
        <label>Background<input type="color" value={form.theme.background} onChange={(e) => updateTheme('background', e.target.value)} /></label>
        <label>Accent<input type="color" value={form.theme.accent} onChange={(e) => updateTheme('accent', e.target.value)} /></label>
        <label>Accent 2<input type="color" value={form.theme.accent2} onChange={(e) => updateTheme('accent2', e.target.value)} /></label>
        <label>Text<input type="color" value={form.theme.text} onChange={(e) => updateTheme('text', e.target.value)} /></label>
        <label>Card<input type="color" value={form.theme.card} onChange={(e) => updateTheme('card', e.target.value)} /></label>
        <label>Background Image URL<input value={form.theme.backgroundImage} onChange={(e) => updateTheme('backgroundImage', e.target.value)} /></label>
        <label>Hero Image URL<input value={form.theme.heroImage} onChange={(e) => updateTheme('heroImage', e.target.value)} /></label>
        <label className="row">
          <span>Stars</span>
          <input type="checkbox" checked={form.theme.stars} onChange={(e) => updateTheme('stars', e.target.checked)} />
        </label>
        <label>Custom CSS<textarea value={form.theme.customCss} onChange={(e) => updateTheme('customCss', e.target.value)} /></label>
        <div className="upload-row">
          <label>Upload hero image
            <input type="file" accept="image/*" onChange={async (e) => { const f = e.target.files?.[0]; if (f) updateTheme('heroImage', await readFileAsDataUrl(f)) }} />
          </label>
          <label>Upload background image
            <input type="file" accept="image/*" onChange={async (e) => { const f = e.target.files?.[0]; if (f) updateTheme('backgroundImage', await readFileAsDataUrl(f)) }} />
          </label>
        </div>

        <h3>Section order (drag)</h3>
        <ReactSortable
          list={form.sectionsOrder.map((s, i) => ({ id: `${s}-${i}`, name: s }))}
          setList={(items) => setContentField('sectionsOrder', items.map((it) => it.name))}
          animation={150}
          handle=".drag-handle"
        >
          {form.sectionsOrder.map((s, i) => (
            <div key={`${s}-${i}`} className="row order-row">
              <span className="drag-handle">↕</span>
              <span>{s}</span>
              <button className="btn" onClick={() => setContentField('sectionsOrder', form.sectionsOrder.filter((_, idx) => idx !== i))}>✕</button>
            </div>
          ))}
        </ReactSortable>
        <div className="button-row" style={{ flexWrap: 'wrap' }}>
          {sectionPalette.map((s) => (
            <button className="btn" key={s} onClick={() => setContentField('sectionsOrder', [...form.sectionsOrder, s])}>+ {s}</button>
          ))}
        </div>

        <h3>Hero</h3>
        <label>Name<input value={form.heroContent.name} onChange={(e) => updateHero('name', e.target.value)} /></label>
        <label>Title<input value={form.heroContent.title} onChange={(e) => updateHero('title', e.target.value)} /></label>
        <label>Punch<input value={form.heroContent.punch} onChange={(e) => updateHero('punch', e.target.value)} /></label>
        <label>Blurb<textarea value={form.heroContent.blurb} onChange={(e) => updateHero('blurb', e.target.value)} /></label>
        <label>Email<input value={form.heroContent.email} onChange={(e) => updateHero('email', e.target.value)} /></label>
        <label>Phone<input value={form.heroContent.phone} onChange={(e) => updateHero('phone', e.target.value)} /></label>

        <h3>Stats</h3>
        {form.stats.map((s, i) => (
          <div key={i} className="row">
            <input placeholder="Label" value={s.label} onChange={(e) => updateList(form.stats, (l) => setContentField('stats', l), i, 'label', e.target.value)} />
            <input placeholder="Value" value={s.value} onChange={(e) => updateList(form.stats, (l) => setContentField('stats', l), i, 'value', e.target.value)} />
            <button onClick={() => removeItem(form.stats, (l) => setContentField('stats', l), i)}>✕</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.stats, (l) => setContentField('stats', l), factories.stat)}>+ Stat</button>

        <h3>Services</h3>
        {form.services.map((svc, i) => (
          <div key={i} className="card-mini">
            <input placeholder="Title" value={svc.title} onChange={(e) => updateList(form.services, (l) => setContentField('services', l), i, 'title', e.target.value)} />
            <input placeholder="Tagline" value={svc.tagline} onChange={(e) => updateList(form.services, (l) => setContentField('services', l), i, 'tagline', e.target.value)} />
            <textarea placeholder="Bullets (one per line)" value={svc.bullets.join('\n')} onChange={(e) => updateList(form.services, (l) => setContentField('services', l), i, 'bullets', splitLines(e.target.value))} />
            <button onClick={() => removeItem(form.services, (l) => setContentField('services', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.services, (l) => setContentField('services', l), factories.service)}>+ Service</button>

        <h3>Experience</h3>
        {form.experience.map((ex, i) => (
          <div key={i} className="card-mini">
            <input placeholder="Year" value={ex.year} onChange={(e) => updateList(form.experience, (l) => setContentField('experience', l), i, 'year', e.target.value)} />
            <input placeholder="Role" value={ex.role} onChange={(e) => updateList(form.experience, (l) => setContentField('experience', l), i, 'role', e.target.value)} />
            <input placeholder="Company" value={ex.company} onChange={(e) => updateList(form.experience, (l) => setContentField('experience', l), i, 'company', e.target.value)} />
            <input placeholder="Period" value={ex.period} onChange={(e) => updateList(form.experience, (l) => setContentField('experience', l), i, 'period', e.target.value)} />
            <textarea placeholder="Points (one per line)" value={ex.points.join('\n')} onChange={(e) => updateList(form.experience, (l) => setContentField('experience', l), i, 'points', splitLines(e.target.value))} />
            <button onClick={() => removeItem(form.experience, (l) => setContentField('experience', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.experience, (l) => setContentField('experience', l), factories.experience)}>+ Experience</button>

        <h3>Skills</h3>
        {form.skills.map((sk, i) => (
          <div key={i} className="card-mini">
            <input placeholder="Group" value={sk.title} onChange={(e) => updateList(form.skills, (l) => setContentField('skills', l), i, 'title', e.target.value)} />
            <textarea placeholder="Items (one per line)" value={sk.items.join('\n')} onChange={(e) => updateList(form.skills, (l) => setContentField('skills', l), i, 'items', splitLines(e.target.value))} />
            <button onClick={() => removeItem(form.skills, (l) => setContentField('skills', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.skills, (l) => setContentField('skills', l), factories.skill)}>+ Skill Group</button>

        <h3>Education</h3>
        {form.education.map((ed, i) => (
          <div key={i} className="card-mini">
            <input placeholder="Degree" value={ed.degree} onChange={(e) => updateList(form.education, (l) => setContentField('education', l), i, 'degree', e.target.value)} />
            <input placeholder="School" value={ed.school} onChange={(e) => updateList(form.education, (l) => setContentField('education', l), i, 'school', e.target.value)} />
            <input placeholder="Years" value={ed.years} onChange={(e) => updateList(form.education, (l) => setContentField('education', l), i, 'years', e.target.value)} />
            <textarea placeholder="Focus" value={ed.focus} onChange={(e) => updateList(form.education, (l) => setContentField('education', l), i, 'focus', e.target.value)} />
            <button onClick={() => removeItem(form.education, (l) => setContentField('education', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.education, (l) => setContentField('education', l), factories.edu)}>+ Education</button>

        <h3>Gallery</h3>
        {form.gallery.map((g, i) => (
          <div key={i} className="card-mini">
            <input placeholder="Title" value={g.title} onChange={(e) => updateList(form.gallery, (l) => setContentField('gallery', l), i, 'title', e.target.value)} />
            <textarea placeholder="Description" value={g.desc} onChange={(e) => updateList(form.gallery, (l) => setContentField('gallery', l), i, 'desc', e.target.value)} />
            <input placeholder="Image URL" value={g.image} onChange={(e) => updateList(form.gallery, (l) => setContentField('gallery', l), i, 'image', e.target.value)} />
            <input type="file" accept="image/*" onChange={async (e) => { const f = e.target.files?.[0]; if (f) updateList(form.gallery, (l) => setContentField('gallery', l), i, 'image', await readFileAsDataUrl(f)) }} />
            <button onClick={() => removeItem(form.gallery, (l) => setContentField('gallery', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.gallery, (l) => setContentField('gallery', l), factories.gallery)}>+ Gallery Item</button>

        <h3>Projects</h3>
        {form.projects.map((p, i) => (
          <div key={i} className="card-mini">
            <input placeholder="Title" value={p.title} onChange={(e) => updateList(form.projects, (l) => setContentField('projects', l), i, 'title', e.target.value)} />
            <textarea placeholder="Description" value={p.desc} onChange={(e) => updateList(form.projects, (l) => setContentField('projects', l), i, 'desc', e.target.value)} />
            <input placeholder="Link" value={p.link} onChange={(e) => updateList(form.projects, (l) => setContentField('projects', l), i, 'link', e.target.value)} />
            <input placeholder="Image URL" value={p.image} onChange={(e) => updateList(form.projects, (l) => setContentField('projects', l), i, 'image', e.target.value)} />
            <input type="file" accept="image/*" onChange={async (e) => { const f = e.target.files?.[0]; if (f) updateList(form.projects, (l) => setContentField('projects', l), i, 'image', await readFileAsDataUrl(f)) }} />
            <button onClick={() => removeItem(form.projects, (l) => setContentField('projects', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.projects, (l) => setContentField('projects', l), factories.project)}>+ Project</button>

        <h3>Pricing</h3>
        {form.pricing.map((p, i) => (
          <div key={i} className="card-mini">
            <input placeholder="Title" value={p.title} onChange={(e) => updateList(form.pricing, (l) => setContentField('pricing', l), i, 'title', e.target.value)} />
            <input placeholder="Subtitle" value={p.subtitle} onChange={(e) => updateList(form.pricing, (l) => setContentField('pricing', l), i, 'subtitle', e.target.value)} />
            <input placeholder="Price" value={p.price} onChange={(e) => updateList(form.pricing, (l) => setContentField('pricing', l), i, 'price', e.target.value)} />
            <textarea placeholder="Features (one per line)" value={p.features.join('\n')} onChange={(e) => updateList(form.pricing, (l) => setContentField('pricing', l), i, 'features', splitLines(e.target.value))} />
            <button onClick={() => removeItem(form.pricing, (l) => setContentField('pricing', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.pricing, (l) => setContentField('pricing', l), factories.pricing)}>+ Plan</button>

        <h3>FAQ</h3>
        {form.faq.map((f, i) => (
          <div key={i} className="card-mini">
            <input placeholder="Question" value={f.q} onChange={(e) => updateList(form.faq, (l) => setContentField('faq', l), i, 'q', e.target.value)} />
            <textarea placeholder="Answer" value={f.a} onChange={(e) => updateList(form.faq, (l) => setContentField('faq', l), i, 'a', e.target.value)} />
            <button onClick={() => removeItem(form.faq, (l) => setContentField('faq', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.faq, (l) => setContentField('faq', l), factories.faq)}>+ FAQ</button>

        <h3>Testimonials</h3>
        {form.testimonials.map((t, i) => (
          <div key={i} className="card-mini">
            <textarea placeholder="Quote" value={t.quote} onChange={(e) => updateList(form.testimonials, (l) => setContentField('testimonials', l), i, 'quote', e.target.value)} />
            <input placeholder="Name" value={t.name} onChange={(e) => updateList(form.testimonials, (l) => setContentField('testimonials', l), i, 'name', e.target.value)} />
            <input placeholder="Role" value={t.role} onChange={(e) => updateList(form.testimonials, (l) => setContentField('testimonials', l), i, 'role', e.target.value)} />
            <button onClick={() => removeItem(form.testimonials, (l) => setContentField('testimonials', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.testimonials, (l) => setContentField('testimonials', l), factories.testimonial)}>+ Testimonial</button>

        <h3>CTA</h3>
        <div className="card-mini">
          <input placeholder="Heading" value={form.cta?.heading ?? ''} onChange={(e) => setContentField('cta', { ...(form.cta ?? factories.cta()), heading: e.target.value })} />
          <input placeholder="Subheading" value={form.cta?.subheading ?? ''} onChange={(e) => setContentField('cta', { ...(form.cta ?? factories.cta()), subheading: e.target.value })} />
          <input placeholder="Button text" value={form.cta?.buttonText ?? ''} onChange={(e) => setContentField('cta', { ...(form.cta ?? factories.cta()), buttonText: e.target.value })} />
          <input placeholder="Button link" value={form.cta?.buttonLink ?? ''} onChange={(e) => setContentField('cta', { ...(form.cta ?? factories.cta()), buttonLink: e.target.value })} />
          <button className="btn" onClick={() => setContentField('cta', null)}>Remove CTA</button>
        </div>

        <h3>Custom Sections</h3>
        {form.customSections.map((cs, i) => (
          <div key={i} className="card-mini">
            <input placeholder="Title" value={cs.title} onChange={(e) => updateList(form.customSections, (l) => setContentField('customSections', l), i, 'title', e.target.value)} />
            <textarea placeholder="Body" value={cs.body} onChange={(e) => updateList(form.customSections, (l) => setContentField('customSections', l), i, 'body', e.target.value)} />
            <textarea placeholder="Bullets (one per line)" value={cs.bullets.join('\n')} onChange={(e) => updateList(form.customSections, (l) => setContentField('customSections', l), i, 'bullets', splitLines(e.target.value))} />
            <button onClick={() => removeItem(form.customSections, (l) => setContentField('customSections', l), i)}>Remove</button>
          </div>
        ))}
        <button className="btn" onClick={() => addItem(form.customSections, (l) => setContentField('customSections', l), factories.custom)}>+ Custom Section</button>

        <button className="btn primary" style={{ width: '100%', marginTop: 12 }} onClick={() => saveSite(false)} disabled={saving}>
          {saving ? 'Saving...' : 'Save (local)'}
        </button>
        <button className="btn primary" style={{ width: '100%' }} onClick={() => saveSite(true)} disabled={saving}>
          {saving ? 'Saving...' : 'Save & View live'}
        </button>
        <div className="button-row" style={{ flexWrap: 'wrap' }}>
          <button className="btn" onClick={copyJson}>Copy JSON</button>
          <button className="btn" onClick={downloadJson}>Download JSON</button>
          <label className="btn" style={{ cursor: 'pointer' }}>
            Upload JSON
            <input type="file" accept="application/json" style={{ display: 'none' }} onChange={(e) => uploadJson(e.target.files?.[0] || null)} />
          </label>
        </div>
        <button className="btn" style={{ width: '100%' }} onClick={onBack}>Back to site</button>
        {msg && <p style={{ marginTop: 6 }}>{msg}</p>}
      </div>

      <div className="admin-preview">
        <Portfolio content={form} />
      </div>
    </div>
  )
}

export default AdminPage

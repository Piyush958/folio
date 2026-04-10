export interface ThemeSettings {
  background: string
  accent: string
  accent2: string
  text: string
  card: string
  backgroundImage: string
  heroImage: string
  customCss: string
  stars: boolean
}

export interface HeroContent {
  name: string
  title: string
  punch: string
  blurb: string
  email: string
  phone: string
}

export interface Stat { label: string; value: string }
export interface ExperienceItem {
  year: string
  role: string
  company: string
  period: string
  points: string[]
}

export interface Service {
  title: string
  tagline: string
  bullets: string[]
}

export interface SkillGroup { title: string; items: string[] }

export interface EducationItem {
  degree: string
  school: string
  years: string
  focus: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
  availability: string
}

export interface CustomSection {
  title: string
  body: string
  bullets: string[]
}

export interface FaqItem { q: string; a: string }
export interface PricingItem { title: string; subtitle: string; price: string; features: string[] }
export interface GalleryItem { title: string; desc: string; image: string }
export interface ProjectItem { title: string; desc: string; link: string; image: string }
export interface TestimonialItem { quote: string; name: string; role: string }
export interface CtaBlock { heading: string; subheading: string; buttonText: string; buttonLink: string }

export interface PortfolioContent {
  theme: ThemeSettings
  heroContent: HeroContent
  stats: Stat[]
  experience: ExperienceItem[]
  services: Service[]
  skills: SkillGroup[]
  education: EducationItem[]
  contact: ContactInfo
  customSections: CustomSection[]
  faq: FaqItem[]
  pricing: PricingItem[]
  gallery: GalleryItem[]
  projects: ProjectItem[]
  testimonials: TestimonialItem[]
  cta: CtaBlock | null
  sectionsOrder: string[]
}

export interface Page {
  id: string
  name: string
  slug: string
  content: PortfolioContent
}

export interface SiteData {
  pages: Page[]
}

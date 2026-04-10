import type { SiteData, PortfolioContent } from './types'

// Default site data now exported as defaultSiteData
const siteData: SiteData = {
  pages: [
    {
      id: 'home',
      name: 'Home',
      slug: '/',
      content: {
        theme: {
          background: '#0b1224',
          backgroundImage: '',
          accent: '#6ea8ff',
          accent2: '#9ad5ff',
          text: '#e6e8f0',
          card: 'rgba(255,255,255,0.06)',
          heroImage: '',
          customCss: '',
          stars: false,
        },
        heroContent: {
          name: 'Piyush Dadheech',
          title: 'Fullstack Developer',
          punch: 'Fast, clean builds for web, commerce, and dashboards.',
          blurb:
            'React/TypeScript on the front, Django/Node on the back, with a Core Web Vitals-first mindset for Shopify & product sites.',
          email: 'piyushdadheech958@gmail.com',
          phone: '+91 95215 95134',
        },
        stats: [
          { label: 'Experience', value: '2+ yrs' },
          { label: 'Speed projects', value: '40+ sites' },
          { label: 'CWV lifts', value: '20-60% faster' },
        ],
        experience: [
          {
            year: '2025',
            role: 'Software Developer',
            company: 'BYB Softwares Pvt. Ltd.',
            period: 'Jan 2025 – Present',
            points: [
              'Ship and optimize Shopify, WordPress, and custom web apps with Python, PHP, and React.',
              'Improve Core Web Vitals (LCP/CLS/TBT) via image/CDN strategy, script pruning, and code-splitting.',
              'Own UX polish, UI fixes, and conversion-oriented experiments across devices.',
            ],
          },
          {
            year: '2024',
            role: 'Python Developer',
            company: 'Arcgate',
            period: 'Jun 2024 – Dec 2024',
            points: [
              'Built and tuned Django backends, APIs, and data flows for scalable features.',
              'Optimized queries and caching; tightened API performance budgets.',
              'Implemented scraping/data pipelines feeding product features.',
            ],
          },
        ],
        services: [
          {
            title: 'Shopify Development',
            tagline: 'Theme customization · Liquid · app hookups',
            bullets: [
              'Custom sections/blocks, upsells, and UX micro-interactions.',
              'App integrations, headless hooks, and checkout-safe tweaks.',
              'Performance-first: lazy assets, preload strategy, and script diet.',
            ],
          },
          {
            title: 'Core Web Vitals & Performance',
            tagline: 'Measured improvements, not fluff',
            bullets: [
              'LCP/CLS/TBT tuning with image compression, critical CSS, and code splitting.',
              'PageSpeed Insights deep dives with clear before/after reporting.',
              'Mobile-first fixes that protect conversions under bad networks.',
            ],
          },
          {
            title: 'Fullstack Product Builds',
            tagline: 'React + Python / Node / PHP',
            bullets: [
              'APIs with Django/DRF or Node that stay clean and observable.',
              'Modern UIs in React + Framer Motion, focused on clarity..',
              'Secure auth, forms, dashboards, and deployment-ready CI steps.',
            ],
          },
        ],
        skills: [
          { title: 'Frontend & Motion', items: ['React', 'Three.js / R3F', 'Framer Motion', 'Tailwind / Vanilla CSS'] },
          { title: 'Backend & Data', items: ['Python', 'Django / DRF', 'Node.js', 'PHP', 'SQL & ORM tuning'] },
          { title: 'Commerce & CMS', items: ['Shopify (Liquid)', 'WordPress', 'Headless builds', 'GA / tracking hygiene'] },
          { title: 'Performance', items: ['Core Web Vitals', 'Image/CDN strategy', 'Script audits', 'Bundle trimming'] },
        ],
        education: [
          { degree: 'Master of Computer Applications (MCA)', school: 'Poddar International College, Jaipur', years: '2021 – 2024', focus: 'Back-End Development, Python, Web Technologies' },
          { degree: 'Bachelor of Computer Applications (BCA)', school: 'Mohanlal Sukhadia University', years: '2019 – 2021', focus: 'Programming foundations, databases, CS fundamentals' },
        ],
        contact: {
          email: 'piyushdadheech958@gmail.com',
          phone: '+91 95215 95134',
          location: 'Remote-first · India (GMT+5:30)',
          availability: 'Accepting freelance/contract work now',
        },
        customSections: [],
        faq: [
          { q: 'Do you handle Core Web Vitals?', a: 'Yes, image strategy, script diet, and critical CSS are my daily toolkit.' },
          { q: 'Tech stack?', a: 'React/Three.js/Framer Motion on the front; Python/Django/Node on the back.' },
        ],
        pricing: [
          { title: 'Performance Sprint', subtitle: '1-2 weeks', price: '$900', features: ['CWV audit + fixes', 'Image/script cleanup', 'Before/after report'] },
          { title: 'Build + Launch', subtitle: '4-6 weeks', price: '$3.5k', features: ['Design + React build', 'Backend API', 'Deploy + monitoring'] },
        ],
        gallery: [],
        projects: [
          { title: 'Perf Booster', desc: 'Core Web Vitals uplift for D2C brand', link: '', image: '' },
          { title: 'Launch Site', desc: 'Product launch page with clear CTA and analytics', link: '', image: '' },
          { title: 'Ops Dashboard', desc: 'React + API dashboard for internal ops', link: '', image: '' },
        ],
        testimonials: [],
        cta: null,
        sectionsOrder: ['hero', 'performance', 'projects', 'experience', 'skills', 'services', 'education', 'contact'],
      },
    },
  ],
}

export const defaultSiteData = siteData
export const defaultContent: PortfolioContent = siteData.pages[0].content


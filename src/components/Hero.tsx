import { motion } from 'framer-motion'
import type { HeroContent, Stat } from '../types'
import CanvasScene from './CanvasScene'

const heroChips = ['Python / Django', 'React + Three.js', 'Shopify & speed', 'Performance-first builds']

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }

const Hero = ({ heroContent, stats, heroImage }: { heroContent: HeroContent; stats: Stat[]; heroImage?: string }) => {
  const profileImg = heroImage || 'https://github.com/piyushdadheech786-glitch.png'
  return (
    <section className="section hero-wrap" id="top">
      <div className="hero-bg" aria-hidden>
        <CanvasScene />
      </div>
      <div className="hero">
        <div className="hero-grid">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <div className="badge" style={{ marginBottom: 10 }}>Available for freelance · Fast delivery</div>
            <h1>
              {heroContent.name}
              <br />
              <span className="punch">{heroContent.title}</span>
            </h1>
            <p className="subtitle">{heroContent.punch}</p>
            <p>{heroContent.blurb}</p>
          </motion.div>

          <motion.div
            className="chips"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.08, duration: 0.5 }}
          >
            {heroChips.map((chip) => (
              <span className="chip" key={chip}>{chip}</span>
            ))}
          </motion.div>

          <motion.div className="button-row" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.16 }}>
            <a className="btn primary" href={`mailto:${heroContent.email}`}>
              Book a project
            </a>
            <a className="btn" href={`tel:${heroContent.phone.replace(/\s+/g, '')}`}>
              Call {heroContent.phone}
            </a>
            <a className="btn" href="https://github.com/piyushdadheech786-glitch" target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
          </motion.div>

          <motion.div className="metric-row" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.22 }}>
            {stats.map((stat) => (
              <div className="metric" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="profile-card full-image"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="profile-glow" />
          <div className="profile-img" style={{ backgroundImage: `url(${profileImg})` }} />
          <div className="profile-meta">
            <div className="badge">Performance & UX</div>
            <h3>{heroContent.name}</h3>
            <p>{heroContent.title}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

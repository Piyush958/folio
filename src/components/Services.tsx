import type { Service } from '../types'
import SectionHeader from './SectionHeader'
import { motion } from 'framer-motion'

const Services = ({ services }: { services: Service[] }) => {
  return (
    <motion.section className="section motion" id="services" initial={{ opacity: 0, y: 30, rotateX: -6 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45 }}>
      <SectionHeader title="What I deliver" detail="Targeted for freelancers & product teams" />
      <div className="card-grid">
        {services.map((svc, idx) => (
          <motion.div
            className="card"
            key={svc.title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="badge" style={{ marginBottom: 8 }}>{svc.tagline}</div>
            <h3>{svc.title}</h3>
            <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
              {svc.bullets.map((b) => (
                <li key={b} style={{ color: 'var(--muted)' }}>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Services

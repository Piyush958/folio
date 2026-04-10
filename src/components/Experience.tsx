import SectionHeader from './SectionHeader'
import { motion } from 'framer-motion'
import type { ExperienceItem } from '../types'

const Experience = ({ experience }: { experience: ExperienceItem[] }) => {
  return (
    <motion.section className="section motion" id="experience" initial={{ opacity: 0, y: 30, rotateX: -6 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45 }}>
      <SectionHeader title="Experience" detail="Recent work with measurable performance wins" />
      <div className="timeline">
        {experience.map((item, idx) => (
          <motion.div
            className="timeline-item"
            key={item.role + item.company}
            initial={{ opacity: 0, y: 14, rotateX: -4 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <div className="badge" style={{ display: 'inline-block' }}>{item.year}</div>
              <p>{item.period}</p>
            </div>
            <div>
              <h3>{item.role}</h3>
              <p style={{ marginBottom: 6 }}>{item.company}</p>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {item.points.map((p) => (
                  <li key={p} style={{ color: 'var(--muted)' }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Experience

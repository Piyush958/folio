import SectionHeader from './SectionHeader'
import { motion } from 'framer-motion'
import type { EducationItem } from '../types'

const Education = ({ education }: { education: EducationItem[] }) => {
  return (
    <motion.section className="section motion" id="education" initial={{ opacity: 0, y: 30, rotateX: -6 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45 }}>
      <SectionHeader title="Education" detail="Grounded in computer science + back-end" />
      <div className="timeline">
        {education.map((item, idx) => (
          <motion.div
            className="timeline-item"
            key={item.degree}
            initial={{ opacity: 0, y: 12, rotateX: -4 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <div className="badge" style={{ display: 'inline-block' }}>{item.years}</div>
            </div>
            <div>
              <h3>{item.degree}</h3>
              <p style={{ marginBottom: 6 }}>{item.school}</p>
              <p>{item.focus}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Education

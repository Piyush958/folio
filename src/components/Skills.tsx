import SectionHeader from './SectionHeader'
import { motion } from 'framer-motion'
import type { SkillGroup } from '../types'

const Skills = ({ skills }: { skills: SkillGroup[] }) => {
  return (
    <motion.section className="section motion" id="skills" initial={{ opacity: 0, y: 30, rotateX: -6 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45 }}>
      <SectionHeader title="Skills" detail="Tooling I rely on daily" />
      <div className="card-grid">
        {skills.map((skill, idx) => (
          <motion.div
            className="card"
            key={skill.title}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3>{skill.title}</h3>
            <div className="pill-group">
              {skill.items.map((item) => (
                <span className="pill" key={item}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Skills

import SectionHeader from './SectionHeader'
import { motion } from 'framer-motion'
import type { ContactInfo } from '../types'

const Contact = ({ contact }: { contact: ContactInfo }) => {
  return (
    <motion.section
      className="section motion"
      id="contact"
      initial={{ opacity: 0, y: 30, rotateX: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
    >
      <SectionHeader title="Let’s build" detail="Quick replies · async-friendly" />
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="contact-tile">
          <h3>Email</h3>
          <a className="btn" href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
        <div className="contact-tile">
          <h3>Call / WhatsApp</h3>
          <a className="btn" href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a>
        </div>
        <div className="contact-tile">
          <h3>Location</h3>
          <p>{contact.location}</p>
        </div>
        <div className="contact-tile">
          <h3>Availability</h3>
          <p>{contact.availability}</p>
        </div>
      </motion.div>
      <p className="footer-note">I focus on clean builds, measurable speed gains, and transparent communication.</p>
    </motion.section>
  )
}

export default Contact

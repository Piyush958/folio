import type { FaqItem } from '../types'
import SectionHeader from './SectionHeader'

const FAQ = ({ faq }: { faq: FaqItem[] }) => {
  if (!faq.length) return null
  return (
    <section className="section motion" id="faq">
      <SectionHeader title="FAQ" detail="Answers to common asks" />
      <div className="card-grid">
        {faq.map((f, idx) => (
          <div className="card" key={idx}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ

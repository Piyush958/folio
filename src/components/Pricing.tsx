import type { PricingItem } from '../types'
import SectionHeader from './SectionHeader'

const Pricing = ({ plans }: { plans: PricingItem[] }) => {
  if (!plans.length) return null
  return (
    <section className="section motion" id="pricing">
      <SectionHeader title="Pricing" detail="Pick a fit" />
      <div className="card-grid">
        {plans.map((p, idx) => (
          <div className="card" key={idx}>
            <h3>{p.title}</h3>
            <p>{p.subtitle}</p>
            <div className="badge" style={{ margin: '10px 0' }}>{p.price}</div>
            <ul style={{ paddingLeft: 18 }}>
              {p.features.map((f) => (
                <li key={f} style={{ color: 'var(--muted)' }}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing

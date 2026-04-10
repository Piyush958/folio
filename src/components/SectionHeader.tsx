import type { FC } from 'react'

interface SectionHeaderProps {
  title: string
  eyebrow?: string
  detail?: string
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, eyebrow, detail }) => {
  return (
    <div className="section-heading">
      <span className="dot" />
      <div>
        {eyebrow && <div className="badge" style={{ marginBottom: 6 }}>{eyebrow}</div>}
        <h2>{title}</h2>
        {detail && <span>{detail}</span>}
      </div>
    </div>
  )
}

export default SectionHeader


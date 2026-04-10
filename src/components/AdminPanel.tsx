import { useEffect, useState } from 'react'
import type { PortfolioContent } from '../types'
import { defaultContent } from '../content'

const STORAGE_KEY = 'portfolioContent'

const AdminPanel = ({ onUpdate }: { onUpdate: (c: PortfolioContent) => void }) => {
  const [text, setText] = useState(JSON.stringify(defaultContent, null, 2))
  const [status, setStatus] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setText(saved)
  }, [])

  const handleSave = () => {
    try {
      const parsed = JSON.parse(text) as PortfolioContent
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed, null, 2))
      onUpdate(parsed)
      setStatus('Saved to localStorage. Commit this JSON to content.ts for permanent deploys.')
    } catch (e) {
      setStatus('Invalid JSON: ' + (e as Error).message)
    }
  }

  const handleReset = () => {
    const json = JSON.stringify(defaultContent, null, 2)
    setText(json)
    localStorage.removeItem(STORAGE_KEY)
    onUpdate(defaultContent)
    setStatus('Reset to defaults.')
  }

  return (
    <section className="section motion" id="admin">
      <div className="section-heading">
        <span className="dot" />
        <div>
          <div className="badge" style={{ marginBottom: 6 }}>Admin</div>
          <h2>Content Editor</h2>
          <span>Edit JSON to add/remove sections, services, experience, skills, etc.</span>
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', minHeight: 320, background: 'rgba(0,0,0,0.25)', color: '#e6e8f0', border: '1px solid var(--border)', borderRadius: 12, padding: 12, fontFamily: 'JetBrains Mono, ui-monospace, Consolas, monospace' }}
      />
      <div className="button-row" style={{ marginTop: 12 }}>
        <button className="btn primary" onClick={handleSave}>Save & Apply</button>
        <button className="btn" onClick={handleReset}>Reset to defaults</button>
      </div>
      {status && <p style={{ marginTop: 8 }}>{status}</p>}
      <p className="footer-note">For production: paste this JSON into src/content.ts and commit before deploying to Vercel.</p>
    </section>
  )
}

export default AdminPanel

import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useParams, useNavigate } from "react-router-dom"
import Portfolio from "./Portfolio"
import AdminPage from "./components/AdminPage"
import { defaultSiteData } from "./content"
import type { SiteData } from "./types"
import { loadData, saveData } from "./persistence"

const PageRenderer = ({ data }: { data: SiteData }) => {
  const params = useParams()
  const slugRaw = params['*'] ?? ''
  const slug = slugRaw ? `/${slugRaw}` : '/'
  const page = data.pages.find((p) => p.slug === slug) || data.pages[0]
  return <Portfolio content={page.content} />
}

function App() {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const saved = await loadData()
      if (saved) setData(saved)
      setLoading(false)
    })()
  }, [])

  const handleUpdate = async (d: SiteData) => {
    setData(d)
    await saveData(d)
  }

  if (loading) return <div style={{ padding: 32 }}>Loading site...</div>

  return (
    <Routes>
      <Route path="/admin" element={<AdminPage data={data} onUpdate={handleUpdate} onBack={() => navigate('/')} />} />
      <Route path="*" element={<PageRenderer data={data} />} />
    </Routes>
  )
}

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default AppWithRouter

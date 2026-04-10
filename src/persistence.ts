import type { SiteData } from './types'

const STORAGE_KEY = 'siteData'
const REMOTE_URL = import.meta.env.VITE_REMOTE_URL || ''
const REMOTE_KEY = import.meta.env.VITE_REMOTE_KEY || ''

export const hasRemote = !!REMOTE_URL

function sanitize(data: SiteData): SiteData {
  // strip legacy embedded Canva hero image
  const cleared = JSON.parse(JSON.stringify(data)) as SiteData
  cleared.pages = cleared.pages.map((p) => {
    const c = { ...p.content }
    if (c.theme.heroImage && c.theme.heroImage.includes('faac59b4e0dbcdf03e76cfedb5a0f920')) c.theme.heroImage = ''
    if (c.theme.backgroundImage && c.theme.backgroundImage.includes('faac59b4e0dbcdf03e76cfedb5a0f920')) c.theme.backgroundImage = ''
    return { ...p, content: c }
  })
  return cleared
}

export async function loadData(): Promise<SiteData | null> {
  if (hasRemote) {
    try {
      const res = await fetch(REMOTE_URL, { headers: REMOTE_KEY ? { 'X-API-KEY': REMOTE_KEY } : {} })
      if (!res.ok) throw new Error('remote fetch failed')
      return sanitize(await res.json())
    } catch (e) {
      console.warn('Remote load failed, falling back to local', e)
    }
  }
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return null
  try { return sanitize(JSON.parse(saved)) } catch { return null }
}

export async function saveData(data: SiteData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2))
  if (hasRemote) {
    await fetch(REMOTE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(REMOTE_KEY ? { 'X-API-KEY': REMOTE_KEY } : {}),
      },
      body: JSON.stringify(data),
    })
  }
}

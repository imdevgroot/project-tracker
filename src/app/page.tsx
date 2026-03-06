'use client'

import { useState, useMemo } from 'react'
import projects from '../data/projects.json'

const CATEGORIES = ['All', 'Tools & Apps', 'Pokemon', 'Client Sites', 'Lead Gen']

type SortOption = 'newest' | 'oldest' | 'az'

const CATEGORY_COLORS: Record<string, string> = {
  'Tools & Apps': '#4fc3f7',
  'Pokemon': '#f59e0b',
  'Client Sites': '#22c55e',
  'Lead Gen': '#a855f7',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')

  const filtered = useMemo(() => {
    let result = [...projects]
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    if (sort === 'newest') result.sort((a, b) => b.added.localeCompare(a.added))
    else if (sort === 'oldest') result.sort((a, b) => a.added.localeCompare(b.added))
    else result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [activeCategory, search, sort])

  const stats = useMemo(() => ({
    total: projects.length,
    clientSites: projects.filter(p => p.category === 'Client Sites').length,
    tools: projects.filter(p => p.category === 'Tools & Apps').length,
    live: projects.filter(p => p.status === 'Live').length,
  }), [])

  const catColor = CATEGORY_COLORS[activeCategory] || '#4fc3f7'

  return (
    <main className="fade-in" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px 80px' }}>
      {/* Header */}
      <header style={{ padding: '40px 0 28px', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #4fc3f7, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚀</div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>NuPeeks Projects</h1>
            <p style={{ fontSize: 12, color: '#4b5563', marginTop: 2 }}>All active tools, sites, and pipelines</p>
          </div>
        </div>
      </header>

      {/* Stats Row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32,
      }}>
        {[
          { label: 'Total Projects', value: stats.total, color: '#4fc3f7', icon: '📦' },
          { label: 'Client Sites', value: stats.clientSites, color: '#22c55e', icon: '🌐' },
          { label: 'Tools & Apps', value: stats.tools, color: '#a855f7', icon: '🔧' },
          { label: 'Live', value: stats.live, color: '#f59e0b', icon: '✅' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#0f1520', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: '18px 20px',
            display: 'flex', flexDirection: 'column', gap: 4,
            transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = stat.color + '44')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 20 }}>{stat.icon}</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: stat.color }}>{stat.value}</span>
            </div>
            <div style={{ fontSize: 11, color: '#4b5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24, alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', background: '#0f1520', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 5 }}>
          {CATEGORIES.map(cat => {
            const c = CATEGORY_COLORS[cat] || '#4fc3f7'
            const active = activeCategory === cat
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '7px 14px', borderRadius: 7,
                border: 'none',
                background: active ? c + '22' : 'transparent',
                color: active ? c : '#6b7280',
                fontSize: 12, fontWeight: active ? 700 : 500,
                transition: 'all 0.15s',
                borderBottom: active ? `2px solid ${c}` : '2px solid transparent',
              }}>
                {cat}
              </button>
            )
          })}
        </div>

        {/* Search + Sort */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#374151', fontSize: 13 }}>🔍</span>
            <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)}
              style={{
                background: '#0f1520', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
                padding: '8px 14px 8px 32px', color: '#e2e8f0', fontSize: 13, outline: 'none', width: 220,
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = '#4fc3f7'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value as SortOption)} style={{
            background: '#0f1520', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
            padding: '8px 14px', color: '#9ca3af', fontSize: 13, outline: 'none', cursor: 'pointer',
          }}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">A–Z</option>
          </select>
        </div>
      </div>

      {/* Count */}
      <div style={{ fontSize: 12, color: '#374151', marginBottom: 18 }}>
        Showing <span style={{ color: catColor, fontWeight: 700 }}>{filtered.length}</span> of {projects.length} projects
        {search && <span style={{ color: '#4b5563' }}> matching "<span style={{ color: '#9ca3af' }}>{search}</span>"</span>}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map(project => {
          const cc = CATEGORY_COLORS[project.category] || '#4fc3f7'
          return (
            <div key={project.name + project.url} className="project-card" style={{
              background: '#0f1520', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14,
              padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              {/* Top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{project.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, paddingTop: 2 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
                  <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, letterSpacing: '0.06em' }}>LIVE</span>
                </div>
              </div>

              {/* Category pill */}
              <span style={{
                display: 'inline-block', fontSize: 10, color: cc, fontWeight: 700,
                background: cc + '18', border: `1px solid ${cc}33`, borderRadius: 5,
                padding: '2px 8px', alignSelf: 'flex-start', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {project.category}
              </span>

              {/* Description */}
              <p style={{
                fontSize: 13, color: '#64748b', lineHeight: 1.6, flex: 1,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {project.description}
              </p>

              {/* URL */}
              <div style={{ fontSize: 11, color: '#2a3a4a', fontFamily: 'monospace' }}>
                {project.url.replace('https://', '')}
              </div>

              {/* Bottom */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: 11, color: '#2a3a4a' }}>{formatDate(project.added)}</span>
                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 12, fontWeight: 700, color: '#080c14',
                  background: cc, padding: '7px 16px', borderRadius: 7,
                  transition: 'opacity 0.15s, transform 0.15s',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                >
                  Visit →
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 48, opacity: 0.3 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>No projects found</div>
          <div style={{ fontSize: 13, color: '#4b5563' }}>Try a different search or category</div>
          <button onClick={() => { setSearch(''); setActiveCategory('All'); }}
            style={{ background: '#4fc3f7', color: '#080c14', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Clear filters
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
          div[style*="minmax(320px"] { grid-template-columns: 1fr !important; }
          header { padding: 24px 0 16px !important; }
          h1 { font-size: 20px !important; }
        }
        @media (max-width: 900px) {
          div[style*="minmax(320px"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  )
}

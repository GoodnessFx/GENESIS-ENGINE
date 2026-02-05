import React, { useEffect, useState } from 'react'

export default function App() {
  const [context, setContext] = useState('component scaffold')
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [stats, setStats] = useState<{ type: string; count: number }[]>([])

  async function predict() {
    const r = await fetch('http://localhost:3000/ml/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context })
    })
    const j = await r.json()
    setSuggestion(j?.suggestion ?? null)
  }

  async function loadStats() {
    const r = await fetch('http://localhost:3000/stats?hours=24')
    const j = await r.json()
    setStats(j?.rows ?? [])
  }

  useEffect(() => {
    loadStats().catch(() => {})
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui', padding: 20 }}>
      <h1>GENESIS ENGINE</h1>
      <p>Behavior-driven development intelligence.</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input value={context} onChange={(e) => setContext(e.target.value)} style={{ flex: 1 }} />
        <button onClick={predict}>Predict</button>
      </div>
      {suggestion && <p style={{ marginTop: 8 }}>Suggestion: {suggestion}</p>}
      <h3 style={{ marginTop: 16 }}>Last 24h Stats</h3>
      <ul>
        {stats.map((s) => (
          <li key={s.type}>
            {s.type}: {s.count}
          </li>
        ))}
        {!stats.length && <li>No telemetry or DB not configured</li>}
      </ul>
    </div>
  )
}

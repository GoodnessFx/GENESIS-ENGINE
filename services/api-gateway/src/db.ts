import { Pool } from 'pg'
let pool: Pool | null = null
const url = process.env.DATABASE_URL

export async function init() {
  if (!url) return
  pool = new Pool({ connectionString: url })
  await pool.query('CREATE TABLE IF NOT EXISTS telemetry (id SERIAL PRIMARY KEY, type TEXT, file TEXT, ts TIMESTAMPTZ)')
}

export async function saveTelemetry(event: any) {
  if (!pool) return
  const type = event?.type ?? null
  const file = event?.file ?? null
  const ts = event?.ts ?? Date.now()
  await pool.query('INSERT INTO telemetry(type,file,ts) VALUES($1,$2,TO_TIMESTAMP($3/1000.0))', [type, file, ts])
}

export async function getStats(hours: number = 24) {
  if (!pool) return []
  const q = `SELECT type, COUNT(*)::int AS count FROM telemetry WHERE ts > NOW() - INTERVAL '${hours} hours' GROUP BY type ORDER BY count DESC`
  const r = await pool.query(q)
  return r.rows
}

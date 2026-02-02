import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

const swaggerDocument = YAML.parse(`
openapi: 3.0.0
info:
  title: GENESIS API
  version: 0.1.0
paths:
  /health:
    get:
      responses:
        '200':
          description: OK
  /ml/predict:
    post:
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                context:
                  type: string
      responses:
        '200':
          description: Prediction result
`)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Telemetry intake
app.post('/telemetry', async (req, res) => {
  try {
    // In P1, log and acknowledge; later persist to Postgres/Timescale
    console.log('telemetry', req.body)
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'telemetry error' })
  }
})

app.post('/ml/predict', async (req, res) => {
  try {
    const resp = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })
    const data = await resp.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'ml-core unreachable' })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`API Gateway running on http://localhost:${port}`)
})

# GENESIS ENGINE

Behavior-driven development intelligence that observes, learns, and generates personalized code, tests, and automation.

## Layers

```mermaid
flowchart TD
  L1[Observation Engine] --> L2[Pattern Recognition AI]
  L2 --> L3[Intelligence Core]
  L3 --> L4[Automation Execution]
  L4 --> L5[Team Intelligence]
```

## Services
- Desktop App: Electron + React + TS
- API Gateway: Node.js + Express + TS
- ML Core: Python FastAPI
- VSCode Extension: Telemetry observer
- Telemetry Persistence: Postgres with time-based stats

## Run
- ML Core: `uvicorn main:app --reload --port 8000` in services/ml-core
- API: `npm run dev` in services/api-gateway
- Desktop UI: `npm run dev:ui` then `npm run dev` in apps/desktop
  - Open http://localhost:5173 for UI. Use Predict to call ML and Stats to view counts.

## Telemetry
- VSCode extension sends edit/open/selection/file events to `/telemetry`.
- API Gateway proxies ML predictions via `/ml/predict`.
- API Gateway persists telemetry and exposes `/stats?hours=24`.

## Security & Privacy
- Local-first processing; opt-in observers.
- Sensitive filtering planned; audit trails for enterprise.

## Configuration
- `DATABASE_URL` for API Gateway, e.g. `postgres://genesis:genesis@localhost:5432/genesis`.

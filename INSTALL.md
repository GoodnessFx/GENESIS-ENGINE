# Install & Use

## Prerequisites
- Node.js 18+
- Python 3.10+

## ML Core
```
cd services/ml-core
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

## API Gateway
```
cd services/api-gateway
npm install
set DATABASE_URL=postgres://genesis:genesis@localhost:5432/genesis
npm run dev
```

## Desktop App
```
cd apps/desktop
npm install
npm run dev:ui
npm run dev
```
Open http://localhost:5173 to use the UI (Predict and Stats).

## Telemetry Persistence
- Requires Postgres running locally or via Docker Compose.
- Stats endpoint: `GET http://localhost:3000/stats?hours=24`

## VSCode Extension
```
cd apps/extension
npm install
npm run build
code --install-extension .
```

## Test Flow
```
curl -X POST http://localhost:3000/ml/predict \
  -H "Content-Type: application/json" \
  -d "{\\"context\\":\\"component scaffold\\"}"
curl http://localhost:3000/stats?hours=24
```

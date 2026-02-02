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
npm run dev
```

## Desktop App
```
cd apps/desktop
npm install
npm run dev:ui
npm run dev
```

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
```

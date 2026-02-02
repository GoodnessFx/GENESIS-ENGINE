from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="GENESIS ML Core", version="0.1.0")

class PredictRequest(BaseModel):
    context: str

class PredictResponse(BaseModel):
    suggestion: str
    confidence: float

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    return PredictResponse(suggestion="Create React component with error boundary", confidence=0.72)

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import pandas as pd
from ..database.mongo import datasets, predictions
from ..models.trainer import train_model
from ..models.predictor import predict
from ..models.anomaly import detect_anomalies
from ..api.nlp import nlp_query
import uuid
import json

router = APIRouter()

@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(400, "Only CSV files allowed")
    
    df = pd.read_csv(file.file)
    dataset_id = str(uuid.uuid4())
    datasets.insert_one({"id": dataset_id, "data": df.to_dict(orient='records')})
    
    return {"dataset_id": dataset_id, "columns": list(df.columns)}

@router.post("/train")
async def train(request: dict):
    dataset = datasets.find_one({"id": request['dataset_id']})
    df = pd.DataFrame(dataset['data'])
    model_uri, _ = train_model(df, request['target'], request.get('task', 'regression'))
    return {"model_uri": model_uri}

@router.post("/predict")
async def predict_endpoint(request: dict):
    result = predict(request['model_uri'], request['input'])
    return result

@router.post("/anomaly")
async def anomaly(request: dict):
    dataset = datasets.find_one({"id": request['dataset_id']})
    df = pd.DataFrame(dataset['data'])
    anomalies = detect_anomalies(df)
    return {"anomalies": anomalies}

@router.post("/nlp")
async def nlp(request: dict):
    dataset = datasets.find_one({"id": request['dataset_id']})
    df = pd.DataFrame(dataset['data'])
    answer = nlp_query(df, request['question'])
    return {"answer": answer}
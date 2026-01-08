import mlflow
import pandas as pd
import shap
import json

def predict(model_uri: str, data: dict):
    model = mlflow.pyfunc.load_model(model_uri)
    df = pd.DataFrame([data])
    pred = model.predict(df)[0]

    # SHAP Explanation
    explainer = shap.Explainer(model.predict, df)
    shap_values = explainer(df)
    shap_dict = json.loads(shap_values.to_json())

    return {"prediction": float(pred), "shap": shap_dict}
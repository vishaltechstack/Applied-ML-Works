import pandas as pd
from pycaret.regression import *
from pycaret.classification import *
from pycaret.clustering import *
import mlflow
import mlflow.sklearn
import os

def train_model(df: pd.DataFrame, target: str, task: str = 'regression'):
    os.environ['MLFLOW_TRACKING_URI'] = 'file:./mlflow_models'
    mlflow.set_experiment("DataOracle_AutoML")

    if task == 'regression':
        exp = setup(df, target=target, session_id=123, log_experiment=True, silent=True)
        best = create_model('xgboost')
    elif task == 'classification':
        exp = setup(df, target=target, session_id=123, log_experiment=True, silent=True)
        best = create_model('lightgbm')
    else:
        exp = setup(df, session_id=123, log_experiment=True, silent=True)
        best = create_model('kmeans')

    with mlflow.start_run():
        mlflow.log_params(exp.get_config('prep_pipe').named_steps)
        mlflow.sklearn.log_model(best, "model")
        model_uri = mlflow.get_artifact_uri("model")
    
    return model_uri, best
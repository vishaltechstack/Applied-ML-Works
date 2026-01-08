from sklearn.ensemble import IsolationForest
import pandas as pd

def detect_anomalies(df: pd.DataFrame):
    model = IsolationForest(contamination=0.1, random_state=42)
    df_numeric = df.select_dtypes(include=['float64', 'int64'])
    preds = model.fit_predict(df_numeric)
    df['anomaly'] = preds == -1
    return df[df['anomaly']].to_dict(orient='records')
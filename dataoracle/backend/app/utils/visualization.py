import plotly.express as px
import pandas as pd

def plot_forecast(df: pd.DataFrame, target: str):
    fig = px.line(df, x=df.index, y=target, title=f"Forecast: {target}")
    return fig.to_json()
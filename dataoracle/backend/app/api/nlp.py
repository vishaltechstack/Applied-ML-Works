from langchain.agents import create_pandas_dataframe_agent
from langchain_openai import ChatOpenAI
import pandas as pd

def nlp_query(df: pd.DataFrame, question: str):
    llm = ChatOpenAI(model="gpt-4o", temperature=0)
    agent = create_pandas_dataframe_agent(llm, df, verbose=True, allow_dangerous_code=True)
    result = agent.run(question)
    return result
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("mongodb://localhost:27017/"))
db = client.dataoracle
datasets = db.datasets
predictions = db.predictions
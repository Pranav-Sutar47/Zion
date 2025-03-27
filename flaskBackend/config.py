# config.py
import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env file

# Twitter API Credentials (Get from https://developer.twitter.com/)
BEARER_TOKEN = os.getenv("BEARER_TOKEN")

# MongoDB Atlas Connection (Update with your connection string)
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "TwitterDB"
COLLECTION_NAME = "tweets"
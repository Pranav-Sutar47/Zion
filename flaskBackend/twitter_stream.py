import tweepy
import json
from pymongo import MongoClient
from sentiment_analysis import analyze_sentiment
from config import BEARER_TOKEN, MONGO_URI, DB_NAME, COLLECTION_NAME

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

class TwitterStream(tweepy.StreamingClient):
    def on_tweet(self, tweet):
        sentiment = analyze_sentiment(tweet.text)
        tweet_data = {
            "text": tweet.text,
            "sentiment": sentiment
        }
        collection.insert_one(tweet_data)
        print(f"Saved: {tweet.text} -> {sentiment}")

    def on_error(self, status_code):
        print(f"Error: {status_code}")
        if status_code == 420:  # Rate limit exceeded
            return False

def start_stream():
    stream = TwitterStream(BEARER_TOKEN)
    stream.add_rules(tweepy.StreamRule("technology OR AI -is:retweet"))  # Filtering
    stream.filter()

if __name__ == "__main__":
    start_stream()

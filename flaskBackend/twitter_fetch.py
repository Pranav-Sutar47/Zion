import tweepy
from pymongo import MongoClient
from sentiment_analysis import analyze_sentiment
from config import BEARER_TOKEN, MONGO_URI, DB_NAME, COLLECTION_NAME

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# Authenticate with Twitter API v2
twitter_client = tweepy.Client(bearer_token=BEARER_TOKEN)
import time
import tweepy

query = '(public opinion OR "people think" OR poll OR survey) -is:retweet lang:en'

def fetch_tweets(query=query, max_results=100):
    """Fetch recent tweets, handle rate limits, analyze sentiment, and store in MongoDB."""
    
    # Ensure max_results is between 10 and 100
    max_results = max(10, min(max_results, 100))
    
    while True:
        try:
            response = twitter_client.search_recent_tweets(
                query=query, max_results=max_results, tweet_fields=["created_at", "text",'full_text']
            )
            break  # Exit loop if request is successful

        except tweepy.errors.TooManyRequests:
            print("⚠️ Rate limit reached! Sleeping for 15 minutes...")
            time.sleep(15 * 60)  # Sleep for 15 minutes before retrying
        except Exception as e:
            print(f"❌ Error fetching tweets: {e}")
            return

    if response.data:
        for tweet in response.data:
            print('hello')
            print(tweet)
            sentiment = analyze_sentiment(tweet.full_text)
            tweet_data = {
                "text": tweet.full_text,
                "created_at": tweet.created_at,
                "sentiment": sentiment
            }
            collection.insert_one(tweet_data)
            print(tweet_data)
            print(f"✅ Saved: {tweet.text} -> {sentiment}")
    else:
        print("⚠️ No tweets found!")
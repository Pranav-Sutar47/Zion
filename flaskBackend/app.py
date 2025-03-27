from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
import praw
import os
import prawcore
import bcrypt
import jwt as pyjwt
import datetime
from twitter_fetch import fetch_tweets
from sentiment_analysis import analyze_sentiment
from config import MONGO_URI, DB_NAME, COLLECTION_NAME
import pickle
from sklearn.feature_extraction.text import CountVectorizer

app = Flask(__name__)
CORS(app)

SECRET_KEY = "sentiment"

# ✅ Connect to MongoDB
try:
    client = MongoClient(MONGO_URI)
    client.admin.command('ping')  # Check MongoDB connection
    print("✅ MongoDB connection successful!")
    db = client[DB_NAME]
    
    # 🔹 Collections for tweets & users
    tweets_collection = db[COLLECTION_NAME]  
    users_collection = db["users"]  # 🔹 New collection for user authentication

except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
    exit(1)  # Stop execution if DB is not connected

# ✅ Connect to Reddit API
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT")
)

# ✅ User Add Route
@app.route("/addUser", methods=["POST"])
def addUser():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201

# ✅ User Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        token = pyjwt.encode(
            {"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            SECRET_KEY,
            algorithm="HS256"
        )

        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

# ✅ Fetch & Store Tweets
@app.route('/fetch', methods=['GET'])
def fetch_and_store():
    """Fetch tweets and store in MongoDB"""
    query = request.args.get('query', "AI OR technology -is:retweet")
    max_results = int(request.args.get('max_results', 10))

    # Ensure max_results is within the allowed range (10 - 100)
    max_results = max(10, min(max_results, 100))

    fetch_tweets(query, max_results)
    return jsonify({"message": "Tweets fetched and stored successfully!"})

# ✅ Get Stored Tweets
@app.route('/tweets', methods=['GET'])
def get_tweets():
    """Retrieve stored tweets from MongoDB"""
    tweets = list(tweets_collection.find({}, {"_id": 0}))  # Exclude MongoDB _id
    return jsonify(tweets)

# ✅ Fetch & Store Reddit Posts
@app.route('/fetch_reddit', methods=['GET'])
def fetch_and_store_reddit_posts():
    subreddit_name = request.args.get('subreddit', 'technology')  # Default subreddit
    limit = int(request.args.get('limit', 5))

    try:
        subreddit = reddit.subreddit(subreddit_name)
        posts = []

        for post in subreddit.hot(limit=limit):
            sentiment = analyze_sentiment(post.title)            
            post_data = {
                "title": post.title,
                "url": post.url,
                "text": post.selftext,
                "subreddit": subreddit_name,
                "sentiment": sentiment
            }
            posts.append(post_data)
            tweets_collection.update_one({"url": post.url}, {"$set": post_data}, upsert=True)

        return jsonify({"message": f"Stored {len(posts)} posts from r/{subreddit_name}", "data": posts})

    except prawcore.exceptions.NotFound:
        return jsonify({"error": f"Subreddit '{subreddit_name}' not found"}), 404
    except prawcore.exceptions.Forbidden:
        return jsonify({"error": f"Subreddit '{subreddit_name}' is private or restricted"}), 403
    except Exception as e:
        return jsonify({"error": f"Failed to fetch posts: {str(e)}"}), 500

@app.route('/tweet_sentiment_summary', methods=['GET'])
def tweet_sentiment_summary():
    """Fetch all tweets and count sentiment categories"""
    try:
        tweets = list(tweets_collection.find({}, {"_id": 0, "sentiment": 1}))  # Fetch only sentiment field

        # Initialize counters
        total_tweets = len(tweets)
        positive_count = sum(1 for tweet in tweets if tweet.get("sentiment") == "Positive")
        negative_count = sum(1 for tweet in tweets if tweet.get("sentiment") == "Negative")
        neutral_count = sum(1 for tweet in tweets if tweet.get("sentiment") == "Neutral")

        return jsonify({
            "total_tweets": total_tweets,
            "positive": positive_count,
            "negative": negative_count,
            "neutral": neutral_count
        })
    except Exception as e:
        return jsonify({"error": f"Failed to fetch sentiment summary: {str(e)}"}), 500


# Load the pickled model and vocabulary
model = pickle.load(open('sentiment.pkl', 'rb'))
vocabulary = pickle.load(open('vocabulary.pkl', 'rb'))

def predict_sentiment(review):
    # Vectorize the review using the loaded vocabulary
    vectorizer = CountVectorizer(vocabulary=vocabulary)
    review_vectorized = vectorizer.transform([review])
    
    # Predict the sentiment probability using the loaded model
    sentiment_probability = model.predict_proba(review_vectorized)[0][1]
    
    return sentiment_probability

@app.route('/evaluate-sentiment', methods=['POST'])
def evaluate_sentiment():
    # Get the request body as JSON
    request_data = request.get_json()
    
    # Check if the request body contains the 'text' parameter
    if 'text' not in request_data:
        return jsonify({'error': 'Text parameter is missing'}), 400
    
    # Retrieve the text parameter from the request body
    text = request_data['text']
    
    sentiment_probability = predict_sentiment(text)

    # Perform sentiment analysis here (not implemented in this example)
    # In this basic example, always return 'positive'
    
    # Return the response
    return jsonify({'text' : text , 'sentiment': sentiment_probability})


if __name__ == '__main__':
    app.run(debug=True)

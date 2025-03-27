from textblob import TextBlob

def analyze_sentiment(text):
    """Analyze sentiment and classify as Positive, Negative, or Neutral."""
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity

    if polarity > 0:
        return "Positive"
    elif polarity < 0:
        return "Negative"
    else:
        return "Neutral"

import React, { useState } from 'react';
import fetchRequest from "../../utils/apiCall";

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [sentimentClass, setSentimentClass] = useState('');
  const [result, setResult] = useState({ text: "", sentiment: "" });


  const getSentiment = (sentimentValue) => {
    if (sentimentValue <= 0.5) {
      return "Negative";
    } else {
      return "Positive";
    }
  };

  const getProbability = (sentimentValue) => {
    if (sentimentValue <= 0.5) {
      sentimentValue = 0.5 - sentimentValue;
      return sentimentValue*200;
    } else {
      return (sentimentValue-0.5)*200;
    }
  };

  const analyzeSentiment = () => {
    console.log(text);

    fetchRequest("post", "http://127.0.0.1:5000/evaluate-sentiment", {
      text: text,
    })
      .then((responseData) => {
        setResult({
          text: text,
          sentiment: getSentiment(responseData.sentiment),
          probability: getProbability(responseData.sentiment)
        });
      })
      .catch((err) => {
        alert(responseData["error"]);
      });

    if (text.trim() === '') {
      setSentiment('Please enter some text.');
      setSentimentClass('bg-destructive/10 text-destructive');
      return;
    }

    // Simple sentiment analysis
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'wonderful', 'amazing', 'love', 'awesome'];
    const negativeWords = ['bad', 'terrible', 'awful', 'sad', 'horrible', 'worst', 'hate', 'angry'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) {
      setSentiment('Positive Sentiment 😊');
      setSentimentClass('bg-green-100 text-green-800');
    } else if (negativeCount > positiveCount) {
      setSentiment('Negative Sentiment 😞');
      setSentimentClass('bg-destructive/10 text-destructive');
    } else {
      setSentiment('Neutral Sentiment 😐');
      setSentimentClass('bg-blue-100 text-blue-800');
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6 border-black ">
      <div className="space-y-6 rounded-lg border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-center">Sentiment Analyzer</h2>
        
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[150px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Enter text to analyze sentiment..."
        />
        
        <button 
          onClick={analyzeSentiment}
          className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring *: bg-gradient-to-r from-blue-500 to-blue-200"
        >
          Analyze Sentiment
        </button>
        
        {sentiment && (
          <div 
            className={`w-full p-3 rounded-md text-center font-semibold ${sentimentClass}`}
          >
            {sentiment}
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalyzer;
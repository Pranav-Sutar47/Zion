// import React, { useState } from 'react'

// const SentimentAnalysis = () => {
//   const [inputText, setInputText] = useState('')
//   const [sentiment, setSentiment] = useState(null)
//   const [error, setError] = useState('')

//   const handleSentimentAnalysis = async () => {
//     // Reset previous states
//     setSentiment(null)
//     setError('')

//     // Basic input validation
//     if (!inputText.trim()) {
//       setError('Please enter some text to analyze')
//       return
//     }

//     try {
//       // Simulated API call - replace with actual sentiment analysis endpoint
//       const response = await fetch('/api/sentiment-analysis', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ text: inputText })
//       })

//       if (!response.ok) {
//         throw new Error('Sentiment analysis failed')
//       }

//       const data = await response.json()
//       setSentiment(data.sentiment)
//     } catch (err) {
//       setError('Failed to analyze sentiment. Please try again.')
//       console.error(err)
//     }
//   }

//   const renderSentimentAnimation = () => {
//     switch(sentiment) {
//       case 'positive':
//         return (
//           <div className="flex justify-center items-center mt-6">
//             <div className="animate-bounce text-6xl text-green-500">
//               🎉
//             </div>
//             <div className="ml-4 text-green-600 font-semibold">
//               Positive Sentiment Detected!
//             </div>
//           </div>
//         )
//       case 'negative':
//         return (
//           <div className="flex justify-center items-center mt-6">
//             <div className="animate-pulse text-6xl text-red-500">
//               😞
//             </div>
//             <div className="ml-4 text-red-600 font-semibold">
//               Negative Sentiment Detected
//             </div>
//           </div>
//         )
//       case 'neutral':
//         return (
//           <div className="flex justify-center items-center mt-6">
//             <div className="text-6xl text-gray-500">
//               😐
//             </div>
//             <div className="ml-4 text-gray-600 font-semibold">
//               Neutral Sentiment Detected
//             </div>
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto p-6 bg-neutral-100 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Sentiment Analysis
//       </h2>
      
//       <div className="mb-4">
//         <textarea 
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="Enter text to analyze sentiment..."
//           className="w-full p-3 border border-neutral-300 rounded-lg 
//           focus:outline-none focus:ring-2 focus:ring-blue-500 
//           min-h-[100px] resize-y"
//         />
//       </div>
      
//       {error && (
//         <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg">
//           {error}
//         </div>
//       )}
      
//       <button 
//         onClick={handleSentimentAnalysis}
//         className="w-full bg-blue-500 text-white py-2 rounded-lg 
//         hover:bg-blue-600 transition-colors duration-300 
//         focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Analyze Sentiment
//       </button>
      
//       {sentiment && renderSentimentAnimation()}
//     </div>
//   )
// }

// export default SentimentAnalysis

// import React, { useState } from 'react'

// const SentimentAnalysis = () => {
//   const [inputText, setInputText] = useState('')
//   const [sentiment, setSentiment] = useState(null)
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSentimentAnalysis = async () => {
//     // Reset previous states
//     setSentiment(null)
//     setError('')
//     setLoading(true)

//     // Basic input validation
//     if (!inputText.trim()) {
//       setError('Please enter some text to analyze')
//       setLoading(false)
//       return
//     }

//     try {
//       // Simulated API call - replace with actual sentiment analysis endpoint
//       const response = await fetch('/api/sentiment-analysis', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ text: inputText })
//       })

//       if (!response.ok) {
//         throw new Error('Sentiment analysis failed')
//       }

//       const data = await response.json()
//       setSentiment(data.sentiment)
//     } catch (err) {
//       setError('Failed to analyze sentiment. Please try again.')
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderSentimentAnimation = () => {
//     switch(sentiment) {
//       case 'positive':
//         return (
//           <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
//             <div className="animate-bounce text-6xl text-green-500">
//               🎉
//             </div>
//             <div className="text-green-600 font-semibold text-center sm:text-left">
//               Positive Sentiment Detected!
//             </div>
//           </div>
//         )
//       case 'negative':
//         return (
//           <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
//             <div className="animate-pulse text-6xl text-red-500">
//               😞
//             </div>
//             <div className="text-red-600 font-semibold text-center sm:text-left">
//               Negative Sentiment Detected
//             </div>
//           </div>
//         )
//       case 'neutral':
//         return (
//           <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
//             <div className="text-6xl text-gray-500">
//               😐
//             </div>
//             <div className="text-gray-600 font-semibold text-center sm:text-left">
//               Neutral Sentiment Detected
//             </div>
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto w-full p-6 bg-white shadow-lg rounded-xl">
//       <div className="mb-6 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">
//           Sentiment Analysis
//         </h2>
//         <p className="text-gray-600 text-sm">
//           Analyze the sentiment of your text input
//         </p>
//       </div>

//       <div className="mb-4">
//         <textarea 
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="Enter text to analyze sentiment..."
//           className="w-full p-3 border border-gray-300 rounded-lg 
//           focus:outline-none focus:ring-2 focus:ring-blue-500 
//           min-h-[150px] resize-y text-gray-800"
//         />
//       </div>
      
//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
//           {error}
//         </div>
//       )}
      
//       <button 
//         onClick={handleSentimentAnalysis}
//         disabled={loading}
//         className={`
//           w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300
//           ${loading 
//             ? 'bg-gray-400 cursor-not-allowed' 
//             : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
//           }
//         `}
//       >
//         {loading ? 'Analyzing...' : 'Analyze Sentiment'}
//       </button>
      
//       {sentiment && renderSentimentAnimation()}
//     </div>
//   )
// }

// export default SentimentAnalysis

import React, { useState } from 'react';

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [sentimentClass, setSentimentClass] = useState('');

  const analyzeSentiment = () => {
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
    <div className="container mx-auto max-w-md p-6">
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
          className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
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
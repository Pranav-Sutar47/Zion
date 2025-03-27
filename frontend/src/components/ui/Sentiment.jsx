import React, { useState, useEffect } from 'react'

// Mock data service (replace with actual API call)
const fetchSentimentData = async () => {
  // Simulating an API call
  return {
    overallSentiment: {
      positive: 65.4,
      negative: 22.3,
      neutral: 12.3
    },
    sentimentTrends: [
      { month: 'Jan', positive: 58, negative: 25, neutral: 17 },
      { month: 'Feb', positive: 62, negative: 23, neutral: 15 },
      { month: 'Mar', positive: 65, negative: 22, neutral: 13 },
      { month: 'Apr', positive: 67, negative: 20, neutral: 13 },
      { month: 'May', positive: 70, negative: 18, neutral: 12 }
    ],
    topSources: [
      { name: 'Social Media', positive: 72, negative: 18, neutral: 10 },
      { name: 'Customer Support', positive: 58, negative: 30, neutral: 12 },
      { name: 'Product Reviews', positive: 61, negative: 25, neutral: 14 }
    ]
  }
}

const SentimentBar = ({ label, value, color }) => (
  <div className="mb-2">
    <div className="flex justify-between text-sm text-neutral-700 mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full bg-neutral-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${color}`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
)

const SentimentAnalytics = () => {
  const [sentimentData, setSentimentData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSentimentData()
        setSentimentData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch sentiment data', error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Sentiment Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
          <h3 className="text-xl font-semibold mb-4 text-neutral-800">
            Overall Sentiment
          </h3>
          <div className="space-y-3">
            <SentimentBar 
              label="Positive" 
              value={sentimentData.overallSentiment.positive} 
              color="bg-green-500" 
            />
            <SentimentBar 
              label="Negative" 
              value={sentimentData.overallSentiment.negative} 
              color="bg-red-500" 
            />
            <SentimentBar 
              label="Neutral" 
              value={sentimentData.overallSentiment.neutral} 
              color="bg-blue-500" 
            />
          </div>
        </div>

        {/* Sentiment Trends */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
          <h3 className="text-xl font-semibold mb-4 text-neutral-800">
            Monthly Trends
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {sentimentData.sentimentTrends.map((trend, index) => (
              <div 
                key={index} 
                className="text-center bg-neutral-100 p-3 rounded hover:bg-neutral-200 transition-colors"
              >
                <p className="text-sm text-neutral-600">{trend.month}</p>
                <p className="text-green-600 font-bold">{trend.positive}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sources */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
          <h3 className="text-xl font-semibold mb-4 text-neutral-800">
            Sentiment by Source
          </h3>
          <div className="space-y-3">
            {sentimentData.topSources.map((source, index) => (
              <div key={index} className="bg-neutral-100 p-3 rounded">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-neutral-800">{source.name}</span>
                  <span className="text-green-600 font-bold">{source.positive}%</span>
                </div>
                <div className="flex space-x-2">
                  <div 
                    className="h-2 bg-green-500 rounded-full" 
                    style={{ width: `${source.positive}%` }}
                  />
                  <div 
                    className="h-2 bg-red-500 rounded-full" 
                    style={{ width: `${source.negative}%` }}
                  />
                  <div 
                    className="h-2 bg-blue-500 rounded-full" 
                    style={{ width: `${source.neutral}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
        <h3 className="text-xl font-semibold mb-4 text-neutral-800">
          Detailed Insights
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-neutral-100 p-4 rounded">
            <h4 className="font-semibold text-neutral-700 mb-2">Key Observations</h4>
            <ul className="list-disc list-inside text-neutral-600 space-y-1">
              <li>Positive sentiment increased by 12% this quarter</li>
              <li>Customer support shows improvement</li>
              <li>Social media feedback remains consistently positive</li>
            </ul>
          </div>
          <div className="bg-neutral-100 p-4 rounded">
            <h4 className="font-semibold text-neutral-700 mb-2">Recommendations</h4>
            <ul className="list-disc list-inside text-neutral-600 space-y-1">
              <li>Focus on reducing negative sentiment in customer support</li>
              <li>Maintain current social media engagement strategy</li>
              <li>Investigate sources of neutral sentiment</li>
            </ul>
          </div>
          <div className="bg-neutral-100 p-4 rounded">
            <h4 className="font-semibold text-neutral-700 mb-2">Next Steps</h4>
            <ul className="list-disc list-inside text-neutral-600 space-y-1">
              <li>Conduct detailed customer interviews</li>
              <li>Develop targeted improvement plan</li>
              <li>Implement feedback collection mechanism</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SentimentAnalytics
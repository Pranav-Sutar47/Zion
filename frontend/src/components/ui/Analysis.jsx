import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const AnalyticsContent = ({stats}) => {

  console.log(stats);
  // State to store sentiment data
  const [sentimentData, setSentimentData] = useState([
    { name: 'Positive', value:stats.positive, color: '#10B981' },
    { name: 'Neutral', value: stats.neutral, color: '#3B82F6' },
    { name: 'Negative', value: stats.negative, color: '#EF4444' }
  ])

  // State for additional metrics
  const [metrics, setMetrics] = useState({
    totalReviews: stats.total_tweets,
    averageSentiment: 0,
    mostFrequentSentiment: 'Positive'
  })

  // Simulated API call (replace with actual API fetch)
  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const total = sentimentData.reduce((sum, item) => sum + item.value, 0)
        const mostFrequent = sentimentData.reduce((prev, current) => 
          (prev.value > current.value) ? prev : current
        )

        setMetrics({
          totalReviews: total,
          averageSentiment: calculateAverageSentiment(sentimentData),
          mostFrequentSentiment: mostFrequent.name
        })
      } catch (error) {
        console.error('Error fetching sentiment data:', error)
      }
    }

    fetchSentimentData()
  }, [sentimentData])

  // Calculate weighted average sentiment
  const calculateAverageSentiment = (data) => {
    const sentimentWeights = { 
      'Negative': 1, 
      'Neutral': 2, 
      'Positive': 3 
    }
    const weightedSum = data.reduce((sum, item) => 
      sum + (item.value * sentimentWeights[item.name]), 0)
    const totalValue = data.reduce((sum, item) => sum + item.value, 0)
    return ((weightedSum / totalValue) * 100).toFixed(2)
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div 
          className="bg-neutral-100 p-6 rounded-lg 
          hover:bg-neutral-200 transition-colors duration-300"
        >
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} (${((value / metrics.totalReviews) * 100).toFixed(1)}%)`, 
                    name
                  ]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div 
          className="bg-neutral-100 p-6 rounded-lg 
          hover:bg-neutral-200 transition-colors duration-300"
        >
          <h3 className="text-xl font-semibold mb-4">Sentiment Insights</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-neutral-600">Total Reviews</p>
              <p className="text-2xl font-bold">{metrics.totalReviews}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-neutral-600">Average Sentiment Score</p>
              <p className="text-2xl font-bold">{metrics.averageSentiment}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-neutral-600">Most Frequent Sentiment</p>
              <p className="text-2xl font-bold">{metrics.mostFrequentSentiment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsContent
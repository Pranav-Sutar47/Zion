import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Analysis from './Analysis'

const Dashboard = () => {
  const [stats, setStats] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
    total_tweets:0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const url = String(import.meta.env.VITE_BASEURL)+'/tweet_sentiment_summary'; 
        const response = await axios.get(url); // Replace with your API URL
        setStats(response.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Positive Sentiments', value: stats.positive, className: 'bg-blue-500/10 text-blue-600' },
    { title: 'Negative  Sentiments', value: stats.negative, className: 'bg-green-500/10 text-green-600' },
    { title: 'Neutral  Sentiments', value: stats.neutral, className: 'bg-yellow-500/10 text-yellow-600' },
    { title: 'Total  Sentiments', value: stats.total_tweets, className: 'bg-purple-500/10 text-purple-600' }

  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

      {loading ? (
        <Loader/>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
        <Analysis stats={stats}/>
        <br/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`
                p-6 rounded-lg shadow-lg 
                ${card.className}
                transform transition-transform duration-300 
                hover:scale-105
              `}
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
          ))}
        </div>
        </>
      )}
    </div>

  );
};

export default Dashboard;
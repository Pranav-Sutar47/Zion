# Real-Time Sentiment Analysis on Social Media

## 📌 Project Overview
Governments and organizations often struggle to track public opinion in real-time. This project aims to address this issue by building an AI-based system that analyzes social media posts, classifying them into **positive, negative, or neutral** sentiments.

## 🚀 Features
- **Real-time Data Fetching**: Utilizes **Twitter API** and **Reddit API** to collect data on topics related to governments and organizations.
- **Sentiment Analysis Model**: Developed using **Logistic Regression** to classify sentiments.
- **Database Storage**: Stores collected social media data for further analysis.
- **Interactive Dashboard**: Provides visual representation of sentiments using **charts**.
- **Sentiment Breakdown**: Displays the percentage of positive, negative, and neutral sentiments.

## 🛠️ Tech Stack
- **Backend**: Python Flask
- **Frontend**: React.js with **Accertinity** and **Magic UI**
- **Database**: MongoDB
- **Machine Learning**: Logistic Regression for sentiment classification

## 📊 Dashboard
The project includes a dashboard where users can:
- View sentiment distribution in **real-time**.
- Analyze the proportion of **positive, negative, and neutral** sentiments.
- Monitor trends in public opinion over time.

## 🔧 Setup & Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/real-time-sentiment-analysis.git
   cd real-time-sentiment-analysis
   ```
2. **Backend Setup (Flask)**:
   ```bash
   pip install -r requirements.txt
   python app.py
   ```
3. **Frontend Setup (React.js)**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. **Environment Variables**:
   - Set up API keys for **Twitter API** and **Reddit API** in a `.env` file.
   - Configure database connection.

## 📌 Usage
- Run the backend and frontend servers.
- The system will fetch real-time social media data and analyze sentiment.
- Access the dashboard via `http://localhost:5173`.

## 📈 Future Enhancements
- Expand to more social media platforms.
- Implement deep learning models for improved accuracy.
- Add support for multilingual sentiment analysis.

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

## 📝 License
This project is licensed under the MIT License.

---
Developed by **Pranav Sutar and Team**
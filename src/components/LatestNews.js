import React, { useState } from 'react';
import { CONFIG } from './config';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const baseURL = CONFIG.BASE_URL;

function LatestNews() {
  const [query, setQuery] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch news based on user input
  const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${baseURL}/search_news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Error fetching news');
      }
      setNews(data);
      toast.success('News successfully fetched!'); // Show success toast
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchNews();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Latest News in IT and Your Domain</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter what you want to search about"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 mb-4 rounded w-full text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="mt-6">
        {news.length > 0 ? (
          <ul>
            {news.map((article, index) => (
              <li key={index} className="mb-4 p-4 bg-gray-700 rounded-lg">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  <h3 className="text-xl font-semibold">{article.title}</h3>
                </a>
                <p className="text-gray-300">{article.description}</p>
                <p className="text-gray-400 mt-2">
                  Published: {new Date(article['published date']).toLocaleString()} by{' '}
                  <a href={article.publisher.href} className="text-green-400 hover:underline">
                    {article.publisher.title}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="text-white">No news articles found.</p>
        )}
      </div>

      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default LatestNews;

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CACHE_KEY = 'orbital_news_cache';
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('technology'); // default category
  const [search, setSearch] = useState('');

  const fetchNews = async (forceRefresh = false) => {
    setLoading(true);
    try {
      if (!forceRefresh) {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const cached = JSON.parse(cachedStr);
          if (Date.now() - cached.timestamp < CACHE_TIME && cached.category === category) {
            setNews(cached.articles);
            setLoading(false);
            return;
          }
        }
      }

      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      let url = '';
      
      // If API key is present and valid, use official NewsAPI, else fallback to free proxy
      if (apiKey && apiKey !== 'your_newsapi_key_here') {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
      } else {
        url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();
      
      // Take only the first 10 valid articles
      const articles = (data.articles || [])
        .filter(article => article.title && article.title !== '[Removed]')
        .slice(0, 10);

      setNews(articles);
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        category,
        articles
      }));
    } catch (err) {
      console.error(err);
      toast.error('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const filteredNews = news.filter(article => 
    article.title?.toLowerCase().includes(search.toLowerCase()) || 
    article.description?.toLowerCase().includes(search.toLowerCase())
  );

  return { 
    news: filteredNews, 
    allNews: news, // used for charts
    loading, 
    category, 
    setCategory, 
    search, 
    setSearch, 
    refetch: () => fetchNews(true) 
  };
}

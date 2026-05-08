import React from 'react';
import { Search } from 'lucide-react';
import { NewsCard } from './NewsCard';

export function NewsList({ news, loading, search, setSearch, refetch }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search title, source, author..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 text-sm shadow-sm text-gray-900"
          />
        </div>
        <select className="px-3 py-2.5 bg-white dark:bg-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg text-sm focus:outline-none shadow-sm text-gray-900">
          <option>Sort by Date</option>
          <option>Sort by Source</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2" style={{ maxHeight: '380px' }}>
        {loading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 h-14 rounded-xl w-full border border-gray-200"></div>
          ))
        ) : news.length > 0 ? (
          news.map((article, index) => (
            <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 text-sm font-medium bg-[#fffbeb] rounded-xl border border-[#fef3c7]">
            No articles found. Try a different search.
          </div>
        )}
      </div>
    </div>
  );
}

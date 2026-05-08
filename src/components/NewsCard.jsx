import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

export function NewsCard({ article, index }) {
  const [expanded, setExpanded] = useState(false);
  const fallbackImg = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop";
  const dateStr = article.publishedAt ? format(new Date(article.publishedAt), "dd/MM/yyyy, HH:mm:ss") : 'Unknown date';

  return (
    <div 
      className={`flex bg-[#fffbeb] rounded-xl overflow-hidden border ${expanded ? 'border-red-400' : 'border-[#fef3c7]'} transition-all cursor-pointer hover:bg-white/50 shadow-sm`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Left side: Thumbnail */}
      <div className={`relative ${expanded ? 'w-32' : 'w-16'} h-auto transition-all flex-shrink-0 bg-gray-200`}>
        <img 
          src={article.urlToImage || fallbackImg} 
          alt="Thumbnail" 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = fallbackImg; }}
        />
        <div className="absolute top-0 left-0 bg-[#ef4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-md">
          {index + 1}
        </div>
      </div>
      
      {/* Right side: Content */}
      <div className="flex-1 flex flex-col p-2 pl-4 justify-center overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-[10px] text-[#3b82f6] uppercase tracking-tight">
            {article.source?.name || 'GLOBAL NEWS'}
          </span>
          <span className="text-[9px] font-medium text-gray-400">{dateStr}</span>
        </div>
        
        {expanded ? (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200 pr-4">
            <h3 className="font-bold text-xs text-gray-900 mb-1 leading-snug">
              {article.title}
            </h3>
            <p className="text-[10px] text-gray-600 leading-normal line-clamp-3 mb-2">
              {article.description || 'No detailed description available for this breaking news article.'}
            </p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-bold text-red-500 hover:underline"
            >
              READ FULL STORY
            </a>
          </div>
        ) : null}
      </div>
      
      {/* Far right: Arrow */}
      <div className="flex items-center pr-3">
        <div className={`p-1 rounded bg-red-100/50 text-red-500 transition-transform ${expanded ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

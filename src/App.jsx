import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { useISS } from './hooks/useISS';
import { useNews } from './hooks/useNews';
import { MapComponent } from './components/MapComponent';
import { NewsList } from './components/NewsList';
import { SpeedChart } from './components/SpeedChart';
import { Chatbot } from './components/Chatbot';

function App() {
  const issData = useISS();
  const newsData = useNews();
  
  const { position, path, currentSpeed, speedHistory, nearestPlace, loading: issLoading, refetch: refetchISS } = issData;
  const { news, loading: newsLoading, search, setSearch, refetch: refetchNews } = newsData;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-h)] transition-colors duration-300 relative font-sans p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto w-full">
        <Header />
        
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: ISS Tracker & News */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* ISS Live Tracking Card */}
            <section className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-[var(--text-h)]">ISS Live Tracking</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={refetchISS} 
                    className="px-4 py-1.5 border border-[var(--border)] rounded-full text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Refresh Now
                  </button>
                  <button 
                    className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#1e293b] text-white cursor-default"
                  >
                    Auto-Refresh: ON
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#fffbeb] border border-[#fef3c7] p-4 rounded-xl shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Latitude / Longitude</p>
                  <p className="text-sm font-bold text-gray-900">
                    {position ? `${position.lat.toFixed(3)}, ${position.lng.toFixed(3)}` : 'Loading...'}
                  </p>
                </div>
                <div className="bg-[#fffbeb] border border-[#fef3c7] p-4 rounded-xl shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Speed</p>
                  <p className="text-sm font-bold text-gray-900">{Math.round(currentSpeed).toLocaleString()} km/h</p>
                </div>
                <div className="bg-[#fffbeb] border border-[#fef3c7] p-4 rounded-xl shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Nearest Place</p>
                  <p className="text-sm font-bold text-gray-900 truncate" title={nearestPlace}>{nearestPlace}</p>
                </div>
                <div className="bg-[#fffbeb] border border-[#fef3c7] p-4 rounded-xl shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Tracked Positions</p>
                  <p className="text-sm font-bold text-gray-900">{path.length}</p>
                </div>
              </div>

              {/* Map */}
              <div className="h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-[var(--border)]">
                <MapComponent position={position} path={path} />
              </div>
            </section>

            {/* Breaking News Card */}
            <section className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-[var(--text-h)]">Breaking News</h2>
                <button 
                  onClick={refetchNews}
                  className="px-4 py-1.5 border border-[var(--border)] rounded-full text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Refresh
                </button>
              </div>
              <div className="flex-1">
                <NewsList 
                  news={news} 
                  loading={newsLoading} 
                  search={search} 
                  setSearch={setSearch} 
                />
              </div>
            </section>

          </div>

          {/* Right Column: Speed Trend & Chatbot */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-6 flex flex-col min-h-[400px]">
              <h2 className="text-xl font-black text-[var(--text-h)] mb-6">ISS Speed Trend</h2>
              <div className="flex-1 min-h-[300px]">
                <SpeedChart data={speedHistory} />
              </div>
            </section>
          </div>
        </main>

        <Chatbot issData={issData} newsData={newsData} />
      </div>
      <Toaster position="bottom-left" />
    </div>
  );
}

export default App;

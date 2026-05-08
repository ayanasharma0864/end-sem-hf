import React from 'react';
import { Activity, MapPin, Users, RefreshCw } from 'lucide-react';

export function ISSStats({ position, speed, nearestPlace, people, onRefresh, loading }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-[#1f2028] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Speed (km/h)</p>
          <p className="text-xl font-bold">{Math.round(speed).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#1f2028] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
          <MapPin className="w-6 h-6" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-gray-500 dark:text-gray-400">Nearest Place</p>
          <p className="text-lg font-bold truncate" title={nearestPlace}>{nearestPlace}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1f2028] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 group relative cursor-pointer">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">People in Space</p>
          <p className="text-xl font-bold">{people.number}</p>
        </div>
        {/* Tooltip for names */}
        {people.names.length > 0 && (
          <div className="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <h4 className="font-semibold text-sm mb-2 border-b dark:border-gray-700 pb-1">Astronauts</h4>
            <ul className="text-sm space-y-1">
              {people.names.map((name, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-300">• {name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1f2028] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Coordinates</p>
          <p className="text-sm font-bold">
            {position ? `${position.lat.toFixed(2)}, ${position.lng.toFixed(2)}` : 'Loading...'}
          </p>
        </div>
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
          title="Refresh Data"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-gray-400' : 'text-gray-600 dark:text-gray-300'}`} />
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react'

export default function HistoryPanel({ onLoadConversion }) {
  const [history, setHistory] = useState([])
  const [favorites, setFavorites] = useState([])

  // Load from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('conversionHistory')
    const savedFavorites = localStorage.getItem('favoriteGames')
    if (savedHistory) setHistory(JSON.parse(savedHistory))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  const addToHistory = (conversion) => {
    const newHistory = [conversion, ...history.slice(0, 9)] // Keep last 10
    setHistory(newHistory)
    localStorage.setItem('conversionHistory', JSON.stringify(newHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('conversionHistory')
  }

  const toggleFavorite = (game) => {
    const newFavorites = favorites.includes(game)
      ? favorites.filter(f => f !== game)
      : [...favorites, game]
    setFavorites(newFavorites)
    localStorage.setItem('favoriteGames', JSON.stringify(newFavorites))
  }

  const exportHistory = () => {
    const data = { history, favorites, exportDate: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sensitivity-history-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Expose addToHistory function
  useEffect(() => {
    window.addToHistory = addToHistory
  }, [history])

  return (
    <div className="space-y-4">
      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-lg">
          <h3 className="font-bold mb-4 text-sm dark:text-white flex items-center gap-2">
            <span className="text-lg">⭐</span>
            Favorite Games
          </h3>
          <div className="flex flex-wrap gap-2">
            {favorites.map(game => (
              <button
                key={game}
                onClick={() => toggleFavorite(game)}
                className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-300 rounded-xl hover:from-yellow-200 hover:to-orange-200 dark:hover:from-yellow-900/40 dark:hover:to-orange-900/40 transition-all border border-yellow-300 dark:border-yellow-700 shadow-sm"
              >
                {game} ×
              </button>
            ))}
          </div>
        </div>
      )}

      {/* History Section */}
      <div className="p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm dark:text-white flex items-center gap-2">
            <span className="text-lg">🕐</span>
            Recent Conversions
          </h3>
          {history.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={exportHistory}
                className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-400 rounded-xl hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-900/40 dark:hover:to-cyan-900/40 transition-all font-medium border border-blue-200 dark:border-blue-800"
                title="Export history"
              >
                💾
              </button>
              <button
                onClick={clearHistory}
                className="text-xs px-3 py-1.5 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-400 rounded-xl hover:from-red-200 hover:to-pink-200 dark:hover:from-red-900/40 dark:hover:to-pink-900/40 transition-all font-medium border border-red-200 dark:border-red-800"
              >
                🗑️
              </button>
            </div>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No recent conversions</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Your history will appear here</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
            {history.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl text-xs hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all border border-gray-200 dark:border-gray-600 shadow-sm"
              >
                <div className="font-semibold dark:text-white flex items-center gap-2 mb-1">
                  <span className="text-blue-500">🎮</span>
                  {item.fromGame} → {item.toGame}
                </div>
                <div className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-white dark:bg-gray-800 rounded-md font-medium">{item.converted}</span>
                  <span className="text-gray-400">•</span>
                  <span>🖱️ {item.fromDpi} DPI</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { PRO_PLAYERS, searchProPlayers } from '../data/proPlayers'

export default function ProPlayersPanel({ onLoadPro }) {
  const [selectedGame, setSelectedGame] = useState('Valorant')
  const [searchQuery, setSearchQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const games = Object.keys(PRO_PLAYERS)
  const players = searchQuery 
    ? searchProPlayers(searchQuery) 
    : PRO_PLAYERS[selectedGame] || []

  const handleLoadPro = (player) => {
    onLoadPro({
      game: searchQuery ? player.game : selectedGame,
      sens: player.sens,
      dpi: player.dpi,
      playerName: player.name
    })
  }

  return (
    <div className="p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm dark:text-white flex items-center gap-2">
          <span className="text-lg">🏆</span>
          Pro Player Settings
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
        >
          <svg 
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search pros or teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Game Filter (only show if not searching) */}
          {!searchQuery && (
            <div className="mb-4 flex flex-wrap gap-2">
              {games.map(game => (
                <button
                  key={game}
                  onClick={() => setSelectedGame(game)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedGame === game
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {game.split(':')[0]}
                </button>
              ))}
            </div>
          )}

          {/* Pro Players List */}
          <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
            {players.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">No pros found</p>
              </div>
            ) : (
              players.map((player, index) => (
                <div
                  key={`${player.name}-${index}`}
                  className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl border border-gray-200 dark:border-gray-600 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm dark:text-white">{player.name}</span>
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-xs font-medium">
                          {player.team}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {player.role} {searchQuery && `• ${player.game}`}
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400">Sens:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">{player.sens}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400">DPI:</span>
                          <span className="font-bold text-orange-600 dark:text-orange-400">{player.dpi}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400">eDPI:</span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">{player.edpi}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleLoadPro(player)}
                      className="ml-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all font-semibold text-xs shadow-lg opacity-0 group-hover:opacity-100"
                    >
                      Try It
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Info Footer */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Click "Try It" to load pro settings into the converter
            </p>
          </div>
        </>
      )}

      {!isExpanded && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Browse {Object.values(PRO_PLAYERS).flat().length}+ pro player settings
        </p>
      )}
    </div>
  )
}

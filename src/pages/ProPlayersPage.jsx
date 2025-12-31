import React, { useState, useMemo } from 'react'
import { 
  getAllDetailedPros, 
  getGamesWithDetailedPros, 
  getAllRoles, 
  getAllTeams 
} from '../data/proPlayersDetailed'
import ProPlayerCard from '../components/ProPlayerCard'
import ProPlayerDetailPage from './ProPlayerDetailPage'

export default function ProPlayersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGame, setSelectedGame] = useState('All')
  const [selectedRole, setSelectedRole] = useState('All')
  const [selectedTeam, setSelectedTeam] = useState('All')
  const [sortBy, setSortBy] = useState('name') // name, edpi, dpi, sens
  const [selectedPlayer, setSelectedPlayer] = useState(null) // For detail view

  const games = ['All', ...getGamesWithDetailedPros()]
  const roles = ['All', ...getAllRoles()]
  const teams = ['All', ...getAllTeams()]

  // Filter and sort players
  const filteredPlayers = useMemo(() => {
    let players = getAllDetailedPros()

    // Search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      players = players.filter(player => 
        player.name.toLowerCase().includes(lowerQuery) ||
        player.team.toLowerCase().includes(lowerQuery) ||
        player.country.toLowerCase().includes(lowerQuery) ||
        player.role.toLowerCase().includes(lowerQuery)
      )
    }

    // Game filter
    if (selectedGame !== 'All') {
      players = players.filter(player => player.game === selectedGame)
    }

    // Role filter
    if (selectedRole !== 'All') {
      players = players.filter(player => player.role === selectedRole)
    }

    // Team filter
    if (selectedTeam !== 'All') {
      players = players.filter(player => player.team === selectedTeam)
    }

    // Sorting
    players.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'edpi':
          return b.mouse.edpi - a.mouse.edpi
        case 'dpi':
          return b.mouse.dpi - a.mouse.dpi
        case 'sens':
          return b.mouse.sens - a.mouse.sens
        default:
          return 0
      }
    })

    return players
  }, [searchQuery, selectedGame, selectedRole, selectedTeam, sortBy])

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player)
  }

  const handleBackToList = () => {
    setSelectedPlayer(null)
  }

  const handleLoadSettings = (player) => {
    // Store in localStorage to pass to converter
    localStorage.setItem('loadedProSettings', JSON.stringify({
      game: player.game,
      sens: player.mouse.sens,
      dpi: player.mouse.dpi,
      playerName: player.name
    }))
    
    // Show success notification
    alert(`✅ ${player.name}'s settings loaded! Switch to Converter to use them.`)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedGame('All')
    setSelectedRole('All')
    setSelectedTeam('All')
    setSortBy('name')
  }

  // Show detail page if player is selected
  if (selectedPlayer) {
    return (
      <ProPlayerDetailPage 
        player={selectedPlayer} 
        onBack={handleBackToList}
        onLoadSettings={handleLoadSettings}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="text-4xl">🏆</span>
              Pro Players Database
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Complete settings from {getAllDetailedPros().length} top esports professionals
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-3xl font-bold">{filteredPlayers.length}</div>
            <div className="text-sm text-blue-100">Players Found</div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search by name, team, country, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Game Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">GAME</label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-blue-500 transition-all"
            >
              {games.map(game => (
                <option key={game} value={game}>{game}</option>
              ))}
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">ROLE</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-blue-500 transition-all"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Team Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">TEAM</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-blue-500 transition-all"
            >
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">SORT BY</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-blue-500 transition-all"
            >
              <option value="name">Name (A-Z)</option>
              <option value="edpi">eDPI (High to Low)</option>
              <option value="dpi">DPI (High to Low)</option>
              <option value="sens">Sensitivity (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchQuery || selectedGame !== 'All' || selectedRole !== 'All' || selectedTeam !== 'All') && (
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all text-sm"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Players Grid */}
      {filteredPlayers.length === 0 ? (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-16 text-center shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No Players Found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or search query</p>
          <button
            onClick={handleClearFilters}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPlayers.map((player, index) => (
            <ProPlayerCard 
              key={`${player.name}-${player.team}-${index}`} 
              player={player}
              onClick={() => handlePlayerClick(player)}
            />
          ))}
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-6 border-2 border-blue-200 dark:border-blue-800">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{getAllDetailedPros().length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Players</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{games.length - 1}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Games</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{teams.length - 1}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Teams</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{roles.length - 1}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Roles</div>
          </div>
        </div>
      </div>
    </div>
  )
}

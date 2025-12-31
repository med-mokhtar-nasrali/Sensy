import React from 'react'

export default function ProPlayerCard({ player, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transform hover:scale-105 duration-300 w-full"
    >
      {/* Player Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
        <img 
          src={player.image || 'https://via.placeholder.com/400x400?text=Pro+Player'} 
          alt={player.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(player.name)
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Game badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
          <span className="text-white text-xs font-bold">{player.game}</span>
        </div>
      </div>

      {/* Player Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
        <h3 className="text-white text-2xl font-bold mb-1 drop-shadow-lg">{player.name}</h3>
        <div className="flex items-center gap-2 text-white/90 text-sm">
          <span className="font-semibold">{player.team}</span>
          <span>•</span>
          <span>{player.role}</span>
        </div>
      </div>
    </button>
  )
}

import React from 'react'

export default function ProPlayerDetailPage({ player, onBack, onLoadSettings }) {
  if (!player) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Player not found</h2>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
        >
          Back to Players
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Players
      </button>

      {/* Player Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Player Image */}
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={player.image || 'https://via.placeholder.com/600x600?text=' + encodeURIComponent(player.name)}
              alt={player.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x600?text=' + encodeURIComponent(player.name)
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Player Info */}
          <div className="p-8 text-white flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-bold">
                {player.game}
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-bold">
                {player.role}
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-3">{player.name}</h1>
            
            <div className="flex items-center gap-4 text-xl mb-6">
              <span className="font-semibold">{player.team}</span>
              <span>•</span>
              <span>{player.country}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">{player.mouse.sens}</div>
                <div className="text-sm text-white/80">Sensitivity</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">{player.mouse.dpi}</div>
                <div className="text-sm text-white/80">DPI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">{player.mouse.edpi}</div>
                <div className="text-sm text-white/80">eDPI</div>
              </div>
            </div>

            <button
              onClick={() => onLoadSettings(player)}
              className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Load Settings to Converter
            </button>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mouse Settings */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-2xl dark:text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">🖱️</span> Mouse Settings
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Sensitivity</span>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">{player.mouse.sens}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">DPI</span>
              <span className="font-bold text-orange-600 dark:text-orange-400 text-lg">{player.mouse.dpi}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">eDPI</span>
              <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">{player.mouse.edpi}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Polling Rate</span>
              <span className="font-bold dark:text-white">{player.mouse.pollingRate} Hz</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Mouse</span>
              <span className="font-bold dark:text-white text-right">{player.mouse.mouseName}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Mousepad</span>
              <span className="font-bold dark:text-white text-right">{player.mouse.mousepadName}</span>
            </div>
          </div>
        </div>

        {/* Monitor Settings */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-2xl dark:text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">🖥️</span> Monitor Settings
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Monitor</span>
              <span className="font-bold dark:text-white text-right">{player.monitor.monitorName}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Refresh Rate</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{player.monitor.refreshRate} Hz</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Resolution</span>
              <span className="font-bold dark:text-white">{player.monitor.resolution}</span>
            </div>
          </div>
        </div>

        {/* In-Game Settings */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-2xl dark:text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">🎮</span> In-Game Settings
          </h2>
          <div className="space-y-3">
            {player.ingame.fov && (
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">FOV</span>
                <span className="font-bold dark:text-white">{player.ingame.fov}</span>
              </div>
            )}
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Aspect Ratio</span>
              <span className="font-bold dark:text-white">{player.ingame.aspectRatio}</span>
            </div>
            {player.ingame.scopedSens && (
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">Scoped Sens</span>
                <span className="font-bold dark:text-white">{player.ingame.scopedSens}</span>
              </div>
            )}
            {player.ingame.adsMultiplier && (
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">ADS Multiplier</span>
                <span className="font-bold dark:text-white">{player.ingame.adsMultiplier}</span>
              </div>
            )}
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-gray-600 dark:text-gray-400">Graphics</span>
              <span className="font-bold dark:text-white">{player.ingame.graphics}</span>
            </div>
          </div>
        </div>

        {/* Crosshair Settings */}
        {player.crosshair && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-2xl dark:text-white mb-4 flex items-center gap-2">
              <span className="text-3xl">🎯</span> Crosshair Settings
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">Color</span>
                <span className="font-bold dark:text-white">{player.crosshair.color}</span>
              </div>
              {player.crosshair.style && (
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-400">Style</span>
                  <span className="font-bold dark:text-white">{player.crosshair.style}</span>
                </div>
              )}
              {player.crosshair.outlines && (
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-400">Outlines</span>
                  <span className="font-bold dark:text-white">{player.crosshair.outlines}</span>
                </div>
              )}
              {player.crosshair.centerDot && (
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-400">Center Dot</span>
                  <span className="font-bold dark:text-white">{player.crosshair.centerDot}</span>
                </div>
              )}
              {player.crosshair.innerLines && (
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <div className="text-gray-600 dark:text-gray-400 mb-2">Inner Lines</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Length:</span>
                      <span className="font-bold dark:text-white">{player.crosshair.innerLines.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Thickness:</span>
                      <span className="font-bold dark:text-white">{player.crosshair.innerLines.thickness}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Offset:</span>
                      <span className="font-bold dark:text-white">{player.crosshair.innerLines.offset}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Peripherals */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-2xl dark:text-white mb-4 flex items-center gap-2">
          <span className="text-3xl">⚙️</span> Peripherals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl text-center">
            <div className="text-3xl mb-2">⌨️</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Keyboard</div>
            <div className="font-bold dark:text-white">{player.gear.keyboard}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl text-center">
            <div className="text-3xl mb-2">🎧</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Headset</div>
            <div className="font-bold dark:text-white">{player.gear.headset}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl text-center">
            <div className="text-3xl mb-2">🖱️</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mousepad</div>
            <div className="font-bold dark:text-white">{player.gear.mousepad}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

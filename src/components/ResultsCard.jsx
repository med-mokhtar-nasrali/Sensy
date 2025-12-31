import React, { useState } from 'react'

export default function ResultsCard({ result }) {
  const [copied, setCopied] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  const copyToClipboard = () => {
    // Copy only the sensitivity value
    const text = result.converted.toString()
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareAsImage = () => {
    // Create shareable text
    let shareText = ''
    if (result.mode === 'game') {
      shareText = `🎮 ${result.fromGame} → ${result.toGame}\n📊 Sensitivity: ${result.converted}\n🎯 cm/360°: ${result.cm360} cm`
      if (result.dpiChanged) {
        shareText += `\n🖱️ ${result.fromDpi} DPI → ${result.toDpi} DPI`
      }
    } else {
      shareText = `🎮 ${result.fromGame}\n🖱️ ${result.fromDpi} DPI → ${result.toDpi} DPI\n📊 New Sensitivity: ${result.converted}\n🎯 cm/360°: ${result.cm360} cm`
    }
    shareText += '\n\n✨ Via Sensy by KrAKeN'
    
    if (navigator.share) {
      navigator.share({ text: shareText, title: 'My Sensitivity Conversion' })
        .catch(() => {})
    } else {
      copyToClipboard()
    }
    setShareMenuOpen(false)
  }

  const exportAsJSON = () => {
    const data = {
      ...result,
      exportDate: new Date().toISOString(),
      exportedBy: 'Sensy v0.2'
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sensitivity-${result.fromGame}-to-${result.toGame}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setShareMenuOpen(false)
  }

  return (
    <div className="mt-6 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-xl animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <span className="text-2xl">✨</span> Results
        </h2>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 rounded-xl transition-all font-semibold border border-green-200 dark:border-green-800 shadow-sm"
            title="Copy sensitivity value"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-600 dark:text-green-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-green-700 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-green-700 dark:text-green-400">Copy Sens</span>
              </>
            )}
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
            
            {shareMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10">
                <button
                  onClick={shareAsImage}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded-t-lg"
                >
                  📱 Share as Text
                </button>
                <button
                  onClick={exportAsJSON}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded-b-lg"
                >
                  💾 Export as JSON
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {result.mode === 'game' ? (
        // Game to Game conversion results
        <div className="space-y-4">
          <div className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-md">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Converted Sensitivity</div>
            <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{result.converted}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
              <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs font-medium">{result.fromGame}</span>
              <span>→</span>
              <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs font-medium">{result.toGame}</span>
            </div>
          </div>
          
          {result.dpiChanged ? (
            // Show detailed DPI conversion info when DPI changed
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200 dark:border-orange-800">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Original eDPI</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.fromEdpi}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                  🖱️ {result.fromDpi} DPI
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200 dark:border-orange-800">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">New eDPI</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.toEdpi}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                  🖱️ {result.toDpi} DPI
                </div>
              </div>
            </div>
          ) : (
            // Show single eDPI when DPI is the same
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">eDPI</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.toEdpi}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                🖱️ {result.fromDpi} DPI
              </div>
            </div>
          )}
          
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
              📏 cm/360° {result.dpiChanged && <span className="text-xs px-2 py-0.5 bg-green-200 dark:bg-green-800 rounded-full">consistent</span>}
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{result.cm360} cm</div>
          </div>
        </div>
      ) : (
        // DPI to DPI conversion results
        <div className="space-y-4">
          <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800 shadow-md">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">New Sensitivity at {result.toDpi} DPI</div>
            <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{result.converted}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs font-medium">{result.fromGame}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Original eDPI</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.fromEdpi}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                🖱️ {result.fromDpi} DPI
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">New eDPI</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.edpi}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                🖱️ {result.toDpi} DPI
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
              📏 cm/360° <span className="text-xs px-2 py-0.5 bg-green-200 dark:bg-green-800 rounded-full">consistent</span>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{result.cm360} cm</div>
          </div>
        </div>
      )}
    </div>
  )
}

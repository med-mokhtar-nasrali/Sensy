import React, { useState, useEffect } from 'react'

export default function ResultsModal({ result, onClose }) {
  const [copied, setCopied] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const copyToClipboard = () => {
    const text = result.converted.toString()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareAsImage = () => {
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
      navigator.share({ text: shareText, title: 'My Sensitivity Conversion' }).catch(() => {})
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
    a.download = `sensy-${result.fromGame}-to-${result.toGame}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setShareMenuOpen(false)
  }

  if (!result) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-h-[90vh] overflow-y-auto animate-scaleIn custom-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Your New Sensitivity
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {result.mode === 'game' ? (
            // Game to Game conversion results
            <div className="space-y-6">
              {/* Main Sensitivity Display */}
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl border-2 border-blue-200 dark:border-blue-800 shadow-xl">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Converted Sensitivity</div>
                <div className="text-7xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                  {result.converted}
                </div>
                <div className="flex items-center justify-center gap-3 text-lg">
                  <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl font-semibold shadow-sm">{result.fromGame}</span>
                  <span className="text-2xl">→</span>
                  <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl font-semibold shadow-sm">{result.toGame}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl transition-all font-bold shadow-lg shadow-green-500/30"
                >
                  {copied ? (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Sensitivity
                    </>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="px-6 py-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40 rounded-2xl transition-all font-semibold border border-blue-200 dark:border-blue-800 shadow-sm"
                  >
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                  
                  {shareMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-xl z-10">
                      <button onClick={shareAsImage} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded-t-xl">
                        📱 Share as Text
                      </button>
                      <button onClick={exportAsJSON} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded-b-xl">
                        💾 Export as JSON
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {result.dpiChanged ? (
                  <>
                    <div className="p-5 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200 dark:border-orange-800">
                      <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Original eDPI</div>
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{result.fromEdpi}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">🖱️ {result.fromDpi} DPI</div>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200 dark:border-orange-800">
                      <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">New eDPI</div>
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{result.toEdpi}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">🖱️ {result.toDpi} DPI</div>
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">eDPI</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.toEdpi}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">🖱️ {result.fromDpi} DPI</div>
                  </div>
                )}
              </div>

              <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                  📏 cm/360° {result.dpiChanged && <span className="text-xs px-2 py-0.5 bg-green-200 dark:bg-green-800 rounded-full">consistent</span>}
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{result.cm360} cm</div>
              </div>
            </div>
          ) : (
            // DPI to DPI mode (similar structure)
            <div className="space-y-6">
              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl border-2 border-purple-200 dark:border-purple-800 shadow-xl">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">New Sensitivity at {result.toDpi} DPI</div>
                <div className="text-7xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                  {result.converted}
                </div>
                <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl font-semibold shadow-sm inline-block">{result.fromGame}</div>
              </div>

              <div className="flex gap-3">
                <button onClick={copyToClipboard} className="flex-1 flex items-center justify-center gap-3 px-6 py-4 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl transition-all font-bold shadow-lg shadow-green-500/30">
                  {copied ? '✓ Copied!' : '📋 Copy Sensitivity'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Original eDPI</div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{result.fromEdpi}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">🖱️ {result.fromDpi} DPI</div>
                </div>
                <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">New eDPI</div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{result.edpi}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">🖱️ {result.toDpi} DPI</div>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">📏 cm/360° <span className="text-xs px-2 py-0.5 bg-green-200 dark:bg-green-800 rounded-full ml-2">consistent</span></div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{result.cm360} cm</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

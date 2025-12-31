import React, { useState, useEffect } from 'react'
import SensitivityForm from '../components/SensitivityForm'
import ResultsModal from '../components/ResultsModal'
import HistoryPanel from '../components/HistoryPanel'
import ProPlayersPanel from '../components/ProPlayersPanel'
import ReactionTest from '../components/ReactionTest'

export default function Converter() {
  const [result, setResult] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [proSettings, setProSettings] = useState(null)
  const [showReactionTest, setShowReactionTest] = useState(false)

  // Add to history when result changes and show modal
  useEffect(() => {
    if (result && window.addToHistory) {
      window.addToHistory({
        fromGame: result.fromGame,
        toGame: result.toGame,
        fromSens: result.fromSens || result.converted,
        converted: result.converted,
        fromDpi: result.fromDpi,
        timestamp: new Date().toISOString()
      })
      setShowModal(true)
    }
  }, [result])

  const handleLoadPro = (proData) => {
    setProSettings(proData)
  }

  return (
    <>
      {/* Quick Action Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setShowReactionTest(true)}
          className="group px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 flex items-center gap-3"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">⚡</span>
          <span>Test Your Reaction Time</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SensitivityForm onResult={setResult} proSettings={proSettings} />
        </div>
        
        <aside className="space-y-6">
          <ProPlayersPanel onLoadPro={handleLoadPro} />
          <HistoryPanel />
        </aside>
      </div>

      {/* Results Modal */}
      {showModal && result && (
        <ResultsModal result={result} onClose={() => setShowModal(false)} />
      )}

      {/* Reaction Test Modal */}
      {showReactionTest && (
        <ReactionTest onClose={() => setShowReactionTest(false)} />
      )}
    </>
  )
}

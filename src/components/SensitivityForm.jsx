import React, { useState, useEffect } from 'react'
import { convertSensitivity, eDPI, cmPer360, GAMES } from '../utils/conversions'
import SearchableSelect from './SearchableSelect'

export default function SensitivityForm({ onResult, proSettings }) {
  const [conversionMode, setConversionMode] = useState('game') // 'game' or 'dpi'
  const [fromGame, setFromGame] = useState('Valorant')
  const [toGame, setToGame] = useState('CS2')
  const [fromSens, setFromSens] = useState('1')
  const [fromDpi, setFromDpi] = useState('800')
  const [toDpi, setToDpi] = useState('')
  const [toDpiManuallySet, setToDpiManuallySet] = useState(false)
  const [loadedProName, setLoadedProName] = useState(null)
  const [isConverting, setIsConverting] = useState(false)

  // Load pro settings when provided
  useEffect(() => {
    if (proSettings) {
      setFromGame(proSettings.game)
      setFromSens(String(proSettings.sens))
      setFromDpi(String(proSettings.dpi))
      setToDpi(String(proSettings.dpi))
      setToDpiManuallySet(true)
      setLoadedProName(proSettings.playerName)
      
      // Clear the notification after 3 seconds
      setTimeout(() => setLoadedProName(null), 3000)
    }
  }, [proSettings])

  // Auto-sync toDpi with fromDpi if user hasn't manually set it
  useEffect(() => {
    if (!toDpiManuallySet && fromDpi) {
      setToDpi(fromDpi)
    }
  }, [fromDpi, toDpiManuallySet])

  const handleConvert = () => {
    setIsConverting(true)
    
    // Simulate processing for better UX
    setTimeout(() => {
      performConversion()
      setIsConverting(false)
    }, 300)
  }

  const performConversion = () => {
    // Validate and use defaults
    const sensValue = Number(fromSens) || 0
    const dpiValue = Number(fromDpi) || 800
    const targetDpiValue = Number(toDpi) || dpiValue // Default to fromDpi if toDpi is empty
    
    if (sensValue <= 0 || dpiValue <= 0 || targetDpiValue <= 0) {
      alert('Please enter valid positive values for sensitivity and DPI.')
      return
    }

    if (conversionMode === 'game') {
      // Game to Game conversion (now supports different DPIs)
      const result = convertSensitivity({ 
        fromSens: sensValue, 
        fromDpi: dpiValue, 
        fromYaw: GAMES[fromGame].yaw, 
        toDpi: targetDpiValue, 
        toYaw: GAMES[toGame].yaw 
      })
      const fromEdpi = eDPI(dpiValue, sensValue)
      const toEdpi = eDPI(targetDpiValue, result.toSens)
      const cm360 = cmPer360(dpiValue, sensValue, GAMES[fromGame].yaw)
      onResult({ 
        converted: Number(result.toSens.toFixed(4)), 
        fromSens: sensValue,
        fromEdpi: Number(fromEdpi.toFixed(2)),
        toEdpi: Number(toEdpi.toFixed(2)),
        cm360: Number(cm360.toFixed(2)), 
        fromGame, 
        toGame,
        mode: 'game',
        fromDpi: dpiValue,
        toDpi: targetDpiValue,
        dpiChanged: dpiValue !== targetDpiValue
      })
    } else {
      // DPI to DPI conversion
      const result = convertSensitivity({ 
        fromSens: sensValue, 
        fromDpi: dpiValue, 
        fromYaw: GAMES[fromGame].yaw, 
        toDpi: targetDpiValue, 
        toYaw: GAMES[fromGame].yaw 
      })
      const fromEdpi = eDPI(dpiValue, sensValue)
      const toEdpi = eDPI(targetDpiValue, result.toSens)
      const cm360 = cmPer360(dpiValue, sensValue, GAMES[fromGame].yaw)
      onResult({ 
        converted: Number(result.toSens.toFixed(4)), 
        fromSens: sensValue,
        edpi: Number(toEdpi.toFixed(2)),
        fromEdpi: Number(fromEdpi.toFixed(2)), 
        cm360: Number(cm360.toFixed(2)), 
        fromGame, 
        toGame: fromGame,
        mode: 'dpi',
        fromDpi: dpiValue,
        toDpi: targetDpiValue
      })
    }
  }

  const handleReset = () => {
    setFromSens('1')
    setFromDpi('800')
    setToDpi('')
    setToDpiManuallySet(false)
  }

  const handleToDpiChange = (value) => {
    setToDpi(value)
    setToDpiManuallySet(value !== '')
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-8 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      {/* Pro Player Loaded Notification */}
      {loadedProName && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-bold text-green-700 dark:text-green-400">Pro Settings Loaded!</div>
              <div className="text-sm text-green-600 dark:text-green-500">
                Using {loadedProName}'s settings • {fromSens} sens @ {fromDpi} DPI
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conversion Mode Toggle */}
      <div className="mb-8">
        <label className="block text-sm font-semibold dark:text-gray-200 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Conversion Mode
        </label>
        <div className="flex gap-3 p-1 bg-gray-100 dark:bg-gray-900/50 rounded-2xl">
          <button 
            onClick={() => setConversionMode('game')} 
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              conversionMode === 'game' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            🎮 Game to Game
          </button>
          <button 
            onClick={() => setConversionMode('dpi')} 
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              conversionMode === 'dpi' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            🖱️ DPI to DPI
          </button>
        </div>
      </div>

      {conversionMode === 'game' ? (
        // Game to Game Mode
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-blue-500">📥</span> From Game
            </label>
            <SearchableSelect 
              value={fromGame} 
              onChange={setFromGame} 
              options={Object.keys(GAMES)}
              placeholder="Search for a game..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-purple-500">📤</span> To Game
            </label>
            <SearchableSelect 
              value={toGame} 
              onChange={setToGame} 
              options={Object.keys(GAMES)}
              placeholder="Search for a game..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-green-500">🎯</span> Current Sensitivity
            </label>
            <input className="mt-1 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" type="number" step="0.001" value={fromSens} onChange={e => setFromSens(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-semibold dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-orange-500">🖱️</span> Current DPI
            </label>
            <input className="mt-1 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" type="number" value={fromDpi} onChange={e => setFromDpi(e.target.value)} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-red-500">🎯</span> Target DPI <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">(defaults to current DPI)</span>
            </label>
            <input className="mt-1 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all" type="number" value={toDpi} onChange={e => handleToDpiChange(e.target.value)} placeholder={fromDpi || '800'} />
          </div>
        </div>
      ) : (
        // DPI to DPI Mode
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-blue-500">🎮</span> Game
            </label>
            <SearchableSelect 
              value={fromGame} 
              onChange={setFromGame} 
              options={Object.keys(GAMES)}
              placeholder="Search for a game..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-green-500">🎯</span> Current Sensitivity
            </label>
            <input className="mt-1 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" type="number" step="0.001" value={fromSens} onChange={e => setFromSens(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-semibold dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-orange-500">🖱️</span> Current DPI
            </label>
            <input className="mt-1 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" type="number" value={fromDpi} onChange={e => setFromDpi(e.target.value)} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="text-purple-500">🎯</span> Target DPI <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">(defaults to current DPI)</span>
            </label>
            <input className="mt-1 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all" type="number" value={toDpi} onChange={e => handleToDpiChange(e.target.value)} placeholder={fromDpi || '800'} />
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <button 
          onClick={handleConvert} 
          disabled={isConverting}
          className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConverting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Converting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Convert Now
            </>
          )}
        </button>
        <button 
          onClick={handleReset} 
          className="px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

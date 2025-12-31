import React, { useState, useEffect, useRef } from 'react'

export default function ReactionTest({ onClose }) {
  const [gameState, setGameState] = useState('ready') // ready, waiting, click, result
  const [attempts, setAttempts] = useState([])
  const [currentReaction, setCurrentReaction] = useState(null)
  const [waitTimeout, setWaitTimeout] = useState(null)
  const [tooEarly, setTooEarly] = useState(false)
  const startTimeRef = useRef(null)

  const maxAttempts = 5

  useEffect(() => {
    return () => {
      if (waitTimeout) clearTimeout(waitTimeout)
    }
  }, [waitTimeout])

  const startTest = () => {
    setGameState('waiting')
    setTooEarly(false)
    
    // Random delay between 1-4 seconds
    const delay = Math.random() * 3000 + 1000
    
    const timeout = setTimeout(() => {
      setGameState('click')
      startTimeRef.current = Date.now()
    }, delay)
    
    setWaitTimeout(timeout)
  }

  const handleClick = () => {
    if (gameState === 'waiting') {
      // Clicked too early!
      setTooEarly(true)
      clearTimeout(waitTimeout)
      setGameState('ready')
      return
    }

    if (gameState === 'click') {
      const reactionTime = Date.now() - startTimeRef.current
      setCurrentReaction(reactionTime)
      const newAttempts = [...attempts, reactionTime]
      setAttempts(newAttempts)
      
      if (newAttempts.length >= maxAttempts) {
        setGameState('result')
      } else {
        setGameState('ready')
      }
    }
  }

  const reset = () => {
    setAttempts([])
    setGameState('ready')
    setTooEarly(false)
    setCurrentReaction(null)
  }

  const getAverageReaction = () => {
    if (attempts.length === 0) return 0
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length)
  }

  const getReactionRating = (ms) => {
    if (ms < 200) return { text: 'INSANE! 🔥', color: 'text-red-500', desc: 'Pro-level reflexes!' }
    if (ms < 250) return { text: 'Excellent! ⚡', color: 'text-orange-500', desc: 'Very fast reactions' }
    if (ms < 300) return { text: 'Great! 🎯', color: 'text-yellow-500', desc: 'Above average' }
    if (ms < 350) return { text: 'Good! 👍', color: 'text-green-500', desc: 'Average reactions' }
    return { text: 'Keep Practicing! 💪', color: 'text-blue-500', desc: 'Room to improve' }
  }

  const avgReaction = getAverageReaction()
  const rating = getReactionRating(avgReaction)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-scaleIn">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-500 to-orange-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              Reaction Time Test
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {gameState === 'ready' && (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold dark:text-white">
                {attempts.length === 0 ? 'Test Your Reaction Time!' : `Attempt ${attempts.length + 1} of ${maxAttempts}`}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Click START, then click again as fast as you can when the screen turns green!
              </p>

              {tooEarly && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl animate-fadeIn">
                  <p className="text-red-600 dark:text-red-400 font-bold">⚠️ Too Early! Wait for green!</p>
                </div>
              )}

              {currentReaction && (
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Reaction Time</div>
                  <div className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    {currentReaction}ms
                  </div>
                </div>
              )}

              {attempts.length > 0 && (
                <div className="flex gap-2 justify-center flex-wrap">
                  {attempts.map((time, i) => (
                    <div key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-semibold">
                      {time}ms
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={startTest}
                className="w-full px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-bold text-xl transition-all shadow-lg"
              >
                {attempts.length === 0 ? 'START TEST' : 'NEXT ATTEMPT'}
              </button>
            </div>
          )}

          {gameState === 'waiting' && (
            <div 
              onClick={handleClick}
              className="cursor-pointer text-center space-y-6 p-12 bg-red-100 dark:bg-red-900/20 rounded-3xl border-4 border-red-300 dark:border-red-700"
            >
              <div className="text-6xl">🔴</div>
              <h3 className="text-3xl font-bold text-red-600 dark:text-red-400">
                WAIT...
              </h3>
              <p className="text-red-600 dark:text-red-400 font-semibold">
                Don't click yet! Wait for GREEN!
              </p>
            </div>
          )}

          {gameState === 'click' && (
            <div 
              onClick={handleClick}
              className="cursor-pointer text-center space-y-6 p-12 bg-green-400 dark:bg-green-600 rounded-3xl border-4 border-green-500 dark:border-green-400 animate-pulse"
            >
              <div className="text-6xl">🟢</div>
              <h3 className="text-4xl font-black text-white">
                CLICK NOW!
              </h3>
            </div>
          )}

          {gameState === 'result' && (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold dark:text-white">Test Complete!</h3>

              {/* Average Score */}
              <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Average Reaction Time</div>
                <div className="text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  {avgReaction}ms
                </div>
                <div className={`text-2xl font-bold ${rating.color} mb-1`}>{rating.text}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{rating.desc}</div>
              </div>

              {/* All Attempts */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">All Attempts</div>
                <div className="flex gap-2 justify-center flex-wrap">
                  {attempts.map((time, i) => (
                    <div key={i} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl font-bold text-lg border-2 border-gray-200 dark:border-gray-600">
                      #{i + 1}: {time}ms
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-bold transition-all shadow-lg"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-2xl font-bold transition-all"
                >
                  Close
                </button>
              </div>

              {/* Tips */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-left">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>💡 Pro Tip:</strong> Professional gamers average 150-250ms. Practice improves reaction time!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

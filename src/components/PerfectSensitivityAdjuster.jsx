import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const PerfectSensitivityAdjuster = () => {
  const { darkMode } = useTheme();
  const [step, setStep] = useState('input'); // 'input', 'testing', 'results'
  const [sensitivity, setSensitivity] = useState(''); // User's current sensitivity value
  const [iteration, setIteration] = useState(0);
  const [history, setHistory] = useState([]);
  const [adjustmentPercentage] = useState(10); // Adjust by 10% each time

  const maxIterations = 7;

  const startTest = () => {
    if (!sensitivity) {
      alert('Please enter your current sensitivity');
      return;
    }
    
    setHistory([{
      iteration: 1,
      sensitivity: parseFloat(sensitivity)
    }]);
    setIteration(1);
    setStep('testing');
  };

  const adjustSensitivity = (direction) => {
    const lastEntry = history[history.length - 1];
    const currentSens = lastEntry.sensitivity;
    
    // Calculate new sensitivity based on direction
    let newSens;
    if (direction === 'higher') {
      // Higher sensitivity
      newSens = currentSens * (1 + adjustmentPercentage / 100);
    } else {
      // Lower sensitivity
      newSens = currentSens * (1 - adjustmentPercentage / 100);
    }
    
    const newEntry = {
      iteration: iteration + 1,
      sensitivity: parseFloat(newSens.toFixed(4)),
      adjustment: direction
    };
    
    setHistory([...history, newEntry]);
    setIteration(iteration + 1);
    
    if (iteration + 1 >= maxIterations) {
      setStep('results');
    }
  };

  const resetTest = () => {
    setStep('input');
    setSensitivity('');
    setIteration(0);
    setHistory([]);
  };

  const perfectFeeling = () => {
    setStep('results');
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
            Perfect Sensitivity Adjuster
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Find your ideal sensitivity in 7 iterations
          </p>
        </div>

        {/* Input Step */}
        {step === 'input' && (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-xl animate-scale-in">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900 dark:text-white">What's Your Current 360° Sensitivity?</h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
                Enter the sensitivity value where you can do a complete 360° turn
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xl sm:text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                    My 360° Sensitivity
                  </label>
                  <div className="max-w-md mx-auto">
                    <input
                      type="number"
                      step="0.001"
                      value={sensitivity}
                      onChange={(e) => setSensitivity(e.target.value)}
                      placeholder="e.g., 0.5 or 800"
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-xl sm:text-2xl font-bold text-center placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 transition"
                    />
                  </div>
                  <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-xs sm:text-sm text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                      💡 <strong>How to test:</strong><br />
                      1. Go into your game<br />
                      2. Mark a starting point on your mousepad<br />
                      3. Move your mouse until you do a complete 360° turn<br />
                      4. If your mouse goes off the pad, lower your sensitivity<br />
                      5. Once you can do a 360°, enter that sensitivity value above
                    </p>
                  </div>
                </div>

                <button
                  onClick={startTest}
                  disabled={!sensitivity}
                  className="w-full max-w-md mx-auto block py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed rounded-xl font-bold text-lg sm:text-xl text-white transition transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:opacity-60"
                >
                  Start Finding Your Perfect Sensitivity 🎯
                </button>
              </div>
            </div>
          )}

          {/* Testing Step */}
          {step === 'testing' && (
            <div className="space-y-4 sm:space-y-6 animate-scale-in">
              {/* Progress Bar */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">Iteration {iteration} of {maxIterations}</span>
                  <span className="text-sm sm:text-lg font-semibold text-cyan-600 dark:text-cyan-400">{Math.round((iteration / maxIterations) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    style={{ width: `${(iteration / maxIterations) * 100}%` }}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              {/* Current Settings */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900 dark:text-white">Try This Sensitivity</h2>
                <div className="max-w-md mx-auto mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-cyan-100 to-purple-100 dark:from-cyan-900/30 dark:to-purple-900/30 rounded-2xl p-6 sm:p-8 border-2 border-cyan-300 dark:border-cyan-600/50 shadow-lg">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">Your New Sensitivity</p>
                    <p className="text-4xl sm:text-6xl font-bold text-center bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                      {history[history.length - 1].sensitivity}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-lg p-4 mb-6">
                  <p className="text-center text-sm sm:text-lg text-gray-800 dark:text-gray-200">
                    🎮 Set your in-game sensitivity to <strong>{history[history.length - 1].sensitivity}</strong> and test if you can do a comfortable 360° turn
                  </p>
                  <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Then tell us how it feels:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  <button
                    onClick={() => adjustSensitivity('lower')}
                    className="py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-bold text-sm sm:text-lg transition transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    ⬇️ Lower Sensitivity
                  </button>
                  
                  <button
                    onClick={perfectFeeling}
                    className="py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-bold text-sm sm:text-lg transition transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    ✅ Feels Perfect!
                  </button>
                  
                  <button
                    onClick={() => adjustSensitivity('higher')}
                    className="py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-bold text-sm sm:text-lg transition transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    ⬆️ Higher Sensitivity
                  </button>
                </div>
              </div>

              {/* History */}
              {history.length > 1 && (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center text-gray-900 dark:text-white">Your Journey</h3>
                  <div className="space-y-2">
                    {history.slice().reverse().map((entry, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 sm:p-4 flex items-center justify-between border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2 sm:gap-4">
                          <span className="text-lg sm:text-2xl font-bold text-gray-500 dark:text-gray-400">#{entry.iteration}</span>
                          {entry.adjustment && (
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                              entry.adjustment === 'higher' 
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            }`}>
                              {entry.adjustment === 'higher' ? '⬆️ FASTER' : '⬇️ SLOWER'}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">{entry.sensitivity}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Sensitivity</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Step */}
          {step === 'results' && (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-xl animate-scale-in">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-5xl sm:text-6xl mb-4 animate-bounce-in">
                  🎯
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-500 to-cyan-600 dark:from-green-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Perfect Sensitivity Found!
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                  Completed {iteration} iteration{iteration !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Final Settings */}
              <div className="bg-gradient-to-r from-green-50 to-cyan-50 dark:from-green-900/20 dark:to-cyan-900/20 rounded-xl p-6 sm:p-8 border-2 border-green-300 dark:border-green-700/50 mb-6 sm:mb-8 shadow-lg">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900 dark:text-white">Your Perfect Sensitivity</h3>
                <div className="max-w-md mx-auto bg-gradient-to-br from-cyan-100 to-purple-100 dark:from-cyan-900/30 dark:to-purple-900/30 rounded-2xl p-8 sm:p-10 border-2 border-cyan-300 dark:border-cyan-600/50 shadow-lg">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">Your optimal in-game sensitivity:</p>
                  <p className="text-5xl sm:text-7xl font-bold text-center bg-gradient-to-r from-green-600 to-cyan-600 dark:from-green-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    {history[history.length - 1].sensitivity}
                  </p>
                  <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-3 sm:mt-4">
                    Use this in your game settings
                  </p>
                </div>
              </div>

              {/* Full History */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center text-gray-900 dark:text-white">Your Complete Journey</h3>
                <div className="space-y-2 sm:space-y-3">
                  {history.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl p-4 sm:p-5 flex items-center justify-between ${
                        idx === history.length - 1
                          ? 'bg-gradient-to-r from-green-100 to-cyan-100 dark:from-green-900/30 dark:to-cyan-900/30 border-2 border-green-400 dark:border-green-600'
                          : 'bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                        <span className="text-xl sm:text-3xl font-bold text-gray-500 dark:text-gray-400">#{entry.iteration}</span>
                        {entry.adjustment && (
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                            entry.adjustment === 'higher' 
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}>
                            {entry.adjustment === 'higher' ? '⬆️ FASTER' : '⬇️ SLOWER'}
                          </span>
                        )}
                        {idx === history.length - 1 && (
                          <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                            ✨ PERFECT
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl sm:text-3xl font-bold text-cyan-600 dark:text-cyan-400">{entry.sensitivity}</p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Sensitivity</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={resetTest}
                  className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg font-bold text-base sm:text-lg text-white transition transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start New Test
                </button>
                <button
                  onClick={() => {
                    const settings = history[history.length - 1];
                    navigator.clipboard.writeText(
                      `My Perfect Sensitivity: ${settings.sensitivity}`
                    );
                    alert('Sensitivity copied to clipboard!');
                  }}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-bold text-base sm:text-lg transition border-2 border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg"
                >
                  📋 Copy Result
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default PerfectSensitivityAdjuster;

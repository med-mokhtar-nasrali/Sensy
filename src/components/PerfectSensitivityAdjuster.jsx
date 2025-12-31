import { useState } from 'react';

const PerfectSensitivityAdjuster = () => {
  const [step, setStep] = useState('input'); // 'input', 'testing', 'results'
  const [currentDPI, setCurrentDPI] = useState('');
  const [currentSens, setCurrentSens] = useState('');
  const [gameSens, setGameSens] = useState('');
  const [iteration, setIteration] = useState(0);
  const [history, setHistory] = useState([]);
  const [adjustmentPercentage] = useState(10); // Adjust by 10% each time

  const maxIterations = 7;

  const startTest = () => {
    if (!currentDPI || !currentSens) {
      alert('Please enter your current DPI and sensitivity');
      return;
    }
    
    const edpi = parseFloat(currentDPI) * parseFloat(currentSens);
    setHistory([{
      iteration: 1,
      dpi: parseFloat(currentDPI),
      sens: parseFloat(currentSens),
      edpi: edpi,
      gameSens: gameSens || 'N/A'
    }]);
    setIteration(1);
    setStep('testing');
  };

  const adjustSensitivity = (direction) => {
    const lastEntry = history[history.length - 1];
    const currentEdpi = lastEntry.edpi;
    
    // Calculate new eDPI based on direction
    let newEdpi;
    if (direction === 'higher') {
      newEdpi = currentEdpi * (1 + adjustmentPercentage / 100);
    } else {
      newEdpi = currentEdpi * (1 - adjustmentPercentage / 100);
    }
    
    // Keep DPI the same, adjust sensitivity
    const newSens = newEdpi / parseFloat(currentDPI);
    
    const newEntry = {
      iteration: iteration + 1,
      dpi: parseFloat(currentDPI),
      sens: parseFloat(newSens.toFixed(3)),
      edpi: parseFloat(newEdpi.toFixed(2)),
      gameSens: gameSens || 'N/A',
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
    setCurrentDPI('');
    setCurrentSens('');
    setGameSens('');
    setIteration(0);
    setHistory([]);
  };

  const perfectFeeling = () => {
    setStep('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Perfect Sensitivity Adjuster
          </h1>
          <p className="text-xl text-gray-300">
            Find your ideal sensitivity in 7 iterations
          </p>
        </div>

        {/* Input Step */}
        {step === 'input' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-scale-in">
              <h2 className="text-3xl font-bold mb-6 text-center">Enter Your Current Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold mb-2">
                    Current DPI
                  </label>
                  <input
                    type="number"
                    value={currentDPI}
                    onChange={(e) => setCurrentDPI(e.target.value)}
                    placeholder="e.g., 800"
                    className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-2">
                    Current In-Game Sensitivity
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={currentSens}
                    onChange={(e) => setCurrentSens(e.target.value)}
                    placeholder="e.g., 0.35"
                    className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-2">
                    Game (Optional)
                  </label>
                  <input
                    type="text"
                    value={gameSens}
                    onChange={(e) => setGameSens(e.target.value)}
                    placeholder="e.g., Valorant, CS2, Apex"
                    className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>

                {currentDPI && currentSens && (
                  <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-4 border border-cyan-400/30">
                    <p className="text-center text-lg">
                      Your current eDPI: <span className="font-bold text-cyan-400">{(parseFloat(currentDPI) * parseFloat(currentSens)).toFixed(2)}</span>
                    </p>
                  </div>
                )}

                <button
                  onClick={startTest}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg font-bold text-lg transition transform hover:scale-105"
                >
                  Start PSA Test
                </button>
              </div>
            </div>
          )}

          {/* Testing Step */}
          {step === 'testing' && (
            <div className="space-y-6 animate-scale-in">
              {/* Progress Bar */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">Iteration {iteration} of {maxIterations}</span>
                  <span className="text-lg font-semibold text-cyan-400">{Math.round((iteration / maxIterations) * 100)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div
                    style={{ width: `${(iteration / maxIterations) * 100}%` }}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              {/* Current Settings */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 text-center">Current Test Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg p-4 border border-cyan-400/30">
                    <p className="text-sm text-gray-300 mb-1">DPI</p>
                    <p className="text-3xl font-bold text-cyan-400">{history[history.length - 1].dpi}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-400/30">
                    <p className="text-sm text-gray-300 mb-1">Sensitivity</p>
                    <p className="text-3xl font-bold text-purple-400">{history[history.length - 1].sens}</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-lg p-4 border border-pink-400/30">
                    <p className="text-sm text-gray-300 mb-1">eDPI</p>
                    <p className="text-3xl font-bold text-pink-400">{history[history.length - 1].edpi}</p>
                  </div>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 mb-6">
                  <p className="text-center text-lg">
                    🎮 Test this sensitivity in-game, then choose:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => adjustSensitivity('lower')}
                    className="py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
                  >
                    ⬇️ Lower Sensitivity
                  </button>
                  
                  <button
                    onClick={perfectFeeling}
                    className="py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
                  >
                    ✅ Feels Perfect!
                  </button>
                  
                  <button
                    onClick={() => adjustSensitivity('higher')}
                    className="py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
                  >
                    ⬆️ Higher Sensitivity
                  </button>
                </div>
              </div>

              {/* History */}
              {history.length > 1 && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Adjustment History</h3>
                  <div className="space-y-2">
                    {history.slice().reverse().map((entry, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 rounded-lg p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-gray-400 font-semibold">#{entry.iteration}</span>
                          {entry.adjustment && (
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              entry.adjustment === 'higher' 
                                ? 'bg-red-500/30 text-red-300' 
                                : 'bg-blue-500/30 text-blue-300'
                            }`}>
                              {entry.adjustment === 'higher' ? '⬆️ HIGHER' : '⬇️ LOWER'}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-4 text-sm">
                          <span>DPI: <span className="font-bold">{entry.dpi}</span></span>
                          <span>Sens: <span className="font-bold">{entry.sens}</span></span>
                          <span>eDPI: <span className="font-bold text-cyan-400">{entry.edpi}</span></span>
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
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-scale-in">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-bounce-in">
                  🎯
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Perfect Sensitivity Found!
                </h2>
                <p className="text-xl text-gray-300">
                  Completed {iteration} iteration{iteration !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Final Settings */}
              <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl p-6 border border-green-400/30 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-center">Your Optimal Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-300 mb-1">DPI</p>
                    <p className="text-4xl font-bold text-cyan-400">{history[history.length - 1].dpi}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-300 mb-1">Sensitivity</p>
                    <p className="text-4xl font-bold text-green-400">{history[history.length - 1].sens}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-300 mb-1">eDPI</p>
                    <p className="text-4xl font-bold text-purple-400">{history[history.length - 1].edpi}</p>
                  </div>
                </div>
                {gameSens && gameSens !== 'N/A' && (
                  <p className="text-center mt-4 text-lg text-gray-300">
                    Game: <span className="font-bold text-white">{gameSens}</span>
                  </p>
                )}
              </div>

              {/* Full History */}
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Complete Adjustment Journey</h3>
                <div className="space-y-2">
                  {history.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg p-4 flex items-center justify-between ${
                        idx === history.length - 1
                          ? 'bg-gradient-to-r from-green-500/30 to-cyan-500/30 border-2 border-green-400'
                          : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-gray-400">#{entry.iteration}</span>
                        {entry.adjustment && (
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            entry.adjustment === 'higher' 
                              ? 'bg-red-500/30 text-red-300' 
                              : 'bg-blue-500/30 text-blue-300'
                          }`}>
                            {entry.adjustment === 'higher' ? '⬆️ HIGHER' : '⬇️ LOWER'}
                          </span>
                        )}
                        {idx === history.length - 1 && (
                          <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-500/30 text-green-300">
                            ✨ FINAL
                          </span>
                        )}
                      </div>
                      <div className="flex gap-6">
                        <span className="text-gray-300">DPI: <span className="font-bold text-white">{entry.dpi}</span></span>
                        <span className="text-gray-300">Sens: <span className="font-bold text-white">{entry.sens}</span></span>
                        <span className="text-gray-300">eDPI: <span className="font-bold text-cyan-400">{entry.edpi}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetTest}
                  className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg font-bold text-lg transition transform hover:scale-105"
                >
                  Start New Test
                </button>
                <button
                  onClick={() => {
                    const settings = history[history.length - 1];
                    navigator.clipboard.writeText(
                      `DPI: ${settings.dpi} | Sensitivity: ${settings.sens} | eDPI: ${settings.edpi}${gameSens && gameSens !== 'N/A' ? ` | Game: ${gameSens}` : ''}`
                    );
                    alert('Settings copied to clipboard!');
                  }}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-lg transition border border-white/30"
                >
                  📋 Copy Settings
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default PerfectSensitivityAdjuster;

// Pro Player Database - Valorant Tier 1 Players Only
export const PRO_PLAYERS = {
  // Valorant Pros
  "Valorant": [
    { name: "TenZ", team: "Sentinels", sens: 0.25, dpi: 800, edpi: 200, role: "Duelist" },
    { name: "aspas", team: "LOUD", sens: 0.336, dpi: 800, edpi: 268.8, role: "Duelist" },
    { name: "Demon1", team: "NRG", sens: 0.22, dpi: 800, edpi: 176, role: "Duelist" },
    { name: "Leo", team: "Fnatic", sens: 0.28, dpi: 800, edpi: 224, role: "Initiator" },
    { name: "chronicle", team: "Fnatic", sens: 0.25, dpi: 800, edpi: 200, role: "Flex" },
    { name: "derke", team: "Fnatic", sens: 0.32, dpi: 800, edpi: 256, role: "Duelist" },
    { name: "Less", team: "LOUD", sens: 0.336, dpi: 800, edpi: 268.8, role: "Sentinel" },
    { name: "Alfa", team: "Fnatic", sens: 0.24, dpi: 800, edpi: 192, role: "Duelist" },
    { name: "yay", team: "Cloud9", sens: 0.26, dpi: 800, edpi: 208, role: "Duelist" },
    { name: "crashies", team: "NRG", sens: 0.27, dpi: 800, edpi: 216, role: "Initiator" },
    { name: "Jinggg", team: "Paper Rex", sens: 0.413, dpi: 800, edpi: 330.4, role: "Duelist" },
    { name: "f0rsakeN", team: "Paper Rex", sens: 0.415, dpi: 800, edpi: 332, role: "Flex" },
    { name: "Sacy", team: "Sentinels", sens: 0.336, dpi: 800, edpi: 268.8, role: "Initiator" },
    { name: "pANcada", team: "Sentinels", sens: 0.336, dpi: 800, edpi: 268.8, role: "Controller" },
    { name: "Marved", team: "OpTic Gaming", sens: 0.26, dpi: 800, edpi: 208, role: "Controller" },
    { name: "FNS", team: "NRG", sens: 0.35, dpi: 800, edpi: 280, role: "IGL" },
    { name: "Boaster", team: "Fnatic", sens: 0.36, dpi: 800, edpi: 288, role: "IGL" },
    { name: "nAts", team: "Team Liquid", sens: 0.45, dpi: 800, edpi: 360, role: "Sentinel" },
  ]
}

// Get all unique games that have pro players
export const getGamesWithPros = () => Object.keys(PRO_PLAYERS)

// Get pro players for a specific game
export const getProsByGame = (game) => PRO_PLAYERS[game] || []

// Search pro players by name
export const searchProPlayers = (query) => {
  const results = []
  const lowerQuery = query.toLowerCase()
  
  Object.entries(PRO_PLAYERS).forEach(([game, players]) => {
    players.forEach(player => {
      if (player.name.toLowerCase().includes(lowerQuery) || 
          player.team.toLowerCase().includes(lowerQuery)) {
        results.push({ ...player, game })
      }
    })
  })
  
  return results
}


export const GAMES = {
  // Source Engine Games (yaw: 0.022)
  "CS2": { yaw: 0.022 },
  "CS:GO": { yaw: 0.022 },
  "CS 1.6": { yaw: 0.022 },
  "Counter-Strike: Source": { yaw: 0.022 },
  "Team Fortress 2": { yaw: 0.022 },
  "Half-Life 2": { yaw: 0.022 },
  "Left 4 Dead 2": { yaw: 0.022 },
  "Portal 2": { yaw: 0.022 },
  "Garry's Mod": { yaw: 0.022 },
  "Apex Legends": { yaw: 0.022 },
  "Titanfall 2": { yaw: 0.022 },
  "The Finals": { yaw: 0.022 },

  // Quake Engine Games (yaw: 0.022)
  "Quake": { yaw: 0.022 },
  "Quake Live": { yaw: 0.022 },
  "Quake Champions": { yaw: 0.022 },
  "Quake 3 Arena": { yaw: 0.022 },
  "Diabotical": { yaw: 0.022 },
  "Splitgate": { yaw: 0.022 },
  "Reflex Arena": { yaw: 0.022 },

  // Riot Games
  "Valorant": { yaw: 0.07 },
  "League of Legends": { yaw: 0.0066 },

  // Blizzard Games (yaw: 0.0066)
  "Overwatch": { yaw: 0.0066 },
  "Overwatch 2": { yaw: 0.0066 },
  "World of Warcraft": { yaw: 0.0066 },

  // Call of Duty Series (yaw: 0.0066)
  "Call of Duty": { yaw: 0.0066 },
  "Call of Duty: Warzone": { yaw: 0.0066 },
  "Call of Duty: Warzone 2": { yaw: 0.0066 },
  "Call of Duty: Modern Warfare": { yaw: 0.0066 },
  "Call of Duty: Modern Warfare 2": { yaw: 0.0066 },
  "Call of Duty: Modern Warfare 3": { yaw: 0.0066 },
  "Call of Duty: Black Ops": { yaw: 0.0066 },
  "Call of Duty: Black Ops 2": { yaw: 0.0066 },
  "Call of Duty: Black Ops 3": { yaw: 0.0066 },
  "Call of Duty: Black Ops 4": { yaw: 0.0066 },
  "Call of Duty: Black Ops Cold War": { yaw: 0.0066 },
  "Call of Duty: Vanguard": { yaw: 0.0066 },

  // Battlefield Series (yaw: 0.0066)
  "Battlefield": { yaw: 0.0066 },
  "Battlefield 1": { yaw: 0.0066 },
  "Battlefield 4": { yaw: 0.0066 },
  "Battlefield 5": { yaw: 0.0066 },
  "Battlefield V": { yaw: 0.0066 },
  "Battlefield 2042": { yaw: 0.0066 },
  "Battlefield 3": { yaw: 0.0066 },
  "Battlefield Bad Company 2": { yaw: 0.0066 },

  // Other Popular FPS (yaw: 0.0066)
  "Destiny 2": { yaw: 0.0066 },
  "Halo Infinite": { yaw: 0.0066 },
  "Halo: The Master Chief Collection": { yaw: 0.0066 },
  "Paladins": { yaw: 0.0066 },
  "XDefiant": { yaw: 0.0066 },
  "Rogue Company": { yaw: 0.0066 },

  // Battle Royale Games
  "Fortnite": { yaw: 0.005555 },
  "PUBG": { yaw: 0.01 },
  "PUBG: Battlegrounds": { yaw: 0.01 },
  "Warzone": { yaw: 0.0066 },
  "Apex Legends Mobile": { yaw: 0.022 },

  // Tactical Shooters
  "Rainbow Six Siege": { yaw: 0.001909 },
  "Insurgency: Sandstorm": { yaw: 0.022 },
  "Squad": { yaw: 0.022 },
  "Hell Let Loose": { yaw: 0.022 },
  "Ready or Not": { yaw: 0.022 },

  // Survival/Hardcore FPS (yaw: 0.0165)
  "Rust": { yaw: 0.0165 },
  "Escape from Tarkov": { yaw: 0.0165 },
  "Hunt: Showdown": { yaw: 0.0165 },
  "DayZ": { yaw: 0.0165 },
  "Arma 3": { yaw: 0.0165 },

  // Unreal Engine Games (yaw: 0.0066)
  "Rogue Company": { yaw: 0.0066 },
  "Battalion 1944": { yaw: 0.0066 },
  "Unreal Tournament": { yaw: 0.0066 },
  "Arc Raiders": { yaw: 0.001361 },

  // Other Notable Games
  "Enlisted": { yaw: 0.0066 },
  "War Thunder": { yaw: 0.0066 },
  "Crossfire": { yaw: 0.022 },
  "Point Blank": { yaw: 0.022 },
  "Sudden Attack": { yaw: 0.022 },
  "Ironsight": { yaw: 0.0066 },
  "Warface": { yaw: 0.0066 },
  "Blacklight: Retribution": { yaw: 0.0066 },
  "Phantasy Star Online 2": { yaw: 0.0066 },
  "Dirty Bomb": { yaw: 0.0066 },
  "Brink": { yaw: 0.0066 },
  "Far Cry 5": { yaw: 0.0066 },
  "Far Cry 6": { yaw: 0.0066 },
  "Rainbow Six Extraction": { yaw: 0.001909 },
  "The Cycle: Frontier": { yaw: 0.0066 },
  "Hyper Scape": { yaw: 0.0066 },
  "Shatterline": { yaw: 0.0066 },
  "Marauders": { yaw: 0.0165 },
  "Zero Hour": { yaw: 0.022 },
  "Ground Branch": { yaw: 0.022 },
  "Bodycam": { yaw: 0.022 },
  "Gray Zone Warfare": { yaw: 0.0165 },
  "Delta Force": { yaw: 0.0066 },
  "Spectre Divide": { yaw: 0.022 },
  "Deadlock": { yaw: 0.022 },
  "Fragpunk": { yaw: 0.07 }
};

// Real cm/360 formula
export const cmPer360 = (dpi, sens, yaw) => {
  return (2.54 * 360) / (dpi * sens * yaw);
};

// Real eDPI calculation
export const eDPI = (dpi, sens) => dpi * sens;

// Convert sensitivity between games using yaw values
export const convertSensitivity = ({
  fromSens,
  fromDpi,
  fromYaw,
  toDpi,
  toYaw
}) => {
  // Convert original sens into cm/360
  const cm360 = cmPer360(fromDpi, fromSens, fromYaw);

  // Convert cm/360 into target game's sensitivity
  const toSens = (2.54 * 360) / (cm360 * toDpi * toYaw);

  return { toSens, cm360 };
};

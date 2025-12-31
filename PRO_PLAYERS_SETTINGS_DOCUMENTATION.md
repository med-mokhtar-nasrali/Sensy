# Pro Players Comprehensive Settings Documentation

## Overview

This document explains the complete data structure for pro player settings in the application. Currently, **2 players have full comprehensive settings** (TenZ and aspas as reference examples), while all 73 players have detailed base settings.

## Complete Data Structure

### 1. Basic Information
```javascript
{
  name: "PlayerName",
  team: "TeamName",
  role: "Role",
  country: "🇺🇸 Country",
  image: "https://prosettings.net/.../player.png"
}
```

### 2. Mouse Settings (Extended)
```javascript
mouse: {
  // Basic Settings (ALL 73 players have this)
  sens: 0.25,
  dpi: 800,
  edpi: 200,
  pollingRate: 1000,
  mouseName: "Mouse Model",
  mousepadName: "Mousepad Model",
  
  // Extended Settings (TenZ, aspas have this)
  mouseButtons: {
    primary: "Fire",
    secondary: "ADS",
    side1: "Ability 1",
    side2: "Ability 2"
  }
}
```

### 3. Monitor Settings (Extended)
```javascript
monitor: {
  // Basic Settings (ALL 73 players have this)
  refreshRate: 360,
  resolution: "1920x1080",
  monitorName: "Monitor Model",
  
  // Extended Settings (TenZ, aspas have this)
  panelType: "TN",           // TN, IPS, or VA
  responseTime: "0.5ms",     // Response time
  brightness: 100,           // 0-100
  colorMode: "FPS Mode",     // Monitor color mode
  blackEqualizer: 0          // 0-20 (for ZOWIE monitors)
}
```

### 4. Video Settings (Full)
```javascript
videoSettings: {
  // Display Settings
  displayMode: "Fullscreen",           // Fullscreen, Windowed, Borderless
  resolution: "1920x1080",
  aspectRatio: "16:9",
  frameRateLimit: "Unlimited",         // Unlimited, 144, 240, 360, etc.
  
  // Graphics Quality
  graphicsQuality: "Low",              // Low, Medium, High
  materialQuality: "Low",
  textureQuality: "Low",
  detailQuality: "Low",
  uiQuality: "Low",
  
  // Visual Effects
  vignette: "Off",                     // On/Off
  vsync: "Off",                        // On/Off
  antiAliasing: "None",                // None, MSAA 2x, 4x, 8x
  anisotropicFiltering: "1x",          // 1x, 2x, 4x, 8x, 16x
  improveClarity: "On",                // On/Off
  bloom: "Off",                        // On/Off
  distortion: "Off",                   // On/Off
  castShadows: "Off"                   // On/Off
}
```

### 5. In-Game Settings (Extended)
```javascript
ingame: {
  // Basic Settings (ALL 73 players have this)
  fov: 103,
  aspectRatio: "16:9",
  scopedSens: 1.0,
  graphics: "Low",
  
  // Extended Settings (TenZ, aspas have this)
  showFPS: true,
  showPing: true,
  enemyHighlight: "Yellow",           // Yellow, Red, Purple
  sprayPattern: "On",
  bloodSplatter: "On"
}
```

### 6. Crosshair Settings (Extended)
```javascript
crosshair: {
  // Basic Settings (ALL 73 players have this)
  color: "Cyan",
  outlines: "On",
  centerDot: "Off",
  innerLines: { 
    show: true, 
    opacity: 1, 
    length: 4, 
    thickness: 2, 
    offset: 3 
  },
  outerLines: { show: false },
  
  // Extended Settings (TenZ, aspas have this)
  movementError: "Off",               // Show movement error
  firingError: "Off"                  // Show firing error
}
```

### 7. Keybinds (Valorant Example)
```javascript
keybinds: {
  movement: {
    forward: "W",
    backward: "S",
    left: "A",
    right: "D",
    jump: "Space",
    crouch: "Ctrl",
    walk: "Shift"
  },
  combat: {
    primary: "Mouse1",
    secondary: "Mouse2",
    reload: "R",
    ability1: "C",
    ability2: "Q",
    ability3: "E",
    ultimate: "X",
    melee: "V"
  },
  equipment: {
    useObject: "F",
    spike: "4",
    dropWeapon: "G",
    inspect: "Y"
  },
  communication: {
    voiceChat: "V (Hold)",
    partyVoice: "N",
    ping: "Z",
    radioMenu: "B"
  }
}
```

### 8. CS2/CS:GO Keybinds (Alternative Structure)
```javascript
keybinds: {
  movement: {
    forward: "W",
    backward: "S",
    left: "A",
    right: "D",
    jump: "Space",
    crouch: "Ctrl",
    walk: "Shift"
  },
  combat: {
    primary: "Mouse1",
    secondary: "Mouse2",
    reload: "R",
    use: "E",
    drop: "G",
    inspect: "F"
  },
  equipment: {
    slot1: "1",
    slot2: "2",
    slot3: "3",
    slot4: "4",
    knife: "5",
    bomb: "B"
  },
  communication: {
    voiceChat: "K",
    chatTeam: "U",
    chatAll: "Y"
  }
}
```

### 9. Map Settings (Valorant)
```javascript
mapSettings: {
  rotateMode: "Rotate",              // Rotate, Fixed
  keepPlayerCentered: false,
  minimapSize: 1.0,                  // 0.8 - 1.2
  minimapZoom: 0.9,                  // 0.8 - 1.1
  minimapVisionCones: true,
  showMapRegionNames: true
}
```

### 10. Gear (Extended)
```javascript
gear: {
  // Basic Settings (ALL 73 players have this)
  keyboard: "Keyboard Model",
  headset: "Headset Model",
  mousepad: "Mousepad Model",
  
  // Extended Settings (TenZ, aspas have this)
  webcam: "Logitech C920",
  microphone: "Shure SM7B"
}
```

### 11. PC Specifications
```javascript
pcSpecs: {
  cpu: "Intel Core i9-13900K",
  gpu: "NVIDIA RTX 4090",
  ram: "32GB DDR5 6000MHz",
  motherboard: "ASUS ROG Maximus Z790",
  storage: "2TB Samsung 980 Pro NVMe SSD",
  psu: "Corsair HX1000",
  case: "NZXT H510",
  cooling: "NZXT Kraken Z73"
}
```

## Reference Examples

### Full Example: TenZ (Valorant)
See `src/data/proPlayersDetailed.js` lines 4-129 for complete implementation.

**Includes:**
- ✅ Extended mouse settings with button bindings
- ✅ Detailed monitor settings (panel type, response time, brightness, etc.)
- ✅ Complete video settings (15+ options)
- ✅ Full keybinds (movement, combat, equipment, communication)
- ✅ Map settings
- ✅ PC specifications
- ✅ Extended gear (webcam, microphone)

### Full Example: aspas (Valorant)
See `src/data/proPlayersDetailed.js` lines 130-251 for complete implementation.

**Includes:**
- ✅ All comprehensive settings
- ✅ Variant keybind configurations
- ✅ Different PC specifications
- ✅ Alternative monitor settings

## Current Database Status

### Players with FULL Comprehensive Settings (2)
1. **TenZ** - Complete reference implementation
2. **aspas** - Complete with variations

### Players with Detailed Settings (71)
All remaining 71 players include:
- ✅ Mouse settings (DPI, sens, eDPI, polling rate, model)
- ✅ Monitor specs (refresh rate, resolution, model)
- ✅ In-game settings (FOV, aspect ratio, graphics)
- ✅ Crosshair configurations (detailed)
- ✅ Gear setup (keyboard, headset, mousepad)

**These players can be extended using the template above.**

## Game-Specific Variations

### Valorant
- Keybinds include abilities (ability1, ability2, ability3, ultimate)
- Map settings with minimap controls
- Enemy highlight colors
- Spike plant keybind

### CS2/CS:GO
- Keybinds include weapon slots (1-5)
- Bomb plant keybind
- 4:3 stretched resolution common
- Black equalizer settings important

### Apex Legends
- ADS multiplier instead of scoped sens
- FOV up to 110
- Different crosshair system

### Overwatch 2
- Higher sensitivity (eDPI 3000-5000)
- Hero-specific settings possible
- Different crosshair styles per hero

### Fortnite
- Building keybinds would be added
- Performance mode graphics
- Edit binds important

### League of Legends
- Camera lock settings
- Quick cast settings
- Fixed FOV (not adjustable)

### Rainbow Six Siege
- High sensitivity common (eDPI 3200-4800)
- FOV typically 90
- Lean keybinds important

### Rocket League
- Controller settings (most use controller)
- Camera settings crucial
- No traditional crosshair

## How to Extend Players

To extend any of the 71 players with full settings:

1. **Copy the structure from TenZ or aspas**
2. **Adjust values based on:**
   - Game-specific requirements
   - Player's known preferences
   - Common settings for their role
   - Regional preferences

3. **Maintain consistency:**
   - Keep key names identical
   - Use same data types
   - Follow naming conventions

## Data Sources

- ProSettings.net - Primary source for mouse/monitor/gear
- Player streams - Keybinds and video settings
- Team announcements - PC specifications
- Tournament setups - Monitor configurations

## Performance Considerations

**Current File Size:** ~3,000 lines  
**With Full Expansion (73 players):** ~9,000-10,000 lines  
**Impact:** Minimal - modern browsers handle this easily

## API Usage

Access player data:
```javascript
import { PRO_PLAYERS_DETAILED, getDetailedProsByGame } from './data/proPlayersDetailed'

// Get all Valorant pros
const valorantPros = getDetailedProsByGame('Valorant')

// Access specific player
const tenz = valorantPros.find(p => p.name === 'TenZ')

// Access settings
console.log(tenz.keybinds.combat.ability1) // "C"
console.log(tenz.pcSpecs.gpu) // "NVIDIA RTX 4090"
console.log(tenz.videoSettings.graphicsQuality) // "Low"
```

## Future Enhancements

Potential additions:
- [ ] Audio settings (volume levels, HRTF)
- [ ] Streaming settings (OBS configurations)
- [ ] Practice routine schedules
- [ ] Aim training settings
- [ ] Discord/communication setup
- [ ] RGB lighting profiles
- [ ] Macro configurations

## Notes

- Most pro players use similar keybinds (WASD movement, etc.)
- Low graphics settings are standard for competitive play
- High refresh rate monitors (240Hz+) are universal
- RGB lighting is often disabled during competition
- Settings may change between patches/updates

## Conclusion

This documentation provides a complete reference for the pro player settings structure. Use TenZ and aspas as templates to extend any of the remaining 71 players with comprehensive settings following this exact structure.

// ============================================
// CONFIG.JS - Konfiguracja i stałe gry
// ============================================

export const BACKEND_URL = 'https://timberman-backend.onrender.com';
export const GAME_AREA_WIDTH_BASE = 400;

// Kolory
export const COLORS = {
    SKY: '#87CEEB',
    GROUND: '#3A5F0B',
    TRUNK: '#8B4513',
    TRUNK_DARK: '#654321',
    PLAYER_SKIN: '#F5DEB3',
    PLAYER_SHIRT: '#DC143C',
    PLAYER_PANTS: '#00008B',
    BRANCH: '#228B22',
    BRANCH_DARK: '#006400'
};

// Konfiguracja trybu ptaków
export const BIRDS_CONFIG = {
    ranges: {
        easy: { min: 100, max: 300 },
        medium: { min: 400, max: 600 },
        hard: { min: 700, max: 1000 },
    },
    rewards: {
        easy: { coins: 50, exp: 25 },
        medium: { coins: 100, exp: 50 },
        hard: { coins: 200, exp: 100 },
    },
    totalChopsPolicy: 'UPDATE'
};

// Konfiguracja trybu rywalizacji
export const COMPETITION_CONFIG = {
    targetRange: { min: 600, max: 900 },
    botDifficulty: {
        easy: { reactionTime: 150, accuracy: 0.6, avoidChance: 0.80 },
        medium: { reactionTime: 100, accuracy: 0.8, avoidChance: 0.95 },
        hard: { reactionTime: 50, accuracy: 0.95, avoidChance: 1.0 }
    },
    timeoutDuration: 2000,
    rewards: {
        win: {
            easy: { coins: 75, exp: 30 },
            medium: { coins: 150, exp: 75 },
            hard: { coins: 300, exp: 150 }
        },
        lose: { coins: 0, exp: 0 }
    }
};

// Ścieżki do grafik
export const SPRITE_PATHS = {
    idle: 'assets/kitty_idle_right.png',
    swing: 'assets/kitty_swing_right.png',
    chop: 'assets/kitty_chop_right.png'
};

// Ścieżki do dźwięków
export const SOUND_PATHS = {
    reel_roll: 'sfx/reel_tick.wav',
    reel_stop: 'sfx/reel_stop.wav',
    chop: 'sfx/chop.mp3'
};

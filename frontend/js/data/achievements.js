// ============================================
// ACHIEVEMENTS.JS - Dane osiągnięć
// ============================================

export const achievementsData = {
    'chop10': {
        name: 'Początkujący',
        description: 'Zetnij 10 drzew.',
        icon: '🪵',
        condition: (stats) => stats.totalChops >= 10
    },
    'chop100': {
        name: 'Drwal',
        description: 'Zetnij 100 drzew.',
        icon: '🪓',
        condition: (stats) => stats.totalChops >= 100
    },
    'chop500': {
        name: 'Mistrz Drwali',
        description: 'Zetnij 500 drzew.',
        icon: '🏆',
        condition: (stats) => stats.totalChops >= 500
    },
    'score50': {
        name: 'Szybkie Ręce',
        description: 'Zdobądź 50 pkt.',
        icon: '⚡',
        condition: (stats) => stats.highScore >= 50
    },
    'score100': {
        name: 'Demon Prędkości',
        description: 'Zdobądź 100 pkt.',
        icon: '🔥',
        condition: (stats) => stats.highScore >= 100
    },
    'coins100': {
        name: 'Kieszonkowe',
        description: 'Zdobądź 100 monet.',
        icon: '💰',
        condition: (stats) => stats.coins >= 100
    },
    'coins1000': {
        name: 'Skarbnik',
        description: 'Zdobądź 1000 monet.',
        icon: '💎',
        condition: (stats) => stats.coins >= 1000
    },
    'noBranch10': {
        name: 'Szczęściarz',
        description: 'Zetnij 10 drzew bez gałęzi.',
        icon: '🍀',
        condition: (stats) => stats.highScore >= 10
    }
};

// Sprawdź które osiągnięcia zostały odblokowane
export function checkAchievements(stats, unlockedAchievements = []) {
    const newlyUnlocked = [];

    for (const [id, achievement] of Object.entries(achievementsData)) {
        if (!unlockedAchievements.includes(id) && achievement.condition(stats)) {
            newlyUnlocked.push(id);
        }
    }

    return newlyUnlocked;
}

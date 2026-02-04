// ============================================
// AUDIO.JS - Obsługa dźwięków
// ============================================

import { SOUND_PATHS } from '../config.js';

export const gameSounds = {};
let soundsLoaded = false;

// Załaduj wszystkie dźwięki
export function loadSounds() {
    console.log('Ładowanie dźwięków...');
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        const totalSounds = Object.keys(SOUND_PATHS).length;

        if (totalSounds === 0) {
            soundsLoaded = true;
            resolve();
            return;
        }

        for (const key in SOUND_PATHS) {
            const audio = new Audio();
            audio.src = SOUND_PATHS[key];
            gameSounds[key] = audio;

            audio.addEventListener('canplaythrough', () => {
                loadedCount++;
                if (loadedCount === totalSounds) {
                    console.log('Wszystkie dźwięki załadowane!');
                    soundsLoaded = true;
                    resolve();
                }
            }, { once: true });

            audio.onerror = () => reject(new Error(`Nie udało się załadować dźwięku: ${SOUND_PATHS[key]}`));
        }
    });
}

// Odtwórz dźwięk
export function playSound(soundName, volume = 1.0) {
    if (!soundsLoaded || !gameSounds[soundName]) return;

    const sound = gameSounds[soundName].cloneNode();
    sound.volume = volume;
    sound.play().catch(() => { });
}

// Sprawdź czy dźwięki są załadowane
export function areSoundsLoaded() {
    return soundsLoaded;
}

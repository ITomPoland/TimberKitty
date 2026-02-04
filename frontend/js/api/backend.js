// ============================================
// BACKEND.JS - Komunikacja z serwerem
// ============================================

import { BACKEND_URL } from '../config.js';

// Pobierz dane zalogowanego użytkownika
export async function fetchCurrentUser() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/me`, { credentials: 'include' });
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
        return null;
    }
}

// Zapisz statystyki po grze
export async function saveStats(scoreFromGame, coinsEarned, newTotals) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/stats`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ scoreFromGame, coinsEarned, newTotals })
        });
        if (!response.ok) {
            throw new Error('Błąd zapisu na serwerze');
        }
        return await response.json();
    } catch (error) {
        console.error('Nie udało się zapisać statystyk na serwerze:', error);
        throw error;
    }
}

// Pobierz dane sklepu z serwera
export async function fetchShopData() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/shop`, { credentials: 'include' });
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Błąd pobierania danych sklepu:', error);
        return null;
    }
}

// Pobierz misje
export async function fetchMissions() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/missions`, { credentials: 'include' });
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Błąd pobierania misji:', error);
        return null;
    }
}

// Odbierz nagrodę za misję
export async function claimMission(missionId) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/missions/claim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ missionId })
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Błąd odbierania nagrody');
        }
        return await response.json();
    } catch (error) {
        console.error('Błąd odbierania nagrody:', error);
        throw error;
    }
}

// Otwórz skrzynkę
export async function openLootBox(boxId) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/open-box`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ boxId })
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Błąd otwierania skrzynki');
        }
        return await response.json();
    } catch (error) {
        console.error('Błąd otwierania skrzynki:', error);
        throw error;
    }
}

// Pobierz ranking
export async function fetchLeaderboard(type = 'highscore') {
    try {
        const response = await fetch(`${BACKEND_URL}/api/leaderboard?type=${type}`, {
            credentials: 'include'
        });
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Błąd pobierania rankingu:', error);
        return null;
    }
}

// Aktualizuj profil
export async function updateProfile(data) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/update-profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Błąd aktualizacji profilu');
        }
        return await response.json();
    } catch (error) {
        console.error('Błąd aktualizacji profilu:', error);
        throw error;
    }
}

// Resetuj postęp
export async function resetProgress() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/reset-progress`, {
            method: 'POST',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Błąd resetowania postępu');
        }
        return await response.json();
    } catch (error) {
        console.error('Błąd resetowania postępu:', error);
        throw error;
    }
}

// Odśwież pojedynczą misję
export async function refreshSingleMission(missionId, timeCategory) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/missions/refresh-single`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ missionId, timeCategory })
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Błąd odświeżania misji');
        }
        return await response.json();
    } catch (error) {
        console.error('Błąd odświeżania misji:', error);
        throw error;
    }
}

// Przekierowania autoryzacji
export function redirectToLogin() {
    window.location.href = `${BACKEND_URL}/auth/google`;
}

export function redirectToLogout() {
    window.location.href = `${BACKEND_URL}/auth/logout`;
}

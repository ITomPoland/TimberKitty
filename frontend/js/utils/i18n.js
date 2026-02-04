// ============================================
// I18N.JS - Konfiguracja tłumaczeń
// ============================================

let i18nInitialized = false;

// Inicjalizuj i18next
export function initI18n() {
    const i18n = window.i18next;

    if (!i18n) {
        console.error('i18next core nie jest załadowany.');
        return Promise.reject(new Error('i18next not loaded'));
    }

    const initialLng = localStorage.getItem('i18nextLng') || 'pl';

    return new Promise((resolve, reject) => {
        // Konfiguracja z zewnętrznymi plikami tłumaczeń
        i18n.use(window.i18nextHttpBackend).init({
            fallbackLng: 'pl',
            debug: false,
            lng: initialLng,
            backend: {
                loadPath: 'locales/{{lng}}/translation.json'
            }
        }, (err) => {
            if (err) {
                console.error('i18next init error:', err);
                reject(err);
                return;
            }
            console.log('[i18n] initialized with', i18n.language);
            i18nInitialized = true;
            resolve();
        });
    });
}

// Zmień język
export function changeLanguage(langCode) {
    return window.i18next.changeLanguage(langCode);
}

// Pobierz tłumaczenie
export function t(key, options) {
    return window.i18next.t(key, options);
}

// Sprawdź czy i18n jest zainicjalizowany
export function isI18nReady() {
    return i18nInitialized;
}

// Pobierz aktualny język
export function getCurrentLanguage() {
    return window.i18next.language;
}

// Ustaw podświetlenie przycisków języka
export function setActiveLanguageButtons(langCode) {
    const plButton = document.getElementById('pl-button');
    const enButton = document.getElementById('en-button');

    if (!plButton || !enButton) return;

    const base = (langCode || '').split('-')[0];
    if (base === 'en') {
        enButton.classList.add('active-lang');
        plButton.classList.remove('active-lang');
    } else {
        plButton.classList.add('active-lang');
        enButton.classList.remove('active-lang');
    }
}

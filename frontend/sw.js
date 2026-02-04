// ============================================
// SERVICE WORKER - TimberKitty PWA
// ============================================

const CACHE_NAME = 'timberkitty-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/script.js',
    '/style.css',
    '/assets/kitty_idle_right.png',
    '/assets/kitty_swing_right.png',
    '/assets/kitty_chop_right.png',
    '/assets/background.png',
    '/sfx/chop.mp3',
    '/locales/pl/translation.json',
    '/locales/en/translation.json'
];

// Instalacja Service Worker
self.addEventListener('install', event => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching files');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error('[SW] Cache failed:', err);
            })
    );
    self.skipWaiting();
});

// Aktywacja - usuwanie starych cache'ów
self.addEventListener('activate', event => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Strategia: Network First z fallback do cache
self.addEventListener('fetch', event => {
    // Ignoruj requesty do backendu (API)
    if (event.request.url.includes('/api/') || event.request.url.includes('/auth/')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Klonuj odpowiedź i zapisz do cache
                if (response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, responseToCache));
                }
                return response;
            })
            .catch(() => {
                // Offline - zwróć z cache
                return caches.match(event.request);
            })
    );
});

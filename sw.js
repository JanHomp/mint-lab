const CACHE_NAME = 'mint-lab-v2';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './icon.png'
];

self.addEventListener('install', (e) => {
    self.skipWaiting(); // Force update
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    // Media and Cloud fetching should always be network first
    if (e.request.url.includes('docs.google.com') || e.request.url.includes('drive.google.com')) {
        return;
    }

    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});

const CACHE_NAME = 'espetinho-darlan-shell-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => { const u = new URL(event.request.url); if (u.origin !== self.location.origin) return; event.respondWith(fetch(event.request).then(response => { if (response && response.ok && event.request.method === 'GET') { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); } return response; }).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html')))); });

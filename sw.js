/* Adventure Quiz — Service Worker */
const CACHE = 'adventure-quiz-v4';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/gifs/orangutan.gif',
  '/gifs/tapir.gif',
  '/gifs/proboscis.gif',
  '/gifs/pygmy_elephant.gif',
  '/gifs/sun_bear.gif',
  '/gifs/clouded_leopard.gif',
  '/gifs/hornbill.gif',
  '/gifs/firefly.gif',
  '/gifs/crocodile.gif',
  '/gifs/cobra.gif',
  '/gifs/pitcher.jpg',
  '/gifs/colugo.gif',
  '/gifs/slow_loris.gif',
  '/gifs/pangolin.gif',
  '/gifs/flying_fox.gif',
  '/gifs/sea_turtle.gif',
  '/gifs/binturong.gif',
  '/gifs/macaque.gif',
  '/gifs/fiddler_crab.gif',
  '/gifs/hornbill2.gif',
];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  // Don't skipWaiting here — wait for page to ask us to
});

// Activate: remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// Message from page: skip waiting and take over immediately
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

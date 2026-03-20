/* Adventure Quiz — Service Worker */
const CACHE = 'adventure-quiz-v1';
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

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

const CACHE_NAME = 'armenia-travel-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/reviews.js',
  '/map.js',
  '/yerevan.html',
  '/gyumri.html',
  '/vagharshapat.html',
  '/dilijan.html',
  '/goris.html',
  '/jermuk.html',
  '/images/cascade.jpg',
  '/images/republic-square.jpg',
  '/images/amenaprkich.jpg',
  '/images/khndzoresk.jpg',
  '/images/echmiadzin.jpg',
  '/images/dilijan-park.jpg',
  '/images/jermuk-waterfall.jpg',
  '/images/jermuk-mineral.jpg'
];

// Установка Service Worker и кэширование ресурсов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

// Обработка запросов (сначала из кэша, потом из сети)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
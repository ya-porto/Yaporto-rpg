
const CACHE_NAME = 'cahe-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
})

// Подписывается на свое же событие регистрации чтобы закешировать данные
self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_URLS') {
      event.waitUntil(
          caches.open(CACHE_NAME)
              .then( (cache) => {
                  return cache.addAll(event.data.payload);
              })
      )
  }
});




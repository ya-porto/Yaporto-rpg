
const CACHE_NAME = 'cahe-v1';
const urls = [
	'/index.html',
	'/bundle.js',
	'/css/style.css'
];
// При установке воркера мы кешируем часть данных (статику).
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urls);
		}).catch(function (error) {
			console.log('Installing failed with' + error);
		})
	);
});

// При запросе на сервер (событие fetch), используем только данные из кэша.
self.addEventListener('fetch', event => {
	if ((!(event.request.url.indexOf('http') === 0)) || (!(event.request.url.indexOf('https') === 0))) {
		return;
	}

	event.respondWith(
		caches.match(event.request).then(resp => {
			return resp || fetch(event.request).then(response => {
				return caches.open(CACHE_NAME).then(cache => {
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});

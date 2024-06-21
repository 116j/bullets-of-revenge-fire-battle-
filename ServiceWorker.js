const cacheName = "Eugenia Erm-Bullets of Revenge Fire Battle-1.0";
const contentToCache = [
    "Build/bullets-of-revenge-fire-battle-vk.loader.js",
    "Build/bullets-of-revenge-fire-battle-vk.framework.js.unityweb",
    "Build/bullets-of-revenge-fire-battle-vk.data.unityweb",
    "Build/bullets-of-revenge-fire-battle-vk.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});

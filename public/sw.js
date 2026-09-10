const CACHE_NAME = "nuraform-v2";
const PRECACHE_URLS = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.all(PRECACHE_URLS.map((url) => cache.add(url).catch(() => undefined))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => Promise.all(cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put("/index.html", responseCopy);
          });
          return response;
        })
        .catch(() => caches.match(request).then((response) => response || caches.match("/index.html"))),
    );
    return;
  }

  const isStaticAsset = requestUrl.pathname.startsWith("/assets/") || requestUrl.pathname.startsWith("/src/") || requestUrl.pathname.startsWith("/@vite/") || requestUrl.pathname === "/@react-refresh" || /\.(?:css|js|jsx|json|webmanifest|png|jpg|jpeg|svg|webp|gif|ico|woff2?|ttf|otf|mp4)$/.test(requestUrl.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request)
          .then((response) => {
            if (response.ok) {
              const responseCopy = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseCopy);
              });
            }
            return response;
          })
          .catch(() => caches.match(request, { ignoreSearch: true }));
      }),
    );
  }
});

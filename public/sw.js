const CACHE_NAME = "nuraform-v4";

const PRECACHE_URLS = ["/", "/index.html", "/offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)));
      })
      .then(() => {
        return self.clients.claim();
      }),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  const requestUrl = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseCopy = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseCopy);
            });
          }

          return response;
        })
        .catch(() => {
          return caches.match("/offline.html");
        }),
    );

    return;
  }

  const isStaticAsset = requestUrl.pathname.startsWith("/assets/") || requestUrl.pathname.startsWith("/src/") || requestUrl.pathname.startsWith("/@vite/") || requestUrl.pathname === "/@react-refresh" || /\.(?:css|js|jsx|json|webmanifest|png|jpg|jpeg|svg|webp|gif|ico|woff2?|ttf|otf|mp4)$/i.test(requestUrl.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches
        .match(request, {
          ignoreSearch: true,
        })
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

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
            .catch(() => {
              return caches.match(request, {
                ignoreSearch: true,
              });
            });
        }),
    );
  }
});

const CACHE_VERSION = "v7";
const CACHE_NAME = `school-site-${CACHE_VERSION}`;
const ASSETS = [
  "site.webmanifest",
  "images/favicon.ico",
  "images/favicon-16x16.png",
  "images/favicon-32x32.png",
  "images/apple-touch-icon.png",
  "images/android-chrome-192x192.png",
  "images/android-chrome-512x512.png",
  "images/icon-maskable-192.png",
  "images/icon-maskable-512.png",
  "images/screenshot-wide.png",
  "images/screenshot-mobile.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("school-site-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  // Do not cache HTML or CSS.
  if (
    request.destination === "document" ||
    request.destination === "style" ||
    request.url.endsWith(".html") ||
    request.url.endsWith(".css")
  ) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return response;
      });
    })
  );
});

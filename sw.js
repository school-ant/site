const CACHE_VERSION = "v4";
const CACHE_NAME = `school-site-${CACHE_VERSION}`;
const ASSETS = [
	"site.webmanifest",
	"favicon.ico",
	"favicon-16x16.png",
	"favicon-32x32.png",
	"apple-touch-icon.png",
	"android-chrome-192x192.png",
	"android-chrome-512x512.png",
	"icon-maskable-192.png",
	"icon-maskable-512.png",
	"screenshot-wide.png",
	"screenshot-mobile.png"
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((keys) =>
			Promise.all([
				...keys
					.filter((key) => key.startsWith("school-site-") && key !== CACHE_NAME)
					.map((key) => caches.delete(key)),
				caches.open(CACHE_NAME).then((cache) =>
					cache.keys().then((requests) =>
						Promise.all(
							requests.map((request) => {
								const isHtml =
									request.destination === "document" ||
									request.url.endsWith(".html");
								const isCss =
									request.destination === "style" ||
									request.url.endsWith(".css");
								if (!isHtml && !isCss) {
									return undefined;
								}
								return cache.delete(request);
							})
						)
					)
				)
			])
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

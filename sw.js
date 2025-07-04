// OceanCrest Entertainment - Service Worker
const CACHE_NAME = "oceancrest-v1.2.0";
const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/capabilities.html",
  "/projects.html",
  "/team.html",
  "/newsroom.html",
  "/careers.html",
  "/contact.html",
  "/styles.css",
  "/app.js",
  "/manifest.json",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    }),
  );
});

// Fetch event - network-first strategy for API calls, cache-first for static assets
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Network-first strategy for API calls
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If network request succeeds, notify clients that we're online
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({ type: "NETWORK_STATUS", online: true });
            });
          });
          return response;
        })
        .catch((error) => {
          // Network failed, notify clients that we're offline
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({ type: "NETWORK_STATUS", online: false });
            });
          });

          // Try to return a cached response for API calls (fallback)
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return a custom offline response for API calls
            return new Response(
              JSON.stringify({
                error: "Offline",
                message: "No network connection available",
                offline: true,
              }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              },
            );
          });
        }),
    );
  } else {
    // Cache-first strategy for static assets
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
      }),
    );
  }
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

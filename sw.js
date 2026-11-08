/* Liquidfi service worker: ONLY shows stop alerts. It has no fetch handler, so it never caches or changes what the app loads. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) {}
  const title = String(d.t || 'Liquidfi').slice(0, 80), body = String(d.b || 'A stop order changed. Open Liquidfi to see it.').slice(0, 240);
  e.waitUntil(self.registration.showNotification(title, { body, tag: String(d.tag || 'liquidfi'), renotify: true, icon: 'icon-192.png', badge: 'icon-192.png' }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((L) => {
    for (const c of L) if (c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus();
    return self.clients.openWindow(self.registration.scope);
  }));
});

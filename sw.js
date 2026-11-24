/* Liquidfi service worker: ONLY shows alerts. It has no fetch handler, so it never caches or changes what the app loads. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) {}
  const title = String(d.t || 'Liquidfi').slice(0, 80), body = String(d.b || 'A stop order changed. Open Liquidfi to see it.').slice(0, 240), tag = String(d.tag || 'liquidfi');
  const o = { body, tag, renotify: true, icon: 'icon-192.png', badge: 'badge-96.png' };
  if (tag.startsWith('px-')) o.actions = [{ action: 'pxoff', title: 'Turn off price alerts' }];   /* v2.48a: price alerts can be turned off right from the alert */
  e.waitUntil(self.registration.showNotification(title, o));
});
/* tapping an alert opens what it's about: the open app gets the alert's tag as a message, a new window gets it as #n=<tag> */
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const tag = e.action === 'pxoff' ? 'pxoff' : String(e.notification.tag || ''), scope = self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((L) => {
    for (const c of L) if (c.url.startsWith(scope) && 'focus' in c) { try { c.postMessage({ liquidfiGo: tag }); } catch (x) {} return c.focus(); }
    return self.clients.openWindow(scope + (tag ? '#n=' + encodeURIComponent(tag) : ''));
  }));
});

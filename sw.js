const C='trazo-'+'202610111111';const A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put('./index.html',y));return x}).catch(()=>caches.match('./index.html')));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok&&(new URL(r.url).origin===location.origin||/fonts\.(googleapis|gstatic)\.com/.test(r.url))){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x}).catch(()=>m)))});

/* Trazo · portada. Solo guarda la portada: las apps de obra/ y finca/ tienen su propio service worker */
const C='trazo-portada-202611051100';const A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./obra/icon-192.png','./finca/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&!/^trazo-(obra|finca)-/.test(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url),base=new URL('./',self.registration.scope);
  if(u.origin!==location.origin||!u.pathname.startsWith(base.pathname))return;const rest=u.pathname.slice(base.pathname.length);if(/^(obra|finca)(\/|$)/.test(rest)&&!/icon-192\.png$/.test(rest))return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put('./index.html',y));return x}).catch(()=>caches.match('./index.html')));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r)))});

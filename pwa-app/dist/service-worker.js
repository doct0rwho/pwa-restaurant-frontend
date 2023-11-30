if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + ".js", i).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, r) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[o]) return;
    let l = {};
    const c = (e) => n(e, o),
      t = { module: { uri: o }, exports: l, require: c };
    s[o] = Promise.all(i.map((e) => t[e] || c(e))).then((e) => (r(...e), l));
  };
}
define(["./workbox-5b385ed2"], function (e) {
  "use strict";
  e.setCacheNameDetails({ prefix: "restaurant-app" }),
    self.addEventListener("message", (e) => {
      e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
    }),
    e.precacheAndRoute(
      [
        { url: "/css/app.d29b3245.css", revision: null },
        { url: "/css/chunk-vendors.c05c51ec.css", revision: null },
        { url: "/fonts/primeicons.0112589c.ttf", revision: null },
        { url: "/fonts/primeicons.ba3f916d.woff2", revision: null },
        { url: "/fonts/primeicons.f8b9e8a4.woff", revision: null },
        { url: "/fonts/primeicons.ffecb254.eot", revision: null },
        { url: "/img/primeicons.943ab24c.svg", revision: null },
        { url: "/index.html", revision: "67b0d8ae6a4f39067b34a0783ebf4d4f" },
        { url: "/js/app.03c016c8.js", revision: null },
        { url: "/js/chunk-vendors.f09084ac.js", revision: null },
        { url: "/manifest.json", revision: "fb359436d42514990c699ada95bbecce" },
        { url: "/robots.txt", revision: "b6216d61c03e6ce0c9aea6ca7808f7ca" },
      ],
      {}
    );
});
//# sourceMappingURL=service-worker.js.map

if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const c=e=>i(e,o),t={module:{uri:o},exports:l,require:c};s[o]=Promise.all(n.map((e=>t[e]||c(e)))).then((e=>(r(...e),l)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"pwa-app"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.8ae112d0.css",revision:null},{url:"/css/chunk-vendors.c05c51ec.css",revision:null},{url:"/fonts/primeicons.0112589c.ttf",revision:null},{url:"/fonts/primeicons.ba3f916d.woff2",revision:null},{url:"/fonts/primeicons.f8b9e8a4.woff",revision:null},{url:"/fonts/primeicons.ffecb254.eot",revision:null},{url:"/img/primeicons.943ab24c.svg",revision:null},{url:"/index.html",revision:"e386c1cd0c18a700724ec247d9052356"},{url:"/js/app.6fb44dc9.js",revision:null},{url:"/js/chunk-vendors.5312cb01.js",revision:null},{url:"/manifest.json",revision:"6a076fe8da32bb9c18f5e9fb449d2770"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map

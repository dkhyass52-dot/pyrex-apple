/* =============================================================
   PYREX APPLE — Logique commune du site
   Header, footer, panier (localStorage), WhatsApp, et pages.
   ============================================================= */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const PAGE = document.body.dataset.page || "";
  const params = new URLSearchParams(location.search);

  /* ---------------- Utilitaires ---------------- */
  const fcfa = n => new Intl.NumberFormat("fr-FR").format(Math.round(n)).replace(/[  ]/g, " ") + " F";
  const waUrl = msg => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`;
  const byId = id => PRODUCTS.find(p => p.id === id);
  const minPrice = p => Math.min(...p.variants.map(v => v[1]));
  const catLabel = id => (CATEGORIES.find(c => c.id === id) || {}).label || "";
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (name, cls = "ico") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  /* ---------------- Icônes ---------------- */
  const ICONS = {
    wa: '<path fill="currentColor" stroke="none" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.03c-.25.69-1.44 1.33-1.98 1.38-.51.05-1 .24-3.36-.7-2.84-1.12-4.64-4.03-4.78-4.22-.14-.19-1.14-1.52-1.14-2.9s.72-2.06.98-2.34c.25-.28.55-.35.74-.35l.53.01c.17.01.4-.06.62.48.25.6.85 2.06.92 2.21.07.15.12.32.02.51-.1.19-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.45.29.15.46.12.63-.07.17-.19.73-.85.92-1.15.19-.29.39-.24.65-.15.27.1 1.7.8 1.99.95.29.15.49.22.56.34.07.12.07.69-.18 1.38Z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bag: '<path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    test: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="m8 12 3 3 5-6"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 7.6-1.7"/>',
    truck: '<path d="M2 6h11v10H2zM13 10h4l4 4v2h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
    swap: '<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
    wallet: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/>',
    battery: '<rect x="2" y="7" width="17" height="10" rx="2.5"/><path d="M22 11v2M6 10v4M9.5 10v4M13 10v4"/>',
    spark: '<path d="M12 3c.6 4.2 1.8 5.4 6 6-4.2.6-5.4 1.8-6 6-.6-4.2-1.8-5.4-6-6 4.2-.6 5.4-1.8 6-6Z"/><path d="M19 15c.3 1.7.8 2.2 2.5 2.5-1.7.3-2.2.8-2.5 2.5-.3-1.7-.8-2.2-2.5-2.5 1.7-.3 2.2-.8 2.5-2.5Z"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/>',
    fb: '<path fill="currentColor" stroke="none" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/>',
    ig: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/>',
    tt: '<path fill="currentColor" stroke="none" d="M16.6 3c.4 2.2 1.8 3.6 4 3.8v3.1c-1.5.1-2.9-.4-4-1.1v6.4c0 3.4-2.5 5.8-5.8 5.8S5 18.6 5 15.4c0-3.4 2.9-6 6.5-5.6v3.2c-1.6-.4-3.2.7-3.2 2.4 0 1.4 1 2.4 2.4 2.4 1.5 0 2.6-1 2.6-2.8V3h3.3Z"/>'
  };
  document.body.insertAdjacentHTML("afterbegin",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${Object.entries(ICONS).map(([k, v]) =>
      `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`).join("")}</svg>`);

  /* ---------------- Statut ouvert / fermé ---------------- */
  function storeStatus() {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Porto-Novo" }));
    const d = now.getDay(), h = now.getHours();
    const open = d !== 0 && h >= 9 && h < 22;
    let text = open ? "Ouvert maintenant · jusqu'à 22h" : (d === 0 || (d === 6 && h >= 22) ? "Fermé · ouvre lundi à 9h" : "Fermé · ouvre à 9h");
    return { open, text };
  }

  /* ---------------- Panier ---------------- */
  const KEY = "pyrex_cart_v1";
  const Cart = {
    read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return this._mem || []; } },
    write(items) { this._mem = items; try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} renderCartUI(); },
    items() { return this.read().filter(i => byId(i.id) && byId(i.id).variants[i.v]); },
    add(id, v = 0, qty = 1) {
      const items = this.read(); const f = items.find(i => i.id === id && i.v === v);
      if (f) f.qty = Math.min(9, f.qty + qty); else items.push({ id, v, qty });
      this.write(items);
    },
    setQty(id, v, qty) {
      let items = this.read();
      if (qty <= 0) items = items.filter(i => !(i.id === id && i.v === v));
      else items.forEach(i => { if (i.id === id && i.v === v) i.qty = Math.min(9, qty); });
      this.write(items);
    },
    clear() { this.write([]); },
    count() { return this.items().reduce((s, i) => s + i.qty, 0); },
    subtotal() { return this.items().reduce((s, i) => s + byId(i.id).variants[i.v][1] * i.qty, 0); }
  };
  window.PyrexCart = Cart;

  /* ---------------- Gabarits partagés ---------------- */
  const NAV = [
    ["index.html", "Accueil", "home"],
    ["boutique.html?cat=iphone", "iPhone", "iphone"],
    ["boutique.html?cat=mac", "MacBook", "mac"],
    ["boutique.html?cat=samsung", "Samsung", "samsung"],
    ["boutique.html?cat=accessoires", "Accessoires", "accessoires"],
    ["echange.html", "Échange", "echange"],
    ["contact.html", "Contact", "contact"]
  ];
  const activeKey = PAGE === "shop" ? (params.get("cat") || "shop") :
                    PAGE === "product" ? ((byId(params.get("id")) || {}).cat || "") : PAGE;

  function header() {
    return `
    <div class="topbar"><div class="container topbar__inner">
      <span>${icon("truck")} Livraison le jour même à Cotonou & Calavi</span>
      <span>${icon("shield")} Garantie jusqu'à 12 mois</span>
      <span>${icon("swap")} Reprise de ton ancien téléphone</span>
    </div></div>
    <header class="header" id="header">
      <div class="container header__inner">
        <a href="index.html" class="header__logo" aria-label="Pyrex Apple, accueil"><img src="assets/img/logo-horizontal.svg" alt="Pyrex Apple" width="179" height="50"></a>
        <nav class="nav" id="nav" aria-label="Navigation principale">
          ${NAV.map(([h, l, k]) => `<a href="${h}" class="${k === activeKey ? "is-active" : ""}${k === "echange" ? " nav__cta" : ""}">${l}</a>`).join("")}
        </nav>
        <div class="header__actions">
          <button class="icon-btn" id="searchBtn" aria-label="Rechercher" aria-expanded="false">${icon("search")}</button>
          <button class="icon-btn" id="cartBtn" aria-label="Ouvrir le panier">${icon("bag")}<span class="cart-count" id="cartCount">0</span></button>
          <button class="icon-btn burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
        </div>
      </div>
      <div class="searchbar" id="searchbar"><div class="container">
        <form action="boutique.html" role="search">
          <input class="input" type="search" name="q" placeholder="Rechercher un iPhone, un MacBook, un Galaxy…" aria-label="Rechercher" />
          <button class="btn btn--primary" type="submit">Rechercher</button>
        </form>
      </div></div>
    </header>`;
  }

  function footer() {
    const st = storeStatus();
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            <img src="assets/img/logo-horizontal-blanc.svg" alt="Pyrex Apple" width="193" height="54">
            <p>Ta boutique tech à Cotonou : iPhone, MacBook, Samsung Galaxy et accessoires. Neufs, premium ou reconditionnés, testés et garantis.</p>
            <div class="footer__social">
              <a href="${waUrl("Bonjour Pyrex Apple !")}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("wa")}</a>
              <a href="#" aria-label="Facebook" data-social="facebook">${icon("fb")}</a>
              <a href="#" aria-label="Instagram" data-social="instagram">${icon("ig")}</a>
              <a href="#" aria-label="TikTok" data-social="tiktok">${icon("tt")}</a>
            </div>
          </div>
          <div>
            <h4>Boutique</h4>
            <ul>${CATEGORIES.map(c => `<li><a href="boutique.html?cat=${c.id}">${c.label}</a></li>`).join("")}<li><a href="boutique.html">Tous les produits</a></li></ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="echange.html">Échange & reprise</a></li>
              <li><a href="contact.html#garanties">Garanties & retours</a></li>
              <li><a href="contact.html#livraison">Livraison & paiement</a></li>
              <li><a href="contact.html#faq">Questions fréquentes</a></li>
            </ul>
          </div>
          <div>
            <h4>Boutique physique</h4>
            <ul>
              <li><span class="status ${st.open ? "" : "is-closed"}">${st.text}</span></li>
              <li>${SHOP.plusCode}, ${SHOP.address}</li>
              ${SHOP.hours.map(h => `<li>${h[0]} : ${h[1]}</li>`).join("")}
              <li><a href="tel:${SHOP.phoneTel}">${SHOP.phoneDisplay}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} Pyrex Apple. Tous droits réservés.</span>
          <div class="pay"><span>Espèces</span><span>MTN MoMo</span><span>Moov Money</span><span>Celtiis Cash</span></div>
          <span>iPhone, MacBook, AirPods et Apple Watch sont des marques d'Apple Inc. Galaxy est une marque de Samsung. Pyrex Apple est un revendeur indépendant.</span>
        </div>
      </div>
    </footer>
    <a class="fab" href="${waUrl("Bonjour Pyrex Apple ! J'ai une question.")}" target="_blank" rel="noopener" aria-label="Nous écrire sur WhatsApp">${icon("wa")}</a>
    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer__bg" data-close></div>
      <aside class="drawer__panel" role="dialog" aria-label="Panier" aria-modal="true">
        <div class="drawer__head"><h3>Mon panier</h3><button class="icon-btn" data-close aria-label="Fermer">${icon("close")}</button></div>
        <div class="drawer__body" id="drawerBody"></div>
        <div class="drawer__foot" id="drawerFoot"></div>
      </aside>
    </div>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  }

  $("#site-header") && ($("#site-header").outerHTML = header());
  $("#site-footer") && ($("#site-footer").outerHTML = footer());

  /* Liens réseaux sociaux : renseigne-les ici quand la boutique les communique */
  const SOCIAL = { facebook: "", instagram: "", tiktok: "" };
  $$("[data-social]").forEach(a => { const u = SOCIAL[a.dataset.social]; if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; } else a.remove(); });

  /* ---------------- Header : scroll, menu, recherche ---------------- */
  const hdr = $("#header");
  const onScroll = () => hdr && hdr.classList.toggle("is-scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const burger = $("#burger"), nav = $("#nav");
  burger?.addEventListener("click", () => {
    const o = nav.classList.toggle("is-open"); burger.setAttribute("aria-expanded", o);
  });
  const sBtn = $("#searchBtn"), sBar = $("#searchbar");
  sBtn?.addEventListener("click", () => {
    const o = sBar.classList.toggle("is-open"); sBtn.setAttribute("aria-expanded", o);
    if (o) setTimeout(() => $("input", sBar).focus(), 200);
  });

  /* ---------------- Liens WhatsApp déclaratifs ---------------- */
  $$("[data-wa]").forEach(a => { a.href = waUrl(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });

  /* ---------------- Tiroir panier & toast ---------------- */
  const drawer = $("#drawer");
  function openDrawer() { drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); }
  function closeDrawer() { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); }
  $("#cartBtn")?.addEventListener("click", openDrawer);
  drawer?.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeDrawer(); });
  addEventListener("keydown", e => { if (e.key === "Escape") { closeDrawer(); closeFilters?.(); } });

  let toastTimer;
  function toast(html, action) {
    const t = $("#toast"); t.innerHTML = html + (action ? `<button type="button">${action.label}</button>` : "");
    if (action) $("button", t).onclick = () => { action.fn(); t.classList.remove("is-on"); };
    t.classList.add("is-on"); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("is-on"), 3600);
  }

  function lineHTML(i) {
    const p = byId(i.id), v = p.variants[i.v];
    return `<div class="line">
      <a class="line__img" href="produit.html?id=${p.id}"><img src="${p.img}" alt="" loading="lazy"></a>
      <div>
        <a class="line__name" href="produit.html?id=${p.id}">${esc(p.name)}</a>
        <div class="line__meta">${esc(v[0])} · ${ETATS[p.etat].label}</div>
        <div class="line__ctrl">
          <div class="qty" data-id="${p.id}" data-v="${i.v}">
            <button type="button" data-q="-1" aria-label="Diminuer">−</button><output>${i.qty}</output><button type="button" data-q="1" aria-label="Augmenter">+</button>
          </div>
          <button class="line__rm" type="button" data-rm="${p.id}" data-v="${i.v}">Retirer</button>
        </div>
      </div>
      <div class="line__price">${fcfa(v[1] * i.qty)}</div>
    </div>`;
  }
  document.addEventListener("click", e => {
    const q = e.target.closest(".qty[data-id] [data-q]");
    if (q) {
      const box = q.closest(".qty"); const it = Cart.read().find(i => i.id === box.dataset.id && i.v === +box.dataset.v);
      if (it) Cart.setQty(it.id, it.v, it.qty + +q.dataset.q);
    }
    const rm = e.target.closest("[data-rm]");
    if (rm) Cart.setQty(rm.dataset.rm, +rm.dataset.v, 0);
  });

  function renderCartUI() {
    const n = Cart.count(), cc = $("#cartCount");
    if (cc) { cc.textContent = n; cc.classList.toggle("has-items", n > 0); }
    const body = $("#drawerBody"), foot = $("#drawerFoot");
    if (body) {
      const items = Cart.items();
      body.innerHTML = items.length ? items.map(lineHTML).join("") :
        `<div class="drawer__empty">${icon("bag")}<p>Ton panier est vide.</p><a href="boutique.html" class="btn btn--primary btn--sm" style="margin-top:16px">Découvrir la boutique</a></div>`;
      foot.style.display = items.length ? "" : "none";
      foot.innerHTML = `<div class="drawer__total"><span>Sous-total</span><strong>${fcfa(Cart.subtotal())}</strong></div>
        <a href="panier.html" class="btn btn--primary btn--block">Finaliser ma commande</a>
        <button type="button" class="btn btn--ghost btn--block" data-close>Continuer mes achats</button>`;
    }
    if (PAGE === "cart") renderCartPage();
  }
  function addToCart(id, v = 0, qty = 1) {
    Cart.add(id, v, qty);
    const cc = $("#cartCount"); cc.classList.remove("bump"); void cc.offsetWidth; cc.classList.add("bump");
    const p = byId(id);
    toast(`${icon("check")} <span>${esc(p.name)} ajouté au panier</span>`, { label: "Voir", fn: openDrawer });
  }

  /* ---------------- Carte produit ---------------- */
  function card(p, i = 0) {
    const e = ETATS[p.etat];
    return `<a class="pcard" href="produit.html?id=${p.id}" style="animation-delay:${Math.min(i, 10) * 35}ms">
      <div class="pcard__tags"><span class="badge badge--${p.etat}">${e.short}</span>${p.badge ? `<span class="badge badge--hot">${esc(p.badge)}</span>` : ""}</div>
      <div class="pcard__media"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy" class="${p.wide ? "is-wide" : ""}"></div>
      <div class="pcard__brand">${esc(p.brand)}</div>
      <h3 class="pcard__name">${esc(p.name)}</h3>
      <p class="pcard__meta">${p.variants.map(v => esc(v[0])).join(" · ")}</p>
      <div class="pcard__foot">
        <div class="pcard__price"><small>${p.variants.length > 1 ? "à partir de" : "prix"}</small><strong>${fcfa(minPrice(p))}</strong></div>
        <button class="pcard__add" type="button" data-add="${p.id}" aria-label="Ajouter ${esc(p.name)} au panier">${icon("plus")}</button>
      </div>
    </a>`;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-add]"); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    addToCart(b.dataset.add, 0, 1);
    b.classList.add("is-done"); b.innerHTML = icon("check");
    setTimeout(() => { b.classList.remove("is-done"); b.innerHTML = icon("plus"); }, 1400);
  });

  /* ================================================================
     PAGES
     ================================================================ */

  /* ---------- Accueil ---------- */
  if (PAGE === "home") {
    const newest = PRODUCTS.filter(p => p.badge === "Nouveau").slice(0, 8);
    const best = PRODUCTS.filter(p => p.badge === "Best-seller" || p.badge === "Bon plan").slice(0, 8);
    $("#railNew").innerHTML = newest.map(card).join("");
    $("#gridBest").innerHTML = best.map(card).join("");
    $$("[data-rail]").forEach(b => b.addEventListener("click", () => {
      const r = $("#" + b.dataset.rail); r.scrollBy({ left: (+b.dataset.dir) * r.clientWidth * .8, behavior: "smooth" });
    }));
    $$("[data-count]").forEach(el => { el.textContent = PRODUCTS.filter(p => p.cat === el.dataset.count).length + " modèles"; });
  }

  /* ---------- Boutique ---------- */
  let closeFilters;
  if (PAGE === "shop") {
    const st = {
      cat: params.get("cat") || "all", q: (params.get("q") || "").toLowerCase(),
      brands: new Set(), etats: new Set(), max: 0, sort: "pertinence"
    };
    const maxAll = Math.ceil(Math.max(...PRODUCTS.map(minPrice)) / 50000) * 50000;
    st.max = maxAll;

    const title = $("#shopTitle"), sub = $("#shopSub"), crumb = $("#shopCrumb");
    const CAT_TXT = {
      all: ["Tous nos produits", "iPhone, MacBook, Samsung Galaxy et accessoires, testés et garantis."],
      iphone: ["iPhone", "Du iPhone 11 au dernier iPhone 18 Pro Max. Neufs, occasion premium ou reconditionnés."],
      mac: ["MacBook", "MacBook Neo, Air et Pro, pour les études, le bureau ou la création."],
      samsung: ["Samsung Galaxy", "Galaxy S, Z Fold, Z Flip et la série A, neufs et garantis."],
      accessoires: ["Accessoires", "AirPods, Apple Watch, chargeurs, câbles, coques et protections."]
    };
    $("#fCats").innerHTML = [["all", "Tout"]].concat(CATEGORIES.map(c => [c.id, c.label])).map(([id, l]) =>
      `<label class="opt"><input type="radio" name="cat" value="${id}" ${id === st.cat ? "checked" : ""}> ${l} <em>${id === "all" ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === id).length}</em></label>`).join("");
    $("#fBrands").innerHTML = [...new Set(PRODUCTS.map(p => p.brand))].map(b =>
      `<label class="opt"><input type="checkbox" value="${esc(b)}"> ${esc(b)}</label>`).join("");
    $("#fEtats").innerHTML = Object.entries(ETATS).map(([k, e]) =>
      `<label class="opt"><input type="checkbox" value="${k}"> ${e.label}</label>`).join("");
    const range = $("#fPrice"); range.max = maxAll; range.value = maxAll; range.step = 10000;
    $("#fPriceOut").textContent = fcfa(maxAll);
    const search = $("#shopSearch"); search.value = params.get("q") || "";

    $("#fCats").addEventListener("change", e => { st.cat = e.target.value; render(true); });
    $("#fBrands").addEventListener("change", () => { st.brands = new Set($$("#fBrands input:checked").map(i => i.value)); render(); });
    $("#fEtats").addEventListener("change", () => { st.etats = new Set($$("#fEtats input:checked").map(i => i.value)); render(); });
    range.addEventListener("input", () => { st.max = +range.value; $("#fPriceOut").textContent = fcfa(st.max); render(); });
    search.addEventListener("input", () => { st.q = search.value.trim().toLowerCase(); render(); });
    $("#shopSort").addEventListener("change", e => { st.sort = e.target.value; render(); });
    $("#fReset").addEventListener("click", () => {
      st.cat = "all"; st.q = ""; st.brands.clear(); st.etats.clear(); st.max = maxAll;
      search.value = ""; range.value = maxAll; $("#fPriceOut").textContent = fcfa(maxAll);
      $$("#filters input[type=checkbox]").forEach(i => i.checked = false);
      $("#fCats input[value=all]").checked = true; render(true);
    });

    const filters = $("#filters");
    $("#filterToggle").addEventListener("click", () => { filters.classList.add("is-open"); document.body.classList.add("no-scroll"); });
    closeFilters = () => { filters.classList.remove("is-open"); document.body.classList.remove("no-scroll"); };
    $("#filtersClose").addEventListener("click", closeFilters);
    $("#filtersApply").addEventListener("click", closeFilters);

    function render(updateUrl) {
      const [t, s] = CAT_TXT[st.cat] || CAT_TXT.all;
      title.textContent = t; sub.textContent = s; crumb.textContent = t;
      document.title = `${t} — Pyrex Apple, Cotonou`;
      if (updateUrl) {
        const u = new URL(location); st.cat === "all" ? u.searchParams.delete("cat") : u.searchParams.set("cat", st.cat);
        history.replaceState(null, "", u);
        $$("#nav a").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `boutique.html?cat=${st.cat}`));
      }
      let list = PRODUCTS.filter(p =>
        (st.cat === "all" || p.cat === st.cat) &&
        (!st.brands.size || st.brands.has(p.brand)) &&
        (!st.etats.size || st.etats.has(p.etat)) &&
        minPrice(p) <= st.max &&
        (!st.q || (p.name + " " + p.brand + " " + catLabel(p.cat)).toLowerCase().includes(st.q))
      );
      const S = {
        asc: (a, b) => minPrice(a) - minPrice(b),
        desc: (a, b) => minPrice(b) - minPrice(a),
        recent: (a, b) => b.year - a.year || minPrice(b) - minPrice(a),
        pertinence: (a, b) => (!!b.badge - !!a.badge) || b.year - a.year
      };
      list.sort(S[st.sort]);
      $("#shopCount").innerHTML = `<b>${list.length}</b> produit${list.length > 1 ? "s" : ""}`;
      $("#shopGrid").innerHTML = list.map(card).join("");
      $("#shopEmpty").hidden = list.length > 0;
    }
    render();
  }

  /* ---------- Fiche produit ---------- */
  if (PAGE === "product") {
    const p = byId(params.get("id"));
    const root = $("#productRoot");
    if (!p) {
      root.innerHTML = `<div class="empty" style="margin:40px 0"><h3>Produit introuvable</h3><p>Ce produit n'existe plus ou le lien est incorrect.</p><a class="btn btn--primary" href="boutique.html">Retour à la boutique</a></div>`;
    } else {
      const e = ETATS[p.etat];
      let v = 0, qty = 1;
      document.title = `${p.name} — Pyrex Apple, Cotonou`;
      $("meta[name=description]")?.setAttribute("content", `${p.name} ${e.label.toLowerCase()} à Cotonou, dès ${fcfa(minPrice(p))}. Garantie, test devant toi, livraison le jour même. Pyrex Apple.`);
      const specs = Object.assign({ "État": e.label }, p.battery ? { "Santé batterie": p.battery + " %" } : {}, p.specs, { "Garantie": e.warranty });
      root.innerHTML = `
      <nav class="crumbs" aria-label="Fil d'Ariane"><a href="index.html">Accueil</a><span aria-hidden="true">/</span><a href="boutique.html?cat=${p.cat}">${catLabel(p.cat)}</a><span aria-hidden="true">/</span><span>${esc(p.name)}</span></nav>
      <div class="product">
        <div class="gallery">
          <div class="gallery__stage" id="stage">
            <div class="gallery__tags"><span class="badge badge--${p.etat}">${e.label}</span>${p.badge ? `<span class="badge badge--hot">${esc(p.badge)}</span>` : ""}</div>
            <img src="${p.img}" alt="${esc(p.name)}" class="${p.wide ? "is-wide" : ""}">
          </div>
          <p class="gallery__note">${icon("zoom")} Photo officielle du modèle. Photos réelles de l'appareil envoyées sur WhatsApp à la demande.</p>
        </div>
        <div class="pinfo">
          <div class="pinfo__brand">${esc(p.brand)} · ${catLabel(p.cat)}</div>
          <h1>${esc(p.name)}</h1>
          <div class="pinfo__etat">${icon("shield")}<p><strong>${e.label} · ${e.warranty}</strong>${e.desc}</p></div>
          <div class="pinfo__label">${p.cat === "mac" ? "Configuration" : p.cat === "accessoires" ? "Option" : "Stockage"} <span>${p.variants.length} choix</span></div>
          <div class="variants" id="variants">${p.variants.map((x, i) => `<button type="button" class="variant${i ? "" : " is-active"}" data-v="${i}"><strong>${esc(x[0])}</strong><small>${fcfa(x[1])}</small></button>`).join("")}</div>
          <div class="pinfo__price"><strong id="price"></strong><span>Prix TTC, payable à la livraison</span></div>
          <div class="pinfo__stock">En stock à Cotonou · prêt en 1 h</div>
          <div class="buy">
            <div class="qty"><button type="button" id="qMinus" aria-label="Diminuer">−</button><output id="qOut">1</output><button type="button" id="qPlus" aria-label="Augmenter">+</button></div>
            <button type="button" class="btn btn--primary btn--lg" id="addBtn">${icon("bag")} Ajouter au panier</button>
            <a class="btn btn--wa btn--lg" id="waBtn" target="_blank" rel="noopener">${icon("wa")} Commander directement sur WhatsApp</a>
            ${p.cat !== "accessoires" ? `<a class="btn btn--ghost" href="echange.html?want=${p.id}">${icon("swap")} Payer moins en échangeant mon ancien appareil</a>` : ""}
          </div>
          <ul class="assure">
            <li>${icon("test")} Testé devant toi avant paiement</li>
            <li>${icon("lock")} ${p.cat === "samsung" ? "Libre de compte Google/Samsung" : "Libre d'iCloud, tout opérateur"}</li>
            <li>${icon("truck")} Livraison le jour même</li>
            <li>${icon("wallet")} Espèces ou Mobile Money</li>
          </ul>
          <div class="tabs">
            <div class="tabs__nav" role="tablist">
              <button type="button" class="is-active" data-tab="0" role="tab">Caractéristiques</button>
              <button type="button" data-tab="1" role="tab">Garantie</button>
              <button type="button" data-tab="2" role="tab">Livraison & paiement</button>
            </div>
            <div class="tabs__panel" data-panel="0"><table class="spec-table">${Object.entries(specs).map(([k, x]) => `<tr><th>${esc(k)}</th><td>${esc(x)}</td></tr>`).join("")}</table></div>
            <div class="tabs__panel" data-panel="1" hidden><p><strong>${e.warranty}</strong> sur cet appareil, couvrant les pannes matérielles hors casse, oxydation et ouverture par un tiers.</p><p>En cas de souci, ramène l'appareil en boutique avec ton reçu : on le répare, on l'échange ou on te rembourse selon le cas.</p></div>
            <div class="tabs__panel" data-panel="2" hidden><p>${SHOP.delivery.map(d => `<strong>${d.label}</strong> : ${d.price ? fcfa(d.price) : "gratuit"} (${d.info})`).join("<br>")}</p><p>Paiement en espèces, MTN MoMo, Moov Money ou Celtiis Cash, à la livraison ou en boutique.</p></div>
          </div>
        </div>
      </div>`;
      const price = $("#price"), wa = $("#waBtn");
      const update = () => {
        price.textContent = fcfa(p.variants[v][1] * qty);
        $("#qOut").textContent = qty;
        $$(".variant").forEach(b => b.classList.toggle("is-active", +b.dataset.v === v));
        wa.href = waUrl(`Bonjour Pyrex Apple 👋\nJe souhaite commander :\n• ${p.name} (${p.variants[v][0]})\n• État : ${e.label}\n• Quantité : ${qty}\n• Prix affiché : ${fcfa(p.variants[v][1] * qty)}\n\nEst-il disponible ?\n${location.href}`);
      };
      $("#variants").addEventListener("click", ev => { const b = ev.target.closest(".variant"); if (b) { v = +b.dataset.v; update(); } });
      $("#qMinus").onclick = () => { qty = Math.max(1, qty - 1); update(); };
      $("#qPlus").onclick = () => { qty = Math.min(9, qty + 1); update(); };
      $("#addBtn").onclick = () => addToCart(p.id, v, qty);
      $$(".tabs__nav button").forEach(b => b.onclick = () => {
        $$(".tabs__nav button").forEach(x => x.classList.toggle("is-active", x === b));
        $$(".tabs__panel").forEach(x => x.hidden = x.dataset.panel !== b.dataset.tab);
      });
      const stage = $("#stage"), img = $("img", stage);
      stage.addEventListener("mousemove", ev => {
        const r = stage.getBoundingClientRect();
        img.style.transformOrigin = `${(ev.clientX - r.left) / r.width * 100}% ${(ev.clientY - r.top) / r.height * 100}%`;
      });
      stage.addEventListener("click", () => stage.classList.toggle("is-zoom"));
      stage.addEventListener("mouseleave", () => stage.classList.remove("is-zoom"));
      update();
      const similar = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id)
        .sort((a, b) => Math.abs(minPrice(a) - minPrice(p)) - Math.abs(minPrice(b) - minPrice(p))).slice(0, 4);
      $("#similar").innerHTML = similar.map(card).join("");
      $("#similarLink").href = `boutique.html?cat=${p.cat}`;
    }
  }

  /* ---------- Panier ---------- */
  function renderCartPage() {
    const items = Cart.items();
    $("#cartFull").hidden = !items.length; $("#cartEmpty").hidden = !!items.length;
    if (!items.length) return;
    $("#cartLines").innerHTML = items.map(lineHTML).join("");
    const d = SHOP.delivery.find(x => x.id === ($("input[name=delivery]:checked") || {}).value) || SHOP.delivery[0];
    const sub = Cart.subtotal();
    $("#sumSub").textContent = fcfa(sub);
    $("#sumShip").textContent = d.price ? fcfa(d.price) : "Gratuit";
    $("#sumTotal").textContent = fcfa(sub + d.price);
    $("#sumCount").textContent = Cart.count();
  }
  if (PAGE === "cart") {
    $("#deliveryOpts").innerHTML = SHOP.delivery.map((d, i) => `<label class="radio-card"><input type="radio" name="delivery" value="${d.id}" ${i ? "" : "checked"}><div><strong>${d.label}</strong><small>${d.info}</small></div><em>${d.price ? fcfa(d.price) : "Gratuit"}</em></label>`).join("");
    $("#deliveryOpts").addEventListener("change", () => {
      renderCartPage();
      $("#addrField").hidden = ($("input[name=delivery]:checked").value === "retrait");
    });
    $("#addrField").hidden = true;
    $("#cartFull").addEventListener("submit", ev => {
      ev.preventDefault();
      const name = $("#cName"), addr = $("#cAddr");
      const needAddr = !$("#addrField").hidden;
      let ok = true;
      [name, needAddr ? addr : null].forEach(f => { if (!f) return; const bad = !f.value.trim(); f.classList.toggle("is-error", bad); if (bad) ok = false; });
      if (!ok) { (name.value.trim() ? addr : name).focus(); return; }
      const d = SHOP.delivery.find(x => x.id === $("input[name=delivery]:checked").value);
      const pay = $("#cPay").value;
      const lines = Cart.items().map(i => { const p = byId(i.id), v = p.variants[i.v]; return `• ${i.qty} × ${p.name} (${v[0]}, ${ETATS[p.etat].short}) : ${fcfa(v[1] * i.qty)}`; });
      const msg = [
        "Bonjour Pyrex Apple 👋 Voici ma commande :", "", ...lines, "",
        `Sous-total : ${fcfa(Cart.subtotal())}`,
        `${d.label} : ${d.price ? fcfa(d.price) : "gratuit"}`,
        `TOTAL : ${fcfa(Cart.subtotal() + d.price)}`, "",
        `👤 ${name.value.trim()}`,
        needAddr ? `📍 ${addr.value.trim()}` : "📍 Je viens récupérer en boutique",
        `💳 Paiement : ${pay}`,
        $("#cNote").value.trim() ? `📝 ${$("#cNote").value.trim()}` : "",
        "", "Merci de me confirmer la disponibilité."
      ].filter((l, i, a) => l !== "" || a[i - 1] !== "");
      window.open(waUrl(msg.join("\n")), "_blank", "noopener");
      toast(`${icon("check")} <span>Commande préparée sur WhatsApp. Envoie le message pour la confirmer.</span>`, { label: "Vider le panier", fn: () => Cart.clear() });
    });
  }

  /* ---------- Échange ---------- */
  if (PAGE === "trade") {
    const STORAGE = {
      "iPhone": [["64 Go", .85], ["128 Go", 1], ["256 Go", 1.12], ["512 Go", 1.22], ["1 To", 1.3]],
      "Samsung": [["128 Go", 1], ["256 Go", 1.1], ["512 Go", 1.2], ["1 To", 1.28]],
      "MacBook": [["8 Go RAM · 256 Go", .92], ["16 Go RAM · 256/512 Go", 1], ["16 Go+ RAM · 1 To", 1.15], ["Config. haut de gamme", 1.3]]
    };
    let fam = "iPhone";
    const model = $("#tModel"), storage = $("#tStorage"), want = $("#tWant"), batt = $("#tBatt"), form = $("#tradeForm");
    function fillFamily() {
      model.innerHTML = `<option value="" disabled selected>Choisir ton modèle</option>` + Object.keys(TRADE_IN[fam]).map(m => `<option>${esc(m)}</option>`).join("");
      storage.innerHTML = STORAGE[fam].map(([l, m], i) => `<option value="${m}" ${(fam === "MacBook" ? i === 1 : m === 1) ? "selected" : ""}>${l}</option>`).join("");
      $("#tStorageLabel").textContent = fam === "MacBook" ? "Configuration" : "Stockage";
      $("#tFaceLabel").textContent = fam === "iPhone" ? "Face ID / Touch ID ne fonctionne pas" : fam === "Samsung" ? "Empreinte ou reconnaissance faciale HS" : "Clavier, trackpad ou ports défectueux";
      $("#tAccLabel").textContent = fam === "MacBook" ? "J'ai le chargeur d'origine" : "J'ai la boîte d'origine";
      $("#tAccountTip").textContent = fam === "Samsung" ? "Déconnecte ton compte Google et Samsung" : "Désactive « Localiser » et déconnecte iCloud";
      estimate();
    }
    $$("#famTabs button").forEach(b => b.addEventListener("click", () => {
      fam = b.dataset.fam; $$("#famTabs button").forEach(x => x.classList.toggle("is-active", x === b)); fillFamily();
    }));
    want.innerHTML = `<option value="">Je veux seulement vendre mon appareil</option>` +
      CATEGORIES.filter(c => c.id !== "accessoires").map(c => `<optgroup label="${c.label}">${PRODUCTS.filter(p => p.cat === c.id).map(p => `<option value="${p.id}">${esc(p.name)} (dès ${fcfa(minPrice(p))})</option>`).join("")}</optgroup>`).join("");
    if (params.get("want") && byId(params.get("want"))) want.value = params.get("want");

    function value() {
      const base = TRADE_IN[fam][model.value]; if (!base) return null;
      const b = +batt.value;
      let v = base * +storage.value * +$("input[name=cond]:checked").value * (b >= 90 ? 1.03 : b >= 85 ? 1 : b >= 80 ? .92 : .8);
      if ($("#tScreen").checked) v *= .78;
      if ($("#tFace").checked) v *= .72;
      if ($("#tAcc").checked) v *= 1.03;
      return Math.round(v / 5000) * 5000;
    }
    function estimate() {
      $("#tBattOut").textContent = batt.value + " %";
      const v = value(), box = $("#est");
      const w = byId(want.value);
      $("#estWantName").textContent = w ? w.name : "—";
      if (v == null) { $("#estVal").textContent = "—"; $("#estDiff").textContent = "—"; return; }
      const lo = Math.round(v * .9 / 5000) * 5000;
      $("#estVal").textContent = `${fcfa(lo)} – ${fcfa(v)}`;
      $("#estDiff").textContent = w ? fcfa(Math.max(0, minPrice(w) - v)) : "—";
      box.classList.remove("is-bump"); void box.offsetWidth; box.classList.add("is-bump");
    }
    form.addEventListener("input", estimate); form.addEventListener("change", estimate);
    form.addEventListener("submit", ev => {
      ev.preventDefault();
      if (!model.value) { model.focus(); model.classList.add("is-error"); return; }
      model.classList.remove("is-error");
      const v = value(), w = byId(want.value);
      const msg = [
        "Bonjour Pyrex Apple 👋 Je souhaite faire un échange.", "",
        `📱 Mon appareil : ${model.value} (${storage.selectedOptions[0].text})`,
        `• Batterie : ${batt.value} %`,
        `• État : ${$("input[name=cond]:checked").dataset.label}`,
        `• Écran changé ou cassé : ${$("#tScreen").checked ? "oui" : "non"}`,
        `• ${$("#tFaceLabel").textContent} : ${$("#tFace").checked ? "oui" : "non"}`,
        `• ${$("#tAccLabel").textContent.replace("J'ai ", "")} : ${$("#tAcc").checked ? "oui" : "non"}`, "",
        w ? `🎯 Je veux : ${w.name}` : "🎯 Je veux seulement vendre mon appareil",
        `💰 Estimation du site : ${fcfa(Math.round(v * .9 / 5000) * 5000)} – ${fcfa(v)}`, "",
        "Quand puis-je passer en boutique pour le contrôle ?"
      ];
      window.open(waUrl(msg.join("\n")), "_blank", "noopener");
    });
    fillFamily();
  }

  /* ---------- Contact ---------- */
  if (PAGE === "contact" || PAGE === "home") {
    const st = storeStatus();
    $$("[data-status]").forEach(el => { el.textContent = st.text; el.classList.toggle("is-closed", !st.open); });
    $$("[data-hours]").forEach(el => el.innerHTML = SHOP.hours.map(h => `<tr><td>${h[0]}</td><td>${h[1]}</td></tr>`).join(""));
    $$("[data-map]").forEach(f => f.src = `https://maps.google.com/maps?q=${SHOP.lat},${SHOP.lng}&z=16&output=embed`);
    $$("[data-maps-link]").forEach(a => { a.href = SHOP.mapsUrl; a.target = "_blank"; a.rel = "noopener"; });
    $$("[data-phone]").forEach(a => { a.href = "tel:" + SHOP.phoneTel; a.textContent = SHOP.phoneDisplay; });
    $$("[data-address]").forEach(el => el.textContent = `${SHOP.plusCode}, ${SHOP.address}`);
  }

  /* ---------------- Apparition au scroll ---------------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(en => en.forEach(x => {
    if (x.isIntersecting) { x.target.classList.add("is-in"); io.unobserve(x.target); }
  }), { threshold: .1 }) : null;
  $$("[data-reveal] > *, .reveal").forEach((el, i) => {
    if (!io) return;
    el.classList.add("reveal"); el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el);
  });

  renderCartUI();
})();

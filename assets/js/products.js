/* =============================================================
   PYREX APPLE — Catalogue & informations boutique
   -------------------------------------------------------------
   C'est le SEUL fichier à modifier pour gérer la boutique :
   prix, stock, nouveaux produits, numéro WhatsApp, horaires.
   Tous les prix sont en FCFA.
   Les photos sont dans assets/img/products/ (format WebP).
   ============================================================= */

const SHOP = {
  name: "Pyrex Apple",
  whatsapp: "2290107349532",            // format international, sans + ni espaces
  phoneDisplay: "+229 01 07 34 95 32",
  phoneTel: "+2290107349532",
  district: "Zongo, Cotonou",
  plusCode: "9C65+WC2",
  directions: [
    "1re rue à droite après l'agence de transport STM de Zongo",
    "Dans la petite et dernière ruelle avant la rue goudronnée (feux tricolores) de STM, en venant d'Étoile Rouge"
  ],
  hours: [
    ["Lundi – Samedi", "9h00 – 22h00"],
    ["Dimanche", "Fermé"]
  ],
  open: { days: [1, 2, 3, 4, 5, 6], from: 9, to: 22 },   // 0 = dimanche
  mapsUrl: "https://maps.google.com/?cid=8791860203304189559",
  lat: 6.3622644,
  lng: 2.408512,
  social: { facebook: "", instagram: "", tiktok: "" },   // coller les liens ici
  delivery: [
    { id: "retrait", label: "Retrait en boutique", price: 0, info: "Gratuit · prêt en 1 h" },
    { id: "cotonou", label: "Livraison Cotonou", price: 1500, info: "Le jour même" },
    { id: "calavi", label: "Abomey-Calavi / Godomey", price: 2000, info: "Le jour même" },
    { id: "benin", label: "Autres villes du Bénin", price: 3500, info: "24 à 48 h" }
  ]
};

const CATEGORIES = [
  { id: "iphone", label: "iPhone", desc: "Du 11 au 18 Pro Max" },
  { id: "mac", label: "MacBook", desc: "Neo, Air et Pro" },
  { id: "samsung", label: "Samsung Galaxy", desc: "Séries S, Z et A" },
  { id: "accessoires", label: "Accessoires", desc: "Audio, montres, charge" }
];

const ETATS = {
  neuf: { label: "Neuf scellé", short: "Neuf", warranty: "Garantie 12 mois", months: 12,
          desc: "Boîte scellée, jamais activé. Facture fournie." },
  premium: { label: "Occasion premium", short: "Premium", warranty: "Garantie 6 mois", months: 6,
          desc: "Importé, état quasi neuf, aucune rayure visible, pièces d'origine." },
  reco: { label: "Reconditionné", short: "Reconditionné", warranty: "Garantie 3 mois", months: 3,
          desc: "Contrôlé en 30 points et remis en état par nos techniciens." }
};

const IMG = "assets/img/products/";

/* ---------- Produits ----------
   variants : options (stockage ou configuration) avec leur prix
   specs    : caractéristiques affichées sur la fiche produit
   badge    : bandeau optionnel (Nouveau, Best-seller, Bon plan, Petit prix)
   type     : sous-famille pour les accessoires                         */
const PRODUCTS = [
  /* ================= iPHONE ================= */
  { id: "iphone-18-pro-max", cat: "iphone", brand: "Apple", name: "iPhone 18 Pro Max", year: 2026, etat: "neuf", badge: "Nouveau",
    img: IMG + "iphone-18-pro-max.webp", variants: [["256 Go", 1290000], ["512 Go", 1450000], ["1 To", 1620000]],
    specs: { "Puce": "A20 Pro", "Écran": "6,9\" Super Retina XDR, ProMotion", "Réseau": "5G, double SIM (eSIM)", "Sécurité": "Face ID" } },
  { id: "iphone-18-pro", cat: "iphone", brand: "Apple", name: "iPhone 18 Pro", year: 2026, etat: "neuf", badge: "Nouveau",
    img: IMG + "iphone-18-pro.webp", variants: [["256 Go", 1150000], ["512 Go", 1310000]],
    specs: { "Puce": "A20 Pro", "Écran": "6,3\" Super Retina XDR, ProMotion", "Réseau": "5G, double SIM (eSIM)", "Sécurité": "Face ID" } },
  { id: "iphone-17-pro-max", cat: "iphone", brand: "Apple", name: "iPhone 17 Pro Max", year: 2025, etat: "premium", badge: "Best-seller", battery: 98,
    img: IMG + "iphone-17-pro-max.webp", variants: [["256 Go", 980000], ["512 Go", 1120000]],
    specs: { "Puce": "A19 Pro", "Écran": "6,9\" Super Retina XDR, ProMotion", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-17-pro", cat: "iphone", brand: "Apple", name: "iPhone 17 Pro", year: 2025, etat: "premium", battery: 98,
    img: IMG + "iphone-17-pro.webp", variants: [["256 Go", 860000], ["512 Go", 990000]],
    specs: { "Puce": "A19 Pro", "Écran": "6,3\" Super Retina XDR, ProMotion", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-air", cat: "iphone", brand: "Apple", name: "iPhone Air", year: 2025, etat: "premium", battery: 97,
    img: IMG + "iphone-air.webp", variants: [["256 Go", 690000], ["512 Go", 790000]],
    specs: { "Puce": "A19 Pro", "Écran": "6,5\" Super Retina XDR, ProMotion", "Réseau": "5G, eSIM", "Sécurité": "Face ID" } },
  { id: "iphone-17", cat: "iphone", brand: "Apple", name: "iPhone 17", year: 2025, etat: "neuf",
    img: IMG + "iphone-17.webp", variants: [["256 Go", 720000], ["512 Go", 850000]],
    specs: { "Puce": "A19", "Écran": "6,3\" Super Retina XDR, ProMotion", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-17e", cat: "iphone", brand: "Apple", name: "iPhone 17e", year: 2026, etat: "neuf",
    img: IMG + "iphone-17e.webp", variants: [["128 Go", 520000], ["256 Go", 590000]],
    specs: { "Puce": "A19", "Écran": "6,1\" Super Retina XDR", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-16-pro-max", cat: "iphone", brand: "Apple", name: "iPhone 16 Pro Max", year: 2024, etat: "premium", badge: "Best-seller", battery: 92,
    img: IMG + "iphone-16-pro.webp", variants: [["256 Go", 740000], ["512 Go", 820000]],
    specs: { "Puce": "A18 Pro", "Écran": "6,9\" Super Retina XDR, ProMotion", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-16-pro", cat: "iphone", brand: "Apple", name: "iPhone 16 Pro", year: 2024, etat: "premium", battery: 93,
    img: IMG + "iphone-16-pro.webp", variants: [["128 Go", 600000], ["256 Go", 660000]],
    specs: { "Puce": "A18 Pro", "Écran": "6,3\" Super Retina XDR, ProMotion", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-16", cat: "iphone", brand: "Apple", name: "iPhone 16", year: 2024, etat: "premium", battery: 95,
    img: IMG + "iphone-16.webp", variants: [["128 Go", 450000], ["256 Go", 510000]],
    specs: { "Puce": "A18", "Écran": "6,1\" Super Retina XDR", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-16e", cat: "iphone", brand: "Apple", name: "iPhone 16e", year: 2025, etat: "premium", battery: 96,
    img: IMG + "iphone-16e.webp", variants: [["128 Go", 310000], ["256 Go", 350000]],
    specs: { "Puce": "A18", "Écran": "6,1\" Super Retina XDR", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-15-pro-max", cat: "iphone", brand: "Apple", name: "iPhone 15 Pro Max", year: 2023, etat: "premium", battery: 88,
    img: IMG + "iphone-15-pro.webp", variants: [["256 Go", 560000], ["512 Go", 620000]],
    specs: { "Puce": "A17 Pro", "Écran": "6,7\" Super Retina XDR, ProMotion", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-15-pro", cat: "iphone", brand: "Apple", name: "iPhone 15 Pro", year: 2023, etat: "reco", battery: 90,
    img: IMG + "iphone-15-pro.webp", variants: [["128 Go", 440000], ["256 Go", 490000]],
    specs: { "Puce": "A17 Pro", "Écran": "6,1\" Super Retina XDR, ProMotion", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-15", cat: "iphone", brand: "Apple", name: "iPhone 15", year: 2023, etat: "reco", battery: 90,
    img: IMG + "iphone-15.webp", variants: [["128 Go", 340000], ["256 Go", 380000]],
    specs: { "Puce": "A16 Bionic", "Écran": "6,1\" Super Retina XDR", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-14-pro-max", cat: "iphone", brand: "Apple", name: "iPhone 14 Pro Max", year: 2022, etat: "premium", battery: 86,
    img: IMG + "iphone-14-pro.webp", variants: [["128 Go", 400000], ["256 Go", 440000]],
    specs: { "Puce": "A16 Bionic", "Écran": "6,7\" Super Retina XDR, ProMotion", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-14", cat: "iphone", brand: "Apple", name: "iPhone 14", year: 2022, etat: "reco", battery: 87,
    img: IMG + "iphone-14.webp", variants: [["128 Go", 260000], ["256 Go", 295000]],
    specs: { "Puce": "A15 Bionic", "Écran": "6,1\" Super Retina XDR", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-13-pro-max", cat: "iphone", brand: "Apple", name: "iPhone 13 Pro Max", year: 2021, etat: "premium", badge: "Bon plan", battery: 85,
    img: IMG + "iphone-13-pro.webp", variants: [["128 Go", 320000], ["256 Go", 355000]],
    specs: { "Puce": "A15 Bionic", "Écran": "6,7\" Super Retina XDR, ProMotion", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-13", cat: "iphone", brand: "Apple", name: "iPhone 13", year: 2021, etat: "reco", battery: 86,
    img: IMG + "iphone-13.webp", variants: [["128 Go", 210000], ["256 Go", 240000]],
    specs: { "Puce": "A15 Bionic", "Écran": "6,1\" Super Retina XDR", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-12-pro-max", cat: "iphone", brand: "Apple", name: "iPhone 12 Pro Max", year: 2020, etat: "reco", battery: 85,
    img: IMG + "iphone-12-pro-max.webp", variants: [["128 Go", 230000], ["256 Go", 255000]],
    specs: { "Puce": "A14 Bionic", "Écran": "6,7\" Super Retina XDR", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-12", cat: "iphone", brand: "Apple", name: "iPhone 12", year: 2020, etat: "reco", badge: "Petit prix", battery: 85,
    img: IMG + "iphone-12.webp", variants: [["64 Go", 145000], ["128 Go", 165000]],
    specs: { "Puce": "A14 Bionic", "Écran": "6,1\" Super Retina XDR", "Réseau": "5G", "Sécurité": "Face ID" } },
  { id: "iphone-11", cat: "iphone", brand: "Apple", name: "iPhone 11", year: 2019, etat: "reco", badge: "Petit prix", battery: 84,
    img: IMG + "iphone-11.webp", variants: [["64 Go", 110000], ["128 Go", 125000]],
    specs: { "Puce": "A13 Bionic", "Écran": "6,1\" Liquid Retina", "Réseau": "4G", "Sécurité": "Face ID" } },

  /* ================= MACBOOK ================= */
  { id: "macbook-pro-16-m5-pro", cat: "mac", brand: "Apple", name: "MacBook Pro 16\" M5 Pro", year: 2026, etat: "neuf", badge: "Nouveau", wide: true,
    img: IMG + "mbp16-silver.webp", variants: [["24 Go · 1 To", 2150000], ["48 Go · 1 To", 2490000]],
    specs: { "Puce": "Apple M5 Pro", "Écran": "16\" Liquid Retina XDR", "Usage": "Montage vidéo, 3D, développement", "Clavier": "AZERTY ou QWERTY selon arrivage" } },
  { id: "macbook-pro-14-m5", cat: "mac", brand: "Apple", name: "MacBook Pro 14\" M5", year: 2025, etat: "neuf", wide: true,
    img: IMG + "mbp14-spaceblack.webp", variants: [["16 Go · 512 Go", 1420000], ["24 Go · 1 To", 1690000]],
    specs: { "Puce": "Apple M5", "Écran": "14\" Liquid Retina XDR", "Usage": "Création, pro, multitâche", "Clavier": "AZERTY ou QWERTY selon arrivage" } },
  { id: "macbook-air-15-m5", cat: "mac", brand: "Apple", name: "MacBook Air 15\" M5", year: 2026, etat: "neuf", badge: "Nouveau", wide: true,
    img: IMG + "mba15-midnight.webp", variants: [["16 Go · 512 Go", 1090000], ["24 Go · 1 To", 1290000]],
    specs: { "Puce": "Apple M5", "Écran": "15\" Liquid Retina", "Usage": "Bureautique, études, création légère", "Clavier": "AZERTY ou QWERTY selon arrivage" } },
  { id: "macbook-air-13-m5", cat: "mac", brand: "Apple", name: "MacBook Air 13\" M5", year: 2026, etat: "neuf", badge: "Best-seller", wide: true,
    img: IMG + "mba13-silver.webp", variants: [["16 Go · 256 Go", 880000], ["16 Go · 512 Go", 990000]],
    specs: { "Puce": "Apple M5", "Écran": "13,6\" Liquid Retina", "Usage": "Bureautique, études, création légère", "Clavier": "AZERTY ou QWERTY selon arrivage" } },
  { id: "macbook-neo", cat: "mac", brand: "Apple", name: "MacBook Neo", year: 2026, etat: "neuf", wide: true,
    img: IMG + "macbook-neo.webp", variants: [["256 Go", 640000], ["512 Go", 740000]],
    specs: { "Puce": "A18 Pro", "Usage": "Études, bureautique, Internet", "Atout": "Le Mac le plus accessible", "Clavier": "AZERTY ou QWERTY selon arrivage" } },
  { id: "macbook-pro-14-m4-pro", cat: "mac", brand: "Apple", name: "MacBook Pro 14\" M4 Pro", year: 2024, etat: "premium", wide: true, battery: 96,
    img: IMG + "mbp14-silver.webp", variants: [["24 Go · 512 Go", 1390000], ["24 Go · 1 To", 1520000]],
    specs: { "Puce": "Apple M4 Pro", "Écran": "14\" Liquid Retina XDR", "Usage": "Montage vidéo, développement", "Cycles batterie": "Moins de 80" } },
  { id: "macbook-pro-16-m4-pro", cat: "mac", brand: "Apple", name: "MacBook Pro 16\" M4 Pro", year: 2024, etat: "premium", wide: true, battery: 95,
    img: IMG + "mbp16-spaceblack.webp", variants: [["24 Go · 512 Go", 1590000], ["48 Go · 1 To", 1890000]],
    specs: { "Puce": "Apple M4 Pro", "Écran": "16\" Liquid Retina XDR", "Usage": "Montage vidéo, 3D", "Cycles batterie": "Moins de 90" } },
  { id: "macbook-air-13-m4", cat: "mac", brand: "Apple", name: "MacBook Air 13\" M4", year: 2025, etat: "premium", wide: true, battery: 97,
    img: IMG + "mba13-midnight.webp", variants: [["16 Go · 256 Go", 720000], ["16 Go · 512 Go", 810000]],
    specs: { "Puce": "Apple M4", "Écran": "13,6\" Liquid Retina", "Usage": "Bureautique, études", "Cycles batterie": "Moins de 60" } },
  { id: "macbook-air-15-m3", cat: "mac", brand: "Apple", name: "MacBook Air 15\" M3", year: 2024, etat: "premium", wide: true, battery: 92,
    img: IMG + "mba15-starlight.webp", variants: [["8 Go · 256 Go", 690000], ["16 Go · 512 Go", 790000]],
    specs: { "Puce": "Apple M3", "Écran": "15,3\" Liquid Retina", "Usage": "Bureautique, études", "Cycles batterie": "Moins de 150" } },
  { id: "macbook-pro-14-m3", cat: "mac", brand: "Apple", name: "MacBook Pro 14\" M3", year: 2023, etat: "reco", wide: true, battery: 90,
    img: IMG + "mbp14-spacegray.webp", variants: [["8 Go · 512 Go", 890000], ["16 Go · 1 To", 1050000]],
    specs: { "Puce": "Apple M3", "Écran": "14\" Liquid Retina XDR", "Usage": "Création, développement", "Cycles batterie": "Moins de 200" } },
  { id: "macbook-air-13-m2", cat: "mac", brand: "Apple", name: "MacBook Air 13\" M2", year: 2022, etat: "reco", badge: "Bon plan", wide: true, battery: 89,
    img: IMG + "mba13-silver.webp", variants: [["8 Go · 256 Go", 490000], ["16 Go · 512 Go", 590000]],
    specs: { "Puce": "Apple M2", "Écran": "13,6\" Liquid Retina", "Usage": "Bureautique, études", "Cycles batterie": "Moins de 250" } },
  { id: "macbook-air-m1", cat: "mac", brand: "Apple", name: "MacBook Air M1 (2020)", year: 2020, etat: "reco", badge: "Petit prix", wide: true, battery: 87,
    img: IMG + "mba-gold-2020.webp", variants: [["8 Go · 256 Go", 360000], ["16 Go · 512 Go", 440000]],
    specs: { "Puce": "Apple M1", "Écran": "13,3\" Retina", "Usage": "Études, bureautique, Internet", "Cycles batterie": "Moins de 300" } },

  /* ================= SAMSUNG ================= */
  { id: "galaxy-s26-ultra", cat: "samsung", brand: "Samsung", name: "Galaxy S26 Ultra", year: 2026, etat: "neuf", badge: "Nouveau",
    img: IMG + "galaxy-s26-ultra.webp", variants: [["256 Go", 1090000], ["512 Go", 1240000]],
    specs: { "Écran": "Dynamic AMOLED 2X", "Atout": "S Pen intégré, Galaxy AI", "Réseau": "5G, double SIM", "Sécurité": "Empreinte ultrasonique" } },
  { id: "galaxy-s26-plus", cat: "samsung", brand: "Samsung", name: "Galaxy S26+", year: 2026, etat: "neuf",
    img: IMG + "galaxy-s26-plus.webp", variants: [["256 Go", 850000], ["512 Go", 960000]],
    specs: { "Écran": "Dynamic AMOLED 2X", "Atout": "Galaxy AI", "Réseau": "5G, double SIM", "Sécurité": "Empreinte ultrasonique" } },
  { id: "galaxy-s26", cat: "samsung", brand: "Samsung", name: "Galaxy S26", year: 2026, etat: "neuf",
    img: IMG + "galaxy-s26.webp", variants: [["256 Go", 670000], ["512 Go", 760000]],
    specs: { "Écran": "Dynamic AMOLED 2X", "Atout": "Compact, Galaxy AI", "Réseau": "5G, double SIM", "Sécurité": "Empreinte ultrasonique" } },
  { id: "galaxy-s26-fe", cat: "samsung", brand: "Samsung", name: "Galaxy S26 FE", year: 2026, etat: "neuf",
    img: IMG + "galaxy-s26-fe.webp", variants: [["128 Go", 440000], ["256 Go", 490000]],
    specs: { "Écran": "Dynamic AMOLED 2X", "Atout": "Le haut de gamme accessible", "Réseau": "5G, double SIM", "Sécurité": "Empreinte sous l'écran" } },
  { id: "galaxy-z-fold8-ultra", cat: "samsung", brand: "Samsung", name: "Galaxy Z Fold8 Ultra", year: 2026, etat: "neuf", badge: "Nouveau",
    img: IMG + "galaxy-z-fold8-ultra.webp", variants: [["512 Go", 1690000], ["1 To", 1890000]],
    specs: { "Format": "Pliable grand écran", "Atout": "Galaxy AI, multitâche", "Réseau": "5G", "Sécurité": "Empreinte latérale" } },
  { id: "galaxy-z-fold8", cat: "samsung", brand: "Samsung", name: "Galaxy Z Fold8", year: 2026, etat: "neuf",
    img: IMG + "galaxy-z-fold8.webp", variants: [["256 Go", 1320000], ["512 Go", 1450000]],
    specs: { "Format": "Pliable grand écran", "Atout": "Galaxy AI, multitâche", "Réseau": "5G", "Sécurité": "Empreinte latérale" } },
  { id: "galaxy-z-flip8", cat: "samsung", brand: "Samsung", name: "Galaxy Z Flip8", year: 2026, etat: "neuf",
    img: IMG + "galaxy-z-flip8.webp", variants: [["256 Go", 760000], ["512 Go", 850000]],
    specs: { "Format": "Pliable à clapet", "Atout": "Écran externe, Galaxy AI", "Réseau": "5G", "Sécurité": "Empreinte latérale" } },
  { id: "galaxy-a57", cat: "samsung", brand: "Samsung", name: "Galaxy A57 5G", year: 2026, etat: "neuf", badge: "Best-seller",
    img: IMG + "galaxy-a57.webp", variants: [["128 Go", 320000], ["256 Go", 360000]],
    specs: { "Écran": "Super AMOLED", "Atout": "Excellent rapport qualité-prix", "Réseau": "5G, double SIM", "Sécurité": "Empreinte sous l'écran" } },
  { id: "galaxy-a37", cat: "samsung", brand: "Samsung", name: "Galaxy A37 5G", year: 2026, etat: "neuf",
    img: IMG + "galaxy-a37.webp", variants: [["128 Go", 245000], ["256 Go", 280000]],
    specs: { "Écran": "Super AMOLED", "Atout": "Grande autonomie", "Réseau": "5G, double SIM", "Sécurité": "Empreinte sous l'écran" } },
  { id: "galaxy-a27", cat: "samsung", brand: "Samsung", name: "Galaxy A27 5G", year: 2026, etat: "neuf",
    img: IMG + "galaxy-a27.webp", variants: [["128 Go", 185000]],
    specs: { "Écran": "Super AMOLED", "Atout": "Grande autonomie", "Réseau": "5G, double SIM", "Sécurité": "Empreinte" } },
  { id: "galaxy-a17", cat: "samsung", brand: "Samsung", name: "Galaxy A17 5G", year: 2025, etat: "neuf", badge: "Petit prix",
    img: IMG + "galaxy-a17.webp", variants: [["128 Go", 135000]],
    specs: { "Écran": "Super AMOLED", "Atout": "La 5G à petit prix", "Réseau": "5G, double SIM", "Sécurité": "Empreinte" } },
  { id: "galaxy-a18", cat: "samsung", brand: "Samsung", name: "Galaxy A18", year: 2026, etat: "neuf", badge: "Petit prix",
    img: IMG + "galaxy-a18.webp", variants: [["128 Go", 110000]],
    specs: { "Écran": "Grand écran", "Atout": "Essentiel et robuste", "Réseau": "4G, double SIM", "Sécurité": "Empreinte" } },

  /* ================= ACCESSOIRES ================= */
  { id: "airpods-pro-3", cat: "accessoires", type: "audio", brand: "Apple", name: "AirPods Pro 3", year: 2025, etat: "neuf", badge: "Best-seller",
    img: IMG + "airpods-pro-3.webp", variants: [["Boîtier USB-C", 185000]],
    specs: { "Type": "Écouteurs intra-auriculaires", "Atout": "Réduction active du bruit", "Compatibilité": "iPhone, iPad, Mac" } },
  { id: "airpods-pro-2", cat: "accessoires", type: "audio", brand: "Apple", name: "AirPods Pro 2", year: 2023, etat: "premium",
    img: IMG + "airpods-pro-2.webp", variants: [["Boîtier USB-C", 125000]],
    specs: { "Type": "Écouteurs intra-auriculaires", "Atout": "Réduction active du bruit", "Compatibilité": "iPhone, iPad, Mac" } },
  { id: "airpods-4", cat: "accessoires", type: "audio", brand: "Apple", name: "AirPods 4", year: 2024, etat: "neuf",
    img: IMG + "airpods-4.webp", variants: [["Standard", 105000], ["Réduction de bruit", 135000]],
    specs: { "Type": "Écouteurs ouverts", "Atout": "Léger et confortable", "Compatibilité": "iPhone, iPad, Mac" } },
  { id: "airpods-max", cat: "accessoires", type: "audio", brand: "Apple", name: "AirPods Max", year: 2024, etat: "neuf",
    img: IMG + "airpods-max.webp", variants: [["USB-C", 420000]],
    specs: { "Type": "Casque circum-auriculaire", "Atout": "Audio haute fidélité", "Compatibilité": "iPhone, iPad, Mac" } },
  { id: "galaxy-buds4", cat: "accessoires", type: "audio", brand: "Samsung", name: "Galaxy Buds4", year: 2026, etat: "neuf", badge: "Nouveau",
    img: IMG + "galaxy-buds4.webp", variants: [["Standard", 110000]],
    specs: { "Type": "Écouteurs intra-auriculaires", "Atout": "Réduction de bruit, Galaxy AI", "Compatibilité": "Android, idéal Galaxy" } },
  { id: "galaxy-buds3-fe", cat: "accessoires", type: "audio", brand: "Samsung", name: "Galaxy Buds3 FE", year: 2025, etat: "neuf",
    img: IMG + "galaxy-buds3-fe.webp", variants: [["Standard", 60000]],
    specs: { "Type": "Écouteurs ouverts", "Atout": "Petit prix, grande autonomie", "Compatibilité": "Android, idéal Galaxy" } },
  { id: "apple-watch-series-12", cat: "accessoires", type: "montre", brand: "Apple", name: "Apple Watch Series 12", year: 2026, etat: "neuf", badge: "Nouveau",
    img: IMG + "watch-series-12.webp", variants: [["42 mm GPS", 360000], ["46 mm GPS", 390000]],
    specs: { "Type": "Montre connectée", "Atout": "Santé, sport, notifications", "Compatibilité": "iPhone uniquement" } },
  { id: "apple-watch-ultra-4", cat: "accessoires", type: "montre", brand: "Apple", name: "Apple Watch Ultra 4", year: 2026, etat: "neuf",
    img: IMG + "watch-ultra-4.webp", variants: [["49 mm GPS + Cellular", 760000]],
    specs: { "Type": "Montre connectée", "Atout": "Titane, très grande autonomie", "Compatibilité": "iPhone uniquement" } },
  { id: "galaxy-watch9", cat: "accessoires", type: "montre", brand: "Samsung", name: "Galaxy Watch9", year: 2026, etat: "neuf",
    img: IMG + "galaxy-watch9.webp", variants: [["40 mm", 220000], ["44 mm", 245000]],
    specs: { "Type": "Montre connectée", "Atout": "Suivi santé et sommeil", "Compatibilité": "Android, idéal Galaxy" } },
  { id: "galaxy-watch-ultra2", cat: "accessoires", type: "montre", brand: "Samsung", name: "Galaxy Watch Ultra 2", year: 2026, etat: "neuf",
    img: IMG + "galaxy-watch-ultra2.webp", variants: [["47 mm LTE", 420000]],
    specs: { "Type": "Montre connectée", "Atout": "Titane, autonomie longue durée", "Compatibilité": "Android, idéal Galaxy" } },
  { id: "chargeur-20w", cat: "accessoires", type: "charge", brand: "Apple", name: "Chargeur Apple USB-C 20 W", year: 2024, etat: "neuf",
    img: IMG + "acc-chargeur-20w.webp", variants: [["Original Apple", 22000]],
    specs: { "Type": "Adaptateur secteur, prise européenne", "Atout": "Charge rapide", "Compatibilité": "iPhone, iPad, AirPods" } },
  { id: "chargeur-magsafe", cat: "accessoires", type: "charge", brand: "Apple", name: "Chargeur MagSafe", year: 2024, etat: "neuf",
    img: IMG + "acc-magsafe.webp", variants: [["1 m", 45000]],
    specs: { "Type": "Chargeur sans fil magnétique", "Compatibilité": "iPhone 12 et plus récents, AirPods" } },
  { id: "cable-usbc", cat: "accessoires", type: "charge", brand: "Apple", name: "Câble USB-C tissé", year: 2024, etat: "neuf",
    img: IMG + "acc-cable-usbc.webp", variants: [["1 m", 15000]],
    specs: { "Type": "Câble de charge et données", "Atout": "Gaine tissée renforcée", "Compatibilité": "iPhone 15 et plus, Mac, Galaxy" } },
  { id: "cable-lightning", cat: "accessoires", type: "charge", brand: "Apple", name: "Câble USB-C vers Lightning", year: 2023, etat: "neuf",
    img: IMG + "acc-cable-lightning.webp", variants: [["1 m", 15000]],
    specs: { "Type": "Câble de charge et données", "Compatibilité": "iPhone 14 et antérieurs" } },
  { id: "coque-magsafe", cat: "accessoires", type: "protection", brand: "Apple", name: "Coque transparente MagSafe", year: 2025, etat: "neuf",
    img: IMG + "acc-coque-magsafe.webp", variants: [["Selon modèle d'iPhone", 45000]],
    specs: { "Type": "Coque de protection", "Atout": "Aimants MagSafe, anti-jaunissement", "Compatibilité": "Précisez votre modèle sur WhatsApp" } },
  { id: "airtag", cat: "accessoires", type: "suivi", brand: "Apple", name: "AirTag", year: 2024, etat: "neuf",
    img: IMG + "acc-airtag.webp", variants: [["1 AirTag", 30000], ["Lot de 4", 100000]],
    specs: { "Type": "Traceur Bluetooth", "Atout": "Retrouve clés, sac, moto", "Compatibilité": "iPhone" } }
];

/* ---------- Valeurs de reprise (échange) ----------
   Valeur de base en très bon état, capacité la plus basse, en FCFA. */
const TRADE_IN = {
  "iPhone": {
    "iPhone 18 Pro Max": 980000, "iPhone 18 Pro": 860000,
    "iPhone 17 Pro Max": 760000, "iPhone 17 Pro": 660000, "iPhone Air": 520000, "iPhone 17": 500000, "iPhone 17e": 360000,
    "iPhone 16 Pro Max": 540000, "iPhone 16 Pro": 440000, "iPhone 16 Plus": 360000, "iPhone 16": 330000, "iPhone 16e": 250000,
    "iPhone 15 Pro Max": 410000, "iPhone 15 Pro": 330000, "iPhone 15 Plus": 270000, "iPhone 15": 240000,
    "iPhone 14 Pro Max": 290000, "iPhone 14 Pro": 240000, "iPhone 14 Plus": 195000, "iPhone 14": 175000,
    "iPhone 13 Pro Max": 225000, "iPhone 13 Pro": 185000, "iPhone 13": 135000, "iPhone 13 mini": 105000,
    "iPhone 12 Pro Max": 155000, "iPhone 12 Pro": 125000, "iPhone 12": 90000, "iPhone 12 mini": 70000,
    "iPhone 11 Pro Max": 105000, "iPhone 11 Pro": 85000, "iPhone 11": 65000,
    "iPhone XS Max": 55000, "iPhone XR": 45000, "iPhone XS / X": 40000, "iPhone SE (2e/3e gén.)": 35000
  },
  "Samsung": {
    "Galaxy S26 Ultra": 780000, "Galaxy S26+": 600000, "Galaxy S26": 470000, "Galaxy S26 FE": 300000,
    "Galaxy S25 Ultra": 560000, "Galaxy S25+": 410000, "Galaxy S25": 330000, "Galaxy S25 FE": 230000,
    "Galaxy S24 Ultra": 400000, "Galaxy S24+": 290000, "Galaxy S24": 230000, "Galaxy S24 FE": 170000,
    "Galaxy S23 Ultra": 290000, "Galaxy S23": 160000, "Galaxy S22 Ultra": 190000, "Galaxy S22": 100000,
    "Galaxy Z Fold8 / Fold7": 900000, "Galaxy Z Fold6": 560000, "Galaxy Z Fold5": 380000,
    "Galaxy Z Flip8 / Flip7": 450000, "Galaxy Z Flip6": 300000, "Galaxy Z Flip5": 190000,
    "Galaxy A57 / A56": 200000, "Galaxy A37 / A36": 150000, "Galaxy A55": 140000, "Galaxy A35": 100000,
    "Galaxy A27 / A26 / A25": 95000, "Galaxy A17 / A16 / A15": 65000
  },
  "MacBook": {
    "MacBook Pro 16\" M5 Pro/Max": 1450000, "MacBook Pro 14\" M5": 950000,
    "MacBook Air 15\" M5": 720000, "MacBook Air 13\" M5": 600000, "MacBook Neo": 400000,
    "MacBook Pro 16\" M4 Pro/Max": 1150000, "MacBook Pro 14\" M4 Pro/Max": 900000, "MacBook Pro 14\" M4": 750000,
    "MacBook Air 15\" M4": 560000, "MacBook Air 13\" M4": 480000,
    "MacBook Pro 16\" M3 Pro/Max": 850000, "MacBook Pro 14\" M3": 560000,
    "MacBook Air 15\" M3": 460000, "MacBook Air 13\" M3": 400000,
    "MacBook Pro 14\"/16\" M2 Pro/Max": 620000, "MacBook Air 15\" M2": 370000, "MacBook Air 13\" M2": 310000,
    "MacBook Pro 14\"/16\" M1 Pro/Max": 480000, "MacBook Pro 13\" M1/M2": 250000, "MacBook Air M1": 220000,
    "MacBook Intel (2017 – 2020)": 90000
  }
};

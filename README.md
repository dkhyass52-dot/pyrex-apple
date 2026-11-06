# Pyrex Apple — boutique en ligne

Site statique (HTML / CSS / JS, aucun build).

Design : même grammaire visuelle qu'Aximɛ (une seule police, Archivo, élargie pour les titres ; un sombre de marque ; un accent vif pour les actions ; des neutres teintés ; le motif « wax »). Ici le sombre est le noir de l'enseigne, l'accent est l'or, et le motif wax reprend les orbites et l'étincelle du logo. Les icônes viennent de Phosphor (licence MIT), intégrées dans `app.js`.

## Déployer
1. Pousser le dossier sur GitHub (`dkhyass52-dot/pyrex-apple`).
2. Sur Vercel : *Add New › Project*, importer le dépôt, cliquer *Deploy* (aucun réglage).
3. Une fois le domaine connu, remplacer `assets/img/og-image.jpg` par l'URL complète dans la balise `og:image` des pages (Facebook et WhatsApp exigent une adresse absolue pour l'aperçu des liens).

## Pages
| Fichier | Rôle |
|---|---|
| `index.html` | Héros sombre avec recherche et ticket d'échange animé, engagements, rayons, achat par budget, arrivages, commande en 4 étapes, calcul de reprise, contrôle en 30 points, plus demandés, boutique physique, FAQ, appel WhatsApp |
| `boutique.html` | Catalogue : catégorie, budget, état, marque, type d'accessoire, recherche, tri. Paramètres d'URL : `cat`, `q`, `min`, `max`, `etat` |
| `produit.html?id=…` | Fiche produit : options, prix, panier, commande WhatsApp, demande de vidéo, mini-calcul de reprise, caractéristiques, barre d'achat mobile, données Google (JSON-LD) |
| `panier.html` | Panier, livraison, coordonnées : la commande complète part sur WhatsApp |
| `echange.html` | Estimation de reprise iPhone / Samsung / MacBook, envoyée sur WhatsApp |
| `contact.html` | Nous trouver : itinéraire (repères STM / Étoile Rouge), horaires en direct, carte, garanties, livraison, FAQ |
| `404.html` | Page introuvable |

Recherche instantanée sur toutes les pages : bouton loupe, touche `/` ou `Ctrl + K`, et directement dans le héros de l'accueil.

Le ticket d'échange de l'accueil est un exemple calculé avec les vraies valeurs du site (reprise d'un iPhone 13, prix de l'iPhone 17 Pro) : il se met à jour tout seul quand les prix changent dans `products.js`.

## Gérer la boutique
Tout se modifie dans **`assets/js/products.js`** :
- `SHOP` : numéro WhatsApp, horaires, itinéraire, frais de livraison, liens réseaux sociaux
- `PRODUCTS` : produits, prix en FCFA par option (`variants`), état, badge, caractéristiques, photo
- `TRADE_IN` : valeurs de reprise de base

Ajouter un produit : copier un bloc existant, changer `id`, `name`, `variants` et `img`.
Les photos vont dans `assets/img/products/` (WebP, fond transparent, environ 900 px).

## Logo
`assets/img/brand/` :
- `logo.svg` / `logo-sombre.svg` : logo complet (P + orbite dorée, PYREX, APPLE) pour fond clair / fond sombre
- `logo-horizontal.svg` / `logo-horizontal-sombre.svg` : version en ligne pour l'en-tête et le pied de page
- `logo-symbole.svg` : le P seul
- `logo-badge.svg` / `logo-badge-symbole.svg` : version ronde noir et or, dans l'esprit de l'enseigne
- `png/` : exports haute définition, dont `photo-profil-1080.png` pour WhatsApp, Facebook et Instagram

Photos produits : visuels officiels Apple et Samsung, détourés et optimisés.

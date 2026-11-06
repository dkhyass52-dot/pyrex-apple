# Pyrex Apple — boutique en ligne

Site statique (HTML / CSS / JS, sans build). Déploiement : glisser le dossier sur Vercel ou Netlify.

## Pages
| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : hero, rayons, nouveautés, échange, best-sellers, engagements, boutique physique |
| `boutique.html` | Catalogue filtrable (catégorie, marque, état, budget, recherche, tri). `?cat=iphone|mac|samsung|accessoires`, `?q=` |
| `produit.html?id=…` | Fiche produit : options, prix, ajout au panier, commande WhatsApp, caractéristiques, garantie |
| `panier.html` | Panier, livraison, coordonnées → commande envoyée sur WhatsApp |
| `echange.html` | Estimation de reprise iPhone / Samsung / MacBook → demande sur WhatsApp |
| `contact.html` | Adresse, horaires, carte, garanties, livraison, FAQ |

## Gérer la boutique
Tout se modifie dans **`assets/js/products.js`** :
- `SHOP` : numéro WhatsApp, horaires, adresse, frais de livraison
- `PRODUCTS` : produits, prix en FCFA par option (`variants`), état, badge, caractéristiques
- `TRADE_IN` : valeurs de reprise de base

Réseaux sociaux : renseigner les liens dans `SOCIAL` en haut de `assets/js/app.js` (les icônes vides sont masquées).

## Logo
`assets/img/` : `logo.svg` (vertical), `logo-horizontal.svg`, versions `-blanc` pour fond sombre, `logo-symbole.svg`, `favicon.svg`.
`assets/img/png/` : exports PNG haute définition (fond transparent) et planche de présentation.

Images produits : visuels officiels chargés depuis apple.com et samsung.com.

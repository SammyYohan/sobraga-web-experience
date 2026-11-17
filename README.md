# SOBRAGA — Expérience Web Moderne (Les Boissons du Gabon)

Refonte moderne, interactive et ultra-fluide de la plateforme web institutionnelle de la **Société des Boissons Rafraîchissantes du Gabon (SOBRAGA / Groupe Castel)**.

Ce projet réinvente l'expérience utilisateur du site officiel ([sobraga.com](https://sobraga.com/)) avec une direction artistique contemporaine inspirée de la fraîcheur des boissons, des performances 60/120 fps constantes et une accessibilité exemplaire.

---

## ✨ Points forts & Innovations

- **🎨 Direction Artistique & Effets Liquides :**
  - **Effervescence 3D :** Simulation sphérique de bulles gazeuses et perlées selon la catégorie de boisson (bière, soda, eau minérale, vin).
  - **Givre & Condensation :** Perles de buée sur les bouteilles et bannières avec animations optimisées par le compositeur GPU.
  - **Piédestaux aquatiques :** Ondulations et reflets liquides sous chaque produit au survol.
  - **Barre déroulante dynamique :** 27 marques et partenaires avec effervescence pétillante aux couleurs officielles au survol et mode grille complet.
- **🍾 Rendu Vectoriel SVG Haute Définition :**
  - Chaque produit (Régab, Djino, Castel Beer, 33 Export, Andza, Akewa, Jugab, Ferox...) dispose d'un packaging SVG vectoriel dédié, éliminant tout artefact de compression bitmap et garantissant une netteté parfaite sur écrans Retina/4K.
- **📄 Services Interactifs Intégrés :**
  - **Prix homologués :** Modal d'inspection officiel des tarifs 2026 avec export texte.
  - **Docuthèque & Publications :** Consultation des magazines *La Capsule*, *Ça Décapsule*, *ESBIDJINEWS* et des bilans RSE.
  - **Cave à vin Sovingab :** Catalogue virtuel avec fiches de dégustation, cépages et accords mets-vins.
  - **Assistance consommateur :** Widget interactif avec réponses automatiques et numéros directs d'Owendo et Libreville.
  - **Formulaires validés :** Réclamations, informations et candidature RH avec dépôt simulé de CV et lettre de motivation.
- **♿ Accessibilité & Fluidité :**
  - Prise en charge native de `prefers-reduced-motion: reduce` et orchestration fluide via Motion / Framer Motion.

---

## 🛠️ Stack Technique

- **Framework :** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler :** [Vite 8](https://vitejs.dev/)
- **Styles :** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations :** [Motion](https://motion.dev/)
- **Icônes :** [Lucide React](https://lucide.dev/)

---

## 🚀 Démarrage Local

### Prérequis
- [Node.js](https://nodejs.org/) (v20+)
- `npm` ou `pnpm`

### Installation
```bash
# 1. Cloner le projet
git clone https://github.com/SammyYohan/sobraga-web-experience.git
cd sobraga-web-experience

# 2. Installer les dépendances
npm install
# ou
pnpm install

# 3. Lancer le serveur de développement
npm run dev
# ou
pnpm dev
```
L'application sera accessible sur `http://localhost:3000`.

---

## 🌐 Déploiement

Ce projet est prêt pour un déploiement instantané en Single-Page Application (SPA) :

- **Vercel :** Configuré avec `vercel.json` pour la réécriture d'URL.
- **Cloudflare Pages / Netlify :** Configuré avec `public/_redirects`.

---

## ⚖️ Mentions légales

Ce projet est une étude et refonte de démonstration technique réalisée autour de l'identité de marque de la **Société des Boissons Rafraîchissantes du Gabon (SOBRAGA - Groupe Castel)**. Les marques, logos et références cités restent la propriété exclusive de leurs détenteurs respectifs.

export type ProductCategoryId =
  | 'all'
  | 'alcoomix'
  | 'bieres'
  | 'boissons-gazeuses'
  | 'eaux'
  | 'energy-drink'
  | 'jus-fruits';

export type WineCategoryId =
  | 'all'
  | 'baron-de-lestac'
  | 'champagnes'
  | 'chateau-domaines'
  | 'grands-crus'
  | 'maison-castel';

export type BottleShape = 'beer' | 'soda' | 'water-large' | 'water' | 'can' | 'carton' | 'wine' | 'champagne';

export interface ProductItem {
  slug: string;
  name: string;
  category: Exclude<ProductCategoryId, 'all'>;
  categoryLabel: string;
  launchYear: string;
  ingredients: string;
  type: string;
  packaging: string;
  price?: string;
  alcohol?: string;
  description: string;
  shape: BottleShape;
  primaryColor: string;
  secondaryColor: string;
  liquidColor: string;
  capColor: string;
  badgeText?: string;
}

export interface WineItem {
  id: string;
  name: string;
  category: Exclude<WineCategoryId, 'all'>;
  categoryLabel: string;
  appellation: string;
  colorType: 'Rouge' | 'Blanc' | 'Rosé' | 'Champagne';
  grape: string;
  temp: string;
  pairings: string[];
  description: string;
  bottleColor: string;
  labelColor: string;
  foilColor: string;
  shape: 'wine' | 'champagne';
}

export interface NewsArticle {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
  isRse?: boolean;
  accentColor: string;
  paragraphs: string[];
  bannerImage: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'capsule' | 'engagement-qualite' | 'code-conduite' | 'esbidjinews' | 'rse' | 'prix';
  year: string;
  subtitle?: string;
  summary: string;
  highlights: string[];
  pagesCount: number;
}

export const SITE_ASSETS = {
  heroDjino: '/src/assets/images/hero_djino_picnic_1794923504975.jpg',
  heroRegab: '/src/assets/images/hero_regab_celebration_1794923503706.jpg',
  heroProduction: '/src/assets/images/hero_production_line_1794923503934.jpg',
  heroWineCellar: '/src/assets/images/hero_wine_cellar_1794923505070.jpg',
  heroRseWorker: '/src/assets/images/hero_rse_worker_1794923505824.jpg',
};

export interface HeroSlide {
  id: string;
  kind: 'image' | 'communique';
  image: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-djino',
    kind: 'image',
    image: SITE_ASSETS.heroDjino,
    title: "D'Jino, un plaisir fruité 100 % Gabon",
    subtitle: 'Cocktail de fruits, Orange, Pamplemousse, Pomme — la fraîcheur de vos moments partagés.',
    ctaLabel: 'Découvrir nos boissons gazeuses',
    ctaHref: '/nos-produits/boissons-gazeuses',
  },
  {
    id: 'slide-communique',
    kind: 'communique',
    image: SITE_ASSETS.heroRegab,
    title: 'COMMUNIQUÉ DE PRESSE — SOBRAGA PROCÈDE À UN RÉAJUSTEMENT TARIFAIRE DE RÉGAB 65 CL ET 33 CL',
    subtitle:
      'Le prix public conseillé de la bouteille 65 cl est fixé à 600 FCFA, et celui de la bouteille 33 cl est abaissé à 350 FCFA.',
    ctaLabel: 'Consulter les prix homologués',
    ctaHref: '#prix-homologues',
  },
  {
    id: 'slide-lavie',
    kind: 'image',
    image: SITE_ASSETS.heroRegab,
    title: 'Conduire sobre c’est choisir “La Vie” !',
    subtitle: 'Nous encourageons la consommation responsable sur tout le territoire gabonais.',
    ctaLabel: 'Notre engagement RSE',
    ctaHref: '/rse',
  },
];

export const PRODUCT_CATEGORIES: Array<{
  id: ProductCategoryId;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  { id: 'all', label: 'Tous nos produits', shortLabel: 'Tous nos produits', description: 'Toute la gamme SOBRAGA' },
  { id: 'alcoomix', label: 'Alcoolmix', shortLabel: 'Alcool Mix', description: 'Boissons alcoolisées aromatisées' },
  { id: 'bieres', label: 'Bières', shortLabel: 'Bières', description: 'Blondes, brunes et bières de spécialité' },
  { id: 'boissons-gazeuses', label: 'Boissons Gazeuses', shortLabel: 'Boissons gazeuses', description: 'Sodas, tonics et limonades' },
  { id: 'eaux', label: 'Eaux', shortLabel: 'Eaux', description: 'Eaux minérales naturelles et eaux de source' },
  { id: 'energy-drink', label: 'Energy drink', shortLabel: 'Energy', description: 'Boissons énergisantes vitaminées' },
  { id: 'jus-fruits', label: 'Jus de fruits', shortLabel: 'Jus de fruit', description: 'Jus plats et nectars fruités' },
];

export const PRODUCTS: ProductItem[] = [
  {
    slug: 'regab',
    name: 'REGAB',
    category: 'bieres',
    categoryLabel: 'Bières',
    launchYear: '1966',
    ingredients: 'Eau, Malt, Maïs, Houblon, Antioxydant.',
    type: 'Blonde',
    packaging: 'Bouteille verre (65 cl, 33 cl) et Canette (33 cl, 50 cl).',
    price: '600 FCFA (65 cl) / 350 FCFA (33 cl)',
    alcohol: '4,5 % vol.',
    description:
      "REGAB est une bière blonde de caractère, brassée avec passion depuis des décennies selon un savoir-faire traditionnel rigoureux. Élaborée à partir de céréales et de houblons rigoureusement sélectionnés, elle titre à un taux d'alcool de référence de 4,5 %, offrant un équilibre parfait entre légèreté et tempérament. Généreuse, rafraîchissante et dotée d'une amertume subtile qui forge son identité unique, elle est la bière emblématique du Gabon.",
    shape: 'beer',
    primaryColor: '#B91C1C',
    secondaryColor: '#F59E0B',
    liquidColor: '#D97706',
    capColor: '#F59E0B',
    badgeText: '600 FCFA',
  },
  {
    slug: 'abora',
    name: 'ABORA',
    category: 'eaux',
    categoryLabel: 'Eaux',
    launchYear: '2024',
    ingredients: 'Eau de source naturelle puisée à 160 mètres de profondeur.',
    type: 'Eau de source naturelle',
    packaging: 'Bouteille PET (50 cl, 1,5 L) et Bonbonne.',
    description:
      "ABORA est une eau de source de SOBRAGA, puisée à 160 mètres de profondeur dans la région de l'Estuaire, au Gabon, et embouteillée directement à la source. Issue des profondeurs du sol, elle bénéficie d'une richesse naturelle en minéraux et en oligo-éléments. Sa pureté et sa qualité font l'objet de contrôles quotidiens dans le laboratoire de SOBRAGA à Libreville.",
    shape: 'water',
    primaryColor: '#0284C7',
    secondaryColor: '#EC4899',
    liquidColor: '#E0F2FE',
    capColor: '#DB2777',
  },
  {
    slug: 'jugab',
    name: 'JUGAB',
    category: 'jus-fruits',
    categoryLabel: 'Jus de fruits',
    launchYear: '2026',
    ingredients: 'Eau purifiée, jus et purée de fruits (Pomme, Orange, Multifruits), sucre, vitamine C.',
    type: 'Jus plat sans alcool',
    packaging: 'Brique Tetra Pak 1 Litre.',
    price: '800 FCFA',
    description:
      'Lancée au Gabon en 2026 par la SOBRAGA, JUGAB – Les Jus du Gabon est une nouvelle gamme de jus plats qui célèbre une identité résolument nationale. Déclinée en trois saveurs — Pomme, Orange et Multifruits — cette gamme propose une diversité de plaisirs fruités pour accompagner tous les moments de partage en famille comme entre amis.',
    shape: 'carton',
    primaryColor: '#16A34A',
    secondaryColor: '#F97316',
    liquidColor: '#FBBF24',
    capColor: '#DC2626',
    badgeText: '800 FCFA',
  },
  {
    slug: 'flag',
    name: 'FLAG',
    category: 'bieres',
    categoryLabel: 'Bières',
    launchYear: '2026',
    ingredients: 'Eau, Malt d’orge, Maïs, Houblon.',
    type: 'Blonde Spéciale',
    packaging: 'Bouteille verre consigné 50 cl.',
    price: '500 FCFA',
    alcohol: '5,2 % vol.',
    description:
      "Lancée au Gabon en 2026 par la SOBRAGA, FLAG est une bière blonde conditionnée en bouteille de verre consigné de 50 cl et proposée au prix public conseillé de 500 FCFA. Avec sa signature « FLAG, la nouvelle bière qui nous unit », elle célèbre les valeurs de partage, de proximité et de convivialité.",
    shape: 'beer',
    primaryColor: '#15803D',
    secondaryColor: '#DC2626',
    liquidColor: '#F59E0B',
    capColor: '#16A34A',
    badgeText: '500 FCFA',
  },
  {
    slug: 'ferox',
    name: 'FEROX',
    category: 'energy-drink',
    categoryLabel: 'Energy drink',
    launchYear: '2024',
    ingredients: 'Eau gazéifiée, Sucre, Taurine, Caféine, Vitamines C, B3, B5, B6, B12, Arômes.',
    type: 'Boisson énergisante sans alcool',
    packaging: 'Canette 33 cl et Bouteille PET 33 cl.',
    description:
      "FEROX est une boisson énergisante sans alcool, enrichie en vitamines C et B, en caféine et en taurine. Née d'une ambition panafricaine, FEROX porte les valeurs de surpassement, d'intensité et de détermination pour une génération jeune, sportive et ambitieuse.",
    shape: 'can',
    primaryColor: '#171717',
    secondaryColor: '#EAB308',
    liquidColor: '#FACC15',
    capColor: '#EAB308',
  },
  {
    slug: 'imperial',
    name: 'IMPERIAL',
    category: 'boissons-gazeuses',
    categoryLabel: 'Boissons Gazeuses',
    launchYear: '2025',
    ingredients: 'Eau gazéifiée, Sucre, Quinine, Arômes naturels, Acide citrique.',
    type: 'Gazeuse Tonic',
    packaging: 'Bouteille verre (30 cl) et PET.',
    description:
      "IMPERIAL est née au Gabon avec l'ambition de proposer une boisson gazeuse moderne et raffinée destinée aux adultes. Reconnue grâce à son Tonic au goût équilibré et rafraîchissant, la marque accompagne les moments de détente et de fête.",
    shape: 'soda',
    primaryColor: '#334155',
    secondaryColor: '#CBD5E1',
    liquidColor: '#F8FAFC',
    capColor: '#1E293B',
  },
  {
    slug: 'sombreros',
    name: 'SOMBREROS',
    category: 'bieres',
    categoryLabel: 'Bières',
    launchYear: '2022',
    ingredients: 'Eau pure, Malt d’orge, Sucre, Arômes naturels de Tequila et citron vert.',
    type: 'Bière blonde aromatisée Tequila',
    packaging: 'Bouteille verre 33 cl.',
    alcohol: '5,9 % vol.',
    description:
      "Inspirée par l'énergie festive et la chaleur du Mexique, Sombreros est une bière blonde de spécialité subtilement relevée par des arômes de Tequila. Pétillante et pleine de vie, elle libère un équilibre parfait entre douceur fruitée et caractère brassicole.",
    shape: 'beer',
    primaryColor: '#EA580C',
    secondaryColor: '#FACC15',
    liquidColor: '#FBBF24',
    capColor: '#EA580C',
  },
  {
    slug: 'chill',
    name: 'CHILL',
    category: 'bieres',
    categoryLabel: 'Bières',
    launchYear: '2021',
    ingredients: 'Eau pure, Malt d’orge, Houblon, Arôme naturel de citron.',
    type: 'Bière aromatisée au citron',
    packaging: 'Bouteille verre 33 cl et Canette 33 cl.',
    alcohol: '2,0 % vol.',
    description:
      "Chill s'est imposée comme l'icône de la nouvelle génération. Sa recette unique, subtilement aromatisée au citron, offre une explosion de fraîcheur dès la première gorgée avec un faible degré d'alcool, idéale pour les après-midi ensoleillés et soirées entre amis.",
    shape: 'beer',
    primaryColor: '#16A34A',
    secondaryColor: '#A3E635',
    liquidColor: '#FDE047',
    capColor: '#15803D',
  },
  {
    slug: 'guinness',
    name: 'GUINNESS',
    category: 'bieres',
    categoryLabel: 'Bières',
    launchYear: '1759',
    ingredients: 'Eau, Malt d’orge, Orge torréfiée, Houblon, Levure Guinness.',
    type: 'Stout Foreign Extra',
    packaging: 'Bouteille verre (33 cl, 65 cl) et Canette (33 cl).',
    alcohol: '7,5 % vol.',
    description:
      "Guinness est une icône mondiale, brassée au Gabon par la Sobraga avec une fidélité absolue à la recette originale d'Arthur Guinness. Reconnue par sa robe d'un noir profond et sa mousse onctueuse, elle libère des notes puissantes de café, de cacao et de réglisse.",
    shape: 'beer',
    primaryColor: '#111827',
    secondaryColor: '#D97706',
    liquidColor: '#18181B',
    capColor: '#F59E0B',
  },
  {
    slug: 'doppel-munich',
    name: 'Doppel Munich',
    category: 'bieres',
    categoryLabel: 'Bières',
    launchYear: '2016',
    ingredients: 'Eau, Malts torréfiés, Houblon, Extraits naturels.',
    type: 'Bière brune',
    packaging: 'Bouteille verre (33 cl, 65 cl) et Canette 50 cl.',
    alcohol: '6,5 % vol.',
    description:
      'Brassée selon une tradition bavaroise rigoureuse, Doppel Munich est une bière brune de caractère offrant un mariage subtil de malts torréfiés, des notes de caramel et de pain grillé, et une texture riche et onctueuse.',
    shape: 'beer',
    primaryColor: '#451A03',
    secondaryColor: '#F59E0B',
    liquidColor: '#271308',
    capColor: '#1F2937',
  },
  {
    slug: 'beaufort',
    name: 'BEAUFORT',
    category: 'bieres',
    categoryLabel: 'Bières',
    launchYear: '1952',
    ingredients: 'Eau pure, Malt d’orge sélectionné, Houblon fin.',
    type: 'Blonde Premium Lager',
    packaging: 'Bouteille verre (33 cl, 50 cl, 65 cl) et Canette (33 cl, 50 cl).',
    alcohol: '4,6 % vol.',
    description:
      "Beaufort Lager est une bière blonde d'exception, symbole d'élégance et de raffinement. Élaborée à partir d'une sélection rigoureuse des meilleurs malts et de houblons fins, elle offre une fraîcheur cristalline et une mousse dense et légère.",
    shape: 'beer',
    primaryColor: '#166534',
    secondaryColor: '#FACC15',
    liquidColor: '#FBBF24',
    capColor: '#15803D',
  },
  {
    slug: 'booster',
    name: 'BOOSTER',
    category: 'alcoomix',
    categoryLabel: 'Alcoolmix',
    launchYear: '2025',
    ingredients: 'Eau, Extraits d’arômes tropicaux, Alcool, Acidifiant (E330), Conservateurs.',
    type: 'Alcool-mix exotique',
    packaging: 'Bouteille verre 33 cl.',
    alcohol: '5,0 % vol.',
    description:
      'Booster Tropical Punch est une boisson alcoolisée de type alcool-mix, née de l’innovation SOBRAGA. Conçue pour une génération dynamique, Booster associe des saveurs tropicales intenses à une base alcoolisée légère et rafraîchissante.',
    shape: 'soda',
    primaryColor: '#E11D48',
    secondaryColor: '#F97316',
    liquidColor: '#F43F5E',
    capColor: '#BE123C',
  },
  {
    slug: 'castel',
    name: 'CASTEL',
    category: 'bieres',
    categoryLabel: 'Bières',
    launchYear: '1950',
    ingredients: 'Eau, Malt d’orge, Houblon sélectionné.',
    type: 'Blonde de prestige',
    packaging: 'Bouteille verre (33 cl, 65 cl) et Canette.',
    alcohol: '5,2 % vol.',
    description:
      "CASTEL BEER est une bière blonde de prestige, brassée au Gabon avec une sélection rigoureuse de malt et de houblon. Reconnue à sa robe dorée unique, elle est le symbole de l'effort, de l'accomplissement et des moments de célébration : le goût de la réussite !",
    shape: 'beer',
    primaryColor: '#92400E',
    secondaryColor: '#FCD34D',
    liquidColor: '#F59E0B',
    capColor: '#B45309',
  },
  {
    slug: 'racine',
    name: 'RACINE',
    category: 'alcoomix',
    categoryLabel: 'Alcoolmix',
    launchYear: '2020',
    ingredients: 'Eau, Extraits de racines naturelles africaines, Sucre, Alcool.',
    type: 'Alcool-mix traditionnel',
    packaging: 'Bouteille verre 33 cl et 65 cl.',
    alcohol: '5,5 % vol.',
    description:
      'Booster Racines est une boisson alcoolisée inspirée des traditions et du patrimoine naturel africain. Elle associe une base alcoolisée légère à des arômes issus de racines soigneusement sélectionnées pour une saveur authentique et singulière.',
    shape: 'beer',
    primaryColor: '#B45309',
    secondaryColor: '#DC2626',
    liquidColor: '#D97706',
    capColor: '#78350F',
  },
  {
    slug: '33-export',
    name: '“33” EXPORT',
    category: 'bieres',
    categoryLabel: 'Bières',
    launchYear: '1875',
    ingredients: 'Eau, Malt d’orge, Maïs, Houblon, Antioxydant.',
    type: 'Blonde',
    packaging: 'Bouteille verre (33 cl, 65 cl) et Canette (33 cl, 50 cl).',
    alcohol: '5,0 % vol.',
    description:
      '“33” EXPORT est une bière blonde désaltérante, rafraîchissante, fine et au goût unique. Compagne fidèle des grandes émotions sportives et des rencontres conviviales, elle est fièrement le supporter n°1 du football !',
    shape: 'beer',
    primaryColor: '#DC2626',
    secondaryColor: '#FACC15',
    liquidColor: '#F59E0B',
    capColor: '#DC2626',
  },
  {
    slug: 'akewa',
    name: 'AKEWA',
    category: 'eaux',
    categoryLabel: 'Eaux',
    launchYear: '2016',
    ingredients: 'Eau de source pure captée à plus de 200 m de profondeur à Owendo.',
    type: 'Eau de source',
    packaging: 'Bouteille PET (50 cl, 1,5 L, 5 L) et Bonbonne 19 L.',
    description:
      'Lancée en juillet 2016, AKEWA est une eau de source puisée à plus de 200 mètres de profondeur dans la région d’Owendo. Certifiée ISO 9001 et FSSC 22 000, elle est destinée à toute la famille pour une hydratation pure et contrôlée en permanence.',
    shape: 'water-large',
    primaryColor: '#0369A1',
    secondaryColor: '#38BDF8',
    liquidColor: '#E0F2FE',
    capColor: '#0284C7',
  },
  {
    slug: 'aningeau',
    name: 'ANING’EAU',
    category: 'eaux',
    categoryLabel: 'Eaux',
    launchYear: '2013',
    ingredients: 'Eau traitée, assainie et équilibrée en minéraux.',
    type: 'Eau de table',
    packaging: 'Bouteille PET (50 cl, 1,5 L).',
    description:
      'ANING’EAU est une eau de table produite par la Sobraga Port-Gentil depuis 2013. Pure et neutre en minéraux, son nom est un clin d’œil à la langue omyènè (« aningo », l’eau). Elle répond aux besoins essentiels d’hydratation de toute la famille.',
    shape: 'water',
    primaryColor: '#0EA5E9',
    secondaryColor: '#1E3A8A',
    liquidColor: '#F0F9FF',
    capColor: '#1D4ED8',
  },
  {
    slug: 'andza',
    name: 'ANDZA',
    category: 'eaux',
    categoryLabel: 'Eaux',
    launchYear: '1986',
    ingredients: 'Eau minérale naturelle des Hauts Plateaux Batéké (Léconi).',
    type: 'Eau minérale naturelle',
    packaging: 'Bouteille PET (33 cl, 50 cl, 1,5 L, 5 L).',
    description:
      'ANDZA, l’eau pure des hauts plateaux, est une eau minérale naturelle dont la source unique se situe à Léconi, dans les Hauts Plateaux Batéké au Sud-Est du Gabon. Parfaitement équilibrée et faiblement minéralisée, elle est vivement recommandée pour les nourrissons et toute la famille.',
    shape: 'water',
    primaryColor: '#1D4ED8',
    secondaryColor: '#16A34A',
    liquidColor: '#EFF6FF',
    capColor: '#2563EB',
  },
  {
    slug: 'xxl',
    name: 'XXL',
    category: 'energy-drink',
    categoryLabel: 'Energy drink',
    launchYear: '2002',
    ingredients: 'Eau gazéifiée, Sucre, Caféine, Taurine, Extraits de Ginseng, Vitamines.',
    type: 'Boisson énergisante',
    packaging: 'Bouteille verre 30 cl et Canette 33 cl.',
    description:
      'XXL est une boisson énergisante sans alcool riche en vitamines, caféine, ginseng et taurine. Finement gazeuse avec un goût unique fruité et subtil, elle apporte un concentré d’énergie et de vitalité pour dynamiser vos performances.',
    shape: 'soda',
    primaryColor: '#111827',
    secondaryColor: '#EF4444',
    liquidColor: '#F59E0B',
    capColor: '#DC2626',
  },
  {
    slug: 'youzou',
    name: 'YOUZOU',
    category: 'boissons-gazeuses',
    categoryLabel: 'Boissons Gazeuses',
    launchYear: '2022',
    ingredients: 'Eau gazéifiée, Sucre, Acidifiant, Arôme naturel de citron et citron vert.',
    type: 'Gazeuse Limonade',
    packaging: 'Bouteille verre (30 cl, 50 cl) et PET (50 cl, 1 L).',
    description:
      'Lancée en 2022, YouZou est la nouvelle source de fraîcheur citron-citron vert des amoureux de limonade ! Rafraîchissante et vivifiante, avec de fines bulles légères, YouZou accompagne tous vos moments de détente.',
    shape: 'soda',
    primaryColor: '#16A34A',
    secondaryColor: '#FACC15',
    liquidColor: '#ECFCCB',
    capColor: '#15803D',
  },
  {
    slug: 'world-cola',
    name: 'WORLD COLA',
    category: 'boissons-gazeuses',
    categoryLabel: 'Boissons Gazeuses',
    launchYear: '2018',
    ingredients: 'Eau gazéifiée, Sucre, Colorant caramel, Arômes naturels de cola, Caféine.',
    type: 'Gazeuse Cola',
    packaging: 'Bouteille verre (30 cl, 50 cl), PET (50 cl, 1 L, 1,5 L) et Canette 33 cl.',
    description:
      'WORLD COLA est la marque panafricaine de boisson gazeuse au cola du Groupe Castel, lancée au Gabon par Sobraga en 2018. Désaltérante et moderne, elle invite à basculer dans un « Monde rafraîchissant ».',
    shape: 'soda',
    primaryColor: '#B91C1C',
    secondaryColor: '#F8FAFC',
    liquidColor: '#1C1917',
    capColor: '#DC2626',
  },
  {
    slug: 'sumol',
    name: 'SUMOL',
    category: 'boissons-gazeuses',
    categoryLabel: 'Boissons Gazeuses',
    launchYear: '1954',
    ingredients: 'Eau gazéifiée, Jus et pulpe de fruits (Orange / Ananas), Sucre.',
    type: 'Gazeuse au vrai jus de fruits',
    packaging: 'Bouteille verre 30 cl et Canette 33 cl.',
    description:
      'SUMOL associe la tradition d’une spécialité de vrai jus et pulpe de fruits légèrement pétillante. Pasteurisée, sans conservateurs ni colorants artificiels, elle incarne la fraîcheur et l’authenticité fruitée.',
    shape: 'soda',
    primaryColor: '#15803D',
    secondaryColor: '#F97316',
    liquidColor: '#FB923C',
    capColor: '#16A34A',
  },
  {
    slug: 'top',
    name: 'TOP',
    category: 'boissons-gazeuses',
    categoryLabel: 'Boissons Gazeuses',
    launchYear: '2018',
    ingredients: 'Eau gazéifiée, Sucre, Arômes de fruits (Grenadine, Ananas, Pamplemousse, Citron, Orange).',
    type: 'Gazeuse fruitée',
    packaging: 'Bouteille verre (30 cl, 50 cl) et PET (50 cl, 1 L, 1,5 L).',
    description:
      'TOP est la célèbre marque panafricaine de boissons gazeuses fruitées du Groupe Castel, produite au Gabon par la Sobraga depuis 2018. Elle offre un moment de convivialité à travers une gamme diversifiée de parfums savoureux.',
    shape: 'soda',
    primaryColor: '#EA580C',
    secondaryColor: '#2563EB',
    liquidColor: '#F97316',
    capColor: '#EA580C',
  },
  {
    slug: 'djino',
    name: 'DJINO',
    category: 'boissons-gazeuses',
    categoryLabel: 'Boissons Gazeuses',
    launchYear: '1982',
    ingredients: 'Eau gazéifiée, Sucre, Extrait de jus de fruit, Épaississant, Arômes naturels.',
    type: 'Gazeuse fruitée',
    packaging: 'Bouteille verre (50 cl, 33 cl), Bouteilles plastique (50 cl, 1 L) et Canette (33 cl).',
    description:
      "D'jino est une marque panafricaine historique présente au Gabon sous plusieurs parfums emblématiques : Pamplemousse, Cocktail de Fruits, Orange, Pomme et Cola. Boisson 100 % locale, rafraîchissante et explosive en goût.",
    shape: 'soda',
    primaryColor: '#16A34A',
    secondaryColor: '#EF4444',
    liquidColor: '#F59E0B',
    capColor: '#15803D',
  },
  {
    slug: 'vino-cola',
    name: 'VINO COLA',
    category: 'alcoomix',
    categoryLabel: 'Alcoolmix',
    launchYear: '2021',
    ingredients: 'Vin sélectionné, Eau gazéifiée, Sucre, Arômes de cola.',
    type: 'Alcool-mix vin & cola',
    packaging: 'Bouteille verre 33 cl.',
    alcohol: '4,8 % vol.',
    description:
      'Vino Cola est une boisson alcoolisée de type alcool-mix produite par SOBRAGA. Elle résulte de l’association harmonieuse du vin et d’une boisson au cola, offrant un goût équilibré, doux et rafraîchissant.',
    shape: 'beer',
    primaryColor: '#7F1D1D',
    secondaryColor: '#F8FAFC',
    liquidColor: '#450A0A',
    capColor: '#991B1B',
  },
  {
    slug: 'orangina',
    name: 'ORANGINA',
    category: 'boissons-gazeuses',
    categoryLabel: 'Boissons Gazeuses',
    launchYear: '1936',
    ingredients: 'Eau gazéifiée, Jus d’orange et autres agrumes (12 %), Pulpe d’orange (2 %), Sucre, Extrait naturel d’écorce d’orange.',
    type: 'Gazeuse aux agrumes avec pulpe',
    packaging: 'Bouteille verre emblématique 25 cl, PET 50 cl et 1,5 L.',
    description:
      'Orangina associe le rafraîchissement des bulles et le plaisir unique de la vraie pulpe d’orange ! Née en 1936, la petite bouteille bulbeuse invite toujours à être secouée pour libérer toute la saveur des agrumes.',
    shape: 'soda',
    primaryColor: '#1D4ED8',
    secondaryColor: '#F97316',
    liquidColor: '#FB923C',
    capColor: '#1D4ED8',
  },
];

export const WINE_CATEGORIES: Array<{ id: WineCategoryId; label: string }> = [
  { id: 'all', label: 'Tous nos produits' },
  { id: 'baron-de-lestac', label: 'BARON DE LESTAC' },
  { id: 'champagnes', label: 'CHAMPAGNES' },
  { id: 'chateau-domaines', label: 'CHATEAU ET DOMAINES' },
  { id: 'grands-crus', label: 'GRANDS CRUS' },
  { id: 'maison-castel', label: 'MAISON CASTEL' },
];

export const WINES: WineItem[] = [
  {
    id: 'cru-la-maqueline',
    name: 'Château La Maqueline — Cru Bourgeois',
    category: 'chateau-domaines',
    categoryLabel: 'Château et Domaines',
    appellation: 'AOC Bordeaux Supérieur',
    colorType: 'Rouge',
    grape: 'Merlot, Cabernet Sauvignon',
    temp: '16–18 °C',
    pairings: ['Viandes rouges grillées', 'Volaille rôtie', 'Fromages affinés'],
    description: 'Un vin élégant aux arômes de fruits rouges mûrs, soutenu par des tanins souples et une finale boisée délicate.',
    bottleColor: '#1F2937',
    labelColor: '#FEF3C7',
    foilColor: '#7F1D1D',
    shape: 'wine',
  },
  {
    id: 'maison-castel-merlot',
    name: 'Maison Castel — Merlot',
    category: 'maison-castel',
    categoryLabel: 'Maison Castel',
    appellation: 'IGP Pays d’Oc',
    colorType: 'Rouge',
    grape: '100 % Merlot',
    temp: '15–17 °C',
    pairings: ['Pâtes en sauce', 'Brochettes de bœuf', 'Plateau de charcuterie'],
    description: 'Rond, généreux et fruité, dévoilant des notes de prune, de cerise noire et d’épices douces.',
    bottleColor: '#1E293B',
    labelColor: '#FFFFFF',
    foilColor: '#991B1B',
    shape: 'wine',
  },
  {
    id: 'maison-castel-muscat',
    name: 'Maison Castel — Muscat Moelleux',
    category: 'maison-castel',
    categoryLabel: 'Maison Castel',
    appellation: 'Vin de France',
    colorType: 'Blanc',
    grape: 'Muscat Petits Grains',
    temp: '8–10 °C',
    pairings: ['Apéritif frais', 'Desserts aux fruits tropicaux', 'Fromages bleus'],
    description: 'Un blanc aromatique tout en fraîcheur aux notes florales, de litchi et de miel d’acacia.',
    bottleColor: '#365314',
    labelColor: '#FFFFFF',
    foilColor: '#CA8A04',
    shape: 'wine',
  },
  {
    id: 'maison-castel-merlot-rose',
    name: 'Maison Castel — Rosé Syrah / Merlot',
    category: 'maison-castel',
    categoryLabel: 'Maison Castel',
    appellation: 'IGP Pays d’Oc',
    colorType: 'Rosé',
    grape: 'Merlot, Syrah',
    temp: '8–10 °C',
    pairings: ['Poissons grillés', 'Salades composées', 'Cuisine méditerranéenne'],
    description: 'Robe rose pâle cristalline, bouche vive et gourmande aux accents de fraise des bois et d’agrumes.',
    bottleColor: '#FDE2E4',
    labelColor: '#FFFFFF',
    foilColor: '#BE185D',
    shape: 'wine',
  },
  {
    id: 'maison-castel-chardonnay',
    name: 'Maison Castel — Chardonnay',
    category: 'maison-castel',
    categoryLabel: 'Maison Castel',
    appellation: 'IGP Pays d’Oc',
    colorType: 'Blanc',
    grape: '100 % Chardonnay',
    temp: '10–12 °C',
    pairings: ['Capitaine braisé', 'Fruits de mer', 'Volailles à la crème'],
    description: 'Équilibre remarquable entre fraîcheur minérale, notes de pêche blanche et rondeur vanillée.',
    bottleColor: '#3F6212',
    labelColor: '#FFFFFF',
    foilColor: '#D97706',
    shape: 'wine',
  },
  {
    id: 'champagne-demoiselle-rose',
    name: 'Champagne Demoiselle — Rosé Brut',
    category: 'champagnes',
    categoryLabel: 'Champagnes',
    appellation: 'AOC Champagne',
    colorType: 'Champagne',
    grape: 'Chardonnay, Pinot Noir',
    temp: '8 °C',
    pairings: ['Apéritif d’exception', 'Tartare de saumon', 'Desserts aux fruits rouges'],
    description: 'Bulles fines et persistantes, arômes subtils de framboise, groseille et brioche dorée.',
    bottleColor: '#312E81',
    labelColor: '#FCE7F3',
    foilColor: '#F472B6',
    shape: 'champagne',
  },
  {
    id: 'champagne-laurent-perrier',
    name: 'Champagne Laurent-Perrier — La Cuvée',
    category: 'champagnes',
    categoryLabel: 'Champagnes',
    appellation: 'AOC Champagne',
    colorType: 'Champagne',
    grape: 'Chardonnay majoritaire, Pinot Noir, Meunier',
    temp: '8–10 °C',
    pairings: ['Langouste grillée', 'Carpaccio de Saint-Jacques', 'Apéritif de prestige'],
    description: 'Pureté, fraîcheur et élégance : nez d’agrumes frais et de fleurs blanches, finale aérienne.',
    bottleColor: '#14532D',
    labelColor: '#FEF9C3',
    foilColor: '#CA8A04',
    shape: 'champagne',
  },
  {
    id: 'champagne-pommery',
    name: 'Champagne Pommery — Brut Royal',
    category: 'champagnes',
    categoryLabel: 'Champagnes',
    appellation: 'AOC Champagne',
    colorType: 'Champagne',
    grape: 'Chardonnay, Pinot Noir, Meunier',
    temp: '8–10 °C',
    pairings: ['Hors-d’œuvre raffinés', 'Poissons nobles', 'Célébrations'],
    description: 'Vif, gai et délicat, porté par une effervescence fine et des notes de pomme verte et d’agrumes.',
    bottleColor: '#1E3A8A',
    labelColor: '#F8FAFC',
    foilColor: '#1D4ED8',
    shape: 'champagne',
  },
  {
    id: 'champagne-trouillard-elexium',
    name: 'Champagne Trouillard — Cuvée Elexium',
    category: 'champagnes',
    categoryLabel: 'Champagnes',
    appellation: 'AOC Champagne',
    colorType: 'Champagne',
    grape: 'Pinot Noir, Chardonnay',
    temp: '8–10 °C',
    pairings: ['Foie gras', 'Volaille aux morilles', 'Buffet gastronomique'],
    description: 'Une cuvée structurée et expressive offrant richesse aromatique et belle tension en bouche.',
    bottleColor: '#1C1917',
    labelColor: '#F5F5F4',
    foilColor: '#B45309',
    shape: 'champagne',
  },
  {
    id: 'grand-cru-margaux',
    name: 'Château Grand Cru — Margaux',
    category: 'grands-crus',
    categoryLabel: 'Grands Crus',
    appellation: 'AOC Margaux',
    colorType: 'Rouge',
    grape: 'Cabernet Sauvignon, Merlot, Petit Verdot',
    temp: '17–18 °C',
    pairings: ['Côte de bœuf maturée', 'Carré d’agneau rôti', 'Gibier'],
    description: 'Finesse légendaire du Médoc : bouquet complexe de cassis, violette et cèdre, tanins soyeux.',
    bottleColor: '#0F172A',
    labelColor: '#FEF3C7',
    foilColor: '#7F1D1D',
    shape: 'wine',
  },
  {
    id: 'grand-cru-chateau-belair',
    name: 'Château Bélair — Saint-Émilion Grand Cru',
    category: 'grands-crus',
    categoryLabel: 'Grands Crus',
    appellation: 'AOC Saint-Émilion Grand Cru',
    colorType: 'Rouge',
    grape: 'Merlot, Cabernet Franc',
    temp: '17–18 °C',
    pairings: ['Magret de canard', 'Filet mignon', 'Fromages de garde'],
    description: 'Profondeur et velouté remarquables, arômes de mûre confite, truffe et épices fines.',
    bottleColor: '#18181B',
    labelColor: '#FEF3C7',
    foilColor: '#991B1B',
    shape: 'wine',
  },
  {
    id: 'baron-de-lestac-blanc-moelleux',
    name: 'Baron de Lestac — Bordeaux Blanc Moelleux',
    category: 'baron-de-lestac',
    categoryLabel: 'Baron de Lestac',
    appellation: 'AOC Bordeaux',
    colorType: 'Blanc',
    grape: 'Sémillon, Sauvignon Blanc',
    temp: '8–10 °C',
    pairings: ['Foie gras', 'Desserts caramélisés', 'Cuisine sucrée-salée'],
    description: 'Élevé en fûts de chêne, il séduit par ses arômes d’abricot sec, d’agrumes confits et de vanille.',
    bottleColor: '#365314',
    labelColor: '#FFFBEB',
    foilColor: '#D97706',
    shape: 'wine',
  },
  {
    id: 'baron-de-lestac-rouge',
    name: 'Baron de Lestac — Bordeaux Rouge',
    category: 'baron-de-lestac',
    categoryLabel: 'Baron de Lestac',
    appellation: 'AOC Bordeaux',
    colorType: 'Rouge',
    grape: 'Merlot, Cabernet Sauvignon',
    temp: '16–18 °C',
    pairings: ['Entrecôte grillée', 'Plats mijotés', 'Fromages à pâte pressée'],
    description: 'Un Bordeaux généreux élevé en fûts de chêne, aux notes de fruits noirs, de chêne grillé et d’épices.',
    bottleColor: '#1F2937',
    labelColor: '#FFFBEB',
    foilColor: '#991B1B',
    shape: 'wine',
  },
];

export const BRANDS: Array<{
  name: string;
  productSlug?: string;
  category?: ProductCategoryId;
  bg: string;
  fg: string;
  accent: string;
}> = [
  { name: 'SOBRAGA', category: 'all', bg: '#9E0B0F', fg: '#FFFFFF', accent: '#FFFFFF' },
  { name: '“33” EXPORT', productSlug: '33-export', bg: '#DC2626', fg: '#FFFFFF', accent: '#FACC15' },
  { name: 'BEAUFORT', productSlug: 'beaufort', bg: '#166534', fg: '#FFFFFF', accent: '#FACC15' },
  { name: 'CASTEL BEER', productSlug: 'castel', bg: '#92400E', fg: '#FFFFFF', accent: '#FCD34D' },
  { name: 'GUINNESS', productSlug: 'guinness', bg: '#111827', fg: '#F59E0B', accent: '#FFFFFF' },
  { name: 'DOPPEL MUNICH', productSlug: 'doppel-munich', bg: '#451A03', fg: '#FFFFFF', accent: '#EF4444' },
  { name: 'REGAB', productSlug: 'regab', bg: '#B91C1C', fg: '#FEF3C7', accent: '#F59E0B' },
  { name: 'FLAG', productSlug: 'flag', bg: '#15803D', fg: '#FFFFFF', accent: '#DC2626' },
  { name: 'CHILL', productSlug: 'chill', bg: '#16A34A', fg: '#FFFFFF', accent: '#FDE047' },
  { name: 'SOMBREROS', productSlug: 'sombreros', bg: '#EA580C', fg: '#FFFFFF', accent: '#FACC15' },
  { name: 'DJINO', productSlug: 'djino', bg: '#15803D', fg: '#FFFFFF', accent: '#FBBF24' },
  { name: 'TOP', productSlug: 'top', bg: '#EA580C', fg: '#FFFFFF', accent: '#38BDF8' },
  { name: 'WORLD COLA', productSlug: 'world-cola', bg: '#B91C1C', fg: '#FFFFFF', accent: '#F8FAFC' },
  { name: 'ORANGINA', productSlug: 'orangina', bg: '#1D4ED8', fg: '#FFFFFF', accent: '#F97316' },
  { name: 'SUMOL', productSlug: 'sumol', bg: '#166534', fg: '#FFFFFF', accent: '#FB923C' },
  { name: 'YOUZOU', productSlug: 'youzou', bg: '#65A30D', fg: '#FFFFFF', accent: '#FEF08A' },
  { name: 'IMPERIAL', productSlug: 'imperial', bg: '#334155', fg: '#FFFFFF', accent: '#E2E8F0' },
  { name: 'ABORA', productSlug: 'abora', bg: '#0284C7', fg: '#FFFFFF', accent: '#F472B6' },
  { name: 'ANDZA', productSlug: 'andza', bg: '#1D4ED8', fg: '#FFFFFF', accent: '#4ADE80' },
  { name: 'AKEWA', productSlug: 'akewa', bg: '#0369A1', fg: '#FFFFFF', accent: '#7DD3FC' },
  { name: 'ANING’EAU', productSlug: 'aningeau', bg: '#0EA5E9', fg: '#FFFFFF', accent: '#1E3A8A' },
  { name: 'FEROX', productSlug: 'ferox', bg: '#171717', fg: '#EAB308', accent: '#FFFFFF' },
  { name: 'XXL', productSlug: 'xxl', bg: '#18181B', fg: '#EF4444', accent: '#FACC15' },
  { name: 'JUGAB', productSlug: 'jugab', bg: '#16A34A', fg: '#FFFFFF', accent: '#F97316' },
  { name: 'BOOSTER', productSlug: 'booster', bg: '#E11D48', fg: '#FFFFFF', accent: '#FDE047' },
  { name: 'RACINE', productSlug: 'racine', bg: '#B45309', fg: '#FFFFFF', accent: '#FEF3C7' },
  { name: 'VINO COLA', productSlug: 'vino-cola', bg: '#7F1D1D', fg: '#FFFFFF', accent: '#FDE68A' },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'novembre-bleu-jagis-pour-ma-sante-et-celle-de-mes-proches-2',
    date: '12 novembre 2026',
    title: 'NOVEMBRE BLEU | « J’agis pour ma santé et celle de mes proches »',
    excerpt: '« Prendre soin de sa santé, c’est aussi penser à ceux qui nous entourent. » Chaque année, à l’occasion de...',
    tag: '#SANTE',
    accentColor: '#1D4ED8',
    bannerImage: SITE_ASSETS.heroRseWorker,
    paragraphs: [
      '« Prendre soin de sa santé, c’est aussi penser à ceux qui nous entourent. » Chaque année, à l’occasion de Novembre Bleu, SOBRAGA se mobilise aux côtés de ses collaborateurs et du grand public pour sensibiliser au dépistage précoce et à la prévention des cancers masculins.',
      'Des ateliers d’information médicale, des séances de dépistage gratuites sur nos sites d’Owendo, Port-Gentil, Franceville, Oyem et Mouila ainsi que des moments d’échange avec les professionnels de santé jalonnent ce mois d’engagement citoyen.',
      'En plaçant la santé et le bien-être au cœur de son capital humain, SOBRAGA réaffirme que la prévention est l’affaire de tous.',
    ],
  },
  {
    slug: 'sobraga-une-nouvelle-organisation-commerciale-presentee-a-nos-partenaires-grossistes',
    date: '12 novembre 2026',
    title: 'SOBRAGA | Une nouvelle organisation commerciale présentée à nos partenaires grossistes',
    excerpt: 'Une équipe renouvelée, une ambition commune et des partenariats qui se renforcent. Le 5 novembre 2026, SOBRAGA a réuni ses...',
    tag: '#SOBRAGA',
    accentColor: '#9E0B0F',
    bannerImage: SITE_ASSETS.heroProduction,
    paragraphs: [
      'Une équipe renouvelée, une ambition commune et des partenariats qui se renforcent. Le 5 novembre 2026, SOBRAGA a réuni ses partenaires grossistes à l’hôtel Orchidée pour leur présenter la nouvelle organisation de sa Direction Commerciale et Marketing.',
      'Cette rencontre a été l’occasion de faire découvrir les collaborateurs qui seront désormais leurs interlocuteurs au quotidien, de partager les orientations stratégiques de l’entreprise et d’échanger sur les priorités des prochains mois.',
      'La soirée a permis de mettre en avant les valeurs qui fondent cette relation : la confiance, la proximité et la recherche de performance au service de nos consommateurs sur l’ensemble du territoire gabonais.',
    ],
  },
  {
    slug: 'sobraga-retrouvez-desormais-notre-actualite-sur-whatsapp',
    date: '12 novembre 2026',
    title: 'SOBRAGA | Retrouvez désormais notre actualité sur WhatsApp !',
    excerpt: '« Toute l’actualité de SOBRAGA, désormais à portée de main. » SOBRAGA poursuit sa transformation digitale avec le lancement de...',
    tag: '#SOBRAGA',
    accentColor: '#16A34A',
    bannerImage: SITE_ASSETS.heroDjino,
    paragraphs: [
      '« Toute l’actualité de SOBRAGA, désormais à portée de main. » SOBRAGA poursuit sa transformation digitale avec le lancement officiel de sa chaîne WhatsApp dédiée aux consommateurs, partenaires et collaborateurs.',
      'Lancements de nouveaux produits, campagnes citoyennes, événements sportifs, offres d’emploi et informations sur les prix homologués y sont partagés en temps réel.',
      'Un canal direct, rapide et accessible pour renforcer notre lien historique de proximité avec tous les Gabonais.',
    ],
  },
  {
    slug: 'sobraga-une-presence-au-salon-de-lemploi-des-metiers-pour-valoriser-ses-savoir-faire',
    date: '12 novembre 2026',
    title: 'SOBRAGA | Une présence au Salon de l’Emploi & des Métiers pour valoriser ses savoir-faire',
    excerpt: 'Faire découvrir nos métiers et aller à la rencontre des talents. Les 5 et 6 novembre derniers, SOBRAGA a pris...',
    tag: '#CARRIERES',
    accentColor: '#B45309',
    bannerImage: SITE_ASSETS.heroRseWorker,
    paragraphs: [
      'Faire découvrir nos métiers et aller à la rencontre des talents. Les 5 et 6 novembre derniers, SOBRAGA a pris part au Salon de l’Emploi & des Métiers à Libreville.',
      'Nos équipes Ressources Humaines et nos responsables industriels ont présenté la diversité des métiers brassicoles, logistiques, commerciaux et qualité au sein de nos 6 sites de production.',
      'De nombreux jeunes diplômés et techniciens ont pu déposer leurs candidatures et découvrir nos programmes de stages et d’insertion professionnelle.',
    ],
  },
  {
    slug: 'ferox-gabon-rendez-vous-a-la-14e-edition-de-la-marche-commando',
    date: '12 novembre 2026',
    title: 'FEROX GABON | Rendez-vous à la 14ᵉ EDITION de la Marche Commando',
    excerpt: '« L’effort se partage, le dépassement de soi se vit ensemble ! » Le 21 novembre prochain, FEROX GABON accompagnera...',
    tag: '#FEROX',
    accentColor: '#171717',
    bannerImage: SITE_ASSETS.heroRegab,
    paragraphs: [
      '« L’effort se partage, le dépassement de soi se vit ensemble ! » Le 21 novembre prochain, FEROX GABON accompagnera des centaines de sportifs lors de la 14ᵉ édition de la Marche Commando.',
      'Fidèle à ses piliers — surpassement, intensité et détermination — la boisson énergisante FEROX soutient les initiatives sportives qui fédèrent la jeunesse gabonaise autour du bien-être et de l’endurance.',
    ],
  },
  {
    slug: 'rgedd-a-sorbonne-une-mobilisation-collective-contre-la-pollution-plastique',
    date: '12 novembre 2026',
    title: 'RGEDD | À Sorbonne, une mobilisation collective contre la pollution plastique',
    excerpt: '« Protéger les océans commence aussi dans nos quartiers. » Le 7 novembre 2026, RGEDD, en partenariat avec Surprise Consulting...',
    tag: '#RSE',
    isRse: true,
    accentColor: '#0284C7',
    bannerImage: SITE_ASSETS.heroProduction,
    paragraphs: [
      '« Protéger les océans commence aussi dans nos quartiers. » Le 7 novembre 2026, le Réseau Gabonais pour l’Environnement et le Développement Durable (RGEDD), soutenu par SOBRAGA, a mené une vaste opération de collecte et de tri sélectif.',
      'Cette mobilisation s’inscrit pleinement dans l’économie circulaire portée par SOBRAGA pour la collecte, le broyage et la valorisation des bouteilles PET à travers le Gabon.',
    ],
  },
  {
    slug: 'abora-octobre-rose-une-marche-solidaire-pour-la-sante-et-le-bien-etre',
    date: '12 novembre 2026',
    title: 'ABORA & OCTOBRE ROSE | Une marche solidaire pour la santé et le bien-être',
    excerpt: '« Marcher ensemble, c’est aussi agir ensemble pour une cause essentielle. » Le samedi 31 octobre 2026, SOBRAGA a organisé,...',
    tag: '#ABORA',
    accentColor: '#DB2777',
    bannerImage: SITE_ASSETS.heroRseWorker,
    paragraphs: [
      '« Marcher ensemble, c’est aussi agir ensemble pour une cause essentielle. » Le samedi 31 octobre 2026, SOBRAGA et sa marque d’eau de source ABORA ont rassemblé plus de 2 000 participants pour une marche solidaire dédiée à Octobre Rose.',
      'Hydratation, dépistage, témoignages et solidarité ont rythmé cette journée citoyenne forte en émotions à Libreville.',
    ],
  },
  {
    slug: 'ferox-gabon-donne-rendez-vous-aux-amateurs-de-sport-pour-la-14e-marche-commando',
    date: '4 novembre 2026',
    title: 'FEROX GABON donne rendez-vous aux amateurs de sport pour la 14e Marche Commando',
    excerpt: 'FEROX GABON et Belle & Fort donnent rendez-vous aux amateurs de sport et de dépassement de soi le samedi 21...',
    tag: '#FEROX',
    accentColor: '#CA8A04',
    bannerImage: SITE_ASSETS.heroRegab,
    paragraphs: [
      'FEROX GABON et Belle & Fort donnent rendez-vous aux amateurs de sport et de dépassement de soi le samedi 21 novembre pour un parcours exigeant alliant cohésion et énergie.',
      'Des points d’hydratation et de ravitaillement animés par les équipes FEROX et ABORA seront déployés tout au long de l’itinéraire.',
    ],
  },
  {
    slug: 'novembre-bleu-jagis-pour-ma-sante-et-celle-de-mes-proches',
    date: '1 novembre 2026',
    title: 'NOVEMBRE BLEU | « J’agis pour ma santé et celle de mes proches »',
    excerpt: 'Chaque année, à l’occasion de Novembre Bleu, SOBRAGA relaie un message essentiel à travers sa campagne de sensibilisation : rappeler...',
    tag: '#SANTE',
    accentColor: '#2563EB',
    bannerImage: SITE_ASSETS.heroRseWorker,
    paragraphs: [
      'Chaque année, à l’occasion de Novembre Bleu, SOBRAGA relaie un message essentiel : le dépistage précoce sauve des vies.',
      'Tout au long du mois de novembre, des communications internes et campagnes publiques rappellent les gestes de prévention essentiels pour les hommes et leurs familles.',
    ],
  },
  {
    slug: 'sobraga-moteur-de-lenvironnement-et-de-leconomie-verte-aux-sambas-professionnels',
    date: '18 octobre 2026',
    title: 'Sobraga moteur de l’Environnement et de l’Economie verte aux Sambas professionnels',
    excerpt: 'SOBRAGA a présenté ses initiatives d’économie circulaire, de réutilisation de l’eau (station RE-USE) et de recyclage plastique...',
    tag: '#RSE',
    isRse: true,
    accentColor: '#15803D',
    bannerImage: SITE_ASSETS.heroProduction,
    paragraphs: [
      'Lors des Sambas professionnels, SOBRAGA a partagé son bilan industriel vert : mise en service de la station RE-USE pour la réduction de la consommation d’eau, collecte de tonnes de plastique PET et sensibilisation des jeunes.',
    ],
  },
  {
    slug: 'activites-rse-a-port-gentil',
    date: '9 octobre 2026',
    title: 'Activités RSE à Port-Gentil !',
    excerpt: 'Les équipes de l’usine de Port-Gentil se sont mobilisées pour des actions de nettoyage du littoral et de soutien scolaire...',
    tag: '#RSE',
    isRse: true,
    accentColor: '#0284C7',
    bannerImage: SITE_ASSETS.heroRseWorker,
    paragraphs: [
      'Les équipes de la brasserie de Port-Gentil ont mené une campagne citoyenne combinant assainissement des plages et dotation de fournitures scolaires pour les établissements partenaires.',
    ],
  },
  {
    slug: '72-agents-sobraga-decores-pour-leurs-bons-et-loyaux-services',
    date: '2 octobre 2026',
    title: '72 agents Sobraga décorés pour leurs bons et loyaux services',
    excerpt: 'Une cérémonie solennelle a célébré la fidélité, l’engagement et le professionnalisme de 72 collaborateurs décorés de la médaille du travail...',
    tag: '#RSE',
    isRse: true,
    accentColor: '#9E0B0F',
    bannerImage: SITE_ASSETS.heroRseWorker,
    paragraphs: [
      'À l’occasion du jubilé des 60 ans, 72 collaborateurs totalisant de 10 à 30 ans d’ancienneté ont reçu les médailles du travail en présence de la Direction Générale et des autorités locales.',
    ],
  },
  {
    slug: 'soboleco-renforce-le-mecenat-social-a-leconi',
    date: '25 septembre 2026',
    title: 'SOBOLECO renforce le mécénat social à Léconi',
    excerpt: 'La Société des Eaux de Léconi (SOBOLECO) poursuit son soutien aux communautés locales du Haut-Ogooué à travers de nouveaux équipements...',
    tag: '#RSE',
    isRse: true,
    accentColor: '#1D4ED8',
    bannerImage: SITE_ASSETS.heroProduction,
    paragraphs: [
      'Productrice de l’eau minérale naturelle ANDZA sur les Hauts Plateaux Batéké, SOBOLECO a renforcé son programme de mécénat social en faveur des infrastructures communautaires et sanitaires de Léconi.',
    ],
  },
];

export const COMPANY_STATS = [
  { value: '3 600 000', label: 'HL produits chaque année' },
  { value: '3 000 000', label: 'De cols fabriqués par jour' },
  { value: '2 000', label: 'Employés' },
  { value: '16', label: "Lignes d'embouteillages" },
  { value: '28', label: 'Marques' },
  { value: '88', label: 'Références' },
];

export const PRODUCTION_STEPS = [
  {
    step: '01',
    title: 'Matières Premières',
    description:
      'Grâce à l’expérience internationale du Groupe Castel, la Sobraga bénéficie des meilleurs intrants, soigneusement sélectionnés par nos experts et conservés dans les meilleures conditions sur nos sites.',
  },
  {
    step: '02',
    title: 'Qualité',
    description:
      'Toutes nos boissons sont soumises à des contrôles permanents très stricts. De la réception des intrants à l’embouteillage des produits finis, des tests sont réalisés à chaque étape de la production.',
  },
  {
    step: '03',
    title: 'Fabrication',
    description:
      'Nos brasseurs disposent d’infrastructures à la pointe de la technologie et sont formés par des experts internationaux pour élaborer des boissons d’une qualité irréprochable.',
  },
  {
    step: '04',
    title: 'Embouteillage',
    description:
      'Grâce à des investissements constants sur nos 6 sites de production, nous disposons d’une capacité d’embouteillage de 3 millions de cols par jour, permettant d’alimenter 95 % de la demande nationale.',
  },
  {
    step: '05',
    title: 'Distribution',
    description:
      'Sobraga livre chaque jour directement plus de 150 remorques aux grossistes et génère des dizaines de milliers d’emplois grâce au formidable réseau de livreurs et détaillants à travers l’ensemble du pays.',
  },
];

export const PRODUCTION_SITES = [
  { city: 'Libreville / Owendo', year: '1966 / 1987', role: 'Siège social & usine principale (brasserie, sodas, eaux Akewa)' },
  { city: 'Franceville', year: '1971', role: 'Site de production Haut-Ogooué' },
  { city: 'Port-Gentil', year: '1972', role: 'Site de production Ogooué-Maritime & Aning’eau' },
  { city: 'Oyem', year: '1976', role: 'Site de production Woleu-Ntem' },
  { city: 'Mouila', year: '1983', role: 'Site de production Ngounié' },
  { city: 'Léconi (SOBOLECO)', year: '1986', role: 'Source et embouteillage de l’eau minérale Andza' },
];

export const COMPANY_VALUES = [
  {
    title: 'Responsabilité',
    description:
      'Responsables envers notre pays et notre environnement pour planifier une croissance durable et partagée.',
  },
  {
    title: 'Qualité',
    description:
      "Plus qu'un objectif, la qualité est pour nous un choix et un état d'esprit.",
  },
  {
    title: "Esprit d'équipe",
    description:
      "Nous sommes plus d'un millier, mais nous ne faisons qu'un pour satisfaire nos clients.",
  },
];

export const RSE_PILLARS = [
  {
    number: '1',
    title: '1. Renforcer la sécurité des conditions de travail',
    description:
      'Promouvoir une culture de santé et sécurité au travail par des actions de prévention et une “tolérance zéro” des accidents.',
  },
  {
    number: '2',
    title: '2. Répondre aux attentes du consommateur',
    description:
      'Assurer à nos clients une disponibilité et une qualité constantes des produits et sensibiliser aux risques d’une consommation excessive d’alcool ou de boissons sucrées.',
  },
  {
    number: '3',
    title: '3. Renforcer la Vigilance auprès des partenaires',
    description:
      'Évaluer les risques sur toute la chaîne de valeur et accompagner les fournisseurs et les sous-traitants dans leur démarche d’amélioration continue.',
  },
  {
    number: '4',
    title: '4. Accompagner la montée en compétences des collaborateurs',
    description:
      'Proposer des formations continues et opérationnelles et promouvoir les talents.',
  },
  {
    number: '5',
    title: '5. Préserver l’environnement',
    description:
      'Réduire notre impact environnemental par l’amélioration de notre efficacité énergétique, une gestion durable de la ressource en eau et la valorisation des déchets.',
  },
  {
    number: '6',
    title: '6. Soutenir les communautés',
    description:
      'Contribuer au développement local pour un dialogue renforcé avec les communautés, des partenariats et des actions solidaires.',
  },
];

export const RSE_ODDS = [
  { code: 'ODD 3', title: 'Bonne santé et bien-être', color: '#4C9F38' },
  { code: 'ODD 4', title: 'Éducation de qualité', color: '#C5192D' },
  { code: 'ODD 5', title: 'Égalité entre les sexes', color: '#FF3A21' },
  { code: 'ODD 6', title: 'Eau propre et assainissement', color: '#26BDE2' },
  { code: 'ODD 8', title: 'Travail décent et croissance économique', color: '#A21942' },
  { code: 'ODD 12', title: 'Consommation et production responsables', color: '#BF8B2E' },
  { code: 'ODD 13', title: 'Mesures relatives à la lutte contre les changements climatiques', color: '#3F7E44' },
  { code: 'ODD 17', title: 'Partenariats pour la réalisation des objectifs', color: '#19486A' },
];

export const DOCUMENTS: DocumentItem[] = [
  // Prix homologués
  {
    id: 'prix-homologues-lbv',
    title: 'Prix homologués — Libreville & Intérieur',
    category: 'prix',
    year: '2026',
    subtitle: 'Grille officielle des prix publics conseillés (Novembre 2026)',
    summary: 'Tarifs officiels recommandés aux points de vente sur le territoire gabonais pour l’ensemble des marques SOBRAGA.',
    highlights: [
      'Régab 65 cl (verre consigné) : 600 FCFA',
      'Régab 33 cl (verre consigné) : 350 FCFA',
      'Flag 50 cl (verre consigné) : 500 FCFA',
      'Castel Beer / 33 Export / Beaufort 65 cl : 650 FCFA',
      'Jugab 1 L (Pomme, Orange, Multifruits) : 800 FCFA',
      'D’Jino / World Cola / Top / YouZou 50 cl : 400 FCFA',
      'Akewa / Andza 1,5 L : 500 FCFA',
    ],
    pagesCount: 2,
  },
  // Engagement qualité
  {
    id: 'engagement-qualite-qsdasstee',
    title: 'Politique QSDASSTEE — Engagement Qualité',
    category: 'engagement-qualite',
    year: '2026',
    subtitle: 'Qualité, Sécurité des Denrées Alimentaires, Santé, Sécurité au Travail, Environnement & Énergie',
    summary: 'Engagement de la Direction Générale de SOBRAGA en faveur de l’excellence opérationnelle et des certifications ISO 9001 & FSSC 22000.',
    highlights: [
      'Certification ISO 9001 sur l’ensemble des sites de production depuis 2009',
      'Sécurité des denrées alimentaires FSSC 22 000',
      'Prix « Qualité Performance » décerné en 2022',
      'Amélioration continue et tolérance zéro sur la sécurité au travail',
    ],
    pagesCount: 4,
  },
  // Code de conduite
  {
    id: 'code-de-conduite',
    title: 'Code de conduite — Groupe Castel & SOBRAGA',
    category: 'code-conduite',
    year: '2025',
    subtitle: 'Charte éthique, intégrité et conformité des affaires',
    summary: 'Référentiel éthique encadrant les pratiques de nos collaborateurs, fournisseurs et partenaires commerciaux au Gabon.',
    highlights: [
      'Respect des droits humains et conditions de travail équitables',
      'Prévention de la corruption et transparence commerciale',
      'Protection des données personnelles (Loi gabonaise n° 025/2023)',
      'Engagement anti-contrefaçon et sécurité du consommateur',
    ],
    pagesCount: 28,
  },
  // Capsules
  ...[
    { id: 'capsule-32', title: 'Capsule N°32', year: '2023', subtitle: 'Journal interne SOBRAGA — Édition spéciale performance industrielle' },
    { id: 'capsule-30', title: 'Capsule N°30', year: '2022', subtitle: 'Prix Qualité Performance & nouveaux lancements' },
    { id: 'capsule-29', title: 'Capsule N°29', year: '2022', subtitle: 'Vie des sites & développement durable' },
    { id: 'capsule-25', title: 'Capsule N°25', year: '2021', subtitle: 'Mobilisation citoyenne & innovations' },
    { id: 'capsule-24', title: 'Capsule N°24', year: '2021', subtitle: 'Qualité et sécurité sur nos lignes' },
    { id: 'capsule-23', title: 'Capsule N°23', year: '2020', subtitle: 'Solidarité et continuité opérationnelle' },
    { id: 'capsule-21', title: 'Capsule N°21', year: '2020', subtitle: 'Culture d’entreprise & talents' },
    { id: 'capsule-20', title: 'Capsule N°20', year: '2019', subtitle: 'Modernisation des usines' },
    { id: 'capsule-19', title: 'Capsule N°19', year: '2019', subtitle: 'Engagement RSE & environnement' },
    { id: 'capsule-18', title: 'Capsule N°18', year: '2019', subtitle: 'Focus logistique et distribution' },
    { id: 'capsule-17', title: 'Capsule N°17', year: '2018', subtitle: 'Lancement World Cola & Top' },
    { id: 'capsule-16', title: 'Capsule N°16', year: '2018', subtitle: 'Vie des brasseries du Gabon' },
    { id: 'capsule-15', title: 'Capsule N°15', year: '2018', subtitle: 'Certification & laboratoires' },
    { id: 'capsule-14', title: 'Capsule N°14', year: '2017', subtitle: 'Rétrospective annuelle' },
    { id: 'capsule-13', title: 'Capsule N°13', year: '2017', subtitle: 'Portraits de collaborateurs' },
    { id: 'ca-decapsule-2', title: 'Ça Décapsule N°2', year: '2026', subtitle: 'Spécial 60 ans & Horizon 2028' },
    { id: 'ca-decapsule-1', title: 'Ça Décapsule N°1', year: '2026', subtitle: 'Nouvelle ère Les Boissons du Gabon' },
    { id: 'capsule-12', title: 'Capsule N°12', year: '2016', subtitle: 'Lancement de l’eau de source Akewa' },
  ].map((c) => ({
    ...c,
    category: 'capsule' as const,
    summary: `${c.title} (${c.year}) — Magazine interne des équipes SOBRAGA retraçant la vie des usines, les réussites collectives et les projets phares.`,
    highlights: [
      'Éditorial de la Direction Générale',
      'Zoom sur les sites d’Owendo, Port-Gentil, Franceville, Oyem et Mouila',
      'Portraits métiers & initiatives QSSE',
    ],
    pagesCount: 16,
  })),
  // ESBIDJINEWS
  ...[
    { id: 'esbidji-oct-2026', title: 'ESBIDJINEWS OCTOBRE 2026', year: '2026' },
    { id: 'esbidji-aout-2026', title: 'ESBIDJINEWS Août 2026', year: '2026' },
    { id: 'esbidji-juil-2026', title: 'ESBIDJINEWS Juillet 2026', year: '2026' },
    { id: 'esbidji-juin-2026', title: 'ESBIDJINEWS Juin 2026', year: '2026' },
    { id: 'esbidji-mai-2026', title: 'ESBIDJINEWS Mai 2026', year: '2026' },
    { id: 'esbidji-avr-2026', title: 'ESBIDJINEWS Avril 2026', year: '2026' },
    { id: 'esbidji-mars-2026', title: 'ESBIDJINEWS Mars 2026', year: '2026' },
    { id: 'esbidji-fev-2026', title: 'ESBIDJINEWS Février 2026', year: '2026' },
    { id: 'esbidji-jan-2026', title: 'ESBIDJINEWS Janvier 2026', year: '2026' },
    { id: 'esbidji-dec-2025', title: 'ESBIDJINEWS Décembre 2025', year: '2025' },
    { id: 'esbidji-nov-2025', title: 'ESBIDJINEWS Novembre 2025', year: '2025' },
    { id: 'esbidji-oct-2025', title: 'ESBIDJINEWS Octobre 2025', year: '2025' },
    { id: 'esbidji-sep-2025', title: 'ESBIDJINEWS Septembre 2025', year: '2025' },
    { id: 'esbidji-aout-2025', title: 'ESBIDJINEWS Août 2025', year: '2025' },
    { id: 'esbidji-juil-2025', title: 'ESBIDJINEWS Juillet 2025', year: '2025' },
    { id: 'esbidji-juin-2025', title: 'ESBIDJINEWS Juin 2025', year: '2025' },
    { id: 'esbidji-dec-2024', title: 'ESBIDJINEWS Décembre 2024', year: '2024' },
    { id: 'esbidji-juin-2024', title: 'ESBIDJINEWS Juin 2024', year: '2024' },
    { id: 'esbidji-dec-2023', title: 'ESBIDJINEWS Décembre 2023', year: '2023' },
    { id: 'esbidji-dec-2022', title: 'ESBIDJINEWS Décembre 2022', year: '2022' },
    { id: 'esbidji-dec-2021', title: 'ESBIDJINEWS Décembre 2021', year: '2021' },
    { id: 'esbidji-mars-2020', title: 'ESBIDJINEWS Mars 2020', year: '2020' },
  ].map((e) => ({
    ...e,
    category: 'esbidjinews' as const,
    subtitle: 'Newsletter mensuelle de la Société des Boissons Rafraîchissantes du Gabon',
    summary: `${e.title} — Synthèse mensuelle des actualités commerciales, campagnes marques, actions RSE et temps forts des équipes SOBRAGA.`,
    highlights: [
      'Temps forts commerciaux et nouveautés produits',
      'Actions citoyennes, sportives et environnementales',
      'Vie des équipes et sécurité au travail',
    ],
    pagesCount: 8,
  })),
  // RSE Reports
  {
    id: 'rapport-rse-2024',
    title: 'RAPPORT RSE 2024',
    category: 'rse',
    year: '2024',
    subtitle: 'Bilan extra-financier & développement durable SOBRAGA',
    summary: 'Rapport complet détaillant les résultats 2024 sur les 6 piliers RSE du Groupe Castel et les 8 ODD prioritaires au Gabon.',
    highlights: [
      'Mise en œuvre de la station de réutilisation des eaux (RE-USE)',
      'Collecte et valorisation des emballages PET',
      'Programmes de formation continue pour 2 000 collaborateurs',
      'Actions de mécénat santé, éducation et sport',
    ],
    pagesCount: 44,
  },
  {
    id: 'rapport-rse-2021-2022',
    title: 'Rapport RSE 2021-2022',
    category: 'rse',
    year: '2022',
    subtitle: 'Engagement durable & impact territorial',
    summary: 'Bilan bisannuel des engagements sociaux, environnementaux et sociétaux de SOBRAGA sur l’ensemble de ses sites.',
    highlights: ['Réduction de l’empreinte énergétique', 'Appui aux filières locales', 'Sécurité routière « La Vie »'],
    pagesCount: 38,
  },
  {
    id: 'rapport-rse-2020',
    title: 'Rapport RSE 2020',
    category: 'rse',
    year: '2020',
    subtitle: 'Résilience et solidarité sanitaire',
    summary: 'Actions de soutien aux communautés gabonaises et maintien de la sécurité sanitaire sur les lignes de production.',
    highlights: ['Soutien aux hôpitaux et collectivités', 'Protection des équipes', 'Gestion responsable de l’eau'],
    pagesCount: 32,
  },
  {
    id: 'rapport-rse-2019',
    title: 'Rapport RSE 2019',
    category: 'rse',
    year: '2019',
    subtitle: 'Performance environnementale & dialogue local',
    summary: 'Présentation des indicateurs environnementaux et des partenariats associatifs menés en 2019.',
    highlights: ['Tri et recyclage industriel', 'Partenariats associatifs', 'Formation sécurité'],
    pagesCount: 30,
  },
  {
    id: 'rapport-rse-2017-2018',
    title: 'Rapport RSE 2017-2018',
    category: 'rse',
    year: '2018',
    subtitle: 'Première édition consolidée Castel Gabon',
    summary: 'Fondation du reporting RSE structuré autour des Objectifs de Développement Durable de l’ONU.',
    highlights: ['Cartographie des parties prenantes', 'Normes ISO 9001 et FSSC 22 000', 'Mécénat culturel et sportif'],
    pagesCount: 28,
  },
];

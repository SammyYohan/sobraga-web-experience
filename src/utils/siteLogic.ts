import {
  DOCUMENTS,
  DocumentItem,
  NEWS_ARTICLES,
  NewsArticle,
  PRODUCTS,
  ProductCategoryId,
  ProductItem,
  WINES,
  WineCategoryId,
  WineItem,
} from '../data/siteData';

function foldText(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function filterProducts(
  category: ProductCategoryId | string,
  query: string = '',
  productList: ProductItem[] = PRODUCTS
): ProductItem[] {
  const normalizedCat = category && category !== 'all' ? category : 'all';
  const q = foldText(query.trim());
  return productList.filter((p) => {
    const matchCat = normalizedCat === 'all' || p.category === normalizedCat;
    const matchQuery =
      !q ||
      foldText(p.name).includes(q) ||
      foldText(p.description).includes(q) ||
      foldText(p.categoryLabel).includes(q) ||
      foldText(p.type).includes(q);
    return matchCat && matchQuery;
  });
}

export function filterWines(category: WineCategoryId | string, wineList: WineItem[] = WINES): WineItem[] {
  if (!category || category === 'all') return wineList;
  return wineList.filter((w) => w.category === category);
}

export interface SearchResults {
  products: ProductItem[];
  articles: NewsArticle[];
  wines: WineItem[];
  documents: DocumentItem[];
  total: number;
}

export function searchSite(
  rawQuery: string,
  customData?: {
    products?: ProductItem[];
    articles?: NewsArticle[];
    wines?: WineItem[];
    documents?: DocumentItem[];
  }
): SearchResults {
  const q = foldText(rawQuery.trim());
  if (!q) {
    return { products: [], articles: [], wines: [], documents: [], total: 0 };
  }
  const sourceProducts = customData?.products || PRODUCTS;
  const sourceArticles = customData?.articles || NEWS_ARTICLES;
  const sourceWines = customData?.wines || WINES;
  const sourceDocuments = customData?.documents || DOCUMENTS;

  const products = sourceProducts.filter(
    (p) =>
      foldText(p.name).includes(q) ||
      foldText(p.description).includes(q) ||
      foldText(p.categoryLabel).includes(q) ||
      foldText(p.ingredients).includes(q)
  );
  const articles = sourceArticles.filter(
    (a) =>
      foldText(a.title).includes(q) ||
      foldText(a.excerpt).includes(q) ||
      foldText(a.tag).includes(q) ||
      a.paragraphs.some((p) => foldText(p).includes(q))
  );
  const wines = sourceWines.filter(
    (w) =>
      foldText(w.name).includes(q) ||
      foldText(w.appellation).includes(q) ||
      foldText(w.categoryLabel).includes(q) ||
      foldText(w.description).includes(q)
  );
  const documents = sourceDocuments.filter(
    (d) =>
      foldText(d.title).includes(q) ||
      foldText(d.summary).includes(q) ||
      (d.subtitle && foldText(d.subtitle).includes(q)) ||
      d.highlights.some((h) => foldText(h).includes(q))
  );
  return {
    products,
    articles,
    wines,
    documents,
    total: products.length + articles.length + wines.length + documents.length,
  };
}

export interface ContactFormInput {
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  message: string;
  requireFiles?: boolean;
  cvName?: string;
  lettreName?: string;
}

export interface FormValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(input: ContactFormInput): FormValidationResult {
  const errors: Record<string, string> = {};

  if (!input.nom.trim()) errors.nom = 'Le nom est requis.';
  if (!input.prenom.trim()) errors.prenom = 'Le prénom est requis.';
  if (!input.email.trim()) {
    errors.email = "L'adresse email est requise.";
  } else if (!EMAIL_RE.test(input.email.trim())) {
    errors.email = "Format d'adresse email invalide.";
  }
  const phoneDigits = input.telephone.replace(/[^\d+]/g, '');
  if (!phoneDigits || phoneDigits.length < 7) {
    errors.telephone = 'Numéro de téléphone invalide (minimum 7 chiffres).';
  }
  if (!input.message.trim() || input.message.trim().length < 5) {
    errors.message = 'Veuillez saisir un message (minimum 5 caractères).';
  }

  if (input.requireFiles) {
    if (!input.cvName) errors.cv = 'Veuillez joindre votre CV.';
    if (!input.lettreName) errors.lettre = 'Veuillez joindre votre lettre de motivation.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function paginateArticles(articles: NewsArticle[], page: number, perPage: number = 6) {
  const totalPages = Math.max(1, Math.ceil(articles.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: articles.slice(start, start + perPage),
    page: safePage,
    totalPages,
  };
}

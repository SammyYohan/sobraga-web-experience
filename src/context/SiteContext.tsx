import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  NEWS_ARTICLES,
  PRODUCTS,
  DOCUMENTS,
  WINES,
  NewsArticle,
  ProductItem,
  DocumentItem,
  WineItem,
  SITE_ASSETS,
} from '../data/siteData';

export interface JobOffer {
  id: string;
  title: string;
  department: string;
  location: string;
  contractType: string;
  publishedDate: string;
  active: boolean;
  description: string;
  requirements: string[];
}

export const DEFAULT_JOB_OFFERS: JobOffer[] = [
  {
    id: 'job-qualite-owendo',
    title: 'Responsable Contrôle Qualité Brasserie',
    department: 'Direction Qualité & Laboratoire',
    location: 'Usine d’Owendo (Libreville)',
    contractType: 'CDI',
    publishedDate: '10 Novembre 2026',
    active: true,
    description: 'Superviser les protocoles d’analyse physico-chimique et microbiologique selon les normes ISO 9001 et FSSC 22000.',
    requirements: ['Bac+5 en biochimie, agroalimentaire ou chimie', 'Minimum 5 ans d’expérience en industrie brassicole ou boisson', 'Rigueur méthodologique et maîtrise des audits HACCP'],
  },
  {
    id: 'job-maintenance-pog',
    title: 'Technicien Électromécanicien Lignes d’Embouteillage',
    department: 'Direction Industrielle',
    location: 'Usine de Port-Gentil',
    contractType: 'CDI',
    publishedDate: '04 Novembre 2026',
    active: true,
    description: 'Maintenance préventive et corrective des laveuses, soutireuses et capsuleuses à haute cadence (cols verre et PET).',
    requirements: ['Bac+2/3 en maintenance industrielle ou électromécanique', '3 ans d’expérience sur lignes grande vitesse', 'Disponibilité en travail posté'],
  },
  {
    id: 'job-commercial-gabon',
    title: 'Délégué Commercial Réseau Grossistes',
    department: 'Direction Commerciale & Marketing',
    location: 'Franceville / Haut-Ogooué',
    contractType: 'CDI',
    publishedDate: '28 Octobre 2026',
    active: true,
    description: 'Développer le portefeuille de dépôts grossistes partenaires et veiller au respect des prix homologués dans les points de vente.',
    requirements: ['Formation commerciale supérieure', 'Connaissance approfondie du marché provincial', 'Permis de conduire B obligatoire'],
  },
];

const STORAGE_KEYS = {
  ARTICLES: 'sobraga_cms_articles_v2',
  PRODUCTS: 'sobraga_cms_products_v2',
  DOCUMENTS: 'sobraga_cms_documents_v2',
  WINES: 'sobraga_cms_wines_v2',
  CAREERS: 'sobraga_cms_careers_v2',
  AUTH: 'sobraga_cms_admin_auth_v1',
};

interface SiteContextType {
  articles: NewsArticle[];
  products: ProductItem[];
  documents: DocumentItem[];
  wines: WineItem[];
  jobOffers: JobOffer[];
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  // Article actions
  addArticle: (article: Omit<NewsArticle, 'slug'> & { slug?: string }) => void;
  updateArticle: (slug: string, updated: Partial<NewsArticle>) => void;
  deleteArticle: (slug: string) => void;
  // Pricing & Product actions
  updateHomologatedPriceList: (documentId: string, newHighlights: string[]) => void;
  updateProductPrice: (slug: string, newPrice: string) => void;
  // Careers actions
  addJobOffer: (offer: Omit<JobOffer, 'id'>) => void;
  updateJobOffer: (id: string, updated: Partial<JobOffer>) => void;
  deleteJobOffer: (id: string) => void;
  toggleJobOfferStatus: (id: string) => void;
  // Backup & Reset
  resetToDefaults: () => void;
  exportBackup: () => void;
  importBackup: (jsonContent: string) => boolean;
}

const SiteContext = createContext<SiteContextType | null>(null);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[SOBRAGA CMS] Could not save to localStorage: ${key}`, err);
  }
}

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(() =>
    loadFromStorage(STORAGE_KEYS.ARTICLES, NEWS_ARTICLES)
  );
  const [products, setProducts] = useState<ProductItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.PRODUCTS, PRODUCTS)
  );
  const [documents, setDocuments] = useState<DocumentItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.DOCUMENTS, DOCUMENTS)
  );
  const [wines, setWines] = useState<WineItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.WINES, WINES)
  );
  const [jobOffers, setJobOffers] = useState<JobOffer[]>(() =>
    loadFromStorage(STORAGE_KEYS.CAREERS, DEFAULT_JOB_OFFERS)
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ARTICLES, articles);
  }, [articles]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.DOCUMENTS, documents);
  }, [documents]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WINES, wines);
  }, [wines]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CAREERS, jobOffers);
  }, [jobOffers]);

  // Auth
  const loginAdmin = useCallback((passcode: string): boolean => {
    // Official SOBRAGA demo passcode (flexible for presentation)
    const validCodes = ['sobraga2026', 'sobraga', 'castel2026', 'admin'];
    if (validCodes.includes(passcode.trim().toLowerCase())) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } catch {}
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch {}
  }, []);

  // Articles
  const addArticle = useCallback((newArt: Omit<NewsArticle, 'slug'> & { slug?: string }) => {
    const generatedSlug =
      newArt.slug ||
      newArt.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') ||
      `article-${Date.now()}`;

    const created: NewsArticle = {
      ...newArt,
      slug: generatedSlug,
      bannerImage: newArt.bannerImage || SITE_ASSETS.heroProduction,
      accentColor: newArt.accentColor || '#7D0000',
    };

    setArticles((prev) => [created, ...prev]);
  }, []);

  const updateArticle = useCallback((slug: string, updated: Partial<NewsArticle>) => {
    setArticles((prev) =>
      prev.map((art) => (art.slug === slug ? { ...art, ...updated } : art))
    );
  }, []);

  const deleteArticle = useCallback((slug: string) => {
    setArticles((prev) => prev.filter((art) => art.slug !== slug));
  }, []);

  // Pricing & Products
  const updateHomologatedPriceList = useCallback((documentId: string, newHighlights: string[]) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId ? { ...doc, highlights: newHighlights } : doc
      )
    );
  }, []);

  const updateProductPrice = useCallback((slug: string, newPrice: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, price: newPrice, badgeText: newPrice.split(' ')[0] } : p))
    );
  }, []);

  // Careers
  const addJobOffer = useCallback((offer: Omit<JobOffer, 'id'>) => {
    const newOffer: JobOffer = {
      ...offer,
      id: `job-${Date.now()}`,
    };
    setJobOffers((prev) => [newOffer, ...prev]);
  }, []);

  const updateJobOffer = useCallback((id: string, updated: Partial<JobOffer>) => {
    setJobOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...updated } : o))
    );
  }, []);

  const deleteJobOffer = useCallback((id: string) => {
    setJobOffers((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const toggleJobOfferStatus = useCallback((id: string) => {
    setJobOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
    );
  }, []);

  // Backup & Reset
  const resetToDefaults = useCallback(() => {
    setArticles(NEWS_ARTICLES);
    setProducts(PRODUCTS);
    setDocuments(DOCUMENTS);
    setWines(WINES);
    setJobOffers(DEFAULT_JOB_OFFERS);
    Object.values(STORAGE_KEYS).forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {}
    });
  }, []);

  const exportBackup = useCallback(() => {
    const backupData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      articles,
      products,
      documents,
      wines,
      jobOffers,
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sobraga-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [articles, products, documents, wines, jobOffers]);

  const importBackup = useCallback((jsonContent: string): boolean => {
    try {
      const parsed = JSON.parse(jsonContent);
      if (Array.isArray(parsed.articles)) setArticles(parsed.articles);
      if (Array.isArray(parsed.products)) setProducts(parsed.products);
      if (Array.isArray(parsed.documents)) setDocuments(parsed.documents);
      if (Array.isArray(parsed.wines)) setWines(parsed.wines);
      if (Array.isArray(parsed.jobOffers)) setJobOffers(parsed.jobOffers);
      return true;
    } catch (err) {
      console.error('[SOBRAGA CMS] Erreur lors de l’import JSON :', err);
      return false;
    }
  }, []);

  return (
    <SiteContext.Provider
      value={{
        articles,
        products,
        documents,
        wines,
        jobOffers,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addArticle,
        updateArticle,
        deleteArticle,
        updateHomologatedPriceList,
        updateProductPrice,
        addJobOffer,
        updateJobOffer,
        deleteJobOffer,
        toggleJobOfferStatus,
        resetToDefaults,
        exportBackup,
        importBackup,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export function useSiteData(): SiteContextType {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return ctx;
}

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

export type EmployeeRole =
  | 'super-admin'
  | 'communication'
  | 'commercial'
  | 'drh'
  | 'qualite';

export interface RoleProfile {
  id: EmployeeRole;
  name: string;
  title: string;
  department: string;
  avatarInitials: string;
  badgeColor: string;
  allowedTabs: string[];
}

export const ROLE_PROFILES: Record<EmployeeRole, RoleProfile> = {
  'super-admin': {
    id: 'super-admin',
    name: 'Direction Générale',
    title: 'Super Administrateur Groupe',
    department: 'Direction Générale SOBRAGA / Castel',
    avatarInitials: 'DG',
    badgeColor: '#7D0000',
    allowedTabs: ['articles', 'prix', 'docutheque', 'recrutement', 'reclamations', 'taches', 'roles_backup'],
  },
  communication: {
    id: 'communication',
    name: 'Edna KENGUE',
    title: 'Directrice de la Communication & RSE',
    department: 'Direction Communication & RSE',
    avatarInitials: 'EK',
    badgeColor: '#9E0B0F',
    allowedTabs: ['articles', 'docutheque', 'reclamations', 'taches'],
  },
  commercial: {
    id: 'commercial',
    name: 'Cédric Léandre RÉKOULA',
    title: 'Directeur Commercial & Marketing',
    department: 'Direction Commerciale & Marketing',
    avatarInitials: 'CR',
    badgeColor: '#D97706',
    allowedTabs: ['prix', 'reclamations', 'taches'],
  },
  drh: {
    id: 'drh',
    name: 'Direction RH',
    title: 'Responsable Recrutement & Talents',
    department: 'Direction des Ressources Humaines',
    avatarInitials: 'RH',
    badgeColor: '#2563EB',
    allowedTabs: ['recrutement', 'taches'],
  },
  qualite: {
    id: 'qualite',
    name: 'Direction Qualité & Labo',
    title: 'Responsable Assurance Qualité & Sécurité',
    department: 'Direction Industrielle & Laboratoire',
    avatarInitials: 'QL',
    badgeColor: '#059669',
    allowedTabs: ['docutheque', 'reclamations', 'taches'],
  },
};

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

export interface JobApplication {
  id: string;
  jobTitle: string;
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  cvName: string;
  lettreName: string;
  message: string;
  date: string;
  status: 'recue' | 'examen' | 'entretien' | 'retenu' | 'archive';
  internalNotes?: string;
}

export interface ContactMessage {
  id: string;
  reference: string;
  type: 'infos' | 'reclamation';
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  produitConcerne?: string;
  message: string;
  date: string;
  status: 'nouveau' | 'en_cours' | 'resolu';
  assignedSite?: string;
  resolutionNote?: string;
}

export interface TeamTask {
  id: string;
  title: string;
  department: 'Direction Générale' | 'Communication & RSE' | 'Commercial & Marketing' | 'Ressources Humaines' | 'Qualité & Labo';
  assignedTo: string;
  dueDate: string;
  priority: 'urgente' | 'haute' | 'normale';
  completed: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  role: string;
  action: string;
  details: string;
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

export const DEFAULT_JOB_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-001',
    jobTitle: 'Technicien Électromécanicien Lignes d’Embouteillage',
    civilite: 'M.',
    nom: 'Mba',
    prenom: 'Jean-Paul',
    email: 'jp.mba@gmail.com',
    telephone: '+241 77 45 12 89',
    cvName: 'CV_Jean_Paul_Mba_Electromec.pdf',
    lettreName: 'Lettre_Motivation_Mba.pdf',
    message: 'Ayant 4 ans d’expérience en maintenance de lignes de conditionnement à Port-Gentil, je souhaite intégrer vos brasseries.',
    date: '14 Novembre 2026',
    status: 'entretien',
    internalNotes: 'Profil technique très solide. Convoqué pour entretien usine POG le 22/11.',
  },
  {
    id: 'app-002',
    jobTitle: 'Responsable Contrôle Qualité Brasserie',
    civilite: 'Mme.',
    nom: 'Obiang',
    prenom: 'Sandrine',
    email: 'sandrine.obiang@yahoo.fr',
    telephone: '+241 66 18 90 23',
    cvName: 'CV_Sandrine_Obiang_Biochimie.pdf',
    lettreName: 'Lettre_Motivation_Obiang.pdf',
    message: 'Diplômée en sciences agroalimentaires avec expérience en audit ISO 9001, je serais honorée de servir la SOBRAGA.',
    date: '12 Novembre 2026',
    status: 'examen',
    internalNotes: 'Dossier transmis au Dr. Nguema pour avis technique.',
  },
  {
    id: 'app-003',
    jobTitle: 'Candidature Spontanée (Marketing Digital)',
    civilite: 'M.',
    nom: 'Ossoriah',
    prenom: 'Sammy Yohan',
    email: 'sammy.ossoriah@gmail.com',
    telephone: '+241 62 93 34 39',
    cvName: 'CV_Sammy_Yohan_WebDev.pdf',
    lettreName: 'Proposition_Vision_Digitale_Sobraga.pdf',
    message: 'Proposition d’une refonte moderne ultra-performante et d’un back-office sur mesure pour l’expérience SOBRAGA.',
    date: '18 Novembre 2026',
    status: 'retenu',
    internalNotes: 'Candidat retenu pour présentation démo prototype auprès de la Dir. Communication.',
  },
];

export const DEFAULT_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-001',
    reference: 'SBG-782190',
    type: 'reclamation',
    civilite: 'M.',
    nom: 'Bivigou',
    prenom: 'Christian',
    email: 'c.bivigou@live.fr',
    telephone: '+241 65 30 11 44',
    produitConcerne: 'REGAB',
    message: 'Casier de Régab 65cl acheté chez un grossiste à Oloumi, lot LBV-412. Une capsule présentait un défaut d’étanchéité.',
    date: '17 Novembre 2026',
    status: 'en_cours',
    assignedSite: 'Usine d’Owendo (Libreville)',
    resolutionNote: 'Lot vérifié en laboratoire. Remplacement du casier convenu avec le client.',
  },
  {
    id: 'msg-002',
    reference: 'SBG-940122',
    type: 'infos',
    civilite: 'Mme.',
    nom: 'Kombila',
    prenom: 'Prisca',
    email: 'prisca.kombila@ent-gabon.ga',
    telephone: '+241 74 99 21 00',
    produitConcerne: 'SOVINGAB / VINS',
    message: 'Bonjour, notre entreprise organise une réception de fin d’année. Est-il possible d’avoir une dégustation et un devis grands crus Sovingab ?',
    date: '16 Novembre 2026',
    status: 'nouveau',
    assignedSite: 'Cave Sovingab Libreville',
  },
  {
    id: 'msg-003',
    reference: 'SBG-331908',
    type: 'infos',
    civilite: 'M.',
    nom: 'Ndong',
    prenom: 'Marc',
    email: 'mndong@ong-recup.org',
    telephone: '+241 66 50 82 17',
    produitConcerne: 'RSE / RECYCLAGE',
    message: 'Proposition de partenariat citoyen avec notre ONG locale pour la collecte et le recyclage des bouteilles PET dans le Grand Libreville.',
    date: '11 Novembre 2026',
    status: 'resolu',
    assignedSite: 'Direction RSE',
    resolutionNote: 'Rendez-vous tenu le 15/11 avec Mme Edna Kengue. Projet intégré à la tournée éco-citoyenne 2026.',
  },
];

export const DEFAULT_TEAM_TASKS: TeamTask[] = [
  {
    id: 'task-1',
    title: 'Validation finale du communiqué de presse officiel pour les 60 ans à Owendo',
    department: 'Communication & RSE',
    assignedTo: 'Edna KENGUE',
    dueDate: '20 Nov 2026',
    priority: 'urgente',
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Actualisation de la grille des prix homologués suite à l’arrêté consigne verre (Régab 600 FCFA)',
    department: 'Commercial & Marketing',
    assignedTo: 'Cédric Léandre RÉKOULA',
    dueDate: '19 Nov 2026',
    priority: 'urgente',
    completed: true,
  },
  {
    id: 'task-3',
    title: 'Planification des entretiens pour le poste Technicien Électromécanicien POG',
    department: 'Ressources Humaines',
    assignedTo: 'Direction RH',
    dueDate: '22 Nov 2026',
    priority: 'haute',
    completed: false,
  },
  {
    id: 'task-4',
    title: 'Audit qualité préventif sur les lignes d’embouteillage PET usine de Franceville',
    department: 'Qualité & Labo',
    assignedTo: 'Dr. Nguema (Labo)',
    dueDate: '25 Nov 2026',
    priority: 'normale',
    completed: false,
  },
  {
    id: 'task-5',
    title: 'Publication du nouveau numéro trimestriel ESBIDJINEWS spécial fin d’année',
    department: 'Communication & RSE',
    assignedTo: 'Équipe Rédaction',
    dueDate: '28 Nov 2026',
    priority: 'haute',
    completed: false,
  },
];

export const DEFAULT_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '18/11/2026 18:32',
    userName: 'Cédric Léandre RÉKOULA',
    role: 'Commercial & Marketing',
    action: 'Tarification',
    details: 'Mise à jour du prix homologué Régab 65 cl à 600 FCFA.',
  },
  {
    id: 'log-2',
    timestamp: '18/11/2026 17:45',
    userName: 'Edna KENGUE',
    role: 'Communication & RSE',
    action: 'Publication Article',
    details: 'Article publié : "Célébration des 60 ans de SOBRAGA au service du Gabon".',
  },
  {
    id: 'log-3',
    timestamp: '17/11/2026 14:10',
    userName: 'Direction RH',
    role: 'Ressources Humaines',
    action: 'Statut Candidature',
    details: 'Candidature Jean-Paul Mba passée au statut "Entretien".',
  },
  {
    id: 'log-4',
    timestamp: '17/11/2026 11:20',
    userName: 'Dr. Nguema',
    role: 'Qualité & Labo',
    action: 'Réclamation Produit',
    details: 'Prise en charge du ticket SBG-782190 (Lot Owendo LBV-412).',
  },
];

const STORAGE_KEYS = {
  ARTICLES: 'sobraga_cms_articles_v3',
  PRODUCTS: 'sobraga_cms_products_v3',
  DOCUMENTS: 'sobraga_cms_documents_v3',
  WINES: 'sobraga_cms_wines_v3',
  CAREERS: 'sobraga_cms_careers_v3',
  APPLICATIONS: 'sobraga_cms_applications_v3',
  MESSAGES: 'sobraga_cms_messages_v3',
  TASKS: 'sobraga_cms_tasks_v3',
  LOGS: 'sobraga_cms_logs_v3',
  AUTH: 'sobraga_cms_admin_auth_v3',
  ACTIVE_ROLE: 'sobraga_cms_active_role_v3',
};

interface SiteContextType {
  // Public data
  articles: NewsArticle[];
  products: ProductItem[];
  documents: DocumentItem[];
  wines: WineItem[];
  jobOffers: JobOffer[];
  jobApplications: JobApplication[];
  contactMessages: ContactMessage[];
  teamTasks: TeamTask[];
  auditLogs: AuditLogEntry[];

  // Roles & Auth
  activeRole: EmployeeRole;
  setActiveRole: (role: EmployeeRole) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string, role?: EmployeeRole) => boolean;
  logoutAdmin: () => void;

  // Article actions
  addArticle: (article: Omit<NewsArticle, 'slug'> & { slug?: string }) => void;
  updateArticle: (slug: string, updated: Partial<NewsArticle>) => void;
  deleteArticle: (slug: string) => void;

  // Pricing & Product actions
  updateHomologatedPriceList: (documentId: string, newHighlights: string[]) => void;
  updateProductPrice: (slug: string, newPrice: string) => void;

  // Document actions (Docuthèque, ESBIDJINEWS, RSE)
  addDocument: (doc: Omit<DocumentItem, 'id'>) => void;
  updateDocument: (id: string, updated: Partial<DocumentItem>) => void;
  deleteDocument: (id: string) => void;

  // Careers actions
  addJobOffer: (offer: Omit<JobOffer, 'id'>) => void;
  updateJobOffer: (id: string, updated: Partial<JobOffer>) => void;
  deleteJobOffer: (id: string) => void;
  toggleJobOfferStatus: (id: string) => void;

  // Applications actions
  addJobApplication: (app: Omit<JobApplication, 'id' | 'date' | 'status'>) => string;
  updateJobApplicationStatus: (id: string, status: JobApplication['status'], internalNotes?: string) => void;
  deleteJobApplication: (id: string) => void;

  // Contact / Complaints actions
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'reference' | 'date' | 'status'>) => string;
  updateContactMessageStatus: (id: string, status: ContactMessage['status'], resolutionNote?: string, assignedSite?: string) => void;
  deleteContactMessage: (id: string) => void;

  // Team Tasks actions
  addTeamTask: (task: Omit<TeamTask, 'id' | 'completed'>) => void;
  toggleTeamTask: (id: string) => void;
  deleteTeamTask: (id: string) => void;

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
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() =>
    loadFromStorage(STORAGE_KEYS.APPLICATIONS, DEFAULT_JOB_APPLICATIONS)
  );
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() =>
    loadFromStorage(STORAGE_KEYS.MESSAGES, DEFAULT_CONTACT_MESSAGES)
  );
  const [teamTasks, setTeamTasks] = useState<TeamTask[]>(() =>
    loadFromStorage(STORAGE_KEYS.TASKS, DEFAULT_TEAM_TASKS)
  );
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() =>
    loadFromStorage(STORAGE_KEYS.LOGS, DEFAULT_AUDIT_LOGS)
  );
  const [activeRole, setActiveRoleState] = useState<EmployeeRole>(() =>
    loadFromStorage(STORAGE_KEYS.ACTIVE_ROLE, 'super-admin')
  );

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Sync to localStorage
  useEffect(() => { saveToStorage(STORAGE_KEYS.ARTICLES, articles); }, [articles]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.PRODUCTS, products); }, [products]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.DOCUMENTS, documents); }, [documents]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.WINES, wines); }, [wines]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.CAREERS, jobOffers); }, [jobOffers]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.APPLICATIONS, jobApplications); }, [jobApplications]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.MESSAGES, contactMessages); }, [contactMessages]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.TASKS, teamTasks); }, [teamTasks]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.LOGS, auditLogs); }, [auditLogs]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.ACTIVE_ROLE, activeRole); }, [activeRole]);

  const setActiveRole = useCallback((role: EmployeeRole) => {
    setActiveRoleState(role);
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, JSON.stringify(role));
    } catch {}
  }, []);

  // Helper to log audit actions
  const logAction = useCallback((action: string, details: string) => {
    const profile = ROLE_PROFILES[activeRole] || ROLE_PROFILES['super-admin'];
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      userName: profile.name,
      role: profile.department,
      action,
      details,
    };
    setAuditLogs((prev) => [newEntry, ...prev.slice(0, 49)]); // keep 50 recent
  }, [activeRole]);

  // Auth
  const loginAdmin = useCallback((passcode: string, role?: EmployeeRole): boolean => {
    const validCodes = ['sobraga2026', 'sobraga', 'castel2026', 'admin', 'libreville'];
    if (validCodes.includes(passcode.trim().toLowerCase())) {
      setIsAdminAuthenticated(true);
      if (role) setActiveRole(role);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } catch {}
      logAction('Connexion', 'Session ouverte sur SOBRAGA Studio');
      return true;
    }
    return false;
  }, [logAction, setActiveRole]);

  const logoutAdmin = useCallback(() => {
    logAction('Déconnexion', 'Clôture de la session studio');
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch {}
  }, [logAction]);

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
    logAction('Création Article', `Publication de : « ${newArt.title} »`);
  }, [logAction]);

  const updateArticle = useCallback((slug: string, updated: Partial<NewsArticle>) => {
    setArticles((prev) =>
      prev.map((art) => (art.slug === slug ? { ...art, ...updated } : art))
    );
    logAction('Modification Article', `Mise à jour de : « ${updated.title || slug} »`);
  }, [logAction]);

  const deleteArticle = useCallback((slug: string) => {
    setArticles((prev) => prev.filter((art) => art.slug !== slug));
    logAction('Suppression Article', `Suppression de l'article : ${slug}`);
  }, [logAction]);

  // Pricing & Products
  const updateHomologatedPriceList = useCallback((documentId: string, newHighlights: string[]) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId ? { ...doc, highlights: newHighlights } : doc
      )
    );
    logAction('Tarification Homologuée', `Actualisation de la grille officielle ${documentId}`);
  }, [logAction]);

  const updateProductPrice = useCallback((slug: string, newPrice: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, price: newPrice, badgeText: newPrice.split(' ')[0] } : p))
    );
    logAction('Prix Produit', `Ajustement tarifaire pour ${slug} : ${newPrice}`);
  }, [logAction]);

  // Documents (Docuthèque, ESBIDJINEWS, RSE)
  const addDocument = useCallback((doc: Omit<DocumentItem, 'id'>) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${doc.category}-${Date.now()}`,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    logAction('Docuthèque', `Ajout du document : « ${doc.title} » (${doc.category})`);
  }, [logAction]);

  const updateDocument = useCallback((id: string, updated: Partial<DocumentItem>) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    );
    logAction('Docuthèque', `Modification du document : ${id}`);
  }, [logAction]);

  const deleteDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    logAction('Docuthèque', `Suppression du document : ${id}`);
  }, [logAction]);

  // Careers
  const addJobOffer = useCallback((offer: Omit<JobOffer, 'id'>) => {
    const newOffer: JobOffer = {
      ...offer,
      id: `job-${Date.now()}`,
    };
    setJobOffers((prev) => [newOffer, ...prev]);
    logAction('Recrutement', `Ouverture de poste : « ${offer.title} » (${offer.location})`);
  }, [logAction]);

  const updateJobOffer = useCallback((id: string, updated: Partial<JobOffer>) => {
    setJobOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...updated } : o))
    );
    logAction('Recrutement', `Mise à jour du poste : ${id}`);
  }, [logAction]);

  const deleteJobOffer = useCallback((id: string) => {
    setJobOffers((prev) => prev.filter((o) => o.id !== id));
    logAction('Recrutement', `Clôture définitive du poste : ${id}`);
  }, [logAction]);

  const toggleJobOfferStatus = useCallback((id: string) => {
    setJobOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
    );
    logAction('Recrutement', `Changement de statut (actif/fermé) pour poste : ${id}`);
  }, [logAction]);

  // Applications
  const addJobApplication = useCallback((app: Omit<JobApplication, 'id' | 'date' | 'status'>): string => {
    const id = `app-${Date.now()}`;
    const newApp: JobApplication = {
      ...app,
      id,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'recue',
    };
    setJobApplications((prev) => [newApp, ...prev]);
    logAction('Candidature Reçue', `${app.prenom} ${app.nom} pour « ${app.jobTitle} »`);
    return id;
  }, [logAction]);

  const updateJobApplicationStatus = useCallback((
    id: string,
    status: JobApplication['status'],
    internalNotes?: string
  ) => {
    setJobApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, internalNotes: internalNotes ?? a.internalNotes } : a))
    );
    logAction('Statut Candidature', `Candidature ${id} passée au statut : ${status}`);
  }, [logAction]);

  const deleteJobApplication = useCallback((id: string) => {
    setJobApplications((prev) => prev.filter((a) => a.id !== id));
    logAction('Candidature', `Suppression du dossier candidature : ${id}`);
  }, [logAction]);

  // Contact / Complaints
  const addContactMessage = useCallback((msg: Omit<ContactMessage, 'id' | 'reference' | 'date' | 'status'>): string => {
    const id = `msg-${Date.now()}`;
    const reference = `SBG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newMsg: ContactMessage = {
      ...msg,
      id,
      reference,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'nouveau',
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    logAction(
      msg.type === 'reclamation' ? 'Réclamation Consommateur' : 'Demande Information',
      `Réf ${reference} par ${msg.prenom} ${msg.nom} (${msg.produitConcerne || 'Général'})`
    );
    return reference;
  }, [logAction]);

  const updateContactMessageStatus = useCallback((
    id: string,
    status: ContactMessage['status'],
    resolutionNote?: string,
    assignedSite?: string
  ) => {
    setContactMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status,
              resolutionNote: resolutionNote ?? m.resolutionNote,
              assignedSite: assignedSite ?? m.assignedSite,
            }
          : m
      )
    );
    logAction('Suivi Ticket Client', `Message ${id} passé au statut : ${status}`);
  }, [logAction]);

  const deleteContactMessage = useCallback((id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    logAction('Message Client', `Suppression du ticket : ${id}`);
  }, [logAction]);

  // Tasks
  const addTeamTask = useCallback((task: Omit<TeamTask, 'id' | 'completed'>) => {
    const newTask: TeamTask = {
      ...task,
      id: `task-${Date.now()}`,
      completed: false,
    };
    setTeamTasks((prev) => [newTask, ...prev]);
    logAction('Tâche d’équipe', `Nouvelle tâche assignée à ${task.assignedTo} : « ${task.title} »`);
  }, [logAction]);

  const toggleTeamTask = useCallback((id: string) => {
    setTeamTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    logAction('Tâche d’équipe', `Basculement statut tâche : ${id}`);
  }, [logAction]);

  const deleteTeamTask = useCallback((id: string) => {
    setTeamTasks((prev) => prev.filter((t) => t.id !== id));
    logAction('Tâche d’équipe', `Suppression tâche : ${id}`);
  }, [logAction]);

  // Backup & Reset
  const resetToDefaults = useCallback(() => {
    setArticles(NEWS_ARTICLES);
    setProducts(PRODUCTS);
    setDocuments(DOCUMENTS);
    setWines(WINES);
    setJobOffers(DEFAULT_JOB_OFFERS);
    setJobApplications(DEFAULT_JOB_APPLICATIONS);
    setContactMessages(DEFAULT_CONTACT_MESSAGES);
    setTeamTasks(DEFAULT_TEAM_TASKS);
    setAuditLogs(DEFAULT_AUDIT_LOGS);
    Object.values(STORAGE_KEYS).forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {}
    });
    logAction('Restauration', 'Toutes les données ont été réinitialisées aux valeurs officielles');
  }, [logAction]);

  const exportBackup = useCallback(() => {
    const backupData = {
      system: 'SOBRAGA Enterprise Studio',
      version: '3.0',
      timestamp: new Date().toISOString(),
      articles,
      products,
      documents,
      wines,
      jobOffers,
      jobApplications,
      contactMessages,
      teamTasks,
      auditLogs,
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sobraga-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    logAction('Sauvegarde', 'Exportation complète des données en JSON');
  }, [articles, products, documents, wines, jobOffers, jobApplications, contactMessages, teamTasks, auditLogs, logAction]);

  const importBackup = useCallback((jsonContent: string): boolean => {
    try {
      const parsed = JSON.parse(jsonContent);
      if (Array.isArray(parsed.articles)) setArticles(parsed.articles);
      if (Array.isArray(parsed.products)) setProducts(parsed.products);
      if (Array.isArray(parsed.documents)) setDocuments(parsed.documents);
      if (Array.isArray(parsed.wines)) setWines(parsed.wines);
      if (Array.isArray(parsed.jobOffers)) setJobOffers(parsed.jobOffers);
      if (Array.isArray(parsed.jobApplications)) setJobApplications(parsed.jobApplications);
      if (Array.isArray(parsed.contactMessages)) setContactMessages(parsed.contactMessages);
      if (Array.isArray(parsed.teamTasks)) setTeamTasks(parsed.teamTasks);
      if (Array.isArray(parsed.auditLogs)) setAuditLogs(parsed.auditLogs);
      logAction('Restauration', 'Importation et restauration d’une archive JSON réussie');
      return true;
    } catch (err) {
      console.error('[SOBRAGA CMS] Erreur lors de l’import JSON :', err);
      return false;
    }
  }, [logAction]);

  return (
    <SiteContext.Provider
      value={{
        articles,
        products,
        documents,
        wines,
        jobOffers,
        jobApplications,
        contactMessages,
        teamTasks,
        auditLogs,
        activeRole,
        setActiveRole,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addArticle,
        updateArticle,
        deleteArticle,
        updateHomologatedPriceList,
        updateProductPrice,
        addDocument,
        updateDocument,
        deleteDocument,
        addJobOffer,
        updateJobOffer,
        deleteJobOffer,
        toggleJobOfferStatus,
        addJobApplication,
        updateJobApplicationStatus,
        deleteJobApplication,
        addContactMessage,
        updateContactMessageStatus,
        deleteContactMessage,
        addTeamTask,
        toggleTeamTask,
        deleteTeamTask,
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

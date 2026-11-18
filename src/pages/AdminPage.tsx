import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  FileText,
  Tag,
  Briefcase,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  X,
  Search,
  Users,
  MessageSquare,
  CheckSquare,
  ShieldAlert,
  Clock,
  Building2,
  Send,
  UserCheck,
  Check,
} from 'lucide-react';
import {
  useSiteData,
  EmployeeRole,
  ROLE_PROFILES,
  JobOffer,
  JobApplication,
  ContactMessage,
  TeamTask,
} from '../context/SiteContext';
import { SobragaLogo } from '../components/BrandArtwork';
import { NewsArticle, DocumentItem, SITE_ASSETS } from '../data/siteData';

interface AdminPageProps {
  initialTab?: string;
  onNavigate: (path: string) => void;
}

type AdminTab =
  | 'articles'
  | 'prix'
  | 'docutheque'
  | 'recrutement'
  | 'reclamations'
  | 'taches'
  | 'roles_backup';

export const AdminPage: React.FC<AdminPageProps> = ({ initialTab = 'articles', onNavigate }) => {
  const {
    articles,
    products,
    documents,
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
    deleteJobOffer,
    toggleJobOfferStatus,
    updateJobApplicationStatus,
    deleteJobApplication,
    updateContactMessageStatus,
    deleteContactMessage,
    addTeamTask,
    toggleTeamTask,
    deleteTeamTask,
    resetToDefaults,
    exportBackup,
    importBackup,
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<AdminTab>(
    ['articles', 'prix', 'docutheque', 'recrutement', 'reclamations', 'taches', 'roles_backup'].includes(initialTab)
      ? (initialTab as AdminTab)
      : 'articles'
  );

  // Sub-tabs
  const [careerSubTab, setCareerSubTab] = useState<'offres' | 'candidatures'>('offres');
  const [reclamationFilter, setReclamationFilter] = useState<'all' | 'reclamation' | 'infos'>('all');
  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('all');

  // Login form state
  const [passcode, setPasscode] = useState('');
  const [selectedLoginRole, setSelectedLoginRole] = useState<EmployeeRole>('super-admin');
  const [authError, setAuthError] = useState(false);

  // Search queries
  const [articleQuery, setArticleQuery] = useState('');
  const [productQuery, setProductQuery] = useState('');
  const [docQuery, setDocQuery] = useState('');
  const [appQuery, setAppQuery] = useState('');

  // Article Modal State
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticleSlug, setEditingArticleSlug] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    tag: '#SOBRAGA',
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    excerpt: '',
    paragraphs: '',
    bannerImage: SITE_ASSETS.heroProduction,
    accentColor: '#7D0000',
  });

  // Price Modal State
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [priceItemIndex, setPriceItemIndex] = useState<number | null>(null);
  const [priceValue, setPriceValue] = useState('');

  // Career Modal State
  const [careerModalOpen, setCareerModalOpen] = useState(false);
  const [careerForm, setCareerForm] = useState({
    title: '',
    department: 'Direction Industrielle',
    location: 'Usine d’Owendo (Libreville)',
    contractType: 'CDI',
    description: '',
    requirements: '',
  });

  // Document Modal State
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docForm, setDocForm] = useState({
    title: '',
    category: 'esbidjinews' as DocumentItem['category'],
    year: new Date().getFullYear().toString(),
    subtitle: '',
    summary: '',
    highlights: '',
    pagesCount: 8,
  });

  // Task Modal State
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    department: 'Communication & RSE' as TeamTask['department'],
    assignedTo: 'Edna KENGUE',
    dueDate: '25 Nov 2026',
    priority: 'haute' as TeamTask['priority'],
  });

  // Ticket Resolution Modal State
  const [resolvingMessage, setResolvingMessage] = useState<ContactMessage | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [assignedSite, setAssignedSite] = useState('Usine d’Owendo (Libreville)');

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const currentProfile = ROLE_PROFILES[activeRole] || ROLE_PROFILES['super-admin'];

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode, selectedLoginRole);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setPasscode('');
      showToast(`Bienvenue dans SOBRAGA Studio · ${ROLE_PROFILES[selectedLoginRole].name}`);
    }
  };

  // Article Actions
  const openCreateArticle = () => {
    setEditingArticleSlug(null);
    setArticleForm({
      title: '',
      tag: '#SOBRAGA',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      excerpt: '',
      paragraphs: '',
      bannerImage: SITE_ASSETS.heroProduction,
      accentColor: '#7D0000',
    });
    setArticleModalOpen(true);
  };

  const openEditArticle = (art: NewsArticle) => {
    setEditingArticleSlug(art.slug);
    setArticleForm({
      title: art.title,
      tag: art.tag,
      date: art.date,
      excerpt: art.excerpt,
      paragraphs: art.paragraphs.join('\n\n'),
      bannerImage: art.bannerImage,
      accentColor: art.accentColor,
    });
    setArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim()) return;

    const parsedParagraphs = articleForm.paragraphs
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    if (editingArticleSlug) {
      updateArticle(editingArticleSlug, {
        title: articleForm.title.trim(),
        tag: articleForm.tag.trim(),
        date: articleForm.date.trim(),
        excerpt: articleForm.excerpt.trim() || articleForm.title.trim(),
        paragraphs: parsedParagraphs.length > 0 ? parsedParagraphs : [articleForm.excerpt.trim()],
        bannerImage: articleForm.bannerImage,
        accentColor: articleForm.accentColor,
      });
      showToast('Article mis à jour avec succès');
    } else {
      addArticle({
        title: articleForm.title.trim(),
        tag: articleForm.tag.trim(),
        date: articleForm.date.trim(),
        excerpt: articleForm.excerpt.trim() || articleForm.title.trim(),
        paragraphs: parsedParagraphs.length > 0 ? parsedParagraphs : [articleForm.excerpt.trim()],
        bannerImage: articleForm.bannerImage,
        accentColor: articleForm.accentColor,
      });
      showToast('Nouvel article publié en ligne');
    }
    setArticleModalOpen(false);
  };

  const handleDeleteArticle = (slug: string, title: string) => {
    if (window.confirm(`Confirmez-vous la suppression de l'article :\n« ${title} » ?`)) {
      deleteArticle(slug);
      showToast('Article supprimé');
    }
  };

  // Pricing Actions
  const prixDoc = documents.find((d) => d.id === 'prix-homologues-lbv') || documents[0];

  const openEditPrice = (index: number, currentText: string) => {
    setPriceItemIndex(index);
    setPriceValue(currentText);
    setPriceModalOpen(true);
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (priceItemIndex === null || !prixDoc) return;
    const updatedHighlights = [...prixDoc.highlights];
    updatedHighlights[priceItemIndex] = priceValue.trim();
    updateHomologatedPriceList(prixDoc.id, updatedHighlights);
    setPriceModalOpen(false);
    showToast('Grille tarifaire mise à jour en direct');
  };

  // Career Actions
  const handleSaveCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerForm.title.trim()) return;
    const reqs = careerForm.requirements
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    addJobOffer({
      title: careerForm.title.trim(),
      department: careerForm.department.trim(),
      location: careerForm.location.trim(),
      contractType: careerForm.contractType.trim(),
      publishedDate: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      active: true,
      description: careerForm.description.trim(),
      requirements: reqs.length > 0 ? reqs : ['Expérience requise selon profil'],
    });
    setCareerModalOpen(false);
    showToast('Offre de recrutement publiée');
  };

  // Document Actions
  const handleSaveDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title.trim()) return;
    const highlightsArr = docForm.highlights
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    addDocument({
      title: docForm.title.trim(),
      category: docForm.category,
      year: docForm.year.trim() || new Date().getFullYear().toString(),
      subtitle: docForm.subtitle.trim(),
      summary: docForm.summary.trim() || docForm.title.trim(),
      highlights: highlightsArr.length > 0 ? highlightsArr : ['Document officiel SOBRAGA'],
      pagesCount: Number(docForm.pagesCount) || 1,
    });
    setDocModalOpen(false);
    showToast('Document ajouté à la Docuthèque');
  };

  // Task Actions
  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;
    addTeamTask({
      title: taskForm.title.trim(),
      department: taskForm.department,
      assignedTo: taskForm.assignedTo.trim(),
      dueDate: taskForm.dueDate.trim(),
      priority: taskForm.priority,
    });
    setTaskModalOpen(false);
    showToast('Tâche collaborative ajoutée');
  };

  // Resolution Action
  const handleResolveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingMessage) return;
    updateContactMessageStatus(
      resolvingMessage.id,
      'resolu',
      resolutionNote.trim() || 'Dossier traité et clôturé par le service compétent.',
      assignedSite
    );
    setResolvingMessage(null);
    setResolutionNote('');
    showToast('Réclamation marquée comme résolue');
  };

  // Filters
  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(articleQuery.toLowerCase()) ||
      a.tag.toLowerCase().includes(articleQuery.toLowerCase())
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(productQuery.toLowerCase())
  );

  const filteredDocuments = documents.filter((d) => {
    const matchCat = docCategoryFilter === 'all' || d.category === docCategoryFilter;
    const matchQuery =
      d.title.toLowerCase().includes(docQuery.toLowerCase()) ||
      (d.subtitle && d.subtitle.toLowerCase().includes(docQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  const filteredApplications = jobApplications.filter(
    (app) =>
      app.nom.toLowerCase().includes(appQuery.toLowerCase()) ||
      app.prenom.toLowerCase().includes(appQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(appQuery.toLowerCase())
  );

  const filteredMessages = contactMessages.filter((m) => {
    if (reclamationFilter === 'reclamation') return m.type === 'reclamation';
    if (reclamationFilter === 'infos') return m.type === 'infos';
    return true;
  });

  // 1. LOGIN GATE WITH ROLE SELECTION
  if (!isAdminAuthenticated) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center bg-gradient-to-br from-[#FDF6F6] via-white to-[#F9EAEA] px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg overflow-hidden rounded-3xl border border-red-100 bg-white p-8 shadow-2xl md:p-10"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <SobragaLogo />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold tracking-wider text-[#7D0000] uppercase">
              <Lock className="h-3 w-3" />
              <span>SOBRAGA Studio · Portail Entreprise</span>
            </div>
            <h1 className="mt-4 text-xl font-extrabold text-neutral-900 md:text-2xl">
              Espace Collaboratif des Équipes SOBRAGA
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600">
              Gestionnaire décentralisé autonome : Actualités, Prix homologués, RH, Qualité &amp; Docuthèque sans WordPress.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-700">
                Profil d&apos;accès / Direction métier *
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-2 text-xs">
                {(Object.keys(ROLE_PROFILES) as EmployeeRole[]).map((rKey) => {
                  const prof = ROLE_PROFILES[rKey];
                  const isSelected = selectedLoginRole === rKey;
                  return (
                    <button
                      key={rKey}
                      type="button"
                      onClick={() => setSelectedLoginRole(rKey)}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 text-left transition ${
                        isSelected
                          ? 'border-[#7D0000] bg-[#FDF6F6] text-[#7D0000] shadow-2xs font-bold'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold text-white"
                        style={{ backgroundColor: prof.badgeColor }}
                      >
                        {prof.avatarInitials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] leading-tight font-bold">{prof.name}</p>
                        <p className="truncate text-[10px] text-neutral-500">{prof.department.split('&')[0]}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="admin-passcode" className="block text-xs font-bold text-neutral-700">
                Code d&apos;accès / Clé de sécurité
              </label>
              <input
                id="admin-passcode"
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Entrez le code d'accès..."
                className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-[#7D0000] focus:outline-none"
                autoFocus
              />
              {authError && (
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Code incorrect. Pour la démonstration, utilisez : <strong>sobraga2026</strong>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#7D0000] to-[#9E0B0F] py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Accéder au Studio SOBRAGA
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-neutral-100 bg-[#FDF6F6] p-3.5 text-center text-[11px] text-neutral-600">
            <p>
              💡 <strong>Code démo :</strong> <code className="font-bold text-[#7D0000]">sobraga2026</code>
            </p>
            <p className="mt-1 text-neutral-500">
              Accès immédiat pour tester la publication d&apos;articles, le changement des prix en temps réel et la gestion des réclamations.
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="text-xs font-semibold text-neutral-500 hover:text-[#7D0000]"
            >
              ← Retour au site public
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. AUTHENTICATED STUDIO DASHBOARD
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#7D0000] px-5 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Crimson Navigation Bar */}
      <div className="sticky top-0 z-30 border-b border-red-900 bg-gradient-to-r from-[#580000] via-[#7D0000] to-[#580000] px-4 py-2.5 text-white shadow-md md:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <SobragaLogo variant="dark" />
            <span className="hidden rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase sm:inline">
              STUDIO ENTREPRISE
            </span>
          </div>

          {/* Role Indicator & Quick Role Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-black/25 px-3 py-1.5 text-xs">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
                style={{ backgroundColor: currentProfile.badgeColor }}
              >
                {currentProfile.avatarInitials}
              </span>
              <div className="hidden sm:block text-left">
                <p className="font-bold leading-none">{currentProfile.name}</p>
                <p className="text-[10px] text-white/70 leading-tight">{currentProfile.title}</p>
              </div>
            </div>

            <select
              value={activeRole}
              onChange={(e) => {
                setActiveRole(e.target.value as EmployeeRole);
                showToast(`Basculé sur : ${ROLE_PROFILES[e.target.value as EmployeeRole].name}`);
              }}
              className="cursor-pointer rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white focus:bg-[#7D0000] focus:outline-none"
              title="Changer de profil métier"
            >
              {(Object.keys(ROLE_PROFILES) as EmployeeRole[]).map((rKey) => (
                <option key={rKey} value={rKey} className="bg-neutral-900 text-white">
                  Rôle : {ROLE_PROFILES[rKey].name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Site public</span>
              <ExternalLink className="h-3 w-3 opacity-75" />
            </button>

            <button
              type="button"
              onClick={() => {
                logoutAdmin();
                showToast('Déconnexion effectuée');
              }}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pt-6 md:px-8">
        {/* Header Title & Department Banner */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-red-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:p-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#9E0B0F] uppercase">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Back-Office Collaboratif · Sobraga Digital Core</span>
            </div>
            <h1 className="mt-1 text-2xl font-extrabold text-neutral-900 md:text-3xl">
              Tableau de Bord SOBRAGA
            </h1>
            <p className="mt-1 max-w-2xl text-xs text-neutral-600 md:text-sm">
              Connecté en tant que <strong>{currentProfile.name}</strong> ({currentProfile.department}). Vos
              actions sont répercutées instantanément sur le site web et archivées dans le journal d&apos;audit.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="rounded-2xl border border-neutral-100 bg-[#FDF6F6] px-3.5 py-2.5 text-center">
              <span className="block text-lg font-extrabold text-[#7D0000] tabular-nums">
                {articles.length}
              </span>
              <span className="text-[10px] font-medium text-neutral-600">Articles</span>
            </div>
            <div className="rounded-2xl border border-neutral-100 bg-[#FDF6F6] px-3.5 py-2.5 text-center">
              <span className="block text-lg font-extrabold text-[#7D0000] tabular-nums">
                {prixDoc?.highlights.length || 0}
              </span>
              <span className="text-[10px] font-medium text-neutral-600">Tarifs</span>
            </div>
            <div className="rounded-2xl border border-neutral-100 bg-[#FDF6F6] px-3.5 py-2.5 text-center">
              <span className="block text-lg font-extrabold text-[#7D0000] tabular-nums">
                {jobApplications.filter((a) => a.status === 'recue' || a.status === 'examen').length}
              </span>
              <span className="text-[10px] font-medium text-neutral-600">Candidatures</span>
            </div>
            <div className="rounded-2xl border border-neutral-100 bg-[#FDF6F6] px-3.5 py-2.5 text-center">
              <span className="block text-lg font-extrabold text-[#7D0000] tabular-nums">
                {contactMessages.filter((m) => m.status === 'nouveau' || m.status === 'en_cours').length}
              </span>
              <span className="text-[10px] font-medium text-neutral-600">Tickets clients</span>
            </div>
            <div className="rounded-2xl border border-neutral-100 bg-[#FDF6F6] px-3.5 py-2.5 text-center">
              <span className="block text-lg font-extrabold text-[#7D0000] tabular-nums">
                {teamTasks.filter((t) => !t.completed).length}
              </span>
              <span className="text-[10px] font-medium text-neutral-600">Tâches en cours</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation with Role Indicators */}
        <div className="mt-8 flex gap-2 overflow-x-auto border-b border-neutral-200 pb-1">
          {[
            { id: 'articles', label: 'Actualités & Presse', icon: FileText, count: articles.length, dept: 'Com' },
            { id: 'prix', label: 'Prix & Catalogue', icon: Tag, count: products.length, dept: 'Marketing' },
            { id: 'docutheque', label: 'Docuthèque & Publications', icon: SlidersHorizontal, count: documents.length, dept: 'Qualité/RSE' },
            { id: 'recrutement', label: 'Recrutement & RH', icon: Briefcase, count: jobApplications.length, dept: 'DRH' },
            { id: 'reclamations', label: 'Service Consommateur', icon: MessageSquare, count: contactMessages.length, dept: 'Qualité' },
            { id: 'taches', label: 'Tâches d’Équipe', icon: CheckSquare, count: teamTasks.filter((t) => !t.completed).length, dept: 'Inter-dir' },
            { id: 'roles_backup', label: 'Rôles & Sauvegardes', icon: Download, dept: 'Direction' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-t-xl px-4 py-3 text-xs font-bold whitespace-nowrap transition md:text-sm ${
                  isActive
                    ? 'border-b-2 border-[#7D0000] bg-white text-[#7D0000] shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold tabular-nums ${
                      isActive ? 'bg-[#7D0000] text-white' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* TAB 1: ARTICLES MANAGEMENT (Direction Communication) */}
        {/* ============================================================ */}
        {activeTab === 'articles' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={articleQuery}
                  onChange={(e) => setArticleQuery(e.target.value)}
                  placeholder="Filtrer un article par titre ou tag (#SOBRAGA, #RSE)..."
                  className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pr-4 pl-10 text-xs focus:border-[#7D0000] focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={openCreateArticle}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#7D0000] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#9E0B0F]"
              >
                <Plus className="h-4 w-4" />
                <span>Rédiger un nouvel article</span>
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-bold text-neutral-600 uppercase">
                    <tr>
                      <th className="px-6 py-3.5">Article &amp; Visuel</th>
                      <th className="px-4 py-3.5">Tag</th>
                      <th className="px-4 py-3.5">Date</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredArticles.map((art) => (
                      <tr key={art.slug} className="transition hover:bg-neutral-50/80">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={art.bannerImage}
                              alt=""
                              className="h-12 w-16 shrink-0 rounded-lg object-cover ring-1 ring-black/10"
                            />
                            <div>
                              <p className="font-bold text-neutral-900">{art.title}</p>
                              <p className="mt-0.5 line-clamp-1 text-neutral-500">{art.excerpt}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                            style={{ backgroundColor: art.accentColor }}
                          >
                            {art.tag}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-neutral-500 tabular-nums">
                          {art.date}
                        </td>
                        <td className="px-4 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => onNavigate(`/actualites/${art.slug}`)}
                              title="Voir sur le site"
                              className="cursor-pointer rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-[#7D0000]"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditArticle(art)}
                              title="Modifier"
                              className="cursor-pointer rounded-lg p-1.5 text-neutral-600 hover:bg-neutral-100 hover:text-blue-600"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteArticle(art.slug, art.title)}
                              title="Supprimer"
                              className="cursor-pointer rounded-lg p-1.5 text-neutral-600 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: PRIX & CATALOGUE (Direction Commerciale & Marketing) */}
        {/* ============================================================ */}
        {activeTab === 'prix' && (
          <div className="mt-6 space-y-8">
            {/* SECTION 1: PRIX HOMOLOGUES */}
            <div>
              <div className="rounded-2xl border border-red-100 bg-[#FDF6F6] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#7D0000]">
                      Grille Officielle des Prix Publics Conseillés (Libreville &amp; Intérieur)
                    </h2>
                    <p className="mt-1 text-xs text-neutral-700">
                      Ces tarifs alimentent le bandeau de défilement, le communiqué de presse et la modale officielle.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#7D0000] px-3 py-1 text-xs font-bold text-white">
                    Arrêté Ministériel 2026
                  </span>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-bold text-neutral-600 uppercase">
                    <tr>
                      <th className="px-6 py-3.5">Référence Produit &amp; Tarif Homologué</th>
                      <th className="px-6 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {prixDoc?.highlights.map((line, idx) => (
                      <tr key={idx} className="transition hover:bg-neutral-50/80">
                        <td className="px-6 py-4 font-semibold text-neutral-900">{line}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => openEditPrice(idx, line)}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-[#7D0000] hover:bg-red-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            <span>Modifier le prix</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 2: CATALOGUE DES 27 MARQUES */}
            <div>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Catalogue des 27 Marques &amp; Conditionnements ({products.length})
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Modifiez le prix individuel ou le badge de chaque marque de boisson.
                  </p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={productQuery}
                    onChange={(e) => setProductQuery(e.target.value)}
                    placeholder="Filtrer : Régab, Castel, Djino..."
                    className="w-full rounded-xl border border-neutral-300 bg-white py-2 pr-4 pl-10 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((p) => (
                  <div
                    key={p.slug}
                    className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-bold text-neutral-700">
                          {p.categoryLabel}
                        </span>
                        {p.price && (
                          <span className="text-xs font-bold text-[#7D0000] tabular-nums">
                            {p.price}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-base font-bold text-neutral-900">{p.name}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{p.description}</p>
                      <p className="mt-2 text-[11px] text-neutral-600">
                        <strong>Packaging :</strong> {p.packaging}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/produits/${p.slug}/`)}
                        className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-[#7D0000]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Fiche publique</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newPrice = window.prompt(
                            `Nouveau tarif pour ${p.name} (ex: 600 FCFA) :`,
                            p.price || ''
                          );
                          if (newPrice !== null && newPrice.trim()) {
                            updateProductPrice(p.slug, newPrice.trim());
                            showToast(`Prix de ${p.name} mis à jour`);
                          }
                        }}
                        className="cursor-pointer text-xs font-bold text-[#7D0000] hover:underline"
                      >
                        Éditer tarif
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: DOCUTHEQUE & PUBLICATIONS OFFICIELLES */}
        {/* ============================================================ */}
        {activeTab === 'docutheque' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={docQuery}
                    onChange={(e) => setDocQuery(e.target.value)}
                    placeholder="Rechercher une publication..."
                    className="w-full rounded-xl border border-neutral-300 bg-white py-2 pr-4 pl-10 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Toutes' },
                    { id: 'esbidjinews', label: 'ESBIDJINEWS' },
                    { id: 'engagement-qualite', label: 'Qualité' },
                    { id: 'code-conduite', label: 'Code éthique' },
                    { id: 'capsule', label: 'Capsules' },
                    { id: 'rse', label: 'RSE' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setDocCategoryFilter(cat.id)}
                      className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                        docCategoryFilter === cat.id
                          ? 'bg-[#7D0000] text-white'
                          : 'bg-neutral-200/80 text-neutral-700 hover:bg-neutral-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDocModalOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#7D0000] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#9E0B0F]"
              >
                <Plus className="h-4 w-4" />
                <span>Publier un document</span>
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-bold text-neutral-600 uppercase">
                  <tr>
                    <th className="px-6 py-3.5">Titre de la publication</th>
                    <th className="px-4 py-3.5">Catégorie</th>
                    <th className="px-4 py-3.5">Année</th>
                    <th className="px-4 py-3.5">Pages</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="transition hover:bg-neutral-50/80">
                      <td className="px-6 py-4">
                        <div className="font-bold text-neutral-900">{doc.title}</div>
                        {doc.subtitle && (
                          <div className="text-[11px] text-neutral-500">{doc.subtitle}</div>
                        )}
                        <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-400">{doc.summary}</p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-bold text-[#7D0000] uppercase">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-neutral-600 tabular-nums font-semibold">
                        {doc.year}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-neutral-500 tabular-nums">
                        {doc.pagesCount} p.
                      </td>
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Supprimer la publication "${doc.title}" ?`)) {
                              deleteDocument(doc.id);
                              showToast('Document supprimé');
                            }
                          }}
                          className="cursor-pointer rounded-lg p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: RECRUTEMENT & RH (Direction des Ressources Humaines) */}
        {/* ============================================================ */}
        {activeTab === 'recrutement' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCareerSubTab('offres')}
                  className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition ${
                    careerSubTab === 'offres'
                      ? 'bg-[#7D0000] text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Postes &amp; Offres ({jobOffers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCareerSubTab('candidatures')}
                  className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition ${
                    careerSubTab === 'candidatures'
                      ? 'bg-[#7D0000] text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Candidatures &amp; CVs reçus ({jobApplications.length})
                </button>
              </div>

              {careerSubTab === 'offres' && (
                <button
                  type="button"
                  onClick={() => setCareerModalOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#7D0000] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#9E0B0F]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Ajouter une offre</span>
                </button>
              )}
            </div>

            {/* SUBTAB A: JOB OFFERS */}
            {careerSubTab === 'offres' && (
              <div className="space-y-4">
                {jobOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs md:flex-row md:items-center"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            offer.active ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {offer.active ? 'Actif · Recrutement ouvert' : 'Clôturé'}
                        </span>
                        <span className="text-xs font-semibold text-[#9E0B0F]">{offer.department}</span>
                        <span className="text-xs text-neutral-400">·</span>
                        <span className="text-xs text-neutral-500">{offer.location}</span>
                        <span className="text-xs text-neutral-400">·</span>
                        <span className="text-xs font-bold text-neutral-700">{offer.contractType}</span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-neutral-900">{offer.title}</h3>
                      <p className="mt-1 text-xs text-neutral-600">{offer.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleJobOfferStatus(offer.id)}
                        className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-semibold ${
                          offer.active
                            ? 'border border-amber-300 bg-amber-50 text-amber-800'
                            : 'border border-emerald-300 bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        {offer.active ? 'Désactiver' : 'Activer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Supprimer l'offre "${offer.title}" ?`)) {
                            deleteJobOffer(offer.id);
                            showToast('Offre supprimée');
                          }
                        }}
                        className="cursor-pointer rounded-xl p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUBTAB B: JOB APPLICATIONS (CVs PIPELINE) */}
            {careerSubTab === 'candidatures' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={appQuery}
                      onChange={(e) => setAppQuery(e.target.value)}
                      placeholder="Filtrer par candidat ou poste..."
                      className="w-full rounded-xl border border-neutral-300 bg-white py-2 pr-4 pl-10 text-xs focus:border-[#7D0000] focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-neutral-500">
                    {filteredApplications.length} dossier(s) trouvé(s)
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-bold text-neutral-600 uppercase">
                      <tr>
                        <th className="px-6 py-3.5">Candidat</th>
                        <th className="px-4 py-3.5">Poste ciblé</th>
                        <th className="px-4 py-3.5">Coordonnées</th>
                        <th className="px-4 py-3.5">Pièces jointes</th>
                        <th className="px-4 py-3.5">Statut RH</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredApplications.map((app) => (
                        <tr key={app.id} className="transition hover:bg-neutral-50/80">
                          <td className="px-6 py-4">
                            <p className="font-bold text-neutral-900">
                              {app.civilite} {app.prenom} {app.nom}
                            </p>
                            <p className="text-[11px] text-neutral-400">{app.date}</p>
                            {app.internalNotes && (
                              <p className="mt-1 text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                                📝 {app.internalNotes}
                              </p>
                            )}
                          </td>
                          <td className="px-4 py-4 font-semibold text-[#7D0000]">
                            {app.jobTitle}
                          </td>
                          <td className="px-4 py-4 text-neutral-600">
                            <div>{app.telephone}</div>
                            <div className="text-[11px] text-neutral-400">{app.email}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-[11px] text-neutral-700">📄 {app.cvName}</div>
                            <div className="text-[11px] text-neutral-500">✉️ {app.lettreName}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <select
                              value={app.status}
                              onChange={(e) => {
                                updateJobApplicationStatus(app.id, e.target.value as JobApplication['status']);
                                showToast(`Statut mis à jour : ${e.target.value}`);
                              }}
                              className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-bold border ${
                                app.status === 'recue'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : app.status === 'examen'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : app.status === 'entretien'
                                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                                  : app.status === 'retenu'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                              }`}
                            >
                              <option value="recue">Nouveau (Reçue)</option>
                              <option value="examen">En examen</option>
                              <option value="entretien">Entretien planifié</option>
                              <option value="retenu">Candidat Retenu</option>
                              <option value="archive">Archivée</option>
                            </select>
                          </td>
                          <td className="px-4 py-4 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => {
                                const note = window.prompt('Ajouter une note interne DRH pour ce candidat :', app.internalNotes || '');
                                if (note !== null) {
                                  updateJobApplicationStatus(app.id, app.status, note);
                                  showToast('Note interne enregistrée');
                                }
                              }}
                              className="mr-2 text-xs font-semibold text-blue-700 hover:underline"
                            >
                              Note RH
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Supprimer la candidature de ${app.prenom} ${app.nom} ?`)) {
                                  deleteJobApplication(app.id);
                                  showToast('Candidature supprimée');
                                }
                              }}
                              className="cursor-pointer text-neutral-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: SERVICE CONSOMMATEUR & RECLAMATIONS QUALITE */}
        {/* ============================================================ */}
        {activeTab === 'reclamations' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-red-100 bg-[#FDF6F6] p-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-base font-bold text-[#7D0000]">
                  Gestion des Réclamations Produits &amp; Demandes Consommateurs
                </h2>
                <p className="mt-1 text-xs text-neutral-700">
                  Centralisation des messages envoyés depuis la page Contact publique. Traçabilité des lots et résolution en lien avec le laboratoire qualité d&apos;Owendo.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setReclamationFilter('all')}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    reclamationFilter === 'all'
                      ? 'bg-[#7D0000] text-white'
                      : 'bg-white text-neutral-700 border border-neutral-300'
                  }`}
                >
                  Tous ({contactMessages.length})
                </button>
                <button
                  type="button"
                  onClick={() => setReclamationFilter('reclamation')}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    reclamationFilter === 'reclamation'
                      ? 'bg-[#7D0000] text-white'
                      : 'bg-white text-neutral-700 border border-neutral-300'
                  }`}
                >
                  Réclamations ({contactMessages.filter((m) => m.type === 'reclamation').length})
                </button>
                <button
                  type="button"
                  onClick={() => setReclamationFilter('infos')}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    reclamationFilter === 'infos'
                      ? 'bg-[#7D0000] text-white'
                      : 'bg-white text-neutral-700 border border-neutral-300'
                  }`}
                >
                  Demandes d&apos;infos ({contactMessages.filter((m) => m.type === 'infos').length})
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-neutral-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#7D0000] tabular-nums text-xs">
                        {msg.reference}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          msg.type === 'reclamation'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {msg.type === 'reclamation' ? '⚠️ Réclamation Produit' : 'ℹ️ Demande d’information'}
                      </span>
                      {msg.produitConcerne && (
                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-700">
                          {msg.produitConcerne}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-neutral-400">{msg.date}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                          msg.status === 'nouveau'
                            ? 'bg-amber-100 text-amber-800'
                            : msg.status === 'en_cours'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {msg.status === 'nouveau' ? 'Nouveau ticket' : msg.status === 'en_cours' ? 'En analyse' : 'Résolu'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <p className="text-xs leading-relaxed text-neutral-800 font-medium">{msg.message}</p>
                      {msg.resolutionNote && (
                        <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-900 border border-emerald-100">
                          <strong>Note de résolution / Labo :</strong> {msg.resolutionNote}
                          {msg.assignedSite && (
                            <span className="block mt-0.5 text-[11px] text-emerald-700">
                              Site d’affectation : {msg.assignedSite}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="rounded-xl bg-neutral-50 p-3 text-xs text-neutral-600 flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-neutral-900">
                          {msg.civilite} {msg.prenom} {msg.nom}
                        </p>
                        <p className="mt-0.5 text-neutral-500">📞 {msg.telephone}</p>
                        <p className="text-neutral-500">✉️ {msg.email}</p>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-2">
                        {msg.status !== 'resolu' ? (
                          <button
                            type="button"
                            onClick={() => {
                              setResolvingMessage(msg);
                              setResolutionNote(msg.resolutionNote || '');
                              setAssignedSite(msg.assignedSite || 'Usine d’Owendo (Libreville)');
                            }}
                            className="cursor-pointer text-xs font-bold text-[#7D0000] hover:underline"
                          >
                            Traiter / Clôturer →
                          </button>
                        ) : (
                          <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" /> Clôturé
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Supprimer le ticket ${msg.reference} ?`)) {
                              deleteContactMessage(msg.id);
                              showToast('Ticket supprimé');
                            }
                          }}
                          className="text-neutral-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: TÂCHES D'EQUIPE & WORKFLOW INTER-DIRECTIONS */}
        {/* ============================================================ */}
        {activeTab === 'taches' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-bold text-neutral-900">
                  Feuille de Route &amp; Tâches Collaboratives
                </h2>
                <p className="text-xs text-neutral-500">
                  Coordination opérationnelle entre la Direction Générale, Communication, Marketing, RH et Laboratoire.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setTaskModalOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#7D0000] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#9E0B0F]"
              >
                <Plus className="h-4 w-4" />
                <span>Créer une tâche</span>
              </button>
            </div>

            <div className="space-y-3">
              {teamTasks.map((t) => (
                <div
                  key={t.id}
                  className={`flex flex-col justify-between gap-3 rounded-2xl border p-4 transition md:flex-row md:items-center ${
                    t.completed
                      ? 'border-neutral-200 bg-neutral-100/70 text-neutral-400'
                      : 'border-neutral-200 bg-white shadow-2xs hover:border-[#7D0000]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        toggleTeamTask(t.id);
                        showToast(t.completed ? 'Tâche réouverte' : 'Tâche terminée');
                      }}
                      className={`mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border transition ${
                        t.completed
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-neutral-300 bg-white hover:border-[#7D0000]'
                      }`}
                    >
                      {t.completed && <Check className="h-3.5 w-3.5" />}
                    </button>
                    <div>
                      <p
                        className={`text-xs font-bold ${
                          t.completed ? 'line-through text-neutral-500' : 'text-neutral-900'
                        }`}
                      >
                        {t.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
                        <span className="font-semibold text-[#7D0000]">{t.department}</span>
                        <span>·</span>
                        <span>Assigné à : <strong>{t.assignedTo}</strong></span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {t.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 md:justify-end">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        t.priority === 'urgente'
                          ? 'bg-red-100 text-red-800'
                          : t.priority === 'haute'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      Priorité {t.priority}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Supprimer cette tâche ?')) {
                          deleteTeamTask(t.id);
                          showToast('Tâche supprimée');
                        }
                      }}
                      className="cursor-pointer p-1 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: ROLES, AUDIT TRAIL & SAUVEGARDES */}
        {/* ============================================================ */}
        {activeTab === 'roles_backup' && (
          <div className="mt-6 space-y-8">
            {/* SECTION 1: MATRICE DES ROLES ET EMPLOYÉS */}
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                Gestion des Rôles &amp; Groupes d&apos;Employés (RBAC)
              </h2>
              <p className="text-xs text-neutral-500">
                Chaque collaborateur SOBRAGA dispose d&apos;une vue adaptée à ses prérogatives métier.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(Object.keys(ROLE_PROFILES) as EmployeeRole[]).map((rKey) => {
                  const prof = ROLE_PROFILES[rKey];
                  const isActive = activeRole === rKey;
                  return (
                    <div
                      key={rKey}
                      className={`flex flex-col justify-between rounded-2xl border p-5 transition ${
                        isActive
                          ? 'border-[#7D0000] bg-[#FDF6F6] shadow-sm'
                          : 'border-neutral-200 bg-white shadow-2xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-extrabold text-white"
                            style={{ backgroundColor: prof.badgeColor }}
                          >
                            {prof.avatarInitials}
                          </span>
                          {isActive && (
                            <span className="rounded-full bg-[#7D0000] px-2.5 py-0.5 text-[10px] font-bold text-white">
                              Actif maintenant
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3 text-sm font-bold text-neutral-900">{prof.name}</h3>
                        <p className="text-xs font-semibold text-[#9E0B0F]">{prof.title}</p>
                        <p className="mt-1 text-[11px] text-neutral-500">{prof.department}</p>
                      </div>

                      <div className="mt-4 border-t border-neutral-100 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveRole(rKey);
                            showToast(`Profil activé : ${prof.name}`);
                          }}
                          className={`w-full cursor-pointer rounded-xl py-2 text-xs font-bold transition ${
                            isActive
                              ? 'bg-[#7D0000] text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {isActive ? '✓ Profil en cours d’utilisation' : 'Prendre ce rôle'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: JOURNAL D'AUDIT EN DIRECT */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Journal d&apos;Audit &amp; Traçabilité Interne
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Historique des 50 dernières actions effectuées par les collaborateurs de SOBRAGA.
                  </p>
                </div>
                <span className="text-xs text-neutral-400 font-mono">Temps réel</span>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 border-b border-neutral-200 bg-neutral-50 text-[11px] font-bold text-neutral-600 uppercase">
                      <tr>
                        <th className="px-6 py-3">Date &amp; Heure</th>
                        <th className="px-4 py-3">Collaborateur</th>
                        <th className="px-4 py-3">Direction</th>
                        <th className="px-4 py-3">Action</th>
                        <th className="px-4 py-3">Détails</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-neutral-50">
                          <td className="px-6 py-3 whitespace-nowrap text-neutral-500 tabular-nums">
                            {log.timestamp}
                          </td>
                          <td className="px-4 py-3 font-bold text-neutral-900 whitespace-nowrap">
                            {log.userName}
                          </td>
                          <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">
                            {log.role}
                          </td>
                          <td className="px-4 py-3 font-semibold text-[#7D0000] whitespace-nowrap">
                            {log.action}
                          </td>
                          <td className="px-4 py-3 text-neutral-600">
                            {log.details}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SECTION 3: SAUVEGARDES & EXPORT */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#7D0000]">
                    <Download className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">
                    Exporter les données (JSON)
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                    Archive complète : articles, tarifs, docuthèque, candidatures, tickets et tâches.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    exportBackup();
                    showToast('Sauvegarde exportée');
                  }}
                  className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#7D0000] py-2.5 text-xs font-bold text-white transition hover:bg-[#9E0B0F]"
                >
                  <Download className="h-4 w-4" />
                  <span>Télécharger le backup JSON</span>
                </button>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Upload className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">
                    Importer une sauvegarde
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                    Restaurez l&apos;état complet du site depuis une archive JSON exportée.
                  </p>
                </div>
                <label className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-2.5 text-xs font-bold text-neutral-800 transition hover:bg-neutral-50">
                  <Upload className="h-4 w-4" />
                  <span>Sélectionner un fichier JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        const content = evt.target?.result as string;
                        const ok = importBackup(content);
                        if (ok) {
                          showToast('Données importées avec succès !');
                        } else {
                          alert('Format de fichier JSON invalide.');
                        }
                      };
                      reader.readAsText(file);
                    }}
                    className="sr-only"
                  />
                </label>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900">
                    Restaurer l&apos;état d&apos;usine
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                    Réinitialise le site aux valeurs officielles SOBRAGA d&apos;origine.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Réinitialiser toutes les données aux valeurs officielles par défaut ?')) {
                      resetToDefaults();
                      showToast('Données réinitialisées');
                    }
                  }}
                  className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-bold text-red-700 transition hover:bg-red-100"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Restaurer les données officielles</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: CREATE / EDIT ARTICLE */}
      {/* ============================================================ */}
      <AnimatePresence>
        {articleModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 bg-[#7D0000] px-6 py-4 text-white">
                <h3 className="text-base font-bold">
                  {editingArticleSlug ? 'Modifier l’article' : 'Rédiger un nouvel article'}
                </h3>
                <button
                  type="button"
                  onClick={() => setArticleModalOpen(false)}
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveArticle} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700">Titre de l&apos;article *</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    placeholder="Ex: Célébration des 60 ans de la brasserie d'Owendo..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs font-medium focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Tag thématique</label>
                    <select
                      value={articleForm.tag}
                      onChange={(e) => setArticleForm({ ...articleForm, tag: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    >
                      <option value="#SOBRAGA">#SOBRAGA</option>
                      <option value="#SANTE">#SANTE</option>
                      <option value="#RSE">#RSE</option>
                      <option value="#60ANS">#60ANS</option>
                      <option value="#CARRIERES">#CARRIERES</option>
                      <option value="#PRODUIT">#PRODUIT</option>
                      <option value="#SPORT">#SPORT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Date affichée</label>
                    <input
                      type="text"
                      value={articleForm.date}
                      onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Couleur d&apos;accent</label>
                    <input
                      type="color"
                      value={articleForm.accentColor}
                      onChange={(e) => setArticleForm({ ...articleForm, accentColor: e.target.value })}
                      className="mt-1 h-9 w-full cursor-pointer rounded-xl border border-neutral-300 bg-white p-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">Bannière / Visuel</label>
                  <select
                    value={articleForm.bannerImage}
                    onChange={(e) => setArticleForm({ ...articleForm, bannerImage: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  >
                    <option value={SITE_ASSETS.heroProduction}>Lignes de Production &amp; Brasserie</option>
                    <option value={SITE_ASSETS.heroRseWorker}>Équipes RSE &amp; Collaborateurs</option>
                    <option value={SITE_ASSETS.heroRegab}>Célébration Régab 60 ans</option>
                    <option value={SITE_ASSETS.heroDjino}>Pique-nique D&apos;Jino &amp; Famille</option>
                    <option value={SITE_ASSETS.heroWineCellar}>Cave à vin Sovingab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">
                    Extrait court (affiché dans les cartes d&apos;actualité)
                  </label>
                  <textarea
                    rows={2}
                    value={articleForm.excerpt}
                    onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                    placeholder="Brève accroche en 1 ou 2 phrases..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">
                    Contenu complet de l&apos;article (séparez les paragraphes par deux retours à la ligne)
                  </label>
                  <textarea
                    rows={5}
                    value={articleForm.paragraphs}
                    onChange={(e) => setArticleForm({ ...articleForm, paragraphs: e.target.value })}
                    placeholder="Rédigez le texte complet de l'article ici..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-4">
                  <button
                    type="button"
                    onClick={() => setArticleModalOpen(false)}
                    className="cursor-pointer rounded-xl border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-[#7D0000] px-6 py-2 text-xs font-bold text-white hover:bg-[#9E0B0F]"
                  >
                    {editingArticleSlug ? 'Enregistrer les modifications' : 'Publier l’article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 2: EDIT PRICE LINE */}
      {/* ============================================================ */}
      <AnimatePresence>
        {priceModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 bg-[#7D0000] px-6 py-4 text-white">
                <h3 className="text-base font-bold">Modifier un tarif homologué</h3>
                <button
                  type="button"
                  onClick={() => setPriceModalOpen(false)}
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSavePrice} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700">
                    Libellé &amp; Prix conseillé
                  </label>
                  <input
                    type="text"
                    required
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    placeholder="Ex: Régab 65 cl (verre consigné) : 600 FCFA"
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs font-medium focus:border-[#7D0000] focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-neutral-500">
                    Ce tarif s&apos;affichera immédiatement dans la modale officielle et les bannières.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPriceModalOpen(false)}
                    className="cursor-pointer rounded-xl border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-[#7D0000] px-5 py-2 text-xs font-bold text-white hover:bg-[#9E0B0F]"
                  >
                    Enregistrer le tarif
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 3: ADD CAREER OFFER */}
      {/* ============================================================ */}
      <AnimatePresence>
        {careerModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 bg-[#7D0000] px-6 py-4 text-white">
                <h3 className="text-base font-bold">Publier une offre de recrutement</h3>
                <button
                  type="button"
                  onClick={() => setCareerModalOpen(false)}
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCareer} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700">Intitulé du poste *</label>
                  <input
                    type="text"
                    required
                    value={careerForm.title}
                    onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                    placeholder="Ex: Ingénieur Brasseur / Responsable Maintenance..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Département</label>
                    <select
                      value={careerForm.department}
                      onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    >
                      <option value="Direction Industrielle">Direction Industrielle</option>
                      <option value="Direction Qualité & Laboratoire">Direction Qualité</option>
                      <option value="Direction Commerciale & Marketing">Direction Commerciale</option>
                      <option value="Ressources Humaines & RSE">Ressources Humaines</option>
                      <option value="Logistique & Approvisionnement">Logistique</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Site / Localisation</label>
                    <select
                      value={careerForm.location}
                      onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    >
                      <option value="Usine d’Owendo (Libreville)">Usine d’Owendo (Libreville)</option>
                      <option value="Usine de Port-Gentil">Usine de Port-Gentil</option>
                      <option value="Usine de Franceville">Usine de Franceville</option>
                      <option value="Usine d’Oyem">Usine d’Oyem</option>
                      <option value="Usine de Mouila">Usine de Mouila</option>
                      <option value="Source de Léconi (SOBOLECO)">Source de Léconi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">Type de contrat</label>
                  <select
                    value={careerForm.contractType}
                    onChange={(e) => setCareerForm({ ...careerForm, contractType: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  >
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage professionnel">Stage professionnel (3 à 6 mois)</option>
                    <option value="Alternance">Alternance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">Description des missions</label>
                  <textarea
                    rows={3}
                    value={careerForm.description}
                    onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                    placeholder="Missions principales confiées au candidat..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">
                    Profil recherché / Prérequis (une ligne par prérequis)
                  </label>
                  <textarea
                    rows={3}
                    value={careerForm.requirements}
                    onChange={(e) => setCareerForm({ ...careerForm, requirements: e.target.value })}
                    placeholder="Diplôme, années d'expérience, compétences requises..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-4">
                  <button
                    type="button"
                    onClick={() => setCareerModalOpen(false)}
                    className="cursor-pointer rounded-xl border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-[#7D0000] px-5 py-2 text-xs font-bold text-white hover:bg-[#9E0B0F]"
                  >
                    Publier le poste
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 4: ADD DOCUMENT TO DOCUTHEQUE */}
      {/* ============================================================ */}
      <AnimatePresence>
        {docModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 bg-[#7D0000] px-6 py-4 text-white">
                <h3 className="text-base font-bold">Publier un document dans la Docuthèque</h3>
                <button
                  type="button"
                  onClick={() => setDocModalOpen(false)}
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDocument} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700">Titre de la publication *</label>
                  <input
                    type="text"
                    required
                    value={docForm.title}
                    onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                    placeholder="Ex: ESBIDJINEWS Novembre 2026 / Rapport RSE 2026..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Catégorie</label>
                    <select
                      value={docForm.category}
                      onChange={(e) => setDocForm({ ...docForm, category: e.target.value as DocumentItem['category'] })}
                      className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    >
                      <option value="esbidjinews">ESBIDJINEWS</option>
                      <option value="engagement-qualite">Engagement Qualité</option>
                      <option value="code-conduite">Code de conduite</option>
                      <option value="rse">Rapport RSE</option>
                      <option value="capsule">Capsule</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Année</label>
                    <input
                      type="text"
                      value={docForm.year}
                      onChange={(e) => setDocForm({ ...docForm, year: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Nb de pages</label>
                    <input
                      type="number"
                      min="1"
                      value={docForm.pagesCount}
                      onChange={(e) => setDocForm({ ...docForm, pagesCount: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">Sous-titre / Thématique</label>
                  <input
                    type="text"
                    value={docForm.subtitle}
                    onChange={(e) => setDocForm({ ...docForm, subtitle: e.target.value })}
                    placeholder="Ex: Édition spéciale anniversaire / Audit de performance..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">Résumé descriptif</label>
                  <textarea
                    rows={3}
                    value={docForm.summary}
                    onChange={(e) => setDocForm({ ...docForm, summary: e.target.value })}
                    placeholder="Description du contenu accessible aux visiteurs et collaborateurs..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">
                    Faits marquants (un par ligne)
                  </label>
                  <textarea
                    rows={3}
                    value={docForm.highlights}
                    onChange={(e) => setDocForm({ ...docForm, highlights: e.target.value })}
                    placeholder="Ex: Éditorial de la Direction Générale&#10;Focus usines Owendo et Port-Gentil"
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-4">
                  <button
                    type="button"
                    onClick={() => setDocModalOpen(false)}
                    className="cursor-pointer rounded-xl border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-[#7D0000] px-5 py-2 text-xs font-bold text-white hover:bg-[#9E0B0F]"
                  >
                    Publier le document
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 5: CREATE TEAM TASK */}
      {/* ============================================================ */}
      <AnimatePresence>
        {taskModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 bg-[#7D0000] px-6 py-4 text-white">
                <h3 className="text-base font-bold">Nouvelle tâche d&apos;équipe</h3>
                <button
                  type="button"
                  onClick={() => setTaskModalOpen(false)}
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTask} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700">Intitulé de la mission *</label>
                  <input
                    type="text"
                    required
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    placeholder="Ex: Validation de l'affiche publicitaire..."
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Direction</label>
                    <select
                      value={taskForm.department}
                      onChange={(e) => setTaskForm({ ...taskForm, department: e.target.value as TeamTask['department'] })}
                      className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    >
                      <option value="Communication & RSE">Communication &amp; RSE</option>
                      <option value="Commercial & Marketing">Commercial &amp; Marketing</option>
                      <option value="Ressources Humaines">Ressources Humaines</option>
                      <option value="Qualité & Labo">Qualité &amp; Labo</option>
                      <option value="Direction Générale">Direction Générale</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Priorité</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as TeamTask['priority'] })}
                      className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    >
                      <option value="urgente">🚨 Urgente</option>
                      <option value="haute">⚡ Haute</option>
                      <option value="normale">✓ Normale</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Assigné à</label>
                    <input
                      type="text"
                      value={taskForm.assignedTo}
                      onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                      placeholder="Nom du responsable"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700">Échéance</label>
                    <input
                      type="text"
                      value={taskForm.dueDate}
                      onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                      placeholder="Ex: 28 Nov 2026"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setTaskModalOpen(false)}
                    className="cursor-pointer rounded-xl border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-[#7D0000] px-5 py-2 text-xs font-bold text-white hover:bg-[#9E0B0F]"
                  >
                    Ajouter la tâche
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 6: RESOLVE CONSUMER COMPLAINT / TICKET */}
      {/* ============================================================ */}
      <AnimatePresence>
        {resolvingMessage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 bg-[#7D0000] px-6 py-4 text-white">
                <h3 className="text-base font-bold">
                  Clôture du ticket {resolvingMessage.reference}
                </h3>
                <button
                  type="button"
                  onClick={() => setResolvingMessage(null)}
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleResolveMessage} className="p-6 space-y-4">
                <div className="rounded-xl bg-neutral-50 p-3 text-xs text-neutral-700">
                  <p><strong>Client :</strong> {resolvingMessage.prenom} {resolvingMessage.nom} ({resolvingMessage.telephone})</p>
                  <p className="mt-1"><strong>Signalement :</strong> {resolvingMessage.message}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">Site / Usine concernée</label>
                  <select
                    value={assignedSite}
                    onChange={(e) => setAssignedSite(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  >
                    <option value="Usine d’Owendo (Libreville)">Usine d’Owendo (Libreville)</option>
                    <option value="Usine de Port-Gentil">Usine de Port-Gentil</option>
                    <option value="Usine de Franceville">Usine de Franceville</option>
                    <option value="Usine d’Oyem">Usine d’Oyem</option>
                    <option value="Usine de Mouila">Usine de Mouila</option>
                    <option value="Cave Sovingab Libreville">Cave Sovingab Libreville</option>
                    <option value="Direction RSE / Siège">Direction RSE / Siège</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700">
                    Rapport de résolution / Note du laboratoire qualité *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="Précisez les investigations réalisées, lot vérifié et accord trouvé avec le consommateur..."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setResolvingMessage(null)}
                    className="cursor-pointer rounded-xl border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-emerald-700 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-800"
                  >
                    Valider la résolution du ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

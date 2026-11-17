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
} from 'lucide-react';
import { useSiteData, JobOffer } from '../context/SiteContext';
import { SobragaLogo } from '../components/BrandArtwork';
import { NewsArticle, SITE_ASSETS } from '../data/siteData';

interface AdminPageProps {
  initialTab?: string;
  onNavigate: (path: string) => void;
}

type AdminTab = 'articles' | 'prix' | 'produits' | 'carrieres' | 'backup';

export const AdminPage: React.FC<AdminPageProps> = ({ initialTab = 'articles', onNavigate }) => {
  const {
    articles,
    products,
    documents,
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
    deleteJobOffer,
    toggleJobOfferStatus,
    resetToDefaults,
    exportBackup,
    importBackup,
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<AdminTab>(
    ['articles', 'prix', 'produits', 'carrieres', 'backup'].includes(initialTab)
      ? (initialTab as AdminTab)
      : 'articles'
  );

  // Login form state
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Search in tabs
  const [articleQuery, setArticleQuery] = useState('');
  const [productQuery, setProductQuery] = useState('');

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

  // Success notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setPasscode('');
      showToast('Connexion réussie à SOBRAGA Studio');
    }
  };

  // Open modal to create article
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

  // Open modal to edit existing article
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
      showToast('Nouvel article publié sur le site public');
    }
    setArticleModalOpen(false);
  };

  const handleDeleteArticle = (slug: string, title: string) => {
    if (window.confirm(`Confirmez-vous la suppression de l'article :\n« ${title} » ?`)) {
      deleteArticle(slug);
      showToast('Article supprimé');
    }
  };

  // Pricing edit
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

  // Career offer actions
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
    showToast('Nouvelle offre de recrutement ajoutée');
  };

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

  // 1. LOGIN GATE
  if (!isAdminAuthenticated) {
    return (
      <div className="flex min-h-[82vh] items-center justify-center bg-gradient-to-br from-[#FDF6F6] via-white to-[#FBECEC] px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md overflow-hidden rounded-3xl border border-red-100 bg-white p-8 shadow-2xl md:p-10"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <SobragaLogo />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold tracking-wider text-[#7D0000] uppercase">
              <Lock className="h-3 w-3" />
              <span>SOBRAGA Studio · Administration</span>
            </div>
            <h1 className="mt-4 text-xl font-extrabold text-neutral-900">
              Espace de Gestion des Contenus
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600">
              Accès réservé aux équipes Communication, Marketing et Direction Générale de SOBRAGA.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="admin-passcode" className="block text-xs font-bold text-neutral-700">
                Code d&apos;accès / Clé d&apos;administration
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
              Déverrouiller le Studio
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-neutral-100 bg-[#FDF6F6] p-3.5 text-center text-[11px] text-neutral-600">
            <p>
              💡 <strong>Code démo :</strong> <code className="font-bold text-[#7D0000]">sobraga2026</code>
            </p>
            <p className="mt-1 text-neutral-500">
              Permet de tester immédiatement la création d&apos;articles et la modification des prix en direct.
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

      {/* Studio Top Crimson Navigation Bar */}
      <div className="sticky top-0 z-30 border-b border-red-900 bg-gradient-to-r from-[#580000] via-[#7D0000] to-[#580000] px-4 py-3 text-white shadow-md md:px-8">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SobragaLogo variant="dark" />
            <span className="hidden rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-extrabold tracking-wider uppercase sm:inline">
              STUDIO ADMIN
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Voir le site public</span>
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

      <div className="mx-auto max-w-[1380px] px-4 pt-8 md:px-8">
        {/* Header Title & Pitch Banner */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-red-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:p-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#9E0B0F] uppercase">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Back-Office Collaboratif · Sans WordPress</span>
            </div>
            <h1 className="mt-1 text-2xl font-extrabold text-neutral-900 md:text-3xl">
              Tableau de Bord SOBRAGA
            </h1>
            <p className="mt-1 max-w-2xl text-xs text-neutral-600 md:text-sm">
              Mettez à jour vos communiqués, ajustez les prix publics homologués et gérez les offres
              d&apos;emploi. Les modifications sont répercutées instantanément sur l&apos;ensemble du site.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-neutral-100 bg-[#FDF6F6] px-4 py-3 text-center">
              <span className="block text-xl font-extrabold text-[#7D0000] tabular-nums">
                {articles.length}
              </span>
              <span className="text-[11px] font-medium text-neutral-600">Articles en ligne</span>
            </div>
            <div className="rounded-2xl border border-neutral-100 bg-[#FDF6F6] px-4 py-3 text-center">
              <span className="block text-xl font-extrabold text-[#7D0000] tabular-nums">
                {prixDoc?.highlights.length || 0}
              </span>
              <span className="text-[11px] font-medium text-neutral-600">Tarifs homologués</span>
            </div>
            <div className="rounded-2xl border border-neutral-100 bg-[#FDF6F6] px-4 py-3 text-center">
              <span className="block text-xl font-extrabold text-[#7D0000] tabular-nums">
                {jobOffers.filter((o) => o.active).length}
              </span>
              <span className="text-[11px] font-medium text-neutral-600">Postes ouverts</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex gap-2 overflow-x-auto border-b border-neutral-200 pb-1">
          {[
            { id: 'articles', label: 'Actualités & Presse', icon: FileText, count: articles.length },
            { id: 'prix', label: 'Prix Homologués', icon: Tag, count: prixDoc?.highlights.length },
            { id: 'produits', label: 'Catalogue Produits', icon: SlidersHorizontal, count: products.length },
            { id: 'carrieres', label: 'Recrutement & RH', icon: Briefcase, count: jobOffers.length },
            { id: 'backup', label: 'Sauvegardes & Transfert', icon: Download },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-t-xl px-5 py-3 text-xs font-bold whitespace-nowrap transition md:text-sm ${
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

        {/* TAB 1: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={articleQuery}
                  onChange={(e) => setArticleQuery(e.target.value)}
                  placeholder="Filtrer un article par titre ou tag..."
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
                      <th className="px-6 py-3.5">Article</th>
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

        {/* TAB 2: HOMOLOGATED PRICING MANAGEMENT */}
        {activeTab === 'prix' && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-red-100 bg-[#FDF6F6] p-6">
              <h2 className="text-base font-bold text-[#7D0000]">
                Grille Officielle des Prix Publics Conseillés (Libreville &amp; Intérieur)
              </h2>
              <p className="mt-1 text-xs text-neutral-700">
                Ces tarifs alimentent directement le bandeau d&apos;accueil, le communiqué de presse
                et la modale officielle « Prix homologués ». Modifiez une ligne pour voir l&apos;impact en direct.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-bold text-neutral-600 uppercase">
                  <tr>
                    <th className="px-6 py-3.5">Référence &amp; Tarif Homologué</th>
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
        )}

        {/* TAB 3: PRODUCTS CATALOG MANAGEMENT */}
        {activeTab === 'produits' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  placeholder="Rechercher un produit (Régab, Djino, Andza...)"
                  className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pr-4 pl-10 text-xs focus:border-[#7D0000] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                      <strong>Format :</strong> {p.packaging}
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
                          `Nouveau prix pour ${p.name} (ex: 600 FCFA) :`,
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
        )}

        {/* TAB 4: CAREERS MANAGEMENT */}
        {activeTab === 'carrieres' && (
          <div className="mt-6 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-xs text-neutral-600">
                Ces offres d&apos;emploi et de stages alimentent les options de recrutement et la page Rejoignez-nous.
              </p>
              <button
                type="button"
                onClick={() => setCareerModalOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#7D0000] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#9E0B0F]"
              >
                <Plus className="h-4 w-4" />
                <span>Ajouter un poste</span>
              </button>
            </div>

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
                      <span className="text-xs font-semibold text-[#9E0B0F]">
                        {offer.department}
                      </span>
                      <span className="text-xs text-neutral-400">·</span>
                      <span className="text-xs text-neutral-500">{offer.location}</span>
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
          </div>
        )}

        {/* TAB 5: BACKUP & DATA TRANSFER */}
        {activeTab === 'backup' && (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#7D0000]">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-neutral-900">
                  Exporter les données (JSON)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  Téléchargez une copie complète de tous les articles, tarifs et produits modifiés.
                  Idéal pour sauvegarder avant une présentation ou transférer vers un autre poste.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  exportBackup();
                  showToast('Sauvegarde exportée avec succès');
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
                  Restaurez instantanément l&apos;état complet du site depuis un fichier JSON exporté précédemment.
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
                  Réinitialiser les données d&apos;usine
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  Remet à zéro l&apos;ensemble du contenu pour restaurer les données officielles SOBRAGA
                  d&apos;origine après une séance de tests ou de démonstration.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      'Êtes-vous sûr de vouloir réinitialiser toutes les données aux valeurs officielles par défaut ?'
                    )
                  ) {
                    resetToDefaults();
                    showToast('Données réinitialisées aux valeurs d’origine');
                  }
                }}
                className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-bold text-red-700 transition hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Restaurer les données officielles</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: CREATE / EDIT ARTICLE */}
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

      {/* MODAL: EDIT PRICE LINE */}
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

      {/* MODAL: ADD CAREER OFFER */}
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
    </div>
  );
};

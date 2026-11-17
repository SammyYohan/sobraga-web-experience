import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { DOCUMENTS, DocumentItem } from './data/siteData';
import { parseRoute, AppRoute } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AgeGateModal } from './components/AgeGateModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { SupportWidget } from './components/SupportWidget';
import { HomePage } from './pages/HomePage';
import { EntreprisePages } from './pages/EntreprisePages';
import { ProductsPage, ProductDetailPage } from './pages/ProductsPages';
import { WineCellarPage } from './pages/WineCellarPage';
import { NewsPage, ArticleDetailPage } from './pages/NewsPages';
import { DocuthequePage } from './pages/DocuthequePage';
import { RsePage } from './pages/RsePage';
import { ContactPage, CareersPage } from './pages/FormsPages';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { LegalPage } from './pages/LegalPages';

const AGE_STORAGE_KEY = 'sobraga_age_verified_v1';

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    parseRoute(window.location.pathname, window.location.search)
  );
  const [ageVerified, setAgeVerified] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return true;
    try {
      return localStorage.getItem(AGE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [activeDocument, setActiveDocument] = useState<DocumentItem | null>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRoute(window.location.pathname, window.location.search));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((path: string) => {
    if (path === '#prix-homologues') {
      const prixDoc = DOCUMENTS.find((d) => d.id === 'prix-homologues-lbv') || null;
      setActiveDocument(prixDoc);
      return;
    }
    window.history.pushState({}, '', path);
    setRoute(parseRoute(window.location.pathname, window.location.search));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleConfirmAge = (remember: boolean) => {
    setAgeVerified(true);
    if (remember) {
      try {
        localStorage.setItem(AGE_STORAGE_KEY, 'true');
      } catch {
        // ignore storage errors
      }
    }
  };

  const openPrixHomologues = () => {
    const prixDoc = DOCUMENTS.find((d) => d.id === 'prix-homologues-lbv') || null;
    setActiveDocument(prixDoc);
  };

  const routeKey = JSON.stringify(route);

  const renderPage = () => {
    switch (route.name) {
      case 'home':
        return <HomePage onNavigate={navigate} onOpenPrixHomologues={openPrixHomologues} />;
      case 'mot-dg':
        return (
          <EntreprisePages
            section="mot-dg"
            onNavigate={navigate}
            onOpenDocument={setActiveDocument}
          />
        );
      case 'notre-histoire':
        return (
          <EntreprisePages
            section="notre-histoire"
            onNavigate={navigate}
            onOpenDocument={setActiveDocument}
          />
        );
      case 'nos-valeurs':
        return (
          <EntreprisePages
            section="nos-valeurs"
            onNavigate={navigate}
            onOpenDocument={setActiveDocument}
          />
        );
      case 'capsules':
        return (
          <EntreprisePages
            section="capsules"
            onNavigate={navigate}
            onOpenDocument={setActiveDocument}
          />
        );
      case 'actualites':
        return <NewsPage page={route.page} onNavigate={navigate} />;
      case 'article-detail':
        return <ArticleDetailPage slug={route.slug} onNavigate={navigate} />;
      case 'produits':
        return <ProductsPage activeCategory={route.category} onNavigate={navigate} />;
      case 'produit-detail':
        return <ProductDetailPage slug={route.slug} onNavigate={navigate} />;
      case 'docutheque':
        return (
          <DocuthequePage
            section={route.section}
            onNavigate={navigate}
            onOpenDocument={setActiveDocument}
          />
        );
      case 'cave':
        return <WineCellarPage />;
      case 'rse':
        return <RsePage onNavigate={navigate} onOpenDocument={setActiveDocument} />;
      case 'contact':
        return <ContactPage />;
      case 'rejoignez-nous':
        return <CareersPage />;
      case 'recherche':
        return (
          <SearchResultsPage
            query={route.query}
            onNavigate={navigate}
            onOpenDocument={setActiveDocument}
          />
        );
      case 'mentions-legales':
        return <LegalPage kind="mentions" />;
      case 'politique-confidentialite':
        return <LegalPage kind="privacy" />;
      default:
        return <HomePage onNavigate={navigate} onOpenPrixHomologues={openPrixHomologues} />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white text-[#1a1a1a]">
        {/* Razor-thin top scroll progress indicator */}
        <motion.div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-50 h-[2.5px] origin-left bg-gradient-to-r from-[#7D0000] via-[#E11D48] to-[#F59E0B]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Momentary liquid crimson-gold wave sweep on page navigation */}
        <AnimatePresence>
          <motion.div
            key={`wave-${routeKey}`}
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0.9 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0.9, 0.75, 0] }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#7D0000] via-[#F59E0B] to-[#9E0B0F]"
          />
        </AnimatePresence>

        <Header
          currentRoute={route}
          onNavigate={navigate}
          onOpenPrixHomologues={openPrixHomologues}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={routeKey}
              initial={{ opacity: 0, y: 12, scale: 0.994 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.996 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={navigate} />

        <AgeGateModal open={!ageVerified} onConfirm={handleConfirmAge} />
        <DocumentViewerModal doc={activeDocument} onClose={() => setActiveDocument(null)} />
        <SupportWidget onNavigate={navigate} />
      </div>
    </MotionConfig>
  );
}

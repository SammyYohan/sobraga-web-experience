import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import {
  ChevronDown,
  Search,
  ArrowRight,
  Menu,
  X,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';
import { SobragaLogo } from './BrandArtwork';
import { AppRoute } from '../utils/router';

interface HeaderProps {
  currentRoute: AppRoute;
  onNavigate: (path: string) => void;
  onOpenPrixHomologues: () => void;
}

type NavKey =
  | 'home'
  | 'entreprise'
  | 'actualites'
  | 'produits'
  | 'docutheque'
  | 'cave'
  | 'rse'
  | 'contact';

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenPrixHomologues,
}) => {
  const [openDropdown, setOpenDropdown] = useState<'entreprise' | 'docutheque' | null>(null);
  const [hoveredNav, setHoveredNav] = useState<NavKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 24;
    if (next !== scrolled) {
      setScrolled(next);
    }
  });

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onNavigate(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchOpen(false);
    setMobileMenuOpen(false);
    onNavigate(`/recherche?q=${encodeURIComponent(q)}`);
  };

  const isEntrepriseActive =
    currentRoute.name === 'mot-dg' ||
    currentRoute.name === 'notre-histoire' ||
    currentRoute.name === 'nos-valeurs' ||
    currentRoute.name === 'capsules';

  const isDocuthequeActive = currentRoute.name === 'docutheque';

  const activeNavKey: NavKey | null =
    currentRoute.name === 'home'
      ? 'home'
      : isEntrepriseActive
        ? 'entreprise'
        : currentRoute.name === 'actualites' || currentRoute.name === 'article-detail'
          ? 'actualites'
          : currentRoute.name === 'produits' || currentRoute.name === 'produit-detail'
            ? 'produits'
            : isDocuthequeActive
              ? 'docutheque'
              : currentRoute.name === 'cave'
                ? 'cave'
                : currentRoute.name === 'rse'
                  ? 'rse'
                  : currentRoute.name === 'contact'
                    ? 'contact'
                    : null;

  const renderNavIndicator = (key: NavKey) => {
    const isCurrent = activeNavKey === key;
    const isHovered = hoveredNav === key;
    return (
      <>
        {isHovered && (
          <motion.span
            layoutId="sobraga-nav-hover-capsule"
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#FDF6F6]"
          />
        )}
        {isCurrent && (
          <motion.span
            layoutId="sobraga-nav-active-underline"
            transition={{ type: 'spring', stiffness: 440, damping: 34 }}
            className="pointer-events-none absolute right-2.5 bottom-0 left-2.5 h-[2.5px] rounded-full bg-gradient-to-r from-[#7D0000] via-[#C8102E] to-[#7D0000]"
          />
        )}
      </>
    );
  };

  return (
    <>
      {/* Top Dark Crimson Utility Bar */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#520000] via-[#7D0000] to-[#5D0000] text-white">
        {/* Subtle flowing liquid specular sheen across the utility ribbon */}
        <span
          aria-hidden="true"
          className="animate-header-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        <div className="relative z-10 mx-auto flex max-w-[1380px] items-center justify-between gap-2 px-4 py-1.5 text-[11px] font-medium md:px-8 md:py-2">
          <div className="flex items-center gap-3 md:gap-5">
            <span className="hidden whitespace-nowrap font-semibold sm:inline">
              Sobraga Les Boissons du Gabon
            </span>
            <button
              type="button"
              onClick={onOpenPrixHomologues}
              className="cursor-pointer whitespace-nowrap rounded-full bg-white px-3.5 py-1 text-[11px] font-bold text-[#7D0000] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-sm active:scale-95"
            >
              Prix homologués
            </button>
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <span className="whitespace-nowrap text-white/95 tabular-nums">
              Contactez-nous +241 011 70 19 79 / 011 70 19 69
            </span>
            <span className="whitespace-nowrap text-white/95 tabular-nums">
              Numéro consommateur +241 011 70 26 11
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/lasobraga/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Sobraga"
              className="opacity-90 transition hover:scale-110 hover:opacity-100"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/company/soci%C3%A9t%C3%A9-des-boissons-rafra%C3%AEchissantes-du-gabon-sobraga/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Sobraga"
              className="opacity-90 transition hover:scale-110 hover:opacity-100"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.instagram.com/lesboissonsdugabon/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Sobraga"
              className="opacity-90 transition hover:scale-110 hover:opacity-100"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.youtube.com/@sobraga1642/videos"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube Sobraga"
              className="opacity-90 transition hover:scale-110 hover:opacity-100"
            >
              <Youtube className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-30 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-lg shadow-red-950/5 backdrop-blur-lg'
            : 'bg-white/92 shadow-sm backdrop-blur-md'
        }`}
        ref={navRef}
      >
        {/* Main White Navigation Bar */}
        <div className="border-b border-neutral-200/80">
          <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-4 py-2.5 md:px-8 md:py-3">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-[#7D0000] ${
                scrolled ? 'scale-[0.96]' : 'scale-100'
              }`}
            >
              <SobragaLogo />
            </a>

            <nav
              className="hidden items-center gap-1 text-[13px] font-medium text-neutral-800 xl:flex"
              onMouseLeave={() => setHoveredNav(null)}
            >
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                onMouseEnter={() => setHoveredNav('home')}
                className={`relative px-3 py-2 whitespace-nowrap transition-colors hover:text-[#9E0B0F] ${
                  activeNavKey === 'home' ? 'font-bold text-[#9E0B0F]' : ''
                }`}
              >
                {renderNavIndicator('home')}
                Accueil
              </a>

              {/* Entreprise Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setOpenDropdown('entreprise');
                  setHoveredNav('entreprise');
                }}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={openDropdown === 'entreprise'}
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === 'entreprise' ? null : 'entreprise'))
                  }
                  className={`relative inline-flex cursor-pointer items-center gap-1 px-3 py-2 whitespace-nowrap transition-colors hover:text-[#9E0B0F] ${
                    isEntrepriseActive ? 'font-bold text-[#9E0B0F]' : ''
                  }`}
                >
                  {renderNavIndicator('entreprise')}
                  <span>Entreprise</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      openDropdown === 'entreprise' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === 'entreprise' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 z-40 w-64 overflow-hidden rounded-xl border border-neutral-200/80 bg-white/98 py-2 shadow-xl backdrop-blur-md"
                    >
                      <a
                        href="/mot-du-directeur-general/"
                        onClick={(e) => handleLinkClick(e, '/mot-du-directeur-general/')}
                        className="block px-5 py-2.5 text-xs font-medium text-neutral-700 transition hover:bg-[#FDF6F6] hover:pl-6 hover:text-[#9E0B0F]"
                      >
                        Mot du Directeur Général
                      </a>
                      <a
                        href="/notre-histoire/"
                        onClick={(e) => handleLinkClick(e, '/notre-histoire/')}
                        className="block px-5 py-2.5 text-xs font-medium text-neutral-700 transition hover:bg-[#FDF6F6] hover:pl-6 hover:text-[#9E0B0F]"
                      >
                        Notre histoire
                      </a>
                      <a
                        href="/nos-valeurs/"
                        onClick={(e) => handleLinkClick(e, '/nos-valeurs/')}
                        className="block px-5 py-2.5 text-xs font-medium text-neutral-700 transition hover:bg-[#FDF6F6] hover:pl-6 hover:text-[#9E0B0F]"
                      >
                        Nos valeurs
                      </a>
                      <a
                        href="/qualite-categorie/capsules-sobraga/"
                        onClick={(e) => handleLinkClick(e, '/qualite-categorie/capsules-sobraga/')}
                        className="block px-5 py-2.5 text-xs font-medium text-neutral-700 transition hover:bg-[#FDF6F6] hover:pl-6 hover:text-[#9E0B0F]"
                      >
                        Les capsules SOBRAGA
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="/nos-actualites/"
                onClick={(e) => handleLinkClick(e, '/nos-actualites/')}
                onMouseEnter={() => setHoveredNav('actualites')}
                className={`relative px-3 py-2 whitespace-nowrap transition-colors hover:text-[#9E0B0F] ${
                  activeNavKey === 'actualites' ? 'font-bold text-[#9E0B0F]' : ''
                }`}
              >
                {renderNavIndicator('actualites')}
                Actualités
              </a>

              <a
                href="/nos-produits/"
                onClick={(e) => handleLinkClick(e, '/nos-produits/')}
                onMouseEnter={() => setHoveredNav('produits')}
                className={`relative px-3 py-2 whitespace-nowrap transition-colors hover:text-[#9E0B0F] ${
                  activeNavKey === 'produits' ? 'font-bold text-[#9E0B0F]' : ''
                }`}
              >
                {renderNavIndicator('produits')}
                Produits
              </a>

              {/* Docuthèque Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setOpenDropdown('docutheque');
                  setHoveredNav('docutheque');
                }}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={openDropdown === 'docutheque'}
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === 'docutheque' ? null : 'docutheque'))
                  }
                  className={`relative inline-flex cursor-pointer items-center gap-1 px-3 py-2 whitespace-nowrap transition-colors hover:text-[#9E0B0F] ${
                    isDocuthequeActive ? 'font-bold text-[#9E0B0F]' : ''
                  }`}
                >
                  {renderNavIndicator('docutheque')}
                  <span>Docuthèque</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      openDropdown === 'docutheque' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === 'docutheque' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 z-40 w-56 overflow-hidden rounded-xl border border-neutral-200/80 bg-white/98 py-2 shadow-xl backdrop-blur-md"
                    >
                      <a
                        href="/qualite-categorie/engagement-qualite/"
                        onClick={(e) => handleLinkClick(e, '/qualite-categorie/engagement-qualite/')}
                        className="block px-5 py-2.5 text-xs font-medium text-neutral-700 transition hover:bg-[#FDF6F6] hover:pl-6 hover:text-[#9E0B0F]"
                      >
                        Engagement qualité
                      </a>
                      <a
                        href="/qualite-categorie/code-conduite/"
                        onClick={(e) => handleLinkClick(e, '/qualite-categorie/code-conduite/')}
                        className="block px-5 py-2.5 text-xs font-medium text-neutral-700 transition hover:bg-[#FDF6F6] hover:pl-6 hover:text-[#9E0B0F]"
                      >
                        Code de conduite
                      </a>
                      <a
                        href="/qualite-categorie/esbidjinews/"
                        onClick={(e) => handleLinkClick(e, '/qualite-categorie/esbidjinews/')}
                        className="block px-5 py-2.5 text-xs font-medium text-neutral-700 transition hover:bg-[#FDF6F6] hover:pl-6 hover:text-[#9E0B0F]"
                      >
                        ESBIDJINEWS
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="/notre-cave/"
                onClick={(e) => handleLinkClick(e, '/notre-cave/')}
                onMouseEnter={() => setHoveredNav('cave')}
                className={`relative px-3 py-2 whitespace-nowrap transition-colors hover:text-[#9E0B0F] ${
                  activeNavKey === 'cave' ? 'font-bold text-[#9E0B0F]' : ''
                }`}
              >
                {renderNavIndicator('cave')}
                Cave à vin
              </a>

              <a
                href="/rse/"
                onClick={(e) => handleLinkClick(e, '/rse/')}
                onMouseEnter={() => setHoveredNav('rse')}
                className={`relative px-3 py-2 whitespace-nowrap transition-colors hover:text-[#9E0B0F] ${
                  activeNavKey === 'rse' ? 'font-bold text-[#9E0B0F]' : ''
                }`}
              >
                {renderNavIndicator('rse')}
                RSE
              </a>

              <a
                href="/contact/"
                onClick={(e) => handleLinkClick(e, '/contact/')}
                onMouseEnter={() => setHoveredNav('contact')}
                className={`relative px-3 py-2 whitespace-nowrap transition-colors hover:text-[#9E0B0F] ${
                  activeNavKey === 'contact' ? 'font-bold text-[#9E0B0F]' : ''
                }`}
              >
                {renderNavIndicator('contact')}
                Contact
              </a>
            </nav>

            {/* Right Actions: Rejoignez-nous & Recherche */}
            <div className="flex items-center gap-4">
              <a
                href="/rejoignez-nous/"
                onClick={(e) => handleLinkClick(e, '/rejoignez-nous/')}
                className={`group hidden items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition hover:bg-[#FDF6F6] hover:text-[#9E0B0F] sm:inline-flex ${
                  currentRoute.name === 'rejoignez-nous'
                    ? 'bg-[#FDF6F6] font-bold text-[#9E0B0F]'
                    : 'text-neutral-800'
                }`}
              >
                <ArrowRight className="h-3.5 w-3.5 text-[#9E0B0F] transition-transform duration-200 group-hover:translate-x-0.5" />
                <span>Rejoignez-nous</span>
              </a>

              <button
                type="button"
                onClick={() => setSearchOpen((o) => !o)}
                aria-label="Recherche"
                aria-expanded={searchOpen}
                className="flex cursor-pointer flex-col items-center gap-0.5 border-l border-neutral-200 pl-4 text-neutral-700 transition hover:text-[#9E0B0F]"
              >
                <Search className="h-4 w-4" />
                <span className="text-[11px] font-medium">Recherche</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-label="Menu principal"
                aria-expanded={mobileMenuOpen}
                className="rounded-md p-2 text-neutral-700 transition hover:bg-neutral-100 xl:hidden"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Search Overlay Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-neutral-200 bg-[#FDF6F6]"
              >
                <div className="px-4 py-4 md:px-8">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="mx-auto flex max-w-3xl items-center gap-3"
                    role="search"
                  >
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Votre recherche ..."
                        aria-label="Votre recherche"
                        className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pr-4 pl-10 text-sm text-neutral-900 focus:border-[#7D0000] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="cursor-pointer rounded-lg bg-[#7D0000] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9E0B0F]"
                    >
                      Rechercher
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      aria-label="Fermer la recherche"
                      className="cursor-pointer rounded-lg p-2 text-neutral-500 hover:bg-neutral-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-neutral-200 bg-white px-4 py-4 xl:hidden"
              >
                <div className="space-y-1 text-sm font-medium text-neutral-800">
                  <a
                    href="/"
                    onClick={(e) => handleLinkClick(e, '/')}
                    className="block rounded-md px-3 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Accueil
                  </a>
                  <div className="px-3 pt-2 pb-1 text-xs font-bold tracking-wider text-neutral-400 uppercase">
                    Entreprise
                  </div>
                  <a
                    href="/mot-du-directeur-general/"
                    onClick={(e) => handleLinkClick(e, '/mot-du-directeur-general/')}
                    className="block rounded-md px-5 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Mot du Directeur Général
                  </a>
                  <a
                    href="/notre-histoire/"
                    onClick={(e) => handleLinkClick(e, '/notre-histoire/')}
                    className="block rounded-md px-5 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Notre histoire
                  </a>
                  <a
                    href="/nos-valeurs/"
                    onClick={(e) => handleLinkClick(e, '/nos-valeurs/')}
                    className="block rounded-md px-5 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Nos valeurs
                  </a>
                  <a
                    href="/qualite-categorie/capsules-sobraga/"
                    onClick={(e) => handleLinkClick(e, '/qualite-categorie/capsules-sobraga/')}
                    className="block rounded-md px-5 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Les capsules SOBRAGA
                  </a>
                  <a
                    href="/nos-actualites/"
                    onClick={(e) => handleLinkClick(e, '/nos-actualites/')}
                    className="block rounded-md px-3 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Actualités
                  </a>
                  <a
                    href="/nos-produits/"
                    onClick={(e) => handleLinkClick(e, '/nos-produits/')}
                    className="block rounded-md px-3 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Produits
                  </a>
                  <div className="px-3 pt-2 pb-1 text-xs font-bold tracking-wider text-neutral-400 uppercase">
                    Docuthèque
                  </div>
                  <a
                    href="/qualite-categorie/engagement-qualite/"
                    onClick={(e) => handleLinkClick(e, '/qualite-categorie/engagement-qualite/')}
                    className="block rounded-md px-5 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Engagement qualité
                  </a>
                  <a
                    href="/qualite-categorie/code-conduite/"
                    onClick={(e) => handleLinkClick(e, '/qualite-categorie/code-conduite/')}
                    className="block rounded-md px-5 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Code de conduite
                  </a>
                  <a
                    href="/qualite-categorie/esbidjinews/"
                    onClick={(e) => handleLinkClick(e, '/qualite-categorie/esbidjinews/')}
                    className="block rounded-md px-5 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    ESBIDJINEWS
                  </a>
                  <a
                    href="/notre-cave/"
                    onClick={(e) => handleLinkClick(e, '/notre-cave/')}
                    className="block rounded-md px-3 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Cave à vin
                  </a>
                  <a
                    href="/rse/"
                    onClick={(e) => handleLinkClick(e, '/rse/')}
                    className="block rounded-md px-3 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    RSE
                  </a>
                  <a
                    href="/contact/"
                    onClick={(e) => handleLinkClick(e, '/contact/')}
                    className="block rounded-md px-3 py-2 hover:bg-[#FDF6F6] hover:text-[#9E0B0F]"
                  >
                    Contact
                  </a>
                  <a
                    href="/rejoignez-nous/"
                    onClick={(e) => handleLinkClick(e, '/rejoignez-nous/')}
                    className="mt-2 block rounded-md bg-[#7D0000] px-4 py-2.5 text-center font-semibold text-white"
                  >
                    Rejoignez-nous
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

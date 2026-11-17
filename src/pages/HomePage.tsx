import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Droplets } from 'lucide-react';
import {
  HERO_SLIDES,
  PRODUCT_CATEGORIES,
  ProductCategoryId,
} from '../data/siteData';
import { useSiteData } from '../context/SiteContext';
import { CategoryPackVisual } from '../components/BrandArtwork';
import {
  BubbleFlavor,
  CondensationBackdrop,
  Effervescence3DBubbles,
  EditorialTextReveal,
  LiquidRipplePedestal,
  PartnerMarqueeBar,
} from '../components/LiquidEffects';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenPrixHomologues: () => void;
}

const HERO_KPIS = [
  { value: '1966 – 2026', label: "60 ans d'histoire gabonaise", href: '/notre-histoire/' },
  { value: '6 Usines', label: 'Implantation nationale complète', href: '/notre-histoire/' },
  { value: '93 Références', label: 'Boissons gazeuses, eaux & bières', href: '/nos-produits/' },
  { value: '~2 000', label: 'Emplois directs au Gabon', href: '/rejoignez-nous/' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenPrixHomologues }) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [newsOffset, setNewsOffset] = useState(0);

  const { articles } = useSiteData();
  const featuredArticles = articles.slice(0, 9);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6800);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[heroIndex];

  const handleHeroPrev = () => {
    setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleHeroNext = () => {
    setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const visibleArticles = [
    featuredArticles[newsOffset % featuredArticles.length],
    featuredArticles[(newsOffset + 1) % featuredArticles.length],
    featuredArticles[(newsOffset + 2) % featuredArticles.length],
  ];

  const productCategoryCards = PRODUCT_CATEGORIES.filter(
    (
      c
    ): c is {
      id: Exclude<ProductCategoryId, 'all'>;
      label: string;
      shortLabel: string;
      description: string;
    } => c.id !== 'all'
  );

  const heroFlavor: BubbleFlavor =
    currentSlide.id === 'slide-djino'
      ? 'soda'
      : currentSlide.id === 'slide-lavie' || currentSlide.id === 'slide-communique'
        ? 'beer'
        : 'mixed';

  return (
    <div>
      {/* 1. Cinematic 2026 Hero Carousel in Rounded Frame */}
      <div className="mx-auto max-w-[1400px] px-3 pt-3 md:px-6 md:pt-4">
        <section className="relative h-[460px] w-full overflow-hidden rounded-2xl bg-neutral-950 shadow-xl ring-1 ring-black/10 md:h-[560px] md:rounded-3xl">
          <AnimatePresence mode="wait">
            {currentSlide.kind === 'communique' ? (
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="relative flex h-full w-full items-center bg-gradient-to-br from-white via-[#FFF7F7] to-[#FBECEC]"
              >
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  referrerPolicy="no-referrer"
                  className="animate-ken-burns absolute inset-0 h-full w-full object-cover opacity-15"
                />
                <CondensationBackdrop tone="light" intensity="subtle" />
                <Effervescence3DBubbles flavor="beer" density="subtle" />

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 mx-auto max-w-[1120px] px-5 pb-10 text-center md:px-20 md:pb-0"
                >
                  <div className="inline-block rounded-xl bg-[#C8102E] px-5 py-1.5 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-sm md:px-6 md:py-2 md:text-sm">
                    COMMUNIQUÉ DE PRESSE
                  </div>
                  <div className="mt-2.5 rounded-2xl bg-gradient-to-r from-[#8A0000] via-[#A40910] to-[#8A0000] px-4 py-3 text-sm font-extrabold tracking-tight text-white uppercase shadow-lg md:px-7 md:py-3.5 md:text-2xl">
                    SOBRAGA PROCÈDE À UN RÉAJUSTEMENT TARIFAIRE DE RÉGAB 65 CL ET 33 CL
                  </div>
                <p className="mx-auto mt-4 max-w-3xl text-xs font-medium leading-relaxed text-neutral-800 md:mt-5 md:text-base">
                  {currentSlide.subtitle}
                </p>
                <button
                  type="button"
                  onClick={onOpenPrixHomologues}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#7D0000] px-7 py-3 text-xs font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9E0B0F] hover:shadow-lg md:mt-6"
                >
                  <span>{currentSlide.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="relative h-full w-full"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="animate-ken-burns h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/52 to-[#3b0000]/25" />
              <CondensationBackdrop tone="dark" intensity="rich" />
              <Effervescence3DBubbles flavor={heroFlavor} density="medium" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 bottom-16 mx-auto max-w-[1280px] px-5 text-white md:bottom-16 md:px-20"
              >
                <EditorialTextReveal
                  key={`hero-title-${currentSlide.id}`}
                  text={currentSlide.title}
                  as="h2"
                  immediate
                  delay={0.04}
                  className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight drop-shadow-sm md:text-5xl"
                />
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/95 md:text-base">
                  {currentSlide.subtitle}
                </p>
                {currentSlide.ctaHref && (
                  <button
                    type="button"
                    onClick={() => onNavigate(currentSlide.ctaHref!)}
                    className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#9E0B0F] to-[#7D0000] px-7 py-3 text-xs font-bold text-white shadow-lg ring-1 ring-white/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <span>{currentSlide.ctaLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel Prev / Next */}
        <button
          type="button"
          onClick={handleHeroPrev}
          aria-label="Slide précédente"
          className="absolute right-16 bottom-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#7D0000] shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white md:top-1/2 md:right-auto md:bottom-auto md:left-5 md:h-11 md:w-11 md:-translate-y-1/2"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleHeroNext}
          aria-label="Slide suivante"
          className="absolute right-4 bottom-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#7D0000] shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white md:top-1/2 md:right-5 md:bottom-auto md:h-11 md:w-11 md:-translate-y-1/2"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-5 z-20 flex items-center gap-2.5 md:bottom-6 md:left-20">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setHeroIndex(idx)}
              aria-label={`Aller à la diapositive ${idx + 1}`}
              className={`h-2.5 cursor-pointer rounded-full border border-white/80 transition-all duration-300 ${
                idx === heroIndex ? 'w-7 bg-white' : 'w-2.5 bg-transparent hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        </section>
      </div>

      {/* 1b. Interactive Heritage & Scale Strip (60 ans de SOBRAGA) */}
      <section className="mx-auto mt-5 max-w-[1400px] px-3 md:px-6">
        <div className="grid grid-cols-2 divide-y divide-neutral-200/70 overflow-hidden rounded-2xl border border-red-100/90 bg-[#FDF6F6]/80 shadow-xs md:grid-cols-4 md:divide-x md:divide-y-0">
          {HERO_KPIS.map((kpi) => (
            <button
              key={kpi.value}
              type="button"
              onClick={() => onNavigate(kpi.href)}
              className="group cursor-pointer px-5 py-5 text-center transition hover:bg-white md:px-6 md:py-6"
            >
              <div className="text-lg font-extrabold tracking-tight text-[#7D0000] tabular-nums transition-transform group-hover:scale-105 md:text-2xl">
                {kpi.value}
              </div>
              <div className="mt-1 text-xs font-medium text-neutral-600 transition-colors group-hover:text-[#9E0B0F]">
                {kpi.label}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Articles à la une */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-8">
        <div className="flex flex-col items-center text-center">
          <EditorialTextReveal
            text="Articles à la une"
            as="h2"
            className="text-2xl font-extrabold tracking-tight text-[#1E1E1E] md:text-3xl"
          />
          <p className="mt-2 max-w-xl text-sm text-neutral-500">
            Actualités industrielles, engagements citoyens et moments forts des Boissons du Gabon.
          </p>
        </div>

        <div className="relative mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setNewsOffset(
                (prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length
              )
            }
            aria-label="Articles précédents"
            className="hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-[#9E0B0F] shadow-2xs transition hover:border-[#9E0B0F] hover:bg-red-50 md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="grid flex-1 gap-6 md:grid-cols-3">
            {visibleArticles.map((article) => (
              <button
                key={article.slug}
                type="button"
                onClick={() => onNavigate(`/actualites/${article.slug}`)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white text-left shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-red-200 hover:shadow-xl"
              >
                <div className="p-2.5 pb-0">
                  <div className="relative h-48 overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-black/5">
                    <img
                      src={article.bannerImage}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div
                      className="absolute inset-x-0 bottom-0 h-1.5"
                      style={{ backgroundColor: article.accentColor }}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 pt-4">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#9E0B0F]">{article.tag}</span>
                  </div>
                  <h3 className="mt-2 line-clamp-3 text-base font-bold leading-snug text-neutral-900 transition-colors group-hover:text-[#7D0000]">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-3 flex-1 text-xs leading-relaxed text-neutral-600">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#9E0B0F] transition-all group-hover:gap-3">
                    <span>En savoir plus</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setNewsOffset((prev) => (prev + 1) % featuredArticles.length)}
            aria-label="Articles suivants"
            className="hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-[#9E0B0F] shadow-2xs transition hover:border-[#9E0B0F] hover:bg-red-50 md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile carousel nav */}
        <div className="mt-5 flex justify-center gap-4 md:hidden">
          <button
            type="button"
            onClick={() =>
              setNewsOffset(
                (prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length
              )
            }
            aria-label="Articles précédents"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-300 text-[#9E0B0F]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setNewsOffset((prev) => (prev + 1) % featuredArticles.length)}
            aria-label="Articles suivants"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-300 text-[#9E0B0F]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => onNavigate('/nos-actualites/')}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#7D0000] px-7 py-2.5 text-xs font-bold text-[#7D0000] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7D0000] hover:text-white hover:shadow-md"
          >
            <span>Voir tous les articles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Découvrez nos produits Sobraga — Chilled Crimson Rounded Showcase */}
      <div className="mx-auto max-w-[1400px] px-3 md:px-6">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#520000] via-[#7D0000] to-[#98080D] py-16 text-white shadow-xl ring-1 ring-black/10 md:rounded-3xl md:py-18">
          <CondensationBackdrop tone="dark" intensity="rich" />
          <Effervescence3DBubbles flavor="mixed" density="subtle" />

          <div className="relative z-10 mx-auto max-w-[1340px] px-4 md:px-8">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-red-200 uppercase">
                <Droplets className="h-3.5 w-3.5" />
                <span>Fraîcheur &amp; Savoir-faire</span>
              </span>
              <EditorialTextReveal
                text="Découvrez nos produits Sobraga"
                as="h2"
                className="mt-2 text-2xl font-extrabold tracking-tight md:text-4xl"
              />
            </div>

            <div className="mt-11 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {productCategoryCards.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onNavigate(`/nos-produits/${cat.id}`)}
                  className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl border border-white/40 bg-white/95 px-4 pt-6 pb-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:bg-white hover:shadow-2xl"
                >
                  {/* Soft condensation top gloss */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-sky-100/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <LiquidRipplePedestal variant="light" className="h-40">
                    <CategoryPackVisual category={cat.id} />
                  </LiquidRipplePedestal>
                  <span className="mt-3 text-sm font-extrabold tracking-tight text-[#1E1E1E] transition-colors group-hover:text-[#9E0B0F]">
                    {cat.shortLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 4. Nos marques & Partenaires — Barre déroulante fluide avec agrandissement */}
      <section className="relative bg-gradient-to-b from-white via-[#FDF6F6]/45 to-white py-16">
        <div className="mx-auto max-w-[1280px] px-4 text-center md:px-8">
          <EditorialTextReveal
            text="Nos marques & partenaires"
            as="h2"
            className="text-2xl font-extrabold tracking-tight text-[#1E1E1E] md:text-3xl"
          />
          <p className="mx-auto mt-2 max-w-2xl text-xs text-neutral-500 md:text-sm">
            27 marques emblématiques produites et distribuées au Gabon avec l’excellence du Groupe Castel.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[1440px]">
          <PartnerMarqueeBar onNavigate={onNavigate} />
        </div>
      </section>
    </div>
  );
};

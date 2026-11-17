import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Phone, Mail, Wine, X, Thermometer, Utensils } from 'lucide-react';
import { SubpageBanner } from '../components/SubpageBanner';
import { ProductBottleVisual } from '../components/BrandArtwork';
import {
  CondensationBackdrop,
  Effervescence3DBubbles,
  EditorialTextReveal,
  LiquidRipplePedestal,
} from '../components/LiquidEffects';
import {
  SITE_ASSETS,
  WINE_CATEGORIES,
  WineCategoryId,
  WineItem,
} from '../data/siteData';
import { filterWines } from '../utils/siteLogic';

export const WineCellarPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<WineCategoryId>('all');
  const [selectedWine, setSelectedWine] = useState<WineItem | null>(null);

  const items = filterWines(activeCategory);

  return (
    <div>
      <SubpageBanner
        title="Cave à vin"
        subtitle="Sélection Sovingab · Groupe Castel"
        image={SITE_ASSETS.heroWineCellar}
        bubbleFlavor="wine"
      />

      {/* Intro & Sovingab Contacts */}
      <section className="mx-auto max-w-[1240px] px-4 py-14 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <EditorialTextReveal
              text="Bienvenue sur notre cave à vin virtuelle !"
              as="h2"
              className="font-editorial text-3xl font-bold tracking-tight text-[#1E1E1E] md:text-4xl"
            />
            <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-[15px]">
              Découvrez ici quelques-unes de nos meilleures références sélectionnées pour vous par
              nos spécialistes. Consultez en ligne vos vins préférés, leurs caractéristiques et
              leurs accords, et retrouvez-les dans nos points de vente partenaires près de chez vous
              !
            </p>
            <a
              href="https://www.facebook.com/Sovingab"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3B5998] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#324b81] hover:shadow-md"
            >
              <Facebook className="h-4 w-4 fill-current" />
              <span>Visitez notre page Facebook</span>
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#FDF6F6] shadow-sm md:col-span-5">
            <div className="p-3 pb-0">
              <div className="relative h-48 overflow-hidden rounded-xl ring-1 ring-black/5">
                <img
                  src={SITE_ASSETS.heroWineCellar}
                  alt="Sovingab — Cave à vin du Gabon"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <CondensationBackdrop tone="dark" intensity="subtle" />
                <Effervescence3DBubbles flavor="wine" density="subtle" />
                <div className="absolute bottom-3 left-4 text-xs font-bold tracking-wider text-white uppercase">
                  Sovingab · Castel
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-base font-bold text-[#7D0000]">Contacts Cave à vin</h3>
              <div className="mt-3 space-y-2.5 text-xs text-neutral-700">
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#9E0B0F]" />
                  <span className="font-semibold">Téléphone :</span>
                  <a
                    href="tel:+24177269628"
                    className="tabular-nums font-medium text-neutral-800 underline decoration-red-200 underline-offset-2 hover:text-[#7D0000]"
                  >
                    077 26 96 28
                  </a>
                </p>
                <p className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9E0B0F]" />
                  <span>
                    <strong className="font-semibold">Mail :</strong>{' '}
                    <a
                      href="mailto:arthur.nicolas@castel-afrique.com"
                      className="underline decoration-red-200 underline-offset-2 hover:text-[#7D0000]"
                    >
                      arthur.nicolas@castel-afrique.com
                    </a>
                    {' / '}
                    <a
                      href="mailto:alain.david@castel-afrique.com"
                      className="underline decoration-red-200 underline-offset-2 hover:text-[#7D0000]"
                    >
                      alain.david@castel-afrique.com
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Wine Catalog */}
      <section className="mx-auto max-w-[1240px] px-4 pb-16 md:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#1E1E1E]">
            Découvrez nos produits
          </h2>
          <span className="text-xs font-semibold text-neutral-500 tabular-nums">
            {items.length} cuvée{items.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-6 overflow-x-auto border-b border-neutral-200">
          {WINE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative cursor-pointer pb-3.5 text-xs font-bold tracking-wide whitespace-nowrap uppercase transition md:text-sm ${
                  isActive ? 'text-[#9E0B0F]' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="wine-active-tab"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-[#9E0B0F]"
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((wine) => (
            <button
              key={wine.id}
              type="button"
              onClick={() => setSelectedWine(wine)}
              className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-5 text-center shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#7D0000]/50 hover:shadow-xl"
            >
              <LiquidRipplePedestal variant="light" className="h-48">
                <ProductBottleVisual
                  name={wine.name}
                  shape={wine.shape}
                  primaryColor={wine.foilColor}
                  secondaryColor={wine.labelColor}
                  liquidColor={wine.bottleColor}
                  capColor={wine.foilColor}
                  size="md"
                />
              </LiquidRipplePedestal>
              <h3 className="mt-3 line-clamp-2 text-xs font-bold text-neutral-900 transition-colors group-hover:text-[#9E0B0F]">
                {wine.name}
              </h3>
              <p className="mt-1 text-[11px] text-neutral-500">
                {wine.categoryLabel} · {wine.colorType}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Wine Tasting Sheet Modal */}
      <AnimatePresence>
        {selectedWine && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wine-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-[#5D0000] to-[#8C080C] px-6 py-4 text-white">
                <div className="flex items-center gap-2.5">
                  <Wine className="h-5 w-5" />
                  <span className="text-xs font-semibold tracking-wider uppercase">
                    {selectedWine.categoryLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedWine(null)}
                  aria-label="Fermer la fiche vin"
                  className="cursor-pointer rounded-lg p-1.5 transition hover:bg-white/15"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-6 p-6 sm:grid-cols-12">
                <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#FDF6F6] to-white p-6 sm:col-span-4">
                  <CondensationBackdrop tone="light" intensity="subtle" />
                  <div className="relative z-10">
                    <ProductBottleVisual
                      name={selectedWine.name}
                      shape={selectedWine.shape}
                      primaryColor={selectedWine.foilColor}
                      secondaryColor={selectedWine.labelColor}
                      liquidColor={selectedWine.bottleColor}
                      capColor={selectedWine.foilColor}
                      size="md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-8">
                  <h3
                    id="wine-modal-title"
                    className="font-editorial text-2xl font-bold text-neutral-900"
                  >
                    {selectedWine.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#9E0B0F]">
                    {selectedWine.appellation} · {selectedWine.colorType}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                    {selectedWine.description}
                  </p>

                  <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-xs text-neutral-700">
                    <p>
                      <strong>Cépages :</strong> {selectedWine.grape}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Thermometer className="h-3.5 w-3.5 text-[#9E0B0F]" />
                      <strong>Température de service :</strong> {selectedWine.temp}
                    </p>
                    <div className="flex items-start gap-1.5">
                      <Utensils className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9E0B0F]" />
                      <span>
                        <strong>Accords mets &amp; vins :</strong> {selectedWine.pairings.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

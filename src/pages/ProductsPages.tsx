import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Droplets } from 'lucide-react';
import { SubpageBanner } from '../components/SubpageBanner';
import { ProductBottleVisual } from '../components/BrandArtwork';
import {
  BubbleFlavor,
  CondensationBackdrop,
  Effervescence3DBubbles,
  LiquidRipplePedestal,
} from '../components/LiquidEffects';
import {
  PRODUCT_CATEGORIES,
  PRODUCTS,
  ProductCategoryId,
  SITE_ASSETS,
} from '../data/siteData';
import { filterProducts } from '../utils/siteLogic';

interface ProductsPageProps {
  activeCategory: string;
  onNavigate: (path: string) => void;
}

const getFlavorForCategory = (cat: ProductCategoryId): BubbleFlavor => {
  if (cat === 'bieres') return 'beer';
  if (cat === 'eaux') return 'water';
  if (cat === 'boissons-gazeuses' || cat === 'jus-fruits' || cat === 'energy-drink') return 'soda';
  return 'mixed';
};

export const ProductsPage: React.FC<ProductsPageProps> = ({ activeCategory, onNavigate }) => {
  const validCat = PRODUCT_CATEGORIES.some((c) => c.id === activeCategory)
    ? (activeCategory as ProductCategoryId)
    : 'all';

  const items = filterProducts(validCat);
  const bannerFlavor = getFlavorForCategory(validCat);

  return (
    <div>
      <SubpageBanner
        title="Produits"
        subtitle="Gamme officielle"
        image={SITE_ASSETS.heroDjino}
        bubbleFlavor={bannerFlavor}
      />

      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#1E1E1E] md:text-3xl">
            Découvrez nos produits
          </h2>
          <span className="text-xs font-semibold text-neutral-500 tabular-nums">
            {items.length} référence{items.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Filter Bar */}
        <div className="mt-7 flex items-center gap-6 overflow-x-auto border-b border-neutral-200 pb-0">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = validCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  onNavigate(cat.id === 'all' ? '/nos-produits/' : `/nos-produits/${cat.id}`)
                }
                className={`relative cursor-pointer pb-3.5 text-xs font-bold tracking-wide whitespace-nowrap uppercase transition md:text-sm ${
                  isActive ? 'text-[#9E0B0F]' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="products-active-tab"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-[#9E0B0F]"
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Product Grid with Chilled Water Puddle Pedestals */}
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((product) => (
            <button
              key={product.slug}
              type="button"
              onClick={() => onNavigate(`/produits/${product.slug}/`)}
              className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 text-center shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-red-200 hover:shadow-xl"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FDF6F6] to-transparent opacity-70 transition-opacity group-hover:opacity-100"
              />
              <LiquidRipplePedestal variant="light" className="h-48">
                <ProductBottleVisual
                  name={product.name}
                  shape={product.shape}
                  primaryColor={product.primaryColor}
                  secondaryColor={product.secondaryColor}
                  liquidColor={product.liquidColor}
                  capColor={product.capColor}
                  badgeText={product.badgeText}
                  size="md"
                />
              </LiquidRipplePedestal>
              <h3 className="mt-3 text-sm font-bold text-neutral-900 transition-colors group-hover:text-[#9E0B0F]">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-neutral-500">{product.categoryLabel}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 6);

  const productFlavor = getFlavorForCategory(product.category);

  return (
    <div>
      <SubpageBanner
        title={product.name}
        subtitle={product.categoryLabel}
        image={product.category === 'bieres' ? SITE_ASSETS.heroRegab : SITE_ASSETS.heroDjino}
        bubbleFlavor={productFlavor}
      />

      <section className="mx-auto max-w-[1180px] px-4 py-10 md:px-8">
        <button
          type="button"
          onClick={() => onNavigate(`/nos-produits/${product.category}`)}
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#7D0000] transition hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour</span>
        </button>

        <div className="mt-8 grid items-start gap-10 md:grid-cols-12">
          {/* Chilled Condensation & 3D Effervescence Bottle Stage */}
          <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-b from-[#FDF6F6] via-white to-[#F9ECEC] p-10 shadow-sm md:col-span-5">
            <CondensationBackdrop tone="light" intensity="rich" />
            <Effervescence3DBubbles flavor={productFlavor} density="medium" />
            <div className="relative z-10 flex flex-col items-center">
              <LiquidRipplePedestal variant="light">
                <ProductBottleVisual
                  name={product.name}
                  shape={product.shape}
                  primaryColor={product.primaryColor}
                  secondaryColor={product.secondaryColor}
                  liquidColor={product.liquidColor}
                  capColor={product.capColor}
                  badgeText={product.badgeText}
                  size="lg"
                />
              </LiquidRipplePedestal>
              {product.price && (
                <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-bold leading-snug text-[#7D0000] md:text-sm">
                  <Droplets className="h-4 w-4 shrink-0 text-[#9E0B0F]" />
                  <span>Prix public conseillé : {product.price}</span>
                </div>
              )}
            </div>
          </div>

          {/* Story & À propos du produit */}
          <div className="md:col-span-7">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              {product.name}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-neutral-700 md:text-[15px]">
              {product.description}
            </p>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs">
              <h3 className="text-xs font-bold tracking-wider text-[#9E0B0F] uppercase">
                À propos du produit
              </h3>
              <dl className="mt-4 divide-y divide-neutral-100 text-sm">
                <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between">
                  <dt className="font-semibold text-neutral-500">Année de lancement</dt>
                  <dd className="font-bold text-neutral-900 tabular-nums">{product.launchYear}</dd>
                </div>
                <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="shrink-0 font-semibold text-neutral-500">Ingrédients</dt>
                  <dd className="text-right font-medium text-neutral-800">{product.ingredients}</dd>
                </div>
                <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between">
                  <dt className="font-semibold text-neutral-500">Type</dt>
                  <dd className="font-medium text-neutral-900">{product.type}</dd>
                </div>
                {product.alcohol && (
                  <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between">
                    <dt className="font-semibold text-neutral-500">Taux d&apos;alcool</dt>
                    <dd className="font-bold text-neutral-900 tabular-nums">{product.alcohol}</dd>
                  </div>
                )}
                <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="shrink-0 font-semibold text-neutral-500">Conditionnement</dt>
                  <dd className="text-right font-medium text-neutral-800">{product.packaging}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Découvrez aussi */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-neutral-200 pt-12">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">Découvrez aussi</h3>
              <button
                type="button"
                onClick={() => onNavigate('/nos-produits/')}
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#9E0B0F] hover:underline"
              >
                <span>Tous nos produits</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-6">
              {related.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => {
                    onNavigate(`/produits/${item.slug}/`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex cursor-pointer flex-col items-center rounded-2xl border border-neutral-200 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#7D0000] hover:shadow-md"
                >
                  <LiquidRipplePedestal variant="light">
                    <ProductBottleVisual
                      name={item.name}
                      shape={item.shape}
                      primaryColor={item.primaryColor}
                      secondaryColor={item.secondaryColor}
                      liquidColor={item.liquidColor}
                      capColor={item.capColor}
                      size="sm"
                    />
                  </LiquidRipplePedestal>
                  <span className="mt-2 text-xs font-bold text-neutral-800 group-hover:text-[#9E0B0F]">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

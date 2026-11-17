import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Play, LayoutGrid, Rows3 } from 'lucide-react';
import { BRANDS } from '../data/siteData';

type BrandItem = (typeof BRANDS)[number];

export type BubbleFlavor = 'beer' | 'soda' | 'water' | 'wine' | 'mixed';

interface BubbleSpec {
  left: string;
  bottom: string;
  size: number;
  duration: string;
  delay: string;
  sway: string;
  opacity: number;
  tint: 'gold' | 'amber' | 'citrus' | 'crystal' | 'rose';
}

const FLAVOR_PALETTES: Record<BubbleFlavor, BubbleSpec['tint'][]> = {
  beer: ['gold', 'amber', 'gold', 'crystal'],
  soda: ['citrus', 'amber', 'rose', 'crystal'],
  water: ['crystal', 'crystal', 'crystal', 'crystal'],
  wine: ['rose', 'gold', 'crystal', 'rose'],
  mixed: ['gold', 'citrus', 'crystal', 'rose'],
};

const TINT_STYLES: Record<
  BubbleSpec['tint'],
  { bg: string; border: string; shadow: string }
> = {
  gold: {
    bg: 'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.95) 0%, rgba(253,224,71,0.52) 34%, rgba(217,119,6,0.22) 72%, rgba(180,83,9,0.08) 100%)',
    border: 'rgba(254, 240, 138, 0.65)',
    shadow: '0 6px 18px rgba(217, 119, 6, 0.22), inset -2px -3px 6px rgba(180, 83, 9, 0.25)',
  },
  amber: {
    bg: 'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.92) 0%, rgba(251,146,60,0.48) 38%, rgba(234,88,12,0.22) 74%, rgba(154,52,18,0.08) 100%)',
    border: 'rgba(254, 215, 170, 0.65)',
    shadow: '0 6px 16px rgba(234, 88, 12, 0.2), inset -2px -3px 6px rgba(154, 52, 18, 0.22)',
  },
  citrus: {
    bg: 'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.95) 0%, rgba(163,230,53,0.42) 36%, rgba(34,197,94,0.18) 74%, rgba(21,128,61,0.06) 100%)',
    border: 'rgba(217, 249, 157, 0.6)',
    shadow: '0 6px 16px rgba(34, 197, 94, 0.16), inset -2px -3px 5px rgba(21, 128, 61, 0.18)',
  },
  crystal: {
    bg: 'radial-gradient(circle at 28% 26%, rgba(255,255,255,0.98) 0%, rgba(186,230,253,0.45) 38%, rgba(56,189,248,0.16) 74%, rgba(255,255,255,0.06) 100%)',
    border: 'rgba(224, 242, 254, 0.72)',
    shadow: '0 6px 18px rgba(14, 165, 233, 0.18), inset -2px -3px 6px rgba(255, 255, 255, 0.35)',
  },
  rose: {
    bg: 'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.95) 0%, rgba(253,164,175,0.48) 38%, rgba(225,29,72,0.18) 74%, rgba(125,0,0,0.08) 100%)',
    border: 'rgba(255, 228, 230, 0.65)',
    shadow: '0 6px 18px rgba(158, 11, 15, 0.2), inset -2px -3px 6px rgba(125, 0, 0, 0.22)',
  },
};

const BASE_BUBBLES: Omit<BubbleSpec, 'tint'>[] = [
  { left: '7%', bottom: '6%', size: 18, duration: '7.6s', delay: '0s', sway: '12px', opacity: 0.56 },
  { left: '13%', bottom: '2%', size: 9, duration: '5.8s', delay: '1.1s', sway: '-8px', opacity: 0.68 },
  { left: '21%', bottom: '8%', size: 13, duration: '6.8s', delay: '2.4s', sway: '9px', opacity: 0.5 },
  { left: '34%', bottom: '3%', size: 7, duration: '5.2s', delay: '0.6s', sway: '-6px', opacity: 0.62 },
  { left: '47%', bottom: '5%', size: 15, duration: '8.2s', delay: '3.1s', sway: '11px', opacity: 0.45 },
  { left: '62%', bottom: '4%', size: 10, duration: '6.1s', delay: '1.7s', sway: '-10px', opacity: 0.62 },
  { left: '74%', bottom: '7%', size: 20, duration: '8.8s', delay: '0.4s', sway: '14px', opacity: 0.5 },
  { left: '83%', bottom: '3%', size: 8, duration: '5.4s', delay: '2.8s', sway: '-7px', opacity: 0.68 },
  { left: '91%', bottom: '9%', size: 14, duration: '7.1s', delay: '1.4s', sway: '10px', opacity: 0.58 },
  { left: '95%', bottom: '2%', size: 6, duration: '4.9s', delay: '3.5s', sway: '-5px', opacity: 0.65 },
];

/**
 * Subtle 3D spherical effervescence bubbles simulating beer carbonation,
 * fruit juice fizz, sparkling wine pearls, and pure mineral water.
 */
export const Effervescence3DBubbles: React.FC<{
  flavor?: BubbleFlavor;
  density?: 'subtle' | 'medium';
  className?: string;
}> = ({ flavor = 'mixed', density = 'subtle', className = '' }) => {
  const palette = FLAVOR_PALETTES[flavor];
  const count = density === 'medium' ? BASE_BUBBLES.length : 6;
  const items = BASE_BUBBLES.slice(0, count);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {items.map((b, idx) => {
        const tint = palette[idx % palette.length];
        const style = TINT_STYLES[tint];
        return (
          <span
            key={`b3d-${flavor}-${idx}`}
            className="animate-bubble-3d absolute rounded-full"
            style={
              {
                left: b.left,
                bottom: b.bottom,
                width: `${b.size}px`,
                height: `${b.size}px`,
                animationDelay: b.delay,
                background: style.bg,
                border: `1px solid ${style.border}`,
                boxShadow: style.shadow,
                '--bubble-duration': b.duration,
                '--bubble-sway': b.sway,
                '--bubble-opacity': b.opacity,
              } as React.CSSProperties
            }
          >
            {/* Secondary tiny 3D specular highlight dot inside sphere */}
            <span
              className="absolute top-[18%] left-[22%] rounded-full bg-white/90"
              style={{
                width: `${Math.max(2, Math.round(b.size * 0.22))}px`,
                height: `${Math.max(2, Math.round(b.size * 0.16))}px`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
};

/**
 * Masked cinematic word-by-word text reveal for key hero & section headlines.
 * Guarantees crisp readability and immediate fallback under reduced motion.
 */
export const EditorialTextReveal: React.FC<{
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  immediate?: boolean;
  delay?: number;
}> = ({ text, as = 'h2', className = '', immediate = false, delay = 0 }) => {
  const words = text.split(' ');
  const MotionTag =
    as === 'h1' ? motion.h1 : as === 'h3' ? motion.h3 : as === 'p' ? motion.p : motion.h2;

  return (
    <MotionTag
      className={`text-balance ${className}`}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : {
            whileInView: 'visible',
            viewport: { once: true, amount: 0.05 },
          })}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="mr-[0.26em] inline-block overflow-hidden align-bottom leading-[1.15]"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: 0.42,
                  delay: delay + Math.min(idx * 0.038, 0.24),
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

/**
 * Crystalline condensation droplets & subtle rising effervescence bubbles
 * for beverage hero banners and chilled product showcases.
 */
export const CondensationBackdrop: React.FC<{
  tone?: 'dark' | 'light';
  intensity?: 'subtle' | 'rich';
  className?: string;
}> = ({ tone = 'dark', intensity = 'subtle', className = '' }) => {
  const droplets =
    intensity === 'rich'
      ? [
          { top: '10%', left: '6%', size: 12, delay: '0s' },
          { top: '24%', left: '14%', size: 7, delay: '0.8s' },
          { top: '68%', left: '9%', size: 10, delay: '1.5s' },
          { top: '16%', left: '88%', size: 14, delay: '0.4s' },
          { top: '42%', left: '93%', size: 8, delay: '1.9s' },
          { top: '76%', left: '84%', size: 11, delay: '1.1s' },
          { top: '82%', left: '24%', size: 9, delay: '2.3s' },
          { top: '12%', left: '54%', size: 6, delay: '2.9s' },
        ]
      : [
          { top: '16%', left: '8%', size: 10, delay: '0s' },
          { top: '72%', left: '14%', size: 8, delay: '1.2s' },
          { top: '20%', left: '89%', size: 11, delay: '0.6s' },
          { top: '74%', left: '86%', size: 7, delay: '1.8s' },
        ];

  const strokeColor =
    tone === 'dark' ? 'rgba(255,255,255,0.42)' : 'rgba(125,0,0,0.20)';
  const highlightColor =
    tone === 'dark' ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.95)';
  const fillGradient =
    tone === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.55)';

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {droplets.map((d, i) => (
        <span
          key={`drop-${i}`}
          className="animate-droplet absolute rounded-full"
          style={{
            top: d.top,
            left: d.left,
            width: `${d.size}px`,
            height: `${Math.round(d.size * 1.15)}px`,
            animationDelay: d.delay,
            background: `radial-gradient(circle at 32% 28%, ${highlightColor} 0%, ${fillGradient} 55%, rgba(0,0,0,0.08) 100%)`,
            border: `1px solid ${strokeColor}`,
            boxShadow:
              tone === 'dark'
                ? '0 3px 8px rgba(0,0,0,0.28), inset 0 1px 2px rgba(255,255,255,0.6)'
                : '0 2px 6px rgba(125,0,0,0.10), inset 0 1px 2px rgba(255,255,255,0.9)',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Chilled water puddle & concentric liquid ripple pedestal beneath bottles and packs.
 */
export const LiquidRipplePedestal: React.FC<{
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'crimson';
  className?: string;
}> = ({ children, variant = 'light', className = '' }) => {
  const ringBorder =
    variant === 'light' ? 'border-[#9E0B0F]/25' : 'border-white/35';
  const ringOuter =
    variant === 'light' ? 'border-sky-500/25' : 'border-red-200/25';

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-105">
        {children}
      </div>

      {/* Wet chilled condensation puddle + expanding liquid ripples */}
      <div className="pointer-events-none relative -mt-2 flex h-7 w-32 items-center justify-center">
        <div
          className={`h-5 w-28 rounded-[100%] transition-transform duration-300 group-hover:scale-110 ${
            variant === 'light' ? 'water-puddle' : 'water-puddle-dark'
          }`}
        />
        <span
          className={`group-hover-ripple absolute h-5 w-20 rounded-[100%] border opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${ringBorder}`}
        />
        <span
          className={`group-hover-ripple absolute h-6 w-26 rounded-[100%] border opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${ringOuter}`}
          style={{ animationDelay: '0.28s' }}
        />
      </div>
    </div>
  );
};

const FIZZ_SPECS = [
  { left: '6%', top: '62%', size: 8, sway: '-12px', duration: '1.45s', delay: '0s', useSecondary: false },
  { left: '14%', top: '34%', size: 11, sway: '-16px', duration: '1.75s', delay: '0.28s', useSecondary: true },
  { left: '24%', top: '16%', size: 6, sway: '-8px', duration: '1.35s', delay: '0.55s', useSecondary: false },
  { left: '38%', top: '10%', size: 9, sway: '-4px', duration: '1.6s', delay: '0.15s', useSecondary: true },
  { left: '52%', top: '8%', size: 12, sway: '6px', duration: '1.85s', delay: '0.42s', useSecondary: false },
  { left: '68%', top: '12%', size: 7, sway: '10px', duration: '1.4s', delay: '0.78s', useSecondary: true },
  { left: '82%', top: '24%', size: 10, sway: '15px', duration: '1.7s', delay: '0.2s', useSecondary: false },
  { left: '90%', top: '52%', size: 8, sway: '14px', duration: '1.5s', delay: '0.62s', useSecondary: true },
  { left: '12%', top: '76%', size: 6, sway: '-10px', duration: '1.55s', delay: '0.9s', useSecondary: true },
  { left: '86%', top: '74%', size: 7, sway: '12px', duration: '1.65s', delay: '1.05s', useSecondary: false },
  { left: '46%', top: '22%', size: 5, sway: '-5px', duration: '1.28s', delay: '0.95s', useSecondary: true },
  { left: '60%', top: '26%', size: 6, sway: '7px', duration: '1.38s', delay: '1.15s', useSecondary: false },
];

function getBrandBubbleColors(brand: BrandItem): { primary: string; secondary: string } {
  const isNeutralLight = (hex: string) => {
    const up = hex.toUpperCase();
    return up === '#FFFFFF' || up === '#F8FAFC' || up === '#E2E8F0';
  };
  const primary = !isNeutralLight(brand.accent)
    ? brand.accent
    : !isNeutralLight(brand.fg)
      ? brand.fg
      : brand.bg;
  const secondary =
    brand.bg !== primary && brand.bg !== '#111827' && brand.bg !== '#171717' && brand.bg !== '#18181B'
      ? brand.bg
      : !isNeutralLight(brand.fg) && brand.fg !== primary
        ? brand.fg
        : '#FFFFFF';
  return { primary, secondary };
}

const BrandFizzBubbles: React.FC<{ primary: string; secondary: string }> = ({
  primary,
  secondary,
}) => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.22 }}
    className="pointer-events-none absolute -inset-3 z-20 select-none"
  >
    {FIZZ_SPECS.map((b, idx) => {
      const tint = b.useSecondary ? secondary : primary;
      return (
        <span
          key={`fizz-${idx}`}
          className="animate-fizz-bubble absolute rounded-full"
          style={
            {
              left: b.left,
              top: b.top,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDelay: b.delay,
              background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.96) 0%, color-mix(in srgb, ${tint} 72%, white) 42%, color-mix(in srgb, ${tint} 85%, black) 82%, transparent 100%)`,
              border: `1px solid color-mix(in srgb, ${tint} 55%, white)`,
              boxShadow: `0 3px 10px color-mix(in srgb, ${tint} 45%, transparent), inset -1.5px -2px 4px rgba(0,0,0,0.16)`,
              '--fizz-x': b.sway,
              '--fizz-duration': b.duration,
            } as React.CSSProperties
          }
        >
          <span
            className="absolute top-[18%] left-[22%] rounded-full bg-white/95"
            style={{
              width: `${Math.max(1.5, Math.round(b.size * 0.26))}px`,
              height: `${Math.max(1.5, Math.round(b.size * 0.2))}px`,
            }}
          />
        </span>
      );
    })}
  </motion.div>
);

/**
 * Infinite smooth Partner & Brand scrolling bar ("Barre déroulante")
 * with smooth magnification and continuous brand-colored sparkling fizz bubbles on hover/focus.
 */
export const PartnerMarqueeBar: React.FC<{
  onNavigate: (path: string) => void;
}> = ({ onNavigate }) => {
  const [paused, setPaused] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [hoveredState, setHoveredState] = useState<{ brand: BrandItem; key: string } | null>(null);

  const rowOne = BRANDS.slice(0, 14);
  const rowTwo = BRANDS.slice(14);
  const hoveredBrand = hoveredState?.brand ?? null;

  const renderBrandMedallion = (brand: BrandItem, keyPrefix: string) => {
    const medallionKey = `${keyPrefix}-${brand.name}`;
    const isHovered = hoveredState?.key === medallionKey;
    const fizzColors = getBrandBubbleColors(brand);
    return (
      <button
        key={medallionKey}
        type="button"
        onMouseEnter={() => setHoveredState({ brand, key: medallionKey })}
        onMouseLeave={() => setHoveredState((prev) => (prev?.key === medallionKey ? null : prev))}
        onFocus={() => setHoveredState({ brand, key: medallionKey })}
        onBlur={() => setHoveredState((prev) => (prev?.key === medallionKey ? null : prev))}
        onClick={() =>
          onNavigate(brand.productSlug ? `/produits/${brand.productSlug}/` : '/nos-produits/')
        }
        title={`Découvrir ${brand.name}`}
        className="group/brand relative flex shrink-0 cursor-pointer flex-col items-center px-3 py-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-20 hover:scale-[1.22] focus-visible:z-20 focus-visible:scale-[1.2] focus-visible:outline-none md:px-4"
      >
        <div
          className="relative flex h-24 w-24 items-center justify-center rounded-full border-[3px] shadow-sm transition-shadow duration-300 group-hover/brand:shadow-xl md:h-26 md:w-26"
          style={{
            backgroundColor: brand.bg,
            borderColor: brand.accent,
            color: brand.fg,
          }}
        >
          <AnimatePresence>
            {isHovered && (
              <BrandFizzBubbles
                key={`fizz-${medallionKey}`}
                primary={fizzColors.primary}
                secondary={fizzColors.secondary}
              />
            )}
          </AnimatePresence>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-1 rounded-full bg-gradient-to-br from-white/40 via-transparent to-black/10"
          />
          <span className="relative z-10 px-2 text-center text-[11px] font-extrabold leading-tight tracking-tight">
            {brand.name}
          </span>
        </div>

        <span
          className={`mt-2.5 text-[11px] font-semibold tracking-tight whitespace-nowrap transition-all duration-200 ${
            isHovered
              ? 'translate-y-0 text-[#7D0000] opacity-100'
              : 'translate-y-1 text-neutral-500 opacity-85'
          }`}
        >
          {brand.name}
        </span>
      </button>
    );
  };

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-4 md:px-8">
        <p className="text-xs font-medium text-neutral-500">
          {hoveredBrand
            ? `Partenaire sélectionné : ${hoveredBrand.name} — cliquez pour explorer`
            : 'Survolez un partenaire pour l’agrandir et explorer sa gamme'}
        </p>
        <div className="flex items-center gap-2">
          {!showGrid && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-[#7D0000] hover:text-[#7D0000]"
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              <span>{paused ? 'Reprendre' : 'Pause'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowGrid((g) => !g)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-[#7D0000] hover:text-[#7D0000]"
          >
            {showGrid ? <Rows3 className="h-3.5 w-3.5" /> : <LayoutGrid className="h-3.5 w-3.5" />}
            <span>{showGrid ? 'Barre déroulante' : `Vue complète (${BRANDS.length})`}</span>
          </button>
        </div>
      </div>

      {showGrid ? (
        <div className="mx-auto grid max-w-[1280px] grid-cols-3 gap-4 px-4 py-8 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 md:px-8">
          {BRANDS.map((b) => renderBrandMedallion(b, 'grid'))}
        </div>
      ) : (
        <div className="group/marquee marquee-mask relative space-y-2 overflow-hidden py-7">
          <div
            className={`flex w-max items-center ${
              paused ? 'marquee-paused' : ''
            } animate-marquee-left`}
          >
            {rowOne.map((b) => renderBrandMedallion(b, 'r1-a'))}
            {rowOne.map((b) => renderBrandMedallion(b, 'r1-b'))}
          </div>

          <div
            className={`flex w-max items-center ${
              paused ? 'marquee-paused' : ''
            } animate-marquee-right`}
          >
            {rowTwo.map((b) => renderBrandMedallion(b, 'r2-a'))}
            {rowTwo.map((b) => renderBrandMedallion(b, 'r2-b'))}
          </div>
        </div>
      )}
    </div>
  );
};

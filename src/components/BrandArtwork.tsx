import React from 'react';
import { BottleShape, ProductCategoryId } from '../data/siteData';

export const SobragaLogo: React.FC<{ variant?: 'light' | 'dark'; className?: string }> = ({
  variant = 'light',
  className = '',
}) => {
  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 210 56"
        className="h-11 w-auto"
        role="img"
        aria-label="Sobraga Les Boissons du Gabon"
      >
        <rect
          x="2"
          y="3"
          width="206"
          height="50"
          rx="25"
          fill={variant === 'light' ? '#A40910' : '#A40910'}
          stroke="#FFFFFF"
          strokeWidth="2.2"
        />
        <rect
          x="6"
          y="7"
          width="198"
          height="42"
          rx="21"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
        />
        <text
          x="19"
          y="33"
          fill="#FFFFFF"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="700"
          fontSize="28"
          letterSpacing="-0.5"
        >
          Sobraga
        </text>
        <text
          x="36"
          y="45"
          fill="#FDE8E8"
          fontFamily="Montserrat, sans-serif"
          fontWeight="600"
          fontSize="6.9"
          letterSpacing="0.35"
        >
          Les Boissons du Gabon
        </text>
        {/* Panther crest emblem on right */}
        <circle cx="176" cy="28" r="16" fill="#FFFFFF" />
        <path
          d="M167 34c2-4 5-7 8-8 2-1 4-3 6-3 2 0 4 1 5 3l2 1-1 3-2 1c-1 1-1 3 0 4l-3 1c-2-1-4-1-6 0-2 1-4 3-5 5h-4l0-7z"
          fill="#A40910"
        />
        <circle cx="182" cy="25" r="1.1" fill="#FFFFFF" />
      </svg>
    </span>
  );
};

interface BottleProps {
  name: string;
  shape: BottleShape;
  primaryColor: string;
  secondaryColor: string;
  liquidColor: string;
  capColor: string;
  badgeText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductBottleVisual: React.FC<BottleProps> = ({
  name,
  shape,
  primaryColor,
  secondaryColor,
  liquidColor,
  capColor,
  badgeText,
  size = 'md',
}) => {
  const hClass = size === 'lg' ? 'h-64' : size === 'sm' ? 'h-24' : 'h-40';
  const shortLabel = name.replace(/[“”]/g, '').slice(0, 10);

  const DewBeads = (
    <g opacity="0.82">
      <ellipse cx="41" cy="84" rx="2.3" ry="3.1" fill="#FFFFFF" opacity="0.65" />
      <circle cx="40.3" cy="83.1" r="0.8" fill="#FFFFFF" />
      <ellipse cx="69" cy="96" rx="1.9" ry="2.6" fill="#FFFFFF" opacity="0.58" />
      <ellipse cx="36" cy="176" rx="2.1" ry="2.8" fill="#FFFFFF" opacity="0.52" />
      <ellipse cx="73" cy="168" rx="2.4" ry="3.2" fill="#FFFFFF" opacity="0.62" />
      <circle cx="72.2" cy="167" r="0.9" fill="#FFFFFF" />
      <ellipse cx="64" cy="70" rx="1.5" ry="2" fill="#FFFFFF" opacity="0.55" />
    </g>
  );

  if (shape === 'can') {
    return (
      <svg viewBox="0 0 110 206" className={`${hClass} w-auto drop-shadow-sm`} aria-hidden="true">
        <defs>
          <linearGradient id={`can-${shortLabel}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="35%" stopColor="#333333" stopOpacity="0.35" />
            <stop offset="60%" stopColor={primaryColor} />
            <stop offset="100%" stopColor="#0f0f0f" />
          </linearGradient>
        </defs>
        <ellipse cx="55" cy="193" rx="34" ry="7" fill="rgba(15,23,42,0.13)" />
        <path d="M26 24 L84 24 L88 38 L88 176 L80 186 L30 186 L22 176 L22 38 Z" fill={primaryColor} />
        <path d="M26 24 L84 24 L88 38 L88 176 L80 186 L30 186 L22 176 L22 38 Z" fill={`url(#can-${shortLabel})`} opacity="0.55" />
        <rect x="26" y="18" width="58" height="7" rx="3" fill="#D4D4D8" />
        <rect x="22" y="65" width="66" height="68" fill={secondaryColor} opacity="0.94" />
        <rect x="30" y="38" width="8" height="135" rx="4" fill="#FFFFFF" opacity="0.22" />
        {DewBeads}
        <text
          x="55"
          y="102"
          textAnchor="middle"
          fill="#111111"
          fontFamily="Montserrat, sans-serif"
          fontWeight="800"
          fontSize="12"
        >
          {shortLabel}
        </text>
      </svg>
    );
  }

  if (shape === 'carton') {
    return (
      <svg viewBox="0 0 120 206" className={`${hClass} w-auto drop-shadow-sm`} aria-hidden="true">
        <ellipse cx="60" cy="193" rx="36" ry="7" fill="rgba(15,23,42,0.12)" />
        <polygon points="24,42 96,42 96,184 24,184" fill={primaryColor} rx="4" />
        <polygon points="24,42 60,20 96,42" fill={secondaryColor} />
        <rect x="66" y="22" width="16" height="10" rx="2" fill={capColor} />
        <rect x="24" y="70" width="72" height="74" fill="#FFFFFF" opacity="0.96" />
        <circle cx="60" cy="118" r="16" fill={secondaryColor} opacity="0.92" />
        <rect x="29" y="48" width="7" height="128" rx="3" fill="#FFFFFF" opacity="0.16" />
        <text
          x="60"
          y="94"
          textAnchor="middle"
          fill={primaryColor}
          fontFamily="Montserrat, sans-serif"
          fontWeight="800"
          fontSize="13"
        >
          {shortLabel}
        </text>
        {badgeText && (
          <text
            x="60"
            y="167"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            fontSize="9"
          >
            {badgeText}
          </text>
        )}
      </svg>
    );
  }

  if (shape === 'water-large') {
    return (
      <svg viewBox="0 0 120 206" className={`${hClass} w-auto drop-shadow-sm`} aria-hidden="true">
        <ellipse cx="60" cy="195" rx="34" ry="7" fill="rgba(14,165,233,0.16)" />
        <rect x="46" y="14" width="28" height="12" rx="3" fill={capColor} />
        <path d="M48 26 L72 26 L88 58 L88 180 C88 186 82 188 76 188 L44 188 C38 188 32 186 32 180 L32 58 Z" fill={liquidColor} stroke="#7DD3FC" strokeWidth="2" />
        <rect x="33" y="88" width="54" height="52" fill={primaryColor} />
        <rect x="39" y="54" width="8" height="120" rx="4" fill="#FFFFFF" opacity="0.52" />
        {DewBeads}
        <text x="60" y="118" textAnchor="middle" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="11">
          {shortLabel}
        </text>
      </svg>
    );
  }

  if (shape === 'wine' || shape === 'champagne') {
    const isChampagne = shape === 'champagne';
    return (
      <svg viewBox="0 0 110 226" className={`${hClass} w-auto drop-shadow-sm`} aria-hidden="true">
        <ellipse cx="55" cy="213" rx="31" ry="6.5" fill="rgba(15,23,42,0.15)" />
        <rect x="47" y="14" width="16" height="36" rx="3" fill={capColor} />
        <path
          d={
            isChampagne
              ? 'M47 50 L63 50 L72 95 C80 112 83 130 83 196 C83 203 78 206 72 206 L38 206 C32 206 27 203 27 196 C27 130 30 112 38 95 Z'
              : 'M47 50 L63 50 L66 78 C77 86 81 98 81 112 L81 198 C81 203 77 206 72 206 L38 206 C33 206 29 203 29 198 L29 112 C29 98 33 86 44 78 Z'
          }
          fill={liquidColor}
        />
        <rect x="36" y="102" width="7" height="90" rx="3.5" fill="#FFFFFF" opacity="0.2" />
        {isChampagne && DewBeads}
        <rect x="31" y="112" width="48" height="58" rx="2" fill={secondaryColor} stroke="#D6D3D1" strokeWidth="1" />
        <line x1="39" y1="126" x2="71" y2="126" stroke={primaryColor} strokeWidth="2" />
        <text
          x="55"
          y="144"
          textAnchor="middle"
          fill="#1F2937"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontWeight="700"
          fontSize="9"
        >
          {shortLabel}
        </text>
        <text x="55" y="158" textAnchor="middle" fill="#7F1D1D" fontFamily="Montserrat, sans-serif" fontWeight="600" fontSize="6.5">
          CASTEL
        </text>
      </svg>
    );
  }

  // Standard beer / soda / water bottle
  const isWater = shape === 'water';
  return (
    <svg viewBox="0 0 110 226" className={`${hClass} w-auto drop-shadow-sm`} aria-hidden="true">
      <ellipse
        cx="55"
        cy="213"
        rx="30"
        ry="6.5"
        fill={isWater ? 'rgba(14,165,233,0.16)' : 'rgba(125,0,0,0.13)'}
      />
      {/* Crown / Screw Cap */}
      <rect x="44" y="12" width="22" height="10" rx="2.5" fill={capColor} />
      {/* Neck collar */}
      <path d="M46 22 L64 22 L68 64 L42 64 Z" fill={liquidColor} opacity={isWater ? 0.9 : 0.96} />
      <path d="M45 36 L65 36 L67 52 L43 52 Z" fill={primaryColor} opacity="0.92" />
      {/* Body */}
      <path
        d="M42 64 C32 76 29 90 29 106 L29 196 C29 202 34 206 40 206 L70 206 C76 206 81 202 81 196 L81 106 C81 90 78 76 68 64 Z"
        fill={liquidColor}
        stroke={isWater ? '#93C5FD' : 'rgba(0,0,0,0.08)'}
        strokeWidth={isWater ? '1.8' : '1'}
      />
      {/* Glass specular highlight */}
      <rect x="35" y="96" width="7" height="94" rx="3.5" fill="#FFFFFF" opacity={isWater ? 0.62 : 0.25} />
      {DewBeads}
      {/* Brand label */}
      <rect x="30" y="110" width="50" height="52" rx="3" fill="#FFFFFF" opacity="0.97" />
      <rect x="30" y="110" width="50" height="12" rx="2" fill={primaryColor} />
      <rect x="30" y="152" width="50" height="10" rx="2" fill={secondaryColor} />
      <text
        x="55"
        y="141"
        textAnchor="middle"
        fill={primaryColor}
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        fontSize="9.5"
      >
        {shortLabel}
      </text>
      {badgeText && (
        <g>
          <circle cx="80" cy="74" r="17" fill="#FEF08A" stroke="#DC2626" strokeWidth="2" />
          <text x="80" y="73" textAnchor="middle" fill="#991B1B" fontWeight="800" fontSize="6.5">
            {badgeText.split(' ')[0]}
          </text>
          <text x="80" y="81" textAnchor="middle" fill="#991B1B" fontWeight="700" fontSize="5">
            FCFA
          </text>
        </g>
      )}
    </svg>
  );
};

export const CategoryPackVisual: React.FC<{ category: Exclude<ProductCategoryId, 'all'> }> = ({
  category,
}) => {
  if (category === 'boissons-gazeuses') {
    return (
      <div className="flex items-end justify-center gap-1 h-32">
        <ProductBottleVisual name="WORLD" shape="soda" primaryColor="#B91C1C" secondaryColor="#F8FAFC" liquidColor="#1C1917" capColor="#DC2626" size="sm" />
        <ProductBottleVisual name="DJINO" shape="soda" primaryColor="#16A34A" secondaryColor="#FACC15" liquidColor="#F59E0B" capColor="#15803D" size="sm" />
        <ProductBottleVisual name="TOP" shape="soda" primaryColor="#EA580C" secondaryColor="#2563EB" liquidColor="#F97316" capColor="#EA580C" size="sm" />
      </div>
    );
  }
  if (category === 'eaux') {
    return (
      <div className="flex items-end justify-center gap-1 h-32">
        <ProductBottleVisual name="ABORA" shape="water" primaryColor="#0284C7" secondaryColor="#EC4899" liquidColor="#E0F2FE" capColor="#DB2777" size="sm" />
        <ProductBottleVisual name="AKEWA" shape="water-large" primaryColor="#0369A1" secondaryColor="#38BDF8" liquidColor="#E0F2FE" capColor="#0284C7" size="sm" />
        <ProductBottleVisual name="ANDZA" shape="water" primaryColor="#1D4ED8" secondaryColor="#16A34A" liquidColor="#EFF6FF" capColor="#2563EB" size="sm" />
      </div>
    );
  }
  if (category === 'alcoomix') {
    return (
      <div className="flex items-end justify-center gap-1.5 h-32">
        <ProductBottleVisual name="RACINE" shape="beer" primaryColor="#B45309" secondaryColor="#DC2626" liquidColor="#D97706" capColor="#78350F" size="sm" />
        <ProductBottleVisual name="BOOSTER" shape="soda" primaryColor="#E11D48" secondaryColor="#F97316" liquidColor="#F43F5E" capColor="#BE123C" size="sm" />
        <ProductBottleVisual name="VINO" shape="beer" primaryColor="#7F1D1D" secondaryColor="#F8FAFC" liquidColor="#450A0A" capColor="#991B1B" size="sm" />
      </div>
    );
  }
  if (category === 'bieres') {
    return (
      <div className="flex items-end justify-center gap-1 h-32">
        <ProductBottleVisual name="33" shape="beer" primaryColor="#DC2626" secondaryColor="#FACC15" liquidColor="#F59E0B" capColor="#DC2626" size="sm" />
        <ProductBottleVisual name="REGAB" shape="beer" primaryColor="#B91C1C" secondaryColor="#F59E0B" liquidColor="#D97706" capColor="#F59E0B" size="sm" />
        <ProductBottleVisual name="CASTEL" shape="beer" primaryColor="#92400E" secondaryColor="#FCD34D" liquidColor="#F59E0B" capColor="#B45309" size="sm" />
      </div>
    );
  }
  if (category === 'energy-drink') {
    return (
      <div className="flex items-end justify-center gap-2 h-32">
        <ProductBottleVisual name="XXL" shape="soda" primaryColor="#111827" secondaryColor="#EF4444" liquidColor="#F59E0B" capColor="#DC2626" size="sm" />
        <ProductBottleVisual name="FEROX" shape="can" primaryColor="#171717" secondaryColor="#EAB308" liquidColor="#FACC15" capColor="#EAB308" size="sm" />
      </div>
    );
  }
  return (
    <div className="flex items-end justify-center gap-1.5 h-32">
      <ProductBottleVisual name="JUGAB" shape="carton" primaryColor="#F97316" secondaryColor="#FDE047" liquidColor="#FBBF24" capColor="#DC2626" size="sm" />
      <ProductBottleVisual name="JUGAB" shape="carton" primaryColor="#16A34A" secondaryColor="#BEF264" liquidColor="#A3E635" capColor="#15803D" size="sm" />
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SobragaLogo } from './BrandArtwork';
import { CondensationBackdrop } from './LiquidEffects';

interface AgeGateModalProps {
  open: boolean;
  onConfirm: (remember: boolean) => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({ open, onConfirm }) => {
  const [remember, setRemember] = useState(false);
  const [denied, setDenied] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <CondensationBackdrop tone="dark" intensity="rich" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/20 bg-white/97 px-8 py-12 text-center shadow-2xl backdrop-blur-lg"
      >
        {/* Top subtle crimson accent hairline */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#580000] via-[#9E0B0F] to-[#580000]" />

        <div className="mb-6 flex justify-center">
          <SobragaLogo />
        </div>

        <h2 id="age-gate-title" className="text-2xl font-extrabold tracking-tight text-[#8A0000]">
          Êtes-vous majeur ?
        </h2>

        <p className="mt-4 text-base font-semibold leading-relaxed text-[#222222]">
          Vous devez avoir 18 ans ou plus pour accéder à ce site
        </p>

        {denied ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-[#7D0000]">
            <p className="font-semibold">Accès non autorisé aux mineurs</p>
            <p className="mt-1 text-xs text-neutral-700">
              Conformément à la réglementation sur les boissons alcoolisées, l’accès à ce site est
              réservé aux personnes majeures.
            </p>
            <button
              type="button"
              onClick={() => setDenied(false)}
              className="mt-3 cursor-pointer text-xs font-semibold underline hover:text-[#9E0B0F]"
            >
              Revenir à la vérification
            </button>
          </div>
        ) : (
          <>
            <div className="mt-7 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onConfirm(remember)}
                className="min-w-[100px] cursor-pointer rounded-full bg-[#7D0000] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9E0B0F] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D0000]"
              >
                Oui
              </button>
              <button
                type="button"
                onClick={() => setDenied(true)}
                className="min-w-[100px] cursor-pointer rounded-full border border-[#7D0000]/30 bg-white px-7 py-2.5 text-sm font-semibold text-[#7D0000] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7D0000] hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D0000]"
              >
                Non
              </button>
            </div>

            <label className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#222222]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-[#7D0000]"
              />
              <span>Se souvenir de moi</span>
            </label>
          </>
        )}
      </motion.div>
    </div>
  );
};

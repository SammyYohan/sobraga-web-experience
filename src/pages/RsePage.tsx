import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, FileText, ArrowRight, Droplets } from 'lucide-react';
import {
  CondensationBackdrop,
  Effervescence3DBubbles,
  EditorialTextReveal,
} from '../components/LiquidEffects';
import {
  DOCUMENTS,
  DocumentItem,
  NEWS_ARTICLES,
  RSE_ODDS,
  RSE_PILLARS,
  SITE_ASSETS,
} from '../data/siteData';

interface RsePageProps {
  onNavigate: (path: string) => void;
  onOpenDocument: (doc: DocumentItem) => void;
}

const ODD_ACTIONS: Record<string, string> = {
  'ODD 3': 'Campagnes santé annuelles (Octobre Rose, Novembre Bleu), prévention routière « Conduire sobre c’est choisir La Vie » et dépistages gratuits pour les collaborateurs et riverains.',
  'ODD 4': 'Mécénat éducatif, dotations scolaires dans les provinces et programmes de formation continue pour les jeunes talents et apprentis gabonais.',
  'ODD 5': 'Promotion de l’égalité des chances à tous les niveaux de responsabilité et valorisation du leadership féminin au sein des 6 sites industriels.',
  'ODD 6': 'Station de recyclage et de réutilisation des eaux (RE-USE) réduisant significativement les prélèvements d’eau potable sur nos lignes d’embouteillage.',
  'ODD 7': 'Optimisation énergétique des groupes frigorifiques, généralisation de l’éclairage LED industriel et amélioration continue du rendement thermique.',
  'ODD 8': 'Près de 2 000 emplois directs et des dizaines de milliers d’emplois indirects via notre réseau national de grossistes, distributeurs et partenaires.',
  'ODD 9': 'Modernisation continue des 6 usines (Owendo, Franceville, Port-Gentil, Oyem, Mouila, Léconi) selon les certifications ISO 9001 et FSSC 22000.',
  'ODD 12': 'Économie circulaire : collecte et valorisation des bouteilles PET usagées au Gabon, consigne verre et réduction du poids des emballages.',
};

export const RsePage: React.FC<RsePageProps> = ({ onNavigate, onOpenDocument }) => {
  const [pillarIdx, setPillarIdx] = useState(0);
  const [selectedOddCode, setSelectedOddCode] = useState<string>('ODD 6');

  const activePillar = RSE_PILLARS[pillarIdx];
  const rseArticles = NEWS_ARTICLES.filter((a) => a.isRse).slice(0, 4);
  const rseReports = DOCUMENTS.filter((d) => d.category === 'rse');
  const activeOdd = RSE_ODDS.find((o) => o.code === selectedOddCode) || RSE_ODDS[0];

  return (
    <div>
      {/* Hero RSE in Rounded Frame with Interactive 6-Pillar Slider */}
      <div className="mx-auto max-w-[1400px] px-3 pt-3 md:px-6 md:pt-4">
        <section className="relative overflow-hidden rounded-2xl bg-neutral-950 py-14 text-white shadow-xl ring-1 ring-black/10 md:rounded-3xl md:py-20">
          <img
            src={SITE_ASSETS.heroRseWorker}
            alt="Responsabilité Sociétale de l’Entreprise SOBRAGA"
            referrerPolicy="no-referrer"
            className="animate-ken-burns absolute inset-0 h-full w-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-[#3a0000]/55" />
          <CondensationBackdrop tone="dark" intensity="rich" />
          <Effervescence3DBubbles flavor="water" density="subtle" />

        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-10 px-4 md:grid-cols-12 md:px-8">
          <div className="md:col-span-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-red-200 uppercase">
              <Droplets className="h-3.5 w-3.5" />
              <span>Engagement Durable · Groupe Castel</span>
            </span>
            <EditorialTextReveal
              text="Responsabilité Sociétale de l’Entreprise"
              as="h1"
              immediate
              delay={0.05}
              className="mt-2 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl"
            />
            <p className="mt-5 text-sm leading-relaxed text-neutral-100 md:text-[15px]">
              Depuis sa création en 1966 sous l’impulsion du PDG du groupe, Pierre Castel, et du
              Gouvernement gabonais, SOBRAGA est un acteur majeur de la vie socio-économique du
              Gabon. Fort de son ancrage territorial et en cohérence avec ses valeurs, Sobraga est
              engagée dans une démarche de développement durable répondant aux attentes des
              populations. Dans le prolongement de sa recherche d’excellence, qui lui a permis
              d’obtenir l’ensemble des certifications internationales en vigueur, la Sobraga a
              développé une politique RSE qui s’appuie sur 6 piliers et 8 Objectifs de Développement
              Durable (ODD).
            </p>
          </div>

          <div className="md:col-span-6">
            <h2 className="mb-4 text-center text-lg font-bold text-white md:text-left">
              Les 6 piliers de l’engagement RSE du groupe Castel
            </h2>
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white text-neutral-900 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.number}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="grid sm:grid-cols-12"
                >
                  <div className="flex flex-col justify-center bg-gradient-to-br from-[#7D4B4B] to-[#915E5E] p-6 text-white sm:col-span-7">
                    <h3 className="text-base font-bold leading-snug">{activePillar.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-red-50">
                      {activePillar.description}
                    </p>
                  </div>
                  <div className="p-2.5 sm:col-span-5">
                    <div className="relative h-52 overflow-hidden rounded-xl ring-1 ring-black/10 sm:h-full">
                      <img
                        src={SITE_ASSETS.heroRseWorker}
                        alt={activePillar.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setPillarIdx((p) => (p - 1 + RSE_PILLARS.length) % RSE_PILLARS.length)
                }
                aria-label="Pilier précédent"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xs transition hover:scale-105 hover:bg-white/30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                {RSE_PILLARS.map((pil, idx) => (
                  <button
                    key={pil.number}
                    type="button"
                    onClick={() => setPillarIdx(idx)}
                    aria-label={`Pilier ${idx + 1}`}
                    className={`h-2.5 cursor-pointer rounded-full transition-all duration-200 ${
                      idx === pillarIdx ? 'w-6 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPillarIdx((p) => (p + 1) % RSE_PILLARS.length)}
                aria-label="Pilier suivant"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xs transition hover:scale-105 hover:bg-white/30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        </section>
      </div>

      {/* 8 ODD Interactifs */}
      <section className="mx-auto max-w-[1240px] px-4 py-16 md:px-8">
        <h2 className="text-balance text-center text-2xl font-extrabold tracking-tight text-neutral-900 md:text-3xl">
          La politique RSE du groupe Castel se base sur ces 8 ODD
        </h2>
        <p className="mt-2 text-center text-xs text-neutral-500">
          Cliquez sur un Objectif de Développement Durable pour consulter les actions concrètes de SOBRAGA au Gabon.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {RSE_ODDS.map((odd) => {
            const isSelected = odd.code === selectedOddCode;
            return (
              <button
                key={odd.code}
                type="button"
                onClick={() => setSelectedOddCode(odd.code)}
                aria-pressed={isSelected}
                className={`flex cursor-pointer flex-col justify-between rounded-2xl p-4 text-left text-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-xl ${
                  isSelected ? 'ring-4 ring-[#7D0000]/30 -translate-y-1' : 'opacity-90 hover:opacity-100'
                }`}
                style={{ backgroundColor: odd.color }}
              >
                <span className="text-sm font-extrabold tabular-nums">{odd.code}</span>
                <span className="mt-5 text-xs font-semibold leading-snug">{odd.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected ODD Action Box */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-red-100 bg-[#FDF6F6] p-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="inline-block rounded-lg px-2.5 py-1 text-xs font-extrabold text-white tabular-nums"
                style={{ backgroundColor: activeOdd.color }}
              >
                {activeOdd.code}
              </span>
              <h3 className="text-base font-bold text-neutral-900">{activeOdd.title}</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-700 md:text-sm">
              {ODD_ACTIONS[activeOdd.code]}
            </p>
          </div>
          {rseReports[0] && (
            <button
              type="button"
              onClick={() => onOpenDocument(rseReports[0])}
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-[#7D0000] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#9E0B0F]"
            >
              <FileText className="h-4 w-4" />
              <span>Consulter le rapport RSE</span>
            </button>
          )}
        </div>
      </section>

      {/* Nos activités RSE */}
      <div className="mx-auto max-w-[1400px] px-3 md:px-6">
        <section className="rounded-2xl bg-[#FDF6F6] py-16 md:rounded-3xl">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 md:text-3xl">
              Nos activités RSE
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {rseArticles.map((art) => (
                <button
                  key={art.slug}
                  type="button"
                  onClick={() => onNavigate(`/actualites/${art.slug}`)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-red-100 bg-white text-left shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="w-full p-2.5 pb-0">
                    <div className="relative h-40 overflow-hidden rounded-xl ring-1 ring-black/5">
                      <img
                        src={art.bannerImage}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-4">
                    <span className="text-xs text-neutral-500">{art.date}</span>
                    <h3 className="mt-2 line-clamp-3 flex-1 text-sm font-bold text-neutral-900 transition-colors group-hover:text-[#9E0B0F]">
                      {art.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#9E0B0F] transition-all group-hover:gap-2.5">
                      <span>En savoir plus</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Documentation RSE */}
      <section className="mx-auto max-w-[1240px] px-4 py-16 md:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">Documentation</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Description des actions et objectifs de Castel Afrique en matière de RSE
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {rseReports.map((rep) => (
            <button
              key={rep.id}
              type="button"
              onClick={() => onOpenDocument(rep)}
              className="group flex cursor-pointer flex-col items-start rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#7D0000] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF6F6] text-[#9E0B0F] transition group-hover:bg-[#7D0000] group-hover:text-white">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-neutral-900 group-hover:text-[#7D0000]">
                {rep.title}
              </h3>
              <p className="mt-1 text-xs text-neutral-500 tabular-nums">{rep.pagesCount} pages · PDF</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { FileText, MapPin, Award, Users, ShieldCheck, Droplets, ArrowRight } from 'lucide-react';
import { SubpageBanner } from '../components/SubpageBanner';
import {
  CondensationBackdrop,
  Effervescence3DBubbles,
  EditorialTextReveal,
} from '../components/LiquidEffects';
import {
  COMPANY_STATS,
  COMPANY_VALUES,
  DOCUMENTS,
  DocumentItem,
  PRODUCTION_SITES,
  PRODUCTION_STEPS,
  SITE_ASSETS,
} from '../data/siteData';

interface EntreprisePageProps {
  section: 'mot-dg' | 'notre-histoire' | 'nos-valeurs' | 'capsules';
  onNavigate: (path: string) => void;
  onOpenDocument: (doc: DocumentItem) => void;
}

const ENTREPRISE_TABS = [
  { id: 'mot-dg', label: 'Mot du Directeur Général', path: '/mot-du-directeur-general/' },
  { id: 'notre-histoire', label: 'Notre histoire', path: '/notre-histoire/' },
  { id: 'nos-valeurs', label: 'Nos valeurs', path: '/nos-valeurs/' },
  { id: 'capsules', label: 'Les capsules SOBRAGA', path: '/qualite-categorie/capsules-sobraga/' },
] as const;

export const EntreprisePages: React.FC<EntreprisePageProps> = ({
  section,
  onNavigate,
  onOpenDocument,
}) => {
  const [selectedSiteCity, setSelectedSiteCity] = useState<string>(PRODUCTION_SITES[0]?.city || '');
  const [selectedStep, setSelectedStep] = useState<string>(PRODUCTION_STEPS[0]?.step || '1');
  const capsules = DOCUMENTS.filter((d) => d.category === 'capsule');

  const bannerConfig = {
    'mot-dg': { title: 'Mot du Directeur Général', subtitle: 'Entreprise', image: SITE_ASSETS.heroProduction },
    'notre-histoire': { title: 'Notre histoire', subtitle: 'Depuis 1966 au Gabon', image: SITE_ASSETS.heroProduction },
    'nos-valeurs': { title: 'Nos valeurs', subtitle: 'Entreprise', image: SITE_ASSETS.heroRseWorker },
    capsules: { title: 'Les capsules SOBRAGA', subtitle: 'Qualité · Journal interne', image: SITE_ASSETS.heroProduction },
  }[section];

  return (
    <div>
      <SubpageBanner
        title={bannerConfig.title}
        subtitle={bannerConfig.subtitle}
        image={bannerConfig.image}
      />

      {/* Shared Entreprise Horizontal Sub-Navigation Tabs */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1140px] items-center justify-start gap-6 overflow-x-auto px-4 pt-4 md:justify-center md:gap-12">
          {ENTREPRISE_TABS.map((tab) => {
            const active = tab.id === section;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.path)}
                className={`cursor-pointer border-b-2 pb-3.5 text-xs font-bold whitespace-nowrap transition md:text-sm ${
                  active
                    ? 'border-[#7D0000] text-[#7D0000]'
                    : 'border-transparent text-neutral-600 hover:text-[#7D0000]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content */}
      {section === 'mot-dg' && (
        <section className="mx-auto max-w-[1040px] px-4 py-12 md:px-8">
          <div className="rounded-3xl border border-red-100 bg-gradient-to-br from-[#FDF6F6] via-white to-[#FDF6F6] p-8 shadow-sm md:p-12">
            <div className="mb-8 flex flex-col gap-6 border-b border-red-200/70 pb-8 md:flex-row md:items-center">
              <img
                src={SITE_ASSETS.heroRseWorker}
                alt="Direction Générale SOBRAGA"
                referrerPolicy="no-referrer"
                className="h-28 w-28 shrink-0 rounded-2xl object-cover shadow-md ring-4 ring-white"
              />
              <div>
                <p className="text-xs font-bold tracking-wider text-[#9E0B0F] uppercase">
                  60 ans d’histoire, un futur à conquérir
                </p>
                <EditorialTextReveal
                  text="Cap sur l’Horizon 2028"
                  as="h2"
                  className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-900"
                />
                <p className="mt-1 text-sm font-medium text-neutral-600">
                  Xavier JAFFRET — Directeur Général de la SOBRAGA
                </p>
              </div>
            </div>

            <div className="space-y-5 text-sm leading-relaxed text-neutral-700 md:text-[15px]">
              <p>
                En 2026, la SOBRAGA célèbre ses 60 ans. Six décennies de présence ininterrompue au
                cœur du quotidien des Gabonais. Ce lien historique, tissé de confiance et de
                proximité, est notre plus grande fierté. Ce jubilé de diamant n’est pas seulement
                une célébration ; c’est le socle de notre légitimité, la preuve de notre résilience,
                mais aussi le point de départ d’un avenir que nous construisons avec ambition.
              </p>
              <p>
                Une fierté, oui, mais aussi un véritable challenge, car le monde change, et avec
                lui, les attentes de nos consommateurs et les défis de notre industrie. Pour y
                répondre, nous avons tracé un cap clair : <strong>l’Horizon 2028</strong>. Ce plan
                stratégique n’est pas qu’une feuille de route économique ; c’est une transformation
                profonde de notre modèle, tournée résolument vers l’avenir.
              </p>
              <p>
                Au cœur de cette transformation, il y a notre <strong>CAPITAL HUMAIN</strong>. La
                SOBRAGA est avant tout une aventure humaine collective. Ma priorité absolue en tant
                que Directeur Général est de garantir un environnement de travail sain, où la
                sécurité est une règle d’or non négociable et le mérite, une culture.
              </p>
              <div className="grid gap-4 py-2 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/rse/')}
                  className="group flex cursor-pointer flex-col rounded-2xl border border-red-100 bg-white p-5 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-[#7D0000] hover:shadow-md"
                >
                  <div className="flex items-center gap-2 font-bold text-[#7D0000]">
                    <Droplets className="h-4 w-4 text-sky-600" />
                    <h3>Préserver nos ressources naturelles</h3>
                  </div>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600">
                    Gestion circulaire de nos emballages plastiques et nouvelle station RE-USE pour
                    optimiser notre consommation d’eau à chaque étape.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#9E0B0F] group-hover:gap-2">
                    <span>Voir nos actions RSE</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/qualite-categorie/engagement-qualite/')}
                  className="group flex cursor-pointer flex-col rounded-2xl border border-red-100 bg-white p-5 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-[#7D0000] hover:shadow-md"
                >
                  <h3 className="font-bold text-[#7D0000]">Incarner l’excellence</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600">
                    Qualité irréprochable de nos produits et sécurité alimentaire totale certifiée
                    par les plus hauts standards internationaux.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#9E0B0F] group-hover:gap-2">
                    <span>Engagement qualité</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/nos-actualites/')}
                  className="group flex cursor-pointer flex-col rounded-2xl border border-red-100 bg-white p-5 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-[#7D0000] hover:shadow-md"
                >
                  <h3 className="font-bold text-[#7D0000]">Soutenir nos communautés</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600">
                    Actions citoyennes concrètes et durables dans la santé, l’éducation,
                    l’environnement et le développement économique.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#9E0B0F] group-hover:gap-2">
                    <span>Actualités citoyennes</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>
              <p>
                Ensemble et guidés par nos valeurs d’esprit d’équipe, de responsabilité et de
                qualité, nous dépasserons nos objectifs. Ce chemin vers 2028, nous le bâtissons avec
                rigueur et passion pour faire de Sobraga l’entreprise préférée des Gabonais.
              </p>
              <p className="pt-2 font-bold text-[#7D0000]">
                60 ans d’histoire, un futur à conquérir. Joyeux Anniversaire Sobraga !
                <br />
                Xavier JAFFRET, Directeur Général
              </p>
            </div>
          </div>
        </section>
      )}

      {section === 'notre-histoire' && (
        <div className="space-y-14 py-12">
          <section className="mx-auto max-w-[1140px] px-4 md:px-8">
            <div className="rounded-3xl border border-red-100 bg-[#FDF6F6]/70 p-8 md:p-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
                Historique de la marque
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700">
                <p>
                  Présent avec ses marques sur les cinq continents, le Groupe Castel est
                  aujourd’hui un acteur majeur à l’international dans les domaines de l’export, de
                  la production, de l’embouteillage et de la commercialisation de boissons. Au Gabon,
                  le groupe Castel représente 21 marques pour près de 93 références, produites
                  localement par ses trois principales sociétés : La Société des Boissons
                  Rafraîchantes du Gabon (Sobraga), la Société des Vins du Gabon (Sovingab), et la
                  Société des boissons de Léconi (Soboleco).
                </p>
                <p>
                  Depuis sa création en <strong>1966</strong> sous l’impulsion de Pierre Castel et
                  du gouvernement gabonais, la Sobraga est un acteur majeur de la vie
                  socio-économique du pays. Grâce à une politique engagée de développement
                  industriel, la Sobraga compte aujourd’hui six sites de production répartis sur
                  l’ensemble du territoire national, et se place au 9ᵉ rang des acteurs économiques
                  nationaux tous secteurs confondus.
                </p>
                <p>
                  En 1987, l’usine de Libreville est délocalisée dans la commune d’Owendo, puis
                  d’autres usines ont vu le jour : Franceville en 1971, Port-Gentil en 1972, Oyem en
                  1976 et Mouila en 1983. Certifiée ISO 9001 depuis 2009 et récompensée par le prix
                  « Qualité Performance » en 2022, la société s’appelle depuis 2023{' '}
                  <strong>Les Boissons du Gabon</strong> tout en conservant sa marque emblématique
                  SOBRAGA.
                </p>
              </div>

              {/* 6 Production Sites (Interactive) */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PRODUCTION_SITES.map((site) => {
                  const isActive = selectedSiteCity === site.city;
                  return (
                    <button
                      key={site.city}
                      type="button"
                      onClick={() => setSelectedSiteCity(site.city)}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                        isActive
                          ? 'border-[#7D0000] bg-white shadow-sm ring-2 ring-[#7D0000]/15'
                          : 'border-red-100 bg-white/90 hover:border-[#9E0B0F]/40'
                      }`}
                    >
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#9E0B0F]" />
                      <div>
                        <div className="text-xs font-bold text-neutral-900">
                          {site.city} · <span className="text-[#9E0B0F] tabular-nums">{site.year}</span>
                        </div>
                        <p className="mt-1 text-xs text-neutral-600">{site.role}</p>
                        {isActive && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('/nos-produits/');
                            }}
                            className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#7D0000] hover:underline"
                          >
                            <span>Voir les produits embouteillés</span>
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SOBRAGA en quelques chiffres (Rounded Crimson Frame) */}
          <div className="mx-auto max-w-[1360px] px-3 md:px-6">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#520000] via-[#7D0000] to-[#98080D] py-16 text-white shadow-xl ring-1 ring-black/10 md:rounded-3xl">
              <CondensationBackdrop tone="dark" intensity="rich" />
              <Effervescence3DBubbles flavor="mixed" density="subtle" />
              <div className="relative z-10 mx-auto max-w-[1140px] px-4 md:px-8">
                <EditorialTextReveal
                  text="SOBRAGA en quelques chiffres c'est"
                  as="h2"
                  className="text-center text-2xl font-extrabold tracking-tight md:text-3xl"
                />
                <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                  {COMPANY_STATS.map((stat, idx) => {
                    const target =
                      idx === 0 || idx === 1
                        ? '/nos-produits/'
                        : idx === 2
                          ? '/rejoignez-nous/'
                          : idx === 3
                            ? '/rse/'
                            : idx === 4
                              ? '/notre-cave/'
                              : '/contact/';
                    return (
                      <button
                        key={stat.label}
                        type="button"
                        onClick={() => onNavigate(target)}
                        className="cursor-pointer rounded-2xl border border-white/15 bg-white/10 px-4 py-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/20"
                      >
                        <div className="text-2xl font-extrabold text-white tabular-nums md:text-3xl">
                          {stat.value}
                        </div>
                        <div className="mt-2 text-xs font-medium text-red-100">{stat.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* Production et distribution (Interactive Steps) */}
          <section className="mx-auto max-w-[1140px] px-4 md:px-8">
            <div className="text-center">
              <p className="text-xs font-bold tracking-wider text-[#9E0B0F] uppercase">
                De la Production à la distribution
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900 md:text-3xl">
                Production et distribution
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-5">
              {PRODUCTION_STEPS.map((st) => {
                const isSelected = selectedStep === st.step;
                return (
                  <button
                    key={st.step}
                    type="button"
                    onClick={() => setSelectedStep(st.step)}
                    className={`flex cursor-pointer flex-col rounded-2xl border p-5 text-left shadow-xs transition hover:-translate-y-1 hover:shadow-lg ${
                      isSelected
                        ? 'border-[#7D0000] bg-[#FDF6F6] ring-2 ring-[#7D0000]/15'
                        : 'border-neutral-200 bg-white hover:border-red-200'
                    }`}
                  >
                    <span className="text-xl font-extrabold text-[#9E0B0F] tabular-nums">
                      {st.step}.
                    </span>
                    <h3 className="mt-2 text-base font-bold text-neutral-900">{st.title}</h3>
                    <p className="mt-2.5 flex-1 text-xs leading-relaxed text-neutral-600">
                      {st.description}
                    </p>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('/qualite-categorie/engagement-qualite/');
                      }}
                      className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#9E0B0F] hover:underline"
                    >
                      <span>Normes qualité</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {section === 'nos-valeurs' && (
        <section className="mx-auto max-w-[1100px] px-4 py-14 md:px-8">
          <div className="rounded-3xl border border-red-100 bg-gradient-to-br from-[#FDF6F6] to-white p-8 text-center md:p-12">
            <h2 className="text-balance mx-auto max-w-3xl text-xl font-bold leading-relaxed text-neutral-900 md:text-2xl">
              Être l&apos;entreprise préférée des Gabonais et un acteur régional de référence dans le
              management de la qualité, la capacité d&apos;innovation et l&apos;engagement citoyen.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {COMPANY_VALUES.map((val, idx) => {
                const Icon = idx === 0 ? ShieldCheck : idx === 1 ? Award : Users;
                const href =
                  idx === 0
                    ? '/qualite-categorie/engagement-qualite/'
                    : idx === 1
                      ? '/rejoignez-nous/'
                      : '/rse/';
                const cta =
                  idx === 0 ? 'Voir la démarche qualité' : idx === 1 ? 'Rejoindre nos équipes' : 'Découvrir la RSE';
                return (
                  <button
                    key={val.title}
                    type="button"
                    onClick={() => onNavigate(href)}
                    className="group flex cursor-pointer flex-col items-center rounded-2xl border border-red-100 bg-white p-8 text-center shadow-xs transition duration-300 hover:-translate-y-1 hover:border-[#7D0000] hover:shadow-lg"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9E0B0F] to-[#6B0000] text-white shadow-md">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-neutral-900">{val.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                      {val.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#9E0B0F] transition-all group-hover:gap-2.5">
                      <span>{cta}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {section === 'capsules' && (
        <section className="mx-auto max-w-[1180px] px-4 py-14 md:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-wide text-neutral-900 uppercase md:text-3xl">
              DÉCOUVREZ NOTRE JOURNAL &quot;LA CAPSULE&quot;
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Consultez les éditions de notre journal interne « La Capsule » et « Ça Décapsule ».
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {capsules.map((cap) => (
              <button
                key={cap.id}
                type="button"
                onClick={() => onOpenDocument(cap)}
                className="group flex cursor-pointer flex-col items-start rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#7D0000] hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF6F6] text-[#9E0B0F] transition group-hover:bg-[#7D0000] group-hover:text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-neutral-900 group-hover:text-[#7D0000]">
                  {cap.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 tabular-nums">
                  Édition {cap.year} · PDF
                </p>
                <span className="mt-4 text-xs font-semibold text-[#9E0B0F]">
                  Consulter le numéro →
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { FileText, ShieldCheck, BookOpen, Newspaper } from 'lucide-react';
import { SubpageBanner } from '../components/SubpageBanner';
import { DocumentItem, SITE_ASSETS } from '../data/siteData';
import { useSiteData } from '../context/SiteContext';

interface DocuthequePageProps {
  section: 'engagement-qualite' | 'code-conduite' | 'esbidjinews';
  onNavigate: (path: string) => void;
  onOpenDocument: (doc: DocumentItem) => void;
}

export const DocuthequePage: React.FC<DocuthequePageProps> = ({
  section,
  onNavigate,
  onOpenDocument,
}) => {
  const { documents } = useSiteData();
  const [yearFilter, setYearFilter] = useState<string>('ALL');

  const meta = {
    'engagement-qualite': {
      title: 'Engagement qualité',
      heading: 'Politique Qualité, Sécurité & Environnement',
      icon: ShieldCheck,
    },
    'code-conduite': {
      title: 'Code de conduite',
      heading: 'DÉCOUVREZ NOTRE CODE',
      icon: BookOpen,
    },
    esbidjinews: {
      title: 'ESBIDJINEWS',
      heading: 'DÉCOUVREZ NOS ESBIDJINEWS',
      icon: Newspaper,
    },
  }[section];

  const docs = documents.filter((d) => d.category === section);
  const years = ['ALL', ...Array.from(new Set(docs.map((d) => d.year)))];
  const filteredDocs =
    yearFilter === 'ALL' ? docs : docs.filter((d) => d.year === yearFilter);

  return (
    <div>
      <SubpageBanner title={meta.title} subtitle="Qualité · Docuthèque" image={SITE_ASSETS.heroProduction} />

      {/* Section tabs */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1140px] items-center justify-start gap-6 overflow-x-auto px-4 pt-4 md:justify-center md:gap-12">
          <button
            type="button"
            onClick={() => onNavigate('/qualite-categorie/engagement-qualite/')}
            className={`cursor-pointer border-b-2 pb-3.5 text-xs font-bold whitespace-nowrap transition md:text-sm ${
              section === 'engagement-qualite'
                ? 'border-[#7D0000] text-[#7D0000]'
                : 'border-transparent text-neutral-600 hover:text-[#7D0000]'
            }`}
          >
            Engagement qualité
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/qualite-categorie/code-conduite/')}
            className={`cursor-pointer border-b-2 pb-3.5 text-xs font-bold whitespace-nowrap transition md:text-sm ${
              section === 'code-conduite'
                ? 'border-[#7D0000] text-[#7D0000]'
                : 'border-transparent text-neutral-600 hover:text-[#7D0000]'
            }`}
          >
            Code de conduite
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/qualite-categorie/esbidjinews/')}
            className={`cursor-pointer border-b-2 pb-3.5 text-xs font-bold whitespace-nowrap transition md:text-sm ${
              section === 'esbidjinews'
                ? 'border-[#7D0000] text-[#7D0000]'
                : 'border-transparent text-neutral-600 hover:text-[#7D0000]'
            }`}
          >
            ESBIDJINEWS
          </button>
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] px-4 py-12 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">{meta.heading}</h2>

          {section === 'esbidjinews' && (
            <div className="flex flex-wrap gap-2">
              {years.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setYearFilter(yr)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold tabular-nums transition ${
                    yearFilter === yr
                      ? 'bg-[#7D0000] text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {yr === 'ALL' ? 'Toutes les années' : yr}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDocs.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => onOpenDocument(doc)}
              className="group flex cursor-pointer flex-col items-start rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#7D0000] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF6F6] text-[#9E0B0F] transition group-hover:bg-[#7D0000] group-hover:text-white">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-neutral-900 group-hover:text-[#7D0000]">
                {doc.title}
              </h3>
              {doc.subtitle && (
                <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{doc.subtitle}</p>
              )}
              <span className="mt-4 text-xs font-semibold text-[#9E0B0F]">
                Ouvrir le document →
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

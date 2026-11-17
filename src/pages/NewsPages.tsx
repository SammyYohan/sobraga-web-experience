import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Share2, Check } from 'lucide-react';
import { SubpageBanner } from '../components/SubpageBanner';
import { NEWS_ARTICLES, SITE_ASSETS } from '../data/siteData';
import { paginateArticles } from '../utils/siteLogic';

interface NewsPageProps {
  page: number;
  onNavigate: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ page, onNavigate }) => {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const tags = ['ALL', ...Array.from(new Set(NEWS_ARTICLES.map((a) => a.tag)))];

  const filtered =
    selectedTag === 'ALL'
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter((a) => a.tag === selectedTag);

  const paginated = paginateArticles(filtered, page, 6);

  return (
    <div>
      <SubpageBanner title="Actualités" image={SITE_ASSETS.heroProduction} />

      <section className="mx-auto max-w-[1240px] px-4 py-12 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <h2 className="text-xl font-bold text-neutral-900">Toutes les actualités SOBRAGA</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSelectedTag(tag);
                  onNavigate('/nos-actualites/');
                }}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  selectedTag === tag
                    ? 'bg-[#7D0000] text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {tag === 'ALL' ? 'Toutes' : tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.items.map((article) => (
            <button
              key={article.slug}
              type="button"
              onClick={() => onNavigate(`/actualites/${article.slug}`)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-red-200 hover:shadow-xl"
            >
              <div className="w-full p-2.5 pb-0">
                <div className="relative h-48 overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-black/5">
                  <img
                    src={article.bannerImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
                <h3 className="mt-2 text-base font-bold leading-snug text-neutral-900 transition-colors group-hover:text-[#7D0000]">
                  {article.title}
                </h3>
                <p className="mt-2.5 flex-1 text-xs leading-relaxed text-neutral-600">
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

        {/* Pagination */}
        {paginated.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: paginated.totalPages }).map((_, idx) => {
              const pNum = idx + 1;
              return (
                <button
                  key={pNum}
                  type="button"
                  onClick={() =>
                    onNavigate(pNum === 1 ? '/nos-actualites/' : `/nos-actualites/page/${pNum}/`)
                  }
                  className={`h-9 min-w-9 cursor-pointer rounded-lg px-3 text-xs font-bold tabular-nums transition ${
                    pNum === paginated.page
                      ? 'bg-[#7D0000] text-white'
                      : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {pNum}
                </button>
              );
            })}
            {paginated.page < paginated.totalPages && (
              <button
                type="button"
                onClick={() => onNavigate(`/nos-actualites/page/${paginated.page + 1}/`)}
                className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Page Suivante
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

interface ArticleDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug, onNavigate }) => {
  const article = NEWS_ARTICLES.find((a) => a.slug === slug) || NEWS_ARTICLES[0];
  const [copied, setCopied] = useState(false);

  const related = NEWS_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div>
      <SubpageBanner title={article.title} subtitle={article.date} image={article.bannerImage} />

      <article className="mx-auto max-w-[960px] px-4 py-10 md:px-8">
        <button
          type="button"
          onClick={() => onNavigate('/nos-actualites/')}
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#7D0000] transition hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour</span>
        </button>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-5">
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span className="font-bold text-[#9E0B0F]">{article.tag}</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-neutral-600">
            <span>Partagez sur :</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 transition hover:border-[#7D0000] hover:text-[#7D0000]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Copier le lien</span>
                </>
              )}
            </button>
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-bold leading-snug text-neutral-900 md:text-3xl">
          {article.title}
        </h2>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-neutral-700 md:text-[15px]">
          {article.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Découvrez aussi */}
        <div className="mt-16 border-t border-neutral-200 pt-10">
          <h3 className="text-xl font-bold text-neutral-900">Découvrez aussi</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  onNavigate(`/actualites/${item.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex cursor-pointer flex-col rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#7D0000] hover:shadow-md"
              >
                <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-black/5">
                  <img
                    src={item.bannerImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-xs text-neutral-500">{item.date}</div>
                <h4 className="mt-1.5 line-clamp-2 text-sm font-bold text-neutral-900 group-hover:text-[#7D0000]">
                  {item.title}
                </h4>
                <p className="mt-2 line-clamp-2 flex-1 text-xs text-neutral-600">{item.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#9E0B0F] transition-all group-hover:gap-2.5">
                  <span>En savoir plus</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

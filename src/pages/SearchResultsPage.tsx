import React, { useState } from 'react';
import { Search, ArrowRight, FileText } from 'lucide-react';
import { SubpageBanner } from '../components/SubpageBanner';
import { ProductBottleVisual } from '../components/BrandArtwork';
import { DocumentItem, SITE_ASSETS } from '../data/siteData';
import { searchSite } from '../utils/siteLogic';

interface SearchResultsPageProps {
  query: string;
  onNavigate: (path: string) => void;
  onOpenDocument: (doc: DocumentItem) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  onNavigate,
  onOpenDocument,
}) => {
  const [localQuery, setLocalQuery] = useState(query);
  const results = searchSite(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate(`/recherche?q=${encodeURIComponent(localQuery.trim())}`);
  };

  return (
    <div>
      <SubpageBanner title="Recherche" subtitle={`Résultats pour « ${query} »`} image={SITE_ASSETS.heroProduction} />

      <section className="mx-auto max-w-[1180px] px-4 py-12 md:px-8">
        <form onSubmit={handleSearch} className="mx-auto flex max-w-2xl gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Votre recherche ..."
              aria-label="Rechercher sur le site"
              className="w-full rounded-lg border border-neutral-300 py-2.5 pr-4 pl-10 text-sm focus:border-[#7D0000] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-[#7D0000] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#9E0B0F]"
          >
            Rechercher
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-600">
          <strong className="tabular-nums text-neutral-900">{results.total}</strong> résultat(s) trouvé(s)
          pour « {query} ».
        </p>

        {results.total === 0 ? (
          <div className="mt-10 rounded-xl border border-neutral-200 bg-[#FDF6F6] p-10 text-center">
            <p className="text-base font-bold text-neutral-800">Aucun contenu trouvé</p>
            <p className="mt-2 text-xs text-neutral-600">
              Essayez avec un autre mot-clé comme « Régab », « D’Jino », « Abora », « RSE » ou « Novembre Bleu ».
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-10">
            {results.products.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#7D0000]">
                  Produits ({results.products.length})
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {results.products.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => onNavigate(`/produits/${p.slug}/`)}
                      className="flex cursor-pointer items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 text-left transition hover:border-[#7D0000]"
                    >
                      <ProductBottleVisual
                        name={p.name}
                        shape={p.shape}
                        primaryColor={p.primaryColor}
                        secondaryColor={p.secondaryColor}
                        liquidColor={p.liquidColor}
                        capColor={p.capColor}
                        size="sm"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900">{p.name}</h3>
                        <p className="text-xs text-neutral-500">{p.categoryLabel}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.articles.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#7D0000]">
                  Actualités ({results.articles.length})
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {results.articles.map((art) => (
                    <button
                      key={art.slug}
                      type="button"
                      onClick={() => onNavigate(`/actualites/${art.slug}`)}
                      className="flex cursor-pointer flex-col rounded-xl border border-neutral-200 bg-white p-5 text-left transition hover:border-[#7D0000]"
                    >
                      <span className="text-xs text-neutral-500">{art.date}</span>
                      <h3 className="mt-1 text-sm font-bold text-neutral-900">{art.title}</h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#9E0B0F]">
                        Lire l’article <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.wines.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#7D0000]">
                  Cave à vin ({results.wines.length})
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.wines.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => onNavigate('/notre-cave/')}
                      className="cursor-pointer rounded-xl border border-neutral-200 bg-white p-4 text-left transition hover:border-[#7D0000]"
                    >
                      <h3 className="text-sm font-bold text-neutral-900">{w.name}</h3>
                      <p className="mt-1 text-xs text-neutral-500">
                        {w.appellation} · {w.colorType}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.documents.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#7D0000]">
                  Docuthèque &amp; Publications ({results.documents.length})
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.documents.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => onOpenDocument(doc)}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-left transition hover:border-[#7D0000]"
                    >
                      <FileText className="h-5 w-5 shrink-0 text-[#9E0B0F]" />
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900">{doc.title}</h3>
                        <p className="text-xs text-neutral-500">Édition {doc.year}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

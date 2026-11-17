import React from 'react';
import { X, FileText, Download, CheckCircle2 } from 'lucide-react';
import { DocumentItem } from '../data/siteData';

interface DocumentViewerModalProps {
  doc: DocumentItem | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ doc, onClose }) => {
  if (!doc) return null;

  const handleDownloadSummary = () => {
    const content = [
      `SOBRAGA — Les Boissons du Gabon`,
      `====================================`,
      `Document : ${doc.title}`,
      doc.subtitle ? `Sous-titre : ${doc.subtitle}` : '',
      `Année : ${doc.year}`,
      ``,
      doc.summary,
      ``,
      `Points clés :`,
      ...doc.highlights.map((h) => `- ${h}`),
      ``,
      `Contact consommateur : +241 011 70 26 11`,
    ]
      .filter(Boolean)
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-viewer-title"
    >
      <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-200 bg-[#7D0000] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 shrink-0" />
            <div>
              <h3 id="doc-viewer-title" className="text-lg font-bold leading-snug">
                {doc.title}
              </h3>
              {doc.subtitle && <p className="text-xs text-red-100">{doc.subtitle}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le document"
            className="rounded-lg p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 text-sm text-neutral-700">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span>Édition {doc.year}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{doc.pagesCount} pages</span>
            <span aria-hidden="true">·</span>
            <span>Publication officielle SOBRAGA</span>
          </div>

          <p className="leading-relaxed text-neutral-800">{doc.summary}</p>

          <div className="mt-6 rounded-lg border border-neutral-200 bg-[#FDF6F6] p-5">
            <h4 className="mb-3 text-sm font-bold text-[#7D0000]">
              {doc.category === 'prix' ? 'Grille officielle des prix publics conseillés' : 'Points clés du document'}
            </h4>
            <ul className="space-y-2.5">
              {doc.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-800">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9E0B0F]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {doc.category === 'prix' && (
            <p className="mt-4 text-xs text-neutral-600">
              SOBRAGA appelle à la vigilance de ses consommateurs sur le respect des prix homologués
              dans les points de vente. Numéro consommateur : +241 011 70 26 11.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-6 py-3.5">
          <button
            type="button"
            onClick={handleDownloadSummary}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#7D0000] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#9E0B0F]"
          >
            <Download className="h-4 w-4" />
            Télécharger la fiche
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

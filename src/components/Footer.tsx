import React from 'react';
import { Facebook } from 'lucide-react';
import { SobragaLogo } from './BrandArtwork';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const go = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1E1E20] text-neutral-300">
      <div className="h-1 w-full bg-gradient-to-r from-[#5D0000] via-[#9E0B0F] to-[#5D0000]" />
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Left column */}
          <div className="md:col-span-5">
            <a href="/" onClick={(e) => go(e, '/')} className="inline-block">
              <SobragaLogo variant="dark" />
            </a>
            <p className="mt-5 max-w-md text-xs leading-relaxed text-neutral-300">
              La Sobraga génère près 2 000 emplois directs, et des dizaines de milliers d&apos;emplois
              indirects sur l&apos;ensemble du territoire gabonais à travers le réseau de
              grossistes...
            </p>
            <a
              href="https://www.facebook.com/lasobraga/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3B5998] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#324b81]"
            >
              <Facebook className="h-4 w-4 fill-current" />
              <span>Visitez notre page Facebook</span>
            </a>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <h4 className="mb-4 text-sm font-bold text-white">Entreprise</h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href="/notre-histoire/"
                    onClick={(e) => go(e, '/notre-histoire/')}
                    className="transition hover:text-white"
                  >
                    Notre histoire
                  </a>
                </li>
                <li>
                  <a
                    href="/nos-valeurs/"
                    onClick={(e) => go(e, '/nos-valeurs/')}
                    className="transition hover:text-white"
                  >
                    Nos valeurs
                  </a>
                </li>
                <li>
                  <a
                    href="/mot-du-directeur-general/"
                    onClick={(e) => go(e, '/mot-du-directeur-general/')}
                    className="transition hover:text-white"
                  >
                    Mot du Directeur Général
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold text-white">Produits</h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href="/nos-produits/eaux"
                    onClick={(e) => go(e, '/nos-produits/eaux')}
                    className="transition hover:text-white"
                  >
                    Eaux
                  </a>
                </li>
                <li>
                  <a
                    href="/nos-produits/boissons-gazeuses"
                    onClick={(e) => go(e, '/nos-produits/boissons-gazeuses')}
                    className="transition hover:text-white"
                  >
                    Boissons gazeuses
                  </a>
                </li>
                <li>
                  <a
                    href="/nos-produits/alcoomix"
                    onClick={(e) => go(e, '/nos-produits/alcoomix')}
                    className="transition hover:text-white"
                  >
                    Alcool Mix
                  </a>
                </li>
                <li>
                  <a
                    href="/nos-produits/bieres"
                    onClick={(e) => go(e, '/nos-produits/bieres')}
                    className="transition hover:text-white"
                  >
                    Bières
                  </a>
                </li>
                <li>
                  <a
                    href="/nos-produits/energy-drink"
                    onClick={(e) => go(e, '/nos-produits/energy-drink')}
                    className="transition hover:text-white"
                  >
                    Energy drink
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold text-white">Accès rapide</h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href="/nos-actualites/"
                    onClick={(e) => go(e, '/nos-actualites/')}
                    className="transition hover:text-white"
                  >
                    Actualités
                  </a>
                </li>
                <li>
                  <a
                    href="/notre-cave/"
                    onClick={(e) => go(e, '/notre-cave/')}
                    className="transition hover:text-white"
                  >
                    Cave à vin
                  </a>
                </li>
                <li>
                  <a
                    href="/rse/"
                    onClick={(e) => go(e, '/rse/')}
                    className="transition hover:text-white"
                  >
                    RSE
                  </a>
                </li>
                <li>
                  <a
                    href="/contact/"
                    onClick={(e) => go(e, '/contact/')}
                    className="transition hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-neutral-400 sm:flex-row md:px-8">
          <p>Copyright © 2026. iCube. Tous droits réservés</p>
          <div className="flex items-center gap-6">
            <a
              href="/mentions-legales/"
              onClick={(e) => go(e, '/mentions-legales/')}
              className="transition hover:text-white"
            >
              Mentions légales
            </a>
            <a
              href="/politique-de-confidentialite/"
              onClick={(e) => go(e, '/politique-de-confidentialite/')}
              className="transition hover:text-white"
            >
              Politique de confidentialité
            </a>
            <a
              href="/admin"
              onClick={(e) => go(e, '/admin')}
              className="inline-flex items-center gap-1 text-red-300/80 transition hover:text-white"
            >
              <span>Portail Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

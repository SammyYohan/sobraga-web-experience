import React from 'react';
import { SubpageBanner } from '../components/SubpageBanner';
import { SITE_ASSETS } from '../data/siteData';

export const LegalPage: React.FC<{ kind: 'mentions' | 'privacy' }> = ({ kind }) => {
  if (kind === 'mentions') {
    return (
      <div>
        <SubpageBanner title="Mentions légales" image={SITE_ASSETS.heroProduction} />
        <section className="mx-auto max-w-[960px] px-4 py-12 text-sm leading-relaxed text-neutral-700 md:px-8">
          <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-8">
            <div>
              <h2 className="text-lg font-bold text-[#7D0000]">Éditeur du site</h2>
              <p className="mt-2">
                <strong>SOBRAGA — Société des Boissons Rafraîchissantes du Gabon (Les Boissons du Gabon)</strong>
                <br />
                Zone Industrielle d’Owendo, Libreville — République Gabonaise
                <br />
                Standard : +241 011 70 19 79 / 011 70 19 69
                <br />
                Numéro consommateur : +241 011 70 26 11
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#7D0000]">Propriété intellectuelle</h2>
              <p className="mt-2">
                L’ensemble des marques, logos, visuels de bouteilles, textes, rapports RSE et
                publications présentes sur ce site sont la propriété exclusive de SOBRAGA et du
                Groupe Castel ou de leurs partenaires licenciés. Toute reproduction sans autorisation
                préalable est interdite.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#7D0000]">Consommation responsable</h2>
              <p className="mt-2">
                L’abus d’alcool est dangereux pour la santé, à consommer avec modération. La vente et
                la consommation de boissons alcoolisées sont interdites aux mineurs de moins de 18
                ans.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <SubpageBanner title="Politique de confidentialité" image={SITE_ASSETS.heroProduction} />
      <section className="mx-auto max-w-[960px] px-4 py-12 text-sm leading-relaxed text-neutral-700 md:px-8">
        <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-8">
          <div>
            <h2 className="text-lg font-bold text-[#7D0000]">Overview</h2>
            <p className="mt-2">
              Cette politique de confidentialité explique quelles informations personnelles SOBRAGA
              collecte et comment notre site web les traite, afin de vous informer clairement sur
              les données recueillies, leur utilisation et leurs durées de conservation.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#7D0000]">
              1. Identité du responsable du traitement
            </h2>
            <p className="mt-2">
              La Société des Boissons Rafraîchissantes du Gabon (SOBRAGA) est le responsable du
              traitement des données personnelles collectées sur ce site web.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#7D0000]">
              2. Engagements et transparence (Loi gabonaise n° 025/2023)
            </h2>
            <p className="mt-2">
              La SOBRAGA s’engage à traiter vos données personnelles dans le strict respect des
              principes établis par la loi gabonaise n° 025/2023 du 9 juillet 2023 sur la
              protection des données personnelles :
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>
                <strong>Finalité :</strong> Utilisation des données uniquement pour les objectifs
                déclarés (contact, réclamations, recrutement).
              </li>
              <li>
                <strong>Proportionnalité :</strong> Collecte limitée aux données strictement
                nécessaires.
              </li>
              <li>
                <strong>Conservation limitée :</strong> Durée de stockage appropriée et définie.
              </li>
              <li>
                <strong>Légalité, transparence et sécurité :</strong> Protection contre tout accès
                non autorisé.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#7D0000]">3. Cookies</h2>
            <p className="mt-2">
              Des cookies techniques permettent notamment de mémoriser votre confirmation de majorité
              (« Se souvenir de moi ») et d’assurer la fluidité de votre navigation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { CheckCircle2, Upload, AlertCircle } from 'lucide-react';
import { SubpageBanner } from '../components/SubpageBanner';
import { SITE_ASSETS } from '../data/siteData';
import { validateContactForm } from '../utils/siteLogic';

export const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'infos' | 'reclamation'>('infos');
  const [civilite, setCivilite] = useState('M.');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [produitConcerne, setProduitConcerne] = useState('REGAB');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateContactForm({ civilite, nom, prenom, email, telephone, message });
    setErrors(res.errors);
    if (!res.valid) return;
    setSubmittedRef(`SBG-${Math.floor(100000 + Math.random() * 900000)}`);
    setNom('');
    setPrenom('');
    setEmail('');
    setTelephone('');
    setMessage('');
  };

  return (
    <div>
      <SubpageBanner title="Contact" image={SITE_ASSETS.heroProduction} />

      <section className="mx-auto max-w-[980px] px-4 py-12 md:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#222222] md:text-3xl">
            Une question, une remarque ? Contactez-nous !
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Si vous souhaitez obtenir des informations complémentaires, formuler une réclamation
            concernant l’un de nos produits ou nous faire part de vos observations, merci de remplir
            le formulaire ci-dessous dans son intégralité. Votre demande sera enregistrée et traitée
            dans les meilleurs délais par nos services compétents.
          </p>
        </div>

        {/* Interactive Mode Switcher Tabs matching sobraga.com */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-b border-neutral-200 pb-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab('infos');
              setSubmittedRef(null);
            }}
            className={`cursor-pointer rounded-lg px-5 py-2.5 text-xs font-bold transition md:text-sm ${
              activeTab === 'infos'
                ? 'bg-[#7D0000] text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Je cherche des informations sur la sobraga
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('reclamation');
              setSubmittedRef(null);
            }}
            className={`cursor-pointer rounded-lg px-5 py-2.5 text-xs font-bold transition md:text-sm ${
              activeTab === 'reclamation'
                ? 'bg-[#7D0000] text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            J&apos;ai une réclamation sur un produit
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-xs md:p-10">
          {submittedRef ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
              <h3 className="mt-4 text-xl font-bold text-neutral-900">
                Demande enregistrée avec succès
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Référence de suivi : <strong className="tabular-nums text-[#7D0000]">{submittedRef}</strong>.
                Nos équipes du service consommateur vous répondront dans les meilleurs délais.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedRef(null)}
                className="mt-6 cursor-pointer rounded-lg bg-[#7D0000] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#9E0B0F]"
              >
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
              <h3 className="text-lg font-bold text-neutral-900">Informations personnelles</h3>
              <p className="mt-1 text-xs text-neutral-500">
                Entrez vos informations personnelles.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="contact-civilite" className="block text-xs font-semibold text-neutral-700">
                    Civilité *
                  </label>
                  <select
                    id="contact-civilite"
                    value={civilite}
                    onChange={(e) => setCivilite(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  >
                    <option value="M.">M.</option>
                    <option value="Mme.">Mme.</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-nom" className="block text-xs font-semibold text-neutral-700">
                    Nom *
                  </label>
                  <input
                    id="contact-nom"
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom"
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  />
                  {errors.nom && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="h-3 w-3" /> {errors.nom}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-prenom" className="block text-xs font-semibold text-neutral-700">
                    Prénom *
                  </label>
                  <input
                    id="contact-prenom"
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Prénom"
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  />
                  {errors.prenom && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="h-3 w-3" /> {errors.prenom}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-700">
                    Adresse email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-tel" className="block text-xs font-semibold text-neutral-700">
                    Téléphone *
                  </label>
                  <input
                    id="contact-tel"
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="+241 ..."
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  />
                  {errors.telephone && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="h-3 w-3" /> {errors.telephone}
                    </p>
                  )}
                </div>
              </div>

              {activeTab === 'reclamation' && (
                <div className="mt-5">
                  <label htmlFor="contact-produit" className="block text-xs font-semibold text-neutral-700">
                    Produit concerné *
                  </label>
                  <select
                    id="contact-produit"
                    value={produitConcerne}
                    onChange={(e) => setProduitConcerne(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  >
                    <option value="REGAB">REGAB</option>
                    <option value="CASTEL BEER">CASTEL BEER</option>
                    <option value="33 EXPORT">“33” EXPORT</option>
                    <option value="BEAUFORT">BEAUFORT</option>
                    <option value="DJINO">D’JINO</option>
                    <option value="TOP">TOP</option>
                    <option value="WORLD COLA">WORLD COLA</option>
                    <option value="AKEWA / ANDZA / ABORA">Eaux (Akewa, Andza, Abora, Aning’eau)</option>
                    <option value="JUGAB">JUGAB</option>
                    <option value="FEROX / XXL">Energy Drink (Ferox, XXL)</option>
                  </select>
                </div>
              )}

              <div className="mt-5">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-700">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    activeTab === 'reclamation'
                      ? 'Précisez le format, la date/numéro de lot et votre remarque...'
                      : 'Message'
                  }
                  className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3 w-3" /> {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-[#7D0000] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#9E0B0F]"
                >
                  Envoyer
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export const CareersPage: React.FC = () => {
  const [civilite, setCivilite] = useState('M.');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');
  const [cvName, setCvName] = useState('');
  const [lettreName, setLettreName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateContactForm({
      civilite,
      nom,
      prenom,
      email,
      telephone,
      message,
      requireFiles: true,
      cvName,
      lettreName,
    });
    setErrors(res.errors);
    if (!res.valid) return;
    setSubmitted(true);
  };

  return (
    <div>
      <SubpageBanner title="Rejoignez-nous" image={SITE_ASSETS.heroRseWorker} />

      <section className="mx-auto max-w-[980px] px-4 py-12 md:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#222222] md:text-3xl">
            Rejoignez l’aventure avec Sobraga
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600">
            Nous sommes toujours à la recherche de talents passionnés, curieux et motivés pour
            enrichir notre équipe. Si vous souhaitez postuler à un emploi ou à un stage au sein des
            Boissons du Gabon, merci de remplir le formulaire ci-dessous dans son intégralité. Afin
            que votre candidature puisse être étudiée, il est obligatoire de joindre votre CV ainsi
            que votre lettre de motivation dans les espaces prévus à cet effet.
          </p>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('rh-nom');
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              el?.focus();
            }}
            className="mt-6 inline-block cursor-pointer rounded-xl bg-[#7D0000] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#9E0B0F]"
          >
            Je cherche un emploi / Stage ↓
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-xs md:p-10">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
              <h3 className="mt-4 text-xl font-bold text-neutral-900">
                Candidature transmise avec succès
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Votre dossier ({cvName}, {lettreName}) a bien été enregistré par la Direction des
                Ressources Humaines de SOBRAGA et sera consulté en priorité.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setNom('');
                  setPrenom('');
                  setEmail('');
                  setTelephone('');
                  setMessage('');
                  setCvName('');
                  setLettreName('');
                }}
                className="mt-6 cursor-pointer rounded-lg bg-[#7D0000] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#9E0B0F]"
              >
                Nouvelle candidature
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de candidature">
              <h3 className="text-lg font-bold text-neutral-900">Informations personnelles</h3>
              <p className="mt-1 text-xs text-neutral-500">
                Entrez vos informations personnelles.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="rh-civilite" className="block text-xs font-semibold text-neutral-700">
                    Civilité *
                  </label>
                  <select
                    id="rh-civilite"
                    value={civilite}
                    onChange={(e) => setCivilite(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  >
                    <option value="M.">M.</option>
                    <option value="Mme.">Mme.</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="rh-nom" className="block text-xs font-semibold text-neutral-700">
                    Nom *
                  </label>
                  <input
                    id="rh-nom"
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom"
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  />
                  {errors.nom && <p className="mt-1 text-xs text-red-600">{errors.nom}</p>}
                </div>

                <div>
                  <label htmlFor="rh-prenom" className="block text-xs font-semibold text-neutral-700">
                    Prénom *
                  </label>
                  <input
                    id="rh-prenom"
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Prénom"
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  />
                  {errors.prenom && <p className="mt-1 text-xs text-red-600">{errors.prenom}</p>}
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="rh-email" className="block text-xs font-semibold text-neutral-700">
                    Adresse email *
                  </label>
                  <input
                    id="rh-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="rh-tel" className="block text-xs font-semibold text-neutral-700">
                    Téléphone *
                  </label>
                  <input
                    id="rh-tel"
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="+241 ..."
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                  />
                  {errors.telephone && <p className="mt-1 text-xs text-red-600">{errors.telephone}</p>}
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="rh-cv" className="block text-xs font-semibold text-neutral-700">
                    Curriculum Vitae (PDF / DOCX) *
                  </label>
                  <label className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-neutral-300 bg-[#FDF6F6] px-4 py-3 text-xs text-neutral-700 hover:border-[#7D0000]">
                    <Upload className="h-4 w-4 shrink-0 text-[#7D0000]" />
                    <span className="truncate">{cvName || 'Joindre votre CV'}</span>
                    <input
                      id="rh-cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setCvName(e.target.files?.[0]?.name || '')}
                      className="sr-only"
                    />
                  </label>
                  {errors.cv && <p className="mt-1 text-xs text-red-600">{errors.cv}</p>}
                </div>

                <div>
                  <label htmlFor="rh-lettre" className="block text-xs font-semibold text-neutral-700">
                    Lettre de motivation (PDF / DOCX) *
                  </label>
                  <label className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-neutral-300 bg-[#FDF6F6] px-4 py-3 text-xs text-neutral-700 hover:border-[#7D0000]">
                    <Upload className="h-4 w-4 shrink-0 text-[#7D0000]" />
                    <span className="truncate">{lettreName || 'Joindre votre lettre de motivation'}</span>
                    <input
                      id="rh-lettre"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setLettreName(e.target.files?.[0]?.name || '')}
                      className="sr-only"
                    />
                  </label>
                  {errors.lettre && <p className="mt-1 text-xs text-red-600">{errors.lettre}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="rh-message" className="block text-xs font-semibold text-neutral-700">
                  Message *
                </label>
                <textarea
                  id="rh-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Présentez votre parcours, poste recherché et disponibilités..."
                  className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#7D0000] focus:outline-none"
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-[#7D0000] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#9E0B0F]"
                >
                  Envoyer ma candidature
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

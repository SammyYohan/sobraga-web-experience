export type AppRoute =
  | { name: 'home' }
  | { name: 'mot-dg' }
  | { name: 'notre-histoire' }
  | { name: 'nos-valeurs' }
  | { name: 'capsules' }
  | { name: 'actualites'; page: number }
  | { name: 'article-detail'; slug: string }
  | { name: 'produits'; category: string }
  | { name: 'produit-detail'; slug: string }
  | { name: 'docutheque'; section: 'engagement-qualite' | 'code-conduite' | 'esbidjinews' }
  | { name: 'cave' }
  | { name: 'rse' }
  | { name: 'contact' }
  | { name: 'rejoignez-nous' }
  | { name: 'recherche'; query: string }
  | { name: 'mentions-legales' }
  | { name: 'politique-confidentialite' };

export function parseRoute(pathname: string, search: string = ''): AppRoute {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);

  if (cleanPath === '/' || cleanPath === '') {
    const q = params.get('s');
    if (q !== null) return { name: 'recherche', query: q };
    return { name: 'home' };
  }

  if (cleanPath === '/mot-du-directeur-general') return { name: 'mot-dg' };
  if (cleanPath === '/notre-histoire') return { name: 'notre-histoire' };
  if (cleanPath === '/nos-valeurs') return { name: 'nos-valeurs' };
  if (cleanPath === '/qualite-categorie/capsules-sobraga') return { name: 'capsules' };

  if (cleanPath === '/qualite-categorie/engagement-qualite') {
    return { name: 'docutheque', section: 'engagement-qualite' };
  }
  if (cleanPath === '/qualite-categorie/code-conduite') {
    return { name: 'docutheque', section: 'code-conduite' };
  }
  if (cleanPath === '/qualite-categorie/esbidjinews') {
    return { name: 'docutheque', section: 'esbidjinews' };
  }

  if (cleanPath === '/nos-actualites') return { name: 'actualites', page: 1 };
  const newsPageMatch = cleanPath.match(/^\/nos-actualites\/page\/(\d+)$/);
  if (newsPageMatch) {
    return { name: 'actualites', page: Math.max(1, Number(newsPageMatch[1])) };
  }
  const articleMatch = cleanPath.match(/^\/actualites\/([^/]+)$/);
  if (articleMatch) {
    return { name: 'article-detail', slug: decodeURIComponent(articleMatch[1]) };
  }

  if (cleanPath === '/nos-produits') return { name: 'produits', category: 'all' };
  const prodCatMatch = cleanPath.match(/^\/nos-produits\/([^/]+)$/);
  if (prodCatMatch) {
    return { name: 'produits', category: decodeURIComponent(prodCatMatch[1]) };
  }
  const prodDetailMatch = cleanPath.match(/^\/produits\/([^/]+)$/);
  if (prodDetailMatch) {
    return { name: 'produit-detail', slug: decodeURIComponent(prodDetailMatch[1]) };
  }

  if (cleanPath === '/notre-cave') return { name: 'cave' };
  if (cleanPath === '/rse') return { name: 'rse' };
  if (cleanPath === '/contact') return { name: 'contact' };
  if (cleanPath === '/rejoignez-nous') return { name: 'rejoignez-nous' };
  if (cleanPath === '/recherche') return { name: 'recherche', query: params.get('q') || params.get('s') || '' };
  if (cleanPath === '/mentions-legales') return { name: 'mentions-legales' };
  if (cleanPath === '/politique-de-confidentialite') return { name: 'politique-confidentialite' };

  return { name: 'home' };
}

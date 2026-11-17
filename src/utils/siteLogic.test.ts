import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRoute } from './router';
import { filterProducts, filterWines, paginateArticles, searchSite, validateContactForm } from './siteLogic';
import { NEWS_ARTICLES, PRODUCTS, WINES } from '../data/siteData';

test('parseRoute resolves all primary and nested routes', () => {
  assert.deepEqual(parseRoute('/'), { name: 'home' });
  assert.deepEqual(parseRoute('/mot-du-directeur-general/'), { name: 'mot-dg' });
  assert.deepEqual(parseRoute('/notre-histoire'), { name: 'notre-histoire' });
  assert.deepEqual(parseRoute('/nos-valeurs/'), { name: 'nos-valeurs' });
  assert.deepEqual(parseRoute('/qualite-categorie/capsules-sobraga/'), { name: 'capsules' });
  assert.deepEqual(parseRoute('/qualite-categorie/engagement-qualite/'), {
    name: 'docutheque',
    section: 'engagement-qualite',
  });
  assert.deepEqual(parseRoute('/qualite-categorie/code-conduite/'), {
    name: 'docutheque',
    section: 'code-conduite',
  });
  assert.deepEqual(parseRoute('/qualite-categorie/esbidjinews/'), {
    name: 'docutheque',
    section: 'esbidjinews',
  });
  assert.deepEqual(parseRoute('/nos-actualites/page/2/'), { name: 'actualites', page: 2 });
  assert.deepEqual(parseRoute('/actualites/mon-article/'), { name: 'article-detail', slug: 'mon-article' });
  assert.deepEqual(parseRoute('/nos-produits/bieres'), { name: 'produits', category: 'bieres' });
  assert.deepEqual(parseRoute('/produits/regab/'), { name: 'produit-detail', slug: 'regab' });
  assert.deepEqual(parseRoute('/notre-cave/'), { name: 'cave' });
  assert.deepEqual(parseRoute('/rse/'), { name: 'rse' });
  assert.deepEqual(parseRoute('/contact/'), { name: 'contact' });
  assert.deepEqual(parseRoute('/rejoignez-nous/'), { name: 'rejoignez-nous' });
  assert.deepEqual(parseRoute('/', '?s=regab'), { name: 'recherche', query: 'regab' });
  assert.deepEqual(parseRoute('/mentions-legales/'), { name: 'mentions-legales' });
  assert.deepEqual(parseRoute('/politique-de-confidentialite/'), { name: 'politique-confidentialite' });
  assert.deepEqual(parseRoute('/admin'), { name: 'admin', tab: 'articles' });
  assert.deepEqual(parseRoute('/admin/prix/'), { name: 'admin', tab: 'prix' });
});

test('filterProducts returns full catalog and accurately filters categories', () => {
  assert.equal(filterProducts('all').length, PRODUCTS.length);
  const beers = filterProducts('bieres');
  assert.ok(beers.length >= 8);
  assert.ok(beers.every((p) => p.category === 'bieres'));
  assert.ok(beers.some((p) => p.slug === 'regab'));

  const waters = filterProducts('eaux');
  assert.equal(waters.length, 4);
  assert.ok(waters.some((p) => p.slug === 'abora'));
});

test('filterWines filters all 13 wine references by category', () => {
  assert.equal(filterWines('all').length, WINES.length);
  assert.equal(filterWines('champagnes').length, 4);
  assert.equal(filterWines('baron-de-lestac').length, 2);
});

test('searchSite finds matching products, articles, wines, and documents', () => {
  const regabRes = searchSite('regab');
  assert.ok(regabRes.products.some((p) => p.slug === 'regab'));
  assert.ok(regabRes.documents.some((d) => d.id === 'prix-homologues-lbv'));
  assert.ok(regabRes.total >= 2);

  const emptyRes = searchSite('   ');
  assert.equal(emptyRes.total, 0);
});

test('validateContactForm rejects invalid fields and enforces CV/LM when required', () => {
  const invalid = validateContactForm({
    civilite: 'M.',
    nom: '',
    prenom: 'Jean',
    email: 'not-an-email',
    telephone: '123',
    message: 'ok',
    requireFiles: true,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.nom);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.telephone);
  assert.ok(invalid.errors.message);
  assert.ok(invalid.errors.cv);
  assert.ok(invalid.errors.lettre);

  const valid = validateContactForm({
    civilite: 'Mme.',
    nom: 'Mbadinga',
    prenom: 'Claire',
    email: 'claire.mbadinga@example.ga',
    telephone: '+241 077 12 34 56',
    message: 'Bonjour, je souhaite obtenir des informations sur vos produits.',
  });
  assert.equal(valid.valid, true);
});

test('paginateArticles splits articles deterministically', () => {
  const p1 = paginateArticles(NEWS_ARTICLES, 1, 6);
  const p2 = paginateArticles(NEWS_ARTICLES, 2, 6);
  assert.equal(p1.items.length, 6);
  assert.ok(p2.items.length >= 1);
  assert.notEqual(p1.items[0].slug, p2.items[0].slug);
});

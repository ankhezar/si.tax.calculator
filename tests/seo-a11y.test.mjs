import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { EN } from '../js/i18n/en.js';
import { SL } from '../js/i18n/sl.js';
import { UA } from '../js/i18n/ua.js';
import {
  createDefaultState,
  resolveTabSlug,
  applyScenarioSearch,
  applyScenarioHash
} from '../js/state.js';
import { computeLiveSummary } from '../js/app.js';
import { renderSloveniaView } from '../js/views/sloveniaView.js';
import {
  renderCroatiaView,
  renderItalyView,
  renderAustriaView,
  renderHungaryView,
  renderPolandView,
  renderCzechiaView,
  renderSlovakiaView,
  renderSpainView
} from '../js/views/countryView.js';
import { renderCompareView } from '../js/views/compareView.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const BASE_URL = 'https://ankhezar.github.io/si.tax.calculator';

const ENTRY_PAGES = [
  { slug: '', expectedTab: 'si' },
  { slug: 'slovenia', expectedTab: 'si' },
  { slug: 'croatia', expectedTab: 'hr' },
  { slug: 'italy', expectedTab: 'it' },
  { slug: 'austria', expectedTab: 'at' },
  { slug: 'hungary', expectedTab: 'hu' },
  { slug: 'poland', expectedTab: 'pl' },
  { slug: 'czechia', expectedTab: 'cz' },
  { slug: 'slovakia', expectedTab: 'sk' },
  { slug: 'spain', expectedTab: 'es' },
  { slug: 'compare', expectedTab: 'compare' }
];

test('Rebrand to NettoEU preserves Slovenian Normiranec search keywords', () => {
  assert.equal(EN.brand_title, 'NettoEU');
  assert.equal(SL.brand_title, 'NettoEU');
  assert.equal(UA.brand_title, 'NettoEU');

  assert.ok(SL.doc_title.includes('Normiranec'), 'SL doc_title must retain Normiranec keyword');
  assert.ok(SL.brand_subtitle.includes('Normiranec'), 'SL brand_subtitle must retain Normiranec keyword');
});

test('Open Graph social card assets/og-card.png is an exact 1200x630 24-bit RGB PNG', () => {
  const ogPath = path.join(ROOT_DIR, 'assets', 'og-card.png');
  assert.ok(fs.existsSync(ogPath), 'assets/og-card.png must exist');
  const buf = fs.readFileSync(ogPath);

  // PNG magic header
  assert.equal(buf[0], 0x89);
  assert.equal(buf[1], 0x50);
  assert.equal(buf[2], 0x4e);
  assert.equal(buf[3], 0x47);

  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const bitDepth = buf[24];
  const colorType = buf[25];

  assert.equal(width, 1200, 'og-card.png width must be 1200px');
  assert.equal(height, 630, 'og-card.png height must be 630px');
  assert.equal(bitDepth, 8, 'og-card.png bit depth must be 8');
  assert.equal(colorType, 2, 'og-card.png must be opaque 24-bit RGB');
  assert.ok(buf.length > 30_000 && buf.length < 600_000, 'og-card.png size must be reasonable');
});

test('All 11 static SEO entry pages have unique metadata, valid JSON-LD @graph, WAI-ARIA tablist, and valid asset links', () => {
  const appJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'app.js'), 'utf8');
  const requiredIds = [];
  const idRegex = /getElementById\(['"]([^'"]+)['"]\)/g;
  let idMatch;
  while ((idMatch = idRegex.exec(appJs)) !== null) {
    if (!requiredIds.includes(idMatch[1])) requiredIds.push(idMatch[1]);
  }

  const seenTitles = new Set();
  const seenDescriptions = new Set();

  for (const page of ENTRY_PAGES) {
    const htmlPath = page.slug
      ? path.join(ROOT_DIR, page.slug, 'index.html')
      : path.join(ROOT_DIR, 'index.html');
    assert.ok(fs.existsSync(htmlPath), `Missing entry page: ${htmlPath}`);
    const html = fs.readFileSync(htmlPath, 'utf8');
    const htmlDir = path.dirname(htmlPath);

    // Every static DOM ID used by js/app.js must exist
    for (const reqId of requiredIds) {
      assert.ok(html.includes(`id="${reqId}"`), `${page.slug || 'root'} missing id="${reqId}"`);
    }

    // Unique <title> & <meta name="description">
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    assert.ok(titleMatch && titleMatch[1].length >= 35, `Missing/short <title> in ${htmlPath}`);
    assert.equal(seenTitles.has(titleMatch[1]), false, `Duplicate <title> on ${page.slug}`);
    seenTitles.add(titleMatch[1]);

    const descMatch = html.match(/<meta name="description" content="([^"]+)">/);
    assert.ok(descMatch && descMatch[1].length >= 100, `Missing/short meta description in ${htmlPath}`);
    assert.equal(seenDescriptions.has(descMatch[1]), false, `Duplicate description on ${page.slug}`);
    seenDescriptions.add(descMatch[1]);

    // Canonical + Open Graph + Twitter Card
    const expectedCanonical = page.slug ? `${BASE_URL}/${page.slug}/` : `${BASE_URL}/`;
    assert.ok(
      html.includes(`<link rel="canonical" href="${expectedCanonical}">`),
      `Canonical mismatch in ${htmlPath}`
    );
    assert.ok(
      html.includes(`<meta property="og:url" content="${expectedCanonical}">`),
      `og:url mismatch in ${htmlPath}`
    );
    assert.ok(
      html.includes(`<meta property="og:image" content="${BASE_URL}/assets/og-card.png">`),
      `og:image missing in ${htmlPath}`
    );
    assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image">'));

    // Subdirectory pages must declare data-default-tab
    if (page.slug) {
      assert.ok(
        html.includes(`data-default-tab="${page.expectedTab}"`),
        `${htmlPath} must specify data-default-tab="${page.expectedTab}"`
      );
    }

    // Parse & validate Schema.org JSON-LD @graph
    const ldMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
    assert.ok(ldMatch, `Missing JSON-LD script in ${htmlPath}`);
    const ld = JSON.parse(ldMatch[1]);
    assert.equal(ld['@context'], 'https://schema.org');
    assert.ok(Array.isArray(ld['@graph']) && ld['@graph'].length >= 2);
    const webApp = ld['@graph'].find(n => n['@type'] === 'WebApplication');
    const faqPage = ld['@graph'].find(n => n['@type'] === 'FAQPage');
    assert.ok(webApp && webApp.url === expectedCanonical);
    assert.ok(faqPage && Array.isArray(faqPage.mainEntity) && faqPage.mainEntity.length >= 3);

    // Pre-rendered crawlable summary inside <main id="view-mount">
    assert.ok(html.includes('class="panel-card seo-prerender"'));
    assert.ok(html.includes('class="seo-country-links"'));

    // WAI-ARIA tablist: 10 tabs total, 1 active with aria-selected="true" & tabindex="0", 9 inactive
    assert.ok(html.includes('role="tablist"'));
    const tabMatches = [...html.matchAll(/<button[^>]*role="tab"[^>]*>/g)].map(m => m[0]);
    assert.equal(tabMatches.length, 10, `${htmlPath} must render 10 role="tab" buttons`);
    const selectedTabs = tabMatches.filter(tag => tag.includes('aria-selected="true"'));
    const tabZeroTabs = tabMatches.filter(tag => tag.includes('tabindex="0"'));
    const tabMinusOneTabs = tabMatches.filter(tag => tag.includes('tabindex="-1"'));
    assert.equal(selectedTabs.length, 1);
    assert.equal(tabZeroTabs.length, 1);
    assert.equal(tabMinusOneTabs.length, 9);
    assert.ok(selectedTabs[0].includes(`id="tab-${page.expectedTab}"`));
    assert.ok(html.includes(`aria-labelledby="tab-${page.expectedTab}"`));

    // Verify relative stylesheet, script, and icon links resolve on disk
    const relRefs = [...html.matchAll(/(?:href|src)="(\.\.?\/[^"?#]+)(?:\?[^"]*)?"/g)].map(m => m[1]);
    assert.ok(relRefs.length >= 8);
    for (const ref of relRefs) {
      const targetOnDisk = path.resolve(htmlDir, ref);
      assert.ok(fs.existsSync(targetOnDisk), `Broken relative asset ${ref} in ${htmlPath}`);
    }
  }
});

test('robots.txt, sitemap.xml, and llms.txt exist and cover all 9 EU countries and 11 canonical URLs', () => {
  const robots = fs.readFileSync(path.join(ROOT_DIR, 'robots.txt'), 'utf8');
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes(`Sitemap: ${BASE_URL}/sitemap.xml`));

  const sitemap = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.xml'), 'utf8');
  for (const page of ENTRY_PAGES) {
    const loc = page.slug ? `${BASE_URL}/${page.slug}/` : `${BASE_URL}/`;
    assert.ok(sitemap.includes(`<loc>${loc}</loc>`), `sitemap.xml missing ${loc}`);
  }

  const llms = fs.readFileSync(path.join(ROOT_DIR, 'llms.txt'), 'utf8');
  assert.ok(llms.includes('# NettoEU'));
  for (const slug of [
    'slovenia',
    'croatia',
    'italy',
    'austria',
    'hungary',
    'poland',
    'czechia',
    'slovakia',
    'spain',
    'compare'
  ]) {
    assert.ok(llms.includes(`${BASE_URL}/${slug}/`), `llms.txt missing link for /${slug}/`);
  }
});

test('WCAG 2.2 AA audit: every input & select has a unique ID paired with <label for>, aria-pressed on toggles, accessible tables, and contextual aria-labels', () => {
  const rootHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');

  const state = createDefaultState();
  state.lang = 'en';
  state.revenueEur = 75000;
  state.family = { children: 2, dependentSpouse: true };

  const viewSamples = [
    { name: 'index-shell', html: rootHtml },
    {
      name: 'si-zpzr-manual',
      html: renderSloveniaView({
        ...state,
        si: { ...state.si, regimeView: 'zpzr', mode: 'polni', baseMethod: 'manual' }
      })
    },
    {
      name: 'si-compare',
      html: renderSloveniaView({
        ...state,
        si: { ...state.si, regimeView: 'compare', mode: 'polni', baseMethod: 'manual' }
      })
    },
    { name: 'hr', html: renderCroatiaView(state) },
    {
      name: 'it-artigiani',
      html: renderItalyView({ ...state, it: { ...state.it, inpsScheme: 'artigiani' } })
    },
    {
      name: 'at-spouse-waiver',
      html: renderAustriaView({
        ...state,
        family: { children: 0, dependentSpouse: true }
      })
    },
    { name: 'hu-atalanyado', html: renderHungaryView(state) },
    { name: 'hu-kata', html: renderHungaryView({ ...state, hu: { ...state.hu, regime: 'kata' } }) },
    { name: 'pl-ryczalt', html: renderPolandView(state) },
    {
      name: 'cz-vydaje',
      html: renderCzechiaView({
        ...state,
        cz: { ...state.cz, regime: 'vydajovy_pausal', spouseYoungChild: true }
      })
    },
    { name: 'sk', html: renderSlovakiaView(state) },
    { name: 'es', html: renderSpainView(state) },
    { name: 'compare-preset', html: renderCompareView(state) },
    {
      name: 'compare-custom',
      html: renderCompareView({
        ...state,
        compare: { ...state.compare, personaMode: 'custom' }
      })
    }
  ];

  for (const sample of viewSamples) {
    // 1. Every <input> and <select> must have an id="..." and a matching <label ... for="...">
    const seenIds = new Set();
    const controlTags = [...sample.html.matchAll(/<(?:input|select)\b[^>]*>/g)].map(m => m[0]);
    for (const tag of controlTags) {
      const idMatch = tag.match(/\bid="([^"]+)"/);
      assert.ok(idMatch && idMatch[1], `[${sample.name}] Form control missing id: ${tag}`);
      const id = idMatch[1];
      assert.equal(seenIds.has(id), false, `[${sample.name}] Duplicate control id="${id}"`);
      seenIds.add(id);

      const hasLabelFor = new RegExp(`<label\\b[^>]*\\bfor="${id}"`).test(sample.html);
      assert.ok(hasLabelFor, `[${sample.name}] Missing <label for="${id}">`);
    }

    // 2. Zero generic aria-label="Info", "Decrease", or "Increase"
    assert.equal(
      sample.html.includes('aria-label="Info"'),
      false,
      `[${sample.name}] Must not use generic aria-label="Info"`
    );
    assert.equal(
      sample.html.includes('aria-label="Decrease"'),
      false,
      `[${sample.name}] Must not use generic aria-label="Decrease"`
    );
    assert.equal(
      sample.html.includes('aria-label="Increase"'),
      false,
      `[${sample.name}] Must not use generic aria-label="Increase"`
    );

    // 3. All segmented toggle buttons must carry aria-pressed="true|false"
    const toggleBtns = [
      ...sample.html.matchAll(
        /<button\b[^>]*class="[^"]*\b(?:regime-pill|seg-option|seg-mini-btn|view-btn)\b[^"]*"[^>]*>/g
      )
    ].map(m => m[0]);
    for (const btn of toggleBtns) {
      assert.ok(
        /aria-pressed="(?:true|false)"/.test(btn),
        `[${sample.name}] Toggle button missing aria-pressed: ${btn}`
      );
    }

    // 4. Data tables must include <caption class="sr-only"> and <th scope="col"
    if (sample.html.includes('<table')) {
      assert.ok(
        sample.html.includes('<caption class="sr-only">'),
        `[${sample.name}] Table must include screen-reader caption`
      );
      const thTags = [...sample.html.matchAll(/<th\b[^>]*>/g)].map(m => m[0]);
      assert.ok(thTags.length >= 4);
      for (const th of thTags) {
        assert.ok(th.includes('scope="col"'), `[${sample.name}] <th> missing scope="col": ${th}`);
      }
    }
  }

  // 5. Interactive SVG chart in Slovenia compare view has keyboard slider semantics
  const siCmpHtml = viewSamples.find(s => s.name === 'si-compare').html;
  assert.ok(siCmpHtml.includes('id="si-burden-svg"'));
  assert.ok(siCmpHtml.includes('tabindex="0"'));
  assert.ok(siCmpHtml.includes('role="slider"'));
  assert.ok(siCmpHtml.includes('aria-valuenow="75000"'));
  assert.ok(siCmpHtml.includes('aria-valuetext="Revenue'));

  // 6. Every parameter .form-group across all 9 country views has a contextual .info-trigger tooltip
  const countryViewNames = [
    'si-zpzr-manual',
    'si-compare',
    'hr',
    'it-artigiani',
    'at-spouse-waiver',
    'hu-atalanyado',
    'hu-kata',
    'pl-ryczalt',
    'cz-vydaje',
    'sk',
    'es'
  ];
  for (const viewName of countryViewNames) {
    const html = viewSamples.find(s => s.name === viewName).html;
    const labelRows = [...html.matchAll(/<div class="form-group">[\s\S]*?<div class="label-row">([\s\S]*?)<\/div>/g)].map(
      m => m[1]
    );
    assert.ok(labelRows.length >= 3, `[${viewName}] Expected >= 3 parameter .form-group blocks`);
    for (const rowHtml of labelRows) {
      assert.ok(
        rowHtml.includes('class="info-trigger"') && rowHtml.includes('data-tip-key="'),
        `[${viewName}] Parameter .label-row missing .info-trigger tooltip button: ${rowHtml.trim()}`
      );
    }
    assert.equal(
      html.includes('data-tip-key="desc_family"'),
      false,
      `[${viewName}] Single-country view must use country-specific desc_{cc}_family tooltip`
    );
  }
});

test('Query string routing (?country=poland&rev=90000) and polite live announcer work across languages', () => {
  assert.equal(resolveTabSlug('poland'), 'pl');
  assert.equal(resolveTabSlug('CZECHIA'), 'cz');
  assert.equal(resolveTabSlug('arena'), 'compare');
  assert.equal(resolveTabSlug('unknown'), null);

  const s = createDefaultState();
  const applied = applyScenarioSearch(s, '?country=poland&rev=90000&view=monthly&lang=en');
  assert.equal(applied, true);
  assert.equal(s.activeTab, 'pl');
  assert.equal(s.revenueEur, 90000);
  assert.equal(s.view, 'monthly');
  assert.equal(s.lang, 'en');

  // Hash overrides query search when present
  applyScenarioHash(s, '#tab=es&rev=60000');
  assert.equal(s.activeTab, 'es');
  assert.equal(s.revenueEur, 60000);

  for (const lang of ['en', 'sl', 'ua']) {
    s.lang = lang;
    for (const tab of ['si', 'pl', 'compare']) {
      s.activeTab = tab;
      const msg = computeLiveSummary(s);
      assert.ok(msg.length > 20, `Live summary too short for ${tab}/${lang}`);
      assert.equal(/\{[a-zA-Z0-9_]+\}/.test(msg), false, `Unresolved token in ${msg}`);
    }
    s.activeTab = 'si';
    s.si.regimeView = 'compare';
    const cmpMsg = computeLiveSummary(s);
    assert.ok(cmpMsg.length > 20);
    assert.equal(/\{[a-zA-Z0-9_]+\}/.test(cmpMsg), false);
  }
});

test('Responsive filter grids & CSS layout guards prevent segmented-toggle overflow and orphan grid gaps across SL, EN, UA', () => {
  const css = fs.readFileSync(path.join(ROOT_DIR, 'css', 'styles.css'), 'utf8');

  // Guard against CSS Grid auto-min-content overflow (`1fr 1fr` without `minmax(0, 1fr)`)
  assert.equal(
    /\.seg-control\s*\{[^}]*grid-template-columns:\s*1fr\s+1fr/s.test(css),
    false,
    '.seg-control must use minmax(0, 1fr) tracks to prevent long SL/UA labels from overflowing'
  );
  assert.equal(
    /\.seg-mini-group\.full-w\s*\{[^}]*grid-template-columns:\s*1fr\s+1fr/s.test(css),
    false,
    '.seg-mini-group.full-w must use minmax(0, 1fr) tracks to prevent long SL/UA labels from overflowing'
  );
  assert.ok(css.includes('grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);'));
  assert.ok(css.includes('.compare-inputs-row.items-5 > .form-group:last-child'));
  assert.ok(css.includes('.persona-filters-grid.items-5 > .persona-field-spouse'));

  for (const lang of ['en', 'sl', 'ua']) {
    const s = createDefaultState();
    s.lang = lang;
    s.si.regimeView = 'compare';

    s.si.mode = 'pop';
    const popHtml = renderSloveniaView(s);
    assert.ok(popHtml.includes('class="compare-inputs-row items-3"'));

    s.si.mode = 'polni';
    s.si.baseMethod = 'auto';
    const autoHtml = renderSloveniaView(s);
    assert.ok(autoHtml.includes('class="compare-inputs-row items-5"'));

    s.si.baseMethod = 'manual';
    const manHtml = renderSloveniaView(s);
    assert.ok(manHtml.includes('class="compare-inputs-row items-6"'));

    s.compare.personaMode = 'preset';
    const presetHtml = renderCompareView(s);
    assert.ok(presetHtml.includes('class="persona-filters-grid items-5"'));
    assert.equal((presetHtml.match(/class="persona-field(?:\s|")/g) || []).length, 5);

    s.compare.personaMode = 'custom';
    const customHtml = renderCompareView(s);
    assert.ok(customHtml.includes('class="persona-filters-grid items-3"'));
    assert.equal((customHtml.match(/class="persona-field(?:\s|")/g) || []).length, 3);
  }
});

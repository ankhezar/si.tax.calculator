import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SL } from '../js/i18n/sl.js';
import { EN } from '../js/i18n/en.js';
import { UA } from '../js/i18n/ua.js';
import { t } from '../js/i18n/index.js';
import { META_COMPARISON_2026 } from '../js/data/metaComparison.js';
import { createDefaultState } from '../js/state.js';
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

test('SL, EN, and UA dictionaries have 100% identical translation key sets', () => {
  const enKeys = Object.keys(EN).sort();
  const slKeys = Object.keys(SL).sort();
  const uaKeys = Object.keys(UA).sort();

  assert.deepEqual(slKeys, enKeys, 'SL keys must match EN keys');
  assert.deepEqual(uaKeys, enKeys, 'UA keys must match EN keys');
});

test('Meta-comparison dataset has all 7 dimensions and 9 country profiles in SL, EN, UA', () => {
  assert.equal(META_COMPARISON_2026.dimensions.length, 7);
  const countries = ['si', 'hr', 'it', 'at', 'hu', 'pl', 'cz', 'sk', 'es'];
  const langs = ['sl', 'en', 'ua'];

  for (const dim of META_COMPARISON_2026.dimensions) {
    for (const l of langs) assert.ok(dim.title[l], `Missing title for ${dim.id} in ${l}`);
    for (const cc of countries) {
      assert.ok(dim.cells[cc], `Missing cell ${cc} in ${dim.id}`);
      for (const l of langs) assert.ok(dim.cells[cc][l], `Missing text for ${dim.id}.${cc}.${l}`);
    }
  }

  for (const cc of countries) {
    const p = META_COMPARISON_2026.countryProfiles[cc];
    assert.ok(p, `Missing profile for ${cc}`);
    for (const l of langs) {
      assert.ok(p.bestFor[l]);
      assert.ok(p.pros[l].length >= 3);
      assert.ok(p.cons[l].length >= 3);
    }
  }
});

test('All views render cleanly across languages, regimes, and modes without untranslated keys or decorative emojis', () => {
  const emojiRegex = /(?!↗)\p{Extended_Pictographic}/u;

  for (const lang of ['sl', 'en', 'ua']) {
    const state = createDefaultState();
    state.lang = lang;
    state.revenueEur = 85000;

    for (const regView of ['zpzr', 'ziurs', 'compare']) {
      state.si.regimeView = regView;
      for (const mode of ['polni', 'pop']) {
        state.si.mode = mode;
        const html = renderSloveniaView(state);
        assert.ok(html.length > 500);
        assert.equal(emojiRegex.test(html), false, `Slovenia view (${regView}/${mode}/${lang}) must not contain emojis`);
        if (regView === 'compare') {
          assert.ok(html.includes('<svg'), 'Compare view must include SVG burden chart');
        }
      }
    }

    for (const renderFn of [
      renderCroatiaView,
      renderItalyView,
      renderAustriaView,
      renderHungaryView,
      renderPolandView,
      renderCzechiaView,
      renderSlovakiaView,
      renderSpainView
    ]) {
      const countryHtml = renderFn(state);
      assert.ok(countryHtml.length > 500);
      assert.equal(emojiRegex.test(countryHtml), false, `Country view (${lang}) must not contain emojis`);
      assert.ok(
        countryHtml.includes('country-flag-badge') &&
          countryHtml.includes('year-pill') &&
          countryHtml.includes('panel-subtitle') &&
          countryHtml.includes('authority-chip'),
        `Country view (${lang}) must render structured panel header`
      );
    }

    state.hu.regime = 'kata';
    const kataHtml = renderHungaryView(state);
    assert.ok(kataHtml.length > 500);
    assert.equal(emojiRegex.test(kataHtml), false, 'Hungary KATA view must not contain emojis');

    for (const plRegime of ['skala', 'liniowy']) {
      state.pl.regime = plRegime;
      const plHtml = renderPolandView(state);
      assert.ok(plHtml.length > 500);
      assert.equal(emojiRegex.test(plHtml), false, `Poland ${plRegime} view must not contain emojis`);
    }

    for (const czRegime of ['pausalni_dan', 'vydajovy_pausal']) {
      state.cz.regime = czRegime;
      const czHtml = renderCzechiaView(state);
      assert.ok(czHtml.length > 500);
      assert.equal(emojiRegex.test(czHtml), false, `Czechia ${czRegime} view must not contain emojis`);
    }

    const compareHtml = renderCompareView(state);
    assert.ok(compareHtml.length > 1500);
    assert.equal(emojiRegex.test(compareHtml), false, `Compare All view (${lang}) must not contain emojis`);
    assert.ok(
      compareHtml.includes('flag-si') &&
        compareHtml.includes('flag-hr') &&
        compareHtml.includes('flag-it') &&
        compareHtml.includes('flag-at') &&
        compareHtml.includes('flag-hu') &&
        compareHtml.includes('flag-pl') &&
        compareHtml.includes('flag-cz') &&
        compareHtml.includes('flag-sk') &&
        compareHtml.includes('flag-es'),
      'Compare All view must render crisp SVG country flags for all 9 countries'
    );

    for (const rf of ['neighbours', 'expansion']) {
      state.compare.regionFilter = rf;
      const filteredHtml = renderCompareView(state);
      assert.ok(filteredHtml.length > 1500);
      assert.equal(emojiRegex.test(filteredHtml), false, `Compare All (${rf}/${lang}) must not contain emojis`);
    }
  }
});

test('Every tooltip trigger and interactive badge across index.html and all views resolves cleanly in SL, EN, and UA without unresolved placeholders', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const rootDir = path.resolve(__dirname, '..');
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

  const dicts = { sl: SL, en: EN, ua: UA };
  const tagWithTipRegex = /<[^>]*data-tip-key="([^"]+)"[^>]*>/g;
  const varsAttrRegex = /data-tip-vars="([^"]*)"/;

  const decodeAttr = str =>
    str
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');

  for (const lang of ['sl', 'en', 'ua']) {
    const state = createDefaultState();
    state.lang = lang;

    const samples = [
      indexHtml,
      renderSloveniaView(state),
      renderSloveniaView({
        ...state,
        family: { children: 2, dependentSpouse: true },
        si: { ...state.si, regimeView: 'zpzr', mode: 'polni', baseMethod: 'manual' }
      }),
      renderSloveniaView({ ...state, si: { ...state.si, regimeView: 'ziurs', mode: 'pop' } }),
      renderSloveniaView({ ...state, si: { ...state.si, regimeView: 'compare', mode: 'polni', baseMethod: 'manual' } }),
      renderCroatiaView({ ...state, family: { children: 2, dependentSpouse: true } }),
      renderItalyView({
        ...state,
        family: { children: 2, dependentSpouse: true },
        it: { ...state.it, inpsScheme: 'artigiani' }
      }),
      renderAustriaView({ ...state, family: { children: 0, dependentSpouse: true } }),
      renderAustriaView({ ...state, family: { children: 2, dependentSpouse: true } }),
      renderHungaryView({ ...state, family: { children: 2, dependentSpouse: true } }),
      renderHungaryView({
        ...state,
        family: { children: 2, dependentSpouse: true },
        hu: { ...state.hu, regime: 'kata' }
      }),
      renderPolandView({ ...state, family: { children: 2, dependentSpouse: true } }),
      renderPolandView({
        ...state,
        family: { children: 2, dependentSpouse: true },
        pl: { ...state.pl, regime: 'skala', zusStage: 'ulga_y1' }
      }),
      renderPolandView({
        ...state,
        family: { children: 1, dependentSpouse: true },
        pl: { ...state.pl, regime: 'liniowy', employment: 'side' }
      }),
      renderCzechiaView({ ...state, family: { children: 2, dependentSpouse: true } }),
      renderCzechiaView({
        ...state,
        revenueEur: 50000,
        family: { children: 2, dependentSpouse: true },
        cz: { ...state.cz, regime: 'pausalni_dan', spouseYoungChild: true }
      }),
      renderCzechiaView({
        ...state,
        revenueEur: 40000,
        family: { children: 0, dependentSpouse: true },
        cz: { ...state.cz, regime: 'pausalni_dan', employment: 'side' }
      }),
      renderCzechiaView({
        ...state,
        revenueEur: 95000,
        family: { children: 2, dependentSpouse: true },
        cz: { ...state.cz, regime: 'vydajovy_pausal', spouseYoungChild: true }
      }),
      renderSlovakiaView({ ...state, family: { children: 2, dependentSpouse: true } }),
      renderSlovakiaView({
        ...state,
        revenueEur: 115000,
        family: { children: 0, dependentSpouse: true },
        sk: { ...state.sk, stage: 'new', spouseCareQualifies: false }
      }),
      renderSpainView({ ...state, family: { children: 2, dependentSpouse: true } }),
      renderSpainView({
        ...state,
        revenueEur: 650000,
        family: { children: 2, dependentSpouse: true },
        es: { ...state.es, stage: 'cuota_cero', deductibleCostPct: '20' }
      }),
      // Compare All across B2B, B2C, Side-job, Custom Persona, High-revenue Over-Cap, and all Family permutations
      renderCompareView({ ...state, family: { children: 2, dependentSpouse: true } }),
      renderCompareView({ ...state, family: { children: 2, dependentSpouse: false } }),
      renderCompareView({ ...state, family: { children: 0, dependentSpouse: true } }),
      renderCompareView({
        ...state,
        family: { children: 2, dependentSpouse: true },
        compare: { ...state.compare, personaMode: 'custom', regionFilter: 'expansion' },
        pl: { ...state.pl, regime: 'skala' },
        cz: { ...state.cz, regime: 'pausalni_dan', employment: 'side' }
      }),
      renderCompareView({
        ...state,
        revenueEur: 95000,
        family: { children: 1, dependentSpouse: true },
        compare: { ...state.compare, personaMode: 'custom', clientType: 'b2c' },
        cz: { ...state.cz, regime: 'pausalni_dan', spouseYoungChild: true }
      }),
      renderCompareView({
        ...state,
        family: { children: 0, dependentSpouse: true },
        compare: { ...state.compare, personaMode: 'custom', regionFilter: 'neighbours' },
        at: { ...state.at, spouseChildRearingWaiver: true }
      }),
      renderCompareView({
        ...state,
        revenueEur: 65000,
        family: { children: 1, dependentSpouse: true },
        compare: { ...state.compare, clientType: 'b2c' }
      }),
      renderCompareView({
        ...state,
        revenueEur: 40000,
        compare: { ...state.compare, employment: 'side', clientType: 'b2c' }
      }),
      renderCompareView({
        ...state,
        revenueEur: 165000,
        view: 'monthly',
        family: { children: 3, dependentSpouse: true },
        compare: { ...state.compare, clientType: 'b2c' }
      }),
      renderCompareView({
        ...state,
        revenueEur: 2100000,
        family: { children: 2, dependentSpouse: true },
        compare: { ...state.compare, clientType: 'b2c' }
      })
    ];

    for (const html of samples) {
      assert.equal(html.includes('class="popover"'), false, 'Legacy inline .popover nodes must not exist');
      tagWithTipRegex.lastIndex = 0;
      let m;
      while ((m = tagWithTipRegex.exec(html)) !== null) {
        const fullTag = m[0];
        const key = m[1];
        const rawTemplate = dicts[lang][key];
        assert.ok(rawTemplate && rawTemplate.length > 30, `Missing or empty tooltip text for "${key}" in ${lang}`);

        let vars = {};
        const vm = varsAttrRegex.exec(fullTag);
        if (vm) {
          vars = JSON.parse(decodeAttr(vm[1]));
        }
        const resolved = t(lang, key, vars);
        assert.equal(
          /\{[a-zA-Z0-9_]+\}/.test(resolved),
          false,
          `Unresolved placeholder in tooltip "${key}" (${lang}): ${resolved}`
        );
      }
    }
  }
});

test('index.html contains every DOM element ID referenced by js/app.js and valid asset links', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const rootDir = path.resolve(__dirname, '..');
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const appJs = fs.readFileSync(path.join(rootDir, 'js', 'app.js'), 'utf8');

  const idRegex = /getElementById\(['"]([^'"]+)['"]\)/g;
  let match;
  while ((match = idRegex.exec(appJs)) !== null) {
    const id = match[1];
    assert.ok(html.includes(`id="${id}"`), `index.html missing id="${id}" required by js/app.js`);
  }

  assert.ok(fs.existsSync(path.join(rootDir, 'css', 'styles.css')), 'css/styles.css must exist');
  assert.ok(html.includes('./css/styles.css'));
  assert.ok(html.includes('./js/app.js'));

  // Browser tab favicons, iPhone Home Screen apple-touch-icon, and PWA webmanifest
  assert.ok(html.includes('./favicon.ico'), 'index.html must link favicon.ico');
  assert.ok(html.includes('./assets/favicon.svg'), 'index.html must link assets/favicon.svg');
  assert.ok(html.includes('./assets/apple-touch-icon.png'), 'index.html must link assets/apple-touch-icon.png');
  assert.ok(html.includes('./manifest.webmanifest'), 'index.html must link manifest.webmanifest');

  const requiredAssets = [
    'favicon.ico',
    'manifest.webmanifest',
    'assets/favicon.svg',
    'assets/favicon-32.png',
    'assets/apple-touch-icon.png',
    'assets/icon-192.png',
    'assets/icon-512.png',
    'assets/icon-maskable-512.png'
  ];
  for (const rel of requiredAssets) {
    const full = path.join(rootDir, rel);
    assert.ok(fs.existsSync(full), `Missing icon/manifest asset: ${rel}`);
    assert.ok(fs.statSync(full).size > 200, `Asset ${rel} must be non-empty`);
  }

  // Verify apple-touch-icon.png is exact 180x180 24-bit opaque RGB (colorType = 2 per Apple HIG)
  const appleBuf = fs.readFileSync(path.join(rootDir, 'assets/apple-touch-icon.png'));
  assert.equal(appleBuf.readUInt32BE(16), 180, 'apple-touch-icon width must be 180px');
  assert.equal(appleBuf.readUInt32BE(20), 180, 'apple-touch-icon height must be 180px');
  assert.equal(appleBuf[25], 2, 'apple-touch-icon must be opaque 24-bit RGB without alpha channel');

  const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, 'manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.short_name, 'NettoEU');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 4);
});

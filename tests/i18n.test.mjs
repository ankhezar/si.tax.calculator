import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SL } from '../js/i18n/sl.js';
import { EN } from '../js/i18n/en.js';
import { UA } from '../js/i18n/ua.js';
import { META_COMPARISON_2026 } from '../js/data/metaComparison.js';
import { createDefaultState } from '../js/state.js';
import { renderSloveniaView } from '../js/views/sloveniaView.js';
import {
  renderCroatiaView,
  renderItalyView,
  renderAustriaView,
  renderHungaryView
} from '../js/views/countryView.js';
import { renderCompareView } from '../js/views/compareView.js';

test('SL, EN, and UA dictionaries have 100% identical translation key sets', () => {
  const enKeys = Object.keys(EN).sort();
  const slKeys = Object.keys(SL).sort();
  const uaKeys = Object.keys(UA).sort();

  assert.deepEqual(slKeys, enKeys, 'SL keys must match EN keys');
  assert.deepEqual(uaKeys, enKeys, 'UA keys must match EN keys');
});

test('Meta-comparison dataset has all 6 dimensions and 5 country profiles in SL, EN, UA', () => {
  assert.equal(META_COMPARISON_2026.dimensions.length, 6);
  const countries = ['si', 'hr', 'it', 'at', 'hu'];
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

    for (const renderFn of [renderCroatiaView, renderItalyView, renderAustriaView, renderHungaryView]) {
      const countryHtml = renderFn(state);
      assert.ok(countryHtml.length > 500);
      assert.equal(emojiRegex.test(countryHtml), false, `Country view (${lang}) must not contain emojis`);
    }

    state.hu.regime = 'kata';
    const kataHtml = renderHungaryView(state);
    assert.ok(kataHtml.length > 500);
    assert.equal(emojiRegex.test(kataHtml), false, 'Hungary KATA view must not contain emojis');

    const compareHtml = renderCompareView(state);
    assert.ok(compareHtml.length > 1500);
    assert.equal(emojiRegex.test(compareHtml), false, `Compare All view (${lang}) must not contain emojis`);
    assert.ok(
      compareHtml.includes('flag-si') &&
        compareHtml.includes('flag-hr') &&
        compareHtml.includes('flag-it') &&
        compareHtml.includes('flag-at') &&
        compareHtml.includes('flag-hu'),
      'Compare All view must render crisp SVG country flags'
    );
  }
});

test('Every info-trigger tooltip key across index.html and all views resolves cleanly in SL, EN, and UA', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const rootDir = path.resolve(__dirname, '..');
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

  const dicts = { sl: SL, en: EN, ua: UA };
  const tipKeyRegex = /data-tip-key="([^"]+)"/g;

  for (const lang of ['sl', 'en', 'ua']) {
    const state = createDefaultState();
    state.lang = lang;

    const samples = [
      indexHtml,
      renderSloveniaView(state),
      renderSloveniaView({ ...state, si: { ...state.si, regimeView: 'ziurs', mode: 'pop' } }),
      renderSloveniaView({ ...state, si: { ...state.si, regimeView: 'compare', mode: 'polni' } }),
      renderCroatiaView(state),
      renderItalyView(state),
      renderAustriaView(state),
      renderHungaryView(state),
      renderHungaryView({ ...state, hu: { ...state.hu, regime: 'kata' } }),
      renderCompareView(state)
    ];

    for (const html of samples) {
      assert.equal(html.includes('class="popover"'), false, 'Legacy inline .popover nodes must not exist');
      let m;
      while ((m = tipKeyRegex.exec(html)) !== null) {
        const key = m[1];
        const val = dicts[lang][key];
        assert.ok(val && val.length > 30, `Missing or empty tooltip text for "${key}" in ${lang}`);
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
  assert.equal(manifest.short_name, 'Normiranec');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 4);
});

/**
 * Zero-dependency 1200x630 Open Graph Social Preview Card Generator (assets/og-card.png)
 * Renders NettoEU's obsidian-and-emerald fintech aesthetic, custom N monogram,
 * 9 EU country flags (SI, HR, IT, AT, HU, PL, CZ, SK, ES), and net-allocation preview card
 * directly to a 24-bit opaque RGB PNG using Node's built-in node:zlib.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;
const buf = new Uint8Array(W * H * 3);

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function smoothstep(e0, e1, x) {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

function blendPixel(x, y, r, g, b, a) {
  if (x < 0 || x >= W || y < 0 || y >= H || a <= 0) return;
  const idx = (y * W + x) * 3;
  if (a >= 1) {
    buf[idx] = r;
    buf[idx + 1] = g;
    buf[idx + 2] = b;
    return;
  }
  const inv = 1 - a;
  buf[idx] = Math.round(buf[idx] * inv + r * a);
  buf[idx + 1] = Math.round(buf[idx + 1] * inv + g * a);
  buf[idx + 2] = Math.round(buf[idx + 2] * inv + b * a);
}

function sdRoundRect(px, py, x, y, w, h, rx) {
  const cx = x + w * 0.5;
  const cy = y + h * 0.5;
  const hx = w * 0.5 - rx;
  const hy = h * 0.5 - rx;
  const dx = Math.abs(px - cx) - hx;
  const dy = Math.abs(py - cy) - hy;
  const out = Math.hypot(Math.max(dx, 0), Math.max(dy, 0));
  const inside = Math.min(Math.max(dx, dy), 0);
  return out + inside - rx;
}

function fillRoundRect(x, y, w, h, rx, colorFn, alpha = 1) {
  const x0 = Math.max(0, Math.floor(x - 2));
  const x1 = Math.min(W - 1, Math.ceil(x + w + 2));
  const y0 = Math.max(0, Math.floor(y - 2));
  const y1 = Math.min(H - 1, Math.ceil(y + h + 2));
  const isFn = typeof colorFn === 'function';
  for (let py = y0; py <= y1; py++) {
    for (let px = x0; px <= x1; px++) {
      const d = sdRoundRect(px + 0.5, py + 0.5, x, y, w, h, rx);
      const cov = smoothstep(0.65, -0.65, d) * alpha;
      if (cov > 0.002) {
        const c = isFn ? colorFn(px, py) : colorFn;
        blendPixel(px, py, c[0], c[1], c[2], cov * (c[3] ?? 1));
      }
    }
  }
}

function strokeRoundRect(x, y, w, h, rx, thickness, rgb, alpha = 1) {
  const halfT = thickness * 0.5;
  const x0 = Math.max(0, Math.floor(x - halfT - 2));
  const x1 = Math.min(W - 1, Math.ceil(x + w + halfT + 2));
  const y0 = Math.max(0, Math.floor(y - halfT - 2));
  const y1 = Math.min(H - 1, Math.ceil(y + h + halfT + 2));
  for (let py = y0; py <= y1; py++) {
    for (let px = x0; px <= x1; px++) {
      const d = Math.abs(sdRoundRect(px + 0.5, py + 0.5, x, y, w, h, rx)) - halfT;
      const cov = smoothstep(0.65, -0.65, d) * alpha;
      if (cov > 0.002) blendPixel(px, py, rgb[0], rgb[1], rgb[2], cov);
    }
  }
}

function sdSegment(px, py, ax, ay, bx, by) {
  const vx = bx - ax;
  const vy = by - ay;
  const wx = px - ax;
  const wy = py - ay;
  const len2 = vx * vx + vy * vy;
  const t = len2 > 1e-6 ? clamp01((wx * vx + wy * vy) / len2) : 0;
  return Math.hypot(px - (ax + t * vx), py - (ay + t * vy));
}

function drawCapsule(ax, ay, bx, by, radius, colorFn, alpha = 1) {
  const pad = radius + 2;
  const x0 = Math.max(0, Math.floor(Math.min(ax, bx) - pad));
  const x1 = Math.min(W - 1, Math.ceil(Math.max(ax, bx) + pad));
  const y0 = Math.max(0, Math.floor(Math.min(ay, by) - pad));
  const y1 = Math.min(H - 1, Math.ceil(Math.max(ay, by) + pad));
  const isFn = typeof colorFn === 'function';
  for (let py = y0; py <= y1; py++) {
    for (let px = x0; px <= x1; px++) {
      const d = sdSegment(px + 0.5, py + 0.5, ax, ay, bx, by) - radius;
      const cov = smoothstep(0.65, -0.65, d) * alpha;
      if (cov > 0.002) {
        const c = isFn ? colorFn(px, py) : colorFn;
        blendPixel(px, py, c[0], c[1], c[2], cov);
      }
    }
  }
}

// Clean geometric vector stroke font (normalized [0..1] x [0..1] glyph box)
const GLYPHS = {
  A: { w: 0.72, s: [[0.04, 1, 0.36, 0], [0.68, 1, 0.36, 0], [0.15, 0.65, 0.57, 0.65]] },
  B: { w: 0.66, s: [[0.06, 0, 0.06, 1], [0.06, 0, 0.44, 0], [0.44, 0, 0.58, 0.14], [0.58, 0.14, 0.58, 0.34], [0.58, 0.34, 0.44, 0.48], [0.06, 0.48, 0.46, 0.48], [0.46, 0.48, 0.62, 0.62], [0.62, 0.62, 0.62, 0.86], [0.62, 0.86, 0.46, 1], [0.06, 1, 0.46, 1]] },
  C: { w: 0.66, s: [[0.60, 0.16, 0.46, 0], [0.46, 0, 0.20, 0], [0.20, 0, 0.06, 0.18], [0.06, 0.18, 0.06, 0.82], [0.06, 0.82, 0.20, 1], [0.20, 1, 0.46, 1], [0.46, 1, 0.60, 0.84]] },
  D: { w: 0.68, s: [[0.06, 0, 0.06, 1], [0.06, 0, 0.40, 0], [0.40, 0, 0.60, 0.20], [0.60, 0.20, 0.60, 0.80], [0.60, 0.80, 0.40, 1], [0.40, 1, 0.06, 1]] },
  E: { w: 0.58, s: [[0.06, 0, 0.06, 1], [0.06, 0, 0.54, 0], [0.06, 0.49, 0.46, 0.49], [0.06, 1, 0.54, 1]] },
  F: { w: 0.56, s: [[0.06, 0, 0.06, 1], [0.06, 0, 0.52, 0], [0.06, 0.48, 0.44, 0.48]] },
  G: { w: 0.70, s: [[0.62, 0.16, 0.48, 0], [0.48, 0, 0.20, 0], [0.20, 0, 0.06, 0.18], [0.06, 0.18, 0.06, 0.82], [0.06, 0.82, 0.20, 1], [0.20, 1, 0.50, 1], [0.50, 1, 0.62, 0.84], [0.62, 0.84, 0.62, 0.54], [0.62, 0.54, 0.38, 0.54]] },
  H: { w: 0.68, s: [[0.06, 0, 0.06, 1], [0.62, 0, 0.62, 1], [0.06, 0.49, 0.62, 0.49]] },
  I: { w: 0.28, s: [[0.14, 0, 0.14, 1]] },
  J: { w: 0.54, s: [[0.46, 0, 0.46, 0.80], [0.46, 0.80, 0.32, 1], [0.32, 1, 0.16, 1], [0.16, 1, 0.06, 0.84]] },
  K: { w: 0.66, s: [[0.06, 0, 0.06, 1], [0.58, 0, 0.08, 0.54], [0.24, 0.38, 0.60, 1]] },
  L: { w: 0.54, s: [[0.06, 0, 0.06, 1], [0.06, 1, 0.50, 1]] },
  M: { w: 0.84, s: [[0.06, 1, 0.06, 0], [0.06, 0, 0.42, 0.66], [0.42, 0.66, 0.78, 0], [0.78, 0, 0.78, 1]] },
  N: { w: 0.70, s: [[0.06, 1, 0.06, 0], [0.06, 0, 0.64, 1], [0.64, 1, 0.64, 0]] },
  O: { w: 0.70, s: [[0.20, 0, 0.50, 0], [0.50, 0, 0.64, 0.18], [0.64, 0.18, 0.64, 0.82], [0.64, 0.82, 0.50, 1], [0.50, 1, 0.20, 1], [0.20, 1, 0.06, 0.82], [0.06, 0.82, 0.06, 0.18], [0.06, 0.18, 0.20, 0]] },
  P: { w: 0.64, s: [[0.06, 0, 0.06, 1], [0.06, 0, 0.44, 0], [0.44, 0, 0.58, 0.15], [0.58, 0.15, 0.58, 0.40], [0.58, 0.40, 0.44, 0.54], [0.44, 0.54, 0.06, 0.54]] },
  R: { w: 0.66, s: [[0.06, 0, 0.06, 1], [0.06, 0, 0.44, 0], [0.44, 0, 0.58, 0.14], [0.58, 0.14, 0.58, 0.38], [0.58, 0.38, 0.44, 0.52], [0.44, 0.52, 0.06, 0.52], [0.34, 0.52, 0.60, 1]] },
  S: { w: 0.62, s: [[0.56, 0.14, 0.44, 0], [0.44, 0, 0.18, 0], [0.18, 0, 0.06, 0.14], [0.06, 0.14, 0.06, 0.34], [0.06, 0.34, 0.18, 0.46], [0.18, 0.46, 0.44, 0.54], [0.44, 0.54, 0.56, 0.66], [0.56, 0.66, 0.56, 0.86], [0.56, 0.86, 0.44, 1], [0.44, 1, 0.18, 1], [0.18, 1, 0.06, 0.86]] },
  T: { w: 0.62, s: [[0.02, 0, 0.60, 0], [0.31, 0, 0.31, 1]] },
  U: { w: 0.68, s: [[0.06, 0, 0.06, 0.80], [0.06, 0.80, 0.20, 1], [0.20, 1, 0.48, 1], [0.48, 1, 0.62, 0.80], [0.62, 0.80, 0.62, 0]] },
  V: { w: 0.68, s: [[0.04, 0, 0.34, 1], [0.64, 0, 0.34, 1]] },
  W: { w: 0.90, s: [[0.04, 0, 0.22, 1], [0.22, 1, 0.45, 0.30], [0.45, 0.30, 0.68, 1], [0.68, 1, 0.86, 0]] },
  X: { w: 0.66, s: [[0.06, 0, 0.60, 1], [0.60, 0, 0.06, 1]] },
  Y: { w: 0.66, s: [[0.04, 0, 0.33, 0.52], [0.62, 0, 0.33, 0.52], [0.33, 0.52, 0.33, 1]] },
  Z: { w: 0.62, s: [[0.06, 0, 0.56, 0], [0.56, 0, 0.06, 1], [0.06, 1, 0.56, 1]] },
  '0': { w: 0.64, s: [[0.20, 0, 0.44, 0], [0.44, 0, 0.58, 0.18], [0.58, 0.18, 0.58, 0.82], [0.58, 0.82, 0.44, 1], [0.44, 1, 0.20, 1], [0.20, 1, 0.06, 0.82], [0.06, 0.82, 0.06, 0.18], [0.06, 0.18, 0.20, 0]] },
  '1': { w: 0.44, s: [[0.10, 0.18, 0.26, 0], [0.26, 0, 0.26, 1], [0.10, 1, 0.40, 1]] },
  '2': { w: 0.62, s: [[0.08, 0.18, 0.20, 0], [0.20, 0, 0.44, 0], [0.44, 0, 0.56, 0.16], [0.56, 0.16, 0.56, 0.36], [0.56, 0.36, 0.06, 1], [0.06, 1, 0.58, 1]] },
  '3': { w: 0.62, s: [[0.08, 0.14, 0.20, 0], [0.20, 0, 0.44, 0], [0.44, 0, 0.56, 0.14], [0.56, 0.14, 0.56, 0.34], [0.56, 0.34, 0.42, 0.48], [0.24, 0.48, 0.42, 0.48], [0.42, 0.48, 0.58, 0.64], [0.58, 0.64, 0.58, 0.86], [0.58, 0.86, 0.44, 1], [0.44, 1, 0.18, 1], [0.18, 1, 0.06, 0.86]] },
  '4': { w: 0.64, s: [[0.46, 0, 0.06, 0.68], [0.06, 0.68, 0.60, 0.68], [0.46, 0, 0.46, 1]] },
  '5': { w: 0.62, s: [[0.54, 0, 0.10, 0], [0.10, 0, 0.08, 0.44], [0.08, 0.44, 0.42, 0.44], [0.42, 0.44, 0.56, 0.58], [0.56, 0.58, 0.56, 0.84], [0.56, 0.84, 0.42, 1], [0.42, 1, 0.18, 1], [0.18, 1, 0.06, 0.86]] },
  '6': { w: 0.62, s: [[0.52, 0.12, 0.40, 0], [0.40, 0, 0.20, 0], [0.20, 0, 0.06, 0.20], [0.06, 0.20, 0.06, 0.82], [0.06, 0.82, 0.20, 1], [0.20, 1, 0.44, 1], [0.44, 1, 0.56, 0.84], [0.56, 0.84, 0.56, 0.62], [0.56, 0.62, 0.44, 0.48], [0.44, 0.48, 0.08, 0.48]] },
  '7': { w: 0.60, s: [[0.06, 0, 0.56, 0], [0.56, 0, 0.22, 1]] },
  '8': { w: 0.64, s: [[0.20, 0, 0.44, 0], [0.44, 0, 0.56, 0.14], [0.56, 0.14, 0.56, 0.34], [0.56, 0.34, 0.44, 0.48], [0.44, 0.48, 0.20, 0.48], [0.20, 0.48, 0.08, 0.34], [0.08, 0.34, 0.08, 0.14], [0.08, 0.14, 0.20, 0], [0.20, 0.48, 0.06, 0.64], [0.06, 0.64, 0.06, 0.86], [0.06, 0.86, 0.20, 1], [0.20, 1, 0.44, 1], [0.44, 1, 0.58, 0.86], [0.58, 0.86, 0.58, 0.64], [0.58, 0.64, 0.44, 0.48]] },
  '9': { w: 0.62, s: [[0.54, 0.52, 0.20, 0.52], [0.20, 0.52, 0.06, 0.38], [0.06, 0.38, 0.06, 0.16], [0.06, 0.16, 0.20, 0], [0.20, 0, 0.44, 0], [0.44, 0, 0.56, 0.18], [0.56, 0.18, 0.56, 0.80], [0.56, 0.80, 0.42, 1], [0.42, 1, 0.18, 1]] },
  '.': { w: 0.24, s: [[0.12, 0.94, 0.12, 1]] },
  ',': { w: 0.26, s: [[0.15, 0.88, 0.09, 1.08]] },
  '-': { w: 0.46, s: [[0.06, 0.50, 0.40, 0.50]] },
  '+': { w: 0.56, s: [[0.08, 0.50, 0.48, 0.50], [0.28, 0.26, 0.28, 0.74]] },
  '/': { w: 0.46, s: [[0.40, 0, 0.06, 1]] },
  '%': { w: 0.78, s: [[0.64, 0.04, 0.14, 0.96], [0.14, 0.08, 0.24, 0.08], [0.24, 0.08, 0.24, 0.28], [0.24, 0.28, 0.14, 0.28], [0.14, 0.28, 0.14, 0.08], [0.54, 0.72, 0.64, 0.72], [0.64, 0.72, 0.64, 0.92], [0.64, 0.92, 0.54, 0.92], [0.54, 0.92, 0.54, 0.72]] },
  '·': { w: 0.30, s: [[0.15, 0.48, 0.15, 0.52]] },
  ' ': { w: 0.36, s: [] }
};

function drawText(text, x, y, capHeight, weight, rgb, tracking = 0.14, alpha = 1) {
  let curX = x;
  const radius = weight * 0.5;
  const up = text.toUpperCase();
  for (let i = 0; i < up.length; i++) {
    const ch = up[i];
    const g = GLYPHS[ch] || GLYPHS[' '];
    for (const seg of g.s) {
      drawCapsule(
        curX + seg[0] * capHeight,
        y + seg[1] * capHeight,
        curX + seg[2] * capHeight,
        y + seg[3] * capHeight,
        radius,
        rgb,
        alpha
      );
    }
    curX += (g.w + tracking) * capHeight;
  }
  return curX - x;
}

// 1. Background Obsidian Canvas + Ambient Emerald & Indigo Glows + Subtle Grid
for (let py = 0; py < H; py++) {
  const ty = py / H;
  for (let px = 0; px < W; px++) {
    const tx = px / W;
    let r = 13 - ty * 5 - tx * 2;
    let g = 17 - ty * 6 - tx * 1;
    let b = 26 - ty * 8;

    // Top-right emerald glow
    const dEm = Math.hypot((px - 930) / 520, (py - 110) / 380);
    if (dEm < 1) {
      const w = (1 - dEm) * (1 - dEm) * 0.16;
      r += 16 * w;
      g += 185 * w;
      b += 129 * w;
    }

    // Left subtle indigo glow
    const dIn = Math.hypot((px - 190) / 460, (py - 140) / 360);
    if (dIn < 1) {
      const w = (1 - dIn) * (1 - dIn) * 0.10;
      r += 79 * w;
      g += 110 * w;
      b += 245 * w;
    }

    // Subtle architectural 60px hairline grid
    if (px % 60 === 0 || py % 60 === 0) {
      r += 3.2;
      g += 3.8;
      b += 5.0;
    }

    const idx = (py * W + px) * 3;
    buf[idx] = Math.min(255, Math.max(0, Math.round(r)));
    buf[idx + 1] = Math.min(255, Math.max(0, Math.round(g)));
    buf[idx + 2] = Math.min(255, Math.max(0, Math.round(b)));
  }
}

// Top emerald accent bar
fillRoundRect(76, 58, 56, 5, 2.5, [16, 185, 129]);

// 2. Custom NettoEU Monogram Tile (86x86 at x=76, y=92)
const ix = 76;
const iy = 92;
const isz = 86;
fillRoundRect(ix, iy, isz, isz, 20, (px, py) => {
  const t = (py - iy) / isz;
  return [Math.round(26 - t * 14), Math.round(35 - t * 19), Math.round(52 - t * 28)];
});
strokeRoundRect(ix, iy, isz, isz, 20, 1.4, [255, 255, 255], 0.18);

// Left titanium pillar of N
fillRoundRect(ix + 21, iy + 21, 11.5, 44, 3, (px, py) => {
  const t = (py - (iy + 21)) / 44;
  return [Math.round(135 + t * 85), Math.round(150 + t * 80), Math.round(172 + t * 68)];
});
// Right emerald net pillar of N
fillRoundRect(ix + 53.5, iy + 21, 11.5, 44, 3, (px, py) => {
  const t = (py - (iy + 21)) / 44;
  return [Math.round(105 - t * 90), Math.round(230 - t * 115), Math.round(180 - t * 90)];
});
// Folded white diagonal ribbon of N
drawCapsule(ix + 26.7, iy + 25.5, ix + 59.2, iy + 60.5, 5.7, [248, 250, 252]);

// 3. Brand Wordmark + 2026 Badge
const titleEnd = drawText('NETTOEU', 184, 110, 44, 6.4, [243, 245, 248], 0.13);
const pillX = 184 + titleEnd + 14;
fillRoundRect(pillX, 115, 86, 34, 17, [16, 185, 129], 0.15);
strokeRoundRect(pillX, 115, 86, 34, 17, 1.3, [52, 211, 153], 0.45);
drawText('2026', pillX + 17, 124, 16, 2.5, [52, 211, 153], 0.14);

// 4. Headline & Subtitle Copy (Left Column)
drawText('EUROPEAN FREELANCE', 76, 222, 30, 4.2, [243, 245, 248], 0.12);
drawText('SOLE-PROPRIETOR', 76, 270, 30, 4.2, [243, 245, 248], 0.12);
drawText('TAX CALCULATOR', 76, 318, 30, 4.2, [52, 211, 153], 0.12);

drawText('INSTANT NET TAKE-HOME  ·  TAX  ·  SOCIAL  ·  FAMILY', 76, 382, 13.5, 2.0, [154, 163, 178], 0.15);

// 5. 9 Geometric EU Country Flag Badges (SI, HR, IT, AT, HU, PL, CZ, SK, ES)
function drawFlagBadge(code, fx, fy) {
  const fw = 46;
  const fh = 32;
  const rx = 5;

  fillRoundRect(fx, fy, fw, fh, rx, (px, py) => {
    const u = (px - fx) / fw;
    const v = (py - fy) / fh;

    if (code === 'SI') {
      if (v < 0.333) return [248, 250, 252];
      if (v < 0.666) return [0, 93, 170];
      return [218, 41, 28];
    }
    if (code === 'HR') {
      if (v < 0.333) return [225, 29, 56];
      if (v < 0.666) return [248, 250, 252];
      return [23, 70, 158];
    }
    if (code === 'IT') {
      if (u < 0.333) return [0, 146, 70];
      if (u < 0.666) return [248, 250, 252];
      return [206, 43, 55];
    }
    if (code === 'AT') {
      if (v < 0.333 || v >= 0.666) return [225, 37, 49];
      return [248, 250, 252];
    }
    if (code === 'HU') {
      if (v < 0.333) return [205, 42, 62];
      if (v < 0.666) return [248, 250, 252];
      return [67, 111, 77];
    }
    if (code === 'PL') {
      return v < 0.5 ? [248, 250, 252] : [220, 20, 60];
    }
    if (code === 'CZ') {
      if (u < 0.48 && 0.5 - Math.abs(v - 0.5) > u * 1.04) return [17, 69, 126];
      return v < 0.5 ? [248, 250, 252] : [215, 20, 26];
    }
    if (code === 'SK') {
      if (v < 0.333) return [248, 250, 252];
      if (v < 0.666) return [11, 78, 162];
      return [238, 28, 37];
    }
    // ES
    if (v < 0.25 || v >= 0.75) return [198, 11, 30];
    return [255, 196, 0];
  });

  // Coat-of-arms mini accent for SI / SK / HR
  if (code === 'SI') fillRoundRect(fx + 8, fy + 6, 7, 8, 2, [0, 93, 170]);
  if (code === 'SK') fillRoundRect(fx + 9, fy + 8, 8, 11, 2.5, [238, 28, 37]);
  if (code === 'HR') fillRoundRect(fx + 19, fy + 10, 8, 9, 2, [225, 29, 56]);

  strokeRoundRect(fx, fy, fw, fh, rx, 1.1, [255, 255, 255], 0.22);
  drawText(code, fx + 12, fy + fh + 10, 12, 1.9, [154, 163, 178], 0.16);
}

const FLAGS = ['SI', 'HR', 'IT', 'AT', 'HU', 'PL', 'CZ', 'SK', 'ES'];
FLAGS.forEach((code, idx) => {
  drawFlagBadge(code, 76 + idx * 59, 442);
});

// 6. Right-Side Floating Fintech Allocation Card (x=664..1128, y=78..552)
const cx = 664;
const cy = 78;
const cw = 464;
const ch = 474;

fillRoundRect(cx, cy + 10, cw, ch, 24, [0, 0, 0], 0.38);
fillRoundRect(cx, cy, cw, ch, 24, (px, py) => {
  const t = (py - cy) / ch;
  return [Math.round(22 - t * 5), Math.round(27 - t * 6), Math.round(38 - t * 8)];
});
strokeRoundRect(cx, cy, cw, ch, 24, 1.3, [255, 255, 255], 0.12);

// Card top label & kept pill
drawText('NET TAKE-HOME  ·  65,000 EUR', cx + 30, cy + 32, 12, 1.8, [132, 143, 162], 0.15);

fillRoundRect(cx + cw - 134, cy + 25, 104, 28, 14, [16, 185, 129], 0.15);
strokeRoundRect(cx + cw - 134, cy + 25, 104, 28, 14, 1.1, [52, 211, 153], 0.38);
drawText('84.5% NET', cx + cw - 118, cy + 33, 11.5, 1.8, [52, 211, 153], 0.13);

// Hero Net Value
drawText('54,945 EUR', cx + 30, cy + 68, 38, 5.4, [243, 245, 248], 0.11);

// 3-Segment Revenue Allocation Bar (Emerald Net + Indigo Social + Rose Tax)
const barX = cx + 30;
const barY = cy + 128;
const barW = cw - 60;
fillRoundRect(barX, barY, barW * 0.815, 12, 6, [16, 185, 129]);
fillRoundRect(barX + barW * 0.827, barY, barW * 0.105, 12, 6, [99, 102, 241]);
fillRoundRect(barX + barW * 0.944, barY, barW * 0.056, 12, 6, [244, 63, 94]);

// Legend dots
fillRoundRect(barX, barY + 25, 8, 8, 4, [16, 185, 129]);
drawText('NET', barX + 14, barY + 24, 11, 1.7, [180, 188, 202], 0.14);

fillRoundRect(barX + 86, barY + 25, 8, 8, 4, [99, 102, 241]);
drawText('SOCIAL', barX + 100, barY + 24, 11, 1.7, [180, 188, 202], 0.14);

fillRoundRect(barX + 198, barY + 25, 8, 8, 4, [244, 63, 94]);
drawText('TAX', barX + 212, barY + 24, 11, 1.7, [180, 188, 202], 0.14);

// Hairline divider
fillRoundRect(cx + 30, cy + 184, cw - 60, 1, 0.5, [255, 255, 255], 0.08);
drawText('9-COUNTRY ARENA SNAPSHOT', cx + 30, cy + 204, 11.5, 1.7, [132, 143, 162], 0.15);

// 5 Representative Leaderboard Rows inside Preview Card
const ROWS = [
  { code: 'CZ', label: 'PAUSALNI', pct: 0.879, txt: '87.9%', col: [16, 185, 129] },
  { code: 'PL', label: 'RYCZALT', pct: 0.818, txt: '81.8%', col: [16, 185, 129] },
  { code: 'SI', label: 'NORMIRANEC', pct: 0.805, txt: '80.5%', col: [52, 211, 153] },
  { code: 'IT', label: 'FORFETTARIO', pct: 0.774, txt: '77.4%', col: [99, 102, 241] },
  { code: 'ES', label: 'AUTONOMO', pct: 0.728, txt: '72.8%', col: [99, 102, 241] }
];

ROWS.forEach((row, i) => {
  const ry = cy + 236 + i * 44;
  fillRoundRect(cx + 30, ry, cw - 60, 34, 9, [255, 255, 255], 0.035);
  drawText(row.code, cx + 44, ry + 11, 12.5, 2.0, [243, 245, 248], 0.14);
  drawText(row.label, cx + 82, ry + 12, 10.5, 1.6, [154, 163, 178], 0.14);

  const trackX = cx + 216;
  const trackW = 148;
  fillRoundRect(trackX, ry + 13, trackW, 8, 4, [255, 255, 255], 0.07);
  fillRoundRect(trackX, ry + 13, trackW * row.pct, 8, 4, row.col);

  drawText(row.txt, cx + cw - 88, ry + 11, 12, 1.9, [243, 245, 248], 0.12);
});

// PNG Encoder (24-bit opaque RGB, colorType = 2)
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c >>> 0;
}

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    c = crcTable[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([lenBuf, crcInput, crcBuf]);
}

function encodeRgbPng(width, height, rgbBuf) {
  const stride = width * 3;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 1; // Sub filter for compact PNG compression
    const srcOffset = y * stride;
    for (let x = 0; x < stride; x++) {
      const cur = rgbBuf[srcOffset + x];
      const left = x >= 3 ? rgbBuf[srcOffset + x - 3] : 0;
      raw[rowStart + 1 + x] = (cur - left) & 0xff;
    }
  }
  const compressed = zlib.deflateSync(raw, { level: 9 });

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 2; // RGB colorType
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0))
  ]);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, '..', 'assets', 'og-card.png');
const pngBytes = encodeRgbPng(W, H, buf);
fs.writeFileSync(outPath, pngBytes);
console.log(`Generated ${outPath} (${W}x${H}, ${(pngBytes.length / 1024).toFixed(1)} KB)`);

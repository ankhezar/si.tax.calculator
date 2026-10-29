/**
 * Modern Viewport-Aware Floating Tooltip Engine
 * - Single body-level portal (zero nested popover clipping or flexbox overflow bugs)
 * - Centers on trigger (?) button, clamps horizontally within viewport, auto-flips top/bottom
 * - Pixel-accurate directional arrow (--arrow-x) tracking the exact trigger center
 * - Supports hover (with warm handoff & interactive hover-bridge), keyboard focus, click-to-pin, and Escape
 */

const VIEWPORT_MARGIN = 12;
const TRIGGER_GAP = 10;
const OPEN_DELAY_MS = 75;
const CLOSE_GRACE_MS = 130;
const TRIGGER_SELECTOR = '[data-tip-key]';

let portalEl = null;
let contentEl = null;
let activeTrigger = null;
let activeKey = null;
let activeId = null;
let isPinned = false;
let openTimer = null;
let closeTimer = null;
let resolveTooltipHtml = null;

export function tipAttrs(key, vars = null, tipId = '') {
  const idPart = tipId ? ` data-tip-id="${tipId}"` : '';
  if (!vars) return `data-tip-key="${key}"${idPart}`;
  const encoded = JSON.stringify(vars)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `data-tip-key="${key}" data-tip-vars="${encoded}"${idPart}`;
}

function ensurePortal() {
  if (portalEl) return portalEl;
  portalEl = document.createElement('div');
  portalEl.id = 'floating-tooltip';
  portalEl.className = 'floating-tooltip';
  portalEl.setAttribute('role', 'tooltip');
  portalEl.setAttribute('aria-hidden', 'true');
  portalEl.innerHTML = `
    <div class="floating-tooltip-content"></div>
    <div class="floating-tooltip-arrow" aria-hidden="true"></div>
  `;
  document.body.appendChild(portalEl);
  contentEl = portalEl.querySelector('.floating-tooltip-content');

  // Allow user to move pointer onto tooltip to read or copy statutory references
  portalEl.addEventListener('pointerenter', e => {
    if (e.pointerType === 'mouse') clearTimeout(closeTimer);
  });
  portalEl.addEventListener('pointerleave', e => {
    if (e.pointerType === 'mouse' && !isPinned) scheduleClose();
  });

  return portalEl;
}

export function positionActiveTooltip() {
  if (!portalEl || !activeTrigger) return;

  // If DOM re-rendered while tooltip was open, try re-binding to the replacement trigger
  if (!activeTrigger.isConnected) {
    let replacement = null;
    if (activeId) {
      replacement = document.querySelector(`${TRIGGER_SELECTOR}[data-tip-id="${activeId}"]`);
    }
    if (!replacement && activeKey) {
      replacement = document.querySelector(`${TRIGGER_SELECTOR}[data-tip-key="${activeKey}"]`);
    }
    if (replacement) {
      activeTrigger = replacement;
      activeTrigger.classList.add('is-open');
      activeTrigger.setAttribute('aria-describedby', 'floating-tooltip');
    } else {
      hideTooltip();
      return;
    }
  }

  const html = resolveTooltipHtml ? resolveTooltipHtml(activeTrigger) : '';
  if (!html) {
    hideTooltip();
    return;
  }
  if (contentEl.innerHTML !== html) {
    contentEl.innerHTML = html;
  }

  const tRect = activeTrigger.getBoundingClientRect();
  if (tRect.width === 0 && tRect.height === 0) {
    hideTooltip();
    return;
  }

  // Reset to (0, 0) before measuring so a previous right-edge `left` coordinate never
  // triggers CSS fixed-box shrink-wrapping, and read offsetWidth/offsetHeight so entry
  // scale() transitions never skew layout geometry.
  portalEl.style.left = '0px';
  portalEl.style.top = '0px';

  const tipW = portalEl.offsetWidth;
  const tipH = portalEl.offsetHeight;
  const vw = document.documentElement.clientWidth || window.innerWidth;
  const vh = document.documentElement.clientHeight || window.innerHeight;

  // Prefer placing above trigger; flip below if insufficient room near top of viewport
  const roomAbove = tRect.top - VIEWPORT_MARGIN;
  const roomBelow = vh - tRect.bottom - VIEWPORT_MARGIN;
  const needH = tipH + TRIGGER_GAP;

  let placement = 'top';
  let top = tRect.top - tipH - TRIGGER_GAP;
  if (roomAbove < needH && roomBelow > roomAbove) {
    placement = 'bottom';
    top = tRect.bottom + TRIGGER_GAP;
  }

  // Center horizontally over trigger, clamped cleanly inside viewport margins
  const triggerCenterX = tRect.left + tRect.width / 2;
  const idealLeft = triggerCenterX - tipW / 2;
  const maxLeft = Math.max(VIEWPORT_MARGIN, vw - tipW - VIEWPORT_MARGIN);
  const left = Math.min(maxLeft, Math.max(VIEWPORT_MARGIN, idealLeft));

  // Pin arrow tip directly to trigger center (clamped away from rounded card corners)
  const arrowX = Math.min(tipW - 14, Math.max(14, triggerCenterX - left));

  portalEl.dataset.placement = placement;
  portalEl.style.left = `${Math.round(left)}px`;
  portalEl.style.top = `${Math.round(top)}px`;
  portalEl.style.setProperty('--arrow-x', `${Math.round(arrowX)}px`);
}

function showTooltip(trigger, pin = false) {
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
  ensurePortal();

  const html = resolveTooltipHtml ? resolveTooltipHtml(trigger) : '';
  if (!html) return;

  if (activeTrigger && activeTrigger !== trigger) {
    activeTrigger.classList.remove('is-open');
    activeTrigger.removeAttribute('aria-describedby');
  }

  activeTrigger = trigger;
  activeKey = trigger.getAttribute('data-tip-key') || null;
  activeId = trigger.getAttribute('data-tip-id') || null;
  isPinned = pin;

  activeTrigger.classList.add('is-open');
  activeTrigger.setAttribute('aria-describedby', 'floating-tooltip');

  contentEl.innerHTML = html;
  portalEl.classList.add('visible');
  portalEl.setAttribute('aria-hidden', 'false');

  positionActiveTooltip();
}

export function hideTooltip() {
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
  isPinned = false;

  if (activeTrigger) {
    activeTrigger.classList.remove('is-open');
    activeTrigger.removeAttribute('aria-describedby');
    activeTrigger = null;
    activeKey = null;
    activeId = null;
  }
  if (portalEl) {
    portalEl.classList.remove('visible');
    portalEl.setAttribute('aria-hidden', 'true');
  }
}

function scheduleClose() {
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    if (!isPinned) hideTooltip();
  }, CLOSE_GRACE_MS);
}

export function refreshActiveTooltip() {
  if (activeTrigger && portalEl && portalEl.classList.contains('visible')) {
    positionActiveTooltip();
  }
}

export function initFloatingTooltips(resolverFn) {
  resolveTooltipHtml = resolverFn;
  ensurePortal();

  // Pointer hover (mouse only — touch uses click/tap)
  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const trigger = e.target.closest(TRIGGER_SELECTOR);
    if (!trigger) return;

    clearTimeout(closeTimer);
    if (activeTrigger === trigger && portalEl.classList.contains('visible')) return;

    // Warm handoff: instant switch if another tooltip is already visible
    const delay = portalEl.classList.contains('visible') ? 0 : OPEN_DELAY_MS;
    clearTimeout(openTimer);
    openTimer = setTimeout(() => showTooltip(trigger, false), delay);
  });

  document.addEventListener('pointerout', e => {
    if (e.pointerType !== 'mouse') return;
    const trigger = e.target.closest(TRIGGER_SELECTOR);
    if (!trigger) return;
    if (trigger.contains(e.relatedTarget)) return;

    clearTimeout(openTimer);
    if (!isPinned && activeTrigger === trigger) {
      scheduleClose();
    }
  });

  // Click / Tap (pins on desktop or toggles on touch; never bubbles to parent controls)
  document.addEventListener('click', e => {
    const trigger = e.target.closest(TRIGGER_SELECTOR);
    const insidePortal = e.target.closest('#floating-tooltip');

    if (trigger) {
      e.preventDefault();
      e.stopPropagation();

      if (activeTrigger === trigger && isPinned && portalEl.classList.contains('visible')) {
        hideTooltip();
      } else {
        showTooltip(trigger, true);
      }
      return;
    }

    if (!insidePortal && portalEl && portalEl.classList.contains('visible')) {
      hideTooltip();
    }
  });

  // Keyboard focus & Escape dismissal
  document.addEventListener('focusin', e => {
    const trigger = e.target.closest(TRIGGER_SELECTOR);
    if (trigger && trigger.matches(':focus-visible')) {
      showTooltip(trigger, false);
    }
  });

  document.addEventListener('focusout', e => {
    const trigger = e.target.closest(TRIGGER_SELECTOR);
    if (trigger && activeTrigger === trigger && !isPinned) {
      hideTooltip();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && portalEl && portalEl.classList.contains('visible')) {
      hideTooltip();
    }
  });

  window.addEventListener('scroll', refreshActiveTooltip, { passive: true, capture: true });
  window.addEventListener('resize', refreshActiveTooltip, { passive: true });
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ── Prevent browser back/forward swipe navigation ──────────────────────────

let touchStartX = 0;
let touchStartY = 0;

// Layer 1 (PRIMARY — iOS Safari 13.4+):
// Must use window + capture phase so we intercept BEFORE the browser's own
// gesture recognizer. { passive: false } is required to call preventDefault().
// Zone: 20px from left/right edge (Joel Malone / Apple-documented approach).
window.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;

  if (touch.clientX < 20 || touch.clientX > window.innerWidth - 20) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}, { capture: true, passive: false });

// Layer 2 (Chrome Android — decides on horizontal direction during touchmove):
window.addEventListener('touchmove', (e) => {
  if (e.touches.length !== 1) return;
  const deltaX = e.touches[0].clientX - touchStartX;
  const deltaY = e.touches[0].clientY - touchStartY;
  const isEdgeSwipe = touchStartX < 20 || touchStartX > window.innerWidth - 20;
  const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

  if (isEdgeSwipe && isHorizontal) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}, { capture: true, passive: false });

// Layer 3 (desktop Chrome & Safari — trackpad horizontal swipe):
window.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
  }
}, { capture: true, passive: false });

// Layer 4 (last resort — catches anything that slips through):
// history.go(1) immediately cancels any back navigation that did fire.
let popstateCooldown = false;
window.history.pushState(null, '', window.location.href);
window.onpopstate = () => {
  if (popstateCooldown) return;
  popstateCooldown = true;
  window.history.go(1);
  setTimeout(() => { popstateCooldown = false; }, 300);
};

// ── Physical edge guards ────────────────────────────────────────────────────
// Transparent DOM elements covering the left/right 20px of the viewport.
// These catch touch events at the element level as a belt-and-suspenders layer.
function createEdgeGuard(side: 'left' | 'right') {
  const el = document.createElement('div');
  el.style.cssText = `
    position: fixed;
    top: 0;
    ${side}: 0;
    width: 20px;
    height: 100%;
    z-index: 99999;
    touch-action: none;
    pointer-events: auto;
    background: transparent;
  `;
  el.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
  }, { passive: false });
  document.body.appendChild(el);
}

// Add edge guards after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createEdgeGuard('left');
    createEdgeGuard('right');
  });
} else {
  createEdgeGuard('left');
  createEdgeGuard('right');
}

// ───────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById("root")!).render(<App />);

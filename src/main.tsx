import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ── Prevent browser back/forward swipe navigation ──────────────────────────

let touchStartX = 0;
let touchStartY = 0;

// Layer 1 (PRIMARY — iOS Safari 13.4+):
// iOS Safari decides to trigger back/forward navigation at touchstart time,
// before touchmove fires. The ONLY way to block it is preventDefault() on
// touchstart with { passive: false }. Zone: within 15px of left/right edge.
document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;

  if (touch.clientX < 15 || touch.clientX > window.innerWidth - 15) {
    e.preventDefault();
  }
}, { passive: false });

// Layer 2 (Chrome Android):
// Chrome decides on back/forward during touchmove based on horizontal delta.
// preventDefault() on touchmove blocks it when the swipe started near an edge.
document.addEventListener('touchmove', (e) => {
  const deltaX = e.touches[0].clientX - touchStartX;
  const deltaY = e.touches[0].clientY - touchStartY;
  const isEdgeSwipe = touchStartX < 20 || touchStartX > window.innerWidth - 20;
  const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

  if (isEdgeSwipe && isHorizontal) {
    e.preventDefault();
  }
}, { passive: false });

// Layer 3 (desktop Chrome & Safari trackpad):
// Block horizontal trackpad/wheel gestures.
document.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
  }
}, { passive: false });

// Layer 4 (last resort fallback):
// If a gesture slips past all touch layers, snap back forward immediately.
let popstateCooldown = false;
window.history.pushState(null, '', window.location.href);
window.addEventListener('popstate', () => {
  if (popstateCooldown) return;
  popstateCooldown = true;
  window.history.go(1);
  setTimeout(() => { popstateCooldown = false; }, 300);
});

// ───────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById("root")!).render(<App />);

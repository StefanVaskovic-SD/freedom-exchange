import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ── Prevent browser back/forward swipe navigation ──────────────────────────

// Layer 1: Intercept edge-swipe touch gestures (primary fix for iOS Safari & Chrome mobile).
// touchmove with { passive: false } is the only way to call preventDefault() on touch gestures.
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const deltaX = e.touches[0].clientX - touchStartX;
  const deltaY = e.touches[0].clientY - touchStartY;

  // Only block horizontal swipes that originate from the left/right screen edge (within 20px).
  // This targets the browser back/forward gesture without affecting in-app scroll containers.
  const isEdgeSwipe = touchStartX < 20 || touchStartX > window.innerWidth - 20;
  const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

  if (isEdgeSwipe && isHorizontal) {
    e.preventDefault();
  }
}, { passive: false });

// Layer 2: Block horizontal trackpad/wheel swipe (desktop Chrome & Safari).
document.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
  }
}, { passive: false });

// Layer 3: Intercept popstate as a last resort for any gesture that slips through.
// Uses history.go(1) to move forward again, cancelling the back navigation.
// A cooldown flag prevents the go(1) call from triggering an infinite loop.
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

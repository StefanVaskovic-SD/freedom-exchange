import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Block browser back/forward swipe navigation (trackpad + touch edge swipe)
// Push an initial state so there's always an entry to cancel into
window.history.pushState(null, '', window.location.href);
window.addEventListener('popstate', () => {
  window.history.pushState(null, '', window.location.href);
});

// Also block horizontal wheel/trackpad gestures at the DOM level
document.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
  }
}, { passive: false });

createRoot(document.getElementById("root")!).render(<App />);

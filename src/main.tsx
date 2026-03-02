import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Block browser back/forward swipe navigation triggered by horizontal trackpad/touch gestures
document.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
  }
}, { passive: false });

createRoot(document.getElementById("root")!).render(<App />);

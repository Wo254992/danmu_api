// language=JavaScript
export const dynamicCssContent = /* css */ `
/* =========================================================
   Animations / Dynamic Styles
   ========================================================= */

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOutRight {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(12px); }
}

@keyframes modalSlideIn {
  from { opacity: 0; transform: translateY(14px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes modalSlideOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(10px) scale(0.985); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.03); opacity: 0.85; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes themeRipple {
  from { transform: scale(0.85); opacity: 0.5; }
  to { transform: scale(1.18); opacity: 0; }
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes overlayFadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes successFadeOut {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-6px); }
}

@keyframes colorChipFadeIn {
  from { opacity: 0; transform: translateY(6px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Ripple helper (JS may inject span) */
.theme-ripple {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(99, 102, 241, 0.25);
  animation: themeRipple 0.55s var(--ease-out);
  pointer-events: none;
}

/* Success overlay (used by some JS flows) */
.success-overlay {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 1500;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(34, 197, 94, 0.20);
  border: 1px solid rgba(34, 197, 94, 0.28);
  color: var(--text);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(var(--blur-md));
  -webkit-backdrop-filter: blur(var(--blur-md));
}

.success-overlay.fade-out {
  animation: successFadeOut 0.5s var(--ease-out) forwards;
}

/* XML block */
.xml {
  font-family: var(--font-mono);
  white-space: pre-wrap;
  word-break: break-word;
}
`;

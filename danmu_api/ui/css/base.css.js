// language=JavaScript
export const baseCssContent = /* css */ `
/* =========================================================
   Base / Reset
   ========================================================= */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

html {
  -webkit-text-size-adjust: 100%;
  text-rendering: optimizeLegibility;
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
}

body {
  margin: 0;
  min-height: 100%;
  background: var(--bg);
  overflow-x: hidden;
}

img, svg {
  display: inline-block;
  vertical-align: middle;
}

a {
  color: var(--link);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

a:hover {
  opacity: 0.92;
}

button, input, select, textarea {
  font: inherit;
  color: inherit;
}

button {
  border: 0;
  background: transparent;
  cursor: pointer;
}

button:disabled,
.disabled {
  opacity: 0.55;
  cursor: not-allowed !important;
}

::selection {
  background: rgba(99, 102, 241, 0.22);
}

code, pre, kbd {
  font-family: var(--font-mono);
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

hr {
  border: 0;
  height: 1px;
  background: var(--border);
  margin: var(--space-5) 0;
}

/* Accessible focus ring */
:where(a, button, input, select, textarea, [tabindex]):focus-visible {
  outline: none;
  box-shadow: var(--ring);
  border-radius: 12px;
}

/* Scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.45) transparent;
}

*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

*::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.38);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

*::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.55);
  border: 2px solid transparent;
  background-clip: padding-box;
}

/* Background decorations */
body::before,
body::after {
  content: "";
  position: fixed;
  inset: -20vh -20vw;
  pointer-events: none;
  z-index: -1;
}

body::before {
  background:
    radial-gradient(60vw 40vw at 15% 10%, rgba(79, 70, 229, 0.28), transparent 60%),
    radial-gradient(52vw 36vw at 85% 12%, rgba(34, 211, 238, 0.22), transparent 58%),
    radial-gradient(52vw 42vw at 70% 88%, rgba(249, 115, 22, 0.14), transparent 60%);
  filter: blur(40px);
  opacity: 0.95;
}

body::after {
  background:
    radial-gradient(42vw 34vw at 45% 58%, rgba(255, 255, 255, 0.18), transparent 62%);
  filter: blur(60px);
  opacity: 0.65;
}

/* Utilities */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.mono {
  font-family: var(--font-mono);
}

.kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--kbd-bg);
  border: 1px solid var(--kbd-border);
  font-size: var(--text-xs);
  line-height: 1.4;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
`;

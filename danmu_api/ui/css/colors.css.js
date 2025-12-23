// language=JavaScript
export const colorsCssContent = /* css */ `
/* =========================================================
   Theme Colors (Light/Dark)
   ========================================================= */

:root,
:root[data-theme="light"],
[data-theme="light"] {
  color-scheme: light;

  --bg: #f7f8ff;
  --bg-elev: #ffffff;

  --text: rgba(15, 23, 42, 0.92);
  --text-2: rgba(15, 23, 42, 0.70);
  --text-3: rgba(15, 23, 42, 0.55);

  --surface: rgba(255, 255, 255, 0.72);
  --surface-2: rgba(255, 255, 255, 0.56);
  --surface-3: rgba(255, 255, 255, 0.44);

  --border: rgba(15, 23, 42, 0.12);
  --border-strong: rgba(15, 23, 42, 0.18);

  --shadow-color: rgba(15, 23, 42, 0.12);

  /* Accents */
  --accent: #4f46e5;
  --accent-2: #06b6d4;
  --accent-3: #f97316;

  --success: #16a34a;
  --warn: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;

  --chip-bg: rgba(79, 70, 229, 0.10);
  --chip-border: rgba(79, 70, 229, 0.18);

  --link: #3b82f6;
}

:root[data-theme="dark"],
[data-theme="dark"] {
  color-scheme: dark;

  --bg: #070b18;
  --bg-elev: #0a0f1e;

  --text: rgba(255, 255, 255, 0.92);
  --text-2: rgba(255, 255, 255, 0.72);
  --text-3: rgba(255, 255, 255, 0.56);

  --surface: rgba(16, 20, 36, 0.62);
  --surface-2: rgba(16, 20, 36, 0.46);
  --surface-3: rgba(16, 20, 36, 0.36);

  --border: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.18);

  --shadow-color: rgba(0, 0, 0, 0.55);

  /* Accents */
  --accent: #8b5cf6;
  --accent-2: #22d3ee;
  --accent-3: #fb923c;

  --success: #22c55e;
  --warn: #fbbf24;
  --danger: #fb7185;
  --info: #60a5fa;

  --chip-bg: rgba(139, 92, 246, 0.16);
  --chip-border: rgba(139, 92, 246, 0.25);

  --link: #93c5fd;
}

/* Common derived colors */
:root {
  --glass: var(--surface);
  --glass-2: var(--surface-2);
  --glass-border: var(--border);
  --glass-border-strong: var(--border-strong);

  --progress-gradient: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3));
  --soft-gradient: linear-gradient(135deg, rgba(79, 70, 229, 0.18), rgba(34, 211, 238, 0.16), rgba(249, 115, 22, 0.10));

  --kbd-bg: rgba(148, 163, 184, 0.18);
  --kbd-border: rgba(148, 163, 184, 0.26);
}
`;

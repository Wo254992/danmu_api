// language=JavaScript
export const tokensCssContent = /* css */ `
/* =========================================================
   Design Tokens
   - Keep this file focused on variables only.
   ========================================================= */

:root {
  /* Typography */
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  /* Sizing */
  --sidebar-width: 292px;
  --sidebar-width-collapsed: 84px;
  --mobile-header-height: 60px;
  --content-padding: 24px;

  /* Radius */
  --radius-xs: 10px;
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 22px;
  --radius-xl: 28px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;

  /* Blur */
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 18px;
  --blur-xl: 26px;

  /* Shadows */
  --shadow-sm: 0 8px 22px rgba(0, 0, 0, 0.10);
  --shadow-md: 0 14px 40px rgba(0, 0, 0, 0.14);
  --shadow-lg: 0 22px 66px rgba(0, 0, 0, 0.18);

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --transition-fast: 140ms var(--ease-out);
  --transition-med: 220ms var(--ease-out);
  --transition-slow: 360ms var(--ease-out);

  /* Typography scale */
  --text-xs: 12px;
  --text-sm: 13px;
  --text-md: 14px;
  --text-lg: 16px;
  --text-xl: 18px;

  --title-sm: 18px;
  --title-md: 20px;
  --title-lg: 24px;
  --title-xl: 30px;

  /* Layout */
  --container-max: 1200px;
  --ring: 0 0 0 4px rgba(99, 102, 241, 0.22);
}
`;

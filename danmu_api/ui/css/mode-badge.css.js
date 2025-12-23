// language=JavaScript
export const modeBadgeCssContent = /* css */ `
/* =========================================================
   Mode badge (small UI hints)
   ========================================================= */

.mode-badge,
#current-mode {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(6, 182, 212, 0.14);
  border: 1px solid rgba(6, 182, 212, 0.22);
  color: var(--text);
  font-size: var(--text-xs);
}

.mode-badge .dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--accent-2);
  box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.16);
}
`;

// language=JavaScript
export const formsCssContent = /* css */ `
/* =========================================================
   Forms
   ========================================================= */

.form-card {
  padding: var(--space-5);
}

.form-group {
  margin-top: var(--space-4);
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  color: var(--text-2);
  margin-bottom: 8px;
}

.form-help {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: var(--text-3);
  font-size: var(--text-xs);
  line-height: 1.4;
}

.help-icon {
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.14);
  border: 1px solid rgba(99, 102, 241, 0.22);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 18px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  outline: none;
  color: var(--text);
  transition: border-color var(--transition-fast), background var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-3);
}

.form-input:hover,
.form-select:hover,
.form-textarea:hover {
  border-color: var(--glass-border-strong);
  background: var(--surface);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: rgba(99, 102, 241, 0.45);
  box-shadow: var(--ring);
  background: var(--surface);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.input-group,
.lan-input-group {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-3);
  align-items: center;
}

.lan-input-separator {
  height: 1px;
  background: var(--border);
  margin: var(--space-4) 0;
}

/* Switches / toggles */
.switch {
  position: relative;
  width: 50px;
  height: 30px;
  border-radius: 999px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  transition: background var(--transition-fast), border-color var(--transition-fast);
  flex: 0 0 auto;
}

.switch input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.switch-thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  transition: transform var(--transition-fast), background var(--transition-fast);
}

[data-theme="dark"] .switch-thumb {
  background: rgba(255, 255, 255, 0.92);
}

.switch input:checked + .switch-thumb {
  transform: translateX(20px);
}

.switch input:checked ~ .switch-track,
.switch.checked {
  background: rgba(34, 197, 94, 0.20);
  border-color: rgba(34, 197, 94, 0.28);
}

/* Simple checkbox/radio */
.checkbox,
.radio {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.checkbox input,
.radio input {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
}

/* File drop zone (if any) */
.drop-zone,
.upload-area {
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px dashed rgba(148, 163, 184, 0.50);
  background: rgba(148, 163, 184, 0.08);
  text-align: center;
}
`;

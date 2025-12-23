// language=JavaScript
export const componentsCssContent = /* css */ `
/* =========================================================
   Components
   ========================================================= */

.glass {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  box-shadow: 0 18px 60px var(--shadow-color);
  backdrop-filter: blur(var(--blur-lg));
  -webkit-backdrop-filter: blur(var(--blur-lg));
}

.glass-2 {
  background: var(--glass-2);
  border: 1px solid var(--glass-border);
  box-shadow: 0 14px 44px var(--shadow-color);
  backdrop-filter: blur(var(--blur-md));
  -webkit-backdrop-filter: blur(var(--blur-md));
}

/* Top progress bar */
.progress-bar-top {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: var(--progress-gradient);
  box-shadow: 0 10px 30px rgba(79, 70, 229, 0.32);
  z-index: 1200;
  transition: width var(--transition-med);
}

/* Layout */
.app-container {
  min-height: 100vh;
  display: flex;
  gap: var(--space-5);
  padding: var(--space-5);
}

.sidebar {
  width: var(--sidebar-width);
  height: calc(100vh - (var(--space-5) + var(--space-5)));
  position: sticky;
  top: var(--space-5);
  border-radius: var(--radius-xl);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(var(--blur-xl));
  -webkit-backdrop-filter: blur(var(--blur-xl));
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: var(--space-5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  border-bottom: 1px solid var(--glass-border);
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.logo-image {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  box-shadow: 0 10px 26px rgba(0,0,0,0.22);
}

.logo-text {
  font-size: 18px;
  margin: 0;
  letter-spacing: 0.2px;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-toggle {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  display: none; /* prevent desktop overlay bug; mobile uses top menu */
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);
}

.sidebar-toggle:hover {
  transform: translateY(-1px);
  background: var(--surface);
  border-color: var(--glass-border-strong);
}

.toggle-icon {
  width: 18px;
  height: 2px;
  background: var(--text);
  border-radius: 999px;
  position: relative;
  opacity: 0.9;
}

.toggle-icon::before,
.toggle-icon::after {
  content: "";
  position: absolute;
  left: 0;
  width: 18px;
  height: 2px;
  background: var(--text);
  border-radius: 999px;
}

.toggle-icon::before { top: -6px; }
.toggle-icon::after { top: 6px; }

.version-card {
  margin: var(--space-5);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--soft-gradient);
  border: 1px solid var(--glass-border);
  box-shadow: 0 12px 36px var(--shadow-color);
}

.version-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.version-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: var(--glass-2);
  border: 1px solid var(--glass-border);
}

.version-title {
  font-size: var(--text-sm);
  color: var(--text-2);
  margin: 0;
}

.version-value {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text);
  margin: 0;
}

.version-status {
  margin-top: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-2);
  font-size: var(--text-sm);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--info);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.16);
}

.status-dot.success { background: var(--success); box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18); }
.status-dot.warn { background: var(--warn); box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.18); }
.status-dot.error { background: var(--danger); box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.18); }

/* Sidebar nav */
.nav-menu {
  padding: 0 var(--space-3) var(--space-3);
  overflow: auto;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  margin: 8px 10px;
  border-radius: 16px;
  color: var(--text-2);
  border: 1px solid transparent;
  transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
  user-select: none;
}

.nav-item:hover {
  background: var(--glass-2);
  border-color: var(--glass-border);
  color: var(--text);
  transform: translateY(-1px);
}

.nav-item.active {
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(99, 102, 241, 0.28);
  color: var(--text);
}

.nav-icon {
  width: 18px;
  height: 18px;
  opacity: 0.9;
  flex: 0 0 auto;
}

.nav-text {
  font-size: var(--text-md);
  font-weight: 600;
  letter-spacing: 0.2px;
}

/* Main content */
.main-content {
  flex: 1;
  min-width: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.content-section {
  display: none;
}

.content-section.active {
  display: block;
  animation: fadeInUp 0.32s var(--ease-out);
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  margin: 0 0 var(--space-4);
}

.section-title {
  font-size: var(--title-lg);
  margin: 0;
  letter-spacing: -0.2px;
}

.section-desc {
  margin: 6px 0 0;
  color: var(--text-2);
  font-size: var(--text-md);
}

.header-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* Cards */
.preview-hero-card,
.form-card,
.response-card,
.log-container,
.api-endpoint-card,
.danmu-heatmap-card,
.danmu-list-card,
.system-status-card,
.deploy-env-status-card,
.preview-card,
.push-container .form-card,
.env-modal-card,
.modal-container {
  border-radius: var(--radius-xl);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(var(--blur-lg));
  -webkit-backdrop-filter: blur(var(--blur-lg));
}

.preview-hero-card {
  padding: var(--space-6);
}

.preview-hero-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.preview-hero-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.preview-hero-icon {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: rgba(99, 102, 241, 0.16);
  border: 1px solid rgba(99, 102, 241, 0.22);
  color: var(--text);
}

.preview-hero-icon svg {
  width: 26px;
  height: 26px;
}

.preview-hero-title {
  margin: 0;
  font-size: var(--title-xl);
  letter-spacing: -0.4px;
}

.preview-hero-subtitle {
  margin: 6px 0 0;
  color: var(--text-2);
}

.preview-stats-grid,
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

.preview-stat-card,
.stat-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--glass-2);
  border: 1px solid var(--glass-border);
  transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.preview-stat-card:hover,
.stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--glass-border-strong);
  background: var(--surface);
}

.stat-card-compact {
  padding: 14px 16px;
}

.stat-icon-wrapper {
  width: 42px;
  height: 42px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  flex: 0 0 auto;
}

.stat-icon-wrapper svg {
  width: 20px;
  height: 20px;
}

.stat-icon-primary { background: rgba(99, 102, 241, 0.18); border-color: rgba(99, 102, 241, 0.26); }
.stat-icon-success { background: rgba(34, 197, 94, 0.16); border-color: rgba(34, 197, 94, 0.24); }
.stat-icon-warning { background: rgba(245, 158, 11, 0.16); border-color: rgba(245, 158, 11, 0.24); }
.stat-icon-danger { background: rgba(239, 68, 68, 0.16); border-color: rgba(239, 68, 68, 0.24); }
.stat-icon-status { background: rgba(59, 130, 246, 0.14); border-color: rgba(59, 130, 246, 0.22); }
.stat-icon-mode { background: rgba(6, 182, 212, 0.14); border-color: rgba(6, 182, 212, 0.22); }

.stat-content {
  min-width: 0;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.2px;
  line-height: 1.05;
}

.stat-label {
  margin-top: 6px;
  font-size: var(--text-sm);
  color: var(--text-2);
}

.stat-value-status {
  font-size: 18px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  color: var(--text);
  box-shadow: 0 10px 30px var(--shadow-color);
  transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
  user-select: none;
  white-space: nowrap;
}

.btn:hover {
  transform: translateY(-1px);
  border-color: var(--glass-border-strong);
  background: var(--surface);
  box-shadow: 0 14px 40px var(--shadow-color);
}

.btn:active {
  transform: translateY(0);
}

.btn-icon {
  width: 16px;
  height: 16px;
  opacity: 0.95;
}

.btn-lg {
  padding: 12px 16px;
  border-radius: 18px;
}

.btn-sm {
  padding: 8px 12px;
  border-radius: 14px;
  font-size: var(--text-sm);
  gap: 8px;
}

.btn-icon-only,
.btn-icon.btn-icon-only,
.btn-icon.btn-icon {
  pointer-events: none;
}

.btn-primary {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.32), rgba(34, 211, 238, 0.22));
  border-color: rgba(99, 102, 241, 0.28);
}

.btn-secondary {
  background: var(--glass-2);
}

.btn-success {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.26), rgba(59, 130, 246, 0.14));
  border-color: rgba(34, 197, 94, 0.24);
}

.btn-danger {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.24), rgba(249, 115, 22, 0.14));
  border-color: rgba(239, 68, 68, 0.22);
}

.btn-modal {
  min-width: 120px;
}

.btn-icon {
  flex: 0 0 auto;
}

/* Tabs */
.category-tabs,
.danmu-method-tabs,
.api-mode-tabs {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.tab-btn,
.danmu-method-tab,
.api-mode-tab,
.log-filter-btn,
.danmu-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  color: var(--text-2);
  transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast), color var(--transition-fast);
}

.tab-btn:hover,
.danmu-method-tab:hover,
.api-mode-tab:hover,
.log-filter-btn:hover,
.danmu-filter-btn:hover {
  background: var(--surface);
  border-color: var(--glass-border-strong);
  color: var(--text);
  transform: translateY(-1px);
}

.tab-btn.active,
.danmu-method-tab.active,
.api-mode-tab.active,
.log-filter-btn.active,
.danmu-filter-btn.active {
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(99, 102, 241, 0.28);
  color: var(--text);
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  color: var(--text);
  font-size: var(--text-xs);
}

/* Log viewer */
.log-filters {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-bottom: var(--space-4);
}

.log-container {
  padding: var(--space-4);
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-height: 64vh;
  overflow: auto;
  padding-right: 4px;
}

.log-entry {
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  transition: border-color var(--transition-fast), transform var(--transition-fast), background var(--transition-fast);
}

.log-entry:hover {
  border-color: var(--glass-border-strong);
  background: var(--surface);
  transform: translateY(-1px);
}

.log-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  color: var(--text-2);
  font-size: var(--text-sm);
}

.log-icon {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
}

.log-time {
  font-variant-numeric: tabular-nums;
  color: var(--text-2);
}

.log-type-tag {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: var(--text-xs);
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  color: var(--text-2);
}

.log-type-error { border-color: rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.14); color: var(--text); }
.log-type-warn { border-color: rgba(245, 158, 11, 0.35); background: rgba(245, 158, 11, 0.14); color: var(--text); }
.log-type-info { border-color: rgba(59, 130, 246, 0.35); background: rgba(59, 130, 246, 0.14); color: var(--text); }
.log-type-success { border-color: rgba(34, 197, 94, 0.35); background: rgba(34, 197, 94, 0.14); color: var(--text); }

.log-message {
  color: var(--text);
  line-height: 1.6;
  font-size: var(--text-md);
}

.log-message-full {
  margin-top: 8px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid var(--glass-border);
  background: rgba(0, 0, 0, 0.06);
  color: var(--text);
}

[data-theme="dark"] .log-message-full {
  background: rgba(255, 255, 255, 0.06);
}

.log-expand-btn {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 14px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  color: var(--text-2);
}

.log-expand-btn:hover {
  background: var(--surface);
  color: var(--text);
  border-color: var(--glass-border-strong);
}

.expand-icon {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-fast);
}

.log-entry.expanded .expand-icon {
  transform: rotate(180deg);
}

/* API response */
.response-card {
  margin-top: var(--space-4);
  padding: var(--space-4);
}

.card-title {
  margin: 0 0 var(--space-3);
  font-size: var(--title-md);
  letter-spacing: -0.2px;
}

.card-desc {
  margin: 6px 0 0;
  color: var(--text-2);
  font-size: var(--text-sm);
}

.response-content {
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  padding: var(--space-3);
  overflow: auto;
  max-height: 52vh;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.6;
}

.response-content .json-key { color: var(--accent-2); }
.response-content .json-string { color: var(--success); }
.response-content .json-number { color: var(--accent-3); }
.response-content .json-boolean { color: var(--warn); }
.response-content .json-null { color: var(--text-3); }

.response-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.copy-response-btn {
  padding: 8px 12px;
  border-radius: 14px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  color: var(--text-2);
  transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast), color var(--transition-fast);
}

.copy-response-btn:hover {
  background: var(--surface);
  border-color: var(--glass-border-strong);
  color: var(--text);
  transform: translateY(-1px);
}

.copy-response-btn.copied {
  background: rgba(34, 197, 94, 0.18);
  border-color: rgba(34, 197, 94, 0.30);
  color: var(--text);
}

/* Heatmap */
.heatmap-container {
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  padding: var(--space-3);
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(60, 1fr);
  gap: 2px;
  align-items: end;
  height: 120px;
  margin: var(--space-3) 0;
}

.heatmap-node {
  border-radius: 6px;
  min-height: 4px;
  background: rgba(99, 102, 241, 0.22);
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.heatmap-node:hover {
  transform: translateY(-2px);
  opacity: 0.92;
}

.heatmap-legend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  color: var(--text-2);
  font-size: var(--text-xs);
}

.heatmap-node-info {
  margin-top: var(--space-2);
  color: var(--text-2);
  font-size: var(--text-sm);
}

/* Danmu list */
.danmu-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-height: 52vh;
  overflow: auto;
  padding-right: 4px;
}

.danmu-item {
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  transition: border-color var(--transition-fast), transform var(--transition-fast), background var(--transition-fast);
}

.danmu-item:hover {
  border-color: var(--glass-border-strong);
  background: var(--surface);
  transform: translateY(-1px);
}

.danmu-time {
  font-variant-numeric: tabular-nums;
  color: var(--text-2);
  font-size: var(--text-sm);
}

.danmu-text {
  margin-top: 6px;
  color: var(--text);
  line-height: 1.6;
}

/* Anime grid (search results) */
.anime-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

.anime-card {
  padding: var(--space-4);
  border-radius: var(--radius-xl);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.anime-card:hover {
  transform: translateY(-2px);
  border-color: var(--glass-border-strong);
  background: var(--surface);
}

.anime-title {
  margin: 0 0 8px;
  font-size: var(--title-sm);
}

.anime-meta {
  color: var(--text-2);
  font-size: var(--text-sm);
  line-height: 1.55;
}

/* Environment list */
.env-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

.env-item {
  padding: var(--space-4);
  border-radius: var(--radius-xl);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.env-info { min-width: 0; }
.env-key {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.env-value {
  display: block;
  margin: 10px 0 8px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  color: var(--text);
  overflow: auto;
}

.env-desc {
  display: block;
  color: var(--text-2);
  font-size: var(--text-sm);
  line-height: 1.45;
}

.value-type-badge {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: var(--text-xs);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  color: var(--text);
}

.value-type-badge.multi { background: rgba(34, 211, 238, 0.14); border-color: rgba(34, 211, 238, 0.22); }
.value-type-badge.color { background: rgba(249, 115, 22, 0.14); border-color: rgba(249, 115, 22, 0.22); }

.env-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  flex: 0 0 auto;
}

/* Mobile header */
.mobile-header {
  display: none;
  position: sticky;
  top: 0;
  z-index: 1100;
  height: var(--mobile-header-height);
  margin: 0;
  padding: 12px 16px;
  border-radius: var(--radius-xl);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(var(--blur-xl));
  -webkit-backdrop-filter: blur(var(--blur-xl));
}

.mobile-header-left,
.mobile-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-header {
  display: none;
  align-items: center;
  justify-content: space-between;
}

.mobile-menu-btn {
  width: 40px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  display: grid;
  place-items: center;
}

.menu-line {
  width: 16px;
  height: 2px;
  border-radius: 999px;
  background: var(--text);
  opacity: 0.9;
  display: block;
}

.menu-line + .menu-line { margin-top: 4px; }

.mobile-logo-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.mobile-logo-image {
  width: 30px;
  height: 30px;
  border-radius: 12px;
}

.mobile-title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.2px;
  line-height: 1.1;
}

.mobile-subtitle {
  display: block;
  margin-top: 2px;
  font-size: 11px;
  color: var(--text-3);
}

.mobile-action-btn,
.mobile-status-indicator {
  width: 40px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  display: grid;
  place-items: center;
}

.mobile-action-icon {
  width: 18px;
  height: 18px;
}

.theme-icon-sun,
.theme-icon-moon {
  transition: transform var(--transition-med), opacity var(--transition-med);
}

[data-theme="dark"] .theme-icon-sun { opacity: 0; transform: rotate(-20deg) scale(0.88); }
[data-theme="dark"] .theme-icon-moon { opacity: 1; transform: rotate(0) scale(1); }
[data-theme="light"] .theme-icon-sun { opacity: 1; transform: rotate(0) scale(1); }
[data-theme="light"] .theme-icon-moon { opacity: 0; transform: rotate(20deg) scale(0.88); }

/* Modal */
.modal-overlay,
.custom-dialog-overlay {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 1300;
}

.modal-overlay.active,
.custom-dialog-overlay.active {
  display: flex;
  animation: fadeIn 0.22s var(--ease-out);
}

.modal-container {
  width: min(880px, 100%);
  max-height: min(86vh, 720px);
  overflow: auto;
  padding: 0;
  animation: modalSlideIn 0.28s var(--ease-out);
}

.modal-lg {
  width: min(1040px, 100%);
}

.modal-header {
  padding: var(--space-5) var(--space-5) var(--space-4);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.modal-title {
  margin: 0;
  font-size: var(--title-md);
}

.modal-close {
  width: 40px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  font-size: 22px;
  line-height: 1;
  display: grid;
  place-items: center;
  color: var(--text-2);
}

.modal-close:hover {
  background: var(--surface);
  border-color: var(--glass-border-strong);
  color: var(--text);
}

.modal-body {
  padding: var(--space-5);
}

.modal-footer {
  padding: var(--space-4) var(--space-5) var(--space-5);
  border-top: 1px solid var(--glass-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.modal-footer-compact {
  padding-top: var(--space-3);
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1400;
}

.loading-overlay.active {
  display: flex;
  animation: fadeIn 0.22s var(--ease-out);
}

.loading-content {
  width: min(520px, 100%);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: modalSlideIn 0.28s var(--ease-out);
}

.loading-spinner {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  border: 3px solid rgba(148, 163, 184, 0.30);
  border-top-color: rgba(99, 102, 241, 0.80);
  margin: 0 auto var(--space-4);
  animation: spin 0.9s linear infinite;
}

.loading-title {
  margin: 0;
  font-size: var(--title-md);
}

.loading-desc {
  margin: 10px 0 0;
  color: var(--text-2);
}

/* Footer */
.footer {
  margin-top: var(--space-5);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-md);
}

.footer-text {
  margin: 0 0 var(--space-3);
  color: var(--text-2);
  line-height: 1.65;
}

.footer-links {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-4);
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  background: var(--glass-2);
  color: var(--text);
}

.footer-link:hover {
  background: var(--surface);
  border-color: var(--glass-border-strong);
}

.footer-note {
  margin: var(--space-4) 0 0;
  color: var(--text-3);
  font-size: var(--text-sm);
}

/* Small helper chips/tags */
.selected-tag,
.available-tag,
.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  color: var(--text);
  font-size: var(--text-xs);
  user-select: none;
}

.selected-tag {
  background: rgba(34, 197, 94, 0.16);
  border-color: rgba(34, 197, 94, 0.24);
}

.tag-remove {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] .tag-remove { background: rgba(255, 255, 255, 0.10); }

/* Color chips */
.color-pool-container,
#color-pool-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.color-chip {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 30px var(--shadow-color);
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.color-chip:hover {
  transform: translateY(-1px);
  border-color: var(--glass-border-strong);
  box-shadow: 0 14px 40px var(--shadow-color);
}

.color-chip::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(14px 14px at 30% 30%, rgba(255, 255, 255, 0.35), transparent 60%);
  opacity: 0.85;
}

/* Drag states */
.drag-over {
  outline: 2px dashed rgba(99, 102, 241, 0.55);
  outline-offset: 4px;
}

.dragging {
  opacity: 0.75;
}

/* Empty states */
.empty,
.danmu-list-end {
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px dashed rgba(148, 163, 184, 0.45);
  color: var(--text-2);
  text-align: center;
  background: rgba(148, 163, 184, 0.08);
}
`;

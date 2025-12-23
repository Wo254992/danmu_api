// language=JavaScript
export const responsiveCssContent = /* css */ `
/* =========================================================
   Responsive
   ========================================================= */

@media (max-width: 1100px) {
  .preview-stats-grid,
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .env-grid {
    grid-template-columns: 1fr;
  }

  .anime-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .app-container {
    padding: 14px;
    gap: 14px;
  }

  .mobile-header {
    display: flex;
  }

  .sidebar {
    position: fixed;
    top: 12px;
    bottom: 12px;
    left: 12px;
    height: auto;
    width: min(320px, calc(100vw - 24px));
    transform: translateX(calc(-100% - 16px));
    transition: transform var(--transition-med);
    z-index: 1000;
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .main-content {
    gap: 14px;
  }

  .sidebar-header {
    padding: 18px;
  }

  .version-card {
    margin: 18px;
  }

  .nav-item {
    margin: 8px 14px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .preview-hero-card {
    padding: 18px;
  }

  .preview-stats-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .form-card,
  .response-card,
  .log-container {
    padding: 16px;
  }

  .modal-body {
    padding: 18px;
  }

  .modal-header,
  .modal-footer {
    padding-left: 18px;
    padding-right: 18px;
  }
}

@media (max-width: 520px) {
  .btn {
    width: 100%;
  }

  .header-actions .btn {
    width: auto;
  }

  .category-tabs,
  .danmu-method-tabs,
  .api-mode-tabs {
    gap: 8px;
  }

  .tab-btn,
  .danmu-method-tab,
  .api-mode-tab,
  .log-filter-btn,
  .danmu-filter-btn {
    flex: 1 1 auto;
    justify-content: center;
  }

  .anime-grid {
    grid-template-columns: 1fr;
  }

  .log-meta {
    flex-wrap: wrap;
  }

  .env-item {
    flex-direction: column;
    align-items: stretch;
  }

  .env-actions {
    justify-content: flex-start;
  }
}
`;

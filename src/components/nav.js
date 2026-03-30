// ── SkillX Navigation Components ──

import { AUTH } from '../utils/auth.js';

const ICONS = {
  grid: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  folder: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  passport: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20"/><path d="M12 14h.01"/></svg>`,
  report: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,
};

export function renderNav(currentPage = '/') {
  const role = AUTH.getRole();
  const isLoggedIn = !!role;

  let navLinks = '';
  
  if (!isLoggedIn) {
    // Complete the center layout for logged-out (Landing Page) users
    navLinks = `
      <a href="javascript:void(0)" data-scroll-to="problem" class="nav-link">The Problem</a>
      <a href="javascript:void(0)" data-scroll-to="how-it-works" class="nav-link">How it Works</a>
      <a href="javascript:void(0)" data-scroll-to="showcase" class="nav-link">Passport Preview</a>
      <a href="javascript:void(0)" data-scroll-to="trust" class="nav-link">Verification standard</a>
    `;
  } else if (role === 'recruiter') {
    navLinks = `
      <div style="display: flex; align-items: center; gap: var(--space-4); font-size: 13px;">
        <div style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(0,0,0,0.03); border-radius: 20px;">
          <span style="width: 6px; height: 6px; background: var(--accent-green); border-radius: 50%;"></span>
          Network Sync: Default
        </div>
        <a href="#/recruiter/talent" class="nav-link">Talent Graph</a>
        <a href="#" class="nav-link">API Docs</a>
      </div>
    `;
  } else {
    // Student links
    navLinks = `
      <div style="display: flex; align-items: center; gap: var(--space-4); font-size: 13px;">
        <div style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(0,0,0,0.03); border-radius: 20px;">
          <span style="width: 6px; height: 6px; background: var(--accent-green); border-radius: 50%;"></span>
          Node: Active
        </div>
        <a href="#/dashboard" class="nav-link">Ledger</a>
        <a href="#" class="nav-link">Community</a>
      </div>
    `;
  }

  return `
    <nav class="nav" id="main-nav">
      <div class="nav-inner">
        <a href="#/" class="nav-brand" id="nav-home">
          <div class="brand-mark">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 12L6 4h2l-2.5 6.5H9l.5-2h1.5L10 12H3z" fill="#22C55E"/>
              <path d="M8 4h1.5l2 5L13.5 4H15l-3 8h-1.5L8 4z" fill="#fff"/>
            </svg>
          </div>
          SkillX
        </a>
        <div class="nav-links" id="nav-links">
          ${navLinks}
        </div>
        <div class="nav-actions">
          ${!isLoggedIn
            ? `
              <div style="display: flex; align-items: center; gap: var(--space-4);">
                <a href="#/auth" class="nav-link" style="font-size: 13px;">Login</a>
                <a href="#/auth" class="btn btn-primary btn-sm">Get Started</a>
              </div>
            `
            : `<div class="avatar" style="background: ${role === 'recruiter' ? 'var(--accent-purple)' : '#7C3AED'}; font-size: 12px; cursor: pointer; border: 1px solid rgba(255,255,255,0.1);" id="nav-user-avatar">RS</div>`
          }
          <button class="nav-mobile-toggle" id="nav-mobile-toggle">${ICONS.menu}</button>
        </div>
      </div>
    </nav>
  `;
}

export function initNavInteractions() {
  const toggle = document.getElementById('nav-mobile-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
    });
  }

  // Smooth scroll logic for in-page anchors on landing page
  document.querySelectorAll('[data-scroll-to]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = el.getAttribute('data-scroll-to');
      const target = document.getElementById(targetId);
      if (target) {
        // Offset by 100px so the floating nav doesn't cover section headers
        const top = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile nav if open
        if (links) links.classList.remove('mobile-open');
      }
    });
  });

  const avatar = document.getElementById('nav-user-avatar');
  if (avatar) {
    avatar.addEventListener('click', () => {
      if (confirm('Switch role? This will log you out.')) {
        AUTH.logout();
      }
    });
  }
}

export function renderSidebar(activePage = 'overview') {
  const role = AUTH.getRole();
  let items = [];

  if (role === 'recruiter') {
    items = [
      { id: 'evaluation', label: 'Evaluation', icon: ICONS.users, href: '#/recruiter/evaluation' },
      { id: 'talent', label: 'Talent Pool', icon: ICONS.search, href: '#/recruiter/talent' },
      { id: 'reports', label: 'Reports', icon: ICONS.report, href: '#/recruiter/reports' },
      { id: 'settings', label: 'Settings', icon: ICONS.settings, href: '#/recruiter/settings' },
    ];
  } else {
    items = [
      { id: 'overview', label: 'Overview', icon: ICONS.grid, href: '#/dashboard/overview' },
      { id: 'projects', label: 'Projects', icon: ICONS.folder, href: '#/project/skillx-platform' },
      { id: 'passport', label: 'Passport', icon: ICONS.passport, href: '#/passport/reyyan-sayyed' },
      { id: 'report', label: 'Skill Report', icon: ICONS.report, href: '#/skill-report' },
      { id: 'settings', label: 'Settings', icon: ICONS.settings, href: '#/dashboard/settings' },
    ];
  }

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-section" style="flex:1;">
        <div class="sidebar-title">${role === 'recruiter' ? 'Recruiter Hub' : 'Navigation'}</div>
        ${items.map(item => `
          <a href="${item.href}" class="sidebar-link ${activePage === item.id ? 'active' : ''}" id="sidebar-${item.id}">
            <span class="link-icon">${item.icon}</span>
            ${item.label}
          </a>
        `).join('')}
      </div>
      <div class="sidebar-user">
        <div class="avatar" style="background: ${role === 'recruiter' ? 'var(--accent-purple)' : '#7C3AED'}; font-size: 12px;">RS</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">Reyyan Sayyed</div>
          <div class="sidebar-user-email">${role === 'recruiter' ? 'hiring@skillx.io' : 'reyyan@skillx.io'}</div>
        </div>
        <button class="btn-ghost btn-icon" id="btn-logout" title="Logout" style="margin-left:auto; color:var(--text-tertiary);">
          ${ICONS.logout}
        </button>
      </div>
    </aside>
  `;
}

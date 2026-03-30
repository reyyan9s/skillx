// ── SkillX Main Entry ──

import './styles/reset.css';
import './styles/tokens.css';
import './styles/typography.css';
import './styles/glass.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/dashboard.css';

import { Router } from './router.js';
import { renderNav, initNavInteractions } from './components/nav.js';
import { renderLanding, initLandingInteractions } from './pages/landing.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderProject, initProjectInteractions } from './pages/project.js';
import { renderPassport, initPassportInteractions } from './pages/passport.js';
import { renderVerify } from './pages/verify.js';
import { renderSkillReport, initSkillReportInteractions } from './pages/skill-report.js';
import { renderAuth, initAuthInteractions, resetAuth } from './pages/auth.js';
import { renderRecruiter } from './pages/recruiter.js';
import { initAnimations } from './utils/animations.js';
import { AUTH } from './utils/auth.js';

const app = document.getElementById('app');
const router = new Router();

function mount(html, afterMount) {
  app.innerHTML = html;
  requestAnimationFrame(() => {
    if (afterMount) afterMount();
    initAnimations();
    
    // Global interactions (logout)
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        AUTH.logout();
      });
    }
  });
}

/**
 * Middleware-like check for authentication
 * @param {string|null} requiredRole - Role to check, or null for any authenticated user
 * @param {boolean} publicException - If true, ignores auth (for specific public slugs)
 */
function protect(requiredRole, success, publicException = false) {
  const currentRole = AUTH.getRole();
  const isAuthenticated = AUTH.isAuthenticated();

  if (publicException) {
    success();
    return;
  }

  if (!isAuthenticated) {
    window.location.hash = '/auth';
    return;
  }

  if (requiredRole && currentRole !== requiredRole) {
    // If authenticated but wrong role, redirect to appropriate home
    AUTH.redirectByRole();
    return;
  }

  success();
}

// ── ROUTES ──

// Landing
router.on('/', () => {
  mount(
    renderNav('/') + renderLanding(),
    () => {
      initNavInteractions();
      initLandingInteractions();
    }
  );
});

// Role Selection (Login)
router.on('/auth', () => {
  // If already logged in, redirect to dashboard
  if (AUTH.isAuthenticated()) {
    AUTH.redirectByRole();
    return;
  }
  resetAuth();
  mount(
    renderNav('/auth') + renderAuth(),
    () => {
      initNavInteractions();
      initAuthInteractions();
    }
  );
});

// Student Dashboard (Protected)
router.on('/dashboard', (tab) => {
  protect('student', () => {
    mount(
      renderNav('/dashboard') + renderDashboard(tab || 'overview'),
      () => initNavInteractions()
    );
  });
});

// Recruiter Dashboard (Protected)
router.on('/recruiter', (tab) => {
  protect('recruiter', () => {
    mount(
      renderNav('/recruiter') + renderRecruiter(tab || 'evaluation'),
      () => initNavInteractions()
    );
  });
});

// Project (Protected)
router.on('/project', (slug) => {
  protect('student', () => {
    mount(
      renderNav('/project') + renderProject(slug),
      () => {
        initNavInteractions();
        initProjectInteractions();
      }
    );
  });
});

// Passport (Protected, with Public Exception)
router.on('/passport', (slug) => {
  const isPublicAccess = slug === 'reyyan-sayyed';
  protect(null, () => {
    mount(
      renderNav('/passport') + renderPassport(slug),
      () => {
        initNavInteractions();
        initPassportInteractions();
      }
    );
  }, isPublicAccess);
});

// Verify (Always Public)
router.on('/verify', (hash) => {
  mount(
    renderNav('/verify') + renderVerify(hash),
    () => initNavInteractions()
  );
});

// Skill Report (Protected)
router.on('/skill-report', () => {
  protect('student', () => {
    mount(
      renderNav('/skill-report') + renderSkillReport(),
      () => {
        initNavInteractions();
        initSkillReportInteractions();
      }
    );
  });
});

// Start
router.start();

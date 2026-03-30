// ── Role Selection & Login Page ──

import { AUTH } from '../utils/auth.js';
import { renderNav, initNavInteractions } from '../components/nav.js';

let currentStep = 'role'; // 'role' or 'login'
let selectedRole = null;

export function renderAuth() {
  if (currentStep === 'role') {
    return renderRoleSelection();
  } else {
    return renderLoginPage();
  }
}

function renderRoleSelection() {
  return `
    <div class="auth-page page-enter">
      <div class="container" style="max-width: 800px; text-align: center;">
        <div style="margin-bottom: var(--space-12);">
          <div class="hero-eyebrow" style="justify-content: center; margin-bottom: var(--space-4);">
            <span class="dot"></span>
            System Entry
          </div>
          <h1 class="font-heading" style="font-size: var(--text-4xl); margin-bottom: var(--space-4);">
            How will you use SkillX?
          </h1>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto; line-height: 1.6;">
            Select your professional capacity to personalize your verification experience.
          </p>
        </div>

        <div class="role-grid">
          <!-- Student Card -->
          <div class="role-card liquid-glass-border" id="card-student" style="padding: var(--space-10); position: relative;">
            <div class="role-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M18 7a4 4 0 0 0-3-3.87"/></svg>
            </div>
            <h3 class="font-heading" style="font-size: var(--text-2xl); margin-bottom: var(--space-2);">Student</h3>
            <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-6);">
              Build your cryptographic contribution passport and prove your impact to recruiters.
            </p>
            <button class="btn btn-primary" id="select-student-btn" style="width: 100%; margin-top: auto; pointer-events: none;">Select Student</button>
            <div class="clickable-overlay" id="overlay-student" style="position: absolute; inset: 0; cursor: pointer; z-index: 10;"></div>
          </div>

          <!-- Recruiter Card -->
          <div class="role-card liquid-glass-border" id="card-recruiter" style="padding: var(--space-10); position: relative;">
            <div class="role-icon-wrapper" style="background: var(--accent-purple-light); color: var(--accent-purple);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3 class="font-heading" style="font-size: var(--text-2xl); margin-bottom: var(--space-2);">Recruiter</h3>
            <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-6);">
              Evaluate verified candidates and access deep contribution intelligence for your teams.
            </p>
            <button class="btn btn-primary" id="select-recruiter-btn" style="width: 100%; margin-top: auto; pointer-events: none;">Select Recruiter</button>
            <div class="clickable-overlay" id="overlay-recruiter" style="position: absolute; inset: 0; cursor: pointer; z-index: 10;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderLoginPage() {
  const roleTitle = selectedRole === 'student' ? 'Student Entry' : 'Recruiter Access';
  const roleColor = selectedRole === 'student' ? 'var(--accent-green)' : 'var(--accent-purple)';
  
  return `
    <div class="auth-page page-enter">
      <div class="container" style="max-width: 440px;">
        <div class="card liquid-glass-strong" style="padding: var(--space-10); border-radius: var(--radius-2xl); text-align: center;">
          <div style="width: 56px; height: 56px; border-radius: var(--radius-lg); background: ${roleColor}; display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto var(--space-6);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          
          <h2 class="font-heading" style="font-size: var(--text-3xl); margin-bottom: var(--space-2);">${roleTitle}</h2>
          <p style="color: var(--text-secondary); font-size: var(--text-sm); margin-bottom: var(--space-8);">
            Secure access to the SkillX Proof Registry
          </p>
          
          <div style="display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-8);">
            <div class="input-group" style="text-align: left;">
              <label style="font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 6px; display: block;">Email Address</label>
              <input type="email" class="input" placeholder="name@company.com" disabled style="opacity: 0.5; background: var(--bg-inset);">
            </div>
            <div class="input-group" style="text-align: left;">
              <label style="font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 6px; display: block;">Authentication Key</label>
              <input type="password" class="input" placeholder="••••••••" disabled style="opacity: 0.5; background: var(--bg-inset);">
            </div>
          </div>
          
          <button class="btn btn-primary btn-lg" id="btn-login-confirm" style="width: 100%; justify-content: center; background: ${roleColor}; border-color: ${roleColor};">
            Login as ${selectedRole === 'student' ? 'Student' : 'Recruiter'}
          </button>
          
          <button class="btn btn-ghost btn-sm" id="btn-change-role" style="margin-top: var(--space-4); color: var(--text-tertiary);">
            Change Role
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initAuthInteractions() {
  const overlayStudent = document.getElementById('overlay-student');
  const overlayRecruiter = document.getElementById('overlay-recruiter');
  const loginBtn = document.getElementById('btn-login-confirm');
  const backBtn = document.getElementById('btn-change-role');

  if (overlayStudent) {
    overlayStudent.addEventListener('click', () => {
      selectedRole = 'student';
      currentStep = 'login';
      refreshAuth();
    });
  }

  if (overlayRecruiter) {
    overlayRecruiter.addEventListener('click', () => {
      selectedRole = 'recruiter';
      currentStep = 'login';
      refreshAuth();
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      AUTH.setRole(selectedRole);
      AUTH.redirectByRole();
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      currentStep = 'role';
      selectedRole = null;
      refreshAuth();
    });
  }
}

function refreshAuth() {
  const app = document.getElementById('app');
  app.innerHTML = renderNav('/auth') + renderAuth();
  initNavInteractions();
  initAuthInteractions();
}

export function resetAuth() {
  currentStep = 'role';
  selectedRole = null;
}

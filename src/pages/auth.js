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

function getAuthStyles() {
  return `
    <style>
      .cinematic-auth-wrapper {
        position: relative;
        min-height: calc(100vh - 80px);
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        color: var(--text-primary);
        overflow: hidden;
        width: 100vw;
        margin-left: calc(-50vw + 50%);
        padding: var(--space-32) 0 var(--space-12);
      }
      .auth-bg-fx {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }
      .auth-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.8;
        animation: authFloat 20s infinite alternate ease-in-out;
      }
      .auth-orb-left {
        width: 700px;
        height: 700px;
        background: radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 60%);
        top: -100px;
        left: -200px;
      }
      .auth-orb-right {
        width: 800px;
        height: 800px;
        background: radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 60%);
        bottom: -200px;
        right: -200px;
        animation-delay: -5s;
      }
      .auth-grid-overlay {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
        background-size: 30px 30px;
        mask-image: radial-gradient(circle at center, black, transparent 80%);
        -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%);
      }
      @keyframes authFloat {
        0% { transform: scale(1) translate(0, 0); }
        100% { transform: scale(1.1) translate(40px, 40px); }
      }

      .auth-role-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-8);
        margin: 0 auto;
      }
      @media (max-width: 768px) {
        .auth-role-grid { grid-template-columns: 1fr; }
      }

      .auth-glass-card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(32px) saturate(180%);
        -webkit-backdrop-filter: blur(32px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.8);
        border-radius: var(--radius-2xl);
        padding: var(--space-10);
        position: relative;
        text-align: left;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1);
      }
      .auth-glass-card:hover {
        transform: translateY(-8px) scale(1.02);
        border-color: rgba(34, 197, 94, 0.3);
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 30px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1);
      }
      .auth-glass-card:nth-child(2):hover {
        border-color: rgba(167, 139, 250, 0.3);
      }

      .auth-icon-wrapper {
        width: 64px;
        height: 64px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--space-6);
        position: relative;
        box-shadow: 0 8px 20px rgba(0,0,0,0.04);
        background: #fff;
      }
      .auth-icon-student { border: 1px solid rgba(34, 197, 94, 0.2); color: var(--accent-green); }
      .auth-icon-recruiter { border: 1px solid rgba(167, 139, 250, 0.2); color: var(--accent-purple); }

      .auth-card-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 28px;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: var(--space-3);
        color: var(--text-primary);
      }
      .auth-card-desc {
        font-size: 15px;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: var(--space-8);
      }
      .auth-card-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
        padding-top: var(--space-5);
        border-top: 1px solid rgba(0,0,0,0.05);
        transition: all 0.3s;
      }
      .auth-action-student { color: var(--accent-green); }
      .auth-action-recruiter { color: var(--accent-purple); }

      .auth-glass-card:hover .auth-card-action span {
        transform: translateX(8px);
      }
      
      /* Login Variant */
      .auth-login-container {
        max-width: 500px;
        width: 100%;
        margin: 0 auto;
        position: relative;
        z-index: 10;
      }
      .auth-login-card {
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(40px) saturate(200%);
        -webkit-backdrop-filter: blur(40px) saturate(200%);
        border: 1px solid rgba(255, 255, 255, 0.8);
        border-radius: var(--radius-2xl);
        padding: var(--space-10);
        text-align: center;
        box-shadow: 0 30px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
      }
      .student-list-btn {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        padding: var(--space-4);
        border-radius: var(--radius-xl);
        background: rgba(255, 255, 255, 0.6);
        border: 1px solid rgba(0,0,0, 0.05);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        width: 100%;
        text-align: left;
      }
      .student-list-btn:hover {
        background: #fff;
        border-color: var(--accent-green);
        transform: scale(1.02);
        box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      }
      .student-list-btn .avatar {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        color: #fff;
        font-size: 16px;
        flex-shrink: 0;
      }
    </style>
  `;
}

function renderRoleSelection() {
  return `
    ${getAuthStyles()}
    <div class="auth-page page-enter cinematic-auth-wrapper">
      <div class="auth-bg-fx">
        <div class="auth-orb auth-orb-left"></div>
        <div class="auth-orb auth-orb-right"></div>
        <div class="auth-grid-overlay"></div>
      </div>
      
      <div class="container" style="max-width: 960px; text-align: center; position: relative; z-index: 10;">
        <div style="margin-bottom: var(--space-16);">
          <div class="hero-eyebrow" style="justify-content: center; margin-bottom: var(--space-6); background: #fff; color: var(--text-primary); box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <span class="dot" style="background: var(--accent-green); box-shadow: 0 0 12px var(--accent-green);"></span>
            Secure Gateway
          </div>
          <h1 class="font-heading" style="font-size: clamp(3rem, 6vw, 4.5rem); margin-bottom: var(--space-4); color: var(--text-primary); text-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            Select Your Environment
          </h1>
          <p style="color: var(--text-secondary); max-width: 520px; margin: 0 auto; line-height: 1.6; font-size: 1.1rem;">
            Authenticate your identity to enter the cryptographic registry network and verify contributions.
          </p>
        </div>

        <div class="auth-role-grid">
          <!-- Student Card -->
          <div class="auth-glass-card" id="card-student">
            <div class="auth-icon-wrapper auth-icon-student">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M18 7a4 4 0 0 0-3-3.87"/></svg>
            </div>
            <h3 class="auth-card-title">Student Protocol</h3>
            <p class="auth-card-desc">
              Access your verified contribution ledger, track project impact, and generate immutable cryptographic proof for your talent passport.
            </p>
            <div class="auth-card-action auth-action-student">
              Initialize Connection <span style="font-size: 16px;">→</span>
            </div>
            <div class="clickable-overlay" id="overlay-student" style="position: absolute; inset: 0; cursor: pointer; z-index: 10;"></div>
          </div>

          <!-- Recruiter Card -->
          <div class="auth-glass-card" id="card-recruiter">
            <div class="auth-icon-wrapper auth-icon-recruiter">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3 class="auth-card-title">Recruiter Access</h3>
            <p class="auth-card-desc">
              Scan verified passports, discover high-impact engineering talent, and access unforgeable contribution intelligence for your teams.
            </p>
            <div class="auth-card-action auth-action-recruiter">
              Request Authorization <span style="font-size: 16px;">→</span>
            </div>
            <div class="clickable-overlay" id="overlay-recruiter" style="position: absolute; inset: 0; cursor: pointer; z-index: 10;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderLoginPage() {
  const roleTitle = selectedRole === 'student' ? 'Student Identity Selection' : 'Recruiter Authorization';
  const roleColor = selectedRole === 'student' ? 'var(--accent-green)' : 'var(--accent-purple)';
  const roleBg = selectedRole === 'student' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(167, 139, 250, 0.15)';
  
  let loginContent = '';

  if (selectedRole === 'student') {
    loginContent = `
      <div style="display: flex; flex-direction: column; gap: var(--space-4); text-align: left; margin-bottom: var(--space-6);">
        <!-- Student 1 -->
        <button class="student-list-btn student-login-btn" data-student-id="1">
          <div class="avatar" style="background: ${roleColor};">RS</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-family: 'Space Grotesk', sans-serif; font-size: 16px; color: var(--text-primary);">Reyyan Sayyed</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Systems & Backend Architecture</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--text-tertiary)"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <!-- Student 2 -->
        <button class="student-list-btn student-login-btn" data-student-id="2">
          <div class="avatar" style="background: ${roleColor};">SY</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-family: 'Space Grotesk', sans-serif; font-size: 16px; color: var(--text-primary);">Sidhhesh Yeole</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Frontend UI/UX Specialist</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--text-tertiary)"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <!-- Student 3 -->
        <button class="student-list-btn student-login-btn" data-student-id="3">
          <div class="avatar" style="background: ${roleColor};">JS</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-family: 'Space Grotesk', sans-serif; font-size: 16px; color: var(--text-primary);">Janhvi Sali</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Data Science & AI/ML Engineer</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--text-tertiary)"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <!-- Student 4 -->
        <button class="student-list-btn student-login-btn" data-student-id="4">
          <div class="avatar" style="background: ${roleColor};">AR</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-family: 'Space Grotesk', sans-serif; font-size: 16px; color: var(--text-primary);">Apurva Rahane</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Full-Stack & DevOps</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--text-tertiary)"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    `;
  } else {
    loginContent = `
      <div style="display: flex; flex-direction: column; gap: var(--space-4); text-align: left; margin-bottom: var(--space-6);">
        <!-- Recruiter 1 -->
        <button class="student-list-btn recruiter-login-btn" data-company="TechCorp Innovations" style="border-radius: var(--radius-lg);">
          <div class="avatar" style="background: ${roleColor}; color: #fff;">TC</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-family: 'Space Grotesk', sans-serif; font-size: 16px; color: var(--text-primary);">TechCorp Innovations</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Sarah Jenkins • Senior Talent Acquisition</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--text-tertiary)"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <!-- Recruiter 2 -->
        <button class="student-list-btn recruiter-login-btn" data-company="Nexus Systems" style="border-radius: var(--radius-lg);">
          <div class="avatar" style="background: ${roleColor}; color: #fff;">NS</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-family: 'Space Grotesk', sans-serif; font-size: 16px; color: var(--text-primary);">Nexus Systems</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Marcus Chen • Technical Recruiter</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--text-tertiary)"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <!-- Recruiter 3 -->
        <button class="student-list-btn recruiter-login-btn" data-company="Global Fintech" style="border-radius: var(--radius-lg);">
          <div class="avatar" style="background: ${roleColor}; color: #fff;">GF</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-family: 'Space Grotesk', sans-serif; font-size: 16px; color: var(--text-primary);">Global Fintech</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Elena Rostova • Head of Engineering</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--text-tertiary)"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    `;
  }
  
  return `
    ${getAuthStyles()}
    <div class="auth-page page-enter cinematic-auth-wrapper">
      <div class="auth-bg-fx">
        <div class="auth-orb auth-orb-left" style="background: radial-gradient(circle, ${roleBg} 0%, transparent 60%);"></div>
        <div class="auth-orb auth-orb-right" style="background: radial-gradient(circle, ${roleBg} 0%, transparent 60%);"></div>
        <div class="auth-grid-overlay"></div>
      </div>

      <div class="auth-login-container">
        <div class="auth-login-card">
          <div style="width: 64px; height: 64px; border-radius: 20px; background: #fff; border: 1px solid rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: center; color: ${roleColor}; margin: 0 auto var(--space-6); box-shadow: 0 8px 20px rgba(0,0,0,0.04);">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          
          <h2 class="font-heading" style="font-size: 32px; margin-bottom: var(--space-2); color: var(--text-primary);">${roleTitle}</h2>
          <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: var(--space-10);">
            End-to-end encrypted connection to SkillX Registry
          </p>
          
          ${loginContent}
          
          <button class="btn btn-ghost" id="btn-change-role" style="margin-top: var(--space-6); color: var(--text-tertiary); font-size: 13px;">
            ← Return to Environment Selection
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initAuthInteractions() {
  const overlayStudent = document.getElementById('overlay-student');
  const overlayRecruiter = document.getElementById('overlay-recruiter');
  const backBtn = document.getElementById('btn-change-role');
  const studentBtns = document.querySelectorAll('.student-login-btn');
  const recruiterBtns = document.querySelectorAll('.recruiter-login-btn');

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

  if (studentBtns) {
    studentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-student-id');
        AUTH.setUser({ id: parseInt(studentId, 10) });
        AUTH.setRole('student');
        AUTH.redirectByRole();
      });
    });
  }

  if (recruiterBtns) {
    recruiterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Here we simulate recruiter login. We can mock a user ID or just let the role suffice.
        AUTH.setUser({ company: btn.getAttribute('data-company'), name: btn.querySelector('.text-secondary')?.innerText?.split('•')[0].trim() || 'Recruiter' });
        AUTH.setRole('recruiter');
        AUTH.redirectByRole();
      });
      // Add hover styles manually since they share the student-list-btn class
      btn.addEventListener('mouseenter', () => {
        btn.style.borderColor = 'var(--accent-purple)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.borderColor = 'rgba(0,0,0, 0.05)';
      });
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

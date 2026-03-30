import { renderFooter } from '../components/footer.js';

export function renderLanding() {
  return `
    <!-- ═══ HERO ═══ -->
    <section class="hero" id="hero">
      <!-- Ambient Dynamic Background -->
      <div class="hero-bg-glows" aria-hidden="true">
        <div class="glow-orb orb-primary"></div>
        <div class="glow-orb orb-secondary"></div>
      </div>
      <div class="container">
        <div class="hero-content page-enter">
          <div class="hero-eyebrow">
            <span class="dot"></span>
            System Live: v1.0.4
          </div>

          <h1 class="font-heading" data-blur-text>
            Prove what you <span class="accent-purple">built.</span>
          </h1>

          <p class="hero-sub" data-scroll-reveal>
            Students work on group projects. Recruiters can't verify who did what.
            SkillX creates tamper-proof contribution records that speak for themselves.
          </p>

          <div class="hero-ctas" data-scroll-reveal>
            <a href="#/auth" class="btn btn-primary btn-lg" id="hero-cta-start">
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="#/recruiter" class="btn btn-secondary btn-lg" id="hero-cta-explore">
              Explore Ecosystem
            </a>
          </div>

          <div class="hero-hash" data-scroll-reveal>
            <div class="hash-display">
              <svg class="hash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
              SKX-2026-PROJECT-SKILLX-a7f3c2e8
            </div>
            <span class="hash-label">Recent ledger entry</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ COMPARISON STRIP ═══ -->
    <section class="comparison-strip stagger-in">
      <div class="container text-center">
        <p class="label" style="margin-bottom: var(--space-2);">The Trust Gap</p>
        <h2 class="font-heading" style="margin-bottom: var(--space-4);">Three platforms. One problem.</h2>
        <div class="comparison-items">
          <div class="comparison-item" data-scroll-reveal>
            <div class="comp-label">GitHub</div>
            <div class="comp-text">Shows commits</div>
            <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-top: var(--space-2); line-height: 1.7;">
              Code activity, not contribution context. Doesn't capture design, research, or team coordination.
            </p>
          </div>
          <div class="comparison-item" data-scroll-reveal>
            <div class="comp-label">LinkedIn</div>
            <div class="comp-text">Shows claims</div>
            <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-top: var(--space-2); line-height: 1.7;">
              Self-reported skills and descriptions. No verification. No proof of what was actually done.
            </p>
          </div>
          <div class="comparison-item active" data-scroll-reveal>
            <div class="comp-label">SkillX</div>
            <div class="comp-text">Shows proof</div>
            <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-top: var(--space-2); line-height: 1.7;">
              Task-level contributions, hash-verified, team-endorsed. Scannable via QR for instant validation.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ PROBLEM ═══ -->
    <section class="problem-section" id="problem">
      <div class="container text-center">
        <p class="label" style="color: var(--accent-green); margin-bottom: var(--space-2);">The Problem</p>
        <h2 class="font-heading" style="color: var(--text-inverse); margin-bottom: var(--space-12);" data-blur-text>
          Group projects break trust at every level.
        </h2>
        <div class="problem-grid">
          <!-- Decorative Background element -->
          <div class="decorative-blob blob-subtle" style="top: -10%; right: -5%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%);"></div>

          <div class="problem-card" data-scroll-reveal>
            <div class="problem-who">Recruiters</div>
            <h3>Can't verify contributions</h3>
            <p>Resumes say "led a team of 5" — but there's no way to know who actually wrote the code, designed the system, or carried the project.</p>
          </div>
          <div class="problem-card" data-scroll-reveal>
            <div class="problem-who">Students</div>
            <h3>Can't prove their work</h3>
            <p>The best contributors get the same credential as free-riders. There's no differentiation between doing 80% and doing 10%.</p>
          </div>
          <div class="problem-card" data-scroll-reveal>
            <div class="problem-who">Teams</div>
            <h3>Can't track fairly</h3>
            <p>Without structured contribution logging, disagreements surface late. Work distribution stays invisible until it's a conflict.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ HOW IT WORKS ═══ -->
    <section class="how-section" id="how-it-works">
      <div class="container text-center">
        <p class="label" style="margin-bottom: var(--space-2);">How it works</p>
        <h2 class="font-heading" data-blur-text>Three steps to verified proof.</h2>
        <div class="how-grid">
          <!-- Animated Connector Line (hidden on mobile) -->
          <div class="how-connector"></div>

          <div class="how-step" data-scroll-reveal>
            <div class="step-num">01</div>
            <h4>Log contributions</h4>
            <p>Track what each team member builds — tasks, skills used, weight of contribution. Real-time, transparent, collaborative.</p>
            <div class="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 4-4 4"/><path d="m8 18-4-4 4-4"/><path d="m14.5 4-5 16"/></svg>
            </div>
          </div>
          <div class="how-step" data-scroll-reveal>
            <div class="step-num">02</div>
            <h4>Generate passport</h4>
            <p>SkillX compiles your verified contributions into a cryptographic passport — hash-stamped, timestamped, tamper-proof.</p>
            <div class="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
          <div class="how-step" data-scroll-reveal>
            <div class="step-num">03</div>
            <h4>Share &amp; verify</h4>
            <p>Send your passport link or QR code to recruiters. They scan it and instantly see exactly what you built, verified.</p>
            <div class="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ECOSYSTEM REGISTRY ═══ -->
    <section class="showcase-section" id="showcase">
      <div class="container">
        <div style="text-align: center;" data-scroll-reveal>
          <p class="label" style="margin-bottom: var(--space-2);">Ecosystem registry</p>
          <h2 class="font-heading" data-blur-text>Your work, permanently verified.</h2>
          <p style="color: var(--text-secondary); max-width: 520px; margin: var(--space-3) auto 0; font-size: var(--text-base); line-height: 1.7;">
            Your professional identity is a cryptographic record that grows with every task. Share it, scan it, trust it.
          </p>
        </div>
        <div class="showcase-frame" data-scroll-reveal>
          <div class="showcase-toolbar">
            <span class="showcase-dot"></span>
            <span class="showcase-dot"></span>
            <span class="showcase-dot"></span>
            <span class="showcase-url">skillx.io/passport/reyyan-sayyed</span>
          </div>
          <div class="showcase-body" id="showcase-preview">
            ${renderMiniPassport()}
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ TRUST ═══ -->
    <section class="trust-section" id="trust">
      <div class="container">
        <div class="trust-grid">
          <div class="trust-visual" data-scroll-reveal>
            <div class="line"><span class="line-num">1</span><span class="comment">// passport verification record</span></div>
            <div class="line"><span class="line-num">2</span><span class="key">passport</span> {</div>
            <div class="line"><span class="line-num">3</span>&nbsp;&nbsp;<span class="key">hash</span>: <span class="str">"SKX-a7f3c2e8"</span></div>
            <div class="line"><span class="line-num">4</span>&nbsp;&nbsp;<span class="key">student</span>: <span class="str">"Reyyan Sayyed"</span></div>
            <div class="line"><span class="line-num">5</span>&nbsp;&nbsp;<span class="key">contributions</span>: <span class="val">12</span></div>
            <div class="line"><span class="line-num">6</span>&nbsp;&nbsp;<span class="key">verified</span>: <span class="val">true</span></div>
            <div class="line"><span class="line-num">7</span>&nbsp;&nbsp;<span class="key">generated</span>: <span class="str">"2026-03-30T08:00:00Z"</span></div>
            <div class="line"><span class="line-num">8</span>&nbsp;&nbsp;<span class="key">tamper_proof</span>: <span class="val">true</span></div>
            <div class="line"><span class="line-num">9</span>}</div>
          </div>
          <div class="trust-content" data-scroll-reveal>
            <p class="label" style="margin-bottom: var(--space-2);">Verification</p>
            <h2 class="font-heading" data-blur-text>Cryptographically serious. Visually clean.</h2>
            <p>Every contribution is stamped with a unique hash. Every passport is timestamped. Recruiters scan, verify, and trust — instantly.</p>
            <div class="trust-features">
              <div class="trust-feature">
                <span class="check-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                Unique hash per contribution
              </div>
              <div class="trust-feature">
                <span class="check-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                QR-scannable verification
              </div>
              <div class="trust-feature">
                <span class="check-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                Tamper-proof timestamping
              </div>
              <div class="trust-feature">
                <span class="check-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                Team endorsement system
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section" id="cta">
      <div class="container">
        <h2 class="font-heading" data-blur-text>Build your contribution passport now.</h2>
        <p style="margin-bottom: var(--space-8);">Track your work. Generate proof. Share instantly.</p>
        <div class="hero-ctas" style="justify-content: center;">
          <a href="#/auth" class="btn btn-primary btn-lg">Get Started</a>
          <a href="#/recruiter" class="btn btn-secondary btn-lg">View Verified Ecosystem</a>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}

function renderMiniPassport() {
  return `
    <div style="display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-5);">
      <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--accent-green); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 700; font-size: var(--text-lg); color: var(--bg-dark);">RS</div>
      <div>
        <div style="font-weight: 600; font-family: var(--font-body);">Reyyan Sayyed</div>
        <div style="font-size: var(--text-xs); color: var(--text-tertiary);">Full-Stack Developer · 12 Verified Contributions</div>
      </div>
      <div style="margin-left: auto;">
        <span class="badge badge-verified">Verified</span>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
      ${[
        { project: 'SkillX Platform', task: 'Built authentication system', skills: ['React', 'Node.js'], weight: '35%' },
        { project: 'WasteWise', task: 'Designed route optimization', skills: ['Python', 'ML'], weight: '28%' },
        { project: 'SkillX Platform', task: 'Created contribution engine', skills: ['TypeScript', 'PostgreSQL'], weight: '42%' },
        { project: 'Posturely', task: 'Built posture detection model', skills: ['Python', 'TensorFlow'], weight: '45%' },
      ].map(c => `
        <div style="padding: var(--space-4); border: 1px solid var(--border-default); border-radius: var(--radius-md);">
          <div style="font-size: 10px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.22em; margin-bottom: 2px;">${c.project}</div>
          <div style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--space-2);">${c.task}</div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; gap: var(--space-1);">
              ${c.skills.map(s => `<span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">${s}</span>`).join('')}
            </div>
            <span style="font-family: var(--font-display); font-weight: 700; font-size: var(--text-sm); color: var(--accent-green);">${c.weight}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function initLandingInteractions() {
  // Logic removed as per CTA upgrade
}

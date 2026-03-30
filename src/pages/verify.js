import { renderFooter } from '../components/footer.js';

const VALID_HASHES = {
  'SKX-2026-PROJECT-SKILLX-a7f3c2e8': {
    student: 'Reyyan Sayyed',
    contributions: 12,
    projects: 4,
    generated: '2026-03-30T08:00:00Z',
    verificationScore: 92,
    topSkills: ['React', 'Node.js', 'Python', 'TypeScript'],
    passportSlug: 'reyyan-sayyed',
    originalHash: 'a7f3c2e811acba67b8d4f0d2c67b9318b7c3d2f190e8a716c5b4e3d2f1a0b8c7',
  },
};

export function renderVerify(hash) {
  const data = VALID_HASHES[hash];
  const isValid = !!data;

  if (!isValid) {
    return `
      <div class="verify-page" style="background:transparent; min-height:80vh; display:flex; align-items:center; justify-content:center; padding: var(--space-8);">
        <div class="verify-card page-enter" style="border:1px solid var(--accent-red); background:rgba(17,0,0,0.8); backdrop-filter:blur(24px); color:white; padding:var(--space-10); border-radius:var(--radius-xl); text-align:center; max-width:440px;">
          <div class="verify-status-icon invalid" style="border: 2px solid var(--accent-red); color:var(--accent-red); width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto var(--space-6);">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          </div>
          <h2 class="verify-title font-heading" style="color:var(--accent-red); font-size:var(--text-3xl); margin-bottom:var(--space-2);">Invalid Signature</h2>
          <p class="verify-subtitle" style="color:#aaa; font-size:var(--text-sm);">The submitted hash could not be verified against the immucode registry.</p>
          <div style="background:rgba(255,0,0,0.05); padding:var(--space-4); font-family:var(--font-mono); font-size:10px; color:#f88; margin:var(--space-6) 0; border: 1px solid rgba(255, 0, 0, 0.1); border-radius:var(--radius-md);">
            INVALID_HASH_REFERENCE: <br/> ${hash || 'N/A'}
          </div>
          <div style="display:flex; justify-content:center; gap:var(--space-3);">
            <a href="#/" class="btn btn-primary" id="verify-home" style="background:var(--accent-red); border-color:var(--accent-red); color:white;">Return to System</a>
          </div>
        </div>
      </div>
      ${renderFooter()}
    `;
  }

  return `
    <div class="verify-page" style="background:transparent; padding:var(--space-16) var(--space-6); min-height:80vh;">
      <div class="container" style="max-width:640px;">
        
        <div class="page-enter">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:2px solid var(--text-primary); padding-bottom:var(--space-4); margin-bottom:var(--space-6);">
            <div>
              <div class="label" style="font-size:10px; margin-bottom:var(--space-2);"><span class="pp-status" style="display:inline-block; margin-right:6px;"></span>Verification Node Active</div>
              <h1 class="font-heading" style="font-size:32px; margin:0;">Integrity Check: PASSED</h1>
            </div>
            <div style="text-align:right;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>

          <p style="font-size:var(--text-lg); color:var(--text-secondary); line-height:1.6; margin-bottom:var(--space-6);">
            This Contribution Passport is authentic. The cryptographic signature matches the system registry. No tampering detected.
          </p>

          <div class="card liquid-glass" style="padding:0; border-radius:var(--radius-lg); overflow:hidden;">
            <!-- Timestamp banner -->
            <div style="background:var(--bg-dark); color:white; padding:var(--space-4) var(--space-6); display:flex; justify-content:space-between; align-items:center;">
              <div style="font-family:var(--font-mono); font-size:var(--text-xs); text-transform:uppercase; letter-spacing:0.1em; color:rgba(255,255,255,0.6);">Generation Timestamp</div>
              <div style="font-family:var(--font-mono); font-size:var(--text-sm); font-weight:700;">${new Date(data.generated).toISOString()}</div>
            </div>

            <div style="padding:var(--space-6);">
              <div style="font-family:var(--font-mono); font-size:10px; text-transform:uppercase; color:var(--text-tertiary); margin-bottom:4px;">Original Block Hash</div>
              <div style="font-family:var(--font-mono); font-size:12px; background:var(--bg-inset); padding:var(--space-3); border-radius:var(--radius-sm); border:1px solid var(--border-default); word-break:break-all; margin-bottom:var(--space-6);">
                ${data.originalHash}
              </div>

              <div style="font-family:var(--font-mono); font-size:10px; text-transform:uppercase; color:var(--text-tertiary); margin-bottom:4px;">Presented Signature</div>
              <div style="font-family:var(--font-mono); font-size:12px; font-weight:700; color:var(--accent-green); background:var(--accent-green-light); padding:var(--space-3); border-radius:var(--radius-sm); margin-bottom:var(--space-6);">
                ${hash}
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-6);">
                <div>
                  <div class="label" style="font-size:10px; margin-bottom:var(--space-1);">Identity Linked</div>
                  <div style="font-weight:600;">${data.student}</div>
                </div>
                <div>
                  <div class="label" style="font-size:10px; margin-bottom:var(--space-1);">Verified Contributions</div>
                  <div style="font-weight:600;">${data.contributions} nodes</div>
                </div>
                <div>
                  <div class="label" style="font-size:10px; margin-bottom:var(--space-1);">Global Contrib Score</div>
                  <div style="font-weight:600; color:var(--accent-green);">${data.verificationScore}%</div>
                </div>
                <div>
                  <div class="label" style="font-size:10px; margin-bottom:var(--space-1);">Infrastructure Domains</div>
                  <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:2px;">
                    ${data.topSkills.map(s => `<span class="skill-tag" style="font-size:9px; font-family:var(--font-mono); padding:2px 4px;">${s}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>

            <div style="padding:var(--space-4) var(--space-6); border-top:1px solid var(--border-default); background:var(--bg-surface);">
              <a href="#/passport/${data.passportSlug}" class="btn btn-primary" style="width:100%; border-radius:var(--radius-sm);">
                View Full Immutable Passport
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>

          <div style="margin-top:var(--space-8); text-align:center; font-family:var(--font-mono); font-size:10px; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:0.1em;">
            Verification complete // Node Sync: OK // SkillX Trust Engine v.2.4
          </div>
        </div>
      </div>
    </div>
    ${renderFooter()}
  `;
}

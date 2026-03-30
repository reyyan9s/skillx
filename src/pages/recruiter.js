// ── Recruiter Dashboard ──

import { renderSidebar } from '../components/nav.js';

const NETWORK_CANDIDATES = [
  { 
    name: 'Reyyan Sayyed', 
    initials: 'RS', 
    score: 92, 
    contributions: 12, 
    skills: ['React', 'Node.js', 'Python'],
    identity: 'Backend-heavy systems contributor',
    hash: 'SKX-a7f3c2e8',
    slug: 'reyyan-sayyed'
  },
  { 
    name: 'Aria Chen', 
    initials: 'AC', 
    score: 88, 
    contributions: 9, 
    skills: ['Rust', 'Distributed Systems', 'Go'],
    identity: 'Full-stack infrastructure engineer',
    hash: 'SKX-b2d4f1a3',
    slug: 'aria-chen'
  },
  { 
    name: 'Marcus Johnson', 
    initials: 'MJ', 
    score: 84, 
    contributions: 15, 
    skills: ['React', 'D3.js', 'Figma'],
    identity: 'Data visualization specialist',
    hash: 'SKX-c9e8d5b7',
    slug: 'marcus-johnson'
  }
];

export function renderRecruiter(activeTab = 'evaluation') {
  let mainContent = '';

  if (activeTab === 'talent') {
    mainContent = `
      <div class="dash-header">
        <h1 class="font-display" style="font-size: var(--text-4xl);">Global Talent Network</h1>
        <p style="color: var(--text-secondary); max-width: 520px; line-height: 1.6; margin-top: var(--space-2);">Directly search the cryptographic professional ledger for verifiable experiences and verified tech stacks.</p>
      </div>

      <div class="card liquid-glass" style="margin-bottom: var(--space-6); padding: var(--space-4); display: flex; gap: var(--space-4);">
        <div style="flex:1; position:relative;">
          <input type="text" placeholder="Search by skill, blockchain hash, or role..." style="width:100%; padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-strong); background: transparent; color: var(--text-primary); outline: none;">
        </div>
        <button class="btn btn-primary" style="padding: 0 var(--space-6);">Search Ledger</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--space-4);" class="stagger-in">
        ${NETWORK_CANDIDATES.map(c => `
          <div class="card liquid-glass-border" style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) var(--space-6);">
            <div style="display: flex; align-items: center; gap: var(--space-4);">
              <div class="avatar avatar-lg" style="background: var(--bg-dark); color: white; border-radius: var(--radius-md); font-family: var(--font-display); font-weight: 700;">${c.initials}</div>
              <div>
                <div class="font-heading" style="font-size: var(--text-lg);">${c.name}</div>
                <div style="font-size: var(--text-sm); color: var(--text-secondary);">${c.identity}</div>
              </div>
            </div>
            <div style="display: flex; gap: var(--space-4); align-items: center;">
              <div style="text-align: right; margin-right: var(--space-4);">
                <div style="font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--accent-green);">${c.score}% Match</div>
              </div>
              <a href="#/passport/${c.slug}" class="btn btn-secondary btn-sm">View Passport</a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (activeTab === 'reports') {
    mainContent = `
      <div class="dash-header" style="border-bottom: 1px solid var(--border-default); padding-bottom: var(--space-6); margin-bottom: var(--space-8);">
        <h1 class="font-display" style="font-size: var(--text-4xl);">System Reports</h1>
        <p style="color: var(--text-secondary); max-width: 520px; line-height: 1.6; margin-top: var(--space-2);">Analytics and performance data for evaluated candidates over time.</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); margin-bottom: var(--space-6);">
        <div class="card liquid-glass" style="padding: var(--space-6);">
          <div class="label" style="font-size: 10px;">Total Evaluations (30d)</div>
          <div class="font-display" style="font-size: var(--text-5xl); margin-top: var(--space-2); color: var(--text-primary);">1,248</div>
          <div style="color: var(--accent-green); font-size: var(--text-xs); margin-top: var(--space-2); font-weight: 600;">↑ 12.4% Pipeline Growth</div>
        </div>
        <div class="card liquid-glass" style="padding: var(--space-6);">
          <div class="label" style="font-size: 10px;">Avg Trust Score</div>
          <div class="font-display" style="font-size: var(--text-5xl); margin-top: var(--space-2); color: var(--accent-purple);">86.4%</div>
          <div style="color: var(--text-tertiary); font-size: var(--text-xs); margin-top: var(--space-2);">Top Decile Performance</div>
        </div>
      </div>

      <div class="card liquid-glass" style="padding: var(--space-6); height: 260px; display: flex; flex-direction: column;">
        <div class="label" style="font-size: 10px; margin-bottom: var(--space-4);">Historical Evaluation Velocity</div>
        <div style="flex:1; display:flex; align-items:flex-end; gap: var(--space-2); padding-top: var(--space-6);">
          ${[40, 65, 45, 80, 55, 90, 75, 100, 85].map(h => `
            <div style="flex:1; background: var(--border-strong); height: ${h}%; border-radius: var(--radius-sm) var(--radius-sm) 0 0; position: relative;" class="hover-bar">
              <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: var(--accent-purple); height: ${h * 0.7}%; border-radius: inherit; transition: opacity 0.3s;" opacity="0.8"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (activeTab === 'settings') {
    mainContent = `
      <div class="dash-header" style="border-bottom: 1px solid var(--border-default); padding-bottom: var(--space-6); margin-bottom: var(--space-8);">
        <h1 class="font-display" style="font-size: var(--text-4xl);">Network Settings</h1>
        <p style="color: var(--text-secondary); max-width: 520px; line-height: 1.6; margin-top: var(--space-2);">Manage your integration hooks and ATS export configurations.</p>
      </div>

      <div class="card liquid-glass" style="padding: var(--space-8); max-width: 700px;">
        <div style="margin-bottom: var(--space-8);">
          <label class="label" style="display:block; margin-bottom: var(--space-2);">ATS Webhook URL</label>
          <input type="text" value="https://api.workday.com/v1/skillx/ingest" disabled style="width: 100%; padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); color: var(--text-secondary); outline: none;">
          <p style="font-size: 11px; color: var(--accent-green); margin-top: 8px;">Connected & Active</p>
        </div>

        <div style="margin-bottom: var(--space-8); border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-6);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: var(--text-base);">Automated Evaluation Triggers</div>
              <div style="color: var(--text-tertiary); font-size: 13px; margin-top: 4px;">Trigger new background pull every 30 days</div>
            </div>
            <div style="width: 44px; height: 24px; background: var(--accent-green); border-radius: 12px; position:relative; cursor:pointer;">
              <div style="width:20px; height:20px; background:white; position:absolute; right:2px; top:2px; border-radius:50%; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"></div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: var(--space-8);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: var(--text-base);">Strict Node Auditing</div>
              <div style="color: var(--text-tertiary); font-size: 13px; margin-top: 4px;">Only surface candidates with &gt;90% cryptographic confidence</div>
            </div>
            <div style="width: 44px; height: 24px; background: var(--border-strong); border-radius: 12px; position:relative; cursor:pointer;">
              <div style="width:20px; height:20px; background:white; position:absolute; left:2px; top:2px; border-radius:50%; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"></div>
            </div>
          </div>
        </div>

        <button class="btn btn-primary">Save Configuration</button>
      </div>
    `;
  } else {
    // Default Evaluation view
    mainContent = `
      <div class="dash-header" style="border-bottom: 1px solid var(--border-default); padding-bottom: var(--space-6); margin-bottom: var(--space-8);">
        <div class="label" style="color: var(--accent-purple); margin-bottom: var(--space-2);">
          <span class="badge" style="background: var(--accent-purple-light); color: var(--accent-purple); border-color: transparent; margin-right: 6px;">Evaluation Node</span>
          Verified Talent Pipeline
        </div>
        <h1 class="font-display" style="font-size: var(--text-4xl);">Candidate Intelligence</h1>
        <p style="color: var(--text-secondary); max-width: 520px; line-height: 1.6; margin-top: var(--space-2);">
          Access cryptographically verified contribution data. Evaluate proof, not claims.
        </p>
      </div>

      <!-- Filter bar -->
      <div class="card liquid-glass" style="margin-bottom: var(--space-8); padding: var(--space-4) var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: var(--space-4); align-items: center;">
            <div class="label" style="font-size: 10px; align-self: center;">Filters:</div>
            <span class="skill-tag" style="background: var(--bg-inset);">Min Score: 80%+</span>
            <span class="skill-tag" style="background: var(--bg-inset);">Backend Engineering</span>
            <span class="skill-tag" style="background: var(--bg-inset);">Full-Stack</span>
          </div>
          <div style="font-family: var(--font-mono); font-size: 10px; color: var(--text-tertiary); display: flex; align-items: center; gap: 8px;">
            <span class="sync-ping"></span>
            Nodes Sync: 100% OK
          </div>
        </div>
      </div>

      <!-- Candidate Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-6);" class="stagger-in">
        ${NETWORK_CANDIDATES.map(c => `
          <div class="card liquid-glass-border" style="padding: 0; border-radius: var(--radius-xl); overflow: hidden;">
            <div style="padding: var(--space-6);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4);">
                <div style="display: flex; gap: var(--space-4); align-items: center;">
                  <div class="avatar avatar-lg" style="background: var(--bg-dark); color: white; border-radius: var(--radius-md); font-family: var(--font-display); font-weight: 700;">${c.initials}</div>
                  <div>
                    <div class="font-heading" style="font-size: var(--text-xl);">${c.name}</div>
                    <div style="font-family: var(--font-mono); font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">VERIFIED NODE: ${c.hash.split('-')[1]}</div>
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; color: var(--accent-green);">${c.score}%</div>
                  <div class="label" style="font-size: 8px;">Trust Score</div>
                </div>
              </div>

              <div style="background: var(--bg-inset); padding: var(--space-3); border-radius: var(--radius-md); border-left: 3px solid var(--accent-purple); margin-bottom: var(--space-4);">
                <div class="label" style="font-size: 8px; margin-bottom: 2px;">AI Identity Summary</div>
                <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.4;">
                  ${c.identity}
                </p>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: var(--space-6);">
                ${c.skills.map(s => `<span class="skill-tag" style="font-size: 9px; font-family: var(--font-mono);">${s}</span>`).join('')}
              </div>

              <div style="display: flex; gap: var(--space-2);">
                <a href="#/passport/${c.slug}" class="btn btn-secondary btn-sm" style="flex: 1; font-family: var(--font-body);">Evaluate Passport</a>
                <button class="btn btn-primary btn-sm btn-icon" title="Save Candidate" id="save-${c.slug}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Verified Ecosystem Status (Dynamic Backdrop) -->
      <div style="margin-top: var(--space-12);">
        <h3 class="label" style="font-size: 10px; margin-bottom: var(--space-4);">Global Network Contribution Activity</h3>
        <div class="card liquid-glass" style="padding: var(--space-4); opacity: 0.6;">
            ${renderEcosystemHeatmap()}
        </div>
      </div>
    `;
  }

  return `
    <div class="dashboard-layout recruiter-experience">
      ${renderSidebar(activeTab)}
      <div class="dash-main page-enter">
        ${mainContent}
      </div>
    </div>
  `;
}

function renderEcosystemHeatmap() {
  const blocks = [];
  for (let i = 0; i < 60; i++) {
    const level = Math.floor(Math.random() * 5);
    const color = ['var(--bg-inset)', 'rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.4)', 'rgba(34, 197, 94, 0.6)', 'var(--accent-green)'][level];
    blocks.push(`<div style="background: ${color}; border-radius: 1px; aspect-ratio: 1; min-width: 8px;"></div>`);
  }
  return `<div style="display: grid; grid-template-columns: repeat(20, 1fr); gap: 2px;">${blocks.join('')}</div>`;
}

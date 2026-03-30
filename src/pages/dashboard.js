import { renderSidebar } from '../components/nav.js';

// ── Heatmap: 364 days of chronological contribution data ──
function generateHeatmapData() {
  const cells = [];
  const endDate = new Date('2026-03-30T12:00:00Z');
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 363); 

  for (let idx = 0; idx < 364; idx++) {
    const rand = Math.random();
    let level = 0;
    if (rand > 0.65) level = 1;
    if (rand > 0.78) level = 2;
    if (rand > 0.88) level = 3;
    if (rand > 0.96) level = 4;
    
    // Cluster high activity in recent weeks
    if (idx > 300 && rand > 0.4) level = Math.max(level, 2);

    const current = new Date(startDate);
    current.setDate(startDate.getDate() + idx);
    
    const count = level === 0 ? 0 : Math.floor(Math.random() * 7 * level) + 1;
    const dateStr = current.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    cells.push({ date: dateStr, level, count });
  }
  return cells;
}

const HEATMAP = generateHeatmapData();
const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

const PROJECTS = [
  { name: 'SkillX Platform', icon: '🔐', iconBg: '#DCFCE7', team: 4, tasks: 18, contrib: 38, lastActivity: '2h ago', href: '#/project/skillx-platform', role: 'Lead', breakdown: { fe: 28, be: 52, ai: 20 } },
  { name: 'WasteWise', icon: '♻️', iconBg: '#E0F2FE', team: 5, tasks: 14, contrib: 28, lastActivity: '1d ago', href: '#/project/wastewise', role: 'Contributor', breakdown: { fe: 35, be: 30, ai: 35 } },
  { name: 'Posturely', icon: '🧘', iconBg: '#F5F3FF', team: 3, tasks: 11, contrib: 45, lastActivity: '3d ago', href: '#/project/posturely', role: 'Lead', breakdown: { fe: 20, be: 25, ai: 55 } },
  { name: 'EduTrack Analytics', icon: '📊', iconBg: '#FEF3C7', team: 6, tasks: 22, contrib: 19, lastActivity: '1w ago', href: '#/project/edutrack', role: 'Support', breakdown: { fe: 60, be: 30, ai: 10 } },
];

const DERIVED_SKILLS = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Python', 'TensorFlow', 'REST APIs', 'System Design', 'Express', 'D3.js'];

const ACTIVITY_LOG = [
  { text: 'Completed <strong>Authentication system</strong> · SkillX Platform', time: '2h ago', type: 'verified', color: 'var(--accent-green)' },
  { text: 'Logged <strong>Route optimization algorithm</strong> · WasteWise', time: '1d ago', type: 'logged', color: 'var(--accent-blue)' },
  { text: 'Evidence strength upgraded → <strong>Strong</strong> · Auth system', time: '2d ago', type: 'evidence', color: 'var(--accent-purple)' },
  { text: 'Completed <strong>Posture detection model</strong> · Posturely', time: '3d ago', type: 'verified', color: 'var(--accent-green)' },
  { text: 'Passport updated · <strong>3 new contributions</strong> added', time: '4d ago', type: 'passport', color: 'var(--accent-orange)' },
  { text: 'Team endorsed <strong>Database schema design</strong>', time: '5d ago', type: 'endorsed', color: 'var(--accent-green)' },
];

function renderHeatmap() {
  const colors = [
    'var(--bg-inset)',
    'rgba(22,163,74,0.25)',
    'rgba(22,163,74,0.45)',
    'rgba(22,163,74,0.70)',
    'var(--accent-green)',
  ];

  let blocks = '';
  HEATMAP.forEach(cell => {
    const tooltip = cell.count === 0 ? `No contributions on ${cell.date}` : `${cell.count} contributions on ${cell.date}`;
    blocks += `<div style="background: ${colors[cell.level]}; border-radius: 2px; width: 100%; aspect-ratio: 1; transition: transform 0.2s, background 0.2s;" title="${tooltip}" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"></div>`;
  });

  let monthLabels = '';
  MONTHS.forEach((m) => {
    monthLabels += `<div style="flex: 1; font-size: 10px; color: var(--text-tertiary); font-family: var(--font-mono);">${m}</div>`;
  });

  return `
    <div style="width: 100%;">
      <div style="display: flex; margin-bottom: 8px; padding-left: 2px;">
        ${monthLabels}
      </div>
      <div style="display: grid; grid-template-rows: repeat(7, 1fr); grid-auto-flow: column; gap: 4px; width: 100%;">
        ${blocks}
      </div>
    </div>
  `;
}

export function renderDashboard(activeTab = 'overview') {
  let mainContent = '';

  if (activeTab === 'settings') {
    mainContent = `
      <div class="dash-header" style="border-bottom: 1px solid var(--border-default); padding-bottom: var(--space-6); margin-bottom: var(--space-8);">
        <h1 class="font-display" style="font-size: var(--text-4xl);">Student Integration Settings</h1>
        <p style="color: var(--text-secondary); max-width: 520px; line-height: 1.6; margin-top: var(--space-2);">Manage your Github OAuth sync, contribution parsers, and public key generation.</p>
      </div>
      <div class="card liquid-glass" style="text-align: center; padding: var(--space-12);">
        <div class="font-heading" style="font-size: var(--text-2xl); margin-bottom: var(--space-4);">GitHub Integration</div>
        <p style="color: var(--text-tertiary);">Your repository contributions are synchronized automatically.</p>
        <button class="btn btn-secondary" style="margin-top: var(--space-6);">Force Re-Sync</button>
      </div>
    `;
  } else {
    mainContent = `
      <!-- Header: Identity -->
      <div class="dash-header" style="margin-bottom: var(--space-6);">
        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:var(--space-4);">
          <div>
            <div class="label" style="margin-bottom:var(--space-2);">Contribution Identity</div>
            <h1 style="font-family:var(--font-heading); font-size:clamp(1.5rem,3vw,2.2rem); letter-spacing:-0.02em; margin-bottom:var(--space-2);">Backend-heavy systems contributor</h1>
            <p style="color:var(--text-secondary); max-width:520px; line-height:1.6; font-size:var(--text-sm);">
              You consistently own backend architecture, authentication flows, and data systems.
              Highest verified impact: 42% contribution weight on a production engine.
            </p>
          </div>
          <a href="#/passport/reyyan-sayyed" class="passport-preview-chip" id="dash-passport-link">
            <div class="pp-status"></div>
            <div>
              <div style="font-weight:600; font-size:var(--text-xs);">Active Passport</div>
              <div style="font-size:10px; color:var(--text-tertiary); font-family:var(--font-mono);">SKX-2026-03-30-a7f3c2e8</div>
            </div>
            <span class="badge badge-verified" style="flex-shrink:0;">Verified</span>
          </a>
        </div>
      </div>

      <!-- Skill tags derived from tasks -->
      <div style="display:flex; flex-wrap:wrap; gap:var(--space-2); margin-bottom:var(--space-8);">
        <span class="label" style="align-self:center; margin-right:var(--space-1);">Derived skills:</span>
        ${DERIVED_SKILLS.map((s, i) => {
          const level = i < 4 ? 'expert' : i < 7 ? 'advanced' : 'intermediate';
          return `<span class="skill-tag" data-level="${level}" style="font-size:11px;">${s}</span>`;
        }).join('')}
      </div>

      <!-- Stats grid -->
      <div class="stats-grid stagger-in" id="stats-grid">
        <div class="stat-block">
          <div class="stat-value">4</div>
          <div class="stat-label">Active Projects</div>
          <div class="stat-change text-accent">↑ 1 this month</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">47</div>
          <div class="stat-label">Tasks Completed</div>
          <div class="stat-change text-accent">↑ 8 this week</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">12</div>
          <div class="stat-label">Verified Contributions</div>
          <div class="stat-change text-accent">↑ 3 this month</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">92<span style="font-size:var(--text-lg);">%</span></div>
          <div class="stat-label">Global Contrib. Score</div>
          <div class="stat-change text-accent">Excellent</div>
        </div>
      </div>

      <!-- Contribution heatmap -->
      <div class="card liquid-glass" style="margin-bottom:var(--space-6); padding:var(--space-5);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);">
          <div class="label" style="font-size: 10px;">Contribution Activity · Last 12 Months</div>
          <div style="display:flex; align-items:center; gap:var(--space-2);">
            <span style="font-size:10px; color:var(--text-tertiary);">Less</span>
            ${[0,1,2,3,4].map(l => `<div style="width:10px;height:10px;border-radius:2px;display:inline-block;background:${['var(--bg-inset)','rgba(22,163,74,0.25)','rgba(22,163,74,0.45)','rgba(22,163,74,0.70)','var(--accent-green)'][l]};"></div>`).join('')}
            <span style="font-size:10px; color:var(--text-tertiary);">More</span>
          </div>
        </div>
        <div style="overflow-x:auto;">
          ${renderHeatmap()}
        </div>
      </div>

      <!-- Projects -->
      <div style="margin-bottom:var(--space-8);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);">
          <h3 style="font-family:var(--font-heading);">Projects</h3>
          <button class="btn btn-secondary btn-sm" id="btn-new-project">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Project
          </button>
        </div>
        <div style="display:flex; flex-direction:column; gap:var(--space-3);" class="stagger-in">
          ${PROJECTS.map(p => `
            <a href="${p.href}" class="project-card liquid-glass-border" id="project-${p.name.toLowerCase().replace(/\s+/g, '-')}">
              <div class="project-icon" style="background:${p.iconBg};">${p.icon}</div>
              <div class="project-info">
                <div class="project-name">
                  ${p.name}
                  <span class="role-tag role-${p.role.toLowerCase()}">${p.role}</span>
                </div>
                <div class="project-meta">
                  <span>${p.team} members</span>
                  <span>·</span>
                  <span>${p.tasks} tasks</span>
                  <span>·</span>
                  <span>${p.lastActivity}</span>
                </div>
                <!-- Breakdown bar -->
                <div class="breakdown-bar" title="FE ${p.breakdown.fe}% · BE ${p.breakdown.be}% · AI ${p.breakdown.ai}%">
                  <div class="bb-fe" style="width:${p.breakdown.fe}%;"></div>
                  <div class="bb-be" style="width:${p.breakdown.be}%;"></div>
                  <div class="bb-ai" style="width:${p.breakdown.ai}%;"></div>
                </div>
                <div style="display:flex; gap:var(--space-3); margin-top:2px;">
                  <span style="font-size:10px; color:var(--accent-blue);">FE ${p.breakdown.fe}%</span>
                  <span style="font-size:10px; color:var(--accent-green);">BE ${p.breakdown.be}%</span>
                  <span style="font-size:10px; color:var(--accent-purple);">AI ${p.breakdown.ai}%</span>
                </div>
              </div>
              <div class="project-contrib">
                <div class="project-contrib-val">${p.contrib}%</div>
                <div class="project-contrib-label">Your contrib</div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Activity log -->
      <div>
        <h3 style="font-family:var(--font-heading); margin-bottom:var(--space-4);">System Log</h3>
        <div class="card liquid-glass card-flush">
          <div style="padding:var(--space-1) 0;">
            ${ACTIVITY_LOG.map((a, i) => `
              <div class="activity-item">
                <div class="activity-dot" style="background:${a.color};"></div>
                <div class="activity-content">
                  <div class="activity-text">${a.text}</div>
                  <div class="activity-time">
                    <span class="font-mono" style="font-size:10px; color:var(--text-tertiary);">${a.time}</span>
                    <span class="activity-type-tag">${a.type}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="dashboard-layout" style="background:transparent;">
      ${renderSidebar(activeTab)}
      <div class="dash-main page-enter">
        ${mainContent}
      </div>
    </div>
  `;
}

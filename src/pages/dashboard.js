import { renderSidebar } from '../components/nav.js';
import { AUTH } from '../utils/auth.js';
import { STUDENTS_DATA } from '../data/students.js';

// ── Heatmap: 364 days of chronological contribution data ──
function generateHeatmapData(seed) {
  const cells = [];
  const endDate = new Date('2026-03-30T12:00:00Z');
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 363); 

  for (let idx = 0; idx < 364; idx++) {
    const rand = Math.abs(Math.sin(seed + idx));
    let level = 0;
    if (rand > 0.65) level = 1;
    if (rand > 0.78) level = 2;
    if (rand > 0.88) level = 3;
    if (rand > 0.96) level = 4;
    
    // Cluster high activity in recent weeks
    if (idx > 300 && rand > 0.4) level = Math.max(level, 2);

    const current = new Date(startDate);
    current.setDate(startDate.getDate() + idx);
    
    const count = level === 0 ? 0 : Math.floor((rand * 7) * level) + 1;
    const dateStr = current.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    cells.push({ date: dateStr, level, count });
  }
  return cells;
}

const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

const ACTIVITY_LOG = [
  { text: 'Completed <strong>Authentication system</strong> · SkillX Platform', time: '2h ago', type: 'verified', color: 'var(--accent-green)' },
  { text: 'Logged <strong>Route optimization algorithm</strong> · WasteWise', time: '1d ago', type: 'logged', color: 'var(--accent-blue)' },
  { text: 'Evidence strength upgraded → <strong>Strong</strong> · Auth system', time: '2d ago', type: 'evidence', color: 'var(--accent-purple)' },
  { text: 'Completed <strong>Posture detection model</strong> · Posturely', time: '3d ago', type: 'verified', color: 'var(--accent-green)' },
  { text: 'Passport updated · <strong>3 new contributions</strong> added', time: '4d ago', type: 'passport', color: 'var(--accent-orange)' },
  { text: 'Team endorsed <strong>Database schema design</strong>', time: '5d ago', type: 'endorsed', color: 'var(--accent-green)' },
];

function renderHeatmap(studentId) {
  const colors = [
    'var(--bg-inset)',
    'rgba(22,163,74,0.25)',
    'rgba(22,163,74,0.45)',
    'rgba(22,163,74,0.70)',
    'var(--accent-green)',
  ];

  const HEATMAP = generateHeatmapData(studentId * 100);

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
  
  const user = AUTH.getUser();
  const studentId = user && user.id ? user.id : 1;
  const student = STUDENTS_DATA[studentId] || STUDENTS_DATA[1];

  if (activeTab === 'settings') {
    mainContent = `
      <div class="dash-header" style="border-bottom: 1px solid var(--border-default); padding-bottom: var(--space-6); margin-bottom: var(--space-8);">
        <h1 class="font-display" style="font-size: var(--text-4xl);">Student Integration Settings</h1>
        <p style="color: var(--text-secondary); max-width: 520px; line-height: 1.6; margin-top: var(--space-2);">Manage your Github OAuth sync, contribution parsers, and public key generation.</p>
      </div>
      <div class="card liquid-glass" style="text-align: center; padding: var(--space-12);">
        <div class="font-heading" style="font-size: var(--text-2xl); margin-bottom: var(--space-4);">GitHub Integration</div>
        <p style="color: var(--text-tertiary); margin-bottom: var(--space-6);">Enter your GitHub username to link your repositories and fetch your digital footprint.</p>
        
        <div style="display:flex; justify-content:center; gap:var(--space-2); max-width: 400px; margin: 0 auto var(--space-6);">
            <input type="text" id="github-username-input" placeholder="GitHub Username..." style="flex:1; padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-strong); background: transparent; color: var(--text-primary); outline: none;" />
            <button class="btn btn-primary" id="btn-sync-github">Sync GitHub</button>
        </div>

        <div id="github-result-container" style="display:none; text-align: left; background: var(--bg-surface); padding: var(--space-6); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); max-width: 400px; margin: 0 auto;">
           <div style="display: flex; gap: var(--space-4); align-items: center;">
              <img id="github-avatar" src="" style="width: 56px; height: 56px; border-radius: 50%;" />
              <div>
                  <div id="github-name" class="font-heading" style="font-size: var(--text-lg);"></div>
                  <div id="github-login" style="font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary);"></div>
                  <div id="github-joined" style="font-size: 10px; color: var(--text-tertiary); margin-top: 2px;"></div>
              </div>
           </div>
           <div id="github-bio" style="font-size: 13px; color: var(--text-secondary); margin-top: var(--space-4);"></div>
           
           <div style="display: flex; flex-direction: column; gap: 4px; margin-top: var(--space-3); font-size: 12px; color: var(--text-secondary);">
             <div id="github-company" style="display: none;">🏢 <span id="github-company-text"></span></div>
             <div id="github-location" style="display: none;">📍 <span id="github-location-text"></span></div>
           </div>

           <div style="display: flex; flex-wrap: wrap; gap: var(--space-4); margin-top: var(--space-4); font-size: 12px; color: var(--text-primary); font-family: var(--font-mono); border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
              <div><span style="font-weight:700; color:var(--accent-green);" id="github-repos"></span> Repos</div>
              <div><span style="font-weight:700; color:var(--accent-green);" id="github-gists"></span> Gists</div>
              <div><span style="font-weight:700; color:var(--accent-green);" id="github-followers"></span> Followers</div>
              <div><span style="font-weight:700; color:var(--accent-green);" id="github-following"></span> Following</div>
           </div>
        </div>
      </div>
    `;
  } else {
    mainContent = `
      <!-- Header: Identity -->
      <div class="dash-header" style="margin-bottom: var(--space-6);">
        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:var(--space-4);">
          <div>
            <div class="label" style="margin-bottom:var(--space-2);">Contribution Identity</div>
            <h1 style="font-family:var(--font-heading); font-size:clamp(1.5rem,3vw,2.2rem); letter-spacing:-0.02em; margin-bottom:var(--space-2);">${student.identity}</h1>
            <p style="color:var(--text-secondary); max-width:520px; line-height:1.6; font-size:var(--text-sm);">
              ${student.identitySub}
            </p>
          </div>
          <a href="#/passport/${student.name.toLowerCase().replace(/\s+/g, '-')}" class="passport-preview-chip" id="dash-passport-link">
            <div class="pp-status"></div>
            <div>
              <div style="font-weight:600; font-size:var(--text-xs);">Active Passport</div>
              <div style="font-size:10px; color:var(--text-tertiary); font-family:var(--font-mono);">${student.hash.substring(0, 24)}...</div>
            </div>
            <span class="badge badge-verified" style="flex-shrink:0;">Verified</span>
          </a>
        </div>
      </div>

      <!-- Skill tags derived from tasks -->
      <div style="display:flex; flex-wrap:wrap; gap:var(--space-2); margin-bottom:var(--space-8);">
        <span class="label" style="align-self:center; margin-right:var(--space-1);">Derived skills:</span>
        ${student.derivedSkills.map((s, i) => {
          const level = i < 4 ? 'expert' : i < 7 ? 'advanced' : 'intermediate';
          return `<span class="skill-tag" data-level="${level}" style="font-size:11px;">${s}</span>`;
        }).join('')}
      </div>

      <!-- Stats grid -->
      <div class="stats-grid stagger-in" id="stats-grid">
        <div class="stat-block">
          <div class="stat-value">${student.activeProjects}</div>
          <div class="stat-label">Active Projects</div>
          <div class="stat-change text-accent">↑ 1 this month</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">${student.tasksCompleted}</div>
          <div class="stat-label">Tasks Completed</div>
          <div class="stat-change text-accent">↑ 8 this week</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">${student.verifiedContributions}</div>
          <div class="stat-label">Verified Contributions</div>
          <div class="stat-change text-accent">↑ 3 this month</div>
        </div>
        <div class="stat-block">
          <div class="stat-value">${student.globalScore}<span style="font-size:var(--text-lg);">%</span></div>
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
          ${renderHeatmap(studentId)}
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
          ${student.projects.map(p => `
            <a href="${p.href}" class="project-card liquid-glass-border" id="project-${p.name.toLowerCase().replace(/\s+/g, '-')}">
              <div class="project-icon" style="background:${p.iconBg};">${p.icon}</div>
              <div class="project-info">
                <div class="project-name">
                  ${p.name}
                  <span class="role-tag role-${p.role.toLowerCase().replace(/\s/g, '-')}">${p.role}</span>
                </div>
                <div class="project-meta">
                  <span>${p.team} members</span>
                  <span>·</span>
                  <span>${p.tasks} tasks</span>
                  <span>·</span>
                  <span>${p.lastActivity}</span>
                </div>
                <!-- Breakdown bar -->
                <div class="breakdown-bar" title="FE ${p.breakdown.fe || 0}% · BE ${p.breakdown.be || 0}% · AI ${p.breakdown.ai || 0}%">
                  <div class="bb-fe" style="width:${p.breakdown.fe || 0}%;"></div>
                  <div class="bb-be" style="width:${p.breakdown.be || 0}%;"></div>
                  <div class="bb-ai" style="width:${p.breakdown.ai || 0}%;"></div>
                </div>
                <div style="display:flex; gap:var(--space-3); margin-top:2px;">
                  <span style="font-size:10px; color:var(--accent-blue);">FE ${p.breakdown.fe || 0}%</span>
                  <span style="font-size:10px; color:var(--accent-green);">BE ${p.breakdown.be || 0}%</span>
                  <span style="font-size:10px; color:var(--accent-purple);">AI ${p.breakdown.ai || 0}%</span>
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

      <!-- Curated Opportunities -->
      <div style="margin-top:var(--space-8);">
        <h3 style="font-family:var(--font-heading); margin-bottom:var(--space-2);">Curated Opportunities</h3>
        <p style="color:var(--text-secondary); margin-bottom:var(--space-4); font-size:var(--text-sm);">Connect your verified skills to real-world roles.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-4);" class="stagger-in">
          
          <!-- Card 1: Web Developer -->
          <div class="card liquid-glass" style="display: flex; flex-direction: column; padding: var(--space-5);">
            <div style="font-size: 16px; font-weight: 600; font-family: var(--font-heading); margin-bottom: var(--space-1);">Web Developer</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-3); line-height: 1.4;">Build and optimize responsive frontend interfaces.</div>
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-5);">
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">React</span>
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">JavaScript</span>
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">CSS</span>
            </div>
            <a href="https://internshala.com/jobs/web-development-jobs/work-from-home" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="margin-top: auto; text-align: center; justify-content: center; width: 100%;">
              View Opportunities
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

          <!-- Card 2: AI Engineer -->
          <div class="card liquid-glass" style="display: flex; flex-direction: column; padding: var(--space-5);">
            <div style="font-size: 16px; font-weight: 600; font-family: var(--font-heading); margin-bottom: var(--space-1);">AI Engineer</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-3); line-height: 1.4;">Develop and deploy machine learning models.</div>
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-5);">
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">Python</span>
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">PyTorch</span>
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">ML</span>
            </div>
            <a href="https://internshala.com/jobs/artificial-intelligence-ai-jobs/work-from-home/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="margin-top: auto; text-align: center; justify-content: center; width: 100%;">
              View Opportunities
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

          <!-- Card 3: Backend Developer -->
          <div class="card liquid-glass" style="display: flex; flex-direction: column; padding: var(--space-5);">
            <div style="font-size: 16px; font-weight: 600; font-family: var(--font-heading); margin-bottom: var(--space-1);">Backend Developer</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-3); line-height: 1.4;">Architect scalable APIs and server-side logic.</div>
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-5);">
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">Node.js</span>
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">PostgreSQL</span>
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">AWS</span>
            </div>
            <a href="https://internshala.com/jobs/backend-development-jobs/work-from-home" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="margin-top: auto; text-align: center; justify-content: center; width: 100%;">
              View Opportunities
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

          <!-- Card 4: Data Analyst -->
          <div class="card liquid-glass" style="display: flex; flex-direction: column; padding: var(--space-5);">
            <div style="font-size: 16px; font-weight: 600; font-family: var(--font-heading); margin-bottom: var(--space-1);">Data Analyst</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-3); line-height: 1.4;">Extract insights from complex data sets.</div>
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-5);">
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">SQL</span>
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">Python</span>
              <span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">Pandas</span>
            </div>
            <a href="https://internshala.com/jobs/data-science-jobs/work-from-home" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="margin-top: auto; text-align: center; justify-content: center; width: 100%;">
              View Opportunities
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

        </div>
      </div>
    `;
  }

  return `
    <div class="dashboard-layout" style="background:transparent; padding-top: 100px;">
      ${renderSidebar(activeTab)}
      <div class="dash-main page-enter">
        ${mainContent}
      </div>
    </div>
  `;
}

export function initDashboardInteractions() {
  const syncBtn = document.getElementById('btn-sync-github');
  const userInp = document.getElementById('github-username-input');

  if (syncBtn && userInp) {
    syncBtn.addEventListener('click', async () => {
      const username = userInp.value.trim();
      if (!username) return;
      
      const prevText = syncBtn.innerText;
      syncBtn.innerText = 'Syncing...';
      syncBtn.disabled = true;

      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error('User not found. Check for typos!');
          if (res.status === 403) throw new Error('GitHub API rate limit exceeded.');
          throw new Error('GitHub API error.');
        }
        const data = await res.json();
        
        document.getElementById('github-result-container').style.display = 'block';
        document.getElementById('github-avatar').src = data.avatar_url;
        document.getElementById('github-name').innerText = data.name || data.login;
        document.getElementById('github-login').innerText = '@' + data.login;
        document.getElementById('github-joined').innerText = 'Joined ' + new Date(data.created_at).getFullYear();
        document.getElementById('github-bio').innerText = data.bio || 'No bio provided.';
        
        if (data.company) {
          document.getElementById('github-company').style.display = 'block';
          document.getElementById('github-company-text').innerText = data.company;
        } else {
          document.getElementById('github-company').style.display = 'none';
        }
        
        if (data.location) {
          document.getElementById('github-location').style.display = 'block';
          document.getElementById('github-location-text').innerText = data.location;
        } else {
          document.getElementById('github-location').style.display = 'none';
        }

        document.getElementById('github-repos').innerText = data.public_repos;
        document.getElementById('github-gists').innerText = data.public_gists;
        document.getElementById('github-followers').innerText = data.followers;
        document.getElementById('github-following').innerText = data.following;
      } catch (err) {
        alert(err.message);
        document.getElementById('github-result-container').style.display = 'none';
      } finally {
        syncBtn.innerText = prevText;
        syncBtn.disabled = false;
      }
    });

    userInp.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        syncBtn.click();
      }
    });
  }
}


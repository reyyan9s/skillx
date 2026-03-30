import { renderSidebar } from '../components/nav.js';

const COLORS = ['#7C3AED', '#2563EB', '#EA580C', '#16A34A', '#CA8A04', '#DC2626'];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('');
}

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

const TEAM = [
  { name: 'Reyyan Sayyed', role: 'Full-Stack Lead', contrib: 38 },
  { name: 'Aria Chen', role: 'Backend Engineer', contrib: 24 },
  { name: 'Marcus Johnson', role: 'Frontend Developer', contrib: 22 },
  { name: 'Priya Patel', role: 'UI/UX Designer', contrib: 16 },
];

const TASKS = {
  todo: [
    { title: 'Implement notification system', assignee: 'Marcus Johnson', skills: ['React', 'WebSocket'], weight: 15, strength: 'weak' },
    { title: 'Add export-to-PDF feature', assignee: 'Priya Patel', skills: ['Canvas API', 'PDF'], weight: 10, strength: 'medium' },
  ],
  inProgress: [
    { title: 'Build AI skill gap analyzer', assignee: 'Reyyan Sayyed', skills: ['Python', 'NLP'], weight: 25, strength: 'strong' },
    { title: 'Create team invitation flow', assignee: 'Aria Chen', skills: ['Node.js', 'Email'], weight: 12, strength: 'medium' },
    { title: 'Design contribution heatmap', assignee: 'Marcus Johnson', skills: ['D3.js', 'SVG'], weight: 18, strength: 'strong' },
  ],
  done: [
    { title: 'Authentication system', assignee: 'Reyyan Sayyed', skills: ['React', 'JWT'], weight: 20, strength: 'strong', hash: 'SKX-a7f3c2e8' },
    { title: 'Database schema design', assignee: 'Aria Chen', skills: ['PostgreSQL'], weight: 15, strength: 'strong', hash: 'SKX-b2d4f1a3' },
    { title: 'Landing page design', assignee: 'Priya Patel', skills: ['Figma', 'CSS'], weight: 12, strength: 'medium', hash: 'SKX-c9e8d5b7' },
    { title: 'API endpoint structure', assignee: 'Reyyan Sayyed', skills: ['Express', 'REST'], weight: 18, strength: 'strong', hash: 'SKX-d3f7a6c1' },
    { title: 'Contribution tracking engine', assignee: 'Reyyan Sayyed', skills: ['TypeScript', 'PostgreSQL'], weight: 22, strength: 'strong', hash: 'SKX-e1b9c4d2' },
  ],
};

const TIMELINE = [
  { title: 'Contribution tracking engine', assignee: 'Reyyan Sayyed', date: 'Mar 28, 2026 · 14:30', hash: 'SKX-e1b9c4d2', skills: ['TypeScript', 'PostgreSQL'], strength: 'strong' },
  { title: 'API endpoint structure', assignee: 'Reyyan Sayyed', date: 'Mar 27, 2026 · 09:15', hash: 'SKX-d3f7a6c1', skills: ['Express', 'REST'], strength: 'strong' },
  { title: 'Landing page design', assignee: 'Priya Patel', date: 'Mar 25, 2026 · 16:45', hash: 'SKX-c9e8d5b7', skills: ['Figma', 'CSS'], strength: 'medium' },
  { title: 'Database schema design', assignee: 'Aria Chen', date: 'Mar 23, 2026 · 11:00', hash: 'SKX-b2d4f1a3', skills: ['PostgreSQL'], strength: 'strong' },
  { title: 'Authentication system', assignee: 'Reyyan Sayyed', date: 'Mar 20, 2026 · 10:22', hash: 'SKX-a7f3c2e8', skills: ['React', 'JWT'], strength: 'strong' },
];

function getStrengthColor(strength) {
  if (strength === 'strong') return 'var(--accent-green)';
  if (strength === 'medium') return 'var(--accent-orange)';
  return 'var(--text-tertiary)';
}

function getStrengthLabel(strength) {
  if (strength === 'strong') return 'Strong Evidence';
  if (strength === 'medium') return 'Medium Evidence';
  return 'Weak Evidence';
}

function renderKanbanCol(title, tasks, status) {
  return `
    <div class="kanban-col">
      <div class="kanban-header">
        <span class="kanban-title">${title}</span>
        <span class="kanban-count">${tasks.length}</span>
      </div>
      ${tasks.map(t => `
        <div class="task-card liquid-glass" id="task-${t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
            <div class="task-title" style="font-family:var(--font-heading); font-size:var(--text-lg); margin-bottom:0;">${t.title}</div>
            <div title="${getStrengthLabel(t.strength)}" style="display:flex; gap:2px; padding-top:4px;">
              <div style="width:4px; height:8px; border-radius:1px; background:${getStrengthColor(t.strength)}; opacity:${t.strength === 'weak' ? 0.3 : 1};"></div>
              <div style="width:4px; height:12px; border-radius:1px; background:${getStrengthColor(t.strength)}; opacity:${t.strength === 'strong' || t.strength === 'medium' ? 1 : 0.3};"></div>
              <div style="width:4px; height:16px; border-radius:1px; background:${getStrengthColor(t.strength)}; opacity:${t.strength === 'strong' ? 1 : 0.3};"></div>
            </div>
          </div>
          <div class="task-tags">
            ${t.skills.map(s => `<span class="skill-tag" style="font-size: 10px; padding: 2px 6px;">${s}</span>`).join('')}
          </div>
          
          <div style="margin-top:var(--space-3); padding:var(--space-2); background:var(--bg-inset); border-radius:var(--radius-sm); border:1px solid var(--border-default);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="label" style="font-size:9px;">Contribution Weight</span>
              <span style="font-family:var(--font-mono); font-weight:600; font-size:var(--text-xs); color:var(--text-primary);">${t.weight}%</span>
            </div>
            ${t.hash ? `<div style="font-size:10px; color:var(--text-tertiary); margin-top:2px;">↳ Immutable record generated</div>` : `<div style="font-size:10px; color:var(--text-tertiary); margin-top:2px;">↳ Will appear in Passport upon completion</div>`}
          </div>

          <div class="task-footer" style="margin-top: var(--space-3); border-top:1px dashed var(--border-default); padding-top:var(--space-2);">
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <div class="avatar avatar-sm" style="background: ${avatarColor(t.assignee)};">${getInitials(t.assignee)}</div>
              <span style="font-size: 11px; font-weight:500; color: var(--text-secondary);">${t.assignee}</span>
            </div>
            ${t.hash ? `<div class="hash-display" style="font-size: 9px; padding: 2px 6px;">${t.hash}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderProject(slug) {
  return `
    <div class="dashboard-layout">
      ${renderSidebar('projects')}
      <div style="flex: 1; overflow-y: auto;">
        <div class="project-header" style="border-bottom: 1px solid var(--border-default); padding-bottom:var(--space-6); margin-bottom:var(--space-6);">
          <div class="project-header-left">
            <div class="project-icon liquid-glass" style="background:rgba(220,252,231,0.5); font-size:24px; width:56px; height:56px; border:1px solid var(--accent-green-mid);">🔐</div>
            <div>
              <div style="display:flex; align-items:center; gap:var(--space-3);">
                <h1 class="font-display" style="margin:0; font-size:var(--text-3xl);">SkillX Platform</h1>
                <span class="role-tag role-lead" style="margin:0;">Lead</span>
                <span class="badge badge-verified">Active verification</span>
              </div>
              <div style="font-size: var(--text-sm); font-family:var(--font-mono); color: var(--text-secondary); display: flex; gap: var(--space-3); margin-top: var(--space-2);">
                <span>4 Members</span>
                <span>·</span>
                <span>18 Tasks</span>
                <span>·</span>
                <span>Created Mar 15, 2026</span>
              </div>
              
              <div style="margin-top:var(--space-3); max-width:400px;">
                <div style="display:flex; justify-content:space-between; font-size:10px; font-family:var(--font-mono); color:var(--text-tertiary); margin-bottom:4px;">
                  <span>System Breakdown</span>
                  <span>FE 28% / BE 52% / AI 20%</span>
                </div>
                <div class="breakdown-bar" style="margin-top:0;">
                  <div class="bb-fe" style="width:28%;"></div>
                  <div class="bb-be" style="width:52%;"></div>
                  <div class="bb-ai" style="width:20%;"></div>
                </div>
              </div>

            </div>
          </div>
          <div style="display: flex; flex-direction:column; align-items:flex-end; gap: var(--space-3);">
            <div style="display:flex; align-items:center; gap:var(--space-3);">
              <div class="avatar-stack">
                ${TEAM.map(m => `<div class="avatar avatar-sm" style="background: ${avatarColor(m.name)}; border-color:var(--bg-primary);" title="${m.name} (${m.contrib}%)">${getInitials(m.name)}</div>`).join('')}
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" style="font-family:var(--font-body);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Log Contribution Task
            </button>
          </div>
        </div>

        <div class="project-content page-enter" style="padding-top:0;">
          <!-- Tabs -->
          <div class="tabs" id="project-tabs" style="margin-bottom:var(--space-6);">
            <button class="tab active" data-tab="tasks" style="font-family:var(--font-mono); text-transform:uppercase; font-size:var(--text-xs); letter-spacing:0.05em;">Verification Tasks</button>
            <button class="tab" data-tab="team" style="font-family:var(--font-mono); text-transform:uppercase; font-size:var(--text-xs); letter-spacing:0.05em;">Team Composition</button>
            <button class="tab" data-tab="timeline" style="font-family:var(--font-mono); text-transform:uppercase; font-size:var(--text-xs); letter-spacing:0.05em;">Immutable Log</button>
          </div>

          <!-- Tasks tab -->
          <div id="tab-tasks">
            <div class="kanban">
              ${renderKanbanCol('To Do', TASKS.todo, 'todo')}
              ${renderKanbanCol('In Progress', TASKS.inProgress, 'inProgress')}
              ${renderKanbanCol('Verified Log', TASKS.done, 'done')}
            </div>
          </div>

          <!-- Team tab -->
          <div id="tab-team" style="display: none;">
            <div class="team-grid">
              ${TEAM.map(m => `
                <div class="team-card liquid-glass" style="padding:var(--space-5);">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div class="avatar avatar-lg" style="background: ${avatarColor(m.name)}; border-radius:var(--radius-md);">${getInitials(m.name)}</div>
                    <span class="role-tag role-${m.role.includes('Lead') ? 'lead' : (m.role.includes('Backend')||m.role.includes('Frontend') ? 'contributor' : 'support')}">${m.role}</span>
                  </div>
                  <div class="team-info" style="margin-top:var(--space-4);">
                    <div class="team-name" style="font-family:var(--font-heading); font-size:var(--text-xl);">${m.name}</div>
                    <div class="team-bar-wrap" style="margin-top:var(--space-4); background:var(--bg-inset); padding:var(--space-3); border-radius:var(--radius-sm);">
                      <div class="team-bar-label" style="font-family:var(--font-mono); font-size:10px; text-transform:uppercase;">
                        <span style="color:var(--text-secondary);">Verified Contribution</span>
                        <span style="font-weight: 700; color: var(--accent-green); font-size:var(--text-sm);">${m.contrib}%</span>
                      </div>
                      <div class="progress-bar progress-green" style="height:4px; margin-top:var(--space-2);">
                        <div class="progress-bar-fill" style="width: ${m.contrib}%;"></div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Timeline tab -->
          <div id="tab-timeline" style="display: none;">
            <div class="card liquid-glass" style="padding:0; border-radius:var(--radius-lg); overflow:hidden;">
              <div style="background:var(--bg-elevated); padding:var(--space-3) var(--space-5); border-bottom:1px solid var(--border-default); display:flex; justify-content:space-between; align-items:center;">
                <span class="label">System Audit Log</span>
                <span class="badge badge-verified">Immutable</span>
              </div>
              <div class="timeline" style="padding:var(--space-6);">
                ${TIMELINE.map(t => `
                  <div class="timeline-item">
                    <div class="timeline-dot completed" style="background:var(--accent-green-light); border-color:var(--accent-green);">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div class="timeline-body liquid-glass" style="padding:var(--space-4); border-radius:var(--radius-md); background:rgba(255,255,255,0.4);">
                      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div>
                          <div class="timeline-title" style="font-family:var(--font-heading); font-size:var(--text-lg);">${t.title}</div>
                          <div class="timeline-meta" style="font-family:var(--font-mono); font-size:10px; margin-top:2px;">
                            ${t.date} · Verified by ${t.assignee}
                          </div>
                        </div>
                        <div class="hash-display" style="font-size: 10px; padding: 3px 8px; background:var(--bg-surface);">${t.hash}</div>
                      </div>
                      <div style="display: flex; align-items: center; gap: var(--space-2); margin-top:var(--space-3); padding-top:var(--space-3); border-top:1px dashed var(--border-default);">
                        ${t.skills.map(s => `<span class="skill-tag" style="font-size: 9px; padding: 2px 6px; background:var(--bg-surface);">${s}</span>`).join('')}
                        <div style="margin-left:auto; display:flex; align-items:center; gap:4px; font-size:10px; color:var(--text-tertiary);">
                          Evidence: <span style="color:${getStrengthColor(t.strength)}; font-weight:600;">${t.strength.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initProjectInteractions() {
  const tabs = document.querySelectorAll('#project-tabs .tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabName = tab.dataset.tab;
      document.getElementById('tab-tasks').style.display = tabName === 'tasks' ? '' : 'none';
      document.getElementById('tab-team').style.display = tabName === 'team' ? '' : 'none';
      document.getElementById('tab-timeline').style.display = tabName === 'timeline' ? '' : 'none';
    });
  });
}

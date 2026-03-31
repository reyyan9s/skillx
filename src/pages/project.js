import { renderSidebar } from '../components/nav.js';
import { PROJECTS_DATA } from '../data/projects.js';

const COLORS = ['#7C3AED', '#2563EB', '#EA580C', '#16A34A', '#CA8A04', '#DC2626'];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('');
}

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

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
  const pData = PROJECTS_DATA[slug] || PROJECTS_DATA['skillx-platform'];
  
  return `
    <div class="dashboard-layout">
      ${renderSidebar('projects')}
      <div style="flex: 1; overflow-y: auto;">
        <div class="project-header" style="border-bottom: 1px solid var(--border-default); padding-bottom:var(--space-6); margin-bottom:var(--space-6);">
          <div class="project-header-left">
            <div class="project-icon liquid-glass" style="background:${pData.iconBg}; font-size:24px; width:56px; height:56px; border:1px solid ${pData.iconBorder};">${pData.icon}</div>
            <div>
              <div style="display:flex; align-items:center; gap:var(--space-3);">
                <h1 class="font-display" style="margin:0; font-size:var(--text-3xl);">${pData.name}</h1>
                <span class="role-tag ${pData.roleTag}" style="margin:0;">${pData.role}</span>
                <span class="badge badge-verified">Active verification</span>
              </div>
              <div style="font-size: var(--text-sm); font-family:var(--font-mono); color: var(--text-secondary); display: flex; gap: var(--space-3); margin-top: var(--space-2);">
                <span>${pData.members} Members</span>
                <span>·</span>
                <span>${pData.tasksCount} Tasks</span>
                <span>·</span>
                <span>Created ${pData.createdAt}</span>
              </div>
              
              <div style="margin-top:var(--space-3); max-width:400px;">
                <div style="display:flex; justify-content:space-between; font-size:10px; font-family:var(--font-mono); color:var(--text-tertiary); margin-bottom:4px;">
                  <span>System Breakdown</span>
                  <span>FE ${pData.breakdown.fe}% / BE ${pData.breakdown.be}% / AI ${pData.breakdown.ai}%</span>
                </div>
                <div class="breakdown-bar" style="margin-top:0;">
                  <div class="bb-fe" style="width:${pData.breakdown.fe}%;"></div>
                  <div class="bb-be" style="width:${pData.breakdown.be}%;"></div>
                  <div class="bb-ai" style="width:${pData.breakdown.ai}%;"></div>
                </div>
              </div>

            </div>
          </div>
          <div style="display: flex; flex-direction:column; align-items:flex-end; gap: var(--space-3);">
            <div style="display:flex; align-items:center; gap:var(--space-3);">
              <div class="avatar-stack">
                ${pData.team.map(m => `<div class="avatar avatar-sm" style="background: ${avatarColor(m.name)}; border-color:var(--bg-primary);" title="${m.name} (${m.contrib}%)">${getInitials(m.name)}</div>`).join('')}
              </div>
            </div>
            <button id="btn-log-task" class="btn btn-secondary btn-sm" style="font-family:var(--font-body);">
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
            <div class="kanban" id="kanban-board">
              ${renderKanbanCol('To Do', pData.tasks.todo, 'todo')}
              ${renderKanbanCol('In Progress', pData.tasks.inProgress, 'inProgress')}
              ${renderKanbanCol('Verified Log', pData.tasks.done, 'done')}
            </div>
          </div>

          <!-- Team tab -->
          <div id="tab-team" style="display: none;">
            <div class="team-grid">
              ${pData.team.map(m => `
                <div class="team-card liquid-glass" style="padding:var(--space-5);">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div class="avatar avatar-lg" style="background: ${avatarColor(m.name)}; border-radius:var(--radius-md);">${getInitials(m.name)}</div>
                    <span class="role-tag role-${m.role.includes('Lead') ? 'lead' : (m.role.includes('Backend')||m.role.includes('Frontend')||m.role.includes('Data') ? 'contributor' : 'support')}">${m.role}</span>
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
              <div style="padding:var(--space-4) 0;">
                ${pData.timeline.map(item => `
                  <div class="activity-item" style="padding:var(--space-4) var(--space-5);">
                    <div class="activity-dot" style="background:var(--accent-green); box-shadow:0 0 8px var(--accent-green);"></div>
                    <div class="activity-content" style="width:100%;">
                      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div>
                          <div class="timeline-title" style="font-family:var(--font-heading); font-size:var(--text-lg);">${item.title}</div>
                          <div class="timeline-meta" style="font-family:var(--font-mono); font-size:10px; margin-top:2px;">
                            ${item.date} · Verified by ${item.assignee}
                          </div>
                        </div>
                        <div class="hash-display" style="font-size: 10px; padding: 3px 8px; background:var(--bg-surface);">${item.hash}</div>
                      </div>
                      <div style="display: flex; align-items: center; gap: var(--space-2); margin-top:var(--space-3); padding-top:var(--space-3); border-top:1px dashed var(--border-default);">
                        ${item.skills.map(s => `<span class="skill-tag" style="font-size: 9px; padding: 2px 6px; background:var(--bg-surface);">${s}</span>`).join('')}
                        <div style="margin-left:auto; display:flex; align-items:center; gap:4px; font-size:10px; color:var(--text-tertiary);">
                          Evidence: <span style="color:${getStrengthColor(item.strength)}; font-weight:600;">${item.strength.toUpperCase()}</span>
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

    <!-- Log Task Modal -->
    <div id="log-task-modal" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(8px); z-index:1000; align-items:center; justify-content:center;">
      <div class="card liquid-glass" style="width:400px; padding:var(--space-6); position:relative; animation: slideUp 0.3s ease-out;">
        <button id="close-modal" style="position:absolute; top:var(--space-4); right:var(--space-4); background:none; border:none; color:var(--text-tertiary); cursor:pointer;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        <h3 class="font-heading" style="margin-bottom:var(--space-4); display:flex; align-items:center; gap:var(--space-2);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Log Contribution Task</h3>
        <input type="text" id="new-task-title" placeholder="Task Name (e.g. Implement Webhooks)" style="width:100%; margin-bottom:var(--space-4); padding: 12px; border-radius: 8px; border: 1px solid var(--border-default); background: var(--bg-inset); color: var(--text-primary); font-family: var(--font-body);" />
        <select id="new-task-assignee" style="width:100%; margin-bottom:var(--space-4); padding: 12px; border-radius: 8px; border: 1px solid var(--border-default); background: var(--bg-inset); color: var(--text-primary); font-family: var(--font-body); outline: none;">
          ${pData.team.map(m => `<option value="${m.name}">${m.name} (${m.role})</option>`).join('')}
        </select>
        <div style="display:flex; gap:var(--space-4); margin-bottom:var(--space-6);">
          <input type="text" id="new-task-skills" placeholder="Skills (e.g. React, API)" style="width:60%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-default); background: var(--bg-inset); color: var(--text-primary); font-family: var(--font-body);" />
          <input type="number" id="new-task-weight" placeholder="Weight (%)" value="10" style="width:40%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-default); background: var(--bg-inset); color: var(--text-primary); font-family: var(--font-body);" />
        </div>
        <button id="submit-new-task" class="btn btn-primary" style="width:100%; padding: 12px;">Create Task Log</button>
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

  const modal = document.getElementById('log-task-modal');
  const btnLogTask = document.getElementById('btn-log-task');
  const closeBtn = document.getElementById('close-modal');
  const submitBtn = document.getElementById('submit-new-task');

  if (btnLogTask && modal) {
    btnLogTask.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const title = document.getElementById('new-task-title').value;
      const assignee = document.getElementById('new-task-assignee').value;
      const skillsInput = document.getElementById('new-task-skills').value;
      const weight = document.getElementById('new-task-weight').value || 10;
      
      if (!title) return alert('Task name is required');

      const skills = skillsInput ? skillsInput.split(',').map(s => s.trim()) : ['General'];
      
      const newTask = {
        title,
        assignee,
        skills,
        weight: parseInt(weight),
        strength: 'weak'
      };

      // In a real app we'd dispatch an event or update state safely, 
      // but here we just manually render and inject it into the To-Do column DOM.
      TASKS.todo.unshift(newTask);

      const board = document.getElementById('kanban-board');
      // Helper function needs to be accessed, or we just re-render directly.
      // Easiest is to replace board HTML entirely
      if (typeof window.renderKanbanCol === 'undefined') {
        // Redefine locally for the handler since it's restricted in module scope
        const getInitials = (n) => n.split(' ').map(x => x[0]).join('');
        const COLORS = ['#7C3AED', '#2563EB', '#EA580C', '#16A34A', '#CA8A04', '#DC2626'];
        const avatarColor = (name) => {
          let hash = 0;
          for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
          return COLORS[Math.abs(hash) % COLORS.length];
        };
        const getStrengthColor = (st) => st === 'strong' ? 'var(--accent-green)' : (st === 'medium' ? 'var(--accent-orange)' : 'var(--text-tertiary)');
        const getStrengthLabel = (st) => st === 'strong' ? 'Strong Evidence' : (st === 'medium' ? 'Medium Evidence' : 'Weak Evidence');
        
        window.renderKanbanCol = function(header, tasks, status) {
          return `
            <div class="kanban-col">
              <div class="kanban-header">
                <span class="kanban-title">${header}</span>
                <span class="kanban-count">${tasks.length}</span>
              </div>
              ${tasks.map(t => `
                <div class="task-card liquid-glass stagger-in">
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
        };
      }
      
      board.innerHTML = window.renderKanbanCol('To Do', TASKS.todo, 'todo') + 
                        window.renderKanbanCol('In Progress', TASKS.inProgress, 'inProgress') + 
                        window.renderKanbanCol('Verified Log', TASKS.done, 'done');

      modal.style.display = 'none';
      document.getElementById('new-task-title').value = '';
      document.getElementById('new-task-skills').value = '';
    });
  }
}

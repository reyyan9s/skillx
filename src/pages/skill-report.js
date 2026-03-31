import { renderSidebar } from '../components/nav.js';
import { AUTH } from '../utils/auth.js';
import { STUDENTS_DATA } from '../data/students.js';

function generateResumeHTML(d, state) {
  const projectsHtml = d.projects.map(p => {
    const projContribs = d.contributions.filter(c => c.project === p.name);
    // Use the actual verified contributions dynamically
    const bullets = projContribs.map(c => `<li style="margin-bottom: 4px;">${c.task} (Verified Impact: ${c.weight}%)</li>`).join('');
    
    let projectSkills = new Set();
    projContribs.forEach(c => c.skills.forEach(s => projectSkills.add(s)));
    const techStack = Array.from(projectSkills).join(', ');

    return `
      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-size: 14px; text-transform: uppercase;">${p.name}</strong>
          <span style="font-size: 12px; font-weight: 600; color: #444;">Role: ${p.role}</span>
        </div>
        ${techStack ? `<div style="font-size: 12px; color: #555; margin-bottom: 6px;"><em>Tech Stack: ${techStack}</em></div>` : ''}
        <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #333; line-height: 1.5; list-style-type: square;">
          ${bullets}
        </ul>
      </div>
    `;
  }).join('');

  const verifiedSkills = d.skills.filter(s => s.type === 'verified').map(s => s.name).join(', ');
  
  const headerLinks = [];
  if (state.email) headerLinks.push(`<span>${state.email}</span>`);
  if (state.phone) headerLinks.push(`<span>${state.phone}</span>`);
  if (state.github) headerLinks.push(`<span>${state.github.replace('https://', '').replace('http://', '').replace('www.', '')}</span>`);
  if (state.linkedin) headerLinks.push(`<span>${state.linkedin.replace('https://', '').replace('http://', '').replace('www.', '')}</span>`);

  return `
    <div style="max-width: 800px; margin: 0 auto; color: #111;">
      
      <!-- Header -->
      <div style="text-align: ${state.avatar ? 'left' : 'center'}; display: flex; align-items: center; gap: 24px; border-bottom: 2px solid #111; padding-bottom: 16px; margin-bottom: 16px;">
        ${state.avatar ? `<div style="width: 64px; height: 64px; border-radius: 50%; background: #111; color: #fff; display: flex; justify-content: center; align-items: center; font-size: 24px; font-weight: bold; flex-shrink: 0;">${d.initials}</div>` : ''}
        <div style="flex: 1;">
          <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #000;">${state.name}</h1>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: ${state.avatar ? 'flex-start' : 'center'}; font-size: 11px; color: #333;">
            ${headerLinks.join('<span style="color: #999;">|</span>')}
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin: 0 0 8px 0; color: #000;">Professional Summary</h2>
        <p style="margin: 0; font-size: 13px; color: #222; line-height: 1.6;">${d.summary}</p>
      </div>

      <!-- Projects / Experience -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin: 0 0 12px 0; color: #000;">Verified Project Contributions</h2>
        ${projectsHtml}
      </div>

      <!-- Skills -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin: 0 0 8px 0; color: #000;">Technical Skills</h2>
        <div style="font-size: 13px; color: #222; line-height: 1.6;">
          <div style="margin-bottom: 4px;"><strong>Verified Competencies:</strong> ${verifiedSkills}</div>
          ${state.skills ? `<div><strong>Additional Technologies:</strong> ${state.skills}</div>` : ''}
        </div>
      </div>

      <!-- Education -->
      ${(state.eduDegree || state.eduSchool) ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin: 0 0 8px 0; color: #000;">Education</h2>
        <div style="display: flex; justify-content: space-between; font-size: 13px; color: #222;">
          <strong>${state.eduDegree}</strong>
          <span>${state.eduSchool}</span>
        </div>
      </div>
      ` : ''}

    </div>
  `;
}

export function renderSkillReport() {
  const user = AUTH.getUser();
  const studentId = user && user.id ? user.id : 1;
  const d = STUDENTS_DATA[studentId] || STUDENTS_DATA[1];

  return `
    <div class="dashboard-layout">
      ${renderSidebar('report')}
      <div class="dash-main page-enter">
        <div class="dash-header" style="border-bottom:1px solid var(--border-default); padding-bottom:var(--space-6); margin-bottom:var(--space-6);">
          <div class="label" style="color:var(--accent-purple); margin-bottom:var(--space-2);"><span class="badge" style="background:var(--accent-purple-light); color:var(--accent-purple); border-color:transparent; margin-right:6px;">Tool</span>ATS-Optimized Export</div>
          <h1 class="font-display">Resume Builder</h1>
          <p style="color:var(--text-secondary); max-width:600px; font-size:var(--text-sm); line-height:1.6;">
            Generate a clean, professional, ATS-friendly resume utilizing your real, cryptographically verified contributions.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: var(--space-8); align-items: start;">
          <!-- Left Column -->
          <div style="display: flex; flex-direction: column; gap: var(--space-6); position: sticky; top: var(--space-6);">
            
            <!-- Input Form -->
            <div class="card liquid-glass" style="padding: var(--space-6);">
              <h3 style="font-family: var(--font-heading); margin-bottom: var(--space-4);">Personal Details</h3>
            
            <div style="display: flex; flex-direction: column; gap: var(--space-4);">
              <div>
                <label style="font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 4px; display: block;">Full Name</label>
                <input type="text" id="res-name" value="${d.name}" style="width: 100%; padding: 10px; border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); color: var(--text-primary); border-radius: var(--radius-sm); outline: none;">
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                <div>
                  <label style="font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 4px; display: block;">Email</label>
                  <input type="text" id="res-email" value="${d.email || ''}" style="width: 100%; padding: 10px; border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); color: var(--text-primary); border-radius: var(--radius-sm); outline: none;">
                </div>
                <div>
                  <label style="font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 4px; display: block;">Phone (Optional)</label>
                  <input type="text" id="res-phone" value="+1 (555) 019-2026" style="width: 100%; padding: 10px; border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); color: var(--text-primary); border-radius: var(--radius-sm); outline: none;">
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                <div>
                  <label style="font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 4px; display: block;">GitHub URL</label>
                  <input type="text" id="res-github" value="${d.github || ''}" style="width: 100%; padding: 10px; border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); color: var(--text-primary); border-radius: var(--radius-sm); outline: none;">
                </div>
                <div>
                  <label style="font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 4px; display: block;">LinkedIn URL</label>
                  <input type="text" id="res-linkedin" value="${d.linkedin || ''}" style="width: 100%; padding: 10px; border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); color: var(--text-primary); border-radius: var(--radius-sm); outline: none;">
                </div>
              </div>

              <div style="margin-top: var(--space-2);">
                <label style="font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 4px; display: block;">Education</label>
                <input type="text" id="res-edu-degree" value="B.S. in Computer Science" placeholder="Degree" style="width: 100%; padding: 10px; border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); color: var(--text-primary); border-radius: var(--radius-sm); margin-bottom: 8px; outline: none;">
                <input type="text" id="res-edu-school" value="University of Technology · Expected 2026" placeholder="School & Year" style="width: 100%; padding: 10px; border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); color: var(--text-primary); border-radius: var(--radius-sm); outline: none;">
              </div>

              <div>
                <label style="font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 4px; display: block;">Additional Skills (Comma separated)</label>
                <input type="text" id="res-skills" value="Agile, Technical Writing" style="width: 100%; padding: 10px; border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); color: var(--text-primary); border-radius: var(--radius-sm); outline: none;">
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: var(--space-2); border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
                <span style="font-size: 12px; color: var(--text-secondary);">Include Avatar (Not recommended for ATS)</span>
                <input type="checkbox" id="res-avatar" style="accent-color: var(--accent-purple); width: 16px; height: 16px;">
              </div>

              <button class="btn btn-primary" id="btn-print-resume" style="width: 100%; margin-top: var(--space-4); justify-content: center; transition: none !important; transform: none !important; box-shadow: none !important;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PDF
              </button>
            </div>
            </div> <!-- End of .card liquid-glass -->

            <!-- ATS Score Analyzer -->
            <div class="card liquid-glass" style="padding: var(--space-5);">
              <h3 style="font-family: var(--font-heading); margin-bottom: var(--space-4); display: flex; align-items: center; gap: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                ATS Analyzer
              </h3>
              
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3);">
                <div style="font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); font-family: var(--font-mono);">Match Score</div>
                <div id="ats-score-display" style="font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--accent-green);">100<span style="font-size:14px; color:var(--text-tertiary);">/100</span></div>
              </div>

              <div style="margin-bottom: var(--space-4);">
                <div style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 4px; overflow: hidden;">
                  <div id="ats-progress-fill" style="height: 100%; width: 100%; background: var(--accent-green); transition: width 0.3s, background 0.3s;"></div>
                </div>
              </div>

              <div>
                <div style="font-size: 10px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 8px; font-family: var(--font-mono);">Actionable Tips</div>
                <ul id="ats-tips-list" style="margin: 0; padding-left: 16px; font-size: 12px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px; line-height: 1.5;">
                  <!-- Dynamically populated -->
                </ul>
              </div>
            </div>

          </div>

          <!-- Right: Live Preview -->
          <div style="background: #ffffff; padding: 48px; border: 1px solid var(--border-default); min-height: 800px; font-family: 'Inter', system-ui, sans-serif; position: relative;" id="resume-preview-container">
            <div id="resume-preview">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      @media print {
        body * { visibility: hidden; }
        #resume-preview, #resume-preview * { visibility: visible; }
        #resume-preview {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          margin: 0;
          padding: 24px;
          border: none !important;
          box-shadow: none !important;
        }
      }
    </style>
  `;
}

export function initSkillReportInteractions() {
  const user = AUTH.getUser();
  const studentId = user && user.id ? user.id : 1;
  const d = STUDENTS_DATA[studentId] || STUDENTS_DATA[1];

  const preview = document.getElementById('resume-preview');
  
  const getValues = () => ({
    name: document.getElementById('res-name')?.value || '',
    email: document.getElementById('res-email')?.value || '',
    phone: document.getElementById('res-phone')?.value || '',
    github: document.getElementById('res-github')?.value || '',
    linkedin: document.getElementById('res-linkedin')?.value || '',
    eduDegree: document.getElementById('res-edu-degree')?.value || '',
    eduSchool: document.getElementById('res-edu-school')?.value || '',
    skills: document.getElementById('res-skills')?.value || '',
    avatar: document.getElementById('res-avatar')?.checked || false
  });

  const updateATS = (state) => {
    let score = 100;
    let tips = [];

    if (!state.email || !state.email.includes('@')) { score -= 10; tips.push("Add a valid email address."); }
    if (!state.phone || state.phone.length < 5) { score -= 5; tips.push("Add a phone number so recruiters can easily contact you."); }
    if (!state.linkedin) { score -= 10; tips.push("Provide a LinkedIn URL. ATS parsers cross-reference social profiles."); }
    if (!state.github) { score -= 5; tips.push("Include a GitHub URL to validate technical credibility."); }
    
    if (!state.eduDegree || !state.eduSchool) { score -= 15; tips.push("Ensure your Education field is fully populated."); }

    if (state.avatar) { score -= 25; tips.push("<strong style='color:var(--accent-red);'>Remove the Avatar!</strong> Images confuse ATS parsers and often result in auto-rejections."); }

    if (!state.skills || state.skills.split(',').length < 3) { score -= 10; tips.push("Add at least 3 relevant additional skills separated by commas."); }

    if (tips.length === 0) {
      tips.push("<span style='color:var(--accent-green);'>Your resume formatting is perfectly optimized for standard ATS parsers!</span>");
    }

    score = Math.max(0, score);
    
    const scoreDisplay = document.getElementById('ats-score-display');
    const progressFill = document.getElementById('ats-progress-fill');
    const tipsList = document.getElementById('ats-tips-list');

    if (scoreDisplay) scoreDisplay.innerHTML = `${score}<span style="font-size:14px; color:var(--text-tertiary);">/100</span>`;
    
    if (progressFill) {
      progressFill.style.width = `${score}%`;
      progressFill.style.background = score >= 80 ? 'var(--accent-green)' : score >= 60 ? 'var(--accent-orange)' : 'var(--accent-red)';
    }

    if (scoreDisplay) {
       scoreDisplay.style.color = score >= 80 ? 'var(--accent-green)' : score >= 60 ? 'var(--accent-orange)' : 'var(--accent-red)';
    }

    if (tipsList) {
      tipsList.innerHTML = tips.map(t => `<li style="margin-bottom: 2px;">${t}</li>`).join('');
    }
  };

  const render = () => {
    if (preview) {
      const state = getValues();
      preview.innerHTML = generateResumeHTML(d, state);
      updateATS(state);
    }
  };

  // Initial render
  setTimeout(render, 50);

  // Attach event listeners to all inputs to re-render in real-time
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', render);
    input.addEventListener('change', render);
  });

  const printBtn = document.getElementById('btn-print-resume');
  if(printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

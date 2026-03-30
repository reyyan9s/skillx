import { renderSidebar } from '../components/nav.js';

const STUDENT_SKILLS = [
  { name: 'React', level: 92 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 82 },
  { name: 'TypeScript', level: 78 },
  { name: 'PostgreSQL', level: 75 },
  { name: 'Machine Learning', level: 65 },
  { name: 'JavaScript', level: 90 },
  { name: 'CSS', level: 85 },
  { name: 'Git', level: 80 },
  { name: 'REST APIs', level: 88 },
  { name: 'Express', level: 82 },
  { name: 'TensorFlow', level: 55 },
  { name: 'D3.js', level: 45 },
  { name: 'WebSocket', level: 60 },
];

const SAMPLE_JD = `Senior Full-Stack Engineer — FinTech Startup

We're looking for a senior full-stack engineer to join our team building the next generation of digital banking infrastructure.

Requirements:
- 3+ years experience with React and TypeScript
- Strong backend skills in Node.js or Go
- Experience with PostgreSQL or similar databases
- Familiarity with REST APIs and WebSocket real-time systems
- Knowledge of AWS or GCP cloud services
- Experience with Docker and Kubernetes
- Understanding of CI/CD pipelines
- Strong understanding of security best practices

Nice to have:
- Experience with Redis or caching strategies
- Knowledge of payment processing (Stripe)
- Familiarity with monitoring tools (Datadog)`;

function analyzeJD(jdText) {
  const skillKeywords = {
    'React': { kw: ['react', 'reactjs', 'react.js'], priority: 'critical' },
    'TypeScript': { kw: ['typescript', 'ts'], priority: 'critical' },
    'Node.js': { kw: ['node', 'nodejs', 'node.js'], priority: 'critical' },
    'Go': { kw: ['go', 'golang'], priority: 'medium' },
    'PostgreSQL': { kw: ['postgresql', 'postgres', 'sql', 'database'], priority: 'critical' },
    'REST APIs': { kw: ['rest', 'restful', 'api design', 'rest api'], priority: 'critical' },
    'AWS': { kw: ['aws', 'amazon web services'], priority: 'medium' },
    'GCP': { kw: ['gcp', 'google cloud'], priority: 'low' },
    'Docker': { kw: ['docker', 'containerization'], priority: 'medium' },
    'Kubernetes': { kw: ['kubernetes', 'k8s'], priority: 'medium' },
    'CI/CD': { kw: ['ci/cd', 'ci cd', 'continuous integration', 'pipeline'], priority: 'low' },
    'Security': { kw: ['security', 'auth', 'authentication'], priority: 'critical' },
    'WebSocket': { kw: ['websocket', 'real-time', 'realtime'], priority: 'medium' },
    'Redis': { kw: ['redis', 'caching'], priority: 'low' },
    'Stripe': { kw: ['stripe', 'payment'], priority: 'low' },
    'Monitoring': { kw: ['datadog', 'grafana', 'monitoring'], priority: 'low' },
  };

  const lowerJD = jdText.toLowerCase();
  const required = [];

  for (const [skill, data] of Object.entries(skillKeywords)) {
    if (data.kw.some(kw => lowerJD.includes(kw))) {
      const studentSkill = STUDENT_SKILLS.find(s => s.name === skill);
      let status = 'missing';
      if (studentSkill) {
        status = studentSkill.level >= 70 ? 'has' : 'partial';
      }
      required.push({ name: skill, status, level: studentSkill?.level || 0, priority: data.priority });
    }
  }

  const critical = required.filter(r => r.priority === 'critical');
  const medium = required.filter(r => r.priority === 'medium');
  const low = required.filter(r => r.priority === 'low');

  const crScore = critical.length > 0 ? critical.filter(c => c.status === 'has').length / critical.length : 1;
  const mdScore = medium.length > 0 ? medium.filter(m => m.status === 'has').length / medium.length : 1;
  const lwScore = low.length > 0 ? low.filter(l => l.status === 'has').length / low.length : 1;

  // Weight: 60% critical, 30% medium, 10% low
  const score = Math.round((crScore * 60) + (mdScore * 30) + (lwScore * 10));

  return { required, score };
}

export function renderSkillReport() {
  return `
    <div class="dashboard-layout">
      ${renderSidebar('report')}
      <div class="dash-main page-enter">
        <div class="dash-header" style="border-bottom:1px solid var(--border-default); padding-bottom:var(--space-6); margin-bottom:var(--space-6);">
          <div class="label" style="color:var(--accent-purple); margin-bottom:var(--space-2);"><span class="badge" style="background:var(--accent-purple-light); color:var(--accent-purple); border-color:transparent; margin-right:6px;">System</span>Recruiter-Grade Evaluation</div>
          <h1 class="font-display">AI Verification Engine</h1>
          <p style="color:var(--text-secondary); max-width:600px; font-size:var(--text-sm); line-height:1.6;">
            Cross-reference your cryptographically verified passport against live job descriptions. 
            The engine evaluates coverage certainty, prioritizing critical infrastructure requirements.
          </p>
        </div>

        <div class="report-layout">
          <!-- Input -->
          <div class="report-input-area liquid-glass" style="padding:var(--space-6); border-radius:var(--radius-xl);">
            <label style="font-family:var(--font-mono); font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-tertiary); display:block; margin-bottom:var(--space-3);">
              Target Specification (Job Description)
            </label>
            <textarea class="input" id="jd-input" placeholder="Paste a job description here..." style="font-size:12px; line-height:1.8; min-height:400px; font-family:var(--font-mono); background:rgba(255,255,255,0.5);">${SAMPLE_JD}</textarea>
            <button class="btn btn-primary" style="margin-top:var(--space-4); width:100%; border-radius:var(--radius-sm);" id="analyze-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Run Priority Analysis
            </button>
            <div style="margin-top:var(--space-6);">
              <div class="label" style="font-size:10px; margin-bottom:var(--space-3);">Verified Index Loaded (${STUDENT_SKILLS.length} nodes)</div>
              <div style="display:flex; flex-wrap:wrap; gap:var(--space-1);">
                ${STUDENT_SKILLS.filter(s => s.level >= 70).map(s => `
                  <span class="skill-tag" style="font-size:9px; font-family:var(--font-mono); opacity:0.8;">${s.name}</span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Output -->
          <div id="report-output">
            <div style="height:100%; min-height:500px; background:var(--bg-inset); border-radius:var(--radius-lg); border:1px dashed var(--border-default); display:flex; align-items:center; justify-content:center; flex-direction:column; color:var(--text-tertiary);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom:var(--space-4); opacity:0.5;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <div style="font-family:var(--font-mono); font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">Waiting for syntax block...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getPriorityColor(p) {
  if (p === 'critical') return 'var(--accent-red)';
  if (p === 'medium') return 'var(--accent-orange)';
  return 'var(--accent-blue)';
}

function renderAnalysisResult(analysis) {
  const { required, score } = analysis;
  const scoreColor = score >= 80 ? 'var(--accent-green)' : score >= 60 ? 'var(--accent-orange)' : 'var(--accent-red)';
  
  const critical = required.filter(r => r.priority === 'critical');
  const medium = required.filter(r => r.priority === 'medium');
  const low = required.filter(r => r.priority === 'low');
  
  const missingCritical = critical.filter(r => r.status !== 'has');
  const missingMedium = medium.filter(r => r.status !== 'has');
  const missingLow = low.filter(r => r.status !== 'has');

  return `
    <div class="report-output page-enter">
      <!-- Intelligence Graphic -->
      <div style="background:var(--bg-dark); color:white; padding:var(--space-8); border-radius:var(--radius-xl); display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-6);">
        <div>
          <div style="font-family:var(--font-mono); font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:rgba(255,255,255,0.5); margin-bottom:var(--space-2);">System Decision Output</div>
          <h2 class="font-heading" style="font-size:32px; margin:0;">${score >= 80 ? 'Strong Candidate' : score >= 65 ? 'Viable, with gaps' : 'High-risk mismatch'}</h2>
          <div style="font-family:var(--font-mono); font-size:12px; margin-top:var(--space-3); color:rgba(255,255,255,0.7);">
            Coverage: ${critical.filter(c => c.status === 'has').length}/${critical.length} Critical
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:var(--text-6xl); font-family:var(--font-display); font-weight:700; color:${scoreColor}; line-height:1;">${score}<span style="font-size:24px;">%</span></div>
          <div class="label" style="color:rgba(255,255,255,0.5); margin-top:4px;">Verified Fit Score</div>
        </div>
      </div>

      <!-- Actionable Recs -->
      <div class="card liquid-glass" style="margin-bottom:var(--space-6); background:rgba(255,255,255,0.6);">
        <div class="label" style="margin-bottom:var(--space-4); color:var(--accent-purple);">Algorithmic Directives (Actionable Intelligence)</div>
        <ul style="font-size:var(--text-sm); line-height:1.7; padding-left:var(--space-4); margin:0;">
          ${missingCritical.length > 0 ? missingCritical.map(m => `<li style="margin-bottom:8px;"><strong>High Priority Execution:</strong> Build and document a feature using <strong style="color:var(--accent-red);">${m.name}</strong> to close a critical gap in your passport.</li>`).join('') : '<li style="margin-bottom:8px;">No critical gaps. Proceed to submission.</li>'}
          ${missingMedium.length > 0 ? `<li style="margin-bottom:8px;"><strong>Secondary Target:</strong> Integrating ${missingMedium.map(m=>`<strong>${m.name}</strong>`).join(', ')} into your next commit will increase match confidence by 15%.</li>` : ''}
          ${missingLow.length > 0 ? `<li><strong>Optimization:</strong> ${missingLow.map(m=>`<strong>${m.name}</strong>`).join(', ')} are nice-to-haves but not blocking for application.</li>` : ''}
        </ul>
      </div>

      <!-- Detail Grid -->
      <div>
        <div class="label" style="margin-bottom:var(--space-3);">Priority Gap Analysis Matrix</div>
        
        <table style="width:100%; text-align:left; border-collapse:collapse; font-size:var(--text-sm); background:var(--bg-surface); border-radius:var(--radius-lg); overflow:hidden; box-shadow:0 0 0 1px var(--border-default);">
          <thead>
            <tr style="background:var(--bg-elevated); border-bottom:1px solid var(--border-default); font-family:var(--font-mono); font-size:10px; text-transform:uppercase;">
              <th style="padding:var(--space-3) var(--space-4);">Infrastructure Requirement</th>
              <th style="padding:var(--space-3) var(--space-4);">Priority Block</th>
              <th style="padding:var(--space-3) var(--space-4); text-align:right;">Verification Status</th>
            </tr>
          </thead>
          <tbody>
            ${[...critical, ...medium, ...low].map(r => `
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:var(--space-3) var(--space-4); font-weight:500;">${r.name}</td>
                <td style="padding:var(--space-3) var(--space-4);">
                  <span style="font-size:9px; font-family:var(--font-mono); text-transform:uppercase; padding:2px 6px; border-radius:2px; background:${getPriorityColor(r.priority)}20; color:${getPriorityColor(r.priority)};">${r.priority}</span>
                </td>
                <td style="padding:var(--space-3) var(--space-4); text-align:right;">
                  ${r.status === 'has' 
                    ? `<span style="color:var(--accent-green); font-family:var(--font-mono); font-size:11px; font-weight:600;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:-2px; margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>VERIFIED</span>` 
                    : `<span style="color:var(--text-tertiary); font-family:var(--font-mono); font-size:11px;">[ GAP DETECTED ]</span>`}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function initSkillReportInteractions() {
  const analyzeBtn = document.getElementById('analyze-btn');
  const jdInput = document.getElementById('jd-input');
  const outputDiv = document.getElementById('report-output');

  if (analyzeBtn && jdInput && outputDiv) {
    if (jdInput.value.trim()) {
      setTimeout(() => {
        const analysis = analyzeJD(jdInput.value);
        outputDiv.innerHTML = renderAnalysisResult(analysis);
      }, 300);
    }

    analyzeBtn.addEventListener('click', () => {
      const text = jdInput.value.trim();
      if (!text) return;

      analyzeBtn.innerHTML = `<span style="display:inline-flex; align-items:center; gap:6px; font-family:var(--font-mono); font-size:10px;"><span class="spinner"></span> COMPILING INTELLIGENCE...</span>`;
      analyzeBtn.disabled = true;
      outputDiv.innerHTML = `<div style="height:100%; min-height:500px; display:flex; align-items:center; justify-content:center; flex-direction:column; color:var(--accent-purple);"><span class="spinner" style="border-color:var(--accent-purple); border-right-color:transparent; width:32px; height:32px; border-width:3px;"></span><div style="font-family:var(--font-mono); font-size:10px; text-transform:uppercase; letter-spacing:0.1em; margin-top:var(--space-4);">Running verification logic...</div></div>`;

      setTimeout(() => {
        const analysis = analyzeJD(text);
        outputDiv.innerHTML = renderAnalysisResult(analysis);

        analyzeBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Run Priority Analysis`;
        analyzeBtn.disabled = false;
      }, 1200);
    });
  }
}

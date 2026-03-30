import QRCode from 'qrcode';

const PASSPORT_DATA = {
  name: 'Reyyan Sayyed',
  initials: 'RS',
  tagline: 'Systems & Backend Architecture',
  hash: 'SKX-2026-PROJECT-SKILLX-a7f3c2e8',
  generated: '2026-03-30T08:00:00Z',
  globalScore: 92,
  summary: `Based on verified cryptographic logs, Reyyan operates as a high-impact backend engineer with a strong focus on system infrastructure and authentication. Over the last 12 months, they have consistently owned 35-45% contribution weight on core engine tasks across 4 teams. Verified evidence suggests senior-level proficiency in Node.js, TypeScript, and architectural design.`,
  contributions: [
    {
      project: 'SkillX Platform',
      task: 'Built authentication system with JWT + OAuth',
      skills: ['React', 'Node.js', 'JWT'],
      weight: 35,
      date: 'Mar 28, 2026',
      hash: 'SKX-a7f3c2e8',
      strength: 'strong',
    },
    {
      project: 'SkillX Platform',
      task: 'Designed and implemented contribution tracking engine',
      skills: ['TypeScript', 'PostgreSQL', 'Redis'],
      weight: 42,
      date: 'Mar 27, 2026',
      hash: 'SKX-e1b9c4d2',
      strength: 'strong',
    },
    {
      project: 'SkillX Platform',
      task: 'Created RESTful API endpoint architecture',
      skills: ['Express', 'REST', 'OpenAPI'],
      weight: 30,
      date: 'Mar 25, 2026',
      hash: 'SKX-d3f7a6c1',
      strength: 'medium',
    },
    {
      project: 'WasteWise',
      task: 'Designed route optimization algorithm',
      skills: ['Python', 'ML', 'NetworkX'],
      weight: 28,
      date: 'Mar 22, 2026',
      hash: 'SKX-f4a2b8c3',
      strength: 'strong',
    },
    {
      project: 'Posturely',
      task: 'Trained posture detection ML model',
      skills: ['Python', 'TensorFlow', 'MediaPipe'],
      weight: 45,
      date: 'Mar 15, 2026',
      hash: 'SKX-h5c3a2b6',
      strength: 'strong',
    },
  ],
  skills: [
    { name: 'React', level: 92, type: 'verified' },
    { name: 'Node.js', level: 88, type: 'verified' },
    { name: 'Python', level: 82, type: 'verified' },
    { name: 'TypeScript', level: 78, type: 'verified' },
    { name: 'PostgreSQL', level: 75, type: 'verified' },
    { name: 'Machine Learning', level: 65, type: 'claimed' },
    { name: 'System Design', level: 70, type: 'verified' },
    { name: 'DevOps', level: 45, type: 'claimed' },
  ],
};

function renderRadarChart(skills) {
  const width = 420;
  const height = 300;
  const cx = width / 2;
  const cy = height / 2;
  const maxR = 90;
  const levels = 4;

  const n = skills.length;
  const angleStep = (2 * Math.PI) / n;

  let gridLines = '';
  for (let i = 1; i <= levels; i++) {
    const r = (maxR / levels) * i;
    gridLines += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border-default)" stroke-width="1" stroke-dasharray="2 4"/>`;
  }

  let axisLines = '';
  for (let j = 0; j < n; j++) {
    const angle = angleStep * j - Math.PI / 2;
    const x = cx + maxR * Math.cos(angle);
    const y = cy + maxR * Math.sin(angle);
    axisLines += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--border-subtle)" stroke-width="1"/>`;
  }

  let dataPoints = '';
  let initialDataPoints = '';
  let dots = '';
  
  skills.forEach((skill, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = (skill.level / 100) * maxR;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    dataPoints += `${x},${y} `;
    initialDataPoints += `${cx},${cy} `;

    const color = skill.type === 'verified' ? 'var(--accent-green)' : 'rgba(255,255,255,0.4)';
    const stroke = skill.type === 'verified' ? 'var(--bg-dark)' : 'transparent';
    const fillLabel = skill.type === 'verified' ? 'High Confidence (Verified Block)' : 'Inferred via Pattern Analysis';
    
    dots += `
      <g style="cursor: crosshair; transition: all 0.3s;" class="radar-node">
        <circle cx="${cx}" cy="${cy}" r="0" fill="${color}" stroke="${stroke}" stroke-width="2">
          <animate attributeName="cx" from="${cx}" to="${x}" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />
          <animate attributeName="cy" from="${cy}" to="${y}" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />
          <animate attributeName="r" from="0" to="5" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />
        </circle>
        <!-- Invisible hover catchment area for tooltip -->
        <circle cx="${x}" cy="${y}" r="15" fill="transparent">
          <title>${skill.name.toUpperCase()}: ${skill.level}% Weight
[ ${fillLabel} ]</title>
        </circle>
      </g>
    `;
  });

  let labels = '';
  skills.forEach((skill, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const labelR = maxR + 24;
    const x = (cx + labelR * Math.cos(angle)).toFixed(1);
    const y = (cy + labelR * Math.sin(angle)).toFixed(1);
    const anchor = Math.abs(Math.cos(angle)) < 0.1 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
    const color = skill.type === 'verified' ? 'var(--text-primary)' : 'var(--text-tertiary)';
    const weight = skill.type === 'verified' ? '600' : '400';
    labels += `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" fill="${color}" font-size="12" font-family="var(--font-mono)" font-weight="${weight}" style="pointer-events:none; transition: all 0.5s;">${skill.name}</text>`;
  });

  return `
    <svg class="radar-interactive" width="100%" height="auto" viewBox="0 0 ${width} ${height}" style="overflow: hidden; display: block; max-width: 100%;">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-hard" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g opacity="0.6">
        ${gridLines}
        ${axisLines}
      </g>

      <!-- Center Data Core -->
      <circle cx="${cx}" cy="${cy}" r="3" fill="var(--accent-green)" />
      <circle cx="${cx}" cy="${cy}" r="8" fill="var(--accent-green)" opacity="0">
        <animate attributeName="opacity" values="0; 0.4; 0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="r" values="3; 14; 3" dur="3s" repeatCount="indefinite" />
      </circle>

      <!-- Animated Graphic Geometry -->
      <polygon fill="rgba(22, 163, 74, 0.15)" stroke="var(--accent-green)" stroke-width="1.5" filter="url(#glow)">
        <animate attributeName="points" from="${initialDataPoints.trim()}" to="${dataPoints.trim()}" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />
      </polygon>
      
      <!-- Interactive Elements -->
      <g>
        ${dots}
      </g>
      <g>
        ${labels}
      </g>
    </svg>
  `;
}

function skillLevel(level) {
  if (level >= 85) return 'expert';
  if (level >= 70) return 'advanced';
  if (level >= 50) return 'intermediate';
  return 'beginner';
}

export function renderPassport(slug) {
  const d = PASSPORT_DATA;

  return `
    <div class="passport-page" style="background:transparent; padding: var(--space-12) 0;">
      <div style="max-width: 960px; margin: 0 auto var(--space-4); display: flex; justify-content: space-between; align-items: center;">
        <a href="#/dashboard" class="btn btn-ghost btn-sm" style="font-family:var(--font-body);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back
        </a>
        <div style="display: flex; gap: var(--space-2);">
          <button class="btn btn-secondary btn-sm" id="passport-share">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            Copy Link
          </button>
          <button class="btn btn-primary btn-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF
          </button>
        </div>
      </div>

      <div class="passport-doc page-enter" id="passport-doc" style="max-width: 960px; margin: 0 auto; background: var(--bg-surface); border: 2px solid var(--border-strong); font-family: var(--font-mono); color: var(--text-primary); box-shadow: 12px 12px 0 rgba(0,0,0,0.08);">
        
        <!-- SYSTEM HEADER -->
        <div style="border-bottom: 2px solid var(--border-strong); padding: var(--space-6); background: var(--bg-dark);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-size: 10px; color: var(--accent-green); text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: var(--space-2);">SkillX Verification System</div>
              <h1 style="font-family: var(--font-mono); font-size: var(--text-2xl); color: var(--text-inverse); text-transform: uppercase; letter-spacing: -0.02em; margin: 0;">Contribution Passport Record</h1>
            </div>
            <div style="text-align: right;">
              <div style="display: inline-block; padding: 4px 12px; border: 1px solid var(--accent-green); color: var(--accent-green); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; background: rgba(34, 197, 94, 0.1);">
                STATUS: VERIFIED
              </div>
            </div>
          </div>
        </div>

        <!-- IMMUTABILITY & METADATA BLOCK -->
        <div style="display: flex; border-bottom: 2px solid var(--border-strong);">
          <div style="flex: 1; padding: var(--space-6); border-right: 2px solid var(--border-strong);">
            <div style="display: grid; grid-template-columns: 140px 1fr; gap: var(--space-3); font-size: 12px;">
              <div style="color: var(--text-tertiary);">SUBJECT ALIAS:</div>
              <div style="font-weight: 700; display:flex; align-items:center; gap:var(--space-2);">
                <div style="width:20px; height:20px; background:var(--text-primary); color:var(--text-inverse); display:flex; align-items:center; justify-content:center; font-size:10px;">${d.initials}</div>
                ${d.name} <span style="color: var(--text-tertiary); font-weight: 400;">(${d.tagline})</span>
              </div>
              
              <div style="color: var(--text-tertiary);">RECORD HASH:</div>
              <div style="color: var(--text-primary); word-break: break-all;">${d.hash}</div>
              
              <div style="color: var(--text-tertiary);">GENERATED (UTC):</div>
              <div>${d.generated}</div>
              
              <div style="color: var(--text-tertiary);">SYS_VERSION:</div>
              <div>v2.4.1_STABLE</div>
            </div>
          </div>
          <div style="width: 200px; padding: var(--space-6); background: rgba(0,0,0,0.02); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <canvas id="passport-qr-canvas" width="80" height="80" style="margin-bottom: var(--space-3); mix-blend-mode: multiply;"></canvas>
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color:var(--text-secondary);">Scan to Verify Record</div>
          </div>
        </div>

        <!-- WARNING STRIP -->
        <div style="background: var(--accent-green-light); color: var(--accent-green-dark); padding: 8px var(--space-6); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; border-bottom: 2px solid var(--border-strong); display: flex; align-items: center; gap: var(--space-2);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Immutable Record — Locked at generation
        </div>

        <div style="padding: var(--space-6);">
          <!-- AI SUMMARY -->
          <div style="margin-bottom: var(--space-8);">
            <div style="font-size: 12px; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-2); display: flex; align-items: center; gap: var(--space-2);">
              <span style="display: inline-block; width: 6px; height: 6px; background: var(--accent-purple);"></span>
              System Analysis:
            </div>
            <div style="font-size: 13px; font-family: var(--font-mono); line-height: 1.6; color: var(--text-secondary); border-left: 2px solid var(--text-primary); padding-left: var(--space-4);">
              User operates as a high-impact engineering asset focusing on system infrastructure. 12-month trailing analysis shows consistent 35-45% contribution weight across 4 verified team deployments. Evidence algorithm explicitly validates senior-level architectural capabilities.
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-8);">
            
            <!-- LEFT: AUDIT LOG -->
            <div>
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-4); border-bottom: 2px solid var(--text-primary); padding-bottom: 4px;">
                Contribution Audit Log (${d.contributions.length} Entries)
              </div>
              
              <div class="stagger-in" style="display: flex; flex-direction: column;">
                ${d.contributions.map((c, i) => `
                  <div style="padding: var(--space-4) 0; border-bottom: 1px dashed var(--border-strong);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                      <div style="font-size: 10px; color: var(--text-tertiary);">[ENTRY_${String(i+1).padStart(2, '0')}] ${c.date}</div>
                      <div style="font-size: 10px; color: var(--accent-green); font-weight: 700; border: 1px solid rgba(34, 197, 94, 0.4); padding: 0 4px; background: rgba(34, 197, 94, 0.05);">VERIFIED</div>
                    </div>
                    
                    <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; text-transform: uppercase;">
                      ${c.task}
                    </div>
                    
                    <div style="display: flex; gap: var(--space-4); font-size: 11px; margin-bottom: var(--space-3); color: var(--text-secondary);">
                      <div>CAT: <span style="color: var(--text-primary);">${c.project.toUpperCase()}</span></div>
                      <div>WT: <span style="color: var(--text-primary);">${c.weight}%</span></div>
                      <div>EVID: <span style="color: ${c.strength === 'strong' ? 'var(--accent-green)' : 'var(--text-primary)'};">${c.strength.toUpperCase()}</span></div>
                    </div>
                    
                    <div style="display: flex; gap: var(--space-2);">
                      ${c.skills.map(s => `<span style="font-size: 10px; background: transparent; border: 1px solid var(--border-strong); padding: 2px 6px;">${s.toUpperCase()}</span>`).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- RIGHT: SKILL VERIFICATION MATRIX -->
            <div>
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-4); border-bottom: 2px solid var(--text-primary); padding-bottom: 4px;">
                Skill Verification Matrix
              </div>
              
              <div style="border: 1px solid var(--border-strong); background: rgba(0,0,0,0.02); padding: var(--space-4); display: flex; justify-content: center; margin-bottom: var(--space-4);">
                ${renderRadarChart(d.skills)}
              </div>

              <div style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); margin-bottom: var(--space-3); text-transform: uppercase;">Confidence Vectors</div>
              <div style="display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
                ${d.skills.map(s => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px; border-left: 2px solid ${s.type === 'verified' ? 'var(--accent-green)' : 'var(--border-subtle)'}; background: ${s.type === 'verified' ? 'rgba(34, 197, 94, 0.05)' : 'transparent'};">
                    <div style="color: ${s.type === 'verified' ? 'var(--text-primary)' : 'var(--text-secondary)'}; font-weight: ${s.type === 'verified' ? '700' : '400'}; padding-left: 4px;">${s.name.toUpperCase()}</div>
                    <div style="display: flex; align-items: center; gap: var(--space-2);">
                      <div style="width: 40px; height: 4px; background: var(--border-subtle);"><div style="width: ${s.level}%; height: 100%; background: ${s.type === 'verified' ? 'var(--accent-green)' : 'var(--text-tertiary)'};"></div></div>
                      <div style="width: 24px; text-align: right; color: var(--text-primary);">${s.level}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            
          </div>
        </div>

        <!-- FINAL FOOTER -->
        <div style="background: var(--bg-dark); color: var(--text-inverse); padding: var(--space-4); text-align: center; border-top: 2px solid var(--border-strong);">
          <div style="font-size: 16px; font-weight: 700; letter-spacing: 0.2em; margin-bottom: var(--space-2);">END OF RECORD</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.6); margin-bottom: var(--space-2);">This document is cryptographically generated and cannot be modified after issuance.</div>
          <div style="font-size: 10px; color: var(--accent-green); letter-spacing: 0.1em; font-weight: 700;">VERIFIED BY SKILLX SYSTEM</div>
        </div>

      </div>
    </div>
  `;
}

export async function initPassportInteractions() {
  const canvas = document.getElementById('passport-qr-canvas');
  if (canvas) {
    try {
      await QRCode.toCanvas(canvas, `${window.location.origin}/#/verify/${PASSPORT_DATA.hash}`, {
        width: 60,
        margin: 0,
        color: { dark: '#16A34A', light: '#ffffff00' },
      });
    } catch (e) {
      console.error('QR generation failed:', e);
    }
  }

  const shareBtn = document.getElementById('passport-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href).then(() => {
        const original = shareBtn.innerHTML;
        shareBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
        setTimeout(() => { shareBtn.innerHTML = original; }, 2000);
      });
    });
  }

  const bars = document.querySelectorAll('.progress-bar-fill');
  bars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.width = width; }, 100);
    });
  });
}

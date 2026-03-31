export const PROJECTS_DATA = {
  'skillx-platform': {
    name: 'SkillX Platform',
    icon: '🔐',
    iconBg: '#DCFCE7',
    iconBorder: 'var(--accent-green-mid)',
    role: 'Lead',
    roleTag: 'role-lead',
    members: 4,
    tasksCount: 18,
    createdAt: 'Mar 15, 2026',
    breakdown: { fe: 28, be: 52, ai: 20 },
    team: [
        { name: 'Reyyan Sayyed', role: 'Full-Stack Lead', contrib: 38 },
        { name: 'Apurva Rahane', role: 'Backend & DevOps', contrib: 25 },
        { name: 'Sidhhesh Yeole', role: 'Frontend & UI Specialist', contrib: 20 },
        { name: 'Janhvi Sali', role: 'Data Science & AI', contrib: 17 },
    ],
    tasks: {
      todo: [
        { title: 'Refactor dashboard state management', assignee: 'Sidhhesh Yeole', skills: ['React', 'Redux'], weight: 12, strength: 'medium' },
        { title: 'Scale Redis caching layer', assignee: 'Reyyan Sayyed', skills: ['Redis', 'Node.js'], weight: 15, strength: 'weak' }
      ],
      inProgress: [
        { title: 'Implement interactive animations', assignee: 'Sidhhesh Yeole', skills: ['Vue.js', 'CSS'], weight: 18, strength: 'strong' },
        { title: 'Develop team invitation OAuth flow', assignee: 'Apurva Rahane', skills: ['Node.js', 'OAuth'], weight: 14, strength: 'medium' }
      ],
      done: [
        { title: 'Built JWT authentication system', assignee: 'Sidhhesh Yeole', skills: ['React', 'JWT'], weight: 20, strength: 'strong', hash: 'SKX-a7f3c2e8' },
        { title: 'Designed REST API architecture', assignee: 'Reyyan Sayyed', skills: ['Express', 'REST'], weight: 25, strength: 'strong', hash: 'SKX-d3f7a6c1' },
        { title: 'Implemented contribution tracking engine', assignee: 'Reyyan Sayyed', skills: ['TypeScript', 'PostgreSQL'], weight: 35, strength: 'strong', hash: 'SKX-e1b9c4d2' },
        { title: 'Architected GraphQL aggregation layer', assignee: 'Apurva Rahane', skills: ['GraphQL', 'MongoDB'], weight: 20, strength: 'medium', hash: 'SKX-b2d4f1a3' },
      ]
    },
    timeline: [
      { title: 'Implemented contribution tracking engine', assignee: 'Reyyan Sayyed', date: 'Mar 28, 2026 · 14:30', hash: 'SKX-e1b9c4d2', skills: ['TypeScript', 'PostgreSQL'], strength: 'strong' },
      { title: 'Designed REST API architecture', assignee: 'Reyyan Sayyed', date: 'Mar 27, 2026 · 09:15', hash: 'SKX-d3f7a6c1', skills: ['Express', 'REST'], strength: 'strong' },
      { title: 'Architected GraphQL aggregation layer', assignee: 'Apurva Rahane', date: 'Mar 26, 2026 · 11:00', hash: 'SKX-b2d4f1a3', skills: ['GraphQL', 'MongoDB'], strength: 'strong' },
      { title: 'Built JWT authentication system', assignee: 'Sidhhesh Yeole', date: 'Mar 20, 2026 · 10:22', hash: 'SKX-a7f3c2e8', skills: ['React', 'JWT'], strength: 'strong' },
    ]
  },
  'wastewise': {
    name: 'WasteWise',
    icon: '♻️',
    iconBg: '#E0F2FE',
    iconBorder: 'var(--accent-blue)',
    role: 'Contributor',
    roleTag: 'role-contributor',
    members: 5,
    tasksCount: 14,
    createdAt: 'Jan 10, 2026',
    breakdown: { fe: 35, be: 30, ai: 35 },
    team: [
        { name: 'Janhvi Sali', role: 'Lead Data Scientist', contrib: 35 },
        { name: 'Reyyan Sayyed', role: 'Backend Engineer', contrib: 28 },
        { name: 'Sidhhesh Yeole', role: 'UI/UX Developer', contrib: 20 },
        { name: 'Apurva Rahane', role: 'DevOps Specialist', contrib: 17 }
    ],
    tasks: {
      todo: [
        { title: 'Integrate live GPS fleet tracking', assignee: 'Reyyan Sayyed', skills: ['WebSockets', 'Node.js'], weight: 15, strength: 'medium' },
        { title: 'Enhance predictive fleet load model', assignee: 'Janhvi Sali', skills: ['Python', 'TensorFlow'], weight: 20, strength: 'strong' }
      ],
      inProgress: [
        { title: 'Design driver application UI', assignee: 'Sidhhesh Yeole', skills: ['Figma', 'React Native'], weight: 12, strength: 'strong' }
      ],
      done: [
        { title: 'Designed route optimization algorithm', assignee: 'Reyyan Sayyed', skills: ['Python', 'ML', 'NetworkX'], weight: 28, strength: 'strong', hash: 'WW-f4a2b8c3' },
        { title: 'Built spatial data clustering for routes', assignee: 'Janhvi Sali', skills: ['Pandas', 'Python', 'SQL'], weight: 35, strength: 'strong', hash: 'WW-ds82n4m1' },
      ]
    },
    timeline: [
      { title: 'Designed route optimization algorithm', assignee: 'Reyyan Sayyed', date: 'Mar 22, 2026 · 14:00', hash: 'WW-f4a2b8c3', skills: ['Python', 'ML'], strength: 'strong' },
      { title: 'Built spatial data clustering for routes', assignee: 'Janhvi Sali', date: 'Mar 18, 2026 · 09:30', hash: 'WW-ds82n4m1', skills: ['Pandas', 'SQL'], strength: 'strong' }
    ]
  },
  'edutrack': {
    name: 'EduTrack Analytics',
    icon: '📊',
    iconBg: '#FEF3C7',
    iconBorder: 'var(--accent-orange)',
    role: 'DevOps',
    roleTag: 'role-support',
    members: 6,
    tasksCount: 12,
    createdAt: 'Feb 05, 2026',
    breakdown: { fe: 20, be: 50, ai: 30 },
    team: [
        { name: 'Apurva Rahane', role: 'Lead DevOps', contrib: 35 },
        { name: 'Reyyan Sayyed', role: 'Backend Architect', contrib: 30 },
        { name: 'Janhvi Sali', role: 'Data Analyst', contrib: 25 },
        { name: 'Sidhhesh Yeole', role: 'Frontend Engineer', contrib: 10 }
    ],
    tasks: {
      todo: [
        { title: 'Build automated reporting cron jobs', assignee: 'Reyyan Sayyed', skills: ['Node.js', 'Cron'], weight: 10, strength: 'medium' }
      ],
      inProgress: [
        { title: 'Setup cross-region failover DB', assignee: 'Apurva Rahane', skills: ['AWS RDS', 'PostgreSQL'], weight: 25, strength: 'strong' }
      ],
      done: [
        { title: 'Implemented CI/CD automated deployments', assignee: 'Apurva Rahane', skills: ['Jenkins', 'AWS'], weight: 30, strength: 'strong', hash: 'ET-cd4f18x2' },
        { title: 'Designed robust student analytics API', assignee: 'Reyyan Sayyed', skills: ['Express', 'MongoDB'], weight: 25, strength: 'strong', hash: 'ET-api938x1' }
      ]
    },
    timeline: [
      { title: 'Implemented CI/CD automated deployments', assignee: 'Apurva Rahane', date: 'Mar 10, 2026 · 11:20', hash: 'ET-cd4f18x2', skills: ['Jenkins', 'AWS'], strength: 'strong' },
      { title: 'Designed robust student analytics API', assignee: 'Reyyan Sayyed', date: 'Mar 08, 2026 · 16:15', hash: 'ET-api938x1', skills: ['Express', 'MongoDB'], strength: 'strong' }
    ]
  }
};

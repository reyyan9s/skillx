// ── Auth Service ──

export const AUTH = {
  getRole() {
    return localStorage.getItem('skillx_role');
  },
  setRole(role) {
    localStorage.setItem('skillx_role', role);
  },
  getUser() {
    return JSON.parse(localStorage.getItem('skillx_user') || '{}');
  },
  setUser(user) {
    localStorage.setItem('skillx_user', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('skillx_role');
    localStorage.removeItem('skillx_user');
    window.location.hash = '/';
  },
  isAuthenticated() {
    return !!this.getRole();
  },
  redirectByRole() {
    const role = this.getRole();
    if (role === 'student') window.location.hash = '/dashboard';
    else if (role === 'recruiter') window.location.hash = '/recruiter';
    else window.location.hash = '/auth';
  }
};

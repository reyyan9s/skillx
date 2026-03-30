// ── Simple hash-based SPA router ──

export class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    window.addEventListener('hashchange', () => this.resolve());
  }

  on(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, ...paramParts] = hash.split('/').filter(Boolean);
    const route = '/' + (path || '');
    const param = paramParts.join('/');

    const handler = this.routes[route] || this.routes['/'];

    if (handler) {
      this.currentPage = route;
      handler(param);
    }
  }

  navigate(path) {
    window.location.hash = path;
  }

  start() {
    this.resolve();
  }
}

export function navigateTo(path) {
  window.location.hash = path;
}

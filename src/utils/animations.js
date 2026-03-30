/**
 * animations.js — Cinematic animation system
 * BlurText reveal + Scroll reveal via IntersectionObserver
 * Easing: cubic-bezier(0.16, 1, 0.3, 1) applied via CSS
 */

/**
 * Init cinematic blur-text reveal on elements with [data-blur-text].
 * Splits text into words, staggers each word's fade+blur+slide in.
 */
export function initBlurText() {
  document.querySelectorAll('[data-blur-text]').forEach(el => {
    if (el.querySelector('.blur-word')) return;

    // Use a regex that matches HTML tags OR blocks of text
    // We then split ONLY the text blocks into words
    const content = el.innerHTML.trim();
    const parts = content.split(/(<[^>]*>)/g);
    
    let wordIndex = 0;
    const transformed = parts.map(part => {
      if (part.startsWith('<')) return part;
      if (!part.trim()) return part;
      
      return part.split(/\s+/).map(word => {
        if (!word) return '';
        return `<span class="blur-word" style="transition-delay: ${(wordIndex++) * 60}ms">${word}</span>`;
      }).join(' ');
    }).join('');

    el.innerHTML = transformed;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.blur-word').forEach(word => {
          word.classList.add('revealed');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '-50px 0px' });

  document.querySelectorAll('[data-blur-text]').forEach(el => observer.observe(el));
}

/**
 * Init scroll reveal on elements with [data-scroll-reveal].
 * Fades up + removes blur on scroll into view.
 */
export function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px 0px' });

  document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Init magnetic effect for buttons with .btn-primary
 */
export function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-accent').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseout', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/**
 * Run both systems together — call this after every page mount.
 */
export function initAnimations() {
  requestAnimationFrame(() => {
    setTimeout(() => {
      initBlurText();
      initScrollReveal();
      initMagneticButtons();
    }, 60);
  });
}

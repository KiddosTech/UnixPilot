/**
 * Navigation and smooth scrolling utilities
 */

/**
 * Initialize smooth scrolling for anchor links
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL without causing page reload
          window.history.pushState(null, '', href);
        }
      }
    });
  });
}

/**
 * Highlight current section in navigation
 */
export function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function updateActiveLink() {
    let current = '';

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

/**
 * Handle mobile menu toggle (if needed in future)
 */
export function initMobileMenu() {
  const menuButton = document.querySelector('.menu-toggle');
  const menuLinks = document.querySelector('nav .links');

  if (!menuButton) return;

  menuButton.addEventListener('click', function() {
    menuLinks.classList.toggle('open');
    menuButton.classList.toggle('active');
  });

  // Close menu when link is clicked
  document.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function() {
      menuLinks.classList.remove('open');
      menuButton.classList.remove('active');
    });
  });
}

/**
 * Restore scroll position on navigation back
 */
export function initScrollRestoration() {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
}

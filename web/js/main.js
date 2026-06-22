/**
 * UnixPilot Website - Main initialization script
 * Loads and initializes all modules
 */

import {
  copyCode,
  initCopyButtons,
  initKeyboardShortcuts
} from './clipboard.js';

import {
  initSmoothScroll,
  initActiveNavigation,
  initMobileMenu,
  initScrollRestoration
} from './navigation.js';

/**
 * Initialize all site features on DOM ready
 */
function initializeSite() {
  // Clipboard functionality
  initCopyButtons();
  initKeyboardShortcuts();

  // Navigation
  initScrollRestoration();
  initSmoothScroll();
  initActiveNavigation();
  initMobileMenu();

  // Analytics (if available)
  if (typeof gtag !== 'undefined') {
    trackCopyEvents();
  }

  console.log('✓ UnixPilot website initialized');
}

/**
 * Track copy button clicks for analytics
 */
function trackCopyEvents() {
  document.querySelectorAll('.copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const elementId = btn.getAttribute('data-copy-id') ||
                        btn.getAttribute('onclick').match(/\'([^\']+)\'/)?.[1];
      if (elementId && typeof gtag !== 'undefined') {
        const codeElement = document.getElementById(elementId);
        gtag('event', 'copy_code', {
          code_snippet: codeElement?.textContent?.substring(0, 50) || 'unknown',
          element_id: elementId
        });
      }
    });
  });
}

/**
 * Global copyCode function for onclick handlers
 * (for backwards compatibility with inline event handlers)
 */
window.copyCode = copyCode;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSite);
} else {
  initializeSite();
}

// Expose initialization function globally for debugging
window.debugUnixPilot = {
  reinit: initializeSite,
  version: '0.1.0'
};

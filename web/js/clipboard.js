/**
 * Clipboard utility for copy-to-clipboard functionality
 */
export function copyCode(button, elementId) {
  const code = document.getElementById(elementId).textContent;

  navigator.clipboard.writeText(code).then(function() {
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    button.classList.add('copied');

    setTimeout(function() {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);

    showToast('Copied to clipboard!');
  }).catch(function() {
    button.textContent = '✗ Failed';
    const originalText = button.textContent;

    setTimeout(function() {
      button.textContent = 'Copy';
    }, 2000);

    showToast('Failed to copy', 'error');
  });
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'error') {
    toast.style.background = 'var(--error)';
  }
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(function() {
    toast.remove();
  }, 3000);
}

/**
 * Initialize all copy buttons
 */
export function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const elementId = button.getAttribute('data-copy-id') ||
                        button.getAttribute('onclick').match(/\'([^\']+)\'/)?.[1];
      if (elementId) {
        copyCode(button, elementId);
      }
    });
  });
}

/**
 * Keyboard shortcut: Ctrl/Cmd + Shift + C to copy first visible code block
 */
export function initKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'KeyC') {
      const firstBtn = document.querySelector('.copy-btn');
      if (firstBtn) {
        firstBtn.click();
      }
    }
  });
}

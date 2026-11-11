/**
 * Robust Reference-Counted Scroll Lock & Mobile Smooth Navigation Utility
 * Works seamlessly across iOS Safari, Android Chrome, and Desktop browsers.
 * Eliminates race conditions and guarantees page scrolling is NEVER accidentally locked.
 */

let lockCount = 0;
let safetyTimer: ReturnType<typeof setTimeout> | null = null;

export function lockScroll() {
  lockCount++;
  if (lockCount === 1) {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('overflow-locked');
      document.body.classList.add('overflow-locked');
    }
  }

  // Clear previous safety timer
  if (safetyTimer) {
    clearTimeout(safetyTimer);
  }

  // Hard safety timeout: if locked for more than 12 seconds (e.g. unhandled modal exception),
  // unconditionally release scroll lock so user is never trapped.
  safetyTimer = setTimeout(() => {
    if (lockCount > 0) {
      forceUnlockScroll();
    }
  }, 12000);
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    if (safetyTimer) {
      clearTimeout(safetyTimer);
      safetyTimer = null;
    }
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('overflow-locked');
      document.body.classList.remove('overflow-locked');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }
}

export function forceUnlockScroll() {
  lockCount = 0;
  if (safetyTimer) {
    clearTimeout(safetyTimer);
    safetyTimer = null;
  }
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('overflow-locked');
    document.body.classList.remove('overflow-locked');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}

/**
 * Universal smooth scrolling helper compatible with iOS Safari and Android Chrome
 * Avoids WebKit scroll interruptions and calculates correct absolute document coordinates.
 */
export function smoothScrollTo(targetId: string, navOffset = 80) {
  if (typeof window === 'undefined') return;

  if (targetId === 'hero') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

  const element = document.getElementById(targetId);
  if (!element) return;

  const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
  const elementRect = element.getBoundingClientRect();
  const targetPosition = elementRect.top + currentScroll - navOffset;

  window.scrollTo({
    top: Math.max(0, Math.round(targetPosition)),
    behavior: 'smooth',
  });
}

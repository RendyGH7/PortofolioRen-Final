/**
 * Robust Reference-Counted Scroll Lock Utility
 * Works seamlessly across iOS Safari, Chrome Mobile, and Desktop browsers.
 * Eliminates race conditions and ensures page scrolling is NEVER accidentally locked.
 */

let lockCount = 0;

export function lockScroll() {
  lockCount++;
  if (lockCount === 1) {
    document.documentElement.classList.add('overflow-locked');
    document.body.classList.add('overflow-locked');
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.classList.remove('overflow-locked');
    document.body.classList.remove('overflow-locked');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}

export function forceUnlockScroll() {
  lockCount = 0;
  document.documentElement.classList.remove('overflow-locked');
  document.body.classList.remove('overflow-locked');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}


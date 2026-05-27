/**
 * Kerala Tech & Digital Hub — Main JavaScript
 * Vanilla JS · No dependencies
 *
 * Features:
 * 1. Mobile navigation toggle
 * 2. Smooth scroll with fixed-nav offset
 * 3. Intersection Observer scroll-reveal animations
 * 4. Dynamic copyright year
 */

(function () {
  'use strict';

  // ─── DOM References ───
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  const copyrightYear = document.getElementById('copyright-year');
  const navbar = document.querySelector('.navbar');

  // ─── 1. Mobile Navigation Toggle ───
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );

    // Swap icon between menu and close
    const icon = menuToggle.querySelector('.material-icons');
    if (icon) {
      icon.textContent = isOpen ? 'close' : 'menu';
    }
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    const icon = menuToggle.querySelector('.material-icons');
    if (icon) icon.textContent = 'menu';
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when a link inside it is clicked
    mobileMenuLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
        menuToggle.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });
  }

  // ─── 2. Smooth Scroll with Nav Offset ───
  // CSS scroll-behavior: smooth handles the animation.
  // This handler adjusts for the fixed navbar height on hash-link clicks.
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var navHeight = navbar ? navbar.offsetHeight : 0;
      var targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Update URL hash without jumping
      history.pushState(null, '', targetId);
    });
  });

  // ─── 3. Scroll-Reveal Animations ───
  // Uses IntersectionObserver to add the .is-visible class
  // to elements with the .reveal class when they enter the viewport.
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target); // Animate only once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: make all elements visible immediately
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ─── 4. Dynamic Copyright Year ───
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
})();

/* ============================================
   Portfolio Website — Main Script
   ============================================ */

(function () {
  'use strict';

  // --- Theme Toggle ---
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
    updateThemeIcon();
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const isDark =
      current === 'dark' ||
      (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    const theme = document.documentElement.getAttribute('data-theme');
    const isDark =
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // --- Mobile Navigation ---
  function initMobileNav() {
    const btn = document.querySelector('.nav-menu-btn');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      // Toggle icon between hamburger and X
      const icon = btn.querySelector('svg');
      if (isOpen) {
        icon.innerHTML =
          '<line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/>';
      } else {
        icon.innerHTML =
          '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>';
      }
    });
  }

  // --- Active Navigation Link ---
  function setActiveNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (
        path.endsWith(href) ||
        (href === 'index.html' && (path.endsWith('/') || path.endsWith('/index.html')))
      ) {
        link.classList.add('active');
      }
    });
  }

  // --- Render: About Page ---
  function renderAbout() {
    const container = document.getElementById('about-content');
    if (!container) return;

    const d = SITE_DATA.personal;

    let avatarContent;
    if (d.profileImage) {
      avatarContent = '<img src="' + d.profileImage + '" alt="' + d.name + '">';
    } else {
      avatarContent = d.name.charAt(0);
    }

    let contactHtml = '';

    if (d.email) {
      contactHtml +=
        '<a class="contact-link" href="mailto:' + d.email + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<rect x="2" y="4" width="20" height="16" rx="2"/>' +
        '<path d="M22 4L12 13 2 4"/>' +
        '</svg>Email</a>';
    }

    if (d.github) {
      contactHtml +=
        '<a class="contact-link" href="' + d.github + '" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24" fill="currentColor">' +
        '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>' +
        '</svg>GitHub</a>';
    }

    if (d.linkedin) {
      contactHtml +=
        '<a class="contact-link" href="' + d.linkedin + '" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24" fill="currentColor">' +
        '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' +
        '</svg>LinkedIn</a>';
    }

    container.innerHTML =
      '<section class="hero">' +
      '<div class="hero-avatar">' + avatarContent + '</div>' +
      '<h1>' + d.name + '</h1>' +
      '<p class="hero-tagline">' + d.tagline + '</p>' +
      '<p class="hero-intro">' + d.introduction + '</p>' +
      '<div class="contact-links">' + contactHtml + '</div>' +
      '</section>';
  }

  // --- Render: Timeline Page ---
  function renderTimeline() {
    const container = document.getElementById('timeline-content');
    if (!container) return;

    let html = '<div class="timeline">';

    SITE_DATA.timeline.forEach(function (item) {
      var teamLine = item.team ? ' · ' + item.team : '';
      var descLine = item.description
        ? '<p class="timeline-desc">' + item.description + '</p>'
        : '';
      var badgeLabel = item.type === 'career' ? 'Career' : 'Education';

      html +=
        '<div class="timeline-item" data-type="' + item.type + '">' +
        '<div class="timeline-dot"></div>' +
        '<span class="timeline-badge">' + badgeLabel + '</span>' +
        '<div class="timeline-period">' + item.period + '</div>' +
        '<div class="timeline-title">' + item.title + '</div>' +
        '<div class="timeline-org">' + item.organization + teamLine + '</div>' +
        descLine +
        '</div>';
    });

    html += '</div>';
    container.innerHTML = html;
  }

  // --- Render: Projects Page ---
  function renderProjects() {
    const container = document.getElementById('projects-content');
    if (!container) return;

    let html = '<div class="projects-grid">';

    SITE_DATA.projects.forEach(function (project) {
      var techHtml = project.techStack
        .map(function (t) {
          return '<span class="tech-tag">' + t + '</span>';
        })
        .join('');

      var highlightsHtml = '';
      if (project.highlights && project.highlights.length > 0) {
        highlightsHtml =
          '<ul class="project-highlights">' +
          project.highlights
            .map(function (h) {
              return '<li>' + h + '</li>';
            })
            .join('') +
          '</ul>';
      }

      var titleHtml;
      if (project.link) {
        titleHtml =
          '<h3 class="project-title"><a href="' +
          project.link +
          '" target="_blank" rel="noopener">' +
          project.title +
          ' ↗</a></h3>';
      } else {
        titleHtml = '<h3 class="project-title">' + project.title + '</h3>';
      }

      html +=
        '<div class="project-card">' +
        titleHtml +
        '<div class="project-tech">' + techHtml + '</div>' +
        '<p class="project-desc">' + project.description + '</p>' +
        highlightsHtml +
        '</div>';
    });

    html += '</div>';
    container.innerHTML = html;
  }

  // --- Initialize ---
  function init() {
    initTheme();
    initMobileNav();
    setActiveNav();

    // Set nav logo text
    var logo = document.querySelector('.nav-logo');
    if (logo && SITE_DATA && SITE_DATA.personal) {
      logo.textContent = SITE_DATA.personal.name;
    }

    // Set footer
    var footer = document.querySelector('.footer-inner');
    if (footer && SITE_DATA && SITE_DATA.personal) {
      footer.textContent = '© ' + new Date().getFullYear() + ' ' + SITE_DATA.personal.name;
    }

    // Bind theme toggle
    var themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Render page content
    renderAbout();
    renderTimeline();
    renderProjects();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeColor = document.getElementById('themeColor');
  const langButtons = [...document.querySelectorAll('[data-lang]')];

  const safeGet = (key) => {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  };

  const safeSet = (key, value) => {
    try { localStorage.setItem(key, value); } catch (_) {}
  };

  function applyTheme(theme) {
    const selected = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = selected;
    const isDark = selected === 'dark';
    if (themeToggle) {
      themeToggle.textContent = isDark ? '☀' : '☾';
      themeToggle.setAttribute('aria-label', isDark ? 'Přepnout na světlé téma' : 'Přepnout na tmavé téma');
      themeToggle.title = isDark ? 'Světlé téma' : 'Tmavé téma';
    }
    if (themeColor) themeColor.setAttribute('content', isDark ? '#070b14' : '#eef3f8');
    safeSet('caseycz-theme', selected);
  }

  function applyLanguage(lang) {
    const selected = lang === 'en' ? 'en' : 'cs';
    root.lang = selected;

    document.querySelectorAll('[data-cs][data-en]').forEach((node) => {
      node.textContent = node.dataset[selected];
    });

    document.querySelectorAll('[data-cs-html][data-en-html]').forEach((node) => {
      node.innerHTML = node.dataset[`${selected}Html`];
    });

    document.querySelectorAll('[data-cs-placeholder][data-en-placeholder]').forEach((node) => {
      node.placeholder = node.dataset[`${selected}Placeholder`];
    });

    langButtons.forEach((button) => {
      const active = button.dataset.lang === selected;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const titleCs = document.body?.dataset.titleCs || 'CaseyCZ — Aplikace, nástroje & projekty';
    const titleEn = document.body?.dataset.titleEn || 'CaseyCZ — Apps, tools & projects';
    document.title = selected === 'en' ? titleEn : titleCs;

    if (themeToggle) {
      const isDark = root.dataset.theme === 'dark';
      themeToggle.setAttribute(
        'aria-label',
        selected === 'en'
          ? (isDark ? 'Switch to light theme' : 'Switch to dark theme')
          : (isDark ? 'Přepnout na světlé téma' : 'Přepnout na tmavé téma')
      );
    }

    safeSet('caseycz-language', selected);
  }

  const storedTheme = safeGet('caseycz-theme');
  const systemDark = Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  applyTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : (systemDark ? 'dark' : 'light'));

  const storedLanguage = safeGet('caseycz-language');
  const browserEnglish = (navigator.language || '').toLowerCase().startsWith('en');
  const preferredLanguage = storedLanguage === 'cs' || storedLanguage === 'en' ? storedLanguage : (browserEnglish ? 'en' : 'cs');
  applyLanguage(preferredLanguage);

  themeToggle?.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    applyLanguage(root.lang);
  });

  langButtons.forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

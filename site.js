(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeColor = document.getElementById('themeColor');
  const langButtons = [...document.querySelectorAll('[data-lang]')];
  const SUPPORT_URL = 'https://www.buymeacoffee.com/caseycz';

  const safeGet = (key) => {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  };

  const safeSet = (key, value) => {
    try { localStorage.setItem(key, value); } catch (_) {}
  };

  function installMobileNav() {
    const header = document.querySelector('.site-header');
    const sourceNav = document.querySelector('.desktop-nav');
    const navActions = document.querySelector('.nav-actions');
    if (!header || !sourceNav || !navActions || document.querySelector('[data-mobile-nav-toggle]')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'icon-button mobile-nav-toggle';
    button.setAttribute('data-mobile-nav-toggle', '');
    button.setAttribute('aria-label', 'Menu');
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'mobileNavPanel');
    button.textContent = '☰';

    const panel = document.createElement('nav');
    panel.id = 'mobileNavPanel';
    panel.className = 'mobile-nav-panel';
    panel.setAttribute('aria-label', 'Mobile navigation');
    panel.setAttribute('aria-hidden', 'true');

    [...sourceNav.querySelectorAll('a')].forEach((link) => {
      const clone = link.cloneNode(true);
      clone.removeAttribute('class');
      panel.appendChild(clone);
    });

    const github = [...navActions.querySelectorAll('a')].find((link) => link.href.includes('github.com/CaseyCZ'));
    if (github) {
      const clone = github.cloneNode(true);
      clone.className = 'mobile-nav-external';
      clone.removeAttribute('class');
      clone.classList.add('mobile-nav-external');
      panel.appendChild(clone);
    }

    document.body.appendChild(panel);
    navActions.insertBefore(button, document.getElementById('themeToggle'));

    const positionPanel = () => {
      const rect = header.getBoundingClientRect();
      panel.style.top = Math.round(rect.bottom + 8) + 'px';
    };

    const close = () => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
      button.textContent = '☰';
    };

    const open = () => {
      positionPanel();
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      button.setAttribute('aria-expanded', 'true');
      button.textContent = '×';
    };

    button.addEventListener('click', () => {
      if (panel.classList.contains('open')) close();
      else open();
    });

    panel.addEventListener('click', (event) => {
      if (event.target.closest('a')) close();
    });

    document.addEventListener('click', (event) => {
      if (!panel.classList.contains('open')) return;
      if (panel.contains(event.target) || button.contains(event.target)) return;
      close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) close();
      else if (panel.classList.contains('open')) positionPanel();
    });
  }

  function installSupportUI() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions || document.querySelector('[data-support-open]')) return;

    const style = document.createElement('style');
    style.textContent = `
      .support-button{white-space:nowrap}
      .support-button .support-icon{font-size:14px;line-height:1}
      .support-backdrop{position:fixed;inset:0;z-index:300;display:none;place-items:center;padding:20px;background:rgba(2,6,23,.74);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
      .support-backdrop.open{display:grid}
      .support-dialog{position:relative;width:min(420px,100%);max-height:min(720px,calc(100vh - 40px));overflow:auto;padding:22px;border:1px solid var(--border);border-radius:24px;background:linear-gradient(180deg,color-mix(in srgb,var(--panel) 96%,transparent),var(--input));box-shadow:0 30px 100px rgba(0,0,0,.45)}
      .support-close{position:absolute;top:14px;right:14px;width:36px;height:36px;border:1px solid var(--border);border-radius:11px;background:var(--panel);color:var(--muted);font:700 20px/1 system-ui;cursor:pointer}
      .support-close:hover{color:var(--text);border-color:color-mix(in srgb,var(--accent) 40%,var(--border))}
      .support-kicker{margin:0 44px 7px 0;color:var(--accent);font-size:10px;font-weight:900;letter-spacing:.12em}
      .support-dialog h2{margin:0 44px 10px 0;font-size:30px;line-height:1.05;letter-spacing:-.04em}
      .support-copy{margin:0 0 18px;color:var(--muted);font-size:13px}
      .support-qr-frame{width:min(290px,100%);margin:0 auto 18px;padding:10px;border:1px solid var(--border);border-radius:22px;background:#fff;box-shadow:0 18px 50px rgba(15,23,42,.16)}
      .support-qr{display:block;width:100%;height:auto;border-radius:15px}
      .support-actions{display:grid;gap:9px}
      .support-actions .button{width:100%}
      .support-url{display:block;text-align:center;color:var(--muted);font-size:10px;word-break:break-all}
      body.support-modal-open{overflow:hidden}
      @media (max-width:680px){
        .support-button{width:36px;min-width:36px;height:36px;min-height:36px;padding:0;border-radius:10px}
        .support-button .support-label{display:none}
        .support-dialog{padding:20px;border-radius:21px}
        .support-dialog h2{font-size:27px}
        .support-qr-frame{width:min(260px,100%)}
      }
    `;
    document.head.appendChild(style);

    const supportButton = document.createElement('button');
    supportButton.type = 'button';
    supportButton.className = 'button compact support-button';
    supportButton.setAttribute('data-support-open', '');
    supportButton.setAttribute('aria-haspopup', 'dialog');
    supportButton.setAttribute('aria-controls', 'supportModal');
    supportButton.innerHTML = '<span class="support-icon" aria-hidden="true">☕</span><span class="support-label" data-cs="Podpořit" data-en="Support">Podpořit</span>';

    const githubButton = [...navActions.querySelectorAll('a')].find((link) => link.href.includes('github.com/CaseyCZ'));
    if (githubButton) navActions.insertBefore(supportButton, githubButton);
    else navActions.appendChild(supportButton);

    const modal = document.createElement('div');
    modal.id = 'supportModal';
    modal.className = 'support-backdrop';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'supportTitle');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="support-dialog">
        <button class="support-close" type="button" data-support-close aria-label="Close">×</button>
        <p class="support-kicker" data-cs="PODPORA CASEYCZ" data-en="SUPPORT CASEYCZ">PODPORA CASEYCZ</p>
        <h2 id="supportTitle" data-cs="Podpořit další vývoj." data-en="Support further development.">Podpořit další vývoj.</h2>
        <p class="support-copy" data-cs="Pokud ti některý z projektů pomáhá, můžeš vývoj podpořit přes Buy Me a Coffee. Naskenuj QR kód nebo otevři odkaz." data-en="If one of my projects is useful to you, you can support further development through Buy Me a Coffee. Scan the QR code or open the link.">Pokud ti některý z projektů pomáhá, můžeš vývoj podpořit přes Buy Me a Coffee. Naskenuj QR kód nebo otevři odkaz.</p>
        <div class="support-qr-frame"><img class="support-qr" src="/support-qr.svg" alt="QR code — Buy Me a Coffee CaseyCZ" width="640" height="640"></div>
        <div class="support-actions">
          <a class="button" href="${SUPPORT_URL}" target="_blank" rel="noopener" data-cs="Otevřít Buy Me a Coffee ↗" data-en="Open Buy Me a Coffee ↗">Otevřít Buy Me a Coffee ↗</a>
          <span class="support-url">buymeacoffee.com/caseycz</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    let lastFocused = null;
    const closeButton = modal.querySelector('[data-support-close]');

    const openSupport = () => {
      lastFocused = document.activeElement;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('support-modal-open');
      closeButton?.focus();
    };

    const closeSupport = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('support-modal-open');
      lastFocused?.focus?.();
    };

    supportButton.addEventListener('click', openSupport);
    closeButton?.addEventListener('click', closeSupport);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeSupport();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('open')) closeSupport();
    });
  }

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

    const closeButton = document.querySelector('[data-support-close]');
    if (closeButton) closeButton.setAttribute('aria-label', selected === 'en' ? 'Close' : 'Zavřít');

    safeSet('caseycz-language', selected);
  }

  installMobileNav();
  installSupportUI();

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

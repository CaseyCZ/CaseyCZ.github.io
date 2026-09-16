const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const themeColor = document.getElementById('themeColor');
const preview = document.getElementById('previewScreen');

function applyTheme(theme) {
  root.dataset.theme = theme;
  if (toggle) {
    toggle.textContent = theme === 'dark' ? '☀' : '☾';
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Přepnout na světlé téma' : 'Přepnout na tmavé téma');
  }
  if (themeColor) themeColor.content = theme === 'dark' ? '#070b14' : '#eef3f8';
  localStorage.setItem('hbm-product-theme', theme);
}

const preferred = localStorage.getItem('hbm-product-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(preferred);
toggle?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

const screens = {
  overview: `
    <div class="mock-head">
      <div><h3>Domov pod kontrolou.</h3><p>Homebridge · Raspberry Pi</p></div>
      <span class="mock-badge">ONLINE</span>
    </div>
    <div class="mock-grid">
      <div class="mock-stat"><small>PROCESOR</small><strong>12%</strong><div class="mock-bar"><span style="width:12%"></span></div></div>
      <div class="mock-stat"><small>PAMĚŤ</small><strong>38%</strong><div class="mock-bar"><span style="width:38%"></span></div></div>
      <div class="mock-stat"><small>TEPLOTA</small><strong>42°</strong><div class="mock-bar"><span style="width:42%"></span></div></div>
    </div>
    <div class="mock-card"><div class="mock-card-top"><strong>◫ Pluginy</strong><span class="mock-count">8</span></div><p>Všechny integrace na jednom místě.</p></div>
    <div class="mock-card"><div class="mock-card-top"><strong>↑ Aktualizace</strong><span class="mock-count">2</span></div><p>Nejdřív přehled. Potom potvrzení.</p></div>
    <div class="mock-card"><div class="mock-card-top"><strong>↻ Právě obnoveno</strong><span class="mock-badge">OK</span></div><p>Stav serveru a komponent na jednom místě.</p></div>`,
  plugins: `
    <div class="mock-head"><div><h3>Pluginy.</h3><p>Nainstalované integrace a jejich stav</p></div><span class="mock-badge">8 PLUGINŮ</span></div>
    ${['Homebridge Govee','Homebridge Tuya','Homebridge Dummy Garage','Homebridge Mi Hygrothermograph'].map((name, i) => `
      <div class="mock-row"><div class="mock-row-icon">◫</div><div class="mock-row-main"><strong>${name}</strong><small>${i === 1 ? '2.7.0 → 2.8.0 · aktualizace k dispozici' : 'Aktuální verze · nakonfigurováno'}</small></div><span class="${i === 1 ? 'mock-badge' : 'mock-ok'}">${i === 1 ? 'UPDATE' : 'OK'}</span></div>`).join('')}
    <div class="mock-card"><div class="mock-card-top"><strong>Nastavení pluginu</strong><span class="mock-badge">SCHEMA</span></div><p>Formuláře podle config.schema.json a JSON editor pro pokročilé.</p></div>`,
  logs: `
    <div class="mock-head"><div><h3>Živé logy.</h3><p>Filtry, hledání a diagnostika</p></div><span class="mock-badge">ONLINE</span></div>
    <div class="mock-log">[08:31:04] [Homebridge] Homebridge v2.4.0 started\n[08:31:05] [Govee] Platform initialized\n[08:31:06] [Tuya] Connected to device\n[08:31:08] [Homebridge UI] Server listening\n\n[08:32:12] [Plugin] Accessory updated\n[08:32:13] [Homebridge] Child bridge running\n\nFiltr: Error · Warning · Info\nPoslední hodina · 24 hodin · Vše</div>
    <div class="mock-card"><div class="mock-card-top"><strong>Diagnostika</strong><span class="mock-ok">READY</span></div><p>Rychle najděte chyby, varování a poslední změny.</p></div>`
};

function renderPreview(name) {
  if (!preview || !screens[name]) return;
  preview.innerHTML = screens[name];
  document.querySelectorAll('.preview-tab').forEach(btn => {
    const active = btn.dataset.preview === name;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });
}

document.querySelectorAll('.preview-tab').forEach(btn => btn.addEventListener('click', () => renderPreview(btn.dataset.preview)));
renderPreview('overview');

if (location.hash && document.querySelector(location.hash)) {
  setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 0);
}

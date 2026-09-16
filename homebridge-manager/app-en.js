const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const themeColor = document.getElementById('themeColor');
const preview = document.getElementById('previewScreen');

function applyTheme(theme) {
  root.dataset.theme = theme;
  if (toggle) {
    toggle.textContent = theme === 'dark' ? '☀' : '☾';
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
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
      <div><h3>Your home at a glance.</h3><p>Homebridge · Raspberry Pi</p></div>
      <span class="mock-badge">ONLINE</span>
    </div>
    <div class="mock-grid">
      <div class="mock-stat"><small>CPU</small><strong>12%</strong><div class="mock-bar"><span style="width:12%"></span></div></div>
      <div class="mock-stat"><small>MEMORY</small><strong>38%</strong><div class="mock-bar"><span style="width:38%"></span></div></div>
      <div class="mock-stat"><small>TEMPERATURE</small><strong>42°</strong><div class="mock-bar"><span style="width:42%"></span></div></div>
    </div>
    <div class="mock-card"><div class="mock-card-top"><strong>◫ Plugins</strong><span class="mock-count">8</span></div><p>All integrations in one place.</p></div>
    <div class="mock-card"><div class="mock-card-top"><strong>↑ Updates</strong><span class="mock-count">2</span></div><p>Review first. Confirm second.</p></div>
    <div class="mock-card"><div class="mock-card-top"><strong>↻ Just refreshed</strong><span class="mock-badge">OK</span></div><p>Server and component status in one place.</p></div>`,
  plugins: `
    <div class="mock-head"><div><h3>Plugins.</h3><p>Installed integrations and their status</p></div><span class="mock-badge">8 PLUGINS</span></div>
    ${['Homebridge Govee','Homebridge Tuya','Homebridge Dummy Garage','Homebridge Mi Hygrothermograph'].map((name, i) => `
      <div class="mock-row"><div class="mock-row-icon">◫</div><div class="mock-row-main"><strong>${name}</strong><small>${i === 1 ? '2.7.0 → 2.8.0 · update available' : 'Current version · configured'}</small></div><span class="${i === 1 ? 'mock-badge' : 'mock-ok'}">${i === 1 ? 'UPDATE' : 'OK'}</span></div>`).join('')}
    <div class="mock-card"><div class="mock-card-top"><strong>Plugin settings</strong><span class="mock-badge">SCHEMA</span></div><p>Forms based on config.schema.json with an advanced JSON editor.</p></div>`,
  logs: `
    <div class="mock-head"><div><h3>Live logs.</h3><p>Filters, search and diagnostics</p></div><span class="mock-badge">ONLINE</span></div>
    <div class="mock-log">[08:31:04] [Homebridge] Homebridge v2.4.0 started\n[08:31:05] [Govee] Platform initialized\n[08:31:06] [Tuya] Connected to device\n[08:31:08] [Homebridge UI] Server listening\n\n[08:32:12] [Plugin] Accessory updated\n[08:32:13] [Homebridge] Child bridge running\n\nFilter: Error · Warning · Info\nLast hour · 24 hours · All</div>
    <div class="mock-card"><div class="mock-card-top"><strong>Diagnostics</strong><span class="mock-ok">READY</span></div><p>Quickly find errors, warnings and recent changes.</p></div>`
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

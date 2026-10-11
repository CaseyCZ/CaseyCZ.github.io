(() => {
  const STORAGE_KEY = 'caseycz-travel-checklist-v3';
  const THEME_KEY = 'caseycz-theme';
  const LANG_KEY = 'caseycz-language';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const uid = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

  const ui = {
    cs: {
      progress: 'Sbaleno', items: 'položek', empty: 'Žádné položky neodpovídají filtru.',
      addItem: 'Přidat', itemPlaceholder: 'Nová položka…', categoryPlaceholder: 'Název nové kategorie…',
      confirmCategory: 'Smazat celou kategorii?', confirmNew: 'Vytvořit nový seznam? Současný seznam bude nahrazen.',
      confirmTemplate: 'Použít vybranou šablonu? Současné kategorie budou nahrazeny.',
      imported: 'Seznam byl importován.', invalid: 'Soubor se nepodařilo načíst.', copied: 'Seznam byl zkopírován do schránky.',
      saved: 'Záloha byla stažena.', reset: 'Zaškrtnutí bylo vymazáno.', shareTitle: 'Cestovní seznam',
      defaultTrip: 'Moje cesta'
    },
    en: {
      progress: 'Packed', items: 'items', empty: 'No items match the current filter.',
      addItem: 'Add', itemPlaceholder: 'New item…', categoryPlaceholder: 'New category name…',
      confirmCategory: 'Delete this whole category?', confirmNew: 'Create a new list? The current list will be replaced.',
      confirmTemplate: 'Apply this template? Current categories will be replaced.',
      imported: 'List imported.', invalid: 'The file could not be loaded.', copied: 'List copied to clipboard.',
      saved: 'Backup downloaded.', reset: 'All checkmarks were cleared.', shareTitle: 'Travel Checklist',
      defaultTrip: 'My trip'
    }
  };

  const templateData = {
    cs: {
      base: [
        ['Doklady & finance', '🪪', ['Občanský průkaz / pas', 'Peněženka', 'Platební karta', 'Hotovost', 'Cestovní pojištění', 'Rezervace / letenky', 'Řidičský průkaz']],
        ['Elektronika', '🔌', ['Telefon', 'Nabíječka telefonu', 'Powerbanka', 'Sluchátka', 'Chytré hodinky', 'Nabíjecí kabely', 'Cestovní adaptér']],
        ['Oblečení', '👕', ['Trička', 'Spodní prádlo', 'Ponožky', 'Kalhoty / kraťasy', 'Mikina', 'Bunda', 'Pyžamo', 'Boty']],
        ['Hygiena', '🪥', ['Zubní kartáček', 'Zubní pasta', 'Deodorant', 'Sprchový gel', 'Šampon', 'Holení', 'Krém / SPF']],
        ['Lékárnička', '🩹', ['Osobní léky', 'Náplasti', 'Dezinfekce', 'Lék proti bolesti', 'Lék na alergii / zažívání']],
        ['Na cestu', '🎒', ['Klíče', 'Láhev na vodu', 'Svačina', 'Kapesníky', 'Sluneční brýle']]
      ],
      city: [['Město', '🏙️', ['Pohodlné boty', 'Malý batoh', 'Mapa / offline mapy', 'Lístky / vstupenky', 'Deštník']]],
      beach: [['Moře & pláž', '🏖️', ['Plavky', 'Plážový ručník', 'Opalovací krém', 'Brýle proti slunci', 'Klobouk / kšiltovka', 'Boty do vody', 'Taška na pláž']]],
      mountains: [['Hory', '⛰️', ['Trekové boty', 'Nepromokavá bunda', 'Funkční vrstvy', 'Čelovka', 'Turistické hole', 'Lékárnička do batohu', 'Offline mapa / trasa']]],
      business: [['Práce', '💼', ['Notebook', 'Nabíječka notebooku', 'Myš', 'VPN / přístupové údaje', 'Poznámkový blok', 'Pracovní doklady', 'Formální oblečení']]],
      family: [['Rodina', '👨‍👩‍👧‍👦', ['Doklady všech cestujících', 'Náhradní oblečení', 'Pití a svačina', 'Zábava na cestu', 'Dětské potřeby podle věku', 'Léky a drobná lékárnička']]]
    },
    en: {
      base: [
        ['Documents & money', '🪪', ['ID card / passport', 'Wallet', 'Payment card', 'Cash', 'Travel insurance', 'Bookings / tickets', 'Driving licence']],
        ['Electronics', '🔌', ['Phone', 'Phone charger', 'Power bank', 'Headphones', 'Smart watch', 'Charging cables', 'Travel adapter']],
        ['Clothing', '👕', ['T-shirts', 'Underwear', 'Socks', 'Trousers / shorts', 'Sweatshirt', 'Jacket', 'Sleepwear', 'Shoes']],
        ['Toiletries', '🪥', ['Toothbrush', 'Toothpaste', 'Deodorant', 'Shower gel', 'Shampoo', 'Shaving kit', 'Cream / SPF']],
        ['First aid', '🩹', ['Personal medication', 'Plasters', 'Disinfectant', 'Pain relief', 'Allergy / stomach medicine']],
        ['For the journey', '🎒', ['Keys', 'Water bottle', 'Snack', 'Tissues', 'Sunglasses']]
      ],
      city: [['City trip', '🏙️', ['Comfortable shoes', 'Small backpack', 'Map / offline maps', 'Tickets / passes', 'Umbrella']]],
      beach: [['Beach', '🏖️', ['Swimwear', 'Beach towel', 'Sunscreen', 'Sunglasses', 'Hat / cap', 'Water shoes', 'Beach bag']]],
      mountains: [['Mountains', '⛰️', ['Hiking boots', 'Waterproof jacket', 'Layered clothing', 'Headlamp', 'Trekking poles', 'First aid kit', 'Offline map / route']]],
      business: [['Work', '💼', ['Laptop', 'Laptop charger', 'Mouse', 'VPN / access details', 'Notebook', 'Work documents', 'Formal clothing']]],
      family: [['Family', '👨‍👩‍👧‍👦', ['Travel documents for everyone', 'Spare clothing', 'Drinks and snacks', 'Travel entertainment', 'Child essentials by age', 'Medication and first aid']]]
    }
  };

  let lang = localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'cs';
  let filter = 'all';
  let search = '';
  let state = loadState() || makeDefaultState();

  function toCategories(rows) {
    return rows.map(([name, icon, items]) => ({ id: uid(), name, icon, items: items.map(text => ({ id: uid(), text, done: false })) }));
  }

  function templateCategories(key) {
    const source = templateData[lang];
    const rows = [...source.base, ...(key === 'general' ? [] : (source[key] || []))];
    return toCategories(rows);
  }

  function makeDefaultState() {
    return { version: 3, trip: { name: '', destination: '', start: '', end: '' }, categories: templateCategories('general') };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return parsed && Array.isArray(parsed.categories) ? normalizeState(parsed) : null;
    } catch (_) { return null; }
  }

  function normalizeState(input) {
    return {
      version: 3,
      trip: {
        name: String(input?.trip?.name || ''), destination: String(input?.trip?.destination || ''),
        start: String(input?.trip?.start || ''), end: String(input?.trip?.end || '')
      },
      categories: (input.categories || []).map(cat => ({
        id: String(cat.id || uid()), name: String(cat.name || 'Kategorie'), icon: String(cat.icon || '•'),
        items: Array.isArray(cat.items) ? cat.items.map(item => ({ id: String(item.id || uid()), text: String(item.text || ''), done: Boolean(item.done) })).filter(item => item.text.trim()) : []
      }))
    };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateProgress();
  }

  function applyLanguage(next) {
    lang = next === 'en' ? 'en' : 'cs';
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    $$('[data-cs][data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
    $$('[data-cs-placeholder][data-en-placeholder]').forEach(el => { el.placeholder = el.dataset[`${lang}Placeholder`]; });
    $$('.lang-btn').forEach(btn => { const active = btn.dataset.lang === lang; btn.classList.toggle('active', active); btn.setAttribute('aria-pressed', String(active)); });
    document.title = lang === 'cs' ? 'Travel Checklist — CaseyCZ' : 'Travel Checklist — CaseyCZ';
    render();
  }

  function applyTheme(theme) {
    const next = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
    const btn = $('#themeToggle');
    if (btn) btn.textContent = next === 'dark' ? '☀' : '☾';
    const meta = $('#themeColor');
    if (meta) meta.content = next === 'dark' ? '#070b14' : '#eef3f8';
  }

  function updateProgress() {
    const all = state.categories.flatMap(c => c.items);
    const done = all.filter(i => i.done).length;
    const total = all.length;
    const pct = total ? Math.round(done / total * 100) : 0;
    $('#progressBar').style.width = `${pct}%`;
    $('#progressNumber').textContent = `${pct}%`;
    $('#progressText').textContent = `${ui[lang].progress}: ${done} / ${total} ${ui[lang].items}`;
  }

  function render() {
    const root = $('#categories');
    root.innerHTML = '';
    const query = search.trim().toLocaleLowerCase(lang === 'cs' ? 'cs-CZ' : 'en-US');
    let renderedItems = 0;

    state.categories.forEach(category => {
      const visible = category.items.filter(item => {
        const filterOk = filter === 'all' || (filter === 'done' ? item.done : !item.done);
        const searchOk = !query || item.text.toLocaleLowerCase().includes(query) || category.name.toLocaleLowerCase().includes(query);
        return filterOk && searchOk;
      });
      if (!visible.length && (filter !== 'all' || query)) return;
      renderedItems += visible.length;

      const card = document.createElement('section');
      card.className = 'category';

      const head = document.createElement('div'); head.className = 'category-head';
      const icon = document.createElement('div'); icon.className = 'category-icon'; icon.textContent = category.icon || '•';
      const title = document.createElement('div'); title.className = 'category-title';
      const strong = document.createElement('strong'); strong.textContent = category.name;
      const small = document.createElement('small'); small.textContent = `${category.items.filter(i => i.done).length} / ${category.items.length}`;
      title.append(strong, small);
      const actions = document.createElement('div'); actions.className = 'category-actions';
      const delCat = document.createElement('button'); delCat.className = 'tiny-btn delete'; delCat.type = 'button'; delCat.title = lang === 'cs' ? 'Smazat kategorii' : 'Delete category'; delCat.textContent = '×';
      delCat.addEventListener('click', () => { if (confirm(ui[lang].confirmCategory)) { state.categories = state.categories.filter(c => c.id !== category.id); saveState(); render(); } });
      actions.append(delCat); head.append(icon, title, actions); card.append(head);

      const items = document.createElement('div'); items.className = 'items';
      visible.forEach(item => {
        const row = document.createElement('div'); row.className = `item${item.done ? ' done' : ''}`;
        const check = document.createElement('input'); check.type = 'checkbox'; check.checked = item.done; check.setAttribute('aria-label', item.text);
        check.addEventListener('change', () => { item.done = check.checked; saveState(); render(); });
        const label = document.createElement('span'); label.className = 'item-label'; label.textContent = item.text;
        const del = document.createElement('button'); del.className = 'delete-item'; del.type = 'button'; del.title = lang === 'cs' ? 'Smazat položku' : 'Delete item'; del.textContent = '×';
        del.addEventListener('click', () => { category.items = category.items.filter(i => i.id !== item.id); saveState(); render(); });
        row.append(check, label, del); items.append(row);
      });
      card.append(items);

      const form = document.createElement('form'); form.className = 'add-item-form';
      const input = document.createElement('input'); input.type = 'text'; input.placeholder = ui[lang].itemPlaceholder; input.maxLength = 120;
      const add = document.createElement('button'); add.type = 'submit'; add.textContent = ui[lang].addItem;
      form.append(input, add);
      form.addEventListener('submit', e => { e.preventDefault(); const text = input.value.trim(); if (!text) return; category.items.push({ id: uid(), text, done: false }); input.value = ''; saveState(); render(); });
      card.append(form); root.append(card);
    });

    if (!root.children.length || (!renderedItems && (filter !== 'all' || query))) {
      const empty = document.createElement('div'); empty.className = 'empty'; empty.textContent = ui[lang].empty; root.append(empty);
    }
    updateProgress();
  }

  function buildShareText() {
    const tripName = state.trip.name.trim() || ui[lang].defaultTrip;
    const lines = [tripName];
    if (state.trip.destination.trim()) lines.push(state.trip.destination.trim());
    if (state.trip.start || state.trip.end) lines.push(`${state.trip.start || '—'} → ${state.trip.end || '—'}`);
    lines.push('');
    state.categories.forEach(cat => {
      lines.push(`${cat.icon || '•'} ${cat.name}`);
      cat.items.forEach(item => lines.push(`${item.done ? '☑' : '☐'} ${item.text}`));
      lines.push('');
    });
    return lines.join('\n').trim();
  }

  function showToast(message) {
    const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function filename() {
    return (state.trip.name || 'travel-checklist').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'travel-checklist';
  }

  function wire() {
    ['tripName','destination','startDate','endDate'].forEach(id => {
      const el = $(`#${id}`);
      el.addEventListener('input', () => {
        const map = { tripName: 'name', destination: 'destination', startDate: 'start', endDate: 'end' };
        state.trip[map[id]] = el.value; saveState();
      });
    });

    $$('.filter-btn').forEach(btn => btn.addEventListener('click', () => { filter = btn.dataset.filter; $$('.filter-btn').forEach(b => b.classList.toggle('active', b === btn)); render(); }));
    $('#searchInput').addEventListener('input', e => { search = e.target.value; render(); });
    $('#addCategoryForm').addEventListener('submit', e => { e.preventDefault(); const input = $('#newCategory'); const name = input.value.trim(); if (!name) return; state.categories.push({ id: uid(), name, icon: '•', items: [] }); input.value = ''; saveState(); render(); });

    $('#applyTemplate').addEventListener('click', () => { if (!confirm(ui[lang].confirmTemplate)) return; state.categories = templateCategories($('#templateSelect').value); saveState(); render(); });
    $('#newList').addEventListener('click', () => { if (!confirm(ui[lang].confirmNew)) return; state = makeDefaultState(); syncInputs(); saveState(); render(); });
    $('#resetChecks').addEventListener('click', () => { state.categories.forEach(c => c.items.forEach(i => i.done = false)); saveState(); render(); showToast(ui[lang].reset); });
    $('#printList').addEventListener('click', () => window.print());

    $('#exportList').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${filename()}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); showToast(ui[lang].saved);
    });
    $('#importList').addEventListener('click', () => $('#importFile').click());
    $('#importFile').addEventListener('change', async e => {
      const file = e.target.files?.[0]; if (!file) return;
      try { const parsed = JSON.parse(await file.text()); if (!Array.isArray(parsed.categories)) throw new Error('Invalid'); state = normalizeState(parsed); syncInputs(); saveState(); render(); showToast(ui[lang].imported); } catch (_) { showToast(ui[lang].invalid); }
      e.target.value = '';
    });

    $('#shareList').addEventListener('click', async () => {
      const text = buildShareText();
      try {
        if (navigator.share) await navigator.share({ title: state.trip.name || ui[lang].shareTitle, text });
        else if (navigator.clipboard) { await navigator.clipboard.writeText(text); showToast(ui[lang].copied); }
        else window.prompt(ui[lang].shareTitle, text);
      } catch (err) { if (err?.name !== 'AbortError') showToast(ui[lang].invalid); }
    });

    $('#themeToggle').addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
    $$('.lang-btn').forEach(btn => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));
  }

  function syncInputs() {
    $('#tripName').value = state.trip.name;
    $('#destination').value = state.trip.destination;
    $('#startDate').value = state.trip.start;
    $('#endDate').value = state.trip.end;
  }

  const storedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  syncInputs(); wire(); applyLanguage(lang); render();
})();

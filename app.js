/* ============================================
   STATE
   ============================================ */
let currentPkg = null;
let currentTab = 'tutorial';

/* ============================================
   SHARED INIT (called by index.html or package pages)
   ============================================ */
function initPage() {
  if (window.innerWidth <= 900) {
    sidebarOpen = false;
    document.getElementById('toggle-btn').classList.add('shifted');
  }
  window.addEventListener('scroll', updateProgress);
}

function updateProgress() {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.getElementById('prog-bar').style.transform = `scaleX(${pct})`;
  const backTop = document.getElementById('back-top');
  if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
}


/* ============================================
   SIDEBAR
   ============================================ */
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  const categories = [...new Set(PACKAGES.map(p => p.category))];
  let html = '';
  categories.forEach(cat => {
    html += `<div class="nav-section">${cat}</div>`;
    PACKAGES.filter(p => p.category === cat).forEach(p => {
      html += `<div class="nav-item" id="nav-${p.id}" onclick="openPackage('${p.id}')">
        <span class="ni-icon">${p.icon}</span>
        <span>${p.name}</span>
      </div>`;
    });
  });
  nav.innerHTML = html;
}

function filterSidebar() {
  const q = document.getElementById('sidebar-search').value.toLowerCase();
  document.querySelectorAll('.nav-item').forEach(el => {
    el.style.display = el.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

let sidebarOpen = true;
function toggleSidebar() {
  const isMobile = window.innerWidth <= 900;
  sidebarOpen = !sidebarOpen;
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const btn = document.getElementById('toggle-btn');
  if (isMobile) {
    sidebar.classList.toggle('mobile-open', sidebarOpen);
    overlay.classList.toggle('active', sidebarOpen);
  } else {
    sidebar.classList.toggle('collapsed', !sidebarOpen);
    document.getElementById('main').classList.toggle('expanded', !sidebarOpen);
    btn.classList.toggle('shifted', !sidebarOpen);
  }
  btn.textContent = '☰';
}
// On resize, reset sidebar state properly
// نحفظ العرض الأخير — لو العرض ما اتغيرش يبقى الـ resize سببه الكيبورد مش دوران الشاشة
let lastWindowWidth = window.innerWidth;
window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  if (newWidth === lastWindowWidth) return; // الكيبورد اتفتح/اتقفل — تجاهل
  lastWindowWidth = newWidth;

  const isMobile = newWidth <= 900;
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!isMobile) {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    if (sidebarOpen) {
      sidebar.classList.remove('collapsed');
      document.getElementById('main').classList.remove('expanded');
    }
  } else {
    sidebar.classList.remove('collapsed');
    document.getElementById('main').classList.remove('expanded');
    if (!sidebarOpen) { sidebarOpen = true; }
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    sidebarOpen = false;
  }
});

/* ============================================
   GRID
   ============================================ */
function buildGrid() {
  const grid = document.getElementById('pkg-grid');
  grid.innerHTML = PACKAGES.map((p,i) => `
    <div class="pkg-card ${p.theme}" onclick="openPackage('${p.id}')" style="animation-delay:${i*0.04}s">
      <div class="pkg-header">
        <div class="pkg-icon">${p.icon}</div>
        <div>
          <div class="pkg-title">${p.name}</div>
          <div class="pkg-subtitle">${p.subtitle}</div>
        </div>
      </div>
      <div class="pkg-desc">${p.desc}</div>
      <div class="pkg-tags">${p.tags.map(t=>`<span class="pkg-tag">${t}</span>`).join('')}</div>
      <div class="pkg-footer">
        <div class="pkg-progress-wrap">
          <div class="pkg-progress-bar"><div class="pkg-progress-fill" data-w="0" style="width:0"></div></div>
          <span>0%</span>
        </div>
        <button class="pkg-btn">ابدأ ←</button>
      </div>
    </div>
  `).join('');
  document.getElementById('pkg-count').textContent = PACKAGES.length;
}

/* ============================================
   OPEN PACKAGE
   ============================================ */
function openPackage(id) {
  currentPkg = PACKAGES.find(p => p.id === id);
  if (!currentPkg) return;

  // sidebar active
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');

  // close sidebar on mobile after selecting a package
  if (window.innerWidth <= 900 && sidebarOpen) {
    sidebarOpen = false;
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebar-overlay').classList.remove('active');
  }

  // header
  document.getElementById('breadcrumb-name').textContent = currentPkg.name;
  document.getElementById('detail-icon').textContent = currentPkg.icon;
  document.getElementById('detail-icon').className = `detail-icon ${currentPkg.theme}`;
  document.getElementById('detail-icon').style.cssText = `width:54px;height:54px;border-radius:14px;font-size:1.6rem;display:flex;align-items:center;justify-content:center;`;
  document.getElementById('detail-h1').textContent = currentPkg.name;
  document.getElementById('detail-tagline').textContent = currentPkg.desc;
  document.getElementById('qa-count-badge').textContent = currentPkg.qa?.length || 0;

  // build content
  buildTutorial(currentPkg);
  buildInterview(currentPkg);

  // show detail
  document.getElementById('home-view').style.display = 'none';
  document.getElementById('pkg-detail').style.display = 'block';

  // reset to tutorial tab
  switchTab('tutorial', document.querySelector('.tab-btn'));

  window.scrollTo(0, 0);
}

function showHome() {
  document.getElementById('home-view').style.display = 'block';
  document.getElementById('pkg-detail').style.display = 'none';
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  currentPkg = null;
  window.scrollTo(0, 0);
}

/* ============================================
   TUTORIAL
   ============================================ */
function buildTutorial(pkg) {
  const toc = pkg.tutorial.sections.map((s,i) =>
    `<div class="toc-link" id="toc-${i}" onclick="scrollToSection(${i})">${i+1}. ${s.title}</div>`
  ).join('');

  const sections = pkg.tutorial.sections.map((s,i) => `
    <div class="tut-section" id="section-${i}">
      <div class="sec-title-row ${pkg.theme}">
        <div class="sec-num">${i+1}</div>
        <h2 class="sec-h2">${s.title}</h2>
      </div>
      ${s.content}
    </div>
  `).join('');

  document.getElementById('tab-tutorial').innerHTML = `
    <div class="tut-layout">
      <aside class="tut-toc">
        <div class="toc-head">المحتويات</div>
        ${toc}
      </aside>
      <div class="tut-body">${sections}</div>
    </div>
  `;

  // add copy buttons functionality
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.onclick = function() {
      const pre = this.closest('.code-top').nextElementSibling;
      navigator.clipboard?.writeText(pre.textContent || '');
      this.textContent = '✓ تم';
      setTimeout(() => this.textContent = 'نسخ', 1500);
    };
  });
}

function scrollToSection(i) {
  document.getElementById('section-' + i)?.scrollIntoView({behavior:'smooth', block:'start'});
}

/* ============================================
   INTERVIEW
   ============================================ */
let currentFilter = 'all';

function buildInterview(pkg) {
  const qa = pkg.qa || [];
  const counts = { easy: qa.filter(q=>q.level==='easy').length, medium: qa.filter(q=>q.level==='medium').length, hard: qa.filter(q=>q.level==='hard').length };

  const statsHtml = `
    <div class="qa-stats">
      <div class="qa-stat"><div class="qa-stat-num" style="color:var(--neon)">${qa.length}</div><div class="qa-stat-lbl">إجمالي</div></div>
      <div class="qa-stat"><div class="qa-stat-num" style="color:var(--neon)">${counts.easy}</div><div class="qa-stat-lbl">سهل 🟢</div></div>
      <div class="qa-stat"><div class="qa-stat-num" style="color:var(--amber)">${counts.medium}</div><div class="qa-stat-lbl">متوسط 🟡</div></div>
      <div class="qa-stat"><div class="qa-stat-num" style="color:var(--neon3)">${counts.hard}</div><div class="qa-stat-lbl">صعب 🔴</div></div>
    </div>`;

  const cardsHtml = qa.map((q, i) => `
    <div class="qa-card ${q.level}" data-level="${q.level}" data-q="${q.q.toLowerCase()}">
      <div class="qa-q" onclick="toggleQA(this)">
        <div class="q-num-badge">${String(i+1).padStart(2,'0')}</div>
        <div class="q-text">${q.q}</div>
        <span class="q-level ${q.level}">${q.level === 'easy' ? '🟢 سهل' : q.level === 'medium' ? '🟡 متوسط' : '🔴 صعب'}</span>
        <span class="q-chevron">▾</span>
      </div>
      <div class="qa-a"><div class="qa-a-inner">${q.a}</div></div>
    </div>
  `).join('');

  document.getElementById('tab-interview').innerHTML = `
    <div class="qa-filters">
      <span class="qa-filter-label">فلتر:</span>
      <button class="qf-btn active" onclick="filterQA('all',this)">الكل (${qa.length})</button>
      <button class="qf-btn" onclick="filterQA('easy',this)">🟢 سهل (${counts.easy})</button>
      <button class="qf-btn" onclick="filterQA('medium',this)">🟡 متوسط (${counts.medium})</button>
      <button class="qf-btn" onclick="filterQA('hard',this)">🔴 صعب (${counts.hard})</button>
      <div class="qa-search-wrap">
        <input class="qa-search" type="text" placeholder="ابحث..." oninput="searchQA(this)">
      </div>
    </div>
    ${statsHtml}
    <div id="qa-list">${cardsHtml}</div>
  `;
}

function toggleQA(el) {
  el.closest('.qa-card').classList.toggle('open');
}

function filterQA(level, btn) {
  currentFilter = level;
  document.querySelectorAll('.qf-btn').forEach(b => b.className = 'qf-btn');
  if (level === 'all') btn.className = 'qf-btn active';
  else btn.className = `qf-btn active-${level}`;

  document.querySelectorAll('.qa-card').forEach(card => {
    card.classList.toggle('hidden', level !== 'all' && card.dataset.level !== level);
  });
}

function searchQA(input) {
  const q = input.value.toLowerCase();
  document.querySelectorAll('.qa-card').forEach(card => {
    const match = card.dataset.q.includes(q);
    card.classList.toggle('hidden', !match);
  });
}

/* ============================================
   TABS
   ============================================ */
function switchTab(tab, btn) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  // find the correct button
  document.querySelectorAll('.tab-btn').forEach(b => {
    if (b.textContent.includes(tab === 'tutorial' ? 'Tutorial' : 'الانترفيو')) b.classList.add('active');
  });
  document.getElementById('tab-' + tab).classList.add('active');
}

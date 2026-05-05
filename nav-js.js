/* ============================================================
   nav.js — Lógica de navegación y utilidades compartidas
   Incluir en todos los archivos HTML del proyecto
   ============================================================ */

/* ── Definición de todas las páginas del sitio ── */
const SITE_PAGES = [
  { id: 'home',              file: 'index.html',          label: 'Inicio',            icon: '🏠', parent: null },
  { id: 'prompt',            file: 'mod01-prompt.html',   label: 'El Prompt',         icon: '✍️', num: '01', parent: null },
  { id: 'chatbots',          file: 'mod02-chatbots.html', label: 'Chatbots',          icon: '🤖', num: '02', parent: null, hasChildren: true },
  { id: 'chatbots-gpts',     file: 'mod02a-gpts.html',    label: 'GPTs de ChatGPT',   icon: '⚡', parent: 'chatbots' },
  { id: 'chatbots-gemas',    file: 'mod02b-gemas.html',   label: 'Gemas de Gemini',   icon: '💎', parent: 'chatbots' },
  { id: 'chatbots-claude',   file: 'mod02c-claude.html',  label: 'Claude: Artefactos',icon: '✦', parent: 'chatbots' },
  { id: 'imagenes',          file: 'mod03-imagenes.html', label: 'Gen. Imágenes',     icon: '🖼️', num: '03', parent: null },
  { id: 'presentaciones',    file: 'mod04-pres.html',     label: 'Presentaciones',    icon: '📊', num: '04', parent: null },
  { id: 'hojas',             file: 'mod05-hojas.html',    label: 'Hojas de Cálculo',  icon: '📈', num: '05', parent: null },
  { id: 'transcripciones',   file: 'mod06-trans.html',    label: 'Transcripciones',   icon: '🎙️', num: '06', parent: null },
  { id: 'visual',            file: 'mod07-visual.html',   label: 'Org. Visual',       icon: '🗺️', num: '07', parent: null },
  { id: 'investigacion',     file: 'mod08-invest.html',   label: 'Investigación',     icon: '🔬', num: '08', parent: null },
  { id: 'notebooklm',        file: 'mod09-notebook.html', label: 'NotebookLM',        icon: '📓', num: '09', parent: null },
];

/* ── Detectar la página actual ── */
function getCurrentPageId() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const page = SITE_PAGES.find(p => p.file === path);
  return page ? page.id : 'home';
}

/* ── Navegar a otra página ── */
function navigate(pageId) {
  const page = SITE_PAGES.find(p => p.id === pageId);
  if (page) window.location.href = page.file;
}

/* ── Renderizar el sidebar completo ── */
function renderSidebar() {
  const currentId = getCurrentPageId();
  const currentPage = SITE_PAGES.find(p => p.id === currentId);
  // Si estamos en una subpágina, el padre debe estar expandido
  const activeParent = currentPage?.parent || (currentPage?.hasChildren ? currentId : null);

  const container = document.getElementById('sidebar');
  if (!container) return;

  let html = `
    <div class="sidebar-section-label">Inicio</div>
    <div class="nav-item ${currentId === 'home' ? 'active' : ''}" onclick="navigate('home')">
      <span class="icon">🏠</span> Inicio
    </div>
    <div class="sidebar-section-label">Módulos</div>
  `;

  // Solo páginas raíz (sin parent)
  const roots = SITE_PAGES.filter(p => p.id !== 'home' && !p.parent);

  roots.forEach(page => {
    const isActive = currentId === page.id;
    const isParentActive = currentId === page.id || activeParent === page.id;
    const children = SITE_PAGES.filter(p => p.parent === page.id);
    const isOpen = isParentActive && children.length > 0;

    if (children.length > 0) {
      html += `
        <div class="nav-item nav-parent ${isActive ? 'active' : ''}" onclick="toggleSubnav('${page.id}')">
          <span class="icon">${page.icon}</span> ${page.label}
          <span class="subnav-arrow ${isOpen ? 'open' : ''}" id="arrow-${page.id}">▸</span>
          ${page.num ? `<span class="num">${page.num}</span>` : ''}
        </div>
        <div class="subnav ${isOpen ? 'open' : ''}" id="subnav-${page.id}">
      `;
      children.forEach(child => {
        html += `
          <div class="subnav-item ${currentId === child.id ? 'active' : ''}" onclick="navigate('${child.id}')">
            <span class="sub-icon">${child.icon}</span> ${child.label}
          </div>
        `;
      });
      html += `</div>`;
    } else {
      html += `
        <div class="nav-item ${isActive ? 'active' : ''}" onclick="navigate('${page.id}')">
          <span class="icon">${page.icon}</span> ${page.label}
          ${page.num ? `<span class="num">${page.num}</span>` : ''}
        </div>
      `;
    }
  });

  container.innerHTML = html;
}

/* ── Toggle subnav (sin navegación) ── */
function toggleSubnav(id) {
  // Si tiene hijos, solo expandir/colapsar. Si no, navegar.
  const page = SITE_PAGES.find(p => p.id === id);
  const children = SITE_PAGES.filter(p => p.parent === id);
  if (children.length === 0) { navigate(id); return; }

  const subnav = document.getElementById('subnav-' + id);
  const arrow  = document.getElementById('arrow-' + id);
  if (subnav) subnav.classList.toggle('open');
  if (arrow)  arrow.classList.toggle('open');
}

/* ── Sidebar móvil ── */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('visible');
}
function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('visible');
}

/* ── Copiar al portapapeles ── */
function copyCode(btn) {
  const block = btn.closest('.code-block');
  const content = block.querySelector('.code-content');
  const text = content.innerText || content.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✅ Copiado';
    btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = '📋 Copiar'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    btn.textContent = '✅ Copiado'; btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = '📋 Copiar'; btn.classList.remove('copied'); }, 2000);
  });
}

/* ── Acordeones ── */
function toggleAcc(header) {
  header.closest('.gpt-accordion').classList.toggle('open');
}

/* ── Quiz genérico ── */
function answerQuiz(opt, isCorrect) {
  const q = opt.closest('.quiz-q');
  if (q.dataset.answered) return;
  q.dataset.answered = 'true';
  const opts = q.querySelectorAll('.quiz-opt');
  opts.forEach(o => o.classList.add('disabled'));
  opt.classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) {
    opts.forEach(o => {
      if (o.getAttribute('onclick')?.includes(',true)')) o.classList.add('correct');
    });
  }
  const container = q.closest('[id^="quiz-"]');
  if (!container) return;
  const allQ = container.querySelectorAll('.quiz-q');
  const answered = container.querySelectorAll('.quiz-q[data-answered]');
  if (answered.length === allQ.length) {
    const score = Array.from(allQ).filter(q2 =>
      q2.querySelector('.quiz-opt.correct') && !q2.querySelector('.quiz-opt.wrong')
    ).length;
    const total = allQ.length;
    const el = document.getElementById(container.id + '-score');
    if (!el) return;
    el.style.display = 'block';
    el.style.cssText += 'padding:12px 16px;border-radius:8px;border:1px solid;font-weight:600;font-size:0.9rem;margin-top:12px;';
    const col = score === total ? '#2ea043' : score >= Math.ceil(total/2) ? '#d29922' : '#f85149';
    el.style.borderColor = col; el.style.color = col;
    el.style.background = score === total ? 'rgba(46,160,67,0.1)' : score >= Math.ceil(total/2) ? 'rgba(210,153,34,0.1)' : 'rgba(248,81,73,0.1)';
    el.innerHTML = score === total
      ? `✅ ¡Perfecto! ${score}/${total}.`
      : score >= Math.ceil(total/2)
      ? `🟡 ${score}/${total} — Repasa lo que fallaste.`
      : `❌ ${score}/${total} — Vuelve a leer la teoría.`;
  }
}

/* ── Init al cargar ── */
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  // Cerrar sidebar en móvil al hacer clic en overlay
  document.getElementById('overlay')?.addEventListener('click', closeSidebar);
});

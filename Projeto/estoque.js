/* ============================================================
   estoque.js — Vintage Motors
   Renderiza o grid de carros, filtros e paginação
   Linkar APENAS em estoque.html (após script.js)
   ============================================================ */

const ITENS_POR_PAGINA = 4;
let paginaAtual = 1;
let carrosFiltrados = [...CARROS];

// ─────────────────────────────────────────────
// GERAR HTML DE UM CARD
// ─────────────────────────────────────────────
function criarCardHTML(carro) {
  const noCarr = noCarrinho(carro.id);
  const btnCarrClass = noCarr ? 'car-fav ativo' : 'car-fav';
  const btnCarrTitle = noCarr ? 'Remover da lista' : 'Adicionar à lista';

  return `
    <article class="car-card" data-id="${carro.id}">
      <div class="car-card-img">
        <img src="${carro.foto}" alt="${carro.nome} ${carro.ano}" loading="lazy">
        <span class="car-badge ${carro.status}">${labelStatus(carro.status)}</span>
      </div>
      <div class="car-card-body">
        <h3 class="car-nome">${carro.nome}</h3>
        <p class="car-ano">${carro.ano}</p>
        <p class="car-desc">${carro.motor} · ${carro.cambio}</p>
        <div class="car-card-footer">
          <button class="btn-ver" data-id="${carro.id}">Ver Detalhes</button>
          <span class="${btnCarrClass}" data-id="${carro.id}" title="${btnCarrTitle}">
            <img src="img/carrinho.png" alt="Carrinho">
          </span>
        </div>
      </div>
    </article>
  `;
}

// ─────────────────────────────────────────────
// RENDERIZAR O GRID
// ─────────────────────────────────────────────
function renderizarGrid() {
  const grid = document.getElementById('estoque-grid');
  if (!grid) return;

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const pagina = carrosFiltrados.slice(inicio, fim);

  if (pagina.length === 0) {
    grid.innerHTML = `
      <div class="sem-resultados">
        <p>Nenhum veículo encontrado com os filtros selecionados.</p>
        <button onclick="limparFiltros()">Limpar Filtros</button>
      </div>
    `;
  } else {
    grid.innerHTML = pagina.map(criarCardHTML).join('');
    // Eventos dos cards recém-criados
    grid.querySelectorAll('.btn-ver').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.href = `carro.html?id=${btn.dataset.id}`;
      });
    });
    grid.querySelectorAll('.car-fav').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        if (noCarrinho(id)) {
          removerDoCarrinho(id);
          btn.classList.remove('ativo');
          btn.title = 'Adicionar à lista';
        } else {
          adicionarAoCarrinho(id);
          btn.classList.add('ativo');
          btn.title = 'Remover da lista';
        }
        atualizarContadorCarrinho();
      });
    });
  }

  renderizarPaginacao();
}

// ─────────────────────────────────────────────
// PAGINAÇÃO
// ─────────────────────────────────────────────
function renderizarPaginacao() {
  const paginacao = document.getElementById('paginacao');
  if (!paginacao) return;

  const totalPaginas = Math.max(1, Math.ceil(carrosFiltrados.length / ITENS_POR_PAGINA));

  let html = `<button class="pag-btn pag-prev" ${paginaAtual === 1 ? 'disabled' : ''}>&#8249;</button>`;

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button class="pag-btn pag-num ${i === paginaAtual ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  html += `<button class="pag-btn pag-next" ${paginaAtual === totalPaginas ? 'disabled' : ''}>&#8250;</button>`;

  paginacao.innerHTML = html;

  paginacao.querySelector('.pag-prev').addEventListener('click', () => {
    if (paginaAtual > 1) { paginaAtual--; renderizarGrid(); }
  });
  paginacao.querySelector('.pag-next').addEventListener('click', () => {
    if (paginaAtual < totalPaginas) { paginaAtual++; renderizarGrid(); }
  });
  paginacao.querySelectorAll('.pag-num').forEach(btn => {
    btn.addEventListener('click', () => {
      paginaAtual = parseInt(btn.dataset.page);
      renderizarGrid();
    });
  });
}

// ─────────────────────────────────────────────
// FILTROS
// ─────────────────────────────────────────────
function aplicarFiltros() {
  const busca = document.getElementById('search-input').value.toLowerCase().trim();
  const marca = document.getElementById('filtro-marca').value;
  const decada = document.getElementById('filtro-decada').value;
  const status = document.getElementById('filtro-status').value;

  carrosFiltrados = CARROS.filter(c => {
    const buscaOk = !busca ||
      c.nome.toLowerCase().includes(busca) ||
      c.marca.toLowerCase().includes(busca) ||
      String(c.ano).includes(busca);
    const marcaOk = !marca || c.marca === marca;
    const decadaOk = !decada || c.decada === parseInt(decada);
    const statusOk = !status || c.status === status;
    return buscaOk && marcaOk && decadaOk && statusOk;
  });

  paginaAtual = 1;
  renderizarGrid();
}

function limparFiltros() {
  document.getElementById('search-input').value = '';
  document.getElementById('filtro-marca').value = '';
  document.getElementById('filtro-decada').value = '';
  document.getElementById('filtro-status').value = '';
  carrosFiltrados = [...CARROS];
  paginaAtual = 1;
  renderizarGrid();
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  carrosFiltrados = [...CARROS];
  renderizarGrid();

  // Botão filtrar
  document.getElementById('btn-filtrar')?.addEventListener('click', aplicarFiltros);

  // Busca em tempo real ao pressionar Enter
  document.getElementById('search-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') aplicarFiltros();
  });

  // Selects aplicam filtro automaticamente ao mudar
  ['filtro-marca', 'filtro-decada', 'filtro-status'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', aplicarFiltros);
  });
});
/* ============================================================
   carrinho.js — Vintage Motors
   Renderiza os itens do carrinho, total e remove itens
   Linkar APENAS em carrinho.html (após script.js)
   ============================================================ */

// ─────────────────────────────────────────────
// GERAR HTML DE UM ITEM DO CARRINHO
// ─────────────────────────────────────────────
function criarItemHTML(carro) {
  return `
    <article class="carrinho-item" data-id="${carro.id}">
      <div class="carrinho-item-img">
        <img src="${carro.foto}" alt="${carro.nome} ${carro.ano}">
        <span class="car-badge ${carro.status}">${labelStatus(carro.status)}</span>
      </div>
      <div class="carrinho-item-info">
        <div class="item-info-top">
          <h3 class="item-nome">${carro.nome}</h3>
          <p class="item-ano">${carro.ano}</p>
          <p class="item-desc">${carro.descricao.substring(0, 130)}...</p>
        </div>
        <div class="item-info-bottom">
          <div class="item-preco-wrap">
            <span class="item-preco-label">Preço sob consulta</span>
            <span class="item-preco">${formatarPreco(carro.preco)}</span>
          </div>
          <div class="item-acoes">
            <button class="btn-detalhes-item" data-id="${carro.id}">Ver Detalhes</button>
            <button class="btn-remover" data-id="${carro.id}" aria-label="Remover ${carro.nome} do carrinho">
              <span class="btn-remover-icon">✕</span>
              Remover
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ─────────────────────────────────────────────
// ATUALIZAR RESUMO LATERAL
// ─────────────────────────────────────────────
function atualizarResumo(itens) {
  const total = itens.reduce((acc, c) => acc + c.preco, 0);
  const qtd = itens.length;

  const elQtd = document.getElementById('resumo-qtd');
  const elTotal = document.getElementById('resumo-total');
  const heroCount = document.getElementById('hero-count');

  if (elQtd) elQtd.textContent = qtd;
  if (elTotal) elTotal.textContent = formatarPreco(total);
  if (heroCount) heroCount.textContent = qtd;
}

// ─────────────────────────────────────────────
// RENDERIZAR LISTA COMPLETA
// ─────────────────────────────────────────────
function renderizarCarrinho() {
  const lista = document.getElementById('carrinho-lista');
  const vazio = document.getElementById('carrinho-vazio');
  const resumo = document.getElementById('carrinho-resumo');
  if (!lista) return;

  const ids = getCarrinho();
  const itens = ids.map(id => CARROS[id]).filter(Boolean);

  if (itens.length === 0) {
    lista.innerHTML = '';
    lista.style.display = 'none';
    if (vazio) vazio.style.display = 'flex';
    if (resumo) resumo.style.display = 'none';
  } else {
    lista.style.display = 'flex';
    lista.innerHTML = itens.map(criarItemHTML).join('');
    if (vazio) vazio.style.display = 'none';
    if (resumo) resumo.style.display = 'flex';

    // Eventos: remover
    lista.querySelectorAll('.btn-remover').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        removerDoCarrinho(id);
        renderizarCarrinho();
      });
    });

    // Eventos: ver detalhes
    lista.querySelectorAll('.btn-detalhes-item').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.href = `carro.html?id=${btn.dataset.id}`;
      });
    });
  }

  atualizarResumo(itens);
}

// ─────────────────────────────────────────────
// BOTÃO FINALIZAR / SOLICITAR CONTATO
// ─────────────────────────────────────────────
function configurarBotaoFinalizar() {
  document.getElementById('btn-finalizar')?.addEventListener('click', () => {
    const ids = getCarrinho();
    if (ids.length === 0) return;
    const nomes = ids.map(id => CARROS[id]?.nome).filter(Boolean).join(', ');
    alert(`Solicitação enviada!\n\nVeículos de interesse:\n${nomes}\n\nNossa equipe entrará em contato em breve.`);
  });
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrinho();
  configurarBotaoFinalizar();
});
/* ============================================================
   carro.js — Vintage Motors
   Lê ?id= da URL, busca o carro em CARROS e preenche
   todos os elementos da página carro.html
   Linkar APENAS em carro.html (após script.js)
   ============================================================ */

// ─────────────────────────────────────────────
// HELPER — preenche um elemento pelo id
// ─────────────────────────────────────────────
function preencher(seletor, valor) {
  const el = document.getElementById(seletor);
  if (el) el.textContent = valor;
}

// ─────────────────────────────────────────────
// GALERIA LIGHTBOX
// ─────────────────────────────────────────────
let lightboxIndex = 0;
let fotosGaleria = [];

function abrirLightbox(index) {
  lightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = fotosGaleria[lightboxIndex];
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.style.display = 'none';
  document.body.style.overflow = '';
}

function navLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + fotosGaleria.length) % fotosGaleria.length;
  const img = document.getElementById('lightbox-img');
  if (img) img.src = fotosGaleria[lightboxIndex];
}

// ─────────────────────────────────────────────
// PREENCHER A PÁGINA
// ─────────────────────────────────────────────
function carregarCarro(carro) {
  // Título da aba
  document.title = `${carro.nome} ${carro.ano} — Vintage Motors`;
  document.getElementById('page-title').textContent = `${carro.nome} ${carro.ano} — Vintage Motors`;

  // ── HERO ──────────────────────────────────
  const heroImg = document.getElementById('hero-img');
  if (heroImg) { heroImg.src = carro.foto; heroImg.alt = `${carro.nome} ${carro.ano}`; }

  const heroBadge = document.getElementById('hero-badge');
  if (heroBadge) {
    heroBadge.textContent = labelStatus(carro.status);
    heroBadge.className = `hero-badge ${carro.status}`;
  }

  document.getElementById('bc-nome').textContent = `${carro.nome} ${carro.ano}`;
  preencher('hero-marca', carro.marca.toUpperCase());
  preencher('hero-nome', carro.nome);
  preencher('hero-ano', String(carro.ano));
  preencher('spec-motor', carro.motor);
  preencher('spec-potencia', carro.potencia);
  preencher('spec-cambio', carro.cambio);
  preencher('spec-cor', carro.corExt);
  preencher('hero-preco', formatarPreco(carro.preco));

  // ── BOTÕES HERO ───────────────────────────
  const btnCarrinho = document.getElementById('btn-carrinho');
  if (btnCarrinho) {
    const atualizar = () => {
      if (noCarrinho(carro.id)) {
        btnCarrinho.textContent = '✓ Na Lista';
        btnCarrinho.classList.add('no-carrinho');
      } else {
        btnCarrinho.textContent = '+ Adicionar à Lista';
        btnCarrinho.classList.remove('no-carrinho');
      }
    };
    atualizar();
    btnCarrinho.addEventListener('click', () => {
      if (noCarrinho(carro.id)) {
        removerDoCarrinho(carro.id);
      } else {
        adicionarAoCarrinho(carro.id);
      }
      atualizar();
    });
  }

  document.getElementById('btn-interesse')?.addEventListener('click', () => {
    window.location.href = 'contato.html';
  });

  // ── GALERIA ───────────────────────────────
  fotosGaleria = carro.fotos || [carro.foto];
  for (let i = 0; i < 6; i++) {
    const el = document.getElementById(`gal-${i}`);
    if (el) {
      const src = fotosGaleria[i] || fotosGaleria[0];
      el.src = src;
      el.alt = `${carro.nome} — foto ${i + 1}`;
      el.parentElement.style.cursor = 'pointer';
      el.parentElement.addEventListener('click', () => abrirLightbox(i));
    }
  }

  // Lightbox controls
  document.getElementById('lightbox-close')?.addEventListener('click', fecharLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => navLightbox(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => navLightbox(1));
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) fecharLightbox();
  });
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || lb.style.display === 'none') return;
    if (e.key === 'Escape') fecharLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });

  // ── DESCRIÇÃO ─────────────────────────────
  preencher('desc-titulo', `${carro.nome} — ${carro.ano}`);
  preencher('desc-texto', carro.descricao);
  preencher('rest-texto', carro.restauracao);

  // ── FICHA TÉCNICA ─────────────────────────
  preencher('ft-motor', carro.motor);
  preencher('ft-cilindros', carro.cilindros);
  preencher('ft-cilindrada', carro.cilindrada);
  preencher('ft-potencia', carro.potencia);
  preencher('ft-torque', carro.torque);
  preencher('ft-cambio', carro.cambio);
  preencher('ft-tracao', carro.tracao);
  preencher('ft-carroceria', carro.carroceria);
  preencher('ft-cor-ext', carro.corExt);
  preencher('ft-interior', carro.interior);
  preencher('ft-chassi', carro.chassi);
  preencher('ft-km', carro.km);

  // ── CTA ───────────────────────────────────
  preencher('cta-titulo', `Interessado no ${carro.nome}?`);
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  if (isNaN(id) || !CARROS[id]) {
    // ID inválido → redireciona para estoque
    window.location.href = 'estoque.html';
    return;
  }

  carregarCarro(CARROS[id]);
});
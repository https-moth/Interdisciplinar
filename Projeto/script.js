/* ============================================================
   script.js — Vintage Motors
   Banco de dados de carros + utilitários globais
   Linkado em TODAS as páginas
   ============================================================ */

// ─────────────────────────────────────────────
// BANCO DE DADOS DOS CARROS
// Adicione novos carros aqui. O índice (posição no array)
// é o ID usado em ?id=0, ?id=1, etc.
// ─────────────────────────────────────────────
const CARROS = [
  {
    id: 0,
    nome: "Ford Mustang Fastback",
    marca: "Ford",
    ano: 1967,
    decada: 1960,
    status: "disponivel",        // "disponivel" | "reservado" | "vendido"
    preco: 420000,
    motor: "V8 390ci",
    potencia: "325 cv",
    cambio: "Manual 4 marchas",
    tracao: "Traseira",
    cilindros: "8",
    cilindrada: "6.4 L",
    torque: "570 Nm",
    carroceria: "Fastback 2 portas",
    corExt: "Vermelho Highland Red",
    interior: "Couro preto restaurado",
    chassi: "7F02S187839",
    km: "42.000 km",
    foto: "img/CamaroSS1967.jpg",           // foto principal
    descricao: "Um dos Mustangs mais icônicos já produzidos. Este Fastback 1967 passou por restauração completa entre 2021 e 2022, com atenção meticulosa aos detalhes originais de fábrica. Motor 390ci totalmente revisado, pintura aplicada por pistola em camada dupla.",
    restauracao: "Restauração concluída em 2022. Lataria sem amassados, sem oxidação. Pintura original com verniz cerâmico. Motor desmontado e refeito. Documentação e numeração de chassi originais verificados."
  },
  {
    id: 1,
    nome: "Chevrolet Corvette Split Window",
    marca: "Chevrolet",
    ano: 1963,
    decada: 1960,
    status: "reservado",
    preco: 680000,
    motor: "V8 327ci",
    potencia: "340 cv",
    cambio: "Manual 4 marchas Muncie",
    tracao: "Traseira",
    cilindros: "8",
    cilindrada: "5.4 L",
    torque: "488 Nm",
    carroceria: "Coupe 2 portas",
    corExt: "Nassau Blue",
    interior: "Couro azul original",
    chassi: "30837S100847",
    km: "31.500 km",
    foto: "img/MustangMach1Fastback1969.jpg",
    descricao: "O Corvette Split Window de 1963 é considerado um dos carros americanos mais belos de todos os tempos. A janela traseira dividida ao meio existiu apenas neste ano, tornando o modelo absolutamente único e cobiçado por colecionadores.",
    restauracao: "Veículo em estado de preservação excepcional. Pintura original em Nassau Blue com retoques pontuais. Interior com couro restaurado à mão por especialista certificado."
  },
  {
    id: 2,
    nome: "Porsche 911 Carrera RS",
    marca: "Porsche",
    ano: 1973,
    decada: 1970,
    status: "disponivel",
    preco: 1250000,
    motor: "Flat-six 2.7 L",
    potencia: "210 cv",
    cambio: "Manual 5 marchas",
    tracao: "Traseira",
    cilindros: "6",
    cilindrada: "2.7 L",
    torque: "255 Nm",
    carroceria: "Coupe 2 portas",
    corExt: "Light Yellow",
    interior: "Tecido esportivo preto",
    chassi: "9113600896",
    km: "28.200 km",
    foto: "img/ImpalaSS1964.jpg",
    descricao: "O Porsche 911 Carrera RS 2.7 de 1973 é unanimemente considerado um dos 10 carros mais importantes da história do automobilismo. Produzido em série limitada para homologação em corridas, este exemplar é uma peça de museu em circulação.",
    restauracao: "Veículo com número de chassi verificado e documentação completa de fábrica. Motor original com revisão recente. Sem acidentes registrados. Pintura Light Yellow original com espessímetro confirmando camada única."
  },
  {
    id: 3,
    nome: "Cadillac Coupe DeVille",
    marca: "Chevrolet",
    ano: 1959,
    decada: 1950,
    status: "disponivel",
    preco: 310000,
    motor: "V8 390ci OHV",
    potencia: "345 cv",
    cambio: "Automático Hydra-Matic",
    tracao: "Traseira",
    cilindros: "8",
    cilindrada: "6.4 L",
    torque: "610 Nm",
    carroceria: "Coupe 2 portas",
    corExt: "Branco e Preto bicolor",
    interior: "Couro branco restaurado",
    chassi: "59F047847",
    km: "74.000 km",
    foto: "img/CadillacCoupeDeville1959.jpg",
    descricao: "O Cadillac de 1959 representa o auge do design americano da era dourada. Suas famosas aletas traseiras com lanternas em forma de míssil são o símbolo máximo do otimismo e exuberância do pós-guerra americano.",
    restauracao: "Restauração completa da carroceria realizada em 2020. Lataria sem intervenções. Pintura bicolor refatorada com tinta à base de solvente original. Interior em couro restaurado por artesão especializado."
  },
  {
  id: 4,
  nome: "DKW-Vemag Belcar",
  marca: "DKW-Vemag",
  ano: 1965,
  decada: 1960,
  status: "disponivel",
  preco: 165000,
  motor: "3 cilindros, 2 tempos",
  potencia: "60 cv",
  cambio: "Manual 4 marchas",
  tracao: "Dianteira",
  cilindros: "3",
  cilindrada: "981 cm³",
  torque: "95 Nm",
  carroceria: "Sedan 4 portas",
  corExt: "Azul Atlântico",
  interior: "Couro bege restaurado",
  chassi: "B6542198",
  km: "58.200 km",
  foto: "img/DKW_VemagBelcar1965.jpg",
  descricao: "O DKW-Vemag Belcar foi um dos automóveis mais importantes da indústria automobilística brasileira durante a década de 1960. Equipado com um característico motor de três cilindros e ciclo de dois tempos, destacou-se pelo desempenho surpreendente, tração dianteira e excelente estabilidade para a época, tornando-se um dos maiores símbolos da Vemag.",
  restauracao: "Exemplar completamente restaurado seguindo as especificações originais de fábrica. Pintura refeita na cor Azul Atlântico, acabamento cromado recuperado, interior em couro bege confeccionado artesanalmente e conjunto mecânico revisado, preservando o tradicional motor de dois tempos em perfeito funcionamento."
}
];

// ─────────────────────────────────────────────
// CARRINHO — localStorage
// ─────────────────────────────────────────────

function getCarrinho() {
  return JSON.parse(localStorage.getItem('vm_carrinho') || '[]');
}

function setCarrinho(arr) {
  localStorage.setItem('vm_carrinho', JSON.stringify(arr));
}

function adicionarAoCarrinho(id) {
  const lista = getCarrinho();
  if (!lista.includes(id)) {
    lista.push(id);
    setCarrinho(lista);
  }
  atualizarContadorCarrinho();
}

function removerDoCarrinho(id) {
  let lista = getCarrinho().filter(i => i !== id);
  setCarrinho(lista);
  atualizarContadorCarrinho();
}

function noCarrinho(id) {
  return getCarrinho().includes(id);
}

// Atualiza o badge (contador) no ícone do carrinho em qualquer página
function atualizarContadorCarrinho() {
  const contador = document.querySelector('.carrinho-contador');
  if (contador) {
    const n = getCarrinho().length;
    contador.textContent = n;
    contador.style.display = n > 0 ? 'flex' : 'none';
  }
}

// ─────────────────────────────────────────────
// FORMATAÇÃO
// ─────────────────────────────────────────────
function formatarPreco(valor) {
  return 'R$ ' + valor.toLocaleString('pt-BR');
}

function labelStatus(status) {
  const map = { disponivel: 'Disponível', reservado: 'Reservado', vendido: 'Vendido' };
  return map[status] || status;
}

// ─────────────────────────────────────────────
// INIT GLOBAL
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  atualizarContadorCarrinho();
});
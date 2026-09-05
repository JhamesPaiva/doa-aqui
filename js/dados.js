const imagensCategoria = {
  "Roupas": "https://picsum.photos/seed/doaaqui-roupas/600/420",
  "Móveis": "https://picsum.photos/seed/doaaqui-moveis/600/420",
  "Alimentos": "https://picsum.photos/seed/doaaqui-alimentos/600/420",
  "Eletrônicos": "https://picsum.photos/seed/doaaqui-eletro/600/420",
  "Livros": "https://picsum.photos/seed/doaaqui-livros/600/420",
  "Brinquedos": "https://picsum.photos/seed/doaaqui-brinquedos/600/420"
};

var itens = [
  {id:1, titulo:"Guarda-roupa 3 portas", categoria:"Móveis", desc:"Guarda-roupa de madeira, 3 portas e 2 gavetas, bom estado, só precisa de retoque na pintura.", local:"Centro", status:"Disponível", doador:"Marta", contato:"(32) 99911-2233", img:imagensCategoria["Móveis"], novo:false, data:"28/08"},
  {id:2, titulo:"Casacos infantis (tam. 4 a 8)", categoria:"Roupas", desc:"Lote com 6 casacos infantis, tamanhos variados entre 4 e 8 anos, poucas marcas de uso.", local:"São José", status:"Disponível", doador:"Renata", contato:"(32) 99822-1190", img:imagensCategoria["Roupas"], novo:false, data:"27/08"},
  {id:3, titulo:"Cesta básica não perecível", categoria:"Alimentos", desc:"Arroz, feijão, óleo, macarrão e enlatados. Retirar até sexta-feira, antes que vença a validade mais próxima.", local:"Vila Nova", status:"Reservado", doador:"João", contato:"(32) 99733-4455", img:imagensCategoria["Alimentos"], novo:false, data:"27/08"},
  {id:4, titulo:"Fogão 4 bocas", categoria:"Eletrônicos", desc:"Fogão funcionando, acendimento manual, forno testado. Precisa de mangueira nova.", local:"Centro", status:"Disponível", doador:"Sebastião", contato:"(32) 99644-7788", img:imagensCategoria["Eletrônicos"], novo:false, data:"26/08"},
  {id:5, titulo:"Coleção de livros didáticos", categoria:"Livros", desc:"Livros do ensino fundamental II, várias matérias, ótimos para reforço escolar.", local:"Bela Vista", status:"Doado", doador:"Cláudia", contato:"(32) 99555-6677", img:imagensCategoria["Livros"], novo:false, data:"20/08"},
  {id:6, titulo:"Bicicleta infantil aro 16", categoria:"Brinquedos", desc:"Bicicleta com rodinhas, pintura desbotada mas quadro e pneus em bom estado.", local:"São José", status:"Disponível", doador:"Pedro", contato:"(32) 99466-3322", img:imagensCategoria["Brinquedos"], novo:false, data:"25/08"},
  {id:7, titulo:"Sofá 2 lugares", categoria:"Móveis", desc:"Sofá de tecido cinza, estrutura firme, uma pequena mancha na almofada direita.", local:"Vila Nova", status:"Disponível", doador:"Elaine", contato:"(32) 99377-8899", img:imagensCategoria["Móveis"], novo:false, data:"24/08"},
  {id:8, titulo:"Roupas de inverno adulto", categoria:"Roupas", desc:"Blusas e calças de frio, tamanho M e G, lavadas e bem conservadas.", local:"Centro", status:"Reservado", doador:"Otávio", contato:"(32) 99288-9900", img:imagensCategoria["Roupas"], novo:false, data:"23/08"},
  {id:9, titulo:"Micro-ondas 20L", categoria:"Eletrônicos", desc:"Funcionando normalmente, prato giratório incluso, sem marcas de ferrugem.", local:"Bela Vista", status:"Doado", doador:"Ivone", contato:"(32) 99199-4321", img:imagensCategoria["Eletrônicos"], novo:false, data:"18/08"}
];

var filaModeracao = [
  {id:101, titulo:"Berço desmontável", categoria:"Móveis", desc:"Berço de madeira maciça, com colchão. Filhos já cresceram, está guardado há pouco tempo.", local:"São José", doador:"Larissa", contato:"(32) 99022-1144", img:imagensCategoria["Móveis"]},
  {id:102, titulo:"Panelas de alumínio (kit)", categoria:"Alimentos", desc:"Kit com 4 panelas de tamanhos diferentes, uso doméstico, sem amassados.", local:"Centro", doador:"Ronaldo", contato:"(32) 99933-5566", img:imagensCategoria["Alimentos"]}
];

var proximoId = 200;
var telaAtual = "mural";
var filtroAtual = {
  busca: "",
  categorias: new Set(),
  status: new Set(["Disponível", "Reservado"]),
  local: ""
};

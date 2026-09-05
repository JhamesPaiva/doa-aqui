function listaCategorias() {
  var vistas = [];
  for (var i = 0; i < itens.length; i++) {
    if (vistas.indexOf(itens[i].categoria) === -1) vistas.push(itens[i].categoria);
  }
  return vistas;
}

function classeStatus(s) {
  if (s === "Disponível") return "status-disponivel";
  if (s === "Reservado") return "status-reservado";
  return "status-doado";
}

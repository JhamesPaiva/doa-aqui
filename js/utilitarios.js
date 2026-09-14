function listaCategorias() {
  var vistas = [];
  for (var i = 0; i < itens.length; i++) {
    if (itens[i].removido) continue;
    if (vistas.indexOf(itens[i].categoria) === -1) vistas.push(itens[i].categoria);
  }
  return vistas;
}

function classeStatus(s) {
  if (s === "Disponível") return "status-disponivel";
  if (s === "Reservado") return "status-reservado";
  return "status-doado";
}

// Registra uma ação de moderação (equivalente à tabela "moderacao" do modelo ER).
// Por enquanto o admin é fixo, pois o login ainda não existe (Fase 2 do backend).
function registraModeracao(idItem, tituloItem, acao, observacao) {
  moderacaoLog.unshift({
    id: proximoIdModeracao,
    idItem: idItem,
    tituloItem: tituloItem,
    admin: "Admin",
    acao: acao,
    observacao: observacao || "",
    data: dataHoje()
  });
  proximoIdModeracao = proximoIdModeracao + 1;
}

// Registra uma mudança de status (equivalente à tabela "historico_status" do modelo ER).
function registraHistoricoStatus(idItem, statusAnterior, statusNovo, alteradoPor) {
  historicoStatus.unshift({
    id: proximoIdHistorico,
    idItem: idItem,
    statusAnterior: statusAnterior,
    statusNovo: statusNovo,
    alteradoPor: alteradoPor || "Admin",
    data: dataHoje()
  });
  proximoIdHistorico = proximoIdHistorico + 1;
}

function historicoDoItem(idItem) {
  return historicoStatus.filter(function (h) { return h.idItem === idItem; });
}

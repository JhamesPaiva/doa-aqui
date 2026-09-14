function itensFiltrados() {
  return itens.filter(function (i) {
    if (i.removido) return false;
    var texto = (i.titulo + " " + i.desc).toLowerCase();
    if (filtroAtual.busca && texto.indexOf(filtroAtual.busca) === -1) return false;
    if (!filtroAtual.categorias.has(i.categoria)) return false;
    if (!filtroAtual.status.has(i.status)) return false;
    if (filtroAtual.local && i.local !== filtroAtual.local) return false;
    return true;
  });
}

function desenhaGrade() {
  var grade = document.getElementById("items-grid");
  var lista = itensFiltrados();
  var contador = document.getElementById("results-count");

  if (lista.length === 0) {
    contador.textContent = "Nenhum item encontrado com esses filtros.";
  } else if (lista.length === 1) {
    contador.textContent = "1 item encontrado";
  } else {
    contador.textContent = lista.length + " itens encontrados";
  }

  if (lista.length === 0) {
    grade.innerHTML = '<div class="empty-state"><b>Nada por aqui ainda</b>Tente ajustar os filtros ou volte mais tarde — o mural é atualizado toda semana.</div>';
  } else {
    var html = "";
    for (var i = 0; i < lista.length; i++) {
      var it = lista[i];
      html += '<article class="card" data-id="' + it.id + '">';
      html += '<div class="photo">';
      if (it.novo) html += '<span class="new-badge">Novo</span>';
      html += '<span class="status-tag ' + classeStatus(it.status) + '">' + it.status + '</span>';
      html += '</div>';
      html += '<div class="body"><span class="cat-label">' + it.categoria + '</span>';
      html += '<h3>' + it.titulo + '</h3>';
      html += '<p class="desc">' + it.desc + '</p>';
      html += '<div class="meta"><span>' + it.local + '</span><span>' + it.data + '</span></div></div></article>';
    }
    grade.innerHTML = html;
  }

  grade.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", function () {
      abreDetalhe(Number(card.dataset.id));
    });
  });

  var itensAtivos = itens.filter(function (i) { return !i.removido; });
  document.getElementById("stat-total").textContent = itensAtivos.length;
  document.getElementById("stat-disponiveis").textContent = itensAtivos.filter(function (i) { return i.status === "Disponível"; }).length;
}

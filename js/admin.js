function desenhaAdmin() {
  var itensAtivos = itens.filter(function (i) { return !i.removido; });

  document.getElementById("pending-count").textContent = filaModeracao.length;
  document.getElementById("a-stat-pend").textContent = filaModeracao.length;
  document.getElementById("a-stat-disp").textContent = itensAtivos.filter(function (i) { return i.status === "Disponível"; }).length;
  document.getElementById("a-stat-doado").textContent = itensAtivos.filter(function (i) { return i.status === "Doado"; }).length;
  document.getElementById("a-stat-total").textContent = itensAtivos.length;

  desenhaFilaPendente();
  desenhaPublicados(itensAtivos);
  desenhaCategoriasMaisDoadas(itensAtivos);
  desenhaLogModeracao();
}

function desenhaFilaPendente() {
  var corpoPendente = document.querySelector("#pending-table tbody");

  if (filaModeracao.length === 0) {
    corpoPendente.innerHTML = '<tr><td colspan="4"><div class="empty-admin">Nenhum item aguardando moderação.</div></td></tr>';
  } else {
    var html = "";
    for (var i = 0; i < filaModeracao.length; i++) {
      var p = filaModeracao[i];
      html += '<tr data-pending-id="' + p.id + '">';
      html += '<td><div class="row-item">' + p.titulo + '</div></td>';
      html += '<td>' + p.categoria + '</td>';
      html += '<td>' + p.local + '</td>';
      html += '<td><div class="row-actions">';
      html += '<button class="icon-btn approve" data-approve="' + p.id + '">Aprovar</button>';
      html += '<button class="icon-btn reject" data-reject="' + p.id + '">Rejeitar</button>';
      html += '</div></td></tr>';
    }
    corpoPendente.innerHTML = html;
  }

  corpoPendente.querySelectorAll("[data-approve]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      aprovaItem(Number(btn.dataset.approve));
    });
  });

  corpoPendente.querySelectorAll("[data-reject]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      abreRejeicao(Number(btn.dataset.reject));
    });
  });
}

function buscaPendente(id) {
  for (var i = 0; i < filaModeracao.length; i++) {
    if (filaModeracao[i].id === id) return filaModeracao[i];
  }
  return null;
}

function buscaItem(id) {
  for (var i = 0; i < itens.length; i++) {
    if (itens[i].id === id) return itens[i];
  }
  return null;
}

function aprovaItem(id) {
  var p = buscaPendente(id);
  if (!p) return;

  itens.unshift({
    id: p.id, titulo: p.titulo, categoria: p.categoria, desc: p.desc, local: p.local,
    doador: p.doador, contato: p.contato, img: p.img,
    status: "Disponível", data: dataHoje(), novo: true, removido: false
  });
  filaModeracao = filaModeracao.filter(function (x) { return x.id !== id; });
  registraModeracao(id, p.titulo, "Aprovado", "");
  salvarDados();

  desenhaAdmin();
  mostraAviso('"' + p.titulo + '" aprovado e publicado no mural.');
}

function abreRejeicao(id) {
  var p = buscaPendente(id);
  if (!p) return;
  document.getElementById("r-id").value = id;
  document.getElementById("r-obs").value = "";
  document.getElementById("reject-overlay").classList.add("open");
}

document.getElementById("reject-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var id = Number(document.getElementById("r-id").value);
  var obs = document.getElementById("r-obs").value.trim();
  var p = buscaPendente(id);
  if (!p) { fechaModais(); return; }

  filaModeracao = filaModeracao.filter(function (x) { return x.id !== id; });
  registraModeracao(id, p.titulo, "Rejeitado", obs);
  salvarDados();

  fechaModais();
  desenhaAdmin();
  mostraAviso('"' + p.titulo + '" rejeitado.');
});

function desenhaPublicados(itensAtivos) {
  var corpoPublicado = document.querySelector("#published-table tbody");
  var htmlPub = "";
  for (var k = 0; k < itensAtivos.length; k++) {
    var it = itensAtivos[k];
    htmlPub += '<tr><td><div class="row-item">' + it.titulo + '</div></td>';
    htmlPub += '<td>' + it.categoria + '</td>';
    htmlPub += '<td>' + it.local + '</td>';
    htmlPub += '<td><select class="status-select" data-status-id="' + it.id + '">';
    htmlPub += '<option' + (it.status === "Disponível" ? ' selected' : '') + '>Disponível</option>';
    htmlPub += '<option' + (it.status === "Reservado" ? ' selected' : '') + '>Reservado</option>';
    htmlPub += '<option' + (it.status === "Doado" ? ' selected' : '') + '>Doado</option>';
    htmlPub += '</select></td>';
    htmlPub += '<td><div class="row-actions">';
    htmlPub += '<button class="icon-btn history" data-history="' + it.id + '">Histórico</button>';
    htmlPub += '<button class="icon-btn edit" data-edit="' + it.id + '">Editar</button>';
    htmlPub += '<button class="icon-btn remove" data-remove="' + it.id + '">Remover</button>';
    htmlPub += '</div></td></tr>';
  }
  corpoPublicado.innerHTML = htmlPub || '<tr><td colspan="5"><div class="empty-admin">Nenhum item publicado ainda.</div></td></tr>';

  corpoPublicado.querySelectorAll("[data-status-id]").forEach(function (sel) {
    sel.addEventListener("change", function () {
      var id = Number(sel.dataset.statusId);
      var alvo = buscaItem(id);
      if (!alvo) return;
      var statusAnterior = alvo.status;
      if (statusAnterior === sel.value) return;
      alvo.status = sel.value;
      registraHistoricoStatus(id, statusAnterior, alvo.status, "Admin");
      salvarDados();
      desenhaAdmin();
      mostraAviso('Status de "' + alvo.titulo + '" atualizado para ' + alvo.status + '.');
    });
  });

  corpoPublicado.querySelectorAll("[data-edit]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      abreEdicao(Number(btn.dataset.edit));
    });
  });

  corpoPublicado.querySelectorAll("[data-remove]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      removeItem(Number(btn.dataset.remove));
    });
  });

  corpoPublicado.querySelectorAll("[data-history]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      abreHistorico(Number(btn.dataset.history));
    });
  });
}

function abreEdicao(id) {
  var it = buscaItem(id);
  if (!it) return;
  document.getElementById("e-id").value = it.id;
  document.getElementById("e-title").value = it.titulo;
  document.getElementById("e-category").value = it.categoria;
  document.getElementById("e-location").value = it.local;
  document.getElementById("e-desc").value = it.desc;
  document.getElementById("e-contact").value = it.contato;
  document.getElementById("edit-overlay").classList.add("open");
}

document.getElementById("edit-item-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var id = Number(document.getElementById("e-id").value);
  var it = buscaItem(id);
  if (!it) { fechaModais(); return; }

  it.titulo = document.getElementById("e-title").value.trim();
  it.categoria = document.getElementById("e-category").value;
  it.local = document.getElementById("e-location").value;
  it.desc = document.getElementById("e-desc").value.trim();
  it.contato = document.getElementById("e-contact").value.trim();
  it.dataAtualizacao = dataHoje();

  registraModeracao(id, it.titulo, "Editado", "Dados do item atualizados pelo administrador.");
  salvarDados();

  fechaModais();
  desenhaAdmin();
  mostraAviso('"' + it.titulo + '" atualizado.');
});

function removeItem(id) {
  var it = buscaItem(id);
  if (!it) return;
  var confirmado = window.confirm('Remover "' + it.titulo + '" do mural? O item sai de circulação, mas o histórico é mantido.');
  if (!confirmado) return;

  it.removido = true;
  it.removidoEm = dataHoje();
  registraModeracao(id, it.titulo, "Removido", "");
  salvarDados();

  desenhaAdmin();
  mostraAviso('"' + it.titulo + '" removido do mural.');
}

function abreHistorico(id) {
  var it = buscaItem(id);
  if (!it) return;
  var lista = historicoDoItem(id);
  var corpo = document.getElementById("history-body");

  if (lista.length === 0) {
    corpo.innerHTML = '<p style="color:var(--ink-soft);font-size:14px;">Nenhuma alteração de status registrada para "' + it.titulo + '" ainda.</p>';
  } else {
    var html = '<ul class="history-list">';
    for (var i = 0; i < lista.length; i++) {
      var h = lista[i];
      html += '<li><span>' + h.statusAnterior + ' → ' + h.statusNovo + '</span><span>' + h.data + '</span></li>';
    }
    html += '</ul>';
    corpo.innerHTML = html;
  }

  document.getElementById("history-overlay").classList.add("open");
}

function desenhaCategoriasMaisDoadas(itensAtivos) {
  var doados = itensAtivos.filter(function (i) { return i.status === "Doado"; });
  var contagem = {};
  for (var i = 0; i < doados.length; i++) {
    contagem[doados[i].categoria] = (contagem[doados[i].categoria] || 0) + 1;
  }
  var pares = Object.keys(contagem).map(function (k) { return { categoria: k, total: contagem[k] }; });
  pares.sort(function (a, b) { return b.total - a.total; });

  var cont = document.getElementById("top-categories");
  if (pares.length === 0) {
    cont.innerHTML = '<p style="color:var(--ink-soft);font-size:14px;">Ainda não há itens doados para gerar essa métrica.</p>';
    return;
  }

  var max = pares[0].total;
  var html = "";
  for (var j = 0; j < pares.length; j++) {
    var pct = Math.round((pares[j].total / max) * 100);
    html += '<div class="metric-row">';
    html += '<span class="metric-label">' + pares[j].categoria + '</span>';
    html += '<span class="metric-bar-track"><span class="metric-bar-fill" style="width:' + pct + '%"></span></span>';
    html += '<span class="metric-count">' + pares[j].total + '</span>';
    html += '</div>';
  }
  cont.innerHTML = html;
}

function desenhaLogModeracao() {
  var corpo = document.querySelector("#log-table tbody");
  if (moderacaoLog.length === 0) {
    corpo.innerHTML = '<tr><td colspan="4"><div class="empty-admin">Nenhuma ação de moderação registrada ainda.</div></td></tr>';
    return;
  }
  var recentes = moderacaoLog.slice(0, 8);
  var html = "";
  for (var i = 0; i < recentes.length; i++) {
    var l = recentes[i];
    html += '<tr><td><span class="acao-badge ' + l.acao + '">' + l.acao + '</span></td>';
    html += '<td>' + l.tituloItem + '</td>';
    html += '<td>' + (l.observacao || '—') + '</td>';
    html += '<td>' + l.data + '</td></tr>';
  }
  corpo.innerHTML = html;
}

function desenhaAdmin() {
  document.getElementById("pending-count").textContent = filaModeracao.length;
  document.getElementById("a-stat-pend").textContent = filaModeracao.length;
  document.getElementById("a-stat-disp").textContent = itens.filter(function (i) { return i.status === "Disponível"; }).length;
  document.getElementById("a-stat-doado").textContent = itens.filter(function (i) { return i.status === "Doado"; }).length;
  document.getElementById("a-stat-total").textContent = itens.length;

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
      var id = Number(btn.dataset.approve);
      var p = null;
      for (var i = 0; i < filaModeracao.length; i++) {
        if (filaModeracao[i].id === id) { p = filaModeracao[i]; break; }
      }
      if (!p) return;

      itens.unshift({
        id: p.id, titulo: p.titulo, categoria: p.categoria, desc: p.desc, local: p.local,
        doador: p.doador, contato: p.contato, img: p.img,
        status: "Disponível", data: "hoje", novo: true
      });
      filaModeracao = filaModeracao.filter(function (x) { return x.id !== id; });
      salvarDados();

      desenhaAdmin();
      mostraAviso('"' + p.titulo + '" aprovado e publicado no mural.');
    });
  });

  corpoPendente.querySelectorAll("[data-reject]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = Number(btn.dataset.reject);
      var p = null;
      for (var i = 0; i < filaModeracao.length; i++) {
        if (filaModeracao[i].id === id) { p = filaModeracao[i]; break; }
      }
      filaModeracao = filaModeracao.filter(function (x) { return x.id !== id; });
      salvarDados();
      desenhaAdmin();
      if (p) mostraAviso('"' + p.titulo + '" rejeitado.');
    });
  });

  var corpoPublicado = document.querySelector("#published-table tbody");
  var htmlPub = "";
  for (var k = 0; k < itens.length; k++) {
    var it = itens[k];
    htmlPub += '<tr><td><div class="row-item">' + it.titulo + '</div></td>';
    htmlPub += '<td>' + it.categoria + '</td>';
    htmlPub += '<td>' + it.local + '</td>';
    htmlPub += '<td><select class="status-select" data-status-id="' + it.id + '">';
    htmlPub += '<option' + (it.status === "Disponível" ? ' selected' : '') + '>Disponível</option>';
    htmlPub += '<option' + (it.status === "Reservado" ? ' selected' : '') + '>Reservado</option>';
    htmlPub += '<option' + (it.status === "Doado" ? ' selected' : '') + '>Doado</option>';
    htmlPub += '</select></td></tr>';
  }
  corpoPublicado.innerHTML = htmlPub;

  corpoPublicado.querySelectorAll("[data-status-id]").forEach(function (sel) {
    sel.addEventListener("change", function () {
      var id = Number(sel.dataset.statusId);
      var alvo = null;
      for (var i = 0; i < itens.length; i++) {
        if (itens[i].id === id) { alvo = itens[i]; break; }
      }
      if (!alvo) return;
      alvo.status = sel.value;
      salvarDados();
      desenhaAdmin();
      mostraAviso('Status de "' + alvo.titulo + '" atualizado para ' + alvo.status + '.');
    });
  });
}

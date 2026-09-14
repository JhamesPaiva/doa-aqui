(function () {
  var itensSalvos = localStorage.getItem("doaaqui_itens");
  var filaSalva = localStorage.getItem("doaaqui_fila");
  var idSalvo = localStorage.getItem("doaaqui_proximo_id");
  var moderacaoSalva = localStorage.getItem("doaaqui_moderacao");
  var historicoSalvo = localStorage.getItem("doaaqui_historico");
  var idModeracaoSalvo = localStorage.getItem("doaaqui_proximo_id_moderacao");
  var idHistoricoSalvo = localStorage.getItem("doaaqui_proximo_id_historico");

  if (itensSalvos) itens = JSON.parse(itensSalvos);
  if (filaSalva) filaModeracao = JSON.parse(filaSalva);
  if (idSalvo) proximoId = Number(idSalvo);
  if (moderacaoSalva) moderacaoLog = JSON.parse(moderacaoSalva);
  if (historicoSalvo) historicoStatus = JSON.parse(historicoSalvo);
  if (idModeracaoSalvo) proximoIdModeracao = Number(idModeracaoSalvo);
  if (idHistoricoSalvo) proximoIdHistorico = Number(idHistoricoSalvo);
})();

function salvarDados() {
  localStorage.setItem("doaaqui_itens", JSON.stringify(itens));
  localStorage.setItem("doaaqui_fila", JSON.stringify(filaModeracao));
  localStorage.setItem("doaaqui_proximo_id", String(proximoId));
  localStorage.setItem("doaaqui_moderacao", JSON.stringify(moderacaoLog));
  localStorage.setItem("doaaqui_historico", JSON.stringify(historicoStatus));
  localStorage.setItem("doaaqui_proximo_id_moderacao", String(proximoIdModeracao));
  localStorage.setItem("doaaqui_proximo_id_historico", String(proximoIdHistorico));
}

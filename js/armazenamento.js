(function () {
  var itensSalvos = localStorage.getItem("doaaqui_itens");
  var filaSalva = localStorage.getItem("doaaqui_fila");
  var idSalvo = localStorage.getItem("doaaqui_proximo_id");

  if (itensSalvos) itens = JSON.parse(itensSalvos);
  if (filaSalva) filaModeracao = JSON.parse(filaSalva);
  if (idSalvo) proximoId = Number(idSalvo);
})();

function salvarDados() {
  localStorage.setItem("doaaqui_itens", JSON.stringify(itens));
  localStorage.setItem("doaaqui_fila", JSON.stringify(filaModeracao));
  localStorage.setItem("doaaqui_proximo_id", String(proximoId));
}

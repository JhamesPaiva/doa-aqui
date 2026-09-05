document.getElementById("new-item-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var titulo = document.getElementById("f-title").value.trim();
  var categoria = document.getElementById("f-category").value;
  var local = document.getElementById("f-location").value.trim();
  var desc = document.getElementById("f-desc").value.trim();
  var contato = document.getElementById("f-contact").value.trim();

  if (!titulo || !categoria || !local || !desc || !contato) {
    return;
  }

  filaModeracao.unshift({
    id: proximoId,
    titulo: titulo,
    categoria: categoria,
    desc: desc,
    local: local,
    doador: "Você",
    contato: contato,
    img: imagensCategoria[categoria] || imagensCategoria["Móveis"]
  });
  proximoId = proximoId + 1;
  salvarDados();

  e.target.reset();
  fechaModais();
  mostraAviso("Doação publicada! Aguardando aprovação da moderação.");
  if (typeof desenhaAdmin === "function") desenhaAdmin();
});

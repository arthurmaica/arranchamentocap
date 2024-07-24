function salvarSolicitacao() {
    // Obtém os valores dos campos do formulário
    var posto = document.getElementById("posto").value;
    var nome = document.getElementById("nome").value;
    var solicitacao = document.getElementById("solicitacao").value;

    // Cria um objeto com os dados do formulário
    var dadosSolicitacao = {
        posto: posto,
        nome: nome,
        solicitacao: solicitacao
    };

    // Converte o objeto para JSON
    var jsonData = JSON.stringify(dadosSolicitacao);

    // Requisição Ajax para enviar os dados para salvar_solicitacao.php
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "salvar_solicitacao.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonData);

    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Solicitação enviada com sucesso!');
            document.getElementById("requestForm").reset(); // Limpa o formulário após o envio
        } else {
            alert('Erro ao enviar a solicitação. Tente novamente mais tarde.');
        }
    };
}

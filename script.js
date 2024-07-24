function salvarSolicitacao() {
    // Obtém os valores dos campos do formulário
    var posto = document.getElementById("posto").value;
    var nome = document.getElementById("nome").value;
    var solicitacao = document.getElementById("solicitacao").value;

    // Constrói o objeto com os dados a serem enviados
    var data = {
        posto: posto,
        nome: nome,
        solicitacao: solicitacao
    };

    // Faz uma requisição POST para a sua API no servidor
    fetch('https://seu_servidor.com/api/salvar_solicitacao.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar a solicitação.');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message); // Exibe uma mensagem de sucesso
        document.getElementById("requestForm").reset(); // Limpa o formulário após o envio
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar a solicitação.');
    });
}

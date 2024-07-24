function salvarSolicitacao() {
    var posto = document.getElementById("posto").value;
    var nome = document.getElementById("nome").value;
    var solicitacao = document.getElementById("solicitacao").value;

    var data = {
        posto: posto,
        nome: nome,
        solicitacao: solicitacao
    };

    // Endpoint para sua API Node.js que atualiza o arquivo no GitHub
    var apiUrl = 'http://localhost:3000/api/salvar-solicitacao'; // Substitua pela URL de sua API

    fetch(apiUrl, {
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
        alert(data.message);
        document.getElementById("requestForm").reset();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar a solicitação.');
    });
}

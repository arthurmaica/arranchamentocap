function salvarSolicitacao() {
    // Obtém os valores dos campos do formulário
    var posto = document.getElementById("posto").value;
    var nome = document.getElementById("nome").value;
    var solicitacao = document.getElementById("solicitacao").value;

    // Monta a linha a ser adicionada no arquivo CSV
    var csvRow = posto + ',' + nome + ',' + solicitacao + '\n';

    // Configurações para a chamada da API do GitHub
    var username = 'arthurmaica'; // Seu usuário do GitHub
    var repository = 'arranchamentocap'; // Seu repositório no GitHub
    var path = 'solicitacoes.csv'; // Caminho para o arquivo solicitacoes.csv no repositório
    var token = 'das-dasd-asdasd-asd-asdasd-asda'; // Seu token de acesso pessoal do GitHub

    // Constrói a URL da API do GitHub para obter o conteúdo do arquivo
    var apiUrl = `https://api.github.com/repos/${username}/${repository}/contents/${path}`;

   // Faz uma requisição GET para obter o conteúdo atual do arquivo CSV
fetch(apiUrl, {
    headers: {
        Authorization: `token ${token}`
    }
})
.then(response => response.json())
.then(data => {
    // Verifica se o arquivo existe antes de tentar acessar o conteúdo
    if (data.content) {
        // Decodifica o conteúdo do arquivo do GitHub (base64)
        var content = Buffer.from(data.content, 'base64').toString('utf-8');
        
        // Adiciona a nova linha ao conteúdo existente
        content += csvRow;

        // Codifica o conteúdo atualizado em base64
        var updatedContent = Buffer.from(content).toString('base64');

        // Constrói o corpo da requisição PATCH para atualizar o arquivo no GitHub
        var requestBody = {
            message: 'Adicionando nova solicitação via formulário',
            content: updatedContent,
            sha: data.sha
        };

        // Constrói a URL da API do GitHub para atualizar o arquivo
        var updateUrl = `https://api.github.com/repos/${username}/${repository}/contents/${path}`;

        // Faz uma requisição PATCH para atualizar o arquivo no GitHub
        fetch(updateUrl, {
            method: 'PATCH',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar o arquivo no GitHub');
            }
            alert('Solicitação enviada com sucesso!');
            document.getElementById("requestForm").reset(); // Limpa o formulário após o envio
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar a solicitação.');
        });
    } else {
        alert('Erro: o arquivo solicitado não foi encontrado.');
    }
})
.catch(error => {
    console.error('Erro:', error);
    alert('Erro ao obter o conteúdo do arquivo no GitHub.');
});

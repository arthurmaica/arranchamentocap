function salvarSolicitacao() {
    // Obtém os valores dos campos do formulário
    var posto = document.getElementById("posto").value;
    var nome = document.getElementById("nome").value;
    var solicitacao = document.getElementById("solicitacao").value;

    // Monta a linha a ser adicionada no arquivo CSV
    var csvRow = posto + ',' + nome + ',' + solicitacao + '\n';

    // Função para salvar as solicitações no arquivo CSV existente
    function salvarNoCSV(csvContent) {
        // Cria um Blob com o conteúdo CSV
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Cria um objeto URL temporário para o Blob
        var url = URL.createObjectURL(blob);

        // Cria um link invisível para simular o download do arquivo CSV
        var link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", 'solicitacoes.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoga o URL do objeto Blob para liberar a memória
        URL.revokeObjectURL(url);
    }

    // Função para lidar com o conteúdo do arquivo CSV
    function handleCSVContent(csvContent) {
        // Verifica se há conteúdo no arquivo CSV atual
        if (csvContent.trim() === '') {
            csvContent = 'Posto,Nome,Solicitação\n'; // Cabeçalho do CSV
        }

        // Adiciona a nova linha ao conteúdo existente do CSV
        csvContent += csvRow;

        // Salva o conteúdo atualizado no arquivo CSV
        salvarNoCSV(csvContent);
    }

    // Função para ler o conteúdo do arquivo CSV atual
    function lerCSV() {
        var reader = new FileReader();

        // Define a função de callback quando a leitura estiver concluída
        reader.onload = function(event) {
            var csvContent = event.target.result;
            handleCSVContent(csvContent);
        };

        // Lê o arquivo solicitacoes.csv como texto
        reader.readAsText(new Blob([''], { type: 'text/csv' }), 'UTF-8');
    }

    // Chama a função para ler e manipular o conteúdo do arquivo CSV
    lerCSV();

    // Limpa o formulário após o envio
    document.getElementById("requestForm").reset();
}

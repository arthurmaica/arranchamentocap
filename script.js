function salvarSolicitacao() {
    // Obtém os valores dos campos do formulário
    var posto = document.getElementById("posto").value;
    var nome = document.getElementById("nome").value;
    var solicitacao = document.getElementById("solicitacao").value;

    // Monta a linha a ser escrita no arquivo CSV
    var csvRow = posto + ',' + nome + ',' + solicitacao + '\n';

    // Função para salvar o arquivo CSV localmente
    function downloadCSV(csvContent) {
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, 'solicitacoes.csv');
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) {
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", 'solicitacoes.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    // Verifica se há solicitações existentes no localStorage
    var solicitações = localStorage.getItem("solicitações");
    if (solicitações === null) {
        solicitações = ''; // Inicializa vazio se não houver
    }

    // Adiciona a nova solicitação às solicitações existentes
    solicitações += csvRow;

    // Salva as solicitações no localStorage
    localStorage.setItem("solicitações", solicitações);

    // Baixa o arquivo CSV com todas as solicitações
    downloadCSV(solicitações);

    // Limpa o formulário após o envio
    document.getElementById("requestForm").reset();
}

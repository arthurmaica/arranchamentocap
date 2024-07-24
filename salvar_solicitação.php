<?php
// Verifica se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebe os dados do formulário
    $data = json_decode(file_get_contents("php://input"), true);

    // Caminho para o arquivo CSV (ajuste o caminho conforme necessário)
    $file = 'solicitacoes.csv';

    // Dados a serem escritos no arquivo CSV
    $posto = isset($data['posto']) ? $data['posto'] : '';
    $nome = isset($data['nome']) ? $data['nome'] : '';
    $solicitacao = isset($data['solicitacao']) ? $data['solicitacao'] : '';

    // Monta a linha a ser escrita no arquivo CSV
    $line = array($posto, $nome, $solicitacao);

    // Abre o arquivo CSV para escrita
    $fp = fopen($file, 'a');

    // Escreve os dados no arquivo CSV
    fputcsv($fp, $line);

    // Fecha o arquivo CSV
    fclose($fp);

    // Responde ao cliente (JavaScript) com status 200 (OK)
    http_response_code(200);
    echo json_encode(array("message" => "Solicitação salva com sucesso."));
} else {
    // Responde com erro se não for uma requisição POST
    http_response_code(403);
    echo json_encode(array("message" => "Erro ao processar solicitação."));
}
?>

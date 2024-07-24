<?php
// Conexão com o banco de dados (exemplo utilizando PDO)
$host = 'seu_host';
$db   = 'seu_banco_de_dados';
$user = 'seu_usuario';
$pass = 'sua_senha';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Recebe os dados do formulário
$posto = $_POST['posto'];
$nome = $_POST['nome'];
$solicitacao = $_POST['solicitacao'];

// Insere os dados no banco de dados
$stmt = $pdo->prepare("INSERT INTO solicitation (posto, nome, solicitacao) VALUES (?, ?, ?)");
$stmt->execute([$posto, $nome, $solicitacao]);

// Responde ao cliente (pode ser um JSON, por exemplo)
echo json_encode(['message' => 'Solicitação salva com sucesso']);

// Encerra a conexão com o banco de dados
$pdo = null;
?>


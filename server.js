const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar requisições JSON
app.use(bodyParser.json());

// Rota para salvar uma nova solicitação e atualizar o arquivo no GitHub
app.post('/api/salvar-solicitacao', async (req, res) => {
    try {
        const { posto, nome, solicitacao } = req.body;

        // Configurações para autenticação no GitHub
        const username = 'seu_usuario_github';
        const repository = 'seu_repositorio';
        const path = 'caminho_do_arquivo/solicitacoes.csv'; // Substitua pelo caminho do arquivo no seu repositório
        const token = 'seu_token_de_acesso_pessoal_do_github';

        // Função para obter o conteúdo atual do arquivo no GitHub
        async function getContent() {
            const apiUrl = `https://api.github.com/repos/${username}/${repository}/contents/${path}`;
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `token ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao obter conteúdo: ${response.status}`);
            }

            const data = await response.json();
            return {
                content: Buffer.from(data.content, 'base64').toString(),
                sha: data.sha
            };
        }

        // Obtém o conteúdo atual do arquivo no GitHub
        const { content, sha } = await getContent();

        // Constrói a nova linha a ser adicionada no arquivo CSV
        const csvRow = `${posto},${nome},${solicitacao}\n`;

        // Adiciona a nova linha ao conteúdo existente
        const updatedContent = content + csvRow;

        // Codifica o conteúdo atualizado em base64
        const encodedContent = Buffer.from(updatedContent).toString('base64');

        // Constrói o corpo da requisição PATCH para atualizar o arquivo no GitHub
        const apiUrl = `https://api.github.com/repos/${username}/${repository}/contents/${path}`;
        const requestBody = {
            message: 'Adicionando nova solicitação via formulário',
            content: encodedContent,
            sha: sha
        };

        // Faz a requisição PATCH para atualizar o arquivo
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar arquivo: ${response.status}`);
        }

        console.log('Arquivo atualizado com sucesso!');

        res.status(201).json({ message: 'Solicitação salva e arquivo atualizado no GitHub' });
    } catch (error) {
        console.error('Erro ao salvar a solicitação e atualizar o arquivo:', error);
        res.status(500).json({ error: 'Erro ao salvar a solicitação e atualizar o arquivo' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});


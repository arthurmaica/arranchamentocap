const fetch = require('node-fetch');
const fs = require('fs');

async function updateFile() {
    try {
        // Dados a serem atualizados
        const posto = 'Soldado';  // Aqui você pode modificar para pegar os dados enviados pelo formulário
        const nome = 'João Silva';
        const solicitacao = 'Solicitação de férias';

        // Configurações do repositório no GitHub
        const username = 'arthurmaica';
        const repository = 'arranchamentocap';
        const path = 'solicitacoes.csv'; // Substitua pelo caminho do arquivo no seu repositório
        const token = process.env.GITHUB_TOKEN;

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
    } catch (error) {
        console.error('Erro ao atualizar o arquivo:', error);
    }
}

// Executa a função para atualizar o arquivo
updateFile();

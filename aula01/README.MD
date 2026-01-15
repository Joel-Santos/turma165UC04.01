# Aula 01 — Primeiros passos com Node.js e Express

## Descrição

Este repositório contém os passos iniciais para criar uma aplicação simples com Node.js e Express. O objetivo desta aula é configurar o projeto, instalar dependências e executar um servidor mínimo.

## Sumário

- **Descrição**: visão geral do conteúdo
- **Pré-requisitos**: o que é necessário antes de começar
- **Estrutura**: arquivos principais do exemplo
- **Passo a passo**: comandos e configurações para rodar a aplicação
- **Exemplo de `app.js`**: servidor Express mínimo
- **Verificação e dicas**: como testar e resolver erros comuns

## Pré-requisitos

- Ter o Node.js e o npm instalados.
- Ter um terminal (ex.: PowerShell) e o editor (ex.: VS Code).

## Estrutura sugerida

- `aula01/`
   - `app.js` — arquivo principal da aplicação
   - `package.json` — metadados e scripts do projeto

## Passo a passo rápido

1. Abra a pasta do projeto no terminal (ex.: `aula01`).
2. Inicialize o projeto Node.js:

```powershell
npm init -y
```

3. Instale o Express:

```powershell
npm install express --save
```

4. Ajuste o `package.json`:

- Defina a entrada principal (`main`) como `app.js` (opcional para este exemplo).
- Para usar imports ES Modules, adicione `"type": "module"` no `package.json`.
- Adicione um script de start:

```json
"scripts": {
   "start": "node app.js"
}
```

Um exemplo mínimo de `package.json` (apenas as partes importantes):

```json
{
   "name": "aula01",
   "version": "1.0.0",
   "type": "module",
   "main": "app.js",
   "scripts": {
      "start": "node app.js"
   }
}
```

5. Crie o arquivo `app.js` (exemplo abaixo).
6. Execute a aplicação:

```powershell
npm start
```

## Exemplo mínimo de `app.js`

```js
import express from 'express';

const app = express();
const PORT =  3000;

app.get('/', (req, res) => {
   res.send('Olá, mundo!');
});

app.listen(PORT, () => {
   console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

## Como verificar se está funcionando

- Abra o navegador em `http://localhost:3000` e deve ver `Olá, mundo!`.
- Pelo terminal (PowerShell) você pode usar `curl` ou `Invoke-WebRequest`:

```powershell
curl http://localhost:3000
# ou
Invoke-WebRequest http://localhost:3000
```

## Dicas e solução de problemas

- Erro de import/exports (ESM): verifique se `"type": "module"` está definido em `package.json`.
- Porta em uso: mude a variável `PORT` ou encerre o processo que está ocupando a porta.
- Se o comando `npm start` não funcionar, verifique o script `start` em `package.json`.

## Próximos passos

- Aprofundar rotas do Express, middlewares e templates.
- Persistência com banco de dados (ex.: MongoDB, PostgreSQL).

Boa aula — crie código e seja feliz!



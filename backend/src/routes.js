const funcaoController = require('./controllers/funcaoController');
const disciplinaController = require('./controllers/disciplinaController');
const express = require('express');
const routes = express();

routes.get('/buscarFuncao', async (req, res) => {
    try {
        const ret = await funcaoController.buscar();
        res.send({
            status: true,
            dados: ret,
        });
    } catch (error) {
        res.send({
            status: false,
            erro: error,
        });
    }
});
routes.post('/salvarFuncao', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await funcaoController.salvar(dados.entidade);

        res.send({
            status: true,
            dados: dados,
        });
    } catch (error) {
        res.send({
            status: false,
            erro: error,
        });
    }
});
routes.post('/excluirFuncao', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await funcaoController.excluir(dados.entidade);

        res.send({
            status: true,
            dados: dados,
        });
    } catch (error) {
        res.send({
            status: false,
            erro: error,
        });
    }
});

routes.get('/buscarDisciplina', async (req, res) => {
    try {
        const ret = await disciplinaController.buscar();
        res.send({
            status: true,
            dados: ret,
        });
    } catch (error) {
        res.send({
            status: false,
            erro: error,
        });
    }
});
routes.post('/salvarDisciplina', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await disciplinaController.salvar(dados.entidade);

        res.send({
            status: true,
            dados: dados,
        });
    } catch (error) {
        res.send({
            status: false,
            erro: error,
        });
    }
});
routes.post('/excluirDisciplina', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await disciplinaController.excluir(dados.entidade);

        res.send({
            status: true,
            dados: dados,
        });
    } catch (error) {
        res.send({
            status: false,
            erro: error,
        });
    }
});
module.exports = routes;
const controller = require('./controller/funcaoController');
const express = require('express');
const routes = express();

routes.get('/buscar', async (req, res) => {
    try {
        const ret = await controller.buscar();
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
routes.post('/salvar', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await controller.salvar(dados.entidade);

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
routes.post('/excluir', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await controller.excluir(dados.entidade);

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
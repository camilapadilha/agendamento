const express = require('express');
const Controller = require('./controller/controller');

module.exports = (class Routes {
    constructor(server) {
        this.server = server;
        this.controler = new Controller();
    }

    ativarRotaSalvar(server) {
        server.post('/salvar', async (req, res) => {
            try {
                const id = await this.controler.salvar(req.body.tabela,
                    req.body.pk,
                    req.body.entidade);
                res.send({
                    status: true,
                    dados: id,
                });
            } catch (error) {
                res.send({
                    status: false,
                    erro: error,
                });
            }
        });
    }

    ativarRotaBuscar(server) {
        server.get('/buscar', async (req, res) => {
            try {
                const ret = await this.controler.buscar(req.body.tabela);
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
    }
});

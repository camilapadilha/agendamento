const funcaoController = require('./controllers/funcaoController');
const disciplinaController = require('./controllers/disciplinaController');
const usuarioController = require('./controllers/usuarioController');
const equipamentoController = require('./controllers/equipamentoController');
const ambienteController = require('./controllers/ambienteController');
const agendamentoAmbienteController = require('./controllers/agendamentoAmbienteController');
const express = require('express');
const routes = express();

routes.get('/validarLogin', async (req, res) => {
    try {
        const ret = await usuarioController.validarLogin(req.query.login, req.query.senha);
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

routes.get('/buscarUsuario', async (req, res) => {
    try {
        const ret = await usuarioController.buscar();
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
routes.get('/buscarDisciplinasPessoa', async (req, res) => {
    try {
        const ret = await usuarioController.buscarDisciplinasPessoa(req.query.id_pessoa);
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
routes.post('/salvarUsuario', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await usuarioController.salvar(dados.entidade, dados.listDisciplinasExcluidas);

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
routes.post('/excluirUsuario', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await usuarioController.excluir(dados.entidade);

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

routes.get('/buscarEquipamento', async (req, res) => {
    try {
        const ret = await equipamentoController.buscar();
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

routes.post('/salvarEquipamento', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await equipamentoController.salvar(dados.entidade);

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

routes.post('/excluirEquipamento', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await equipamentoController.excluir(dados.entidade);

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

routes.get('/buscarAmbiente', async (req, res) => {
    try {
        const ret = await ambienteController.buscar(req.query.id);
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

routes.post('/salvarAmbiente', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await ambienteController.salvar(dados.entidade);

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

routes.post('/excluirAmbiente', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await ambienteController.excluir(dados.entidade);

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

routes.get('/buscarHorariosAmbiente', async (req, res) => {
    try {
        const ret = await agendamentoAmbienteController.buscar();
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

routes.post('/salvarHorarioAmbiente', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await agendamentoAmbienteController.salvar(dados.entidade);

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

routes.post('/excluirHorarioAmbiente', async (req, res) => {
    let dados = req.body;
    if (req.url.includes('?')) {
        dados = await req.query;
    }
    try {
        await agendamentoAmbienteController.excluir(dados.entidade);

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
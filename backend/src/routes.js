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
        const id = await controller.salvar(dados);

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
// })

// module.exports = app
// app.get('/buscar', (req, res) => {
//     const ret = con.query("select * from funcao", (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     });
//     return ret;
// })
// }


    //     ativarRotaSalvar(server) {
    //         server.post('/salvar', async (req, res) => {
    //             try {
    //                 const id = await this.controler.salvar(req.body.tabela,
    //                     req.body.pk,
    //                     req.body.entidade);
    //                 res.send({
    //                     status: true,
    //                     dados: id,
    //                 });
    //             } catch (error) {
    //                 res.send({
    //                     status: false,
    //                     erro: error,
    //                 });
    //             }
    //         });
    //     }


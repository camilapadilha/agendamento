const express = require('express');
const app = express();
const con = require('../server');
const query = require('../util/db_util');

module.exports = {
    buscar() {
        return new Promise((resolve, reject) => {
            con.query("select * from funcao", (err, rows, fields) => {
                if (!err) {
                    resolve(rows);
                }
                else {
                    console.log("errooo", err);
                }
            });
        });
    },

    salvar(entidade) {
        return new Promise((resolve, reject) => {
            console.log("entidade", entidade);
            con.query(`insert into funcao nome values ${entidade.nome}`, (err, rows, fields) => {
                if (!err) {
                    console.log("rows", rows);
                    console.log("fields", fields);
                    resolve(rows);
                }
                else {
                    console.log("errooo", err);
                }
            });
        });
    }
}

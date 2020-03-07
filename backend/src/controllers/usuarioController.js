const express = require('express');
const app = express();
const con = require('../server');
const query = require('../util/db_util');

module.exports = {
    buscar() {
        return new Promise((resolve, reject) => {
            con.query("SELECT * FROM usuario a INNER JOIN pessoa b ",
                "ON a.id_pessoa = b.id_pessoa ",
                "INNER JOIN funcao c ",
                "on b.id_funcao = c.id_funcao ",
                "INNER JOIN disciplina d ",
                "on b.id_disciplina = d.id_disciplina ", (err, rows, fields) => {
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
            let query = "";
            let sql = "";
            if (entidade.id_usuario) {
                sql = `update usuario set ? where id_usuario = ${entidade.id_usuario}`;
            } else {
                sql = 'insert into usuario set ? ';
            }
            query = con.query(sql, entidade, (err, rows, fields) => {
                if (!err) {
                    resolve(rows);
                }
                else {
                    console.log("errooo", err);
                }
            });
        });
    },

    excluir(entidade) {
        return new Promise((resolve, reject) => {
            let query = "";
            let sql = `delete from usuario where id_usuario = ${entidade.id_usuario}`;
            query = con.query(sql, entidade, (err, rows, fields) => {
                if (!err) {
                    resolve(rows);
                }
                else {
                    console.log("errooo", err);
                }
            });
        });
    }
}

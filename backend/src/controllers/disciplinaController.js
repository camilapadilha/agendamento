const express = require('express');
const app = express();
const con = require('../server');
const query = require('../util/db_util');

module.exports = {
    buscar() {
        return new Promise((resolve, reject) => {
            con.query("select * from disciplina", (err, rows, fields) => {
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
            if (entidade.id_disciplina) {
                sql = `update disciplina set ? where id_disciplina = ${entidade.id_disciplina}`;
            } else {
                sql = 'insert into disciplina set ? ';
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
            let sql = `delete from disciplina where id_disciplina = ${entidade.id_disciplina}`;
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

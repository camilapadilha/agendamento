const express = require('express');
const app = express();
const con = require('../server');
const query = require('../util/db_util');

module.exports = {
    buscar(id) {
        let sql = '';
        if (id != null && id != 'undefined') {
            sql = `select * from ambiente where id_ambiente=${id}`;
        } else {
            sql = 'select * from ambiente';
        }
        return new Promise((resolve, reject) => {
            con.query(sql, (err, rows, fields) => {
                if (!err) {
                    resolve(rows);
                }
                else {
                    console.log("errooo", err);
                }
            });
        });
    },

    salvar(entidade, id) {
        return new Promise((resolve, reject) => {
            let query = "";
            let sql = "";
            if (id) {
                sql = `update ambiente set ? where id_ambiente = ${id}`;
            } else {
                sql = 'insert into ambiente set ? ';
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
            let sql = `delete from ambiente where id_ambiente = ${entidade.id_ambiente}`;
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

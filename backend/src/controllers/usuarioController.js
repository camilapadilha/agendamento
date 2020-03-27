const express = require('express');
const app = express();
const con = require('../server');
const query = require('../util/db_util');

module.exports = {

    validarLogin(login, senha) {
       return new Promise((resolve, reject) => {
              const sql = `SELECT login, senha from usuario 
        WHERE login = ${login} AND senha = ${senha}`;

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

    buscar() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM usuario a INNER JOIN pessoa b "
                + "ON a.id_pessoa = b.id_pessoa "
                + "LEFT JOIN funcao c "
                + "on b.id_funcao = c.id_funcao "
                + "LEFT JOIN disciplina d "
                + "on b.id_disciplina = d.id_disciplina ";

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

    salvar(entidade) {
        return new Promise((resolve, reject) => {
            let sql = "";
            let sqlPessoa = "";
            if (entidade.id_usuario) {
                sqlPessoa = `UPDATE pessoa (nome, cpf, celular, email_institucional, email_pessoal, id_funcao)
                VALUE ('${entidade.nome}', '${entidade.cpf}', '${entidade.celular}', '${entidade.email_institucional}', 
                '${entidade.email_pessoal}', ${entidade.funcao}) where id_pessoa=${entidade.id_pessoa}`;

                con.query(sqlPessoa, entidade, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows);
                    }
                    else {
                        console.log("errooo", err);
                    }
                });
                sql = `UPDATE usuario (login, senha, id_pessoa)
                VALUES ('${entidade.login}', '${entidade.senha}', ${entidade.id_pessoa} ) where id_pessoa=${entidade.id_pessoa}`;

                con.query(sql, entidade, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows);
                    }
                    else {
                        console.log("errooo", err);
                    }
                });
            } else {
                sqlPessoa = `INSERT INTO pessoa (nome, cpf, celular, email_institucional, email_pessoal, id_funcao)
                VALUE ('${entidade.nome}', '${entidade.cpf}', '${entidade.celular}', '${entidade.email_institucional}', 
                '${entidade.email_pessoal}', ${entidade.funcao})`;

                con.query(sqlPessoa, entidade, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows);
                    }
                    else {
                        console.log("errooo", err);
                    }
                });
                sql = `INSERT INTO usuario (login, senha, id_pessoa)
                VALUES ('${entidade.login}', '${entidade.senha}', (select LAST_INSERT_ID()) )`;

                con.query(sql, entidade, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows);
                    }
                    else {
                        console.log("errooo", err);
                    }
                });
            }
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

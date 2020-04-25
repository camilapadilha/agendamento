const express = require('express');
const app = express();
const con = require('../server');
const query = require('../util/db_util');

module.exports = {

    validarLogin(login, senha) {
        return new Promise((resolve, reject) => {
            const sql = `
                    SELECT login, senha from usuario a
                    INNER JOIN pessoa b ON a.id_pessoa=b.id_pessoa
                    WHERE (a.login = '${login}' OR b.email_institucional = '${login}') 
                    AND senha = '${senha}'`;

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
                + "inner JOIN funcao c "
                + "on b.id_funcao = c.id_funcao "
                + "LEFT JOIN pessoa_disciplina d "
                + "ON a.id_pessoa=d.id_pessoa "
                + "INNER JOIN disciplina e "
                + "ON d.id_disciplina = e.id_disciplina "
                + "GROUP BY a.id_usuario";

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
    buscarDisciplinasPessoa(id_pessoa) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM disciplina a 
                INNER JOIN pessoa_disciplina b 
                ON a.id_disciplina=b.id_disciplina 
                WHERE id_pessoa=${id_pessoa}`;

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

    salvar(entidade, listDisciplinasExcluidas) {
        return new Promise((resolve, reject) => {
            let sql = '';
            let sqlPessoa = '';
            let sql_pessoa_disciplina = '';
            let sql_lista_disciplinas_excluidas = '';
            let lista_disciplinas = [];
            let id = '';

            if (entidade.id_usuario) {
                sqlPessoa = `UPDATE pessoa
                SET nome_pessoa='${entidade.nome_pessoa}', 
                cpf='${entidade.cpf}', 
                celular='${entidade.celular}', 
                email_institucional='${entidade.email_institucional}', 
                email_pessoal='${entidade.email_pessoal}',
                id_funcao= ${entidade.funcao}
                where id_pessoa=${entidade.id_pessoa}`;

                con.query(sqlPessoa, entidade, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows);
                    }
                    else {
                        console.log("errooo", err);
                    }
                });
                sql = `UPDATE usuario 
                set senha ='${entidade.senha}'
                where id_pessoa=${entidade.id_pessoa}`;

                con.query(sql, entidade, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows);
                    }
                    else {
                        console.log("errooo", err);
                    }
                });

                console.log("teste", lista_disciplinas);

                for (const d of entidade.listDisciplina) {
                    if (!d.id_pessoa_disciplina) {
                        sql_pessoa_disciplina = `INSERT INTO pessoa_disciplina (id_pessoa, id_disciplina)
                        VALUES ((select id_pessoa FROM pessoa WHERE cpf=${entidade.cpf}), ${d.id_disciplina})`;

                        con.query(sql_pessoa_disciplina, entidade, (err, rows, fields) => {
                            if (!err) {
                                resolve(rows);
                            }
                            else {
                                console.log("errooo", err);
                            }
                        });
                    }
                }
                if (listDisciplinasExcluidas.length > 0) {
                    for (const d of listDisciplinasExcluidas) {
                        sql_lista_disciplinas_excluidas = `delete from pessoa_disciplina
                         where id_pessoa_disciplina=${d.id_pessoa_disciplina}`;

                        con.query(sql_lista_disciplinas_excluidas, entidade, (err, rows, fields) => {
                            if (!err) {
                                resolve(rows);
                            }
                            else {
                                console.log("errooo", err);
                            }
                        });
                    }
                }
            } else {
                sqlPessoa = `INSERT INTO pessoa (nome_pessoa, cpf, celular, email_institucional, email_pessoal, id_funcao)
                VALUE ('${entidade.nome_pessoa}', '${entidade.cpf}', '${entidade.celular}', '${entidade.email_institucional}', 
                '${entidade.email_pessoal}', ${entidade.funcao})`;

                con.query(sqlPessoa, entidade, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows);
                        id = rows.insertId;
                        console.log("id do insert", id);
                    }
                    else {
                        console.log("errooo", err);
                    }
                });
                console.log("id depois do insert", id);
                
                sql = `INSERT INTO usuario (login, senha, id_pessoa)
                VALUES ('', '${entidade.senha}', (select id_pessoa FROM pessoa WHERE cpf=${entidade.cpf}))`;

                con.query(sql, entidade, (err, rows, fields) => {
                    if (!err) {
                        resolve(rows);
                    }
                    else {
                        console.log("errooo", err);
                    }
                });
                for (const d of entidade.listDisciplina) {
                    sql_pessoa_disciplina = `INSERT INTO pessoa_disciplina (id_pessoa, id_disciplina)
                        VALUES ((select id_pessoa FROM pessoa WHERE cpf=${entidade.cpf}), ${d.id_disciplina})`;

                    con.query(sql_pessoa_disciplina, entidade, (err, rows, fields) => {
                        if (!err) {
                            resolve(rows);
                        }
                        else {
                            console.log("errooo", err);
                        }
                    });
                }
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

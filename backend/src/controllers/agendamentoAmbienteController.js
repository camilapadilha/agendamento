const express = require('express');
const app = express();
const con = require('../server');
const query = require('../util/db_util');

module.exports = {
    buscar() {
        return new Promise((resolve, reject) => {
            con.query("SELECT * FROM agenda a "
                + "INNER JOIN pessoa ps "
                + "ON a.id_pessoa=ps.id_pessoa "
                + "LEFT JOIN equipamento e "
                + "ON a.id_equipamento=e.id_equipamento "
                + "LEFT JOIN  ambiente ab "
                + "ON a.id_ambiente=ab.id_ambiente", (err, rows, fields) => {
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

            sql = `INSERT INTO agenda (data_agendamento, horario_aula, turno, id_pessoa, id_ambiente)
            VALUES ('${entidade.dia_semana}',${entidade.horario_aula},'${entidade.periodo}', 36, ${entidade.laboratorio.id_ambiente})`;

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
            let sql = `delete from agenda where id_agenda = ${entidade.id_ambiente}`;
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

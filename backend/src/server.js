const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'agendamento'
});

connection.connect(function (err) {
    if (err) return console.log(err);
    console.log('conectou!');
})

connection.query('SELECT * from funcao', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows);
  });
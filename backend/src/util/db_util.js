const sqlUtil = require ('mysql')

function query(sql, params, connection) {
    return new Promise((resolve, reject) => {
        co(function* () {
            let conn = connection;
            if (!conn) {
                conn = yield getConnection();
            }
            conn.query(sql, params, (err2, res) => {
                if (!connection) {
                    conn.release();
                }
                if (err2) {
                    reject(err2);
                } else {
                    resolve(res);
                }
            });
        }).catch(console.log);
    });
}

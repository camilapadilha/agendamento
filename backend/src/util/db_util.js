const sqlUtil = require ('mysql')
const co = require ('co')

 function query(sql, params, connection) {
    return new Promise((resolve, reject) => {
        co(function* () {
            let conn = connection;
            // if (!conn) {
            //     conn = yield sqlUtil.getConnection();
            // }
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

module.exports = query
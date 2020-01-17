
const db_util = require('../util/db_util');
module.exports = (class Controller {
    // async salvar(tabela, pk, entidade){

    // }
    static async buscar(tabela) {
        try {
            const ret = await db_util.query('select * from funcao');
            return ret;
        } catch (error) {
            console.log('erro ', error);
            
        }
    }
    
});
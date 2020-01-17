import sqlUtil from 'mysql'

async function buscar(){
   await sqlUtil.query('select * from funcao')
}
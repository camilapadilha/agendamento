import axios from 'axios'

export default class Api {
    
    static async buscarFuncao() {
        return await axios.get('http://localhost:4000/buscarFuncao');
    }

    static async salvarFuncao(entidade) {
        return await axios.post('http://localhost:4000/salvarFuncao', { entidade });
    }

    static async excluirFuncao(entidade) {
        return await axios.post('http://localhost:4000/excluirFuncao', { entidade });
    }
    static async buscarDisciplina() {
        return await axios.get('http://localhost:4000/buscarDisciplina');
    }

    static async salvarDisciplina(entidade) {
        return await axios.post('http://localhost:4000/salvarDisciplina', { entidade });
    }

    static async excluirDisciplina(entidade) {
        return await axios.post('http://localhost:4000/excluirDisciplina', { entidade });
    }
}
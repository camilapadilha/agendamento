import axios from 'axios'

export default class Api {
    
    static async buscar(tabela) {
        return await axios.get('http://localhost:4000/api/buscar', { tabela });
    }

    static async salvar(tabela, pk, entidade) {
        return await axios.post('/salvar', { tabela, pk, entidade });
    }

    static async excluir(tabela, pk, entidade) {
        return await axios.post('/excluir', { tabela, pk, entidade });
    }
}
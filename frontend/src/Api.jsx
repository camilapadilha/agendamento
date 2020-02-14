import axios from 'axios'

export default class Api {
    
    static async buscar() {
        return await axios.get('http://localhost:4000/buscar');
    }

    static async salvar(entidade) {
        return await axios.post('http://localhost:4000/salvar', { entidade });
    }

    static async excluir(tabela, pk, entidade) {
        return await axios.post('/excluir', { tabela, pk, entidade });
    }
}
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
    static async buscarUsuario() {
        return await axios.get('http://localhost:4000/buscarUsuario');
    }

    static async salvarUsuario(entidade) {
        return await axios.post('http://localhost:4000/salvarUsuario', { entidade });
    }

    static async excluirUsuario(entidade) {
        return await axios.post('http://localhost:4000/excluirUsuario', { entidade });
    }

    static async buscarEquipamentos() {
        return await axios.get('http://localhost:4000/buscarEquipamento');
    }

    static async salvarEquipamentos(entidade) {
        return await axios.post('http://localhost:4000/salvarEquipamento', { entidade });
    }

    static async excluirEquipamentos(entidade) {
        return await axios.post('http://localhost:4000/excluirEquipamento', { entidade });
    }

    static async buscarAmbiente() {
        return await axios.get('http://localhost:4000/buscarAmbiente');
    }

    static async salvarAmbiente(entidade) {
        return await axios.post('http://localhost:4000/salvarAmbiente', { entidade });
    }

    static async excluirAmbiente(entidade) {
        return await axios.post('http://localhost:4000/excluirAmbiente', { entidade });
    }
}
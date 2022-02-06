import axios from 'axios'

export default class Api {

    static async validarLogin(login, senha) {
        return await axios.get(`http://localhost:4000/validarLogin?login=${login}&&senha=${senha}`);
    }

    static async buscarFuncao() {
        return await axios.get('http://localhost:4000/buscarFuncao');
    }

    static async salvarFuncao(entidade, id) {
        return await axios.post('http://localhost:4000/salvarFuncao', { entidade, id });
    }

    static async excluirFuncao(entidade) {
        return await axios.post('http://localhost:4000/excluirFuncao', { entidade });
    }
    static async buscarDisciplina() {
        return await axios.get('http://localhost:4000/buscarDisciplina');
    }

    static async salvarDisciplina(entidade, id) {
        return await axios.post('http://localhost:4000/salvarDisciplina', { entidade, id });
    }

    static async excluirDisciplina(entidade) {
        return await axios.post('http://localhost:4000/excluirDisciplina', { entidade });
    }
    static async buscarUsuario() {
        return await axios.get('http://localhost:4000/buscarUsuario');
    }

    static async buscarDisciplinasPessoa(id_pessoa) {
        return await axios.get(`http://localhost:4000/buscarDisciplinasPessoa?id_pessoa=${id_pessoa}`);
    }

    static async salvarUsuario(entidade, listDisciplinasExcluidas) {
        return await axios.post('http://localhost:4000/salvarUsuario', { entidade, listDisciplinasExcluidas });
    }

    static async excluirUsuario(entidade) {
        return await axios.post('http://localhost:4000/excluirUsuario', { entidade });
    }

    static async buscarEquipamentos() {
        return await axios.get('http://localhost:4000/buscarEquipamento');
    }

    static async salvarEquipamentos(entidade, id) {
        return await axios.post('http://localhost:4000/salvarEquipamento', { entidade, id });
    }

    static async excluirEquipamentos(entidade) {
        return await axios.post('http://localhost:4000/excluirEquipamento', { entidade });
    }

    static async buscarAmbiente(id) {
        return await axios.get(`http://localhost:4000/buscarAmbiente?id=${id}`);
    }

    static async salvarAmbiente(entidade, id) {
        return await axios.post('http://localhost:4000/salvarAmbiente', { entidade, id });
    }

    static async excluirAmbiente(entidade) {
        return await axios.post('http://localhost:4000/excluirAmbiente', { entidade });
    }

    static async buscarHorariosAmbiente() {
        return await axios.get('http://localhost:4000/buscarHorariosAmbiente');
    }

    static async salvarHorarioAmbiente(entidade) {
        return await axios.post('http://localhost:4000/salvarHorarioAmbiente', { entidade });
    }

    static async excluirHorarioAmbiente(entidade) {
        return await axios.post('http://localhost:4000/excluirHorarioAmbiente', { entidade });
    }
}
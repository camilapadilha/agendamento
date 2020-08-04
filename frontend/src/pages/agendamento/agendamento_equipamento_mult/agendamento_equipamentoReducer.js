const INITIAL_STATE = { agendamento_equipamento: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'AGENDAMENTO_EQUIPAMENTO':
            return { ...state, agendamento_equipamento: action.agendamento_equipamento }
        default:
            return state;
    }
}
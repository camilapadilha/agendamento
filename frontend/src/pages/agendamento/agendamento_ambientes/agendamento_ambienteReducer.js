const INITIAL_STATE = { agendamento_ambiente: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'AGENDAMENTO_AMBIENTE':
            return { ...state, agendamento_ambiente: action.agendamento_ambiente }
        default:
            return state;
    }
}
const INITIAL_STATE = { equipamento: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'EQUIPAMENTO':
            return { ...state, equipamento: action.equipamento }
        default:
            return state;
    }
}
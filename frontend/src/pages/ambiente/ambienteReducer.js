const INITIAL_STATE = { ambiente: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'AMBIENTE':
            return { ...state, ambiente: action.ambiente }
        default:
            return state;
    }
}
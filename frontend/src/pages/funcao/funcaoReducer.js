const INITIAL_STATE = { funcao: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FUNCAO':
            return { ...state, funcao: action.funcao }
        default:
            return state;
    }
}
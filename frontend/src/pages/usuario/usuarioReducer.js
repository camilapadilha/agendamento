const INITIAL_STATE = { usuario: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USUARIO':
            return { ...state, usuario: action.usuario }
        default:
            return state;
    }
}
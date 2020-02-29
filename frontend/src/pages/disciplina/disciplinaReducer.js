const INITIAL_STATE = { disciplina: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DISCIPLINA':
            return { ...state, disciplina: action.disciplina }
        default:
            return state;
    }
}
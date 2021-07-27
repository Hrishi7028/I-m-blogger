const initialState = {
    profileError: []
}

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROFILE_ERROR':
            return { ...state, profileError: action.payload }

        case 'REMOVE_PROFILE_ERROR':
            return { ...state, profileError: [] }
        default:
            return state;
    }
}
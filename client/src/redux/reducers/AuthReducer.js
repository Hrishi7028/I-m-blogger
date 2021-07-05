import jwt_decode from "jwt-decode"

const initialState = {
    loading: false,
    registerError: [],
    loginError: [],
    token: '',
    user: ''
}

const token = localStorage.getItem('User_key')

// if (token) {
//     const decoded_token = jwt_decode(token);
//     const expiresIn = new Date(decoded_token.exp * 1000);
//     if (new Date() > expiresIn) {
//         localStorage.removeItem('User_key');
//     } else {
//         const { user } = decoded_token;
//         console.log(user);
//         initialState.user = user;
//         initialState.token = token;

//         // return decoded_token
//     }
// }

const tokenExtractor = (token) => {
    const decoded_token = jwt_decode(token);
    const expiresIn = new Date(decoded_token.exp * 1000);
    if (new Date() > expiresIn) {
        localStorage.removeItem('User_key');
    } else {
        return decoded_token;
    }
}
if (token) {
    const decoded_token = tokenExtractor(token)
    initialState.token = token;
    let { user } = decoded_token;
    initialState.user = user;
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_LOADING':
            return { ...state, loading: true }

        case 'CLOSE_LOADING':
            return { ...state, loading: false }

        case 'REGISTER_ERROR':
            return { ...state, registerError: action.payload }

        case 'SET_USER':
            const decoded_data = tokenExtractor(action.payload)
            const { user } = decoded_data;
            return { ...state, user: user, token: action.payload }

        case 'LOGIN_ERROR':
            return {...state, loginError: action.payload}
        case 'LOGOUT_USER':
            return {
                ...state,
                user: '',
                token: '',
                registerError: [],
                loginError: []
            }
        default:
            return state;
    }
}

export default AuthReducer;
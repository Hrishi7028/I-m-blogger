const initialState = {
    loading: false,
    redirect: false,
    postErrors: [],
    message: '',
    posts:[],
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_LOADING':
            return { ...state, loading: true }

        case 'CLOSE_LOADING':
            return { ...state, loading: false }

        case 'POST_ERRORS':
            return { ...state, postErrors: action.payload }

        case 'REMOVE_ERRORS' : 
            return { ...state, postErrors:[]}

        case 'REDIRECT_TRUE':
            return { ...state, redirect: true }

        case 'SET_MESSAGE': 
            return {...state, message: action.payload
            }
        case 'REMOVE_MESSAGE' :
            return {...state,message: ''}
        case 'REDIRECT_FALSE':
            return { ...state, redirect: false }
        default:
    }
    return state;
}


export const getAllPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_LOADING':
            return { ...state, loading: true }

        case 'CLOSE_LOADING':
            return { ...state, loading: false }
    
        case 'SET_POSTS': 
            return {...state,posts:action.payload}
        default: 
            return state;
    }
}
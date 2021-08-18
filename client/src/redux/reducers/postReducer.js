const initialState = {
    loading: false,
    redirect: false,
    postErrors: [],
    message: '',
    posts: [],
    count: 0,
    per_page_post: 0,
    single_post: {},
    comments:[]
}




export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_LOADING':
            return { ...state, loading: true }

        case 'CLOSE_LOADING':
            return { ...state, loading: false }

        case 'POST_ERRORS':
            return { ...state, postErrors: action.payload }

        case 'REMOVE_ERRORS':
            return { ...state, postErrors: [] }

        case 'REDIRECT_TRUE':
            return { ...state, redirect: true }

        case 'SET_MESSAGE':
            return {
                ...state, message: action.payload
            }
        case 'REMOVE_MESSAGE':
            return { ...state, message: '' }
        case 'REDIRECT_FALSE':
            return { ...state, redirect: false }

        default:
            return state;
    }
}


export const getAllPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_LOADING':
            return { ...state, loading: true }

        case 'CLOSE_LOADING':
            return { ...state, loading: false }

        case 'SET_POSTS':
            return { ...state, posts: action.payload.posts, count: action.payload.count, per_page_post: action.payload.per_page_post }

        case 'SHOW_USER_POST':
            return { ...state, single_post: action.payload }
        
        case 'SHOW_COMMENTS':
            return {...state,comments:action.payload}
        case 'REMOVE_USER_POST':
            return { ...state, single_post: {} }
        default:
            return state;
    }
}
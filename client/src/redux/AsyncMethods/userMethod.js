import axios from 'axios'


export const postRegisterData = (state, props) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/register', state, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'SET_USER', payload: response.data.token })
            // console.log(response.data.token);
            localStorage.setItem('User_key', response.data.token)

        } catch (error) {
            // console.log(error.response);
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'REGISTER_ERROR', payload: error.response.data.errors });
        }
    }
}


export const postLoginData = (state) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/login', state, {
                header: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch({ type: 'CLOSE_LOADING' })
            localStorage.setItem('User_key', data.token)
            dispatch({ type: 'SET_USER', payload: data.token })

            console.log(data);
        } catch (error) {
            console.log(error.response.data.errors);
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.errors });
        }
    }
}

export const postEmail = (email) => {
    return async (dispatch) => {


        dispatch({ type: 'ON_LOADING' });

        try {

            const response = await axios.post('/forget-password', { email })
            console.log(response.data.msg);
            dispatch({ type: 'CLOSE_LOADING' });
            dispatch({ type: 'SET_MESSAGE', payload: response.data.msg })
            console.log(email)
        } catch (err) {
            dispatch({ type: 'CLOSE_LOADING' });
            dispatch({ type: 'SET_MESSAGE', payload: err.response.data.error })
            console.log(err.response.data.error)
        }
    }
}



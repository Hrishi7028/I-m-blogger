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

export const send_Password = (state) => {
    return async (dispatch) => {
        console.log(state);
        dispatch({type:'ON_LOADING'})
        if(state.password !== state.cpassword) {
            dispatch({type:'CLOSE_LOADING'})
            dispatch({type:'SET_MESSAGE',payload:'Password does not match'})
            return
        }
        try {
            const response = await axios.post(`/reset-password/${state.client_Id}`,state)
            dispatch({type:'CLOSE_LOADING'})
            console.log(response);
            dispatch({ type: 'SET_MESSAGE', payload: response.data.msg })
            
            
        } catch (error) {
            dispatch({type:'CLOSE_LOADING'})
            dispatch({ type: 'SET_MESSAGE', payload: error.response.data.error })
            console.log(error.response);
        }

    }
}
import axios from 'axios'


export const postRegisterData = (state,props) => {
    return  async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:80/register', state, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'SET_USER',payload:response.data.token })
            console.log(response.data.token);
            // localStorage.setItem('User_key',response.data.token)
            
        } catch (error) {
            console.log(error.response);
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'REGISTER_ERROR', payload: error.response.data.errors });
        }
    }
} 
import axios from 'axios';

export const fetchAllPost = (id) => {
    return async (dispatch,getState) => {
        console.log('called');
        const {AuthReducer:{token}} = getState()
        dispatch({ type: 'ON_LOADING'});
        try {

            const {data:{posts}} = await axios.get(`http://localhost:80/get_all_posts/${id}`,{
                headers: { 
                    Authorization: 'Bearer ' + token,
                }
            })
            dispatch({ type: 'CLOSE_LOADING'});
            console.log(posts);
            dispatch({ type: 'SET_POSTS',payload:posts})

        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING'});
            console.log(error);
            
        }

    }
}
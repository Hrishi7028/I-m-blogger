import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
const Dashboard = () => {

    const {redirect,message} = useSelector((state) => (state.postReducer));
    const dispatch = useDispatch()
    useEffect(() =>{
        if(redirect){
            dispatch({ type: 'REMOVE_ERRORS'})
            dispatch({type:'REDIRECT_FALSE'})
        }
        if(message) {
            toast.success(message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
            dispatch({ type: 'REMOVE_MESSAGE'})

        }

    },[redirect]);

    return (
        <>
        <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <h1>Hello from dashboard</h1>
        </>
    )
}

export default Dashboard;
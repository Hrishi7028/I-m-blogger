import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postEmail } from '../../redux/AsyncMethods/userMethod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

const Forget = () => {

    const dispatch = useDispatch();
    const { loading, message } = useSelector(state => state.postReducer)
    const [email, setEmail] = useState('');
    const submitEmail = (e) => {
        e.preventDefault();
        dispatch(postEmail(email))
        // console.log(email)
        setEmail('');
    }

    useEffect(() => {
        if (message) {
            console.log(message);
            console.log(message.includes('user'))
            if (message.includes('User')) {
                (toast.error(message, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))
            } else {
                (toast.success(message, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))
            }
            dispatch({ type: 'REMOVE_MESSAGE' })
        }
    }, [message, dispatch])
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
            <div className="card mx-auto my-5" style={{ width: "30rem" }}>
                <div style={{ padding: "0 1.25rem" }}>
                    <h1 className="text-center">Password assistance</h1>
                    <p>Enter the email address associated with your I'm Blooger account. </p>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label
                                for="email"
                                className="form-label"
                            >Enter Your Email address:
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                                aria-describedby="emailHelp"

                            />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={submitEmail}>{loading ? <b>loading...</b> : 'Verify'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Forget;
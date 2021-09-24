import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { send_Password } from '../../redux/AsyncMethods/userMethod'
import { useHistory, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';



const Reset_password = () => {

    const { uuid } = useParams()
    const dispatch = useDispatch()
    const { loading, message } = useSelector((state) => state.postReducer)
    const history = useHistory()
    const [state, setState] = useState({
        password: '',
        cpassword: ''
    })
    console.log(uuid);
    const setDate = (e) => {
        // e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const sendPassword = (e) => {
        e.preventDefault();
        // console.log(state);
        const password_Data = {
            password: state.password,
            cpassword: state.cpassword,
            client_Id: uuid
        }
        dispatch(send_Password(password_Data));
        setState({
            password: '',
            cpassword: '',
        })

    }

    useEffect(() => {
        if (message) {
            if (message.includes('successfully!')) {
                (toast.success(message, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))

                setTimeout(() => { history.push('/login') }, 2000)
            } else {
                (toast.error(message, {
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
    }, [message, dispatch, history])

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
            <div className="card mx-auto my-5 text-capitalize forget_container">
                <div style={{ padding: "0 1.25rem" }}>
                    <h1 className="text-center font_size">Reset password</h1>
                    <p>Enter the email address associated with your I'm Blooger account. </p>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label
                                for="password"
                                className="form-label"
                            >Enter new password:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                name="password"
                                value={state.password}
                                onChange={setDate}
                                placeholder="●●●●●●●●●"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                for="cpassword"
                                className="form-label"
                            >confirm new password:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="cpassword"
                                name="cpassword"
                                value={state.cpassword}
                                onChange={setDate}
                                placeholder="●●●●●●●●●"

                            />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={sendPassword}>{loading ? 'wait' : 'confirm'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Reset_password;
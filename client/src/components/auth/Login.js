import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { postLoginData } from '../../redux/AsyncMethods/userMethod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '../../style/login.css'
const Login = () => {

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const { loading, loginError } = useSelector((state) => (state.AuthReducer))
    const handelInputs = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const loginUser = (e) => {
        e.preventDefault();
        dispatch({ type: 'ON_LOADING' });
        dispatch(postLoginData(state))
        // console.log(state);
    }

    useEffect(() => {
        if (loginError.length > 0) {
            loginError.map((error) => {
                console.log(error);
                return (
                    toast.error(error.msg, {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }))
            })
        }
    }, [loginError])

    return (
        <>
            <div className="container mt-5">
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
                <div className="card mx-auto my-2 mb-3 mannual_width">
                    <div className="card-body">
                        <h4 className="card-title text-center font-weight-bold">Login here</h4>
                        <hr />
                        <form className="needs-validation" onSubmit={loginUser} >
                            <div className="form-group">
                                <label htmlFor="useremail">Email address: </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="useremail"
                                    name="email"
                                    value={state.email}
                                    onChange={handelInputs}
                                    aria-describedby="emailHelp"
                                    placeholder="abc@abc.com" />
                                <small id="emailHelp" className="form-text text-muted"><i className="fas fa-info-circle"></i> We'll
                                    never share your email with anyone
                                    else.</small>
                                <div className="invalid-feedback">
                                    <i className="fas fa-exclamation"><span> Enter proper Email</span></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userpassword">Password: </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    onChange={handelInputs}
                                    value={state.password}
                                    id="userpassword"
                                    aria-describedby="passwordHelp"
                                    placeholder="••••••••" />
                                <small id="passwordHelp" className="form-text text-muted"><i className="fas fa-info-circle"></i>
                                    password should be at least 8 characters</small>
                                <div className="invalid-feedback">
                                    <i className="fas fa-exclamation"><span> Enter proper password</span></i>
                                </div>

                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-warning w-100" value={loading ? "wait" : "Login"} id="login" />
                            </div>
                            
                            <p className="text-center"><Link to="/forget">forget password</Link></p>
                            <p className="text-center">Don't have an account? <Link to="/register"> Sign up</Link></p>
                            <small id="passwordHelp" className="form-text text-muted mt-3">By continuing, you agree to I'm Blogger's
                                <span><Link to="#"> Conditions of Use</Link></span> and <span><Link to="#">Privacy
                                    Notice</Link></span>.</small>
                        </form>

                    </div>
                </div>
            </div>



        </>
    )
}

export default Login;
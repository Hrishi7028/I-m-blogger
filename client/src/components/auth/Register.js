import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handelInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const registerUser = (e) => {
        e.preventDefault();
        console.log(state);
    }
    return (
        <>
            <div className="container mt-5">
                <div className="card mx-auto my-2 mb-3" style={{ width: "27rem" }}>
                    <div className="card-body">
                        <h4 className="card-title text-center font-weight-bold">Register here</h4>
                        <hr />
                        <form className="needs-validation" onSubmit={registerUser} >
                            <div className="form-group">
                                <label htmlFor="username">Name: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username" aria-describedby="emailHelp"
                                    placeholder="abc"
                                    name="name"
                                    value={state.name}
                                    onChange={handelInput}

                                />
                                <div className="invalid-feedback">
                                    <i className="fas fa-exclamation"><span> Enter name properly</span></i>
                                </div>
                                <div className="valid-feedback">
                                    <i className="fas fa-exclamation"><span> Enter name properly</span></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="useremail">Email address: </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="useremail"
                                    name="email"
                                    aria-describedby="emailHelp"
                                    placeholder="abc@abc.com"
                                    value={state.email}
                                    onChange={handelInput}
                                />
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
                                    id="userpassword"
                                    name="password"
                                    aria-describedby="passwordHelp"
                                    placeholder="••••••••"
                                    value={state.password}
                                    onChange={handelInput}
                                />
                                <small id="passwordHelp" className="form-text text-muted"><i className="fas fa-info-circle"></i>
                                    password should be at least 8 characters</small>
                                <div className="invalid-feedback">
                                    <i className="fas fa-exclamation"><span> Enter proper password</span></i>
                                </div>

                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-warning w-100" value="Register" id="Register" />
                            </div>
                            <p className="text-center">Already have an account? <Link> Sign in</Link></p>
                            <small id="passwordHelp" className="form-text text-muted mt-3">By continuing, you agree to I'm Blogger's
                                <span><Link to ="#"> Conditions of Use</Link></span> and <span><Link to ="#">Privacy
                                    Notice</Link></span>.</small>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
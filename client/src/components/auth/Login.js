import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
        
        <div className="container mt-5">
            <div className="card mx-auto my-2 mb-3" style={{width: "27rem"}}>
                <div className="card-body">
                    <h4 className="card-title text-center font-weight-bold">Login here</h4>
                    <hr />
                    <form className="needs-validation" >
                        <div className="form-group">
                            <label for="useremail">Email address: </label>
                            <input type="email" className="form-control" id="useremail" aria-describedby="emailHelp"
                                placeholder="abc@abc.com" />
                            <small id="emailHelp" className="form-text text-muted"><i className="fas fa-info-circle"></i> We'll
                                never share your email with anyone
                                else.</small>
                            <div className="invalid-feedback">
                                <i className="fas fa-exclamation"><span> Enter proper Email</span></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="userpassword">Password: </label>
                            <input type="password" className="form-control" id="userpassword"
                                aria-describedby="passwordHelp" placeholder="••••••••"/>
                            <small id="passwordHelp" className="form-text text-muted"><i className="fas fa-info-circle"></i>
                                password should be at least 8 characters</small>
                                <div className="invalid-feedback">
                                    <i className="fas fa-exclamation"><span> Enter proper password</span></i>
                                </div>   

                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-warning w-100" value="Login" id="login"/>
                        </div>
                        <p className="text-center">Already have an account? <Link to="login.html"> Sign in</Link></p>
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
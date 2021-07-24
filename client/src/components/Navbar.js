import { Link, useHistory } from 'react-router-dom'
import '../style/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

  const { user } = useSelector((state) => (state.AuthReducer));
  const dispatch = useDispatch()
  const history = useHistory()
  // console.log(user.name);
  const handelLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('User_key');
    dispatch({ type: 'LOGOUT_USER' })
    history.push('/login')
  }
  const Links = user ? <>
    <li className="nav-item">
      <Link className="nav-link active" to="/createblog"><span className="icon"><i className="fas fa-paper-plane"></i></span>Create Blog</Link>
    </li>
    <li className="nav-item">
      <Link to='/dashboard/1' className="nav-link active name_icon" aria-current="page" > <span className="icon"><i className="fas fa-user"></i>{user.name}</span></Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link active" to="/login" onClick={handelLogout}><span className="icon"><i className="fas fa-sign-out-alt"></i></span>Logout</Link>
    </li>
  </> : <>
    <li className="nav-item">
      <Link className="nav-link active" to="/register"><span className="icon"><i className="fas fa-user-plus"></i></span>Register </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link active" to="/login" tabIndex="-1" aria-disabled="true"> <span className="icon"><i className="fas fa-sign-in-alt login_icon"></i></span>Login</Link>
    </li>
  </>
  return (
    <nav className=" navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand " to="/">I'm Blogger</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
          {Links}
        </ul>

      </div>
    </nav>


  )
}

export default Navbar
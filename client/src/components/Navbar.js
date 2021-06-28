import { Link } from 'react-router-dom'
import '../style/Navbar.css'


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">I'm Blogger</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/"> <span className="icon"><i className="fas fa-home"></i></span> Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/register"><span className="icon"><i className="fas fa-user-plus"></i></span>Register </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/login" tabIndex="-1" aria-disabled="true"> <span className="icon"><i className="fas fa-sign-in-alt login_icon"></i></span>Login</Link>
          </li>
        </ul>

      </div>
    </nav>


  )
}

export default Navbar
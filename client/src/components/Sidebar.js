import {Link} from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div className="card">
                <div className="card-header font-weight-bold">
                    Profile...
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <Link className="btn btn-default" to="/edit_name">Change Name</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="btn btn-default" to="/edit_password">Change Password</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar;
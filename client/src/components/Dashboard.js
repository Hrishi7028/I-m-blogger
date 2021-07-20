import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { fetchAllPost } from "../redux/AsyncMethods/fetchAllPost";
import { Link } from 'react-router-dom'
import Loading from "./Loading";
import { SemipolarLoading } from 'react-loadingg';






const Dashboard = () => {
    const { redirect, message } = useSelector((state) => (state.postReducer));
    const dispatch = useDispatch()
    const { user: { _id } } = useSelector((state) => (state.AuthReducer))
    const { posts, loading } = useSelector((state) => (state.getAllPostReducer))
    useEffect(() => {
        if (redirect) {
            dispatch({ type: 'REMOVE_ERRORS' })
            dispatch({ type: 'REDIRECT_FALSE' })
        }
        if (message) {
            toast.success(message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
            dispatch({ type: 'REMOVE_MESSAGE' })
        }
        dispatch(fetchAllPost(_id));

    }, []);

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
            <div className="custome_container mt-5">
                
                <div className="row">
                
                    <div className="col-lg-3 mb-5 col-sm-12 col-md-12">
                        <div className="card">
                            <div className="card-header font-weight-bold">
                                Profile...
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <Link className="btn btn-default" to="/createblog">Change Name</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link className="btn btn-default" to="/createblog">Change Name</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link className="btn btn-default" to="/createblog">Change Name</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9 col-sm-12 col-md-12">
                        {
                            !loading ?
                                posts.length > 0 ? posts.map((post) => (
                                    <div>
                                        <div className="card mb-3">
                                            <div className="card-header">
                                                {post.slug}
                                                <i className="far fa-clipboard mr-3" style={{ float: 'right' }}></i>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{post.title}</h5>
                                                <p className="card-text">{post.decription}</p>
                                                <Link className="btn btn-sm btn-primary mr-3" to="/createblog"><i class="fas fa-edit"></i></Link>
                                                <Link className="btn btn-sm btn-primary" to="/createblog"><i className="fas fa-trash-alt"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2>Nothing to load</h2> : 
                                <SemipolarLoading
                                    size="large"
                                    className="check"
                                />


                        }
                    </div>

                </div>
            
            
            
            </div>
        </>
    )
}

export default Dashboard;
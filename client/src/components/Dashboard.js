import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { fetchAllPost } from "../redux/AsyncMethods/fetchAllPost";
import { Link } from 'react-router-dom'
import { SemipolarLoading } from 'react-loadingg';
import copy from 'copy-to-clipboard';
import '../style/dashboard.css'
import Pagination from './Pagination'
import axios from "axios";



const Dashboard = () => {
    const { redirect, message } = useSelector((state) => (state.postReducer));
    const dispatch = useDispatch()
    const { user: { _id }, token } = useSelector((state) => (state.AuthReducer))
    const { posts, loading, count, per_page_post } = useSelector((state) => (state.getAllPostReducer))
    const [copyText, setIscopyText] = useState(true)
    let { page_no } = useParams()
    if (page_no === "undefined") {
        page_no = 1;
    }
    console.log(page_no);
    const copyFunction = (index) => {
        // console.log(index);
        setIscopyText(false)
        console.log(copyText);
        copy(posts[index].slug);
    }
    // console.log('outside: ' + copyText);

    const deletePost = async (id) => {
        console.log(id);
        try {
            const response  = await axios.get(`http://localhost:80/delete_post/${ id }`, {
                headers: {
                    authorization: `Bearer ${ token }`
                }
            })
            console.log(response);
            console.log(response.data.msg)
            dispatch(fetchAllPost(_id, page_no));
            dispatch({ type: 'SET_MESSAGE', payload: response.data.msg })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        dispatch(fetchAllPost(_id, page_no));
    }, [page_no])


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
    }, [message]);

    // console.log(copyText);

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
                                posts.length > 0 ? posts.map((post, index) => (
                                    <div>
                                        <div className="card mb-3">
                                            <div className="card-header">
                                                {post.slug}
                                                <i className={`far fa-clipboard mr-3 ${ copyText ? "showbtn" : "hidebtn" }`} style={{ float: 'right', cursor: 'pointer', padding: '5px', }} onClick={() => copyFunction(index)}></i>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{post.title}</h5>
                                                <p className="card-text">{post.decription}</p>
                                                <button type="button" class="mt-3 btn btn-primary" onClick={() => deletePost(post._id)}>Delete Post</button>
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2>You have not created any post...</h2> :
                                
                                <SemipolarLoading
                                    size="large"
                                    className="check"
                                />

                        }
                        {/* <Pagination
                            page={page_no}
                            per_page_post={per_page_post}
                            count={count}
                        /> */}
                    </div>

                </div>



            </div>
        </>
    )
}

export default Dashboard;
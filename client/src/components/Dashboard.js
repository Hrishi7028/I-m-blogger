import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { fetchAllPost } from "../redux/AsyncMethods/fetchAllPost";
import { SemipolarLoading } from 'react-loadingg';
import copy from 'copy-to-clipboard';
import '../style/dashboard.css'
import Pagination from './Pagination'
import axios from "axios";
import Sidebar from "./Sidebar";
import moment from "moment";


const Dashboard = (props) => {
    const { redirect, message } = useSelector((state) => (state.postReducer));
    const dispatch = useDispatch()
    const { user: { _id }, token } = useSelector((state) => (state.AuthReducer))
    const { posts, loading, count, per_page_post } = useSelector((state) => (state.getAllPostReducer))
    const [copyText, setIscopyText] = useState(true)
    let { page } = useParams()
    if (page === undefined) {
        page = 1;
    }

    const copyFunction = (index) => {

        setIscopyText(false)
        console.log(copyText);
        copy(posts[index].slug);
    }

    const deletePost = async (id) => {
        console.log(id);
        try {
            const response = await axios.get(`/delete_post/${ id }`, {
                headers: {
                    authorization: `Bearer ${ token }`
                }
            })
            console.log(response);
            console.log(response.data.msg)
            dispatch(fetchAllPost(_id, page));
            dispatch({ type: 'SET_MESSAGE', payload: response.data.msg })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        dispatch(fetchAllPost(_id, page));
    }, [page])


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
    }, [message, redirect]);

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
                        < Sidebar />
                    </div>
                    <div className="col-lg-9 col-sm-12 col-md-12">
                        {
                            !loading ?
                                posts.length > 0 ? posts.map((post, index) => (
                                    (<div>
                                        <div className="card mb-3">
                                            <div className="card-header">
                                                {post._id}
                                                <i className={`far fa-clipboard mr-3 ${ copyText ? "showbtn" : "hidebtn" }`} style={{ float: 'right', cursor: 'pointer', padding: '5px', }} onClick={() => copyFunction(index)}></i>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title post_title">{post.title}</h5>
                                                <span className="relative_time">{moment(post.updatedAt).fromNow()}</span>
                                                <p className="card-text">{post.decription}</p>
                                                <button type="button" class="mt-3 btn btn-primary" onClick={() => deletePost(post._id)}>Delete Post</button>
                                            </div>
                                        </div>
                                    </div>)
                                )) : <h2>You have not created any post...</h2> :

                                <SemipolarLoading
                                    size="large"
                                    className="check"
                                />

                        }
                        {
                            posts.length > 0 && !loading && page > 1?
                                <Pagination
                                    count={count}
                                    page={page}
                                    pageLink={'/dashboard'}
                                    per_page_post={per_page_post}
                                /> : ''
                        }
                    </div>

                </div>



            </div>
        </>
    )
}

export default Dashboard;
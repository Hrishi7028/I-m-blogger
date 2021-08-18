import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { send_Comment, singlePost } from '../redux/AsyncMethods/fetchAllPost';
import '../style/DetailPost.css'
import moment from 'moment'
import { htmlToText } from 'html-to-text';
import { SemipolarLoading } from 'react-loadingg';
import Comments from './Comments';
import copy from 'copy-to-clipboard';

const DetailPost = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const history = useHistory()

    const { user } = useSelector((state) => (state.AuthReducer))

    const { single_post, loading, comments } = useSelector((state => state.getAllPostReducer))
    const [comment, setComment] = useState('');
    console.log(comments);
    const postComment = (e) => {
        e.preventDefault();
        const commentData = {
            postId: single_post._id,
            comment,
            userName: user.name
        }

        dispatch(send_Comment({ commentData }))
        setComment('')
    }
    const copyText = (e) => {
        e.preventDefault();
        
    }
    useEffect(() => {
        dispatch({ type: 'ON_LOADING' })
        dispatch(singlePost(id))
    }, [id, dispatch])

    return (
        <>
            <div className="custome_container">
                <div className="row m-auto">
                    {
                        loading ? <SemipolarLoading
                            size="large"
                            className="check"
                        /> :

                            <div className="col-sm-12 col-md-12 col-12 col-lg-8 m-auto">
                                <div className="card">
                                    <div className="card-header avtar_header">
                                        <div className="avatar_section">
                                            <span className="avatar_icon">{single_post.user ? single_post.user[0] : ''}</span>
                                        </div>
                                        <div className="name_section">
                                            <div className="avtar_name">
                                                {single_post.user ? single_post.user : ''}
                                            </div>
                                            <span className="published_at">published at:{moment(single_post.updatedAt).format('l')}</span>
                                        </div>

                                    </div>
                                    <div className="detail_img">
                                        <img src={`/images/${ single_post.image }`} className="img-fluid img-thumbnail" alt="..."></img>
                                    </div>
                                    <div className="slug_div">
                                        <div className="m-3 mb-2">
                                            <label htmlFor="slug">Copy this slug to share:</label>
                                            <div className="slug_input">
                                                <input type="text" id="slug" className="form-control" disabled="on" value={`/details/${single_post._id}`} />
                                                <div className="copy_clip_board"><i className="far fa-copy" onClick={copyText}></i></div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="card-body" style={{ padding: '1.25rem' }}>
                                        <h5 className="card-title">{single_post.title}</h5>
                                        <p className="card-text">{htmlToText(single_post.post_body)}</p>
                                    </div>

                                </div>
                                <div className="comment_box ">
                                    <div className="comment m-3">
                                        <h3>Add comment...</h3>
                                        <form onSubmit={postComment}>
                                            <div className="mb-3">
                                                <label for="Add_comment" className="form-label">Comment:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="Add_comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </div>
                                            <div className="submit">
                                                {
                                                    user.name ? <input type="submit" className="btn btn-primary" value="Comment" /> : <button type="submit" onClick={() => history.push('/login')} className="btn btn-primary" value="Submit" >Login To comment</button>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {
                                    comments.length > 0 ?
                                        <Comments
                                            comment={comments}
                                        /> : ''
                                }

                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default DetailPost;
















import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'
import { singlePost } from '../redux/AsyncMethods/fetchAllPost';
import '../style/DetailPost.css'
import moment from 'moment'
import { htmlToText } from 'html-to-text';
import { SemipolarLoading } from 'react-loadingg';
// import { htmlToText } from 'html-to-text'


const DetailPost = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    console.log(id);
    const { single_post, loading } = useSelector((state => state.getAllPostReducer))
    // const {loading} = useSelector((state => state.))
    console.log(single_post);

    console.log(id);
    useEffect(() => {
        dispatch({ type: 'ON_LOADING' })
        dispatch(singlePost(id))
    }, [id])
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
                                            <span className="avatar_icon">{single_post.user ? single_post.user[0]:''}</span>
                                        </div>
                                        <div className="name_section">
                                            <div className="avtar_name">
                                                {single_post.user?single_post.user:''}
                                            </div>
                                            <span className="published_at">published at:{moment(single_post.updatedAt).format('l')}</span>
                                        </div>

                                    </div>
                                    <div className="detail_img">
                                        <img src={`/images/${ single_post.image }`} className="img-fluid img-thumbnail" alt="..."></img>
                                    </div>
                                    <div className="slug_div">
                                        <div class="m-3 mb-2">
                                            <label htmlFor="slug">Copy this slug to share:</label>
                                            <input type="text" id="slug" class="form-control" disabled="on" value={single_post.slug} />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{single_post.title}</h5>
                                        <p className="card-text">{htmlToText(single_post.post_body)}</p>
                                    </div>
                                </div>



                            </div>
                    }
                </div>

            </div>




        </>
    )
}

export default DetailPost;






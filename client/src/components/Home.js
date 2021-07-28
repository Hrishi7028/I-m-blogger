import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { allUposts } from '../redux/AsyncMethods/fetchAllPost'
import '../style/Home.css'

import { SemipolarLoading } from 'react-loadingg';

const Home = () => {
    let { page } = useParams()
    const { loading } = useSelector((state) => (state.postReducer))
    const { posts } = useSelector((state) => (state.getAllPostReducer))
    const dispatch = useDispatch()
    if (page === undefined) {
        page = 1
    }
    useEffect(() => {
        dispatch(allUposts(page));
    }, [page])

    return (
        <>
            <div className="custome_container">
                {
                    !loading ? posts.length > 0 ? <div className="container">
                        {posts.map((post) => {
                            return <div className="card mb-1">
                                <div className="row">
                                    <div className="col-8 blog_details">

                                        <div class="card-header avtar_header">

                                            <div className="avatar_section">
                                                <span className="avatar_icon">{post.user[0]}</span>
                                            </div>
                                            <div className="name_section">
                                                <div className="avtar_name">
                                                    {post.user}
                                                </div>
                                                <span className="published_at">Published at : 10:50:15</span>
                                            </div>

                                        </div>
                                        <div class="card-body">

                                            <h5 class="card-title"><Link className="title_link" to="#">{post.title}</Link></h5>
                                            <p class="card-text">{post.post_body.slice(0, 150)}</p>

                                        </div>

                                    </div>
                                    <div className="col-4">
                                        <div className="image_section">
                                            <img src={`/images/${ post.image }`} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div> : 'not post yet' : <SemipolarLoading
                                    size="large"
                                    className="check"
                                />
                }
            </div>
        </>
    )

}

export default Home;
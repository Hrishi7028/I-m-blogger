import '../style/CreatePost.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { useSelector, useDispatch } from 'react-redux';
import { postBlog } from '../redux/AsyncMethods/postBlog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

const CreateBlog = (props) => {

    const [value, setValue] = useState('');
    const [image, setImageName] = useState('Click here to upload picture...');
    const [imgPreview, setImgPreview] = useState('');
    const [slug, setSlug] = useState('https://yourpost.com')

    const dispatch = useDispatch();
    const { user: { _id, name } } = useSelector((state) => (state.AuthReducer));
    const { postErrors, redirect } = useSelector((state) => (state.postReducer));
    
    
    
    const handelImageName = e => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            let file = e.target.files[0].name;
            let reader = new FileReader();
            reader.onloadend = (e) => {
                setImgPreview(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
            setImageName(file)
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            })
        }
    }
    const [state, setState] = useState({
        title: '',
        image: '',
        description: ''
    });
    const handelDescription = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handelTitle = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        const post_title = state.title.trim().split(' ').join('-');
        setSlug(post_title)
    }
    const submitPostdata = (e) => {
        e.preventDefault();
        console.log(state);
        console.log(slug);
        console.log(value);
        const formData = new FormData();
        formData.append('title', state.title);
        formData.append('image', state.image);
        formData.append('description', state.description);
        formData.append('post_body', value);
        formData.append('slug', slug + "/" + uuid());
        formData.append('user', name);
        formData.append('_id', _id);
        dispatch(postBlog(formData));
    }

    useEffect(() => {
        if (postErrors.length > 0) {
            postErrors.map((error) => {
                return (
                    toast.error(error.msg, {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }))
            })
        }
        if (redirect) {
            props.history.push('/dashboard/1');
        }
    }, [postErrors, redirect,props.history])


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
            <div className="createPost">
                <div className="custome_container ">
                    <form onSubmit={submitPostdata}>
                        <h2 className="mb-3 postHeading">Create Your Post Here...</h2>
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-12 col-lg-6">
                                <div className="card">
                                    <div className="my-3 px-2">
                                        <label htmlFor="title">Enter title</label>
                                        <input
                                            type="type"
                                            className="form-control"
                                            id="title"
                                            placeholder="Enter post title here"
                                            value={state.title}
                                            name="title"
                                            onChange={handelTitle}
                                        />
                                    </div>
                                    <div className="mt-3 px-2">
                                        <label className="upload_picture" htmlFor="image">{image}</label>
                                        <input
                                            type="file"
                                            className="form-control hideInput"
                                            id="image"
                                            name="image"
                                            onChange={handelImageName}
                                        />
                                    </div>
                                    <div className="pb-3 px-2">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                placeholder="Enter meta data here..."
                                                id=""
                                                onChange={handelDescription}
                                                name="description"
                                                defaultValue={state.description}
                                                style={{ height: "200px" }}></textarea>

                                        </div>
                                    </div>
                                    <div className="mt-1 mb-3 px-2">
                                        <label className="post_body" htmlFor="post_body">Your post details are here...</label>
                                        <ReactQuill theme="snow"  value={value} onChange={setValue} />
                                    </div>

                                </div>
                            </div>

                            <div className="col-sm-12 col-md-12 col-12 col-lg-6">
                                <div className="card">
                                    <div className="my-3 px-2">
                                        <label htmlFor="slug">You can share this post with this link</label>
                                        <input type="type"
                                            className="form-control"
                                            disabled
                                            id="slug"
                                            value={slug}
                                        />
                                    </div>
                                    <div className="my-3 px-2">
                                        <div className="imagePreview">
                                            {
                                                imgPreview ? <img height="auto" alt="img" width="100%" src={imgPreview} /> : ''
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-1 mb-3 px-2">
                                        <button className="btn btn-outline-primary w-100 p-2">Create Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateBlog;



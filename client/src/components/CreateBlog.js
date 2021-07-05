import '../style/CreatePost.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { uuid } from 'uuidv4';


const CreateBlog = () => {

    const [value, setValue] = useState('');
    const [imageName, setImageName] = useState('Click here to upload picture...');
    const [imgPreview, setImgPreview] = useState('');
    const [slug, setSlug] = useState('https://yourpost.com')


    const handelImageName = e => {

        e.preventDefault();
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
    const [state, setState] = useState({
        title: '',
        image: '',
    });

    const handelTitle = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        const post_title = state.title.trim().split(' ').join('-');
        setSlug(post_title)
    }
    return (
        <>
            <div className="createPost">
                <div className="custome_container ">
                    <form>
                        <h2 className="mb-3 postHeading">Create Your Post Here...</h2>
                        <div className="row">
                            <div className="col-6">
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
                                        <label className="upload_picture" htmlFor="imageName">{imageName}</label>
                                        <input
                                            type="file"
                                            className="form-control hideInput"
                                            id="imageName"
                                            name="imageName"
                                            onChange={handelImageName}
                                        />
                                    </div>
                                    <div className="mt-1 mb-3 px-2">
                                        <label className="post_body" htmlFor="post_body">Your post details are here...</label>
                                        <ReactQuill theme="snow" value={value} onChange={setValue} />
                                    </div>
                                    <div className="mt-1 mb-3 px-2">
                                        <button className="btn btn-outline-primary w-100 p-2">Create Post</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="card">
                                    <div className="my-3 px-2">
                                        <label htmlFor="slug">You can share this post with this link</label>
                                        <input type="type"
                                            className="form-control"
                                            disabled
                                            id="slug"
                                            value={slug + "/" + uuid()}
                                        />
                                    </div>
                                    <div className="my-3 px-2">
                                        <div className="imagePreview">
                                            {
                                                imgPreview ? <img height="auto" width="100%" src={imgPreview} /> : ''
                                            }
                                        </div>
                                    </div>
                                    <div className="pb-3 px-2">
                                        <div class="form-floating">
                                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "200px" }}></textarea>

                                        </div>
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



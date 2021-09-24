import Sidebar from "./Sidebar"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { postNameMethod } from "../redux/AsyncMethods/postNameMethod";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useHistory } from "react-router-dom";
import '../style/EditName.css'


const Editname = (props) => {
    const { push } = useHistory()
    const { user: { name, _id } } = useSelector((state) => (state.AuthReducer))
    // console.log(name,_id);
    const { redirect } = useSelector((state) => (state.postReducer));
    const { profileError } = useSelector((state) => (state.ProfileReducer))
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('');
    // console.log(profileError);
    const postName = (e) => {
        e.preventDefault();
        dispatch(postNameMethod({ name: userName, id: _id }));
    }



    useEffect(() => {

        if (redirect) {
            push('/dashboard')
        }

        if (profileError.length > 0) {
            profileError.map((error) => {
                return (
                    toast.error(error.msg, {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                )
            })
        }
    }, [profileError, redirect, push])

    return (

        <div className="editname_custome_container mt-5">
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
            <div className="row">
                <div className="col-lg-3 mb-5 col-sm-12 col-md-12">
                    <Sidebar />
                </div>

                <div className="col-lg-6 col-sm-12 col-md-12">
                    <form onSubmit={postName}>
                        <div class="form-group">
                            <label htmlFor="curr_name">Current Name: </label>
                            <input
                                type="text"
                                disabled="true"
                                class="form-control font-weight-bold text-italic"
                                id="curr_name"
                                value={name}
                                placeholder="curr name"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <label for="new_name">Enter Your New Name: </label>
                            <input
                                type="text"
                                class="form-control"
                                id="new_name"
                                value={userName}
                                placeholder="Enter New Name"
                                autoComplete="off"
                                onChange={(e) => { setUserName(e.target.value) }}
                            />
                        </div>
                        <button type="submit" class="btn btn-primary w-100 mt-3">Confirm</button>
                    </form>
                </div>

            </div>

        </div>

    )
}

export default Editname
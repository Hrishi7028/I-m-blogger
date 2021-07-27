import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { postPasswordMethod } from "../redux/AsyncMethods/postNameMethod"
import Sidebar from "./Sidebar"



const Changepassword = () => {
    const {profileError} = useSelector((state) => (state.ProfileReducer))
    const {user:{_id}} = useSelector((state) => (state.AuthReducer))
    const {redirect} = useSelector((state) => (state.postReducer))
    const dispatch = useDispatch()
    // console.log(_id);
    const {push} = useHistory()
    const [state, setState] = useState({
        curr_pass: '',
        new_pass: '',
        id: null
    })

    const setPassword = (e) => {
        e.preventDefault()
        // console.log(state);
        dispatch(postPasswordMethod({curr_pass:state.curr_pass,new_pass:state.new_pass,_id}))
    }
    console.log(profileError);
    useEffect(() => {
        if(redirect) {
            push('/dashboard')
        }
        if(profileError.length > 0) {
            profileError.map((Perror) => {
                return (
                    toast.error(Perror.msg, {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    })
                )
            })
        }
    }, [profileError,redirect])

    return (
        <div className="custome_container mt-5">
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
                    <form onSubmit={setPassword} autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="curr_name">Current Name: </label>
                            <input
                                type="password"
                                className="form-control"
                                id="curr_pass"
                                onChange={(e) => setState({ ...state, curr_pass: e.target.value })}
                                value={state.curr_pass}
                                placeholder="current password"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="new_pass">Enter Your New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="new_pass"
                                value={state.new_pass}
                                placeholder="Enter New Password"
                                // autoComplete="off"
                                onChange={(e) => setState({ ...state, new_pass: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Save</button>
                    </form>
                </div>

            </div>

        </div>

    )
}

export default Changepassword
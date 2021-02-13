import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import DashbordHeader from '../Components/DashbordHeader'

function MyProfile(props) {

    const { register, handleSubmit } = useForm();
    const { updateSuccess, updateSuccessMsg, userInfo, loading, error } = props.signIn;
    const dispatch = useDispatch();

    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [mobile, setMobile] = useState(userInfo.mobile)
    const [password, setPassword] = useState(userInfo.password)
    const [cpassword, setCpassword] = useState(userInfo.password)

    console.log(userInfo);
    console.log(error)

    const onSubmit = () => {
        const token = userInfo.token;
        if (password !== cpassword) {
            alert("Confirm password not matched.")
        } else {
            if (userInfo) {
                props.updateUser({ userId: userInfo._id, name, email, mobile, password }, token);
            }
        }

    }
    return (
        <div>
            <DashbordHeader />
            <div className="container my-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="h1 mb-4 fw-normal">Update Profile</h1>
                    {updateSuccess &&
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            {updateSuccessMsg}
                            <button type="button" className="btn-close" onClick={() => dispatch({ type: "@REMOVE_ALERT" })} data-bs-dismiss="alert" aria-label="Close" />
                        </div>
                    }
                    <label htmlFor="name" className="fw-bolder mb-1">Name</label>
                    <input type="name"
                        id="name"
                        name="name"
                        className="form-control mb-3"
                        placeholder="Name"
                        ref={register}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoFocus
                    />

                    <label htmlFor="inputEmail" className="fw-bolder mb-1">Email address</label>
                    <input type="email"
                        id="inputEmail"
                        className="form-control mb-3"
                        name="email"
                        placeholder="Email address"
                        ref={register}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required

                    />

                    <label htmlFor="inputEmail" className="fw-bolder mb-1">Mobile</label>
                    <input type="number"
                        id="mobile"
                        className="form-control mb-3"
                        name="mobile"
                        placeholder="Mobile Number"
                        ref={register}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required

                    />

                    <label htmlFor="inputPassword" className="fw-bolder mb-1">Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control mb-3"
                        placeholder="Password"
                        name="password"
                        ref={register}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required

                    />
                    <label htmlFor="inputPassword" className="fw-bolder mb-1">Confirm Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control mb-5"
                        placeholder="Confirm Password"
                        name="confirmpPassword"
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        required

                    />

                    <button className="w-100 btn btn-lg btn-primary" type="submit">{loading ? "Loading" : "Update"}</button>
                    <button onClick={() => props.history.go(-1)} className="w-100 btn btn-lg btn-outline-dark mt-2" type="button">Back</button>
                </form>
            </div>
        </div>
    )
}



const mapStateToProps = state => ({
    signIn: state.signIn,


})

const mapDispatchToProps = (dispatch) => ({
    updateUser: (userData, token) => dispatch({ type: "@GET_USERUPDATE_REQUEST", userData, token })
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)

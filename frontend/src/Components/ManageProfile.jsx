import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser, logout, updatePassword, updateUsername } from '../Actions/user'
import './ManageProfile.css'

export const ManageProfile = () => {
    const { user } = useSelector(state => state.getUser)
    const { message, error } = useSelector(state => state.updateUsername)
    const { message: message2, error: error2 } = useSelector(state => state.updatePassword)
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usernameHandler = (e) => {
        e.preventDefault();
        dispatch(updateUsername({ username }))
    }
    const updatePasswordHandler=(e)=>{
        e.preventDefault();
        dispatch(updatePassword({oldPassword,newPassword}))
    }
    useEffect(() => {
        if (message) {
            alert(message);
            dispatch({ type: 'clearMessage' })
            dispatch(getUser());
            navigate('/profile');
        }
        if (error) {
            alert(error);
            dispatch({ type: 'clearErrors' })
        }
        if (message2) {
            alert(message2);
            dispatch(logout())
            dispatch({ type: 'clearMessage' })
        }
        if (error2) {
            alert(error2);
            dispatch({ type: 'clearErrors' })
        }
    },[message,error,message2,error2,dispatch,navigate,user])
    return <>
        <div className="profilePage">
            <div className="greeting">
                <h1>Hi, {user.username}</h1>
            </div>
            <div className="update">
            <div className="updateUsername">
                <h1>Update your username</h1>
                <form className='updateForm' onSubmit={usernameHandler}>
                    <input placeholder='My new username is...' required type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className='btn' type="submit" value="Update" />
                </form>
            </div>
            <div className="seprator"/>
            <div className="updatePassword">
                <h1>Update your password</h1>
                <form className='updateForm' onSubmit={updatePasswordHandler} >
                    <input required placeholder='Old password...' type="password" name="oldPassword" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                    <input required placeholder='My new password is...' type="password" name="oldPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                    <input className='btn' type="submit" value="Update" />
                </form>
            </div>
            </div>
        </div>
    </>
}

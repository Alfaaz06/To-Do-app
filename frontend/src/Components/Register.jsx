import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../Actions/user';

const Register = () => {
    const {message,error}=useSelector(state=>state.user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if (error) {
            alert(error);
            dispatch({type:'clearErrors'});
        }
        if(message){
            alert(message);
            dispatch({type:'clearMessage'});
            navigate('/login');
        }
    },[message,dispatch,navigate,error]);

    const loginForm = (e) => {
        e.preventDefault();
        dispatch(register({username, password,confirmPassword}));
    }

  return <>
  <div className="loginPage">
    <div className="loginImage"><h1>TO-DO</h1></div>
    <div className="loginForm">
        <form onSubmit={loginForm}>
            <div className="loginHead"><h1>REGISTER</h1></div>
            <div className="inputData">
                <input required autoComplete='off' type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Your username is..." />
                <input required autoComplete='off' type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Your password is..."  />
                <input required autoComplete='off' type="password" name="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Again your password is..."  />
                <input className='button' type="submit" value="Submit" />
                <h3>Already Registered!<Link to='/login'>Login</Link></h3>
            </div>
        </form>
    </div>
  </div>
  </>
}

export default Register
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { getUser, login } from '../Actions/user'
import './Login.css'

export const Login = () => {

    const {message,error}=useSelector(state=>state.user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            dispatch(getUser());
            navigate('/');
        }
    },[message,navigate,dispatch,error]);

    const loginForm = (e) => {
        e.preventDefault();
        dispatch(login({username, password}));
    }

  return <>
  <div className="loginPage">
    <div className="loginImage"><h1>TO-DO</h1></div>
    <div className="loginForm">
        <form onSubmit={loginForm}>
            <div className="loginHead"><h1>LOGIN</h1></div>
            <div className="inputData">
                <input required autoComplete='off' type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Your username is..." />
                <input  required autoComplete='off' type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Your password is..."  />
                <input className='button' type="submit" value="Submit" />
                <h3>Haven't Registered yet! <Link to='/register'>Register Me</Link></h3>
            </div>
        </form>
    </div>
  </div>
  </>
}

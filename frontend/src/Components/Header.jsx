import React from 'react'
import Headroom from 'headroom.js'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getUser, logout } from '../Actions/user'

const Header = () => {

  const { message, error } = useSelector(state => state.logout);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    var header = document.querySelector("header");
    var headroom = new Headroom(header,{tolerance:10});
    headroom.init();
  }, [])

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(getUser());
      dispatch({ type: 'clearMessage' });
      navigate('/login')
    }
    if (error) {
      alert(error);
      dispatch({ type: 'clearErrors' });
    }
  },[message,error,dispatch,navigate])


  const logoutHandler = () => {
    dispatch(logout());
  }


  return <>
    <header>
      <div className="navbar">
        <Link to='/'>Dashboard</Link>
        <Link to='/profile'>Manage Profile</Link>
        <Link to='#' onClick={logoutHandler} >LogOut</Link>
      </div>
    </header>
  </>
}

export default Header
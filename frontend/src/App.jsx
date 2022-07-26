import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Dashboard } from './Components/Dashboard'
import './App.css'
import { Login } from './Components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './Actions/user'
import { useEffect } from 'react'
import Register from './Components/Register'
import Header from './Components/Header'
import { ManageProfile } from './Components/ManageProfile'
export const App = () => {
  const dispatch = useDispatch();
  const {isAuthenticated}=useSelector(state=>state.getUser);
  useEffect(()=>{
    dispatch(getUser());
  },[dispatch])
  return <>
    <BrowserRouter>
    {isAuthenticated&&<Header/>}
    <Routes>
      <Route path="/" element={ isAuthenticated? <Dashboard />:<Login/>} />
      <Route path="/login" element={isAuthenticated?<Dashboard />:<Login />} />
      <Route path="/register" element={ isAuthenticated?<Dashboard/>:<Register/>} />
      <Route path='/profile' element={isAuthenticated?<ManageProfile/>:<Login/>} />
    </Routes>
    </BrowserRouter>
  </>
}

import React from 'react'
// import { useEffect } from 'react'
import {  useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import {  logout } from '../Actions/user'
import { CreateToDo } from './CreateToDo'
import './Dashboard.css'
import { ToDos } from './ToDos'


export const Dashboard = () => {
  const { user } = useSelector(state => state.getUser);

  if (!user) {
    return <div>Loading...</div>
  }
  return <>
    <div className="dashboard">
      <div className="todoList">
        <CreateToDo />
        <h2 className='listHeader' >To-Do List</h2>
        <ToDos />
      </div>
    </div>

  </>
}

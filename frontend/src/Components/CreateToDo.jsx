import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, getUser } from '../Actions/user';

export const CreateToDo = () => {
    const {message,error}=useSelector(state=>state.user);
    const [heading, setHeading] = useState();
    const [desc, setDesc] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
        if(message){
            alert(message);
            dispatch(getUser());
            dispatch({type:'clearMessage'});
        }
        if(error){
            alert(error);
            dispatch({type:'clearErrors'});
        }
    },[dispatch,message,error]);

    const todoFormHandler=()=>{
        dispatch(createTodo({heading,desc}));
    }

    return <>
        <div className="addTodo">
            <form className='todoFrom'>
                <div className="headingBox">
                    <textarea placeholder='To-Do heading...' name="heading" value={heading} cols="50" minrows="2" onChange={(e) => setHeading(e.target.value)} />
                    <h2 className='add' onClick={todoFormHandler} >CREATE</h2>
                </div>
                <div className="descBox">
                    <textarea placeholder="What's the To-Do" name="desc" value={desc} cols="80" rows="5" onChange={(e) => setDesc(e.target.value)} />
                </div>
            </form>
        </div>
    </>
}

import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, removeTodo } from '../Actions/user';

export const ToDos = () => {
    const { user } = useSelector(state => state.getUser);
    const dateFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dispatch = useDispatch();
    const { messge, error } = useSelector(state => state.remove);
    useEffect(() => {
        if (messge) {
            alert(messge);
            dispatch(getUser());
            dispatch({ type: 'clearMessage' });
        }
        if (error) {
            alert(error);
            dispatch({ type: 'clearErrors' });
        }
    }, [dispatch, messge, error]);

    return <>
        <div className="myTodo">
            {
                user.todos.length > 0 ? <>
                    {
                        user.todos.map((todo, index) => (
                            <div className="items" key={index} aria-multiline="true" >
                                <div className="data">
                                    <div className="todoHeading">
                                        <h2>{todo.heading}</h2>
                                    </div>
                                    <div className="desc">
                                        <p>{todo.desc}</p>
                                    </div>
                                    <div className="timeStamp">
                                        <p>{new Date(todo.time).toLocaleDateString('en-GB', dateFormatOptions)}</p>
                                    </div>
                                </div>
                                <div className="function">
                                    <button className="add" onClick={() => {
                                        dispatch(removeTodo({ id: todo._id }));
                                    }} >Delete</button>
                                </div>

                            </div>
                        ))
                    }
                </> : <h1>No To-Do yet!</h1>
            }
        </div>
    </>
}

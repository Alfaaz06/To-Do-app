import axios from 'axios';

export const register = ({ username, password, confirmPassword }) => async(dispatch) => {
    try {
        dispatch({ type: 'registerRequest' });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/register`, { username, password, confirmPassword }, config);
        dispatch({ type: 'registerSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'registerFailure', payload: error.response.data.message });
    }
}

export const login = ({ username, password }) => async(dispatch) => {
    try {
        dispatch({ type: 'loginRequest' });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/login`, { username, password }, config);
        dispatch({ type: 'loginSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'loginFailure', payload: error.response.data.message });
    }
}

export const getUser = () => async(dispatch) => {
    try {
        dispatch({ type: 'getUserRequest' });
        const { data } = await axios.get(`/api/v1/me`);
        dispatch({ type: 'getUserSuccess', payload: data.user });
    } catch (error) {
        dispatch({ type: 'getUserFailure', payload: error.response.data.message });
    }
}

export const logout = () => async(dispatch) => {
    try {
        dispatch({ type: 'logoutRequest' });
        const { data } = await axios.get(`/api/v1/logout`);
        dispatch({ type: 'logoutSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'logoutFailure', payload: error.response.data.message });
    }
}

export const createTodo = ({ heading, desc }) => async(dispatch) => {
    try {
        dispatch({ type: 'createTodoRequest' });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/addTodo`, { heading, desc }, config);
        dispatch({ type: 'createTodoSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'createTodoFailure', payload: error.response.data.message });
    }
}

export const removeTodo = ({ id }) => async(dispatch) => {
    try {
        dispatch({ type: 'createTodoRequest' });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/removeTodo`, { id }, config);
        dispatch({ type: 'createTodoSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'createTodoFailure', payload: error.response.data.message });
    }
}

export const updateUsername = ({ username }) => async(dispatch) => {
    try {
        dispatch({ type: 'updateUsernameRequest' });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/changeUsername`, { username }, config);
        dispatch({ type: 'updateUsernameSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'updateUsernameFailure', payload: error.response.data.message });
    }
}

export const updatePassword = ({ oldPassword, newPassword }) => async(dispatch) => {
    try {
        dispatch({ type: 'updatePasswordRequest' });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/changePassword`, { oldPassword, newPassword }, config);
        dispatch({ type: 'updatePasswordSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'updatePasswordFailure', payload: error.response.data.message });
    }
}
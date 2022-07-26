import { createReducer } from '@reduxjs/toolkit';

const initialState = {}

export const userReducer = createReducer(initialState, {
    registerRequest: (state, action) => {
        state.isLoading = true
    },
    loginRequest: (state, action) => {
        state.isLoading = true
        state.isAuthenticated = false;
    },
    createTodoRequest: (state, action) => {
        state.isLoading = true
    },
    registerSuccess: (state, action) => {
        state.isLoading = false
        state.message = action.payload;
    },
    loginSuccess: (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true;
        state.message = action.payload;
    },
    createTodoSuccess: (state, action) => {
        state.isLoading = false
        state.message = action.payload;
    },
    registerFailure: (state, action) => {
        state.isLoading = false
        state.error = action.payload;
    },
    loginFailure: (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    createTodoFailure: (state, action) => {
        state.isLoading = false
        state.error = action.payload;
    },
    clearErrors: (state) => { state.error = null },
    clearMessage: (state) => { state.message = null }
});

export const getUserReducer = createReducer(initialState, {
    getUserRequest: (state, action) => {
        state.isLoading = true
        state.isAuthenticated = false;
    },
    getUserSuccess: (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    getUserFailure: (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    clearErrors: (state) => { state.error = null },
    clearMessage: (state) => { state.message = null }
});

export const removeReducer = createReducer(initialState, {
    removeTodoRequest: (state, action) => {
        state.isLoading = true
    },
    removeTodoSuccess: (state, action) => {
        state.isLoading = false
        state.message = action.payload;
    },
    removeTodoFailure: (state, action) => {
        state.isLoading = false
        state.error = action.payload;
    },
    clearErrors: (state) => { state.error = null },
    clearMessage: (state) => { state.message = null }
})

export const logoutReducer = createReducer(initialState, {
    logoutRequest: (state, action) => {
        state.isLoading = true
        state.isAuthenticated = true;
    },
    logoutSuccess: (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload;
    },
    logoutFailure: (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true;
        state.error = action.payload;
    },
    clearErrors: (state) => { state.error = null },
    clearMessage: (state) => { state.message = null }
});

export const updateUsernameReducer = createReducer(initialState, {
    updateUsernameRequest: (state, action) => {
        state.isLoading = true
    },
    updateUsernameSuccess: (state, action) => {
        state.isLoading = false
        state.message = action.payload;
    },
    updateUsernameFailure: (state, action) => {
        state.isLoading = false
        state.error = action.payload;
    },
    clearErrors: (state) => { state.error = null },
    clearMessage: (state) => { state.message = null }
});

export const updatePasswordReducer = createReducer(initialState, {
    updatePasswordRequest: (state, action) => {
        state.isLoading = true
    },
    updatePasswordSuccess: (state, action) => {
        state.isLoading = false
        state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
        state.isLoading = false
        state.error = action.payload;
    },
    clearErrors: (state) => { state.error = null },
    clearMessage: (state) => { state.message = null }
});
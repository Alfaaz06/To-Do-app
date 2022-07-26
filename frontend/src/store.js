import { configureStore } from '@reduxjs/toolkit'
import { getUserReducer, userReducer, logoutReducer, removeReducer, updateUsernameReducer, updatePasswordReducer } from './Reducers/userReducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
        getUser: getUserReducer,
        logout: logoutReducer,
        remove: removeReducer,
        updateUsername: updateUsernameReducer,
        updatePassword: updatePasswordReducer
    }
});
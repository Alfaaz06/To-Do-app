import express from 'express';
import { addTodo, getUser, login, logout, register, removeTodo, updatePassword, updateUsername, } from '../controllers/user.js';
import { isAuthenticated } from '../middleware/auth.js';

const Router = express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
Router.route('/me').get(isAuthenticated, getUser);
Router.route('/addTodo').put(isAuthenticated, addTodo);
Router.route('/removeTodo').put(isAuthenticated, removeTodo);
Router.route('/changeUsername').put(isAuthenticated, updateUsername);
Router.route('/changePassword').put(isAuthenticated, updatePassword);
Router.route('/logout').get(isAuthenticated, logout);

export default Router;
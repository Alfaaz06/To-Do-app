import cookieParser from 'cookie-parser';
import express from 'express';
export const app = express();
import User from './routes/user.js';
import path from 'path';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/v1', User);

app.use(express.static(path.resolve("./frontend/build")));
app.get('/*', function(req, res) {
    res.sendFile(path.resolve("./frontend/build/index.html"));
});
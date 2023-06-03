import express from "express";

import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import { logger } from './utils/logger.js';
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './controllers/UserController.js';

const PORT = 5050;
const uri = 'mongodb+srv://admin:159357753951Gf@cluster0.3kibbus.mongodb.net/getFit?retryWrites=true&w=majority';
const app = express();

mongoose
    .connect(uri)
    .then(() => logger(`--- DB has been connected`, 'success'))
    .catch((err) => logger(`--- DB hasn\'t been connected. Error: ${err}`, 'error'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('It works!');
});

app.post('/auth/register', registerValidation, UserController.register );
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(PORT, (err) => {
    if(err) {
        return logger('--- App doesn\'t work', 'error');
    }

    // console.error('\x1b[32m','App has been started', '\x1b[32m');
    logger('--- App has been started', 'success')
});

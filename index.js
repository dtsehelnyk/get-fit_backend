import express from "express";

import mongoose from "mongoose";
import { registerValidation, loginvalidation } from "./validations/auth.js";
import { commonExTemplateValidation, workoutValidation } from "./validations/commonExercise.js";
import { logger } from './utils/logger.js';
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './controllers/UserController.js';
import * as CommonExController from "./controllers/CommonExController.js";
import * as WorkoutController from "./controllers/WorkoutController.js";

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
app.post('/auth/login', loginvalidation, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);
// app.patch('/users/:userId', checkAuth, UserController.update);

app.get('/exercises', CommonExController.getAll);
app.get('/exercises/:id', CommonExController.getOne);
// TODO: add roles or security check
app.post('/exercises', commonExTemplateValidation, CommonExController.create);

app.get('/:userId/workouts', checkAuth, WorkoutController.getAll);
app.post('/:userId/workouts', checkAuth, workoutValidation, WorkoutController.create);
app.get('/workouts/:workoutId', WorkoutController.getOne);
app.patch('/workouts/:setId', WorkoutController.update);

app.listen(PORT, (err) => {
    if(err) {
        return logger('--- App doesn\'t work', 'error');
    }

    // console.error('\x1b[32m','App has been started', '\x1b[32m');
    logger('--- App has been started', 'success')
});

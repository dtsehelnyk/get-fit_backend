import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import { workoutValidation } from "./validations/commonExercise.js";
import { commonExTemplateValidation } from "./validations/commonExercise.js"
import {
    registerValidation,
    loginValidation,
    updateValidation
} from "./validations/user.js";

import {
    logger,
    checkAuth,
    handleValidationErrors
} from './utils/index.js';

import {
    AuthController,
    UserController,
    CommonExController,
    WorkoutController
} from './controllers/index.js';

const PORT = 5050;
const uri = 'mongodb+srv://admin:159357753951Gf@cluster0.3kibbus.mongodb.net/getFit?retryWrites=true&w=majority';
const app = express();

mongoose
    .connect(uri)
    .then(() => logger(`--- DB has been connected`, 'success'))
    .catch((err) => logger(`--- DB hasn\'t been connected. Error: ${err}`, 'error'));

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('It works!');
});

app.post('/auth/register', registerValidation, handleValidationErrors, AuthController.register );
app.post('/auth/login', loginValidation, handleValidationErrors, AuthController.login);
// app.post('/auth/logout', checkAuth, AuthController.logout);

app.get('/users/me', checkAuth, UserController.getMe);
app.delete('/users/me', checkAuth, UserController.remove);
// TODO: add validation
app.patch('/users/me', checkAuth, updateValidation, handleValidationErrors, UserController.update);
// app.patch('/users/:userId', checkAuth, UserController.update);

app.get('/commonExercises', CommonExController.getAll);
app.get('/commonExercises/:id', CommonExController.getOne);
// TODO: add roles or security check
app.post('/commonExercises', commonExTemplateValidation, CommonExController.create);
// app.delete('/commonExercises/:exId', commonExTemplateValidation, CommonExController.remove);
// app.patch('/commonExercises/:exId', commonExTemplateValidation, CommonExController.update);

app.get('/workouts', checkAuth, WorkoutController.getAll);
app.post('/workouts', checkAuth, workoutValidation, handleValidationErrors, WorkoutController.create);
app.get('/workouts/:workoutId', checkAuth, WorkoutController.getOne);
app.delete('/workouts', checkAuth, WorkoutController.remove);
app.delete('/workouts/:workoutId', checkAuth, WorkoutController.removeWorkout);
// TODO: add validation
app.patch('/workouts/:setId', checkAuth, WorkoutController.update);

app.listen(PORT, (err) => {
    if(err) {
        return logger('--- App doesn\'t work', 'error');
    }

    // console.error('\x1b[32m','App has been started', '\x1b[32m');
    logger('--- App has been started', 'success')
});

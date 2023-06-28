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
    SetController,
    WorkoutController,
    ExController
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

app.get('/commonExercises', checkAuth, CommonExController.getAll);
app.get('/commonExercises/:id', checkAuth, CommonExController.getOne);
// TODO: add roles or security check
app.post('/commonExercises', checkAuth, commonExTemplateValidation, CommonExController.create);
// app.delete('/commonExercises/:exId', commonExTemplateValidation, CommonExController.remove);
// app.patch('/commonExercises/:exId', commonExTemplateValidation, CommonExController.update);

// WORKOUTS
app.get('/workouts', checkAuth, WorkoutController.getAll);
app.get('/workouts/:workoutId', checkAuth, WorkoutController.getOne);
app.post('/workouts', checkAuth, workoutValidation, handleValidationErrors, WorkoutController.createWorkout);
app.patch('/workouts/:workoutId', checkAuth, WorkoutController.updateWorkout);
app.delete('/workouts/:workoutId', checkAuth, WorkoutController.removeWorkout);
// TODO: add validation

//EXERCISES
app.post('/workouts/:workoutId/exercises', checkAuth, ExController.createEx);
app.patch('/workouts/exercises/:exId', checkAuth, ExController.updateEx);
app.delete('/workouts/exercises/:exId', checkAuth, ExController.removeEx);

// SETS
app.patch('/workouts/exercises/:exId/sets', checkAuth, SetController.createExSet);
app.patch('/workouts/sets/:setId', checkAuth, SetController.updateExSet);
app.delete('/workouts/sets/:setId', checkAuth, SetController.removeExSet);

// app.patch('/workouts/updateExResult/:setId', checkAuth, WorkoutController.updateExResult);

app.listen(PORT, (err) => {
    if(err) {
        return logger('--- App doesn\'t work', 'error');
    }

    logger('--- App has been started', 'success')
});

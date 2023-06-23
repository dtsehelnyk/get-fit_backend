import { validationResult } from "express-validator";
import { logger } from "../utils/index.js";
import { WorkoutService } from '../services/index.js'

export const getAll = async (req, res) => {
    try {
        const doc = await WorkoutService.getAll(req.userId);

        logger('A list of workouts has been provided', 'note');
        res.status(200).json(doc);
    } catch (err) {
        logger('Could not get a list of workouts', 'alert');
        res.status(500).json({
            message: `Could not get a list of workouts. Error: ${err}`,
        });
    }
} 

export const getOne = async (req, res) => {
    try {
        const doc = await WorkoutService.getOne(req.params.workoutId);

        logger('A workout has been provided', 'note');
        res.status(200).json(doc?.days[0]);
        
    } catch (err) {
        logger('Could not get a workout', 'alert');
        res.status(500).json({
            message: `Could not get a workout. Error: ${err}`,
        });
    }
} 

export const createWorkout = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger(errors, 'alert');

        return res.status(500).json({
            message: `Workout has not been added. Error: ${JSON.stringify(errors)}`,
        });
    }

    try {
        await WorkoutService.createWorkout(req.userId, req.body);

        logger(req.body, 'note');        
        res.status(200).json({
            message: 'Workout has been added',
        });
    } catch (err) {
        logger(err, 'alert');
        res.status(500).json({
            message: `Workout has not been added. Error: ${err}`,
        });
    }
}

export const updateWorkout = async (req, res) => {
    try {
        await WorkoutService.updateWorkout(req.userId, req.params.workoutId, req.body.date);

        const seccessMessage = 'Workout date has been updated'; 

        logger(seccessMessage, 'note');
        res.status(200).json({
            message: seccessMessage,
        });
    } catch (err) {
        logger(err, 'alert');
        res.status(500).json({
            message: `Workout date has not been updated. Error: ${err}`,
        });
    }
}

export const removeWorkout = async (req, res) => {
    try {
        await WorkoutService.removeWorkout(req.userId, req.params.workoutId);

        const seccessMessage = 'Workout has been deleted'; 

        logger(seccessMessage, 'note');
        res.status(200).json({
            message: seccessMessage,
        });
    } catch (err) {
        logger(err, 'alert');
        res.status(500).json({
            message: `Workout has not been deleted. Error: ${err}`,
        });
    }
}

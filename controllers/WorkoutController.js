import { validationResult } from "express-validator";
import { logger, checkUpdateRequestResult } from "../utils/index.js";
import { WorkoutService } from '../services/index.js'

export const getAll = async ({ userId }, res) => {
    try {
        const doc = await WorkoutService.getAll(userId);

        logger('A list of workouts has been provided', 'note');
        res.status(200).json(doc);
    } catch (err) {
        const errorMessage = 'Could not get a list of workouts';

        logger(errorMessage, 'alert');
        res.status(500).json({
            message: `${errorMessage}. Error: ${err}`,
        });
    }
} 

export const getOne = async ({ userId, params }, res) => {
    try {
        const doc = await WorkoutService.getOne(userId, params.workoutId);

        logger('A workout has been provided', 'note');
        res.status(200).json(doc);
        
    } catch (err) {
        const errorMessage = 'Could not get a workout';
        logger(errorMessage, 'alert');
        res.status(500).json({
            message: `${errorMessage}. Error: ${err}`,
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
        const response = await WorkoutService.createWorkout(req.userId, req.body);
        const { isModified, message } = checkUpdateRequestResult(response, 'workouts');

        if (!isModified) {
            return res.status(404).json({ message });
        }

        logger(message, 'note');        
        res.status(200).json({ message });
    } catch (err) {
        logger(err, 'alert');
        res.status(500).json({
            message: `Workout has not been added. Error: ${err}`,
        });
    }
}

export const updateWorkout = async (req, res) => {
    try {
        const response = await WorkoutService.updateWorkout(req.userId, req.params.workoutId, req.body.date);
        const { isModified, message } = checkUpdateRequestResult(response, 'workouts');

        if (!isModified) {
            return res.status(404).json({ message })
        }

        logger(message, 'note');
        res.status(200).json({ message });
    } catch (err) {
        logger(err, 'alert');
        res.status(500).json({
            message: `Workout date has not been updated. Error: ${err}`,
        });
    }
}

export const removeWorkout = async (req, res) => {
    try {
        const response = await WorkoutService.removeWorkout(req.userId, req.params.workoutId);
        const { isModified, message } = checkUpdateRequestResult(response, 'workouts');

        if (!isModified) {
            return res.status(404).json({ message })
        }

        logger(message, 'note');
        res.status(200).json({ message });
    } catch (err) {
        logger(err, 'alert');
        res.status(500).json({
            message: `Workout has not been deleted. Error: ${err}`,
        });
    }
}

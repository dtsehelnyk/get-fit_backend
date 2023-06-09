import { validationResult } from "express-validator";
import { logger } from "../utils/index.js";
import WorkoutModel from "../models/Workout.js";

export const getAll = async (req, res) => {
    try {
        const doc = await WorkoutModel.findOne({userId: req.userId});

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

        const doc = await WorkoutModel.findOne(
            { days: { $elemMatch: { _id: req.params.workoutId } } },
            { "days.exercises": 1 }
        );

        logger('A workout has been provided', 'note');
        res.status(200).json(doc.days[0]);
        
    } catch (err) {
        logger('Could not get a workout', 'alert');
        res.status(500).json({
            message: `Could not get a workout. Error: ${err}`,
        });
    }
} 

export const create = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger(errors, 'alert');

        return res.status(500).json({
            message: `Workout has not been added. Error: ${JSON.stringify(errors)}`,
        });
    }

    try {
        await WorkoutModel.updateOne(
            {
                userId: req.userId,
            },
            {
                $push: {
                    days: req.body,
                }
            }
        );

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

export const update = async (req, res) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     logger(errors.errors[0].nestedErrors, 'alert');

    //     return res.status(500).json({
    //         message: `Workout has not been added. Error: ${JSON.stringify(errors)}`,
    //     });
    // }

    try {
        await WorkoutModel.updateOne(
            {
                "days.exercises.sets._id": "648017c11ba364dbe2508707",
            },
            {
                '$set': {
                    'days.$[el1].exercises.$[el2].sets.$.result': 10
                }
            },
            {
                arrayFilters: [
                    { 'el1.exercises': { '$exists': true } },
                    { 'el2.sets._id': '648017c11ba364dbe2508707' },
                    // { 'el_3.duration': { '$exists': true } },
                ]
            }
        );

        logger('done', 'note');
        
        res.status(200).json({
            message: 'Workout has been changed',
        });
    } catch (err) {
        logger(err, 'alert');
        res.status(500).json({
            message: `Workout has not been added. Error: ${err}`,
        });
    }
}

// TODO: fix search
export const remove = async (req, res) => {
    try {
        await WorkoutModel.findByIdAndRemove(req.params.setId);

        logger('Workout has been deleted', 'note');
        res.status(200).json({
            message: 'Workout has been deleted',
        });
    } catch (err) {
        logger(err, 'alert');
        res.status(500).json({
            message: `Workout has not been deleted. Error: ${err}`,
        });
    }
}

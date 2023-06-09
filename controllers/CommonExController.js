import { validationResult } from "express-validator";
import { logger } from "../utils/index.js";
import CommonExerciseModel from "../models/CommonExercise.js";

export const create = async (req, res) => {
    try {
        const doc = new CommonExerciseModel({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            previewImg: req.body.previewImg,
        });

        const commonExTemplate = await doc.save();

        logger('Template has been craeted', 'note');
        res.status(200).json({
            message: 'Template has been craeted',
            body: commonExTemplate._doc,
        });
    } catch (err) {
        logger('Can\'t create a common exercise', 'alert');
        res.status(500).json({
            message: `You can\'t create a common exercise. Error: ${err}`,
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const exercises = await CommonExerciseModel.find();

        logger('A list of exercises has been provided', 'note');
        res.status(200).json(exercises);
    } catch (err) {
        logger('Could not get a list of common exercises', 'alert');
        res.status(500).json({
            message: `Could not get a list of common exercises. Error: ${err}`,
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const exercise = await CommonExerciseModel.findById(req.params.id);

        logger('The exercise has been provided', 'note');
        res.status(200).json(exercise);
    } catch (err) {
        logger('Could not get the exercise', 'alert');
        res.status(500).json({
            message: `Could not get the exercise. Error: ${err}`,
        });
    }
}

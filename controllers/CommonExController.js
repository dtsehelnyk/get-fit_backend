import { validationResult } from "express-validator";
import { logger } from "../utils/index.js";
import { CommonExService } from "../services/index.js";

export const create = async (req, res) => {
    try {
        const newEx = await CommonExService.create(req.body);
 
        logger('Template has been craeted', 'note');
        res.status(200).json({
            message: 'Template has been craeted',
            body: newEx._doc,
        });
    } catch (err) {
        logger('Can\'t create a common exercise', 'alert');
        res.status(500).json({
            message: `You can\'t create a common exercise. Error: ${err}`,
        });
    }
}

export const getAll = async (_, res) => {
    try {
        const exercises = await CommonExService.getAll();

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
        const ex = await CommonExService.getOne(req.params.id);

        logger('The exercise has been provided', 'note');
        res.status(200).json(ex);
    } catch (err) {
        logger('Could not get the exercise', 'alert');
        res.status(500).json({
            message: `Could not get the exercise. Error: ${err}`,
        });
    }
}

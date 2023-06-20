import UserModel from '../models/User.js';
import WorkoutModel from "../models/Workout.js";

import { logger } from "../utils/index.js";

export const remove = async (req, res) => {
    
    try {
        await UserModel.findByIdAndDelete(req.userId);
        await WorkoutModel.findOne({ userId: req.userId });

        logger(`The user ${req.userId} was successfuly removed`, 'note');
        res.status(403).json({
            message: 'The user was successfuly removed',
        });
    } catch (err) {
        logger('Couldn\'t remove', 'alert');
        res.status(403).json({
            message: 'You can\'n remove this user',
        });
    }
}

export const update = async (req, res) => {
    try {
        await UserModel.updateOne(
            {_id: req.userId},
            {
                username: req.body.username,
                email: req.body.email,
                canTrain: req.body.canTrain,
                language: req.body.language,
                measure: req.body.measure,
                themeId: req.body.themeId,
                avatarImg: req.body.avatarImg,
                weight: req.body.weight,
            }
        );  

        logger(`The user was successfully updated`, 'success');

        return res.status(200).json({
            message: 'The user was successfully updated',
        });
    } catch (err) {
        logger(`You don\'t have an access to this user. Error: ${err}`, 'alert');

        res.status(403).json({
            message: 'You don\'t have an access to this user',
            err,
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user) {
            logger('Could not find a user', 'alert');

            return res.status(404).json({
                message: 'Could not find a user', 
            });
        }

        logger(`A user was successfully found`, 'success');

        const { passwordHash, ...userData } = user._doc;

        return res.json(userData);
    } catch (err) {
        logger(`Unauthorized. Error: ${err}`, 'alert');

        res.status(401).json({
            message: 'Unauthorized',
        });
    }
}

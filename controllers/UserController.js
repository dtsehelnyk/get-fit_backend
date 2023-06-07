import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from '../models/User.js';
import WorkoutModel from "../models/Workout.js";

import { logger } from "../utils/logger.js";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger(
                `Could not create a user.
                Error: ${JSON.stringify(errors)}`,
                'alert'
            );

            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const userDoc = new UserModel({
            username: req.body.username, 
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            measure: req.body.measure,
            passwordHash: hash,
            // workouts: [],
        });

        const user = await userDoc.save();

        const workoutDoc = new WorkoutModel({
            userId: user._id,
            days: [],
        });

        await workoutDoc.save();

        const token = jwt.sign(
            {_id: user._id},
            'secretKey',
            {expiresIn: '14d'}
        );
        
        logger(`New user was successfully created`, 'success');

        const { passwordHash, ...userData } = user._doc;

        return res.json({
            ...userData,
            token,
        });
    } catch (err) {
        logger(`Could not create a user. Error: ${err}`, 'alert');
        
        return res.status(500).json(err);
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            logger(`Wrong email`, 'alert');

            return res.status(404).json({
                message: 'Wrong email',
            });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPassword) {
            logger(`Invalid password`, 'alert');

            return res.status(400).json({
                message: 'Wrong email or password',
            });
        }

        const token = jwt.sign(
            {_id: user._id},
            'secretKey',
            {expiresIn: '14d'}
        );

        logger(`A user successfully logged in`, 'success');

        const { passwordHash, ...userData } = user._doc;

        return res.json({
            ...userData,
            token,
        });

    } catch (err) {
        logger(`Could not create a user. Error: ${err}`, 'alert');
        
        return res.status(500).json(err);
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
        logger(`You don\'t have an access to this user. Error: ${err}`, 'alert');

        res.status(403).json({
            message: 'You don\'t have an access to this user',
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
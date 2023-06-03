import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registerValidation } from "./validations/auth.js";
import UserModel from './models/User.js';
import { logger } from './utils/logger.js';

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

app.post('/auth/register', registerValidation, async (req, res) => {
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

        const doc = new UserModel({
            username: req.body.username, 
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            measure: req.body.measure,
            passwordHash: hash,
        });

        const user = await doc.save();
        const token = jwt.sign(
            {_id: user._id},
            'secretKey',
            {expiresIn: '14d'}
        );
        
        logger(`A user was successfully created`, 'success');

        const { passwordHash, ...userData } = user._doc;

        return res.json({
            ...userData,
            token,
        });
    } catch (err) {
        logger(`Could not create a user. Error: ${err}`, 'alert');
        
        return res.status(500).json(err);
    }
});

app.post('/auth/login', async (req, res) => {
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
});

app.listen(PORT, (err) => {
    if(err) {
        return logger('--- App doesn\'t work', 'error');
    }

    // console.error('\x1b[32m','App has been started', '\x1b[32m');
    logger('--- App has been started', 'success')
});

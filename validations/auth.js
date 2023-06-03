import { body } from 'express-validator';

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 16 }),
    body('username').isLength({ min: 3, max: 24 }),
    body('avatarUrl').optional().isURL(),
];

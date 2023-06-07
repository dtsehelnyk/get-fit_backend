import { body } from 'express-validator';

export const loginvalidation = [
    body('email', 'Wrong email format'),
];

export const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', '"Password" lenght must be between 6 and 16').isLength({ min: 6, max: 16 }).isString(),
    body('username', '"username" length must be between 3 and 24').isLength({ min: 3, max: 24 }).isString(),
    body('avatarUrl', 'Wrong url for image').optional().isURL(),
];

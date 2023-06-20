import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', '"Password" lenght must be between 6 and 16').isLength({ min: 6, max: 16 }).isString(),
];

export const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('username', '"username" length must be between 3 and 24').isLength({ min: 3, max: 24 }).isString(),
    body('password', '"Password" lenght must be between 6 and 16').isLength({ min: 6, max: 16 }).isString(),
    body('avatarUrl', 'Wrong url for image').optional().isURL(),
];

export const updateValidation = [
    ...registerValidation,
    body('canTrain', '"canTrain" should be an Array of Strings').isArray().optional(),
    body('language', 'Incorrect format of "language"').notEmpty().isString().optional(),
    body('measure', 'Incorrect format of "measure"').notEmpty().isString().optional(),
    body('themeId', 'Incorrect format of "themeId"').notEmpty().isMongoId().optional(),
    body('weight', 'Incorrect format of "weight"').notEmpty().isInt({gt: 0, lt:500}).optional(),
]

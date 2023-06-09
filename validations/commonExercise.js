import { body, oneOf } from "express-validator";

export const commonExTemplateValidation = [
    body('name', '"Name" is too short').isLength({ min: 3, max: 48 }).isString(),
    body('previewUrl', 'Wrong image link').optional().isURL(),
    oneOf([
        body('type').equals('duration'),
        body('type').equals('reps')
    ], {
        message: 'One valid "type" must be declared',
    }),
];

export const workoutValidation = [
    // body('userId', '"userId" is needed').not().isEmpty(),
    // body('days.date', '"date" is needed').isString(),
    // body('days.exercises', 'Array must have at least 1 item').isArray({ min: 1  }),
    // body('days.exercises.*.name', 'Length of exercise name must me between 3 and 48').isLength({ min: 3, max: 48}).not().isEmpty(),
    // body('days.exercises.*.sets', '').isArray(),
    // body('days.exercises.*.sets.*.reps', '').isInt().optional(),
    // body('days.exercises.*.sets.*.duration', '').isInt().optional(),

    // TODO: fix selectable option
    // oneOf([
    //     body('exercises.*.sets.*.reps').exists().withMessage('reps').isInt({ min: 1 }),
    //     body('exercises.*.sets.*.duration').exists().withMessage('duration'),
    // ], {
    //     message: 'Each exercise must have "Duration" or "Reps" filled out'
    // }),
]

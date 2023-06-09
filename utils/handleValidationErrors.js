import { validationResult } from 'express-validator';
import { logger } from './index.js'

export default (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger(JSON.stringify(errors), 'alert');

        return res.status(400).json(errors.array());
    }

    next();
};

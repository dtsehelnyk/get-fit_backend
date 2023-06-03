import jwt from 'jsonwebtoken';
import { logger } from './logger.js';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secretKey');
            req.userId = decoded._id;

            logger('Correct token', 'success');
            next();
        } catch (err) {
            logger(err, 'alert');

            return res.status(403).json({
                message: err,
            });
        }
    } else {
        logger(err, 'alert');

        res.status(403).json({
            message: 'You don\'t have an access',
        });
    }

    // res.send(token);
    // next();
}

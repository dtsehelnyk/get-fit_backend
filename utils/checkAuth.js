import jwt from 'jsonwebtoken';
import { logger } from './index.js';

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
        logger('Unauthorized', 'alert');

        res.status(401).json({
            message: 'Unauthorized',
        });
    }
}

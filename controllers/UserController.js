import { UserService } from '../services/index.js';
import { checkUpdateRequestResult, logger } from "../utils/index.js";

export const remove = async ({ userId }, res) => {
  try {
    await UserService.remove(userId);

    logger(`The user ${userId} was successfuly removed`, 'note');
    return res.status(200).json({
      message: 'The user was successfuly removed',
    });
  } catch (err) {
    logger(`Couldn\'t remove. Error: ${err}`, 'alert');
    res.status(403).json({
      message: 'You can not remove this user',
    });
  }
}

export const update = async ({ userId, body }, res) => {
  try {
    const response = await UserService.update(userId, body);
    const { isModified, message } = checkUpdateRequestResult(response, 'User');

    if (!isModified) {
      logger(message, 'success');
      return res.status(404).json({ message });
    }

    logger(message, 'success');
    return res.status(200).json({ message });
  } catch (err) {
    logger(`You don\'t have an access to this user. Error: ${err}`, 'alert');

    res.status(403).json({
      message: 'You don\'t have an access to this user',
      err,
    });
  }
}

export const getMe = async ({ userId }, res) => {
  try {
    const result = await UserService.getMe(userId);

    if(!result) {
      const message = 'Could not find a user';
      logger(message, 'alert');
      return res.status(404).json({ message });
    }

    logger(`The user was successfully found`, 'success');

    const { passwordHash, ...userData } = result._doc;
    return res.status(200).json(userData);
  } catch (err) {
    logger(`Unauthorized. Error: ${err}`, 'alert');

    res.status(401).json({
      message: 'Unauthorized',
    });
  }
}

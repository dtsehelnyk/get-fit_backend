import { ExService } from '../services/index.js';
import { logger, checkUpdateRequestResult } from "../utils/index.js";

export const createEx = async (req, res) => {

  try {
    const response = await ExService.createEx(req.userId, req.params.workoutId, req.body);
    const { isModified, message } = checkUpdateRequestResult(response, 'Workout');

    if (!isModified) {
      return res.status(404).json({ message });
    }
  
    res.status(200).json({ message });
  } catch (err) {
    logger(err, 'alert');
    res.status(500).json({
      message: `Exercise has not been added. Error: ${err}`,
    });
  }
}

export const updateEx = async ({ userId, params, body }, res) => {

  try {
    const response = await ExService.updateEx(userId, params.exId, body.name);
    const { isModified, message } = checkUpdateRequestResult(response, 'Exercise');

    if (!isModified) {
      return res.status(404).json({ message });
    }
    
    res.status(200).json({ message });
  } catch (err) {
    logger(err, 'alert');
    res.status(500).json({
      message: `Exercise has not been updated. Error: ${err}`,
    });
  }
}

// TODO: create
export const removeEx = async ({ userId, params }, res) => {

  try {
    await ExService.removeEx(userId, params.exId);

    const successMessage = 'Exercise has been removed';

    logger(successMessage, 'note');
    res.status(200).json({
      message: successMessage,
    });
  } catch (err) {
    logger(err, 'alert');
    res.status(500).json({
      message: `Exercise has not been removed. Error: ${err}`,
    });
  }
}

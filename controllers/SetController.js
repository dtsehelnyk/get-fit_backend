import { SetService } from '../services/index.js';
import { checkUpdateRequestResult, logger } from '../utils/index.js';

export const createExSet = async ({ userId, params, body }, res) => {
  try {
    const response = await SetService.createExSet(userId, params.exId, body);
    const { isModified, message } = checkUpdateRequestResult(response, 'Exercise');
       
    if (!isModified) {
      return res.status(404).json({ message });
    }

    res.status(200).json({ message });
  } catch (err) {
    logger(err, 'alert');
    res.status(500).json({
      message: `Set has not been created. Error: ${err}`,
    });
  }
}

export const updateExSet = async ({ userId, params, body }, res) => {
  try {
    const response = await SetService.updateExSet(userId, params.setId, body.data);
    const { isModified, message } = checkUpdateRequestResult(response, 'Set');

    if (!isModified) {
      return res.status(404).json({ message });
    }

    res.status(200).json({ message });
  } catch (err) {
    logger(err, 'alert');
    res.status(500).json({
      message: `Set has not been changed. Error: ${err}`,
    });
  }
}

export const removeExSet = async ({ userId, params }, res) => {
  try {
    const response = await SetService.removeExSet(userId, params.setId);
    const { isModified, message } = checkUpdateRequestResult(response)
      
    if (!isModified) {
      return res.status(404).json({ message });
    }

    res.status(200).json({ message });
  } catch (err) {
    logger(err, 'alert');
    res.status(500).json({
      message: `Set has not been deleted. Error: ${err}`,
    });
  }
}

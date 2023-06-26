import { SetService } from '../services/index.js';
import { checkUpdateRequestResult, logger } from '../utils/index.js';

export const createExSet = async (req, res) => {
  try {
    const response = await SetService.createExSet(req.userId, req.params.exId, req.body);
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

export const updateExSet = async (req, res) => {
  try {
    const response = await SetService.updateExSet(req.userId, req.params.setId, req.body.data);
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

// TODO: fix search
export const removeExSet = async (req, res) => {
  try {
    const response = await SetService.removeExSet(req.userId, req.params.setId);
    const { isModified, message } = checkUpdateRequestResult(response)
      
    if (!isModified) {
      res.status(404).json({ message });
    }

    logger(successMessage, 'note');
    res.status(200).json({ message });
  } catch (err) {
    logger(err, 'alert');
    res.status(500).json({
      message: `Set has not been deleted. Error: ${err}`,
    });
  }
}

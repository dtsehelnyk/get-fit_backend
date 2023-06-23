// import {}

// SETS

export const createExSet = async (req, res) => {
  try {
      await SetService.createExSet(req.userId, req.params.exId, req.body);

      const seccessMessage = 'Set has been created';
       
      logger(seccessMessage, 'note');
      res.status(200).json({
          message: seccessMessage,
      });
  } catch (err) {
      logger(err, 'alert');
      res.status(500).json({
          message: `Set has not been created. Error: ${err}`,
      });
  }
}

export const updateExSet = async (req, res) => {
  try {
      await SetService.updateExSet(req.userId, req.params.setId, req.body.data);

      const seccessMessage = 'Set has been changed';

      logger(seccessMessage, 'note');
      res.status(200).json({
          message: seccessMessage,
      });
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
      await SetService.removeExSet(req.userId, req.params.setId);

      const seccessMessage = 'Set has been removed';
      
      logger(seccessMessage, 'note');
      res.status(200).json({
          message: seccessMessage,
      });
  } catch (err) {
      logger(err, 'alert');
      res.status(500).json({
          message: `Set has not been deleted. Error: ${err}`,
      });
  }
}

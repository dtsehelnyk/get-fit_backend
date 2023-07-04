import { AuthService } from '../services/index.js';
import { logger } from "../utils/index.js";

export const register = async ({ body }, res) => {
  try {
    const { token, ...userInfo } = await AuthService.register(body);      
    logger(`New user was successfully created`, 'success');

    return res.json({
      ...userInfo,
      token,
    });
  } catch (err) {
    logger(`Could not create a user. Error: ${err}`, 'alert');
      
    return res.status(500).json(err);
  }
}

export const login = async ({ body }, res) => {
  try {
    const {
      code,
      clientMessage,
      serviceMessage,
      token,
      ...userData
    } = await AuthService.login(body.email, body.password);

    if (code !== 200) {
      logger(serviceMessage, 'alert');

      return res.status(code).json({
        message: clientMessage,
      });
    }
    
    logger(serviceMessage, 'success');

    return res.status(code).json({
      ...userData,
      token,
    });

  } catch (err) {
    logger(`Could not create a user. Error: ${err}`, 'alert');
      
    return res.status(500).json(err);
  }
}

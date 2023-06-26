import { logger } from './index.js';

export default (requestResult, entity = 'entity') => {
  if (requestResult.modifiedCount > 0) {
    const message = `${entity} was updated`;

    logger(message, 'note');
    
    return {
      isModified: true,
      message,
    };
  }

  const message = `Could not find the ${entity}`;
  
  logger(message, 'alert');
    
  return {
    isModified: false,
    message,
  };
}

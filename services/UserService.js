import UserModel from '../models/User.js';
import WorkoutModel from '../models/Workout.js';

export const remove = async (userId) => {
  if (!userId) {
    throw new Error('userId hasn\'t been provided');
  }

  await UserModel.findByIdAndDelete(userId);
  await WorkoutModel.findOneAndDelete({ userId: userId });
}

export const update = async (userId, body) => {
  if (!userId || !body) {
    throw new Error('userId or payload hasn\'t been provided');
  }

  // TODO: add username and email coincidence

  return await UserModel.updateOne(
    {_id: userId},
    {
      username: body.username,
      email: body.email,
      canTrain: body.canTrain,
      language: body.language,
      measure: body.measure,
      themeId: body.themeId,
      avatarImg: body.avatarImg,
      weight: body.weight,
    }
  );  
}

export const getMe = async (userId) => {
  if (!userId) {
    throw new Error('userId hasn\'t been provided');
  }

  return await UserModel.findById(userId);
}
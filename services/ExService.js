import WorkoutModel from '../models/Workout.js';

export const createEx = async (userId, workoutId, ex) => {
  if (!userId || !workoutId || !ex?.name) {
    throw new Error('userId, workoutId or Exercise payload hasn\'t been provided');
  }

  return await WorkoutModel.updateOne(
    { userId: userId },
    { $push: {
        'days.$[el1].exercises': ex,
    }},
    { arrayFilters: [
      { 'el1._id': workoutId },
    ]}
  );
}

export const updateEx = async (userId, exId, name) => {
  if (!userId || !exId || !name) {
    throw new Error('userId, workoutId or Exercise payload hasn\'t been provided');
  }

  return await WorkoutModel.updateOne(
    {
      userId: userId,
      'days.exercises._id': exId,
    },
    { $set: {
      'days.$.exercises.$[el1].name': name,
    }},
    { arrayFilters: [
      { 'el1._id': exId },
    ]}
  );
}

export const removeEx = async (userId, exId) => {
  if (!userId || !exId) {
    throw new Error('userId, workoutId or exerciseId payload hasn\'t been provided');
  }

  return await WorkoutModel.updateOne(
    {
      userId: userId,
      'days.exercises._id': exId,
    },
    { $pull: {
      'days.$.exercises': { _id: exId },
    }}
  );
}

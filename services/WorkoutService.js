import WorkoutModel from '../models/Workout.js';

export const getAll = async (userId) => {
  if (!userId) {
    throw new Error('UserID hasn\'t been provided');
  }

  return await WorkoutModel.findOne({userId});
}

export const getOne = async (workoutId) => {
  if (!workoutId) {
    throw new Error('WorkoutID hasn\'t been provided');
  }

  return await WorkoutModel.findOne(
    { days: { $elemMatch: { _id: workoutId } } },
    { 'days.exercises': 1 }
  );
}

export const createWorkout = async (userId, payload) => {
  if (!userId || !payload.date) {
    throw new Error('userID or Workout payload hasn\'t been provided');
  }

  return await WorkoutModel.updateOne(
    { userId },
    { $push: {
        days: payload,
    }}
  );
}

export const updateWorkout = async (userId, workoutId, date) => {
  if (!userId || !workoutId || !date) {
    throw new Error('userID or Workout payload hasn\'t been provided');
  }

  return await WorkoutModel.findOneAndUpdate(
    {
      userId,
      'days._id': workoutId, 
    },
    { $set: {
        'days.$.date': date,
    }}
  )
}

export const removeWorkout = async (userId, workoutId) => {
  if (!userId || !workoutId) {
    throw new Error('workoutId or userId hasn\'t been provided');
  }

  return await WorkoutModel.findOneAndRemove({userId: userId}, {workoutId: workoutId});
}

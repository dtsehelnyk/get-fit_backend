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
    { "days.exercises": 1 }
);
}

export const create = async (userId, payload) => {
  if (!userId || !payload) {
    throw new Error('UserID or Workout payload hasn\'t been provided');
  }

  return await WorkoutModel.updateOne(
    {
        userId,
    },
    {
        $push: {
            days: payload,
        }
    }
  );
}

// export const update = async () => {}

export const remove = async (id) => {
  if (!id) {
    throw new Error('WorkoutID hasn\'t been provided');
  }

  return await WorkoutModel.findByIdAndRemove(workoutId);
}

export const removeWorkout = async (userId, workoutId) => {
  if (!userId || !workoutId) {
    throw new Error('WorkoutID hasn\'t been provided');
  }

  return await WorkoutModel.findOneAndRemove({userId: userId}, {workoutId: workoutId});
}
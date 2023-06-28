import { ObjectId } from 'mongodb';
import WorkoutModel from '../models/Workout.js';

export const getAll = async (userId) => {
  if (!userId) {
    throw new Error('userID hasn\'t been provided');
  }

  return await WorkoutModel.findOne({userId});
}

export const getOne = async (userId, workoutId) => {
  if (!userId || !workoutId) {
    throw new Error('workoutID hasn\'t been provided');
  }

  return await WorkoutModel.aggregate([
    {
      $match: {
        userId: new ObjectId(userId)
      }
    },
    {
      $unwind: "$days"
    },
    {
      $match: {
        "days._id": new ObjectId(workoutId)
      }
    },
    {
      $replaceRoot: {
        newRoot: "$days"
      }
    }
  ]);
}

export const createWorkout = async (userId, payload) => {
  if (!userId || !payload.date) {
    throw new Error('userID or Workout payload hasn\'t been provided');
  }

  return await WorkoutModel.updateOne(
    { userId: userId },
    { $push: {
        days: payload,
    }}
  );
}

export const updateWorkout = async (userId, workoutId, date) => {
  if (!userId || !workoutId || !date) {
    throw new Error('userID, workoutId or workout payload hasn\'t been provided');
  }

  return await WorkoutModel.updateOne(
    {
      userId: userId,
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

import WorkoutModel from '../models/Workout.js';

// SETS

export const createExSet = async (userId, exId, payload) => {
  if (!userId || !exId || !payload) {
    throw new Error('Set data hasn\'t been provided');
  }

  await WorkoutModel.findOneAndUpdate(
    {
      userId,
      'days.exercises._id': exId,
    },
    { $push: {
      'days.$[el1].exercises.$.sets': payload,
    }},
    { arrayFilters: [
      { 'el1.exercises._id': exId },
    ]}
  );
}

export const updateExSet = async (userId, setId, newResult) => {
  if (!userId || !setId || !newResult) {
    throw new Error('Exercise data hasn\'t been provided for updating');
  }

  const path = 'days.$[el1].exercises.$[el2].sets.$.';

  // TODO: add wrong userID check
  await WorkoutModel.findOneAndUpdate(
    {
      userId,
      'days.exercises.sets._id': setId,
    },
    { $set: {
      [path + 'result']: newResult?.result,
      [path + 'load']: newResult?.load,
      [path + 'additional']: newResult?.additional,
    }},
    { arrayFilters: [
      { 'el1.exercises': { '$exists': true } },
      { 'el2.sets._id': setId },
    ]}
  );
}

// TODO: FIX
export const removeExSet = async (userId, setId) => {
  if (!userId || !setId) {
    throw new Error('Set hasn\'t been provided for removing');
  }

  await WorkoutModel.findOneAndUpdate(
    { userId },
    { $pull: { 'days.$[el1].exercises.$[el2].sets': setId, } },
    { arrayFilters: [
      { 'el1.exercises': { '$exists': true } },
      { 'el2.sets._id': setId },
    ]}
  );
}

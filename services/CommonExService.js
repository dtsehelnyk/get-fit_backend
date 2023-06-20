import CommonExerciseModel from "../models/CommonExercise.js";

export const create = async ({ name, description, tags, type, previewImg }) => {
  const doc = new CommonExerciseModel({
    name,
    description,
    tags,
    type,
    previewImg,
  });

  return await doc.save();
}

export const getAll = async () => {
  return await CommonExerciseModel.find();
}

export const getOne = async (id) => {
  if (!id) {
    throw new Error('Common exercise ID hasn\'t found');
  }

  return await CommonExerciseModel.findById(id);
}
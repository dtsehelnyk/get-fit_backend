import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from '../models/User.js';
import WorkoutModel from '../models/Workout.js';

export const register = async (userData) => {
  if (!userData.email || !userData.password || !userData.username) {
    throw new Error('userData hasn\'t been provided');
  }

  const password = userData.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userDoc = new UserModel({
    username: userData.username, 
    email: userData.email,
    avatarUrl: userData.avatarUrl,
    measure: userData.measure,
    passwordHash: hash,
    canTrain: userData.canTrain,
    language: userData.language,
    themeId: userData.themeId,
    avatarImg: userData.avatarImg,
    weight: userData.weight,
  });

  const user = await userDoc.save();

  const workoutDoc = new WorkoutModel({
      userId: user._id,
      username: userData.username, 
      days: [],
  });

  await workoutDoc.save();

  const token = jwt.sign(
      {_id: user._id},
      'secretKey',
      {expiresIn: '14d'}
  );
  
  const { passwordHash, ...userInfo } = user._doc;

  return { ...userInfo, token };
}

export const login = async (email, password) => {
  if (!email || !password) {
    return {
      code: 500,
      clientMessage: 'Could not create a user',
      serviceMessage: 'Could not create a user',
    };
  }

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return {
      code: 400,
      clientMessage: 'Wrong email',
      serviceMessage: 'Wrong email',
    };
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return {
      code: 404,
      clientMessage: 'Wrong email or password',
      serviceMessage: 'Invalid password',
    }
  }

  const token = jwt.sign(
    {_id: user._id},
    'secretKey',
    {expiresIn: '14d'}
  );

  const { passwordHash, ...userData } = user._doc;

  return {
    token,
    ...userData,
    code: 200,
    clientMessage: 'A user successfully logged in',
    serviceMessage: 'A user successfully logged in',
  };
}

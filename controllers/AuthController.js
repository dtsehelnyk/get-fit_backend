import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from '../models/User.js';
import WorkoutModel from '../models/Workout.js';

import { logger } from "../utils/index.js";

export const register = async (req, res) => {
  try {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const userDoc = new UserModel({
          username: req.body.username, 
          email: req.body.email,
          avatarUrl: req.body.avatarUrl,
          measure: req.body.measure,
          passwordHash: hash,
          canTrain: req.body.canTrain,
          language: req.body.language,
          themeId: req.body.themeId,
          avatarImg: req.body.avatarImg,
          weight: req.body.weight,
      });

      const user = await userDoc.save();

      const workoutDoc = new WorkoutModel({
          userId: user._id,
          username: req.body.username, 
          days: [],
      });

      await workoutDoc.save();

      const token = jwt.sign(
          {_id: user._id},
          'secretKey',
          {expiresIn: '14d'}
      );
      
      logger(`New user was successfully created`, 'success');

      const { passwordHash, ...userData } = user._doc;

      return res.json({
          ...userData,
          token,
      });
  } catch (err) {
      logger(`Could not create a user. Error: ${err}`, 'alert');
      
      return res.status(500).json(err);
  }
}

export const login = async (req, res) => {
  try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
          logger(`Wrong email`, 'alert');

          return res.status(404).json({
              message: 'Wrong email',
          });
      }

      const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

      if (!isValidPassword) {
          logger(`Invalid password`, 'alert');

          return res.status(400).json({
              message: 'Wrong email or password',
          });
      }

      const token = jwt.sign(
          {_id: user._id},
          'secretKey',
          {expiresIn: '14d'}
      );

      logger(`A user successfully logged in`, 'success');

      const { passwordHash, ...userData } = user._doc;

      return res.json({
          ...userData,
          token,
      });

  } catch (err) {
      logger(`Could not create a user. Error: ${err}`, 'alert');
      
      return res.status(500).json(err);
  }
}

// export const logout = async (req, res) => {
//   try {

//       const token = jwt.sign(
//           {_id: user._id},
//           'secretKey',
//           {expiresIn: '14d'}
//       );
      
//   } catch (err) {
//       logger('You have not been logged out', 'alert');

//       return res.status(403).json(err);
//   }
// }

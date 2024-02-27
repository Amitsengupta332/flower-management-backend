import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './auth.interface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';

const userSchema = new Schema<IUser, UserModel>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      select: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// Validation for duplicate email
userSchema.pre('save', async function (next) {
  const isEmailExist = await User.findOne({
    email: this.email,
  });
  if (isEmailExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This email is already exist');
  }
  next();
});

// We will use it to hash our password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // Hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// reuseable static method for checking user exist by email
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email: email })
    .select('+password')
    .select('+role');
};

// reuseable static method for cheking if the password is matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<IUser, UserModel>('user', userSchema);

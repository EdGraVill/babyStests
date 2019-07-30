import { Schema } from 'mongoose';
import { compare } from 'bcrypt';

/**
 * Find User by a gived CURP
 *
 * @param {User.Model} this
 * @param {string} curp
 * @returns {(Promise<User.Document | null>)}
 */
async function findByCURP(this: User.Model, curp: string): Promise<User.Document | null> {
  return this.findOne({ curp });
}

/**
 * Find User with its credentials
 *
 * @param {User.Model} this
 * @param {string} curp
 * @param {string} password
 * @returns {Promise<User.Document>}
 */
async function login(
  this: User.Model,
  curp: string,
  password: string,
): Promise<User.Document> {
  const findedUser = await this.findByCURP(curp);

  if (!findedUser) {
    throw new Error('User not found');
  }

  const rightPassword = await compare(password, findedUser.password);

  if (!rightPassword) {
    throw new Error('Incorrect password');
  }

  return findedUser;
}

/**
 * Register new user
 *
 * @param {User.Model} this
 * @param {User.RegisterFields} info
 * @returns {Promise<User.Document>}
 */
async function register(this: User.Model, info: User.RegisterFields): Promise<User.Document> {
  const existingUser = await this.findByCURP(info.curp);

  if (!existingUser) {
    throw new Error('CURP already registered');
  }

  const newUser = new this({
    ...info,
  });

  try {
    await newUser.validate();
  } catch (error) {
    throw error;
  }

  const savedUser = await newUser.save();

  return savedUser;
}

/**
 * Add Static functions to the gived Schema
 *
 * @param {Schema} schema
 * @returns {void}
 */
const addStatics = (schema: Schema): void => {
  schema.statics.findByCURP = findByCURP;
  schema.statics.login = login;
  schema.statics.register = register;
};

export default addStatics;

import { Schema } from 'mongoose';
import { compare } from 'bcrypt';

async function findByCURP(this: User.Model, curp: string): Promise<User.Document | null> {
  return this.findOne({ curp });
}

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

const addStatics = (schema: Schema): void => {
  schema.statics.findByCURP = findByCURP;
  schema.statics.login = login;
};

export default addStatics;

import { model } from 'mongoose';
import schema from './schema';
import addStatics from './addStatics';

addStatics(schema);

export default model<User.Document, User.Model>('User', schema);

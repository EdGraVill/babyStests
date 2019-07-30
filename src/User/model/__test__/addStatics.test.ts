import { Schema } from 'mongoose';
import addStatics from '../addStatics';
import User from '../index';

describe('addStatics must works', (): void => {
  const fakeSchema = new Schema();

  it('Must add all the statics', (): void => {
    expect(fakeSchema.statics).not.toHaveProperty('findByCURP');
    expect(fakeSchema.statics).not.toHaveProperty('login');
    expect(fakeSchema.statics).not.toHaveProperty('register');

    addStatics(fakeSchema);

    expect(fakeSchema.statics).toHaveProperty('findByCURP');
    expect(fakeSchema.statics).toHaveProperty('login');
    expect(fakeSchema.statics).toHaveProperty('register');
  });
});

describe('findByCURP must works', (): void => {
  const fakeSchema = new Schema();
  const findOne = jest.fn();
  const fakeThis = { findOne };
  const fakeCurp = 'GAVE950315HVZRLD02';

  it('Must call findOne with { curp } as argument', (): void => {
    addStatics(fakeSchema);
    fakeSchema.statics.findByCURP.bind(fakeThis)(fakeCurp);

    expect(findOne).toHaveBeenCalledWith({ curp: fakeCurp });
  });
});

describe('login must works', (): void => {
  const fakeSchema = new Schema();
  const fakeCurp = 'GAVE950315HVZRLD02';
  const fakePassword = 'sVcfwa5W;<@6+xqp';
  const fakeUser = new User({ curp: fakeCurp, password: fakePassword });
  const findByCURP = jest.fn(async (curp: string): Promise<User.Document | null> => {
    if (curp !== fakeCurp) {
      return null;
    }

    return fakeUser;
  });
  const fakeThis = { findByCURP };

  addStatics(fakeSchema);
  const login: (
    curp: string,
    password: string,
  ) => Promise<User.Document> = fakeSchema.statics.login.bind(fakeThis);

  it('Must call findByCURP with the gived CURP', async (): Promise<void> => {
    try {
      await login(fakeCurp, fakePassword);

      expect(findByCURP).toHaveBeenCalledWith(fakeCurp);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('Must throw an error if CURP doesn\'t match', async (): Promise<void> => {
    try {
      const user = await login('WRONGCURP', fakePassword);

      expect(user).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('User not found');
    }
  });

  it('Must throw an error if password is incorrect', async (): Promise<void> => {
    try {
      const user = await login(fakeCurp, 'WRONGPASSWORD');

      expect(user).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Incorrect password');
    }
  });

  it('Must return an User', async (): Promise<void> => {
    try {
      const user = await login(fakeCurp, fakePassword);

      expect(user).toBeDefined();
      expect(user).toBeInstanceOf(User);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});

describe('register must works', (): void => {
  const fakeSchema = new Schema();
  const fakeInformation: User.RegisterFields = {
    apellidos: 'Grajales Villanueva',
    curp: 'GAVE950315HVZRLD02',
    email: 'edgravill@gmail.com',
    estadoNacimiento: 'Veracruz',
    fechaNacimiento: '1995-03-15',
    nombres: 'Eduardo',
    password: 'sVcfwa5W;<@6+xqp',
    sexo: 'hombre',
  };
  const existingCurp = 'GAVE950315HVZRLD01';
  const fakeUser = new User({ curp: existingCurp });
  const findByCURP = jest.fn(async (curp: string): Promise<User.Document | null> => {
    if (curp !== existingCurp) {
      return fakeUser;
    }

    return null;
  });
  const save = jest.fn();
  class FakeThis extends User {
    public static findByCURP = findByCURP;

    public save = async (): Promise<this> => {
      save();

      return this;
    };
  }

  addStatics(fakeSchema);
  const register: (
    info: User.RegisterFields,
  ) => Promise<User.Document> = fakeSchema.statics.register.bind(FakeThis);

  it('Must return a new User', async (): Promise<void> => {
    try {
      const savedUser = await register(fakeInformation);

      expect(savedUser).toBeDefined();
      expect(savedUser).toBeInstanceOf(User);
      expect(save).toBeCalled();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('Must throw an error if user already exist', async (): Promise<void> => {
    try {
      const savedUser = await register({ ...fakeInformation, curp: existingCurp });

      expect(savedUser).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('CURP already registered');
    }
  });

  it('Must throw an error if the information is wrong', async (): Promise<void> => {
    try {
      const savedUser = await register({ ...fakeInformation, curp: 'WRONGCURP' });

      expect(savedUser).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toMatchSnapshot();
    }
  });
});

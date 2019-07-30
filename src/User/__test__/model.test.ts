import { compare } from 'bcrypt';
import User from '../model';

describe('User model', (): void => {
  it('Must throw an error if required fields aren\'t provided', async (): Promise<void> => {
    const fakeUser = new User({});

    try {
      await fakeUser.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toMatchSnapshot();
    }
  });

  it('Must throw an error if curp isn\'t valid', async (): Promise<void> => {
    const fakeUser = new User({
      apellidos: 'Grajales Villanueva',
      curp: 'GAVE950315HVZRLD',
      email: 'edgravill@gmail.com',
      estadoNacimiento: 'Veracruz',
      fechaNacimiento: '1995-03-15',
      nombres: 'Eduardo',
      password: 'sVcfwa5W;<@6+xqp',
      sexo: 'hombre',
    });

    try {
      await fakeUser.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`User validation failed: curp: Path \`curp\` is invalid (${fakeUser.curp}).`);
    }
  });

  it('Must hash the password', async (): Promise<void> => {
    const fakePassword = 'sVcfwa5W;<@6+xqp';
    const fakeUser = new User({
      apellidos: 'Grajales Villanueva',
      curp: 'GAVE950315HVZRLD02',
      email: 'edgravill@gmail.com',
      estadoNacimiento: 'Veracruz',
      fechaNacimiento: '1995-03-15',
      nombres: 'Eduardo',
      password: fakePassword,
      sexo: 'hombre',
    });

    try {
      const result = await compare(fakePassword, fakeUser.password);

      expect(result).toBeTruthy();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('Must be valid user', async (): Promise<void> => {
    const fakeUser = new User({
      apellidos: 'Grajales Villanueva',
      curp: 'GAVE950315HVZRLD02',
      email: 'edgravill@gmail.com',
      estadoNacimiento: 'Veracruz',
      fechaNacimiento: '1995-03-15',
      nombres: 'Eduardo',
      password: 'sVcfwa5W;<@6+xqp',
      sexo: 'hombre',
    });

    try {
      await fakeUser.validate();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});

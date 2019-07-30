import { Schema } from 'mongoose';
import { compare } from 'bcrypt';
import schema, { curpValidator, hashPassword } from '../schema';

describe('Schema must works', (): void => {
  it('Must be defined and a real instance of schema', (): void => {
    expect(schema).toBeDefined();
    expect(schema).toBeInstanceOf(Schema);
  });

  it('Must validate the CURP', (): void => {
    const fakeThis = {
      apellidos: 'Grajales Villanueva',
      estadoNacimiento: 'Veracruz',
      fechaNacimiento: '1995-03-15',
      nombres: 'Eduardo',
      sexo: 'hombre',
    } as User.Schema;
    const fakeCurp = 'GAVE950315HVZRLD02';

    const result = curpValidator.bind(fakeThis)(fakeCurp);

    expect(result).toBeTruthy();
  });

  it('Must hash correctly the password', async (): Promise<void> => {
    const fakePassword = 'sVcfwa5W;<@6+xqp';
    const hashedPassword = hashPassword(fakePassword);

    try {
      const result = await compare(fakePassword, hashedPassword);

      expect(result).toBeTruthy();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});

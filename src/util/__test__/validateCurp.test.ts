import validateCurp from '../validateCurp';

describe('validateCurp must works', (): void => {
  const userInformation: User.PersonalInformation = {
    apellidos: 'Grajales Villanueva',
    estadoNacimiento: 'Veracruz',
    fechaNacimiento: '1995-03-15',
    nombres: 'Eduardo',
    sexo: 'hombre',
  };

  it('Must return false if curp has wrong size', (): void => {
    const wrongCurp = 'GAVE950315HVZRLD';

    expect(validateCurp(wrongCurp, userInformation)).toBeFalsy();
  });

  it('Must throw an error if curp has wrong size', (): void => {
    const wrongCurp = 'GAVE950315HVZRLD';

    expect((): boolean => validateCurp(wrongCurp, userInformation, true)).toThrowError('Wrong CURP length');
  });

  it('Must return false if curp doesn\'t match with the personal info', (): void => {
    const wrongCurp = 'GAVE950315HVZRLX02';

    expect(validateCurp(wrongCurp, userInformation)).toBeFalsy();
  });

  it('Must throw an error if curp doesn\'t match with the personal info', (): void => {
    const wrongCurp = 'GAVE950315HVZRLX02';

    expect((): boolean => validateCurp(wrongCurp, userInformation, true)).toThrowError('Wrong CURP');
  });

  it('Must return true is curp match with the personal info', (): void => {
    const rightCurp = 'GAVE950315HVZRLD02';

    expect(validateCurp(rightCurp, userInformation)).toBeTruthy();
  });
});

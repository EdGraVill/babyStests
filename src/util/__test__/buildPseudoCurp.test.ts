import buildPseudoCurp from '../buildPseudoCurp';

describe('buildPseudoCurp must works', (): void => {
  const userInformation: User.PersonalInformation = {
    apellidos: 'Grajales Villanueva',
    estadoNacimiento: 'Veracruz',
    fechaNacimiento: '1995-03-15',
    nombres: 'Eduardo',
    sexo: 'hombre',
  };

  it('Must match expected with generated', (): void => {
    const pseudoCurp = buildPseudoCurp(userInformation);
    const expectedCurp = 'GAVE950315HVZRLD';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 1 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Ñando Rodriguez',
      nombres: 'Alberto',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'XARA950315HVZNDL';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 2 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Perez Hernandez',
      nombres: 'Maria Luisa',
      sexo: 'mujer',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'PEHL950315MVZRRS';

    expect(pseudoCurp).toBe(expectedCurp);

    const otherNewUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Romero Palazuelos',
      nombres: 'Luis Enrique',
    };

    const otherPseudoCurp = buildPseudoCurp(otherNewUserInfo);
    const otherExpectedCurp = 'ROPL950315HVZMLS';

    expect(otherPseudoCurp).toBe(otherExpectedCurp);
  });

  it('Must match with exception 3 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'D/amico Alvarez',
      nombres: 'Juan Jose',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'DXAJ950315HVZXLN';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 4 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Argüello Alvarez',
      nombres: 'Juan Jose',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'AUAJ950315HVZRLN';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 5 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Riva Palacio Cruz',
      nombres: 'Rocío',
      sexo: 'mujer',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'RICR950315MVZVRC';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 6 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Mc Gregor Lopez',
      nombres: 'Carlos',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'GELC950315HVZRPR';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 7 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Pedrero Dominguez',
      nombres: 'Ofelia',
      sexo: 'mujer',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'PXDO950315MVZDMF';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 8 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Ich Rodríguez',
      nombres: 'Andres',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'IXRA950315HVZCDN';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 9 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Perez',
      nombres: 'Luis',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'PEXL950315HVZRXS';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 10 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Oñate Rodriguez',
      nombres: 'Alberto',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'OXRA950315HVZXDL';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 11 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Po Barrios',
      nombres: 'Andres',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'POBA950315HVZXRN';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 12 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Luna',
      nombres: 'Leticia',
      sexo: 'mujer',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'LUXL950315MVZNXT';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must match with exception 13 example', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Moreno Sanchez',
      nombres: 'Ma. De Los Angeles',
      sexo: 'mujer',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'MOSA950315MVZRNN';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must asign X without consonat in second last name for position 15', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Moreno Lee',
      nombres: 'Ma. De Los Angeles',
      sexo: 'mujer',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'MOLA950315MVZRXN';

    expect(pseudoCurp).toBe(expectedCurp);
  });

  it('Must asign X without consonat in first name for position 16', (): void => {
    const newUserInfo: User.PersonalInformation = {
      ...userInformation,
      apellidos: 'Moreno Lee',
      nombres: 'Mía',
      sexo: 'mujer',
    };

    const pseudoCurp = buildPseudoCurp(newUserInfo);
    const expectedCurp = 'MOLM950315MVZRXX';

    expect(pseudoCurp).toBe(expectedCurp);
  });
});

import buildRfc from './buildPseudoCurp';

const generateError = (message: string, throwExepction: boolean): boolean => {
  if (throwExepction) {
    throw new Error(message);
  }

  return false;
};

const validateCurp = (
  curp: string,
  personalData: User.PersonalInformation,
  throwExepction: boolean = false,
): boolean => {
  if (curp.length !== 18) {
    return generateError('Wrong CURP length', throwExepction);
  }

  if (!curp.includes(buildRfc(personalData))) {
    return generateError('Wrong CURP', throwExepction);
  }

  return true;
};

export default validateCurp;

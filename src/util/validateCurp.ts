import buildRfc from './buildPseudoCurp';

/**
 * Function that generates an error or simply return false
 *
 * @param {string} message
 * @param {boolean} throwExepction
 * @returns {boolean}
 */
const generateError = (message: string, throwExepction: boolean): boolean => {
  if (throwExepction) {
    throw new Error(message);
  }

  return false;
};

/**
 * Function who validate a CURP with the gived personal information and return false or throw an
 * error if third param is true
 *
 * @param {string} curp
 * @param {User.PersonalInformation} personalData
 * @param {boolean} [throwExepction=false]
 * @returns {boolean}
 */
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

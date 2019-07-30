import estados from './estados.json';
import altisonantes from './altisonantes.json';

const isVocal = (word: string): boolean => {
  const char = word[0];
  // Also include X becuase it can be interpreted as vocal
  const vocals = ['A', 'E', 'I', 'O', 'U', 'X'];

  return vocals.indexOf(char.toUpperCase()) !== -1;
};

const isConsonant = (word: string): boolean => {
  const char = word[0];
  const constonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

  return constonants.indexOf(char.toUpperCase()) !== -1;
};

const normalize = (str: string): string => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const upper = (str: string): string => str.toUpperCase();

const changeForX = (word: string): string => {
  const invalidCharters = ['/', '-', '.', 'Ñ'];

  return word.split('').map((c): string => (invalidCharters.indexOf(c) !== -1 ? 'X' : c)).join('');
};

const filterNotMAJO = (word: string, index: number, array: string[]): boolean => {
  const isMAJO = ['MARIA', 'MA.', 'MA', 'JOSE', 'J', 'J.'].indexOf(word) !== -1;

  if (array.length === 1) {
    return true;
  } if (isMAJO && index === 0) {
    return false;
  }

  return true;
};

const filterPreposition = (word: string): boolean => ['DA', 'DAS', 'DE', 'DEL', 'DER', 'DI', 'DIE', 'DD', 'EL', 'LA', 'LOS', 'LAS', 'LE', 'LES', 'MAC', 'MC', 'VAN', 'VON', 'Y'].indexOf(word) === -1;

const getFirstVocal = (word: string): string => word.split('').filter(isVocal)[0];

const getFirstConsonant = (word: string): string => word.split('').filter(isConsonant)[0];

const buildPseudoCurpt = ({
  apellidos,
  estadoNacimiento,
  fechaNacimiento,
  nombres,
  sexo,
}: User.PersonalInformation): string => {
  const firstComposition: string[] = nombres.split(' ')
    .map(upper)
    .filter(filterPreposition)
    .filter(filterNotMAJO)
    .map(changeForX)
    .map(normalize);
  const lastComposition: string[] = apellidos.split(' ')
    .map(upper)
    .filter(filterPreposition)
    .map(changeForX)
    .map(normalize);
  const [year, month, day] = fechaNacimiento.split('-');
  const sexChar = sexo === 'hombre' ? 'H' : 'M';
  const rfc = [
    '', '', '', '', // 1 2 3 4
    year[2], year[3], ...month.split(''), ...day.split(''), // 5 6 7 8 9 10
    sexChar, // 11
    ...estados[estadoNacimiento].RENAPO.split(''), // 12 13
    '', '', '', // 14 15 16
  ];

  rfc[0] = lastComposition[0][0];
  rfc[1] = getFirstVocal(lastComposition[0].substring(1)) || 'X';
  rfc[3] = firstComposition[0][0];

  if (lastComposition.length === 1) {
    rfc[2] = 'X';
    rfc[14] = 'X';
  } else {
    rfc[2] = lastComposition[lastComposition.length - 1][0];
    rfc[14] = getFirstConsonant(lastComposition[lastComposition.length - 1].substring(1)) || 'X';
  }

  const composition = rfc.slice(0, 4).join('');

  if (altisonantes[composition]) {
    const [AP1, AP2, AM1, NO1] = altisonantes[rfc.slice(0, 4).join('')].split('');

    rfc[0] = AP1;
    rfc[1] = AP2;
    rfc[2] = AM1;
    rfc[3] = NO1;
  }

  rfc[13] = getFirstConsonant(lastComposition[0].substring(1)) || 'X';
  rfc[15] = getFirstConsonant(firstComposition[0].substring(1)) || 'X';

  return rfc.join('');
};

export default buildPseudoCurpt;

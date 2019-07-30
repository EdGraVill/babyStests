import { hashSync } from 'bcrypt';
import { Schema } from 'mongoose';
import validateCurp from '../../util/validateCurp';
import estados from '../../util/estados.json';

/**
 * Function that take a curp and validate it
 *
 * @export
 * @param {User.Schema} this
 * @param {string} curp
 * @returns {boolean}
 */
export function curpValidator(this: User.Schema, curp: string): boolean {
  const personalInformation: User.PersonalInformation = {
    apellidos: this.apellidos,
    estadoNacimiento: this.estadoNacimiento,
    fechaNacimiento: this.fechaNacimiento,
    nombres: this.nombres,
    sexo: this.sexo,
  };

  return validateCurp(curp, personalInformation);
}

/**
 * Function that hash a gived password
 *
 * @export
 * @param {string} password
 * @returns {string}
 */
export function hashPassword(password: string): string {
  return hashSync(password, 10);
}

const schema: Schema = new Schema({
  active: {
    default: true,
    type: Boolean,
  },
  apellidos: {
    required: true,
    type: String,
  },
  curp: {
    match: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
    index: true,
    maxlength: 18,
    minlength: 18,
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: curpValidator,
    },
  },
  email: {
    index: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
    type: String,
  },
  estadoNacimiento: {
    enum: Object.keys(estados),
    required: true,
    type: String,
  },
  fechaNacimiento: {
    match: /^\d{4}-\d{2}-\d{2}$/,
    required: true,
    type: String,
  },
  nombres: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    set: hashPassword,
    type: String,
  },
  sexo: {
    enum: ['hombre', 'mujer'],
    required: true,
    type: String,
  },
}, {
  timestamps: {
    createdAt: 'Timestamps.created',
    updatedAt: 'Timestamps.updated',
  },
});

export default schema;

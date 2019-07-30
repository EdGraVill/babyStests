type stateEnum = 'Aguascalientes' | 'Baja California' | 'Baja California Sur' | 'Campeche' | 'Chiapas' | 'Chihuahua' | 'Ciudad de México' | 'Coahuila' | 'Colima' | 'Durango' | 'Guanajuato' | 'Guerrero' | 'Hidalgo' | 'Jalisco' | 'Estado de México' | 'Michoacán' | 'Morelos' | 'Nayarit' | 'Nuevo León' | 'Oaxaca' | 'Puebla' | 'Querétaro' | 'Quintana Roo' | 'San Luis Potosí' | 'Sinaloa' | 'Sonora' | 'Tabasco' | 'Tamaulipas' | 'Tlaxcala' | 'Veracruz' | 'Yucatán' | 'Zacatecas';

type MongooseDocument = import('mongoose').Document;
type MongooseModel<D> = import('mongoose').Model<D>;

interface Timestamps {
  created: Date;
  updated: Date;
}

declare namespace User {
  interface PersonalInformation {
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    sexo: 'hombre' | 'mujer';
    estadoNacimiento: stateEnum;
  }

  interface ComunicationFields {
    email: string;
  }

  interface AuthenticationFields {
    password: string;
    curp: string;
  }

  interface RegisterFields extends PersonalInformation, ComunicationFields, AuthenticationFields {
  }

  interface Schema extends RegisterFields {
    Timestamps: Timestamps;
    active: boolean;
  }

  interface Document extends Schema, MongooseDocument {
  }

  interface Model extends MongooseModel<Document> {
    findByCURP: (curp: string) => Promise<Document | null>;
    login: (curp: string, password: string) => Promise<Document>;
    register: (info: RegisterFields) => Promise<Document>;
  }
}

declare module 'estados.json' {
  interface Content {
    Estado: string;
    Variable: string;
    RENAPO: string;
    '2 Dígitos': string;
    '3 Dígitos': string;
  }

  interface List {
    Aguascalientes: Content;
    'Baja California': Content;
    'Baja California Sur': Content;
    Campeche: Content;
    Chiapas: Content;
    Chihuahua: Content;
    'Ciudad de México': Content;
    Coahuila: Content;
    Colima: Content;
    Durango: Content;
    Guanajuato: Content;
    Guerrero: Content;
    Hidalgo: Content;
    Jalisco: Content;
    'Estado de México': Content;
    Michoacán: Content;
    Morelos: Content;
    Nayarit: Content;
    'Nuevo León': Content;
    Oaxaca: Content;
    Puebla: Content;
    Querétaro: Content;
    'Quintana Roo': Content;
    'San Luis Potosí': Content;
    Sinaloa: Content;
    Sonora: Content;
    Tabasco: Content;
    Tamaulipas: Content;
    Tlaxcala: Content;
    Veracruz: Content;
    Yucatán: Content;
    Zacatecas: Content;
  }

  const content: List;

  export default content;
}

declare module 'altisonantes.json' {
  interface Altisonantes {
    [word: string]: string;
  }

  const content: Altisonantes;

  export default content;
}

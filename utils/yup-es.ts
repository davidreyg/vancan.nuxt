import type { ComposerTranslation } from 'vue-i18n';
import type { LocaleObject } from 'yup';

const es = (t: ComposerTranslation<object, 'en' | 'es'>): LocaleObject => {
  return {
    mixed: {
      default: ({ path }) => `${t('fields.' + path)} no es válido.`,
      required: ({ path }) => `${t('fields.' + path)} es un campo obligatorio.`,
      oneOf: ({ path, values }) =>
        `${t('fields.' + path)} debe ser uno de los siguientes valores: ${values}.`,
      notOneOf: ({ path, values }) =>
        `${t('fields.' + path)} no debe ser uno de los siguientes valores: ${values}.`,
      notType: ({ path, type, value }) => {
        let msg = `${t('fields.' + path)} debe ser un tipo \`${type}\``;

        if (value === null) {
          msg +=
            `\n Si "nulo" pretende ser un valor vacío, asegúrese de marcar el esquema como` +
            ' `.nullable()`';
        }

        return msg;
      },
    },
    string: {
      length: ({ path }) => `${t('fields.' + path)} debe ser exactamente ${length} caracteres`,
      min: ({ path, min }) => `${t('fields.' + path)} debe ser de al menos ${min} caracteres`,
      max: ({ path, max }) => `${t('fields.' + path)} debe ser como máximo ${max} caracteres`,
      matches: ({ path, regex }) =>
        `${t('fields.' + path)} debe coincidir con el siguiente: "${regex}"`,
      email: ({ path }) => `${t('fields.' + path)} debe ser un correo electrónico válido`,
      url: ({ path }) => `${t('fields.' + path)} debe ser una URL válida`,
      trim: ({ path }) => `${t('fields.' + path)} debe ser una cadena recortada`,
      lowercase: ({ path }) => `${t('fields.' + path)} debe ser una cadena en minúsculas`,
      uppercase: ({ path }) => `${t('fields.' + path)} debe ser una cadena en mayúsculas`,
    },
    number: {
      min: ({ path, min }) => `${t('fields.' + path)} debe ser mayor que o igual a ${min}`,
      max: ({ path, max }) => `${t('fields.' + path)} debe ser menor que o igual a ${max}`,
      lessThan: ({ path, less }) => `${t('fields.' + path)} debe ser inferior a ${less}`,
      moreThan: ({ path, more }) => `${t('fields.' + path)} debe ser mayor que ${more}`,
      positive: ({ path }) => `${t('fields.' + path)} debe ser un número positivo`,
      negative: ({ path }) => `${t('fields.' + path)} debe ser un número negativo`,
      integer: ({ path }) => `${t('fields.' + path)} debe ser un entero`,
    },
    date: {
      min: ({ path, min }) => `${t('fields.' + path)} campo debe ser posterior a ${min}`,
      max: ({ path, max }) => `${t('fields.' + path)} campo debe ser anterior a ${max}`,
    },
    object: {
      noUnknown: (path) =>
        `${t('fields.' + path)} campo no puede tener llaves no especificados en la forma del objeto`,
    },
    array: {
      min: ({ path, min }) => `${t('fields.' + path)} campo debe tener al menos ${min} elementos`,
      max: ({ path, max }) =>
        `${t('fields.' + path)} campo debe tener menos de o igual a ${max} elementos`,
    },
  };
};
export default es;

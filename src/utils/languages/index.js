import dictionary from './dictionary.json';

export const languages = {
  id: 'id',
  en: 'en',
};

const helper = {};

// helper for handling translation from .json language file at to display desired string
helper.transformText = (
  property = 'no_props',
  language = 'en',
  params = {},
) => {
  const propertyArray = property.trim().split('.');

  let langObj = dictionary;

  for (let i = 0; i < propertyArray.length; i += 1) {
    if (langObj[propertyArray[i]]) langObj = langObj[propertyArray[i]];
    else {
      langObj = property;
      break;
    }
  }

  if (langObj !== property) {
    if (langObj[language]) {
      let stringOutput = langObj[language];
      const keyArray = Object.keys(params);

      if (keyArray.length > 0) {
        keyArray.map(e => {
          const regex = new RegExp(`{${e}}`, 'g');
          stringOutput = stringOutput.replace(regex, params[e]);
          return true;
        });

        return stringOutput;
      }

      return stringOutput;
    }

    return `error: missing language ${language}`;
  }

  return `${property} not found`;
};

helper.transformLanguage = (payload, lang, prop) =>
  payload[`${prop}_${lang}`] && payload[`${prop}_${lang}`].length > 0
    ? payload[`${prop}_${lang}`]
    : payload[prop];

export default helper;

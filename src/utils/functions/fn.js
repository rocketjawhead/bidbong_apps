export const typeOf = data => {
  if (typeof data === 'undefined') {
    return 'undefined';
  }
  if (data === null) {
    return null;
  }
  if (data.constructor === [].constructor) {
    return 'array';
  }
  if (data.constructor === {}.constructor) {
    return 'object';
  }
  return typeof data;
};

export const getLastArray = arr => {
  if (!typeOf(arr) === 'array') {
    throw new Error('require data is array');
  }
  if (arr && arr.length) {
    return arr[arr.length - 1];
  }
  return arr;
};

export const paramsToObject = params => {
  if (params && params.indexOf('=') >= 0) {
    return JSON.parse(
      `{"${decodeURI(params)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/[=]/g, '":"')}"}`,
    );
  }
  return null;
};

export const getParamsFromLinking = data => {
  if (data && data.indexOf('://') >= 0) {
    if (
      data.split('?')[0] !==
      'com.byu.id://login.hupindonesia.com/android/com.byu.id/callback'
    ) {
      return paramsToObject(data.split('?')[1]);
    }
  }
  return null;
};

export const objectToParams = data => {
  let param = '';
  if (typeOf(data) === 'undefined') {
    return param;
  }
  if (typeOf(data) !== 'object') {
    throw new Error('data must be object');
  }
  for (const key in data) {
    param += param === '' ? '?' : '&';
    param += `${key}=${encodeURIComponent(data[key])}`;
  }
  return param;
};

export const isCanParseJson = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const isCanStringifyJson = str => {
  try {
    JSON.stringify(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getGoogleAddress = datas => {
  const temp = {
    country: '', // negara
    province: '', // provinsi, state
    city: '', // city, kabupaten
    district: '', // kecamatan
    subdistrict: '', // kelurahan, desa
    address: '', // jalan
    postalcode: '', // kode post,
    fullAddress: datas && datas.formatted_address,
  };

  datas.address_components.forEach(data => {
    const types = data.types[0];
    if (types === 'country') {
      temp.country = data.long_name;
    }
    if (types === 'administrative_area_level_1') {
      temp.province = data.long_name;
    }
    if (types === 'administrative_area_level_2') {
      temp.city = data.long_name;
    }
    if (types === 'administrative_area_level_3') {
      temp.district = data.long_name;
    }
    if (types === 'administrative_area_level_4') {
      temp.subdistrict = data.long_name;
    }
    if (types === 'route') {
      temp.address = data.long_name;
    }
    if (types === 'postal_code') {
      temp.postalcode = data.long_name;
    }
  });
  return temp;
};

export const objectToArray = data => {
  const arr = [];
  if (!data) {
    return arr;
  }
  for (const key in data) {
    arr.push({ ...data[key], key });
  }
  return arr;
};

const cleanHtml = data => {
  if (data) {
    return data.replace(/<[^>]*>?/gm, '');
  }
  return null;
};

const getTimeStamp = () => new Date().getTime();

const wrapToArray = d => [d];

const nullValidator = payload => {
  if (payload && payload !== null) {
    return payload;
  }
  return null;
};

/**
 * Better way of handling async/await. basically making sure that there are no unhandled Promise.
 * @url https://dev.to/sobiodarlington/better-error-handling-with-async-await-2e5m
 */
export const handleAsync = promise =>
  promise
    .then(data =>
      // console.log('###: handleAsync => data', data);
      [data, undefined],
    )
    .catch(error =>
      // console.log('###: handleAsync => error', error);
      Promise.resolve([undefined, error]),
    );

export default {
  typeOf,
  cleanHtml,
  wrapToArray,
  handleAsync,
  getTimeStamp,
  objectToArray,
  nullValidator,
  objectToParams,
  paramsToObject,
  isCanParseJson,
  getGoogleAddress,
  isCanStringifyJson,
  getParamsFromLinking,
};

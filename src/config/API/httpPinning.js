/* eslint-disable prefer-promise-reject-errors */
import CONST from 'config/const';
import {isCanParseJson} from 'utils/functions/fn';

const requestTimeout = 35000;

export const httpPinning = requestConfig => {
  const options = {
    method: requestConfig.method,
    timeoutInterval: requestConfig.timeout || requestTimeout,
    headers: {
      Version: CONST && CONST.appVersionCode,
      Accept: 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Platform: 'mobile',
      ...requestConfig.headers,
    },
  };

  if (requestConfig.method === 'POST') {
    options.body = JSON.stringify(requestConfig.data);
  }

  return new Promise((resolve, reject) => {
    fetch(requestConfig.url, options)
      .then(response => {
        if (isCanParseJson(response.bodyString)) {
          return response.json();
        }
        return response.text();
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        if (/Failed to connect to/.test(err)) {
          reject('Error: Network Error');
        } else if (err && err.response) {
          reject(err.response);
        } else {
          reject(err);
        }
      });
  });
};

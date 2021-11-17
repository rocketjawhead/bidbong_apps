/* eslint-disable import/no-cycle */
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import CONST from 'config/const';
import { func, isAndroid } from 'utils';
import {
  setOnboardingState,
  setMaintenanceStatus,
  setForceUpdateStatus,
} from 'config/redux';
import { Platform } from 'libraries';
import _ from 'lodash';
import { isCanParseJson } from 'utils/functions/fn';
import { store } from '../redux/store';
import { httpPinning } from './httpPinning';
import baseUrl from './url';

export const apiInstance = axios.create({
  baseURL: '',
  timeout: 35000,
  validateStatus: status => status >= 200 && status < 300,
});

class ApiRequest {
  static get(route) {
    return payload => this.request('GET', route, payload);
  }

  static put(route) {
    return payload => this.request('PUT', route, payload);
  }

  static post(route) {
    return payload => this.request('POST', route, payload);
  }

  static delete(route) {
    return payload => this.request('DELETE', route, payload);
  }

  /**
   * FEATURE - MAINTENANCE & FORCE UPDATE
   */
  static async validateSetting() {
    const platform = isAndroid ? 'android' : 'ios';
    let statusCode = '200';
    let buildNumber = 0;
    let versionCode = '1.0.0';

    const [res] = await func.handleAsync(
      apiInstance.request({
        url: baseUrl.setting,
        method: 'GET',
      }),
    );

    const status = res.data.data.status.find(b => b.platform === platform);
    const version = res.data.data.version.find(b => b.platform === platform);

    if (status) {
      const { code } = status;
      statusCode = code;
    }

    if (version) {
      const { build } = version;
      buildNumber = build;
      versionCode = version.version;
    }

    if (statusCode && statusCode === '10099') {
      return store.dispatch(setMaintenanceStatus(true));
    }

    if (isAndroid) {
      if (
        buildNumber &&
        parseInt(buildNumber) > parseInt(CONST.appVersionCode)
      ) {
        return store.dispatch(setForceUpdateStatus(true));
      }
    } else if (
      versionCode &&
      buildNumber &&
      func.checkUpdateiOS(versionCode, CONST.appVersion) &&
      parseInt(buildNumber) > parseInt(CONST.appVersionCode)
    ) {
      return store.dispatch(setForceUpdateStatus(true));
    }

    store.dispatch(setForceUpdateStatus(false));
    store.dispatch(setMaintenanceStatus(false));
    return Promise.resolve();
  }

  /**
   * handle url params, input object, return string
   * @param {object} params
   */
  static resolveParams(params) {
    const paramsResult = [];
    Object.keys(params).map(e => paramsResult.push(`${e}=${params[e]}`));
    return `?${paramsResult.join('&')}`;
  }

  /**
   * resolve response
   * @param {object} res
   * @param {string} url
   */
  static async resolveResponse(res) {
    if (res && res.status) {
      switch (res.status.toString()) {
        case '1003':
        case '10003': {
          await func.clearAllDataFromLocalStorage();
          await func.setOnboardingStatusToLocalStorage({
            isOnboardingDisabled: true,
          });
          await store.dispatch(setOnboardingState(false));
          break;
        }

        case '10099':
          return store.dispatch(setMaintenanceStatus(true));

        case '10098':
          await this.validateSetting();
          break;

        default:
          store.dispatch(setForceUpdateStatus(false));
          store.dispatch(setMaintenanceStatus(false));
          break;
      }
    }
  }

  /**
   * handle API request
   * @param {string} method
   * @param {string} route
   * @param {object} payload
   */
  static async request(method, route, payload = {}) {
    const appState = store.getState(); // set store state
    const { token } = appState.auth; // get bearer token from reducer
    // eslint-disable-next-line prettier/prettier
    const params = !payload.params
      ? ''
      : `${this.resolveParams(payload.params)}`; // setup params
    const customUrl = payload.url ? `/${payload.url}` : ''; // setup custom url
    // setup base headers
    const baseHeaders = {
      // lang: languagePreference || 'id',
      Version: `${CONST.appVersionCode}`,
      Platform: Platform.OS,
      Timestamp: `${Date.now()}`,
      Authorization: `${token}`,
      'Content-Type':
        payload.type === 'form-data'
          ? 'multipart/form-data'
          : 'application/json',
    };

    const requestConfig = {
      url: !_.isEmpty(customUrl) ? route + customUrl : route + params,
      method,
      headers: payload.headers
        ? { ...baseHeaders, ...payload.headers }
        : baseHeaders,
      cancelToken: payload.cancelToken ? payload.cancelToken : '',
    };
    if (payload.body) {
      requestConfig.data = payload.body;
    } else if (Platform.OS === 'ios') {
      delete requestConfig.data;
    }

    // eslint-disable-next-line prettier/prettier
    console.log(
      `REQ-${requestConfig.method}-${requestConfig.url}`,
      requestConfig,
    );

    const isUrl =
      Platform.OS === 'ios' ||
      route === baseUrl.updateUser ||
      route === baseUrl.bidding ||
      route === baseUrl.product ||
      route === baseUrl.room ||
      route === baseUrl.key ||
      route === baseUrl.shipping ||
      route === baseUrl.getUser ||
      route === baseUrl.payment ||
      route === baseUrl.setRead;

    try {
      const res = isUrl
        ? await apiInstance.request(requestConfig)
        : await httpPinning(requestConfig);

      // eslint-disable-next-line prettier/prettier
      console.log(
        `RESP-${requestConfig.method}-${requestConfig.url}`,
        requestConfig,
        `\n response`,
        isCanParseJson(res) ? JSON.parse(res) : res,
      );

      const response = isCanParseJson(res) ? JSON.parse(res) : res;
      const fixRes = isUrl ? response.data : response;
      return Promise.resolve(fixRes);
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      console.log(
        `RESPERR-${requestConfig.method}-${requestConfig.url}`,
        requestConfig,
        `\n err `,
        isCanParseJson(err) ? JSON.parse(err) : err,
      );

      throw err;
    }
  }
}

export default ApiRequest;

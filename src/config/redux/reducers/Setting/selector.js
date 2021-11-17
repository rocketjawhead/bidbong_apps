const getTitle = value => {
  if (value) return value;
  return '';
};

const getDesc = value => {
  if (value) return value;
  return '';
};

/**
 * @name formatStatusCode
 * @param {array} payload
 * @returns {object}
 * @description format API response for Status Code
 */
export const formatStatusCode = payload => {
  const response = payload.reduce((object, data) => {
    object[data.platform] = {
      code: data.code,
      status: data.status,
      title: {
        en: getTitle(data.title_en),
        id: getTitle(data.title_id),
      },
      desc: {
        en: getDesc(data.desc_en),
        id: getDesc(data.desc_id),
      },
    };

    return object;
  }, {});
  return response;
};

/**
 * @name formatVersionCode
 * @param {array} payload
 * @returns {object}
 * @description format API response for Version Code
 */
export const formatVersionCode = payload => {
  const response = payload.reduce((object, data) => {
    object[data.platform] = {
      build: data.build,
      version: data.version,
      isForceUpdate: data.is_force_update,
      title: {
        en: getTitle(data.title_en),
        id: getTitle(data.title_id),
      },
      desc: {
        en: getDesc(data.desc_en),
        id: getDesc(data.desc_id),
      },
    };

    return object;
  }, {});
  return response;
};

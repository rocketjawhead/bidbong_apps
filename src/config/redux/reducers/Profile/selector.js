export const setDataKey = p => {
  const key = [
    { keyId: 1, count: 0 },
    { keyId: 2, count: 0 },
    { keyId: 3, count: 0 },
    { keyId: 4, count: 0 },
  ];

  const result = Object.values(
    []
      .concat(key, p)
      .reduce(
        (r, c) => ((r[c.keyId] = Object.assign(r[c.keyId] || {}, c)), r),
        {},
      ),
  );

  return result;
};

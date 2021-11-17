import moment from 'moment';

export const setDataProfile = p => ({
  token: p.token,
  id: p.user.id,
  email: p.user.email,
  first: p.user.first,
  last: p.user.last,
  phone: p.user.phone,
  roleId: p.user.roleId,
});

export const setDataGetProfile = p => ({
  id: p.data.id,
  email: p.data.email,
  first: p.data.first,
  last: p.data.last,
  phone: p.data.phone,
  roleId: p.data.roleId,
});

export const setDataChart = p => {
  const labels = [];
  const data = [];
  if (p.length === 1) {
    const lastMonth = {
      count: 0,
      monthName: moment()
        .subtract(1, 'months')
        .format('MMMM'),
    };
    p.unshift(lastMonth);
  }
  p.map((x, i) => {
    labels.push(x?.monthName);
    return data.push(x.count || 0);
  });
  const allData = { labels, data };
  return allData;
};

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

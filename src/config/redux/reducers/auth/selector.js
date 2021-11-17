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
  id: p.users.id,
  email: p.users.email,
  first: p.users.first,
  last: p.users.last,
  phone: p.users.phone,
  roleId: p.users.roleId,
  avatar: p.users.avatar,
  address: p.users.address,
  city: p.users.city,
  zipPostCode: p.users.zipcode,
  state: p.users.state,
  country: p.users.country,
});

export const setUpdateProfile = p => ({
  id: p.id,
  email: p.email,
  first: p.first,
  last: p.last,
  phone: p.phone,
  roleId: p.roleId,
});

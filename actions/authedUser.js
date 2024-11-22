export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (userId) => ({
  type: LOGIN_USER,
  userId,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
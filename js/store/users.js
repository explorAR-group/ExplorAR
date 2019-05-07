import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const setUser = user => ({ type: SET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(setUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  console.warn('inside auth thunk!');
  try {
    res = await axios.post(`http://172.16.23.29:8080/auth/${method}`, {
      email,
      password
    });
  } catch (authError) {
    return dispatch(setUser({ error: authError }));
  }

  console.warn(res.data, 'res.data');
  try {
    dispatch(setUser(res.data));
    console.warn('defaultUser', defaultUser);
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  let stateCopy = { ...state };
  switch (action.type) {
    case SET_USER:
      stateCopy = action.user;
      console.warn('state copy', stateCopy);
      return stateCopy;
    case REMOVE_USER:
      stateCopy = {};
      return stateCopy;
    default:
      return state;
  }
}

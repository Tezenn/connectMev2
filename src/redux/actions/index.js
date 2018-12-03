export const addCurrentPosition = position => ({
  type: 'ADD_CURRENT_POSITION',
  position: position
});

export const updateCurrentUser = data => ({
  type: 'UPDATE_CURRENT_USER',
  data: data
});

export const login = data => ({
  type: 'LOGIN',
  data
});

export const clear = () => ({ type: 'CLEAR' });

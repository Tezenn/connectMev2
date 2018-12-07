const initalState = {
  currentUser: {},
  nearUsers: []
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_POSITION':
      return {
        ...state,
        currentUser: {
          location: [
            action.position.coords.latitude,
            action.position.coords.longitude
          ],
          ...state.currentUser
        }
      };

    case 'UPDATE_CURRENT_USER':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          id: action.data._id,
          username: action.data.username,
          topics: action.data.topics,
          token: action.data.auth
        }
      };

    case 'LOGIN':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.data
        }
      };

    case 'LOAD_CLOSE_USERS':
      return {
        ...state,
        nearUsers: [...action.users]
      };

    case 'CLEAR':
      return initalState;

    default:
      return state;
  }
};

export default userReducer;

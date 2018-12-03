const initalState = {
  currentUser: {},
  nearUsers: {}
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_POSITION':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          location: [
            action.position.coords.latitude,
            action.position.coords.longitude
          ]
        }
      };

    case 'UPDATE_CURRENT_USER':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          id: action.data._id,
          username: action.data.username,
          topics: action.data.topics
        }
      };

    case 'LOGIN':
      console.log(action);
      return {
        ...state,
        currentUser: {
          ...action.data
        }
      };

    case 'CLEAR':
      return initalState;

    default:
      return state;
  }
};

export default userReducer;

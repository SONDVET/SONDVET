const userEventReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_EVENT':
      return action.payload;
    case 'UNSET_USER_EVENT':
      return {};
    default:
      return state;
  }
};

export default userEventReducer;

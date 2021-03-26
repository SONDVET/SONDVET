const userEventReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_GROUP':
        return action.payload;
      case 'UNSET_USER_GROUP':
        return {};
      default:
        return state;
    }
  };
  
  export default userEventReducer;
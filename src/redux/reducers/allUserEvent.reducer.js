const AllUserEventReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ALL_USER_EVENT':
        return action.payload;
      case 'UNSET_ALL_USER_EVENT':
        return {};
      default:
        return state;
    }
  };
  
  export default AllUserEventReducer;
  
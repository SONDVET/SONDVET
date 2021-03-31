const allUserReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ALL':
        return action.payload;
      case 'UNSET_ALL':
        return {};
      default:
        return state;
    }
  };
  
  export default allUserReducer;
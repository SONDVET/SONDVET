const archivedUserReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ARCHIVED':
        return action.payload;
      case 'UNSET_ARCHIVED':
        return {};
      default:
        return state;
    }
  };
  
  export default archivedUserReducer;
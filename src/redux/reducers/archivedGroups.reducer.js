const archivedGroupsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ARCHIVED_GROUP':
        return action.payload;
      case 'UNSET_ARCHIVED_GROUP':
        return {};
      default:
        return state;
    }
  };
  
  export default archivedGroupsReducer;

const archivedEventReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ARCHIVED_EVENTS':
        return action.payload;
      case 'UNSET_ARCHIVED_EVENT':
        return {};
      default:
        return state;
    }
  };
  
  export default archivedEventReducer;
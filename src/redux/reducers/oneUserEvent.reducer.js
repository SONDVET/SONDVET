const oneUserEventReducer = (state = [{id:0, user_id: 0, event_id: 0}], action) => {
    switch (action.type) {
      case 'SET_ONE_USER_EVENT':
        return action.payload;
      case 'UNSET_ONE_USER_EVENT':
        return [{id:0, user_id: 0, event_id: 0}];
      default:
        return state;
    }
  };
  
  export default oneUserEventReducer;
  
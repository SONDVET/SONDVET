const AffiliateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_AFFILIATE':
      return action.payload;
    case 'UNSET_AFFILIATE':
      return {};
    default:
      return state;
  }
};

export default AffiliateReducer;

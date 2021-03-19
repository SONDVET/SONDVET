const AffiliateUserReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_AFFILIATE_USER':
        return action.payload;
      case 'UNSET_AFFILIATE_USER':
        return {};
      default:
        return state;
    }
  };
  
  export default AffiliateUserReducer;
  
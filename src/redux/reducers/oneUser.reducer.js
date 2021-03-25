const oneUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ONE_USER':
            return action.payload;
        case 'UNSET_ONE_USER':
            return {};
        default:
            return state;
    }
};

export default oneUserReducer
import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import event from './event.reducer';
import userEvent from './userEvent.reducer';
import affiliateUser from './affiliateUser.reducer';
import allUserEvent from './allUserEvent.reducer';
import oneUserEvent from './oneUserEvent.reducer';
import affiliate from './affiliate.reducer';
import oneUser from './oneUser.reducer'


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  event,
  userEvent,
  allUserEvent,
  oneUserEvent,
  affiliate,
  affiliateUser,
  oneUser
});

export default rootReducer;

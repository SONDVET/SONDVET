import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

//
function* reRegisterUser(action) {
  try {
    yield axios.put('/api/user/', action.payload);
    yield put({ type: 'FETCH_ONE_USER', payload:action.payload.id  })
  } catch (error) {
    console.log('Error with user update:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

// 
function* updatePassword(action) {
  try{
    yield axios.put(`/api/admin/else`, action.payload);
  } catch (error) {
    console.log('Error with password update:', error);
  }
}


function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('RE_REGISTER', reRegisterUser);
  yield takeLatest('UPDATE_PASSWORD', updatePassword);
}

export default registrationSaga;

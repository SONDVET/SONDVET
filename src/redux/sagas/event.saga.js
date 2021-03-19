import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// Retrieves every event from the database and places them into the event reducer
function* fetchEvent() {
    try{
        const response = yield axios.get('/api/event')
        yield put({type: 'SET_EVENT', payload: response.data})
    } catch (error) {
        console.log(`error GETTING events, ${error}`);
    }
}

function* eventSaga() {
    yield takeLatest('FETCH_EVENT', fetchEvent);
  }
  
  export default eventSaga;
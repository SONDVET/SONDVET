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

function* attendEvent(action) {
    try{
        yield axios.post('/attending', action.payload)
    } catch (error) {
        console.log(`error POSTING for attending event`);
    }
}

function* unattendEvent(action) {
    try{
        yield axios.delete('/attending', action.payload)
    } catch (error) {
        console.log(`error DELETING for unattending event`);
    }
}

function* eventSaga() {
    yield takeLatest('FETCH_EVENT', fetchEvent);
    yield takeLatest('ATTEND_EVENT', attendEvent);
    yield takeLatest('UNATTEND_EVENT', unattendEvent);
  }
  
  export default eventSaga;
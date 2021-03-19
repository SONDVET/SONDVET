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

// Creates a new entry into the user_event database table
function* attendEvent(action) {
    try{
        yield axios.post('/api/event/attending', action.payload)
    } catch (error) {
        console.log(`error POSTING for attending event`);
    }
}

// Removes the relevent entry from the user_event database table
function* unattendEvent(action) {
    try{
        yield axios.delete(`/api/event/attending/${action.payload.userId}/${action.payload.eventId}`)
    } catch (error) {
        console.log(`error DELETING for unattending event`);
    }
}

function* fetchUserEvent(action) {
    try {
        const response = yield axios.get(`/api/event/details/${action.payload.eventId}`)
        yield put({type: 'SET_USER_EVENT', payload: response.data })
    } catch (error) {
        console.log(`error GETING user events, ${error}`);
    }
}

function* fetchAffiliateUser(action) {
    try {
        const response = yield axios.get(`api/volunteer/affiliation/${action.payload.affiliateId}`)
        yield put({type: 'SET_AFFILIATE_USER', payload: response.data })
    } catch (error) {
        console.log(`error GETING affiliate users, ${error}`);
    }
}

function* fetchAllUserEvent() {
    try{
        const response = yield axios.get('api/event/aue')
        yield put({type: 'SET_ALL_USER_EVENT', payload: response.data})
    } catch (error) {
        console.log(`error GETTING all user events, ${error}`);
    }
}

function* eventSaga() {
    yield takeLatest('FETCH_EVENT', fetchEvent);
    yield takeLatest('FETCH_USER_EVENT', fetchUserEvent);
    yield takeLatest('FETCH_ALL_USER_EVENT', fetchAllUserEvent);
    yield takeLatest('FETCH_AFFILIATE_USER', fetchAffiliateUser);
    yield takeLatest('ATTEND_EVENT', attendEvent);
    yield takeLatest('UNATTEND_EVENT', unattendEvent);
  }
  
  export default eventSaga;
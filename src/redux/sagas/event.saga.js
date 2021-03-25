import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// Retrieves every event from the database and places them into the event reducer
function* fetchEvent(action) {
    try {
        const response = yield axios.get(`/api/event?search=${action.payload}`)
        yield put({ type: 'SET_EVENT', payload: response.data })
    } catch (error) {
        console.log(`error GETTING events, ${error}`);
    }
}

// Creates a new entry into the user_event database table
function* attendEvent(action) {
    try {
        yield axios.post('/api/event/attending', action.payload)
        yield put({ type: 'FETCH_ALL_USER_EVENT' })
    } catch (error) {
        console.log(`error POSTING for attending event`);
    }
}

// Removes the relevent entry from the user_event database table
function* unattendEvent(action) {
    try {
        yield axios.delete(`/api/event/attending/${action.payload.userId}/${action.payload.eventId}`)
        if (action.payload.params) {
            yield put({ type: 'FETCH_USER_EVENT', payload: action.payload.params });
        }
        yield put({ type: 'FETCH_ALL_USER_EVENT' })
    } catch (error) {
        console.log(`error DELETING for unattending event`);
    }
}

function* fetchUserEvent(action) {
    try {
        const response = yield axios.get(`/api/event/details/${action.payload}`)
        yield put({ type: 'SET_USER_EVENT', payload: response.data })
    } catch (error) {
        console.log(`error GETING user events, ${error}`);
    }
}

function* fetchEventDetails(action) {
    try {
        const response = yield axios.get(`api/event/eventdetails/${action.payload}`)
        yield put({ type: 'SET_EVENT', payload: response.data })
    } catch (error) {
        console.log(`error getting event details, ${error}`)
    }

}

function* fetchAllUserEvent() {
    try {
        const response = yield axios.get('api/event/aue')
        yield put({ type: 'SET_ALL_USER_EVENT', payload: response.data })
    } catch (error) {
        console.log(`error GETTING all user events, ${error}`);
    }
}

function* checkIn(action) {
    try {
        yield axios.put('/api/event/checkin', action.payload)
        yield put({ type: 'FETCH_USER_EVENT', payload: action.payload.params })
    } catch (error) {
        console.log(`error checking in user, ${error}`);
    }
}
function* checkOut(action) {
    try {
        yield axios.put('/api/event/checkout', action.payload)
        yield axios.put('/api/event/addtotal', action.payload)
        yield put({ type: 'FETCH_USER_EVENT', payload: action.payload.params })
    } catch (error) {
        console.log(`error checking out user, ${error}`);
    }
}

function* addNewEvent(action) {
    try {
        yield axios.post('/api/event/', action.payload);
    } catch (error) {
        console.log(`error adding new Event, ${error}`);
    }
}

function* fetchOneUserEvent(action) {
    try {
        const response = yield axios.get(`/api/event/oneuserevent/${action.payload}`);
        yield put({ type: 'SET_ONE_USER_EVENT', payload: response.data })
    } catch (error) {
        console.log(`error getting userevents for user, ${error}`);
    }
}
function* fetchOneUser(action) {
    try {
        const response = yield axios.get(`/api/event/oneuser/${action.payload}`);
        yield put({ type: 'SET_ONE_USER', payload: response.data })
    } catch (error) {
        console.log(`error getting userevents for user, ${error}`);
    }
}
function* eventSaga() {
    yield takeLatest('FETCH_EVENT', fetchEvent);
    yield takeLatest('FETCH_USER_EVENT', fetchUserEvent);
    yield takeLatest('FETCH_ALL_USER_EVENT', fetchAllUserEvent);
    yield takeLatest('FETCH_ONE_USER_EVENT', fetchOneUserEvent);
    yield takeLatest('FETCH_ONE_USER', fetchOneUser)
    yield takeLatest('ATTEND_EVENT', attendEvent);
    yield takeLatest('UNATTEND_EVENT', unattendEvent);
    yield takeLatest('FETCH_EVENT_DETAILS', fetchEventDetails);
    yield takeLatest('CHECK_IN', checkIn);
    yield takeLatest('CHECK_OUT', checkOut);
    yield takeLatest('ADD_NEW_EVENT', addNewEvent);
}

export default eventSaga;
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchArchived(action) {
    try {
        const response = yield axios.get(`/api/admin/archivedusers?search=${action.payload}`)
        yield put({ type: 'SET_ARCHIVED', payload: response.data })
    } catch (error) {
        console.log(`error GETTING events, ${error}`);
    }
}

function* fetchAll(action) {
    try {
        const response = yield axios.get(`/api/volunteer?search=${action.payload}`)  
        yield put({ type: 'SET_ALL', payload: response.data })  
    } catch (error) {
        console.log(`Error getting all Users, ${error}`);
    }
}

function* fetchArchivedEvents(action) {
    try {
        const response = yield axios.get(`/api/admin/archivedevents?search=${action.payload}`)
        yield put({ type: 'SET_ARCHIVED_EVENTS', payload: response.data })  
    } catch (error) {
        console.log(`Error getting all Users, ${error}`);
    }
}

function* adminSaga() {
    yield takeLatest('FETCH_ARCHIVED', fetchArchived);
    yield takeLatest('FETCH_ALL', fetchAll)
    yield takeLatest('FETCH_ARCHIVED_EVENTS', fetchArchivedEvents)
    
}

export default adminSaga;
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchArchived() {
    try {
        const response = yield axios.get(`/api/admin/archivedusers`)
        yield put({ type: 'SET_ARCHIVED', payload: response.data })
    } catch (error) {
        console.log(`error GETTING events, ${error}`);
    }
}

function* adminSaga() {
    yield takeLatest('FETCH_ARCHIVED', fetchArchived);
    
}

export default adminSaga;
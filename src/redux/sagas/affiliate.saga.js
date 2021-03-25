import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAffiliate() {
    try {
        const response = yield axios.get(`api/volunteer/affiliation`)
        yield put({ type: 'SET_AFFILIATE', payload: response.data })
    } catch (error) {
        console.log(`error GETTING affiliates, ${error}`);
    }
}

function* fetchAffiliateUser(action) {
    try {
        const response = yield axios.get(`api/volunteer/affiliation/${action.payload}`)
        yield put({ type: 'SET_AFFILIATE_USER', payload: response.data })
    } catch (error) {
        console.log(`error GETTING affiliate users, ${error}`);
    }
}

function* fetchAffiliation(action) {
    try {
        console.log(action.payload);
        const response = yield axios.get(`api/volunteer/organization/${action.payload}`)
        yield put({ type: 'SET_AFFILIATE', payload: response.data })
    } catch (error) {
        console.log(`error GETTING Affiliation, ${error}`);
    }
}

function* affiliateSaga() {
    yield takeLatest('FETCH_AFFILIATE', fetchAffiliate);
    yield takeLatest('FETCH_AFFILIATE_USER', fetchAffiliateUser);
    yield takeLatest('GET_AFFILIATION', fetchAffiliation);
}

export default affiliateSaga;
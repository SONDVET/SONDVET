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

function* fetchUserGroup() {
    try {
        const response = yield axios.get('/api/volunteer/usergroup')
        yield put({ type: 'SET_USER_GROUP', payload: response.data })
    } catch (error) {
        console.log(`error GETTING userGroup, ${error}`);
    }
}

function* addUserGroup(action) {
    try {
        yield axios.put(`/api/volunteer/usergroup/${action.payload.user_id}/${action.payload.group_id}`)
        yield put({type: 'FETCH_USER_GROUP'})
    } catch (error) {
        console.log(`error creating new userGroup, ${error}`);
    }
}

function* removeUserGroup(action) {
    try {
        yield axios.delete(`/api/volunteer/usergroup/${action.payload.user_id}/${action.payload.group_id}`)
        yield put({type: 'FETCH_USER_GROUP'})
    } catch (error) {
        console.log(`error removing userGroup, ${error}`);
    }
}

function* affiliateSaga() {
    yield takeLatest('FETCH_AFFILIATE', fetchAffiliate);
    yield takeLatest('FETCH_AFFILIATE_USER', fetchAffiliateUser);
    yield takeLatest('GET_AFFILIATION', fetchAffiliation);
    yield takeLatest('FETCH_USER_GROUP', fetchUserGroup);
    yield takeLatest('ADD_USER_GROUP', addUserGroup);
    yield takeLatest('REMOVE_USER_GROUP', removeUserGroup);
}

export default affiliateSaga;
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAffiliate(action) {
    try {
        console.log(action.payload)
        const response = yield axios.get(`api/volunteer/affiliation?search=${action.payload}`)
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
    console.log('action.payload is:', action.payload, 'action.payload.params is', (action.payload.parameter == true));
    try {
        yield axios.delete(`/api/volunteer/usergroup/${action.payload.user_id}/${action.payload.group_id}`)
        yield put({type: 'FETCH_USER_GROUP'})
        if (action.payload.parameter){
            yield put({type: 'FETCH_AFFILIATE_USER', payload: action.payload.parameter});
        }
    } catch (error) {
        console.log(`error removing userGroup, ${error}`);
    }
}

// used to list a group/affiliation as inactive (archived)
function* removeGroup(action) {
    console.log('group to be inactive is:',action.payload)
    try{
        yield axios.put(`/api/volunteer/affiliation/${action.payload}`)
    } catch (error) {
        console.log(`error removing group, ${error}`);
    }
}

// used to create a new affiliation
function* postGroup(action) {
    console.log(action.payload); // correct
    try{
        const response = yield axios.post(`api/volunteer/affiliation`, action.payload);
        // yield put({ type: 'SET_AFFILIATE', payload: response.data });
    } catch (error) {
        console.log(`error adding group, ${error}`);
    }
}

// gets archived groups for view
function* fetchArchivedGroups() {
    try {
        const response = yield axios.get(`/api/volunteer/affiliation/archived`);
        yield put({ type: 'SET_ARCHIVED_GROUP', payload: response.data });
    } catch (error) {
        console.log(`Error GETTING archived groups, ${error}`);
    }
}

function* affiliateSaga() {
    yield takeLatest('FETCH_AFFILIATE', fetchAffiliate);
    yield takeLatest('FETCH_AFFILIATE_USER', fetchAffiliateUser);
    yield takeLatest('GET_AFFILIATION', fetchAffiliation);
    yield takeLatest('FETCH_USER_GROUP', fetchUserGroup);
    yield takeLatest('ADD_USER_GROUP', addUserGroup);
    yield takeLatest('REMOVE_USER_GROUP', removeUserGroup);
    yield takeLatest('REMOVE_GROUP', removeGroup);
    yield takeLatest('ADD_AFFILIATION', postGroup);
    yield takeLatest('FETCH_ARCHIVED_GROUPS', fetchArchivedGroups);
}

export default affiliateSaga;
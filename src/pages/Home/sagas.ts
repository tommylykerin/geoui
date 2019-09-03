import { takeLeading, put, call, select } from 'redux-saga/effects';

import { HOME, PROJECT } from './constants';
import { getProjectsAction, getProjectsSuccessAction, getProjectsErrorAction } from './actions';

// Watcher Saga
export function* watchHome() {
    // watch for HOME.GET_PROJECTS action and run handleGetProjects
    yield takeLeading(HOME.GET_PROJECTS, handleGetProjects)
}

// Login worker saga
export function* handleGetProjects(action: any) {
    try {
        console.log(action)
    }
    catch (error) {
        yield put(getProjectsErrorAction(error.toString()));
    }

}

export function storeUserInAsync(userData: any) {
    return localStorage.setItem('userData', userData);
}

export function getUserFromAsync() {
    return localStorage.getItem('userData');
}

export function removeUserFromAsync() {
    return localStorage.removeItem('userData');
}

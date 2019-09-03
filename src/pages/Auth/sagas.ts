import { takeLeading, put, call, select } from 'redux-saga/effects';
import uuid from 'uuid/v4';

import { validateEmail } from '../../includes/utils';
import { AUTH } from './constants';
import { loginAction, loginSuccessAction, loginErrorAction, 
    logoutSuccessAction, logoutErrorAction, 
    signupAction, signupSuccessAction, signupErrorAction } from './actions';
import { User } from '../../types/user';

// Watcher Saga
export function* watchAuth() {
    // watch for AUTH.LOGIN action and run handleLogin
    yield takeLeading(AUTH.LOGIN, handleLogin)

    // watch for AUTH.LOGOUT action and run handleLogout
    yield takeLeading(AUTH.LOGOUT, handleLogout);

    // watch for AUTH.SIGNUP action and run handleSignup
    yield takeLeading(AUTH.SIGNUP, handleSignup);

    // watch for AUTH.HYDRATE action and run handleSignup
    yield takeLeading(AUTH.HYDRATE, handleHydrate);
}

// Login worker saga
export function* handleLogin(action: any) {
    const {email, password} = action.payload;
    try {
        const userFromAsync = yield call(getUserFromLocalStorage, email);
        if (userFromAsync !== undefined && password == userFromAsync.password) {
            yield sessionStorage.setItem('loggedInUser', JSON.stringify(userFromAsync));
            yield put(loginSuccessAction(userFromAsync));
        } else {
            yield put(loginErrorAction('Invalid email address or password'));
        }
    }
    catch (error) {
        yield put(loginErrorAction(error.toString()));
    }

}

// Logout worker saga
export function* handleLogout(action: any) {
    try {
        yield sessionStorage.removeItem('loggedInUser');
        yield put(logoutSuccessAction());
    }
    catch (error) {
        yield put(logoutErrorAction(error.toString()));
    }

}

// Worker saga
export function* handleSignup(action: any) {
    const {name, email, password} = action.payload;
    if (name == ''){
        yield put(signupErrorAction('Name cannot be empty'));
        return;
    }
    if (!validateEmail(email)){
        yield put(signupErrorAction('Invalid email address'));
        return;
    }
    if (password.length < 6){
        yield put(signupErrorAction('Password cannot be less than 6 characters'));
        return;
    }
    try {
        const userFromAsync = yield call(getUserFromLocalStorage, email);
        if (userFromAsync !== undefined) {
            yield put(signupErrorAction('This user already exists'));
        } else {
            // call the function that saves the user data finrom LocalStorage
            let newUser: User = {
                id: uuid(),
                name: name,
                email: email,
                password: password
            };
            yield call(storeUserLocalStorage, newUser);
            sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));
            yield put(signupSuccessAction(newUser));
        }

    } catch (error) {
        // do nothing
        yield put(signupErrorAction(error.toString()));
    }
}

// Worker saga
export function* handleHydrate() {
    try {
        // call the function that gets the user data from LocalStorage
        const userDataString = yield sessionStorage.getItem('loggedInUser');

        const userData = JSON.parse(userDataString);
        
        if (userData) {
            yield put(loginAction(userData.email, userData.password));
        }

    } catch (error) {
        // do nothing
    }
}

function storeUserLocalStorage(userData: User) {
    return localStorage.setItem(userData.email, JSON.stringify(userData));
}

function getUserFromLocalStorage(id: string) {
    let userData: string|null = localStorage.getItem(id);
    if(userData == undefined) {
        return undefined;
    }
    return JSON.parse(userData);
}

function removeUserFromLocalStorage(id: string) {
    return localStorage.removeItem(id);
}

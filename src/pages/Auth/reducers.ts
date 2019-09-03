import { AUTH } from './constants';
import { User } from '../../types/user';

const initialState = {
    loggingIn: false,
    loggedIn: false,
    loggingOut: false,
    loginError: null,
    logoutError: null,
    signingUp: false,
    signedUp: false,
    signupError: null,
    userData: <User>{}
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case AUTH.LOGIN:
            return {
                ...state,
                loggingIn: true,
                loginError: null,
                signupError: null,
            };

        case AUTH.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                userData: action.payload.userData
            };

        case AUTH.LOGIN_ERROR:
            return {
                ...state,
                loggingIn: false,
                loginError: action.payload.error,
            };

        case AUTH.LOGOUT:
            return {
                ...state,
                loggingOut: true,
            };

        case AUTH.LOGOUT_SUCCESS:
            return {
                ...state,
                loggingOut: false,
                loggedIn: false,
            };

        case AUTH.LOGOUT_ERROR:
            return {
                ...state,
                loggingOut: false,
                logoutError: action.payload.error,
            };
            
        case AUTH.SIGNUP:
            return {
                ...state,
                signingUp: true,
                loginError: null,
                signupError: null,
            };

        case AUTH.SIGNUP_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                signingUp: false,
                signedUp: true,
                userData: action.payload.userData
            };

        case AUTH.SIGNUP_ERROR:
            return {
                ...state,
                signingUp: false,
                signupError: action.payload.error,
            };

        default:
            return state
    }
};

export default reducer
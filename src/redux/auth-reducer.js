import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
    return state;
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            email,
            login,
            isAuth
        }
    }
}

export const getCaptchaUrlSuccess = (captchaUrl) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    }
}

export const getAuthUserData = () => async (dispatch) => {
    let responce = await authAPI.me();

    if (responce.data.resultCode === 0) {
        let {id, login, email} = responce.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha, actions) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe, captcha).then(responce => {
            if (responce.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
            else {
                if (responce.data.resultCode === 10) {
                    dispatch(getCaptchaUrl());
                }
                actions.setStatus(responce.data.messages);
            }

        })
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const responce = await securityAPI.getCaptcha();
    const captchaUrl = responce.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    let responce = await authAPI.logout();

    if (responce.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export default authReducer;
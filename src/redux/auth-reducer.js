import {authAPI} from "../api/api";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
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
export const getAuthUserData = () => async (dispatch) => {
    let responce = await authAPI.me();

    if (responce.data.resultCode === 0) {
        let {id, login, email} = responce.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, actions) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe).then(responce => {
            console.log(responce)
            if (responce.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                actions.setStatus(responce.data.messages);
            }

        })
    }
}
export const logout = () => async (dispatch) => {
    let responce = await authAPI.logout();

    if (responce.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export default authReducer;
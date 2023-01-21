import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'Its ny first post', likesCount: 11},
    ],
    profile: null,
    status: "",
}

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            };

        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            debugger
            return {
                ...state,
                profile: {...state.profile, photos: action.photos},
            };
        }

        default:
            return state;
    }
    return state;
}
export const addPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText

    }
}
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}
export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
}


export const getUserProfile = (userId) =>
    async (dispatch) => {
        let responce = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(responce.data));
    }
export const getStatus = (userId) =>
    async (dispatch) => {
        let responce = await profileAPI.getStatus(userId);
        dispatch(setStatus(responce.data));
    }

export const updateStatus = (status) => async (dispatch) => {
    try {
        let responce = await profileAPI.updateStatus(status)
        if (responce.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        debugger
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let responce = await profileAPI.savePhoto(file);

    if (responce.data.resultCode === 0) {
        dispatch(savePhotoSuccess(responce.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const usetId = getState().auth.userId;
    const responce = await profileAPI.saveProfile(profile);

    if (responce.data.resultCode === 0) {
        dispatch(getUserProfile(usetId));
    } else {
        dispatch()
    }
}


export default profileReducer;
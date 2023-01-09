import {usersAPI as userAPI, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utilits/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGERSS = 'TOOGLE_IS_FOLLOWING_PROGERSS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOOGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOOGLE_IS_FOLLOWING_PROGERSS: {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId),

            }
        }
        default:
            return state;
    }
    return state;
}

export const followSuccess = (userID) => {
    return {
        type: FOLLOW,
        userID
    }
}
export const unfollowSuccess = (userID) => {
    return {
        type: UNFOLLOW,
        userID
    }
}
export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}
export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}
export const setUsersTotalCount = (totalUsersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count: totalUsersCount,
    }
}
export const setIsFetching = (isFetching) => {
    return {
        type: TOOGLE_IS_FETCHING,
        isFetching
    }
}
export const toogleFollowingProgress = (followingInProgress, userId) => {
    return {
        type: TOOGLE_IS_FOLLOWING_PROGERSS,
        followingInProgress,
        userId
    }
}

export const getUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setUsersTotalCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toogleFollowingProgress(true, userId));
    let responce = await apiMethod(userId)

    if (responce.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toogleFollowingProgress(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userAPI), followSuccess)

    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userAPI), unfollowSuccess)
    }
}


export default usersReducer;
import * as actionTypes from './actionTypes';

export const fetchUsers = () => {
    return {
        type: actionTypes.FETCH_USERS
    };
}

export const fetchUsersSuccess = users => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users
    };
}

export const fetchUsersFail = error => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error
    };
}

export const deleteUser = id => {
    return {
        type: actionTypes.DELETE_USER,
        id
    };
}

export const registerUser = user => {
    return {
        type: actionTypes.REGISTER_USER,
        user
    }
}
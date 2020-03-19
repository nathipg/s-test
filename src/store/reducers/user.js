import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    users: []
};

const fetchUsersSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users
    });
};

const fetchUsersFail = (state, action) => {
    console.error(action.error);
    return state;
};

const deleteUser = (state, action) => {
    return updateObject(state, {
        users: state.users.filter(user => user.id !== action.id)
    });
};

const registerUser = (state, action) => {
    return updateObject(state, {
        users: [...state.users, action.user]
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_USERS_SUCCESS:
            return fetchUsersSuccess(state, action);
        case actionTypes.FETCH_USERS_FAIL:
            return fetchUsersFail(state, action);
        case actionTypes.DELETE_USER:
            return deleteUser(state, action);
        case actionTypes.REGISTER_USER:
            return registerUser(state, action);
        default:
            return state;
    }
};

export default reducer;
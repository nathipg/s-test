import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    posts: []
};

const fetchPostsSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts
    });
};

const fetchPostsFail = (state, action) => {
    console.error(action.error);
    return state;
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POSTS_SUCCESS:
            return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL:
            return fetchPostsFail(state, action);
        default:
            return state;
    }
};

export default reducer;
import * as actionTypes from './actionTypes';

export const fetchPosts = () => {
    return {
        type: actionTypes.FETCH_POSTS
    };
}

export const fetchPostsSuccess = posts => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts
    };
}

export const fetchPostsFail = error => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error
    };
}
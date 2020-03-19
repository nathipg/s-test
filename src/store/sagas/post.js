import { put } from 'redux-saga/effects';

import * as postService from '../../services/post';

import * as actions from '../actions';

export function* fetchPostsSaga(action) {
    try {
        const response = yield postService.getPosts();
        yield put(actions.fetchPostsSuccess(response.data));
    } catch(error) {
        yield put(actions.fetchPostsFail(error));
    }
}
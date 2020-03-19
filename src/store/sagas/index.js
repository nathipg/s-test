import { takeEvery, all } from 'redux-saga/effects';

import { fetchUsersSaga } from './user';
import { fetchAlbumsSaga } from './album';
import { fetchPhotosSaga } from './photo';
import { fetchPostsSaga } from './post';

import * as actionTypes from '../actions/actionTypes';

export function* watch() {
    yield all([
        takeEvery(actionTypes.FETCH_USERS, fetchUsersSaga),
        takeEvery(actionTypes.FETCH_ALBUMS, fetchAlbumsSaga),
        takeEvery(actionTypes.FETCH_PHOTOS, fetchPhotosSaga),
        takeEvery(actionTypes.FETCH_POSTS, fetchPostsSaga)
    ]);
}
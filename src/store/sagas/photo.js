import { put } from 'redux-saga/effects';

import * as photoService from '../../services/photo';

import * as actions from '../actions';

export function* fetchPhotosSaga(action) {
    try {
        const response = yield photoService.getPhotos();
        yield put(actions.fetchPhotosSuccess(response.data));
    } catch(error) {
        yield put(actions.fetchPhotosFail(error));
    }
}
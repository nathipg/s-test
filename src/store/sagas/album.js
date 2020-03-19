import { put } from 'redux-saga/effects';

import * as albumService from '../../services/album';

import * as actions from '../actions';

export function* fetchAlbumsSaga(action) {
    try {
        const response = yield albumService.getAlbums();        
        yield put(actions.fetchAlbumsSuccess(response.data));
    } catch(error) {
        yield put(actions.fetchAlbumsFail(error));
    }
}
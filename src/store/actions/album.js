import * as actionTypes from './actionTypes';

export const fetchAlbums = () => {
    return {
        type: actionTypes.FETCH_ALBUMS
    };
}

export const fetchAlbumsSuccess = albums => {
    return {
        type: actionTypes.FETCH_ALBUMS_SUCCESS,
        albums
    };
}

export const fetchAlbumsFail = error => {
    return {
        type: actionTypes.FETCH_ALBUMS_FAIL,
        error
    };
}
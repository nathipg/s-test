import * as actionTypes from './actionTypes';

export const fetchPhotos = () => {
    return {
        type: actionTypes.FETCH_PHOTOS
    };
}

export const fetchPhotosSuccess = photos => {
    return {
        type: actionTypes.FETCH_PHOTOS_SUCCESS,
        photos
    };
}

export const fetchPhotosFail = error => {
    return {
        type: actionTypes.FETCH_PHOTOS_FAIL,
        error
    };
}
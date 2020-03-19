import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    photos: []
};

const fetchPhotosSuccess = (state, action) => {
    return updateObject(state, {
        photos: action.photos
    });
};

const fetchPhotosFail = (state, action) => {
    console.error(action.error);
    return state;
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PHOTOS_SUCCESS:
            return fetchPhotosSuccess(state, action);
        case actionTypes.FETCH_PHOTOS_FAIL:
            return fetchPhotosFail(state, action);
        default:
            return state;
    }
};

export default reducer;
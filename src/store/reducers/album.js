import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    albums: []
};

const fetchAlbumsSuccess = (state, action) => {
    return updateObject(state, {
        albums: action.albums
    });
};

const fetchAlbumsFail = (state, action) => {
    console.error(action.error);
    return state;
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ALBUMS_SUCCESS:
            return fetchAlbumsSuccess(state, action);
        case actionTypes.FETCH_ALBUMS_FAIL:
            return fetchAlbumsFail(state, action);
        default:
            return state;
    }
};

export default reducer;
import { put } from 'redux-saga/effects';

import * as userService from '../../services/user';

import * as actions from '../actions';

export function* fetchUsersSaga(action) {
    try {
        const response = yield userService.getUsers();
        const treatedUsers = response.data.map(user => {
            return {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                city: user.address.city,
                rideInGroup: userService.getUserRideInGroup(),
                daysOfTheWeek: userService.getUserDayOfTheWeek()
            };
        });
        
        yield put(actions.fetchUsersSuccess(treatedUsers));
    } catch(error) {
        yield put(actions.fetchUsersFail(error));
    }
}
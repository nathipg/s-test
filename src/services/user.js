import axios from 'axios';

import { weekDaysGroup } from '../util/utility';

export const getUsers = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/users');
};

export const getUserRideInGroup = () => {
    const options = ['Always', 'Sometimes', 'Never'];
    const randomNumber = Math.floor(Math.random() * 3);
    return options[randomNumber];
};

export const getUserDayOfTheWeek = () => {
    const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const chosenDays = [];

    do {
        weekDays.forEach(day => {
            const randonBoolean = Math.random() >= 0.5;
            if(randonBoolean) {
                chosenDays.push(day);
            }
        });
    } while(chosenDays.length === 0);

    return weekDaysGroup(chosenDays);
};
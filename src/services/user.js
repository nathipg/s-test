import axios from 'axios';

export const getUsers = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/users');
};

export const getUserRideInGroup = () => {
    const options = ['Always', 'Sometimes', 'Never'];
    const randomNumber = Math.floor(Math.random() * 3);
    return options[randomNumber];
};

export const getUserDayOfTheWeek = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const chosenDays = [];
    let chosenOption = '';

    do {
        weekDays.forEach(day => {
            const randonBoolean = Math.random() >= 0.5;
            if(randonBoolean) {
                chosenDays.push(day);
            }
        });
    } while(chosenDays.length === 0);

    if(chosenDays.length === 7) {
        chosenOption = 'Every day';
    } else if(chosenDays.length === 5 && !chosenDays.includes('Sat') && !chosenDays.includes('Sun')) {
        chosenOption = 'Week days';
    } else if(chosenDays.length === 2 && chosenDays.includes('Sat') && chosenDays.includes('Sun')) {
        chosenOption = 'Weekends';
    } else {
        chosenOption = chosenDays.join(', ');
    }

    return chosenOption;
};
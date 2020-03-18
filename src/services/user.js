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
    const options = [null, 'Every day', 'Week days', 'Weekends'];
    const randomNumber = Math.floor(Math.random() * 4);
    let chosenOption = options[randomNumber];

    if(chosenOption === null) {
        const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const chosenDays = [];

        do {
            weekDays.forEach(day => {
                const randonBoolean = Math.random() >= 0.5;
                if(randonBoolean) {
                    chosenDays.push(day);
                }
            });
        } while(chosenDays.length === 0);

        chosenOption = chosenDays.join(', ');
    }

    return chosenOption;
};
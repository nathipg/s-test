export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if(!rules) {
        return true;
    }

    if(rules.required) {
        if(typeof value === 'object') {
            isValid = value.length > 0 && isValid;
        } else {
            isValid = value.trim() !== '' && isValid;
        }
    }

    if(rules.email) {
        const isEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
        isValid = isEmail && isValid;
    }

    return isValid;
};

export const weekDaysGroup = days => {
    let group = '';

    if(days.length === 7) {
        group = 'Every day';
    } else if(days.length === 5 && !days.includes('sat') && !days.includes('sun')) {
        group = 'Week days';
    } else if(days.length === 2 && days.includes('sat') && days.includes('sun')) {
        group = 'Weekends';
    } else {
        group = days.map(day => capitalize(day)).join(', ');
    }

    return group;
};

export const capitalize = string => string[0].toUpperCase() + string.slice(1);
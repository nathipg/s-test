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
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.email) {
        const isEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
        isValid = isEmail && isValid;
    }

    return isValid;
};
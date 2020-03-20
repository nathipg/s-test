export const login = async () => {
    window.localStorage.setItem('userId', 1);
    window.localStorage.setItem('userName', 'Nathália Pissuti');
};

export const getId = () => {
    return window.localStorage.getItem('userId');
};

export const getName = () => {
    return window.localStorage.getItem('userName');
};
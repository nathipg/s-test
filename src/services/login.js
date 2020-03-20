export const login = async () => {
    localStorage.setItem('userId', 1);
    localStorage.setItem('userName', 'Nathália Pissuti');
};

export const getId = () => {
    return localStorage.getItem('userId');
};

export const getName = () => {
    return localStorage.getItem('userName');
};
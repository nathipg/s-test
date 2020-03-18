import axios from 'axios';

export const getPhotos = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/photos');
};
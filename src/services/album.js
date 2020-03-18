import axios from 'axios';

export const getAlbums = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/albums');
};
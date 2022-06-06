import axios from 'axios';


// Para requisições http da api
export default axios.create({
    // não esquecer de usar https, se for o caso
    baseURL: 'http://localhost:5000/api/',
});
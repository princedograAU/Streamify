import axios from 'axios';

// creates a connection with the api server
export default axios.create({
    baseURL: 'http://localhost:3001'
});
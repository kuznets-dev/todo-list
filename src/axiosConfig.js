import axios from 'axios';

export default axios.create({
    baseURL: `https://back-end-main.herokuapp.com/`
});
import axios from 'axios';

const axiosOptions = {
  development: {
    baseURL: 'http://localhost:5000',
    responseType: 'json',
  },
  test: {
    baseURL: 'http://localhost:5000',
    responseType: 'json',
  },
  production: {
    baseURL: 'https://api.palmsanddates.com',
    responseType: 'json',
  },
};

export default axios.create(axiosOptions[process.env.NODE_ENV]);

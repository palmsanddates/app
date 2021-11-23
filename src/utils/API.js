import axios from 'axios';

let baseURL;

switch (process.env.NODE_ENV) {
  case 'production':
    baseURL = 'https://api.palmsanddates.com';
    break;
  default:
    baseURL = 'http://localhost:5000';
    break;
}

export default axios.create({
  baseURL,
  responseType: 'json',
});

import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.palmsanddates.com',
  responseType: 'json',
});

import axios from 'axios';

const spacex = axios.create({
  baseURL: 'https://api.spacexdata.com',
});

export default spacex;

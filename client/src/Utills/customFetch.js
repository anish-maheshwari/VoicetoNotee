import axios from 'axios';
export const customFetch = axios.create({
  baseURL: 'http://localhost:5100/api/v1',
});



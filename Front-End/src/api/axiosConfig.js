import axios from 'axios';

export const userAxios = axios.create({
  baseURL: 'http://localhost:8081/api',
});

export const productAxios = axios.create({
  baseURL: 'http://localhost:8082/api',
});

export const orderAxios = axios.create({
  baseURL: 'http://localhost:8083/api',
});

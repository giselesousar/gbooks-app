import axios from 'axios';

export const GoogleAPI = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
});
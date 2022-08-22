import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http:://localhost/8080',
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json'
  },
  withCredentials: true,
})

const apiRoutes = {
  getAccount: '/account',
  accountLogin: '/account/login',
  accountRegister: '/account/register',
  accountUpdate: '/account/update',
  getVideo: '/video',
  getFavorites: '/favorite',
  addFavorite: '/favorite/add',
  removeFavorite: '/favorite/remove',
}

export { apiClient, apiRoutes };
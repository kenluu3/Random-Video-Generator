import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json'
  }
})

const credentialsConfig = {
  withCredentials: true,
}

const apiRoutes = {
  account: {
    get: '/account',
    login: '/account/login',
    logout: '/account/logout',
    register: '/account/register',
    update: '/account/update',
  },
  video: {
    get: '/video',
  },
  favorite: {
    get: '/favorite',
    add: '/favorite/add',
    remove: '/favorite/remove',
  },
}

export { apiClient, apiRoutes, credentialsConfig };
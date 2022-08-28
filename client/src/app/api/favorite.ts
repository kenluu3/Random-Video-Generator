import { apiClient, apiRoutes, credentialsConfig } from './config';

const favoriteAPI = {
  add: (payload: any) => {
    return apiClient.post(apiRoutes.favorite.add, payload, credentialsConfig);
  },
  remove: (payload: any) => {
    return apiClient.delete(apiRoutes.favorite.remove, { ...credentialsConfig, data: { payload }});
  },
  get: (username: string) => {
    return apiClient.get(`${apiRoutes.favorite.get}/${username}`, credentialsConfig);
  }
}

export { favoriteAPI };
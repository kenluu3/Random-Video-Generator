import { apiClient, apiRoutes } from './config';

const favoriteAPI = {
  add: (payload: any) => {
    return apiClient.post(apiRoutes.favorite.add, payload);
  },
  remove: (payload: any) => {
    return apiClient.delete(apiRoutes.favorite.remove, payload);
  },
  get: (username: string) => {
    return apiClient.get(`${apiRoutes.favorite.get}/${username}`);
  }
}

export { favoriteAPI };
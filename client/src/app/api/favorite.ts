import { apiClient, apiRoutes } from './config';

const addFavorite = (payload: Object) => {
  return apiClient.post(apiRoutes.addFavorite, payload);
}

const removeFavorite = (payload: Object) => {
  return apiClient.delete(apiRoutes.removeFavorite, payload);
}

const getFavorites = (username: string) => {
  return apiClient.get(`${apiRoutes.getFavorites}/${username}`);
}

export { addFavorite, removeFavorite, getFavorites };
import { apiClient, apiRoutes, credentialsConfig } from './config';

const accountAPI = {
  login: (payload: any) => {
    return apiClient.post(apiRoutes.account.login, payload);
  },
  register: (payload: any) => {
    return apiClient.post(apiRoutes.account.register, payload);
  },
  update: (payload: any) => {
    return apiClient.patch(apiRoutes.account.update, payload, credentialsConfig);
  },
  get: (username: string) => {
    return apiClient.get(`${apiRoutes.account.get}/${username}`);
  }
}

export { accountAPI };
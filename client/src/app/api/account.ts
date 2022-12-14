import { apiClient, apiRoutes, credentialsConfig } from './config';

const accountAPI = {
  login: (payload: any) => {
    return apiClient.post(apiRoutes.account.login, payload, credentialsConfig);
  },
  register: (payload: any) => {
    return apiClient.post(apiRoutes.account.register, payload);
  },
  update: (payload: any) => {
    return apiClient.patch(apiRoutes.account.update, payload, credentialsConfig);
  },
  get: (username: string) => {
    return apiClient.get(`${apiRoutes.account.get}/${username}`);
  },
  logout: () => {
    return apiClient.delete(apiRoutes.account.logout);
  }
}

export { accountAPI };
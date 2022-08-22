import { apiClient, apiRoutes } from './config';

const loginAccount = (payload: Object) => {
  return apiClient.post(apiRoutes.accountLogin, payload);
}

const registerAccount = (payload: Object) => {
  return apiClient.post(apiRoutes.accountRegister, payload);
}

const updateAccount = (payload: Object) => {
  return apiClient.post(apiRoutes.accountUpdate, payload);
}

const getAccount = (username: string) => {
  return apiClient.get(`${apiRoutes.getAccount}/${username}`);
}

export { loginAccount, registerAccount, updateAccount, getAccount };
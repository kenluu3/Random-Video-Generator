import { apiClient, apiRoutes } from './config';

const videoAPI = {
  get: (queries: string[] = []) => {
    const queryConfig = {
      params: {
        q: queries.join(',')
      }
    }

    return apiClient.get(apiRoutes.video.get, queryConfig);
  }
}

export { videoAPI };
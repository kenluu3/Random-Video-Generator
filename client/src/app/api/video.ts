import { apiClient, apiRoutes } from './config';

const getVideo = (queries: string[]) => {
  const queryConfig = {
    params: {
      q: queries.join(',')
    }
  }   

  return apiClient.get(apiRoutes.getVideo, queryConfig)
}

export { getVideo }